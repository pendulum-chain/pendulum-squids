import { Ctx, BlockHeader_, ContextExtended } from '../../processor'
import { Router } from '../../model'
import { ss58ToHex } from '../nabla/addresses'
import { network } from '../../config'
import { BackstopPool, SwapPool, NablaToken } from '../../model'
import { getVersionedStorage } from '../../types/eventsAndStorageSelector'

import { Contract as BackstopPoolContract } from '../../abi/backstop'
import { Contract as OracleContract } from '../../abi/oracle'
import { Contract as RouterContract } from '../../abi/router'

import { Big } from 'big.js'

const backstopPoolTokenPriceCache = new Map<string, Big>()
const swapPoolTokenPriceCache = new Map<string, Big>()
const blockchainSymbolCache = new Map<
    string,
    { blockchain: string; symbol: string }
>()
const getRouterAndTokenCache = new Map<
    string,
    { router: Router; token: NablaToken }
>()

const PRICE_REFRESH_INTERVAL = 10 // Refresh prices every 10 blocks
const coinInfosStorageCache: any = {
    coinInfos: undefined,
    blockNumber: 0,
}

export async function getBackstopPoolLPPrice(
    ctx: Ctx,
    block: BlockHeader_,
    backstopPool: BackstopPool
) {
    const contract = new BackstopPoolContract(
        ctx,
        ss58ToHex(backstopPool.id),
        block.hash
    )
    const totalValue = await contract.getTotalPoolWorth()
    const priceUsdUnits = await getBackstopPoolTokenPrice(
        ctx,
        block,
        backstopPool
    )

    const totalValueBig = new Big(totalValue.toString()).times(priceUsdUnits)
    const totalSupplyBig = new Big(backstopPool.totalSupply.toString())
    return totalValueBig.div(totalSupplyBig)
}

export async function getSwapPoolLPPrice(
    ctx: Ctx,
    block: BlockHeader_,
    swapPool: SwapPool
) {
    const totalLiabilitiesBig = new Big(swapPool.totalLiabilities.toString())
    const priceUsdUnits = await getSwapPoolTokenPrice(ctx, block, swapPool)

    const totalSupplyBig = new Big(swapPool.totalSupply.toString())
    return totalLiabilitiesBig.times(priceUsdUnits).div(totalSupplyBig)
}

async function getSwapPoolTokenPrice(
    ctx: Ctx,
    block: BlockHeader_,
    swapPool: SwapPool
): Promise<any> {
    const cacheKey = `${block.hash}-${swapPool.id}`
    if (swapPoolTokenPriceCache.has(cacheKey)) {
        return swapPoolTokenPriceCache.get(cacheKey)
    }
    swapPoolTokenPriceCache.clear()

    const { symbol, blockchain } = await getBlockchainSymbolForToken(
        ctx,
        swapPool,
        block,
        'swapPool'
    )
    const priceUsdUnits = await getPriceFromOracle(
        ctx,
        block,
        symbol,
        blockchain
    )

    swapPoolTokenPriceCache.set(cacheKey, priceUsdUnits)
    return priceUsdUnits
}

async function getBackstopPoolTokenPrice(
    ctx: Ctx,
    block: BlockHeader_,
    backstopPool: BackstopPool
): Promise<any> {
    const cacheKey = `${block.hash}-${backstopPool.id}`
    if (backstopPoolTokenPriceCache.has(cacheKey)) {
        return backstopPoolTokenPriceCache.get(cacheKey)
    }
    backstopPoolTokenPriceCache.clear()

    const { symbol, blockchain } = await getBlockchainSymbolForToken(
        ctx,
        backstopPool,
        block,
        'backstopPool'
    )
    const priceUsdUnits = await getPriceFromOracle(
        ctx,
        block,
        symbol,
        blockchain
    )

    backstopPoolTokenPriceCache.set(cacheKey, priceUsdUnits)
    return priceUsdUnits
}

