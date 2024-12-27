import { Ctx, BlockHeader_ } from '../../processor'
import { Points } from '../../model'
import { BackstopPool, SwapPool } from '../../model'

import { Big } from 'big.js'

import { getBackstopPoolLPPrice, getSwapPoolLPPrice } from './helpers'
import fs from 'fs'

type address = string
type BackstopPoolId = string
type SwapPoolId = string

const OUTPUT_CSV_PATH = 'points.csv'
const INITIAL_CAMPAIGN_BLOCK_HEIGHT = 4118040 // from which block to start counting points
const DUMP_BLOCK_HEIGHT = 4326830 // whenever the campaign finishes.
export const ROUTER_ADDRESS_FOR_POINTS =
    '6fEJAs1ycfTNDZY7ZoAtkBhuhHnRVNscdALMBLdjDV12K4uE'

// global vars to count points
export const pointsCount = new Map<address, Big>()

// keep track of user's LPs
const perSwapPoolLPCount = new Map<address, Map<SwapPoolId, bigint>>()
const perBackstopPoolLPCount = new Map<address, Map<BackstopPoolId, bigint>>()

export function addSwapLP(
    address: address,
    swapPoolId: SwapPoolId,
    amount: bigint
) {
    if (!perSwapPoolLPCount.has(address)) {
        perSwapPoolLPCount.set(address, new Map<SwapPoolId, bigint>())
    }
    const swapPoolUserLPs = perSwapPoolLPCount.get(address)!
    if (!swapPoolUserLPs.has(swapPoolId)) {
        swapPoolUserLPs.set(swapPoolId, BigInt(0))
    }
    swapPoolUserLPs.set(swapPoolId, swapPoolUserLPs.get(swapPoolId)! + amount)
}

export function addBackstopLP(
    address: address,
    backstopPoolId: BackstopPoolId,
    amount: bigint
) {
    if (!perBackstopPoolLPCount.has(address)) {
        perBackstopPoolLPCount.set(address, new Map<BackstopPoolId, bigint>())
    }
    const backstopUserLPs = perBackstopPoolLPCount.get(address)!
    if (!backstopUserLPs.has(backstopPoolId)) {
        backstopUserLPs.set(backstopPoolId, BigInt(0))
    }
    backstopUserLPs.set(
        backstopPoolId,
        backstopUserLPs.get(backstopPoolId)! + amount
    )
}

export function removeSwapLP(
    address: address,
    swapPoolId: SwapPoolId,
    amount: bigint
) {
    if (!perSwapPoolLPCount.has(address)) {
        return
    }
    const swapPoolUserLPs = perSwapPoolLPCount.get(address)!
    if (!swapPoolUserLPs.has(swapPoolId)) {
        return
    }
    swapPoolUserLPs.set(swapPoolId, swapPoolUserLPs.get(swapPoolId)! - amount)
}

export function removeBackstopLP(
    address: address,
    backstopPoolId: BackstopPoolId,
    amount: bigint
) {
    if (!perBackstopPoolLPCount.has(address)) {
        return
    }
    const backstopUserLPs = perBackstopPoolLPCount.get(address)!
    if (!backstopUserLPs.has(backstopPoolId)) {
        return
    }
    backstopUserLPs.set(
        backstopPoolId,
        backstopUserLPs.get(backstopPoolId)! - amount
    )
}

