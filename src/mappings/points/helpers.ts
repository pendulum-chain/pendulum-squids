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
    const price = totalValueBig.div(totalSupplyBig)

    return price
}

export async function getSwapPoolLPPrice(
    ctx: Ctx,
    block: BlockHeader_,
    swapPool: SwapPool
) {
    const totalLiabilitiesBig = new Big(swapPool.totalLiabilities.toString())

    const priceUsdUnits = await getSwapPoolTokenPrice(ctx, block, swapPool)

    const totalSupplyBig = new Big(swapPool.totalSupply.toString())
    const price = totalLiabilitiesBig.times(priceUsdUnits).div(totalSupplyBig)

    return price
}

async function getSwapPoolTokenPrice(
    ctx: Ctx,
    block: BlockHeader_,
    swapPool: SwapPool
): Promise<any> {
    const { router, token } = await getRouterAndToken(ctx, swapPool, 'swapPool')

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
    // Clean previous keys
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

    // Check if the result is already cached
    if (getRouterAndTokenCache.has(cacheKey)) {
        return getRouterAndTokenCache.get(cacheKey)!
    }

    const relationKey = poolType === 'swapPool' ? 'swapPools' : 'backstopPool'

    const router = await ctx.store.findOne(Router, {
        where: {
            [relationKey]: {
                id: pool.id,
            },
        },
    })

    const token = await ctx.store.findOne(NablaToken, {
        where: {
            [relationKey]: {
                id: pool.id,
            },
        },
    })

    if (!router || !token) {
        throw new Error(
            `Router address or token address not found for ${poolType} ${pool.id}. They should exist at this point.`
        )
    }

    const result = { router, token }
    // Store the result in the cache
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
    const coinInfosMapStorage = await getVersionedStorage(
        network,
        ctxExtended,
        'diaOracleModule',
        'coinInfosMap'
    )

    const coinInfo = await coinInfosMapStorage.get(ctxExtended.block, {
        blockchain: stringToBytes(blockchain),
        symbol: stringToBytes(symbol),
    })

    const priceUnitsUsd = new Big(coinInfo.price).div(new Big(10).pow(12))

    return priceUnitsUsd
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
