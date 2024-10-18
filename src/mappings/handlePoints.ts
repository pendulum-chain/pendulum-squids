import { Ctx, BlockHeader_ } from '../processor'
import { Points, Router, Token } from '../model'
import { ss58ToHex } from '../mappings/nabla/addresses'
import { network } from '../config'
import { BackstopPool, SwapPool, NablaToken } from '../model'

import { Big } from 'big.js'

import { Contract as BackstopPoolContract } from '../abi/backstop'
import { Contract as OracleContract } from '../abi/oracle'
import { Contract as RouterContract } from '../abi/router'
import { getVersionedStorage } from '../types/eventsAndStorageSelector'
import { ContextExtended } from '../processor'
type address = string
type BackstopPoolId = string //??
type SwapPoolId = string //??

// global vars to count points
export const pointsCount = new Map<address, bigint>()

// keep track of user's LPs
const swapLPCount = new Map<address, Map<SwapPoolId, bigint>>()
const backstopLPCount = new Map<address, Map<BackstopPoolId, bigint>>()

export function addSwapLP(
    address: address,
    swapPoolId: SwapPoolId,
    amount: bigint
) {
    if (!swapLPCount.has(address)) {
        swapLPCount.set(address, new Map<SwapPoolId, bigint>())
    }
    const userLPs = swapLPCount.get(address)!
    if (!userLPs.has(swapPoolId)) {
        userLPs.set(swapPoolId, BigInt(0))
    }
    userLPs.set(swapPoolId, userLPs.get(swapPoolId)! + amount)
}

export function addBackstopLP(
    address: address,
    backstopPoolId: BackstopPoolId,
    amount: bigint
) {
    if (!backstopLPCount.has(address)) {
        backstopLPCount.set(address, new Map<BackstopPoolId, bigint>())
    }
    const userLPs = backstopLPCount.get(address)!
    if (!userLPs.has(backstopPoolId)) {
        userLPs.set(backstopPoolId, BigInt(0))
    }
    userLPs.set(backstopPoolId, userLPs.get(backstopPoolId)! + amount)
}

export function removeSwapLP(
    address: address,
    swapPoolId: SwapPoolId,
    amount: bigint
) {
    if (!swapLPCount.has(address)) {
        return
    }
    const userLPs = swapLPCount.get(address)!
    if (!userLPs.has(swapPoolId)) {
        return
    }
    userLPs.set(swapPoolId, userLPs.get(swapPoolId)! - amount)
}

export function removeBackstopLP(
    address: address,
    backstopPoolId: BackstopPoolId,
    amount: bigint
) {
    if (!backstopLPCount.has(address)) {
        return
    }
    const userLPs = backstopLPCount.get(address)!
    if (!userLPs.has(backstopPoolId)) {
        return
    }
    userLPs.set(backstopPoolId, userLPs.get(backstopPoolId)! - amount)
}

