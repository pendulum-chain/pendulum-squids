import { EventHandlerContext } from '../processor'
import {
    BackstopPool,
    Router,
    NablaToken,
    SwapPool,
    NablaSwapFee,
} from '../model'
import * as backstopPoolAbi from '../abi/backstop'
import * as erc20Abi from '../abi/erc20'
import * as swapPoolAbi from '../abi/swap'
import * as routerAbi from '../abi/router'
import { codec } from '@subsquid/ss58'
import { config } from '../config'
import * as ss58 from '@subsquid/ss58'

enum EventType {
    BackstopPoolEvent = 1,
    RouterEvent,
    SwapPoolEvent,
}

type Event =
    | erc20Abi.Event
    | backstopPoolAbi.Event
    | swapPoolAbi.Event
    | routerAbi.Event

const SWAP_FEE_PRUNE_INTERVAL_SECONDS = 7 * 24 * 60 * 60

interface Decoder {
    decodeEvent(hex: string): Event
}

function ss58ToHex(address: string) {
    return ss58.decode(address).bytes
}

async function isSwapPoolEvent(ctx: EventHandlerContext) {
    try {
        const contract = new swapPoolAbi.Contract(ctx, ctx.event.args.contract)
        await contract.router()
        await contract.backstop()
        await contract.reserveWithSlippage()
        await contract.poolCap()
        return swapPoolAbi.decodeEvent(ctx.event.args.data)
    } catch {
        return undefined
    }
}

async function isRouterEvent(ctx: EventHandlerContext) {
    try {
        const contract = new routerAbi.Contract(ctx, ctx.event.args.contract)
        return routerAbi.decodeEvent(ctx.event.args.data)
    } catch {
        return undefined
    }
}

async function isBackstopPoolEvent(ctx: EventHandlerContext) {
    try {
        const contract = new backstopPoolAbi.Contract(
            ctx,
            ctx.event.args.contract
        )
        await contract.getBackedPool(0n)
        return backstopPoolAbi.decodeEvent(ctx.event.args.data)
    } catch {
        return undefined
    }
}

async function verifyEvent(verifier: Function, ctx: EventHandlerContext) {
    return verifier(ctx)
}

// Iterates over all decoders and returns the first successfully decoded event
async function getEventAndEventType(ctx: EventHandlerContext): Promise<{
    event: Event | null
    eventType: EventType | null
}> {
    const verifiers = [isBackstopPoolEvent, isRouterEvent, isSwapPoolEvent]
    const eventTypes = [
        EventType.BackstopPoolEvent,
        EventType.RouterEvent,
        EventType.SwapPoolEvent,
    ]

    // Iterate over all verifiers and try to decode the event to the given type
    for (let i = 0; i < verifiers.length; i++) {
        const event = await verifyEvent(verifiers[i], ctx)
        if (event != undefined) {
            const eventType = eventTypes[i]
            return { event, eventType }
        }
    }

    return { event: null, eventType: null }
}

export async function handleContractEvent(ctx: EventHandlerContext) {
    const { event, eventType } = await getEventAndEventType(ctx)
    if (!event || !eventType) {
        return
    }

    if (eventType === EventType.BackstopPoolEvent) {
        if (event.__kind == 'Burn') {
            await backstopHandleBurn(ctx)
        } else if (event.__kind == 'CoverSwapWithdrawal') {
            await backstopHandleCoverSwapWithdrawal(ctx, event)
        } else if (event.__kind == 'Mint') {
            await backstopHandleMint(ctx)
        } else if (event.__kind == 'OwnershipTransferred') {
            await backstopHandleOwnershipTransferred(ctx)
        } else if (event.__kind == 'Paused') {
            await backstopHandlePaused(ctx)
        } else if (event.__kind == 'Transfer') {
            await backstopHandleTransfer(ctx)
        } else if (event.__kind == 'Unpaused') {
            await backstopHandleUnpaused(ctx)
        } else if (event.__kind == 'WithdrawSwapLiquidity') {
            await backstopHandleWithdrawSwapLiquidity(ctx, event)
        }
    } else if (eventType === EventType.RouterEvent) {
        if (event.__kind == 'OwnershipTransferred') {
            await routerHandleOwnershipTransferred(ctx)
        } else if (event.__kind == 'Paused') {
            await routerHandlePaused(ctx)
        } else if (event.__kind == 'Swap') {
            await routerHandleSwap(ctx, event)
        } else if (event.__kind == 'SwapPoolRegistered') {
            await routerHandleSwapPoolRegistered(ctx, event)
        } else if (event.__kind == 'Unpaused') {
            await routerHandleUnpaused(ctx)
        }
    } else if (eventType === EventType.SwapPoolEvent) {
        if (event.__kind == 'BackstopDrain') {
            await swapHandleBackstopDrain(ctx)
        } else if (event.__kind == 'Burn') {
            await swapHandleBurn(ctx)
        } else if (event.__kind == 'ChargedSwapFees') {
            await swapHandleChargedSwapFees(ctx, event)
        } else if (event.__kind == 'Mint') {
            await swapHandleMint(ctx)
        } else if (event.__kind == 'OwnershipTransferred') {
            await swapHandleOwnershipTransferred(ctx)
        } else if (event.__kind == 'Paused') {
            await swapHandlePaused(ctx)
        } else if (event.__kind == 'Transfer') {
            await swapHandleTransfer(ctx)
        } else if (event.__kind == 'Unpaused') {
            await swapHandleUnpaused(ctx)
        }
    }
}

