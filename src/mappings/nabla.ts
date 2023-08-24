import { EventHandlerContext } from '../types'
import { toHex } from '@subsquid/util-internal-hex'
import { BackstopPool, Router, NablaToken, SwapPool } from '../model'
import * as backstopPoolAbi from '../abi/backstop'
import * as erc20Abi from '../abi/erc20'
import * as swapPoolAbi from '../abi/swap'
import * as routerAbi from '../abi/router'
import { codec } from '@subsquid/ss58'
import { config } from '../config'
const { hexToU8a } = require('@polkadot/util')
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
    return toHex(ss58.decode(address).bytes)
}

function decodeEvent(
    data: any,
    decoder: Decoder
): { result: Event | null; error: Error | null } {
    try {
        const event = decoder.decodeEvent(data)
        return { result: event, error: null }
    } catch (err: any) {
        return { result: null, error: err }
    }
}

// Iterates over all decoders and returns the first successfully decoded event
function getEventAndEventType(ctx: EventHandlerContext): {
    event: Event | null
    eventType: EventType | null
} {
    const decoders = [erc20Abi, backstopPoolAbi, swapPoolAbi, routerAbi]
    const eventTypes = [
        null,
        EventType.BackstopPoolEvent,
        EventType.SwapPoolEvent,
        EventType.RouterEvent,
    ]

    for (let i = 0; i < decoders.length; i++) {
        const { result: event, error: err } = decodeEvent(
            ctx.event.args.data,
            decoders[i]
        )
        if (!err) {
            const eventType = eventTypes[i]
            return { event, eventType }
        }
    }

    return { event: null, eventType: null }
}

export async function handleContractEvent(ctx: EventHandlerContext) {
    const { event, eventType } = getEventAndEventType(ctx)
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
    ctx.store.save(backstop)
}

export async function backstopHandleCoverSwapWithdrawal(
    ctx: EventHandlerContext,
    event: backstopPoolAbi.Event_CoverSwapWithdrawal
) {
    const backstop = await getOrCreateBackstopPool(ctx, ctx.event.args.contract)
    const pool = await getOrCreateSwapPool(ctx, toHex(event.swapPool))

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
    const pool = await getOrCreateSwapPool(ctx, toHex(event.swapPool))
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

export function swapHandleChargedSwapFees(ctx: EventHandlerContext) {
    // TODO
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

export async function routerHandleSwap(ctx: EventHandlerContext) {
    await getOrCreateRouter(ctx, ctx.event.args.contract)
}

export async function routerHandleSwapPoolRegistered(
    ctx: EventHandlerContext,
    event: routerAbi.Event_SwapPoolRegistered
) {
    await getOrCreateRouter(ctx, ctx.event.args.contract)
    await getOrCreateSwapPool(ctx, toHex(event.pool))
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
    let address = codec(config.prefix).encode(hexToU8a(hexAddress))
    let backstop = await ctx.store.get(BackstopPool, address)
    if (!backstop) {
        const contract = new backstopPoolAbi.Contract(ctx, hexAddress)
        let router = await getOrCreateRouter(
            ctx,
            toHex(await contract.router())
        )
        let coverage = await contract.coverage()
        backstop = new BackstopPool({
            id: address,
            router: router,
            token: await getOrCreateNablaToken(
                ctx,
                toHex(await contract.asset())
            ),
            totalSupply: await contract.totalSupply(),
            reserves: coverage[0],
            liabilities: coverage[1],
            paused: false,
        })
        ctx.store.save(backstop)
    }
    return backstop
}

export async function getOrCreateRouter(
    ctx: EventHandlerContext,
    hexAddress: string
) {
    let address = codec(config.prefix).encode(hexToU8a(hexAddress))
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
    let address = codec(config.prefix).encode(hexToU8a(hexAddress))
    let nablaToken = await ctx.store.get(NablaToken, address)
    if (!nablaToken) {
        const contract = new erc20Abi.Contract(ctx, hexAddress)
        nablaToken = new NablaToken({
            id: address,
            decimals: await contract.decimals(),
            name: await contract.name(),
            symbol: await contract.symbol(),
        })
        ctx.store.save(nablaToken)
    }
    return nablaToken
}

export async function getOrCreateSwapPool(
    ctx: EventHandlerContext,
    hexAddress: string
) {
    let address = codec(config.prefix).encode(hexToU8a(hexAddress))
    let swapPool = await ctx.store.get(SwapPool, address)
    if (!swapPool) {
        const contract = new swapPoolAbi.Contract(ctx, hexAddress)
        let router = await getOrCreateRouter(
            ctx,
            toHex(await contract.router())
        )
        let backstop = await getOrCreateBackstopPool(
            ctx,
            toHex(await contract.backstop())
        )
        let token = await getOrCreateNablaToken(
            ctx,
            toHex(await contract.asset())
        )
        let coverage = await contract.coverage()
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
        ctx.store.save(swapPool)
    }
    return swapPool
}
