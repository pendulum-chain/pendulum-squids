import { EventHandlerContext } from '../processor'
import { toHex } from '@subsquid/util-internal-hex'
import { BackstopPool, Router, NablaToken, SwapPool } from '../model'
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
        await contract.accumulatedSlippage()
        await contract.poolCap()
        return swapPoolAbi.decodeEvent(ctx.event.args.data)
    } catch {
        return undefined
    }
}

function isRouterEvent(ctx: EventHandlerContext) {
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

async function verifyEvent(
    verifier: (ctx: any) => any,
    ctx: EventHandlerContext
) {
    return await verifier(ctx)
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
            await backstophandleBurn(ctx)
        } else if (event.__kind == 'CoverSwapWithdrawal') {
            await backstopHandleCoverSwapWithdrawal(ctx, event)
        } else if (event.__kind == 'WithdrawSwapLiquidity') {
            await backstopHandleWithdrawSwapLiquidity(ctx, event)
        } else if (event.__kind == 'Mint') {
            await backstopHandleMint(ctx)
        } else if (event.__kind == 'OwnershipTransferred') {
            await backstopHandleOwnershipTransferred(ctx)
        } else if (event.__kind == 'Paused') {
            await backstopHandlePaused(ctx)
        } else if (event.__kind == 'Unpaused') {
            await backstopHandleUnpaused(ctx)
        } else if (event.__kind == 'Transfer') {
            await backstopHandleTransfer(ctx)
        }
    } else if (eventType === EventType.RouterEvent) {
        if (event.__kind == 'OwnershipTransferred') {
            await routerHandleOwnershipTransferred(ctx)
        } else if (event.__kind == 'Paused') {
            await routerHandlePaused(ctx)
        } else if (event.__kind == 'Swap') {
            await routerHandleSwap(ctx)
        } else if (event.__kind == 'Unpaused') {
            await routerHandleUnpaused(ctx)
        } else if (event.__kind == 'SwapPoolRegistered') {
            await routerHandleSwapPoolRegistered(ctx, event)
        }
    } else if (eventType === EventType.SwapPoolEvent) {
        if (event.__kind == 'BackstopDrain') {
            await swapHandleBackstopDrain(ctx)
        } else if (event.__kind == 'Burn') {
            await swapHandleBurn(ctx)
        } else if (event.__kind == 'Mint') {
            await swapHandleMint(ctx)
        } else if (event.__kind == 'ChargedSwapFees') {
            await swapHandleChargedSwapFees(ctx)
        } else if (event.__kind == 'OwnershipTransferred') {
            await swapHandleOwnershipTransferred(ctx)
        } else if (event.__kind == 'Paused') {
            await swapHandlePaused(ctx)
        } else if (event.__kind == 'Unpaused') {
            await swapHandleUnpaused(ctx)
        } else if (event.__kind == 'Transfer') {
            await swapHandleTransfer(ctx)
        }
    }
}

export async function backstophandleBurn(ctx: EventHandlerContext) {
    const backstop = await getOrCreateBackstopPool(ctx, ctx.event.args.contract)

    await updateBackstopCoverageAndSupply(ctx, backstop)
    await ctx.store.save(backstop)
}

export async function backstopHandleCoverSwapWithdrawal(
    ctx: EventHandlerContext,
    event: backstopPoolAbi.Event_CoverSwapWithdrawal
) {
    const backstop = await getOrCreateBackstopPool(ctx, ctx.event.args.contract)
    const pool = await getOrCreateSwapPool(ctx, event.swapPool)

    await updateBackstopCoverageAndSupply(ctx, backstop)
    await updateSwapPoolCoverageAndSupply(ctx, pool)

    await ctx.store.save(backstop)
    await ctx.store.save(pool)
}

export async function backstopHandleMint(ctx: EventHandlerContext) {
    const backstop = await getOrCreateBackstopPool(ctx, ctx.event.args.contract)

    await updateBackstopCoverageAndSupply(ctx, backstop)
    await ctx.store.save(backstop)
}

export async function backstopHandleOwnershipTransferred(
    ctx: EventHandlerContext
) {
    // This event will always be emitted on pool creation
    const backstop = await getOrCreateBackstopPool(ctx, ctx.event.args.contract)
    await ctx.store.save(backstop)
}

export async function backstopHandlePaused(ctx: EventHandlerContext) {
    const backstop = await getOrCreateBackstopPool(ctx, ctx.event.args.contract)

    backstop.paused = true
    await ctx.store.save(backstop)
}

export async function backstopHandleTransfer(ctx: EventHandlerContext) {
    const backstop = await getOrCreateBackstopPool(ctx, ctx.event.args.contract)
    await ctx.store.save(backstop)
}

export async function backstopHandleUnpaused(ctx: EventHandlerContext) {
    const backstop = await getOrCreateBackstopPool(ctx, ctx.event.args.contract)

    backstop.paused = false
    await ctx.store.save(backstop)
}

export async function backstopHandleWithdrawSwapLiquidity(
    ctx: EventHandlerContext,
    event: backstopPoolAbi.Event_WithdrawSwapLiquidity
) {
    const backstop = await getOrCreateBackstopPool(ctx, ctx.event.args.contract)
    const pool = await getOrCreateSwapPool(ctx, event.swapPool)
    await updateBackstopCoverageAndSupply(ctx, backstop)
    await updateSwapPoolCoverageAndSupply(ctx, pool)

    await ctx.store.save(backstop)
    await ctx.store.save(pool)
}