export async function backstopHandleBurn(ctx: EventHandlerContext) {
    const backstop = await getOrCreateBackstopPool(ctx, ctx.event.args.contract)

    await updateBackstopCoverageAndSupply(ctx, backstop)
    ctx.store.save(backstop)
}

export async function backstopHandleCoverSwapWithdrawal(
    ctx: EventHandlerContext,
    event: backstopPoolAbi.Event_CoverSwapWithdrawal
) {
    const backstop = await getOrCreateBackstopPool(ctx, ctx.event.args.contract)
    const pool = await getOrCreateSwapPool(ctx, event.swapPool)

    updateBackstopCoverageAndSupply(ctx, backstop)
    updateSwapPoolCoverageAndSupply(ctx, pool)

    ctx.store.save(backstop)
    ctx.store.save(pool)
}

export async function backstopHandleMint(ctx: EventHandlerContext) {
    const backstop = await getOrCreateBackstopPool(ctx, ctx.event.args.contract)

    updateBackstopCoverageAndSupply(ctx, backstop)
    ctx.store.save(backstop)
}

export async function backstopHandleOwnershipTransferred(
    ctx: EventHandlerContext
) {
    // This event will always be emitted on pool creation
    const backstop = await getOrCreateBackstopPool(ctx, ctx.event.args.contract)
    ctx.store.save(backstop)
}

export async function backstopHandlePaused(ctx: EventHandlerContext) {
    const backstop = await getOrCreateBackstopPool(ctx, ctx.event.args.contract)

    backstop.paused = true
    ctx.store.save(backstop)
}

export async function backstopHandleTransfer(ctx: EventHandlerContext) {
    const backstop = await getOrCreateBackstopPool(ctx, ctx.event.args.contract)
    ctx.store.save(backstop)
}

export async function backstopHandleUnpaused(ctx: EventHandlerContext) {
    const backstop = await getOrCreateBackstopPool(ctx, ctx.event.args.contract)

    backstop.paused = false
    ctx.store.save(backstop)
}

export async function backstopHandleWithdrawSwapLiquidity(
    ctx: EventHandlerContext,
    event: backstopPoolAbi.Event_WithdrawSwapLiquidity
) {
    const backstop = await getOrCreateBackstopPool(ctx, ctx.event.args.contract)
    const pool = await getOrCreateSwapPool(ctx, event.swapPool)
    await updateBackstopCoverageAndSupply(ctx, backstop)
    await updateSwapPoolCoverageAndSupply(ctx, pool)

    ctx.store.save(backstop)
    ctx.store.save(pool)
}

export async function swapHandleBackstopDrain(ctx: EventHandlerContext) {
    const pool = await getOrCreateSwapPool(ctx, ctx.event.args.contract)
    const backstop = await getOrCreateBackstopPool(ctx, pool.backstop.id)

    await updateSwapPoolCoverageAndSupply(ctx, pool)
    await updateBackstopCoverageAndSupply(ctx, backstop)

    ctx.store.save(pool)
    ctx.store.save(backstop)
}