// each block we accumulate the points based on price and LPs that the address has.
export async function handlePointAccumulation(ctx: Ctx, block: BlockHeader_) {
    // Cache maps for swap pool prices and backstop pool prices
    // avoid calling the store on each iteration
    const swapPoolLPPrices = new Map<SwapPoolId, Big>()
    const backstopPoolLPPrices = new Map<BackstopPoolId, Big>()

    const swapPools = new Map<string, SwapPool>()
    const backstopPools = new Map<string, BackstopPool>()

    const ctxExtended = { ...ctx, block: block }

    const addresses = new Set<address>([
        ...swapLPCount.keys(),
        ...backstopLPCount.keys(),
    ])

    // Accumulate points from both swap LPs and backstop LPs
    for (const address of addresses) {
        let totalPoints = pointsCount.get(address) || BigInt(0)

        const swapUserLPs = swapLPCount.get(address)
        if (swapUserLPs) {
            for (const [swapPoolId, lpAmount] of swapUserLPs) {
                let price = swapPoolLPPrices.get(swapPoolId)

                if (price === undefined) {
                    const swapPool = await ctx.store.get(SwapPool, swapPoolId)
                    if (!swapPool) {
                        throw new Error(
                            `SwapPool not found for id: ${swapPoolId}. Should exist.`
                        )
                    }

                    price = await getSwapPoolLPPrice(ctxExtended, swapPool)
                    console.log(`price for swap pool ${swapPoolId} is ${price}`)
                    swapPoolLPPrices.set(swapPoolId, price)
                    swapPools.set(swapPoolId, swapPool)
                }

                const points = calculateSwapPointsThisBlock(
                    lpAmount,
                    price,
                    swapPools.get(swapPoolId)!
                )
                totalPoints += points
            }
        }

        const backstopUserLPs = backstopLPCount.get(address)
        if (backstopUserLPs) {
            for (const [backstopPoolId, amount] of backstopUserLPs) {
                let price = backstopPoolLPPrices.get(backstopPoolId)

                if (price === undefined) {
                    const backstopPool = await ctx.store.get(
                        BackstopPool,
                        backstopPoolId
                    )
                    if (!backstopPool) {
                        throw new Error(
                            `BackstopPool not found for id: ${backstopPoolId}. Should exist.`
                        )
                    }
                    price = await getBackstopPoolLPPrice(
                        ctxExtended,
                        backstopPool
                    )
                    backstopPoolLPPrices.set(backstopPoolId, price)
                    backstopPools.set(backstopPoolId, backstopPool)
                }

                const points = calculateBackstopPointsThisBlock(
                    amount,
                    price,
                    backstopPools.get(backstopPoolId)!
                )
                totalPoints += points
            }
        }

        pointsCount.set(address, totalPoints)
        await maybeStorePointsOnEntity(address, ctx, totalPoints, block)
    }
}

async function maybeStorePointsOnEntity(
    address: string,
    ctx: Ctx,
    newPoints: bigint,
    blockHeader: BlockHeader_
) {
    if (blockHeader.height % 100 !== 0) {
        return
    }

    let points = await ctx.store.get(Points, address)
    if (points === undefined) {
        points = new Points({
            id: address,
            points: BigInt(0),
        })
    }

    points.points = newPoints
    await ctx.store.save(points)
}

async function getBackstopPoolLPPrice(ctx: Ctx, backstopPool: BackstopPool) {
    const contract = new BackstopPoolContract(ctx, ss58ToHex(backstopPool.id))
    const totalValue = await contract.getTotalPoolWorth()

    const { priceUsdUnits, decimals } =
        await getBackstopPoolTokenPriceAndDecimals(ctx, backstopPool)
    const totalValueBig = new Big(totalValue.toString())
    const totalSupplyBig = new Big(backstopPool.totalSupply.toString())

    // Workaround for total supply = 0 issue.
    if (totalSupplyBig.eq(0)) {
        return new Big(0)
    }
    const price = totalValueBig.div(totalSupplyBig)

    return price
}

async function getSwapPoolLPPrice(
    ctxExtended: ContextExtended,
    swapPool: SwapPool
) {
    const totalLiabilitiesBig = new Big(swapPool.totalLiabilities.toString())

    const { priceUsdUnits, decimals } = await getSwapPoolTokenPriceAndDecimals(
        ctxExtended,
        swapPool
    )
    const totalSupplyBig = new Big(swapPool.totalSupply.toString())
    const price = totalLiabilitiesBig.times(priceUsdUnits).div(totalSupplyBig)

    return price
}

