import { EventHandlerContext, Ctx, BlockHeader_ } from '../processor'
import { network } from '../config'
import { decodeEvent } from '../types/eventsAndStorageSelector'
import { Points } from '../model'

import {
    BackstopPool,
    Router,
    NablaToken,
    SwapPool,
    NablaSwapFee,
    NablaSwap,
    NablaBackstopLiquidityDeposit,
    NablaSwapLiquidityDeposit,
    NablaBackstopLiquidityWithdrawal,
    NablaSwapLiquidityWithdrawal,
} from '../model'

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
    if (userLPs.has(swapPoolId)) {
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
    if (userLPs.has(backstopPoolId)) {
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
    // cache maps for swap pool prices and backstop pool prices
    const swapPoolLPPrices = new Map<SwapPoolId, bigint>()
    const backstopPooLPlPrices = new Map<BackstopPoolId, bigint>()

    // Iterating over all addresses that have LPs in at least some pool
    for (const [address, userLPs] of swapLPCount) {
        let totalPoints = pointsCount.get(address) || BigInt(0)

        for (const [swapPoolId, lpAmount] of userLPs) {
            let price = swapPoolLPPrices.get(swapPoolId)

            if (price === undefined) {
                const swapPool = await ctx.store.get(SwapPool, swapPoolId)
                if (!swapPool) {
                    throw new Error(
                        `SwapPool not found for id: ${swapPoolId}. Should exist.`
                    )
                }
                price = swapPool.totalLiabilities / swapPool.totalSupply
                swapPoolLPPrices.set(swapPoolId, price)
            }

            const points = calculateSwapPointsThisBlock(lpAmount, price)
            totalPoints += points
        }

        pointsCount.set(address, totalPoints)
        await maybeStorePointsOnEntity(address, ctx, totalPoints, block)
    }

    for (const [address, userLPs] of backstopLPCount) {
        let totalPoints = pointsCount.get(address) || BigInt(0)

        for (const [backstopPoolId, amount] of userLPs) {
            let price = backstopPooLPlPrices.get(backstopPoolId)

            if (price === undefined) {
                const backstopPool = await ctx.store.get(
                    SwapPool,
                    backstopPoolId
                )
                if (!backstopPool) {
                    throw new Error(
                        `BackstopPool not found for id: ${backstopPoolId}. Should exist.`
                    )
                }
                price = backstopPool.totalLiabilities / backstopPool.totalSupply
                backstopPooLPlPrices.set(backstopPoolId, price)

                const points = calculateBackstopPointsThisBlock(amount, price)
                totalPoints += points
            }

            pointsCount.set(address, totalPoints)
            await maybeStorePointsOnEntity(address, ctx, totalPoints, block)
        }
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

function calculateSwapPointsThisBlock(amount: bigint, price: bigint): bigint {
    return (amount / (price * BigInt(100))) * BigInt(1 / 7200)
}

function calculateBackstopPointsThisBlock(
    amount: bigint,
    price: bigint
): bigint {
    return (amount / (price * BigInt(50))) * BigInt(1 / 7200)
}