export async function swapHandleBurn(ctx: EventHandlerContext) {
    const pool = await getOrCreateSwapPool(ctx, ctx.event.args.contract)

    await updateSwapPoolCoverageAndSupply(ctx, pool)
    ctx.store.save(pool)
}

export async function swapHandleChargedSwapFees(
    ctx: EventHandlerContext,
    event: swapPoolAbi.Event_ChargedSwapFees
) {
    const swapPool = await getOrCreateSwapPool(ctx, ctx.event.args.contract)
    const backstopPoolAddress = ss58ToHex(swapPool.backstop.id)
    const backstopPool = await getOrCreateBackstopPool(ctx, backstopPoolAddress)
    const swapFee = await createSwapFee(
        ctx,
        ctx.event.block.height,
        ctx.event.extrinsicIndex,
        event.lpFees,
        event.backstopFees,
        event.protocolFees,
        ctx.event.block.timestamp,
        swapPool,
        backstopPool
    )

    updateAprAfterSwap(ctx, swapPool, swapFee)
}

export async function swapHandleMint(ctx: EventHandlerContext) {
    const pool = await getOrCreateSwapPool(ctx, ctx.event.args.contract)

    await updateSwapPoolCoverageAndSupply(ctx, pool)
    ctx.store.save(pool)
}

export async function swapHandleOwnershipTransferred(ctx: EventHandlerContext) {
    // This event will always be emitted on pool creation
    const pool = await getOrCreateSwapPool(ctx, ctx.event.args.contract)
    ctx.store.save(pool)
}

export async function swapHandlePaused(ctx: EventHandlerContext) {
    const pool = await getOrCreateSwapPool(ctx, ctx.event.args.contract)

    pool.paused = true
    ctx.store.save(pool)
}

export async function swapHandleTransfer(ctx: EventHandlerContext) {}

export async function swapHandleUnpaused(ctx: EventHandlerContext) {
    const pool = await getOrCreateSwapPool(ctx, ctx.event.args.contract)

    pool.paused = false
    ctx.store.save(pool)
}

export async function routerHandleOwnershipTransferred(
    ctx: EventHandlerContext
) {
    // This event will always be emitted on router creation
    const router = await getOrCreateRouter(ctx, ctx.event.args.contract)
    ctx.store.save(router)
}

export async function routerHandlePaused(ctx: EventHandlerContext) {
    const router = await getOrCreateRouter(ctx, ctx.event.args.contract)
    // Set the 'paused' property to true
    router.paused = true
    ctx.store.save(router)
}

export async function routerHandleUnpaused(ctx: EventHandlerContext) {
    const router = await getOrCreateRouter(ctx, ctx.event.args.contract)
    // Set the 'paused' property to false
    router.paused = false
    ctx.store.save(router)
}

export async function routerHandleSwap(
    ctx: EventHandlerContext,
    event: routerAbi.Event_Swap
) {
    await getOrCreateRouter(ctx, ctx.event.args.contract)

    const tokenIn = await getOrCreateNablaToken(ctx, event.tokenIn)
    const tokenOut = await getOrCreateNablaToken(ctx, event.tokenOut)

    const swapPoolInAddress = tokenIn.latestSwapPool?.id ?? ''
    const swapPoolIn = await ctx.store.get(SwapPool, swapPoolInAddress)

    const swapPoolOutAddress = tokenOut.latestSwapPool?.id ?? ''
    const swapPoolOut = await ctx.store.get(SwapPool, swapPoolOutAddress)

    if (swapPoolIn !== undefined) {
        await updateSwapPoolCoverageAndSupply(ctx, swapPoolIn)
        ctx.store.save(swapPoolIn)
    }

    if (swapPoolOut !== undefined) {
        await updateSwapPoolCoverageAndSupply(ctx, swapPoolOut)
        ctx.store.save(swapPoolOut)
    }
}

export async function routerHandleSwapPoolRegistered(
    ctx: EventHandlerContext,
    event: routerAbi.Event_SwapPoolRegistered
) {
    await getOrCreateRouter(ctx, ctx.event.args.contract)
    const swapPool = await getOrCreateSwapPool(ctx, event.pool)
    const token = await getOrCreateNablaToken(ctx, ss58ToHex(swapPool.token.id))

    if (token.latestSwapPool && token.latestSwapPool.id !== swapPool.id) {
        const replacedSwapPool = await ctx.store.get(
            SwapPool,
            token.latestSwapPool.id
        )

        if (replacedSwapPool !== undefined) {
            replacedSwapPool.router = undefined // Unregister the existing pool
            ctx.store.save(replacedSwapPool)
        }
    }

    token.latestSwapPool = swapPool
    ctx.store.save(token)
}