async function getRouterAndToken(
    ctx: Ctx,
    pool: SwapPool | BackstopPool,
    poolType: 'swapPool' | 'backstopPool'
): Promise<{ router: Router; token: NablaToken }> {
    const cacheKey = pool.id
    if (getRouterAndTokenCache.has(cacheKey)) {
        return getRouterAndTokenCache.get(cacheKey)!
    }

    const relationKey = poolType === 'swapPool' ? 'swapPools' : 'backstopPool'
    const router = await ctx.store.findOne(Router, {
        where: { [relationKey]: { id: pool.id } },
    })
    const token = await ctx.store.findOne(NablaToken, {
        where: { [relationKey]: { id: pool.id } },
    })

    if (!router || !token) {
        throw new Error(
            `Router or token not found for ${poolType} ${pool.id}. They should exist at this point.`
        )
    }

    const result = { router, token }
    getRouterAndTokenCache.set(cacheKey, result)
    return result
}

async function getPriceFromOracle(
    ctx: Ctx,
    blockHeader: BlockHeader_,
    symbol: string,
    blockchain: string
): Promise<Big> {
    const ctxExtended: ContextExtended = { ...ctx, block: blockHeader }
    const coinInfos = await getCoinInfos(ctxExtended, blockHeader)

    const key = {
        blockchain: stringToBytes(blockchain),
        symbol: stringToBytes(symbol),
    }
    const coinInfoPair = coinInfos.find(
        (coinInfo: any) =>
            coinInfo[0].blockchain == key.blockchain &&
            coinInfo[0].symbol == key.symbol
    )

    if (!coinInfoPair) {
        throw new Error(
            `Coin info not found for symbol ${symbol} on blockchain ${blockchain}`
        )
    }

    const coinInfo = coinInfoPair[1]
    return new Big(coinInfo.price).div(new Big(10).pow(12))
}

async function getCoinInfos(
    ctxExtended: ContextExtended,
    blockHeader: BlockHeader_
): Promise<[key: any, value: any][]> {
    const currentBlockNumber = blockHeader.height
    // Check if we can reuse the price of previous blocks
    if (
        coinInfosStorageCache.coinInfos &&
        currentBlockNumber - coinInfosStorageCache.blockNumber <
            PRICE_REFRESH_INTERVAL
    ) {
        return coinInfosStorageCache.coinInfos
    }

    const coinInfosMapStorage = await getVersionedStorage(
        network,
        ctxExtended,
        'diaOracleModule',
        'coinInfosMap'
    )
    const coinInfos = await coinInfosMapStorage.getPairs(ctxExtended.block)
    coinInfosStorageCache.coinInfos = coinInfos
    coinInfosStorageCache.blockNumber = currentBlockNumber
    return coinInfos
}

async function getBlockchainSymbolForToken(
    ctx: Ctx,
    pool: BackstopPool | SwapPool,
    block: BlockHeader_,
    poolType: 'swapPool' | 'backstopPool'
): Promise<{ symbol: string; blockchain: string }> {
    if (blockchainSymbolCache.has(pool.id)) {
        return blockchainSymbolCache.get(pool.id)!
    }

    const { router, token } = await getRouterAndToken(ctx, pool, poolType)
    const routerContract = new RouterContract(
        ctx,
        ss58ToHex(router.id),
        block.hash
    )
    const relevantOracleHexAddress = await routerContract.oracleByAsset(
        ss58ToHex(token.id)
    )

    const oracleContract = new OracleContract(
        ctx,
        relevantOracleHexAddress,
        block.hash
    )
    const blockchain = await oracleContract.getOracleKeyBlockchain(
        ss58ToHex(token.id)
    )
    const symbol = await oracleContract.getOracleKeySymbol(ss58ToHex(token.id))

    const result = { symbol: symbol, blockchain: blockchain }
    blockchainSymbolCache.set(pool.id, result)
    return result
}

const stringToBytes = (str: string): string => {
    const encoder = new TextEncoder()
    return (
        '0x' +
        Array.from(encoder.encode(str))
            .map((byte) => byte.toString(16).padStart(2, '0'))
            .join('')
    )
}