async function getSwapPoolTokenPriceAndDecimals(
    ctxExtended: ContextExtended,
    swapPool: SwapPool
): Promise<any> {
    const router = await ctxExtended.store.findOne(Router, {
        where: {
            swapPools: {
                id: swapPool.id,
            },
        },
    })
    const token = await ctxExtended.store.findOne(NablaToken, {
        where: {
            swapPools: {
                id: swapPool.id,
            },
        },
    })
    // const routerAddress = swapPool.router;
    if (!router || !token) {
        throw new Error(
            `Router address or token address not found for swap pool ${swapPool.id}. Should exist.`
        )
    }

    const routerContract = new RouterContract(ctxExtended, ss58ToHex(router.id))
    const relevantOracleHexAddress = await routerContract.oracleByAsset(
        ss58ToHex(token.id)
    )
    const oracleContract = new OracleContract(
        ctxExtended,
        relevantOracleHexAddress
    )

    const poolAssetPrice = (await oracleContract.stateCall('0xb3596f07', [
        ss58ToHex(token.id),
    ])) as string

    const oracleKeySymbol = await oracleContract.getOracleKeySymbol(
        ss58ToHex(token.id)
    )
    const oracleKeyBlockchain = await oracleContract.getOracleKeyBlockchain(
        ss58ToHex(token.id)
    )

    console.log(
        `key and blockchain for ${swapPool.id} is ${oracleKeySymbol} and ${oracleKeyBlockchain}`
    )

    const versionPairStorage = await getVersionedStorage(
        network,
        ctxExtended,
        'diaOracleModule',
        'coinInfosMap'
    )

    const coinInfo = await versionPairStorage.get(ctxExtended.block, {
        blockchain: stringToBytes(oracleKeyBlockchain),
        symbol: stringToBytes(oracleKeySymbol),
    })
    console.log(`price from storage for ${swapPool.id} is ${coinInfo.price}`)

    const priceUsdUnits = new Big(poolAssetPrice).div(
        new Big(10).pow(token.decimals)
    )
    console.log(`price in usd units for  ${swapPool.id} is ${priceUsdUnits}`)
    return { priceUsdUnits: priceUsdUnits, decimals: token.decimals }
}

async function getBackstopPoolTokenPriceAndDecimals(
    ctx: Ctx,
    backstopPool: BackstopPool
): Promise<any> {
    const router = await ctx.store.findOne(Router, {
        where: {
            backstopPool: {
                id: backstopPool.id,
            },
        },
    })
    const token = await ctx.store.findOne(NablaToken, {
        where: {
            swapPools: {
                id: backstopPool.id,
            },
        },
    })
    // const routerAddress = swapPool.router;
    if (!router || !token) {
        throw new Error(
            `Router address or token address not found for backstop pool ${backstopPool.id}. Should exist.`
        )
    }

    const routerContract = new RouterContract(ctx, ss58ToHex(router.id))
    const relevantOracleHexAddress = await routerContract.oracleByAsset(
        ss58ToHex(token.id)
    )
    const oracleContract = new OracleContract(ctx, relevantOracleHexAddress)

    const poolAssetPrice = (await oracleContract.stateCall('0xb3596f07', [
        //0xb3596f07 -> getAssetPrice call
        ss58ToHex(token.id),
    ])) as string
    const priceUsdUnits = new Big(poolAssetPrice).div(
        new Big(10).pow(token.decimals)
    )

    return { priceUsdUnits: priceUsdUnits, decimals: token.decimals }
}

function calculateSwapPointsThisBlock(
    amount: bigint,
    price: Big,
    swapPool: SwapPool
): bigint {
    const blocksPerDayScale = new Big(1).div(7200)
    const amountBig = new Big(amount.toString())

    const priceAdjustedAmount = amountBig.div(price.times(100))
    const points = priceAdjustedAmount.times(blocksPerDayScale)
    const lpDecimals = swapPool.lpTokenDecimals

    const pointsAdjusted = points.div(new Big(10).pow(lpDecimals))
    return BigInt(pointsAdjusted.round(0, 0).toString())
}

function calculateBackstopPointsThisBlock(
    amount: bigint,
    price: Big,
    backstopPool: BackstopPool
): bigint {
    // return 0 if price 0
    // Workaround for total supply = 0 issue.
    if (price.eq(0)) {
        return BigInt(0)
    }

    const blocksPerDayScale = new Big(1).div(7200)
    const amountBig = new Big(amount.toString())
    const priceAdjustedAmount = amountBig.div(price.times(50))
    const points = priceAdjustedAmount.times(blocksPerDayScale)

    const lpDecimals = backstopPool.lpTokenDecimals
    const pointsAdjusted = points.div(new Big(10).pow(lpDecimals))

    return BigInt(pointsAdjusted.round(0, 0).toString())
}

const stringToBytes = (str: string): string => {
    const encoder = new TextEncoder()
    return (
        '0x' +
        Array.from(encoder.encode(str))
            .map((byte) => byte.toString(16))
            .join('')
    )
}