export async function updateBackstopCoverageAndSupply(
    ctx: EventHandlerContext,
    backstop: BackstopPool
) {
    const contractHexAddress = ss58ToHex(backstop.id)
    const contract = new backstopPoolAbi.Contract(ctx, contractHexAddress)
    const poolTokenAddress = await contract.asset()
    const poolTokenContract = new erc20Abi.Contract(ctx, poolTokenAddress)

    backstop.totalSupply = await contract.totalSupply()
    backstop.reserves = await poolTokenContract.balanceOf(contractHexAddress)
}

export async function updateSwapPoolCoverageAndSupply(
    ctx: EventHandlerContext,
    pool: SwapPool
) {
    const contract = new swapPoolAbi.Contract(ctx, ss58ToHex(pool.id))
    const coverage = await contract.coverage()

    pool.totalSupply = await contract.totalSupply()
    pool.reserve = coverage[0]
    pool.totalLiabilities = coverage[1]
    pool.reserveWithSlippage = await contract.reserveWithSlippage()
}

async function updateAndPruneSwapFeeHistory(
    ctx: EventHandlerContext,
    pool: SwapPool,
    newSwapFee: NablaSwapFee
): Promise<void> {
    // Prune fee events older than 7 days
    const sevenDaysAgo =
        newSwapFee.timestamp - BigInt(SWAP_FEE_PRUNE_INTERVAL_SECONDS)

    /*
     * Swap Pool fees history
     */
    // Add the swapFee to the pool's fee history
    const poolFeesHistory = pool.feesHistory
    await filterSwapFeeHistory(ctx, poolFeesHistory, sevenDaysAgo)
}

async function filterSwapFeeHistory(
    ctx: EventHandlerContext,
    feesHistory: NablaSwapFee[],
    pastPeriodInSeconds: bigint
) {
    const filteredFeeHistory: string[] = []

    for (const swapFee of feesHistory) {
        if (swapFee.timestamp > pastPeriodInSeconds) {
            await ctx.store.remove(swapFee)
        }
    }
}

export async function updateAprAfterSwap(
    ctx: EventHandlerContext,
    pool: SwapPool,
    newSwapFee: NablaSwapFee
): Promise<void> {
    // Update the fee history (swapFee, backstopFee)
    await updateAndPruneSwapFeeHistory(ctx, pool, newSwapFee)
    const updatedSwapPool = await ctx.store.get(SwapPool, pool.id)

    if (updatedSwapPool === undefined) return

    const swapPoolContract = new swapPoolAbi.Contract(
        ctx,
        ss58ToHex(updatedSwapPool.id)
    )
    const swapPoolTokenAddress = await swapPoolContract.asset()
    const swapPoolTokenContract = new erc20Abi.Contract(
        ctx,
        swapPoolTokenAddress
    )
    const swapPoolTokenDecimals = await swapPoolTokenContract.decimals()

    /*
     * Swap Pool fees history & APR
     */
    const totalLpFees = updatedSwapPool.feesHistory.reduce(
        (a, b) => a + b.lpFees,
        0n
    )

    const poolTotalSupply = updatedSwapPool.totalSupply
    updatedSwapPool.apr = calculateApr(
        totalLpFees,
        poolTotalSupply,
        BigInt(swapPoolTokenDecimals)
    )
    ctx.store.save(updatedSwapPool)

    /*
     * Backstop Pool fees history
     */
    const backstop = await ctx.store.get(
        BackstopPool,
        updatedSwapPool.backstop.id
    )

    if (backstop !== undefined) {
        const backstopPoolContract = new backstopPoolAbi.Contract(
            ctx,
            ss58ToHex(backstop.id)
        )
        const backstopPoolTokenAddress = await backstopPoolContract.asset()
        const backstopPoolTokenContract = new erc20Abi.Contract(
            ctx,
            backstopPoolTokenAddress
        )
        const backstopPoolTokenDecimals =
            await backstopPoolTokenContract.decimals()

        const totalBackstopFees = backstop.feesHistory.reduce(
            (a, b) => a + b.backstopFees,
            0n
        )

        const backstopTotalSupply = backstop.totalSupply
        backstop.apr = calculateApr(
            totalBackstopFees,
            backstopTotalSupply,
            BigInt(backstopPoolTokenDecimals)
        )
        ctx.store.save(backstop)
    }
}