export async function swapHandleBackstopDrain(ctx: EventHandlerContext) {
    const pool = await getOrCreateSwapPool(ctx, ctx.event.args.contract)
    const backstop = await getOrCreateBackstopPool(ctx, pool.backstop.id)

    await updateSwapPoolCoverageAndSupply(ctx, pool)
    await updateBackstopCoverageAndSupply(ctx, backstop)

    await ctx.store.save(pool)
    await ctx.store.save(backstop)
}

export async function swapHandleBurn(ctx: EventHandlerContext) {
    const pool = await getOrCreateSwapPool(ctx, ctx.event.args.contract)

    await updateSwapPoolCoverageAndSupply(ctx, pool)
    await ctx.store.save(pool)
}

export function swapHandleChargedSwapFees(ctx: EventHandlerContext) {
    // TODO
}

export async function swapHandleMint(ctx: EventHandlerContext) {
    const pool = await getOrCreateSwapPool(ctx, ctx.event.args.contract)

    await updateSwapPoolCoverageAndSupply(ctx, pool)
    await ctx.store.save(pool)
}

export async function swapHandleOwnershipTransferred(ctx: EventHandlerContext) {
    // This event will always be emitted on pool creation
    const pool = await getOrCreateSwapPool(ctx, ctx.event.args.contract)
    await ctx.store.save(pool)
}

export async function swapHandlePaused(ctx: EventHandlerContext) {
    const pool = await getOrCreateSwapPool(ctx, ctx.event.args.contract)

    pool.paused = true
    await ctx.store.save(pool)
}

export async function swapHandleTransfer(ctx: EventHandlerContext) {}

export async function swapHandleUnpaused(ctx: EventHandlerContext) {
    const pool = await getOrCreateSwapPool(ctx, ctx.event.args.contract)

    pool.paused = false
    await ctx.store.save(pool)
}

export async function routerHandleOwnershipTransferred(
    ctx: EventHandlerContext
) {
    // This event will always be emitted on router creation
    const router = await getOrCreateRouter(ctx, ctx.event.args.contract)
    await ctx.store.save(router)
}

export async function routerHandlePaused(ctx: EventHandlerContext) {
    const router = await getOrCreateRouter(ctx, ctx.event.args.contract)
    // Set the 'paused' property to true
    router.paused = true
    await ctx.store.save(router)
}

export async function routerHandleUnpaused(ctx: EventHandlerContext) {
    const router = await getOrCreateRouter(ctx, ctx.event.args.contract)
    // Set the 'paused' property to false
    router.paused = false
    await ctx.store.save(router)
}

export async function routerHandleSwap(ctx: EventHandlerContext) {
    await getOrCreateRouter(ctx, ctx.event.args.contract)
}

export async function routerHandleSwapPoolRegistered(
    ctx: EventHandlerContext,
    event: routerAbi.Event_SwapPoolRegistered
) {
    await getOrCreateRouter(ctx, ctx.event.args.contract)
    await getOrCreateSwapPool(ctx, event.pool)
}

export async function updateBackstopCoverageAndSupply(
    ctx: EventHandlerContext,
    backstop: BackstopPool
) {
    const contract = new backstopPoolAbi.Contract(ctx, ss58ToHex(backstop.id))
    const coverage = await contract.coverage()

    backstop.totalSupply = await contract.totalSupply()
    backstop.reserves = coverage[0]
    backstop.liabilities = coverage[1]
}

export async function updateSwapPoolCoverageAndSupply(
    ctx: EventHandlerContext,
    pool: SwapPool
) {
    const contract = new swapPoolAbi.Contract(ctx, ss58ToHex(pool.id))
    const coverage = await contract.coverage()

    pool.totalSupply = await contract.totalSupply()
    pool.reserves = coverage[0]
    pool.liabilities = coverage[1]
}

export async function getOrCreateBackstopPool(
    ctx: EventHandlerContext,
    hexAddress: string
) {
    const address = codec(config.prefix).encode(hexAddress)
    let backstop = await ctx.store.get(BackstopPool, address)
    if (!backstop) {
        const contract = new backstopPoolAbi.Contract(ctx, hexAddress)
        const router = await getOrCreateRouter(ctx, await contract.router())
        const coverage = await contract.coverage()
        backstop = new BackstopPool({
            id: address,
            router: router,
            token: await getOrCreateNablaToken(ctx, await contract.asset()),
            totalSupply: await contract.totalSupply(),
            reserves: coverage[0],
            liabilities: coverage[1],
            paused: false,
        })
        await ctx.store.save(backstop)
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
        await ctx.store.save(router)
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
        })
        await ctx.store.save(nablaToken)
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
        const router = await getOrCreateRouter(ctx, await contract.router())
        const backstop = await getOrCreateBackstopPool(
            ctx,
            await contract.backstop()
        )
        const token = await getOrCreateNablaToken(ctx, await contract.asset())
        const coverage = await contract.coverage()
        swapPool = new SwapPool({
            id: address,
            router: router,
            backstop: backstop,
            token: token,
            totalSupply: await contract.totalSupply(),
            reserves: coverage[0],
            liabilities: coverage[1],
            paused: false,
        })
        await ctx.store.save(swapPool)
    }
    return swapPool
}