export function addPointsFromSwap(address: address, amount: Big, price: Big) {
    console.log(
        `Adding points from swap for address: ${address}, amount ${amount}, price ${price}`
    )
    // 1 point per 500 USD worth of swap (price at the time of swap)
    const pointsThisSwap = amount.mul(price).div(500)

    const totalPoints = pointsCount.get(address) || new Big(0)
    pointsCount.set(address, totalPoints.add(pointsThisSwap))
}
// each block we accumulate the points based on price and LPs that the address has.
export async function handlePointAccumulation(ctx: Ctx, block: BlockHeader_) {
    if (block.height < INITIAL_CAMPAIGN_BLOCK_HEIGHT) {
        return
    }

    // Cache maps for swap pool prices and backstop pool prices
    // avoid calling the store on each iteration
    const swapPoolLPPrices = new Map<SwapPoolId, Big>()
    const backstopPoolLPPrices = new Map<BackstopPoolId, Big>()

    // also cache swap pools and backstop pools entities to avoid calling the store on each iteration
    const swapPools = new Map<string, SwapPool>()
    const backstopPools = new Map<string, BackstopPool>()

    const addresses = new Set<address>([
        ...perSwapPoolLPCount.keys(),
        ...perBackstopPoolLPCount.keys(),
    ])

    // Accumulate points from both swap LPs and backstop LPs
    for (const address of addresses) {
        let totalPoints = pointsCount.get(address) || new Big(0)

        const swapUserLPs = perSwapPoolLPCount.get(address)
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
                    price = await getSwapPoolLPPrice(ctx, block, swapPool)

                    swapPoolLPPrices.set(swapPoolId, price)
                    swapPools.set(swapPoolId, swapPool)
                }

                const points = calculateSwapPointsThisBlock(
                    lpAmount,
                    price,
                    swapPools.get(swapPoolId)!
                )
                totalPoints = totalPoints.add(points)
            }
        }

        const backstopUserLPs = perBackstopPoolLPCount.get(address)
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
                        ctx,
                        block,
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
                totalPoints = totalPoints.add(points)
            }
        }

        pointsCount.set(address, totalPoints)
        await maybeStorePointsOnEntity(address, ctx, totalPoints, block)

        console.log(
            `total points: ${totalPoints.toFixed(10)} for address: ${address}`
        )
    }

    // Dump points to CSV at the specified block height
    if (block.height === DUMP_BLOCK_HEIGHT) {
        dumpPointsToCSV()
        process.exit(0)
    }
}

async function maybeStorePointsOnEntity(
    address: string,
    ctx: Ctx,
    newPoints: Big,
    blockHeader: BlockHeader_
) {
    // store points every 100 blocks or on the final block DUMP_BLOCK_HEIGHT
    if (
        blockHeader.height % 100 != 0 &&
        blockHeader.height != DUMP_BLOCK_HEIGHT
    ) {
        return
    }
    let points = await ctx.store.get(Points, address)
    if (points === undefined) {
        points = new Points({
            id: address,
            points: new Big(0).toFixed(10),
        })
    }

    points.points = newPoints.toFixed(10)
    await ctx.store.save(points)
}

function calculateSwapPointsThisBlock(
    amount: bigint,
    price: Big,
    swapPool: SwapPool
): Big {
    const blocksPerDayScale = new Big(1).div(7200) // Blocks in 1 day
    const lpDecimals = swapPool.lpTokenDecimals
    const amountBigRaw = new Big(amount.toString())
    const amountBigUnits = amountBigRaw.div(new Big(10).pow(lpDecimals))

    // 1 point per 100 USD worth of LPs per day (worth of block)
    const pointsBig = amountBigUnits
        .times(blocksPerDayScale)
        .times(price)
        .div(100)
    return pointsBig
}

function calculateBackstopPointsThisBlock(
    amount: bigint,
    price: Big,
    backstopPool: BackstopPool
): Big {
    const blocksPerDayScale = new Big(1).div(7200) // Blocks in 1 day
    const lpDecimals = backstopPool.lpTokenDecimals
    const amountBigRaw = new Big(amount.toString())
    const amountBigUnits = amountBigRaw.div(new Big(10).pow(lpDecimals))

    // 2 points per 100 USD worth of LPs per day (worth of block)
    const pointsBig = amountBigUnits
        .times(blocksPerDayScale)
        .times(price)
        .div(50)

    return pointsBig
}

function dumpPointsToCSV() {
    const headers = ['User', 'Points']
    const rows = [headers.join(',')]

    for (const [user, points] of pointsCount.entries()) {
        rows.push(`${user},${points.toFixed(10)}`)
    }

    const csvContent = rows.join('\n')

    fs.writeFileSync(OUTPUT_CSV_PATH, csvContent, 'utf8')
    console.log(`User points have been dumped to ${OUTPUT_CSV_PATH}`)
}