function calculateApr(
    totalFees: bigint,
    totalSupply: bigint,
    poolTokenDecimals: bigint
): bigint {
    if (totalSupply > 0n) {
        return (totalFees * 365n * 10n ** poolTokenDecimals) / totalSupply / 7n
    } else {
        return 0n
    }
}

export async function getOrCreateBackstopPool(
    ctx: EventHandlerContext,
    hexAddress: string
) {
    const address = codec(config.prefix).encode(hexAddress)
    let backstop = await ctx.store.get(BackstopPool, address)
    if (!backstop) {
        const contract = new backstopPoolAbi.Contract(ctx, hexAddress)
        const poolTokenAddress = await contract.asset()
        const poolTokenContract = new erc20Abi.Contract(ctx, poolTokenAddress)
        const router = await getOrCreateRouter(ctx, await contract.router())
        const token = await getOrCreateNablaToken(ctx, poolTokenAddress)

        backstop = new BackstopPool({
            id: address,
            name: await contract.name(),
            symbol: await contract.symbol(),
            router: router,
            token: token,
            reserves: await poolTokenContract.balanceOf(hexAddress),
            totalSupply: await contract.totalSupply(),
            paused: false,
            apr: 0n,
        })
        ctx.store.save(backstop)
    }
    return backstop
}

export async function getOrCreateRouter(
    ctx: EventHandlerContext,
    hexAddress: string
) {
    const address = codec(config.prefix).encode(hexAddress)
    let router = await ctx.store.get(Router, address)
    if (!router) {
        router = new Router({
            id: address,
            paused: false,
        })
        ctx.store.save(router)
    }
    return router
}

export async function getOrCreateNablaToken(
    ctx: EventHandlerContext,
    hexAddress: string
) {
    const address = codec(config.prefix).encode(hexAddress)
    let nablaToken = await ctx.store.get(NablaToken, address)
    if (!nablaToken) {
        const contract = new erc20Abi.Contract(ctx, hexAddress)
        nablaToken = new NablaToken({
            id: address,
            decimals: await contract.decimals(),
            name: await contract.name(),
            symbol: await contract.symbol(),
            latestSwapPool: null,
        })
        ctx.store.save(nablaToken)
    }
    return nablaToken
}

export async function getOrCreateSwapPool(
    ctx: EventHandlerContext,
    hexAddress: string
) {
    const address = codec(config.prefix).encode(hexAddress)
    let swapPool = await ctx.store.get(SwapPool, address)
    if (!swapPool) {
        const contract = new swapPoolAbi.Contract(ctx, hexAddress)
        const backstop = await getOrCreateBackstopPool(
            ctx,
            await contract.backstop()
        )
        const router = await getOrCreateRouter(ctx, await contract.router())
        const token = await getOrCreateNablaToken(ctx, await contract.asset())

        const coverage = await contract.coverage()

        swapPool = new SwapPool({
            id: address,
            name: await contract.name(),
            symbol: await contract.symbol(),
            router: router,
            backstop: backstop,
            token: token,
            reserve: coverage[0],
            reserveWithSlippage: await contract.reserveWithSlippage(),
            totalLiabilities: coverage[1],
            totalSupply: await contract.totalSupply(),
            paused: false,
            apr: 0n,
            coveredIndex: null,
        })
        ctx.store.save(swapPool)
    }
    return swapPool
}

export async function createSwapFee(
    ctx: EventHandlerContext,
    blockNumber: number,
    extrinsicIndex: number | undefined,
    lpFees: bigint,
    backstopFees: bigint,
    protocolFees: bigint,
    timestamp: number | undefined,
    swapPool: SwapPool,
    backstopPool: BackstopPool
): Promise<NablaSwapFee> {
    const swapFeeId = `${blockNumber}-${extrinsicIndex ?? ''}`
    const swapFee = new NablaSwapFee({
        id: swapFeeId,
        lpFees,
        backstopFees,
        protocolFees,
        timestamp: BigInt(timestamp ?? Date.now() / 1000),
        swapPool,
        backstopPool,
    })

    ctx.store.save(swapFee)
    return swapFee
}
