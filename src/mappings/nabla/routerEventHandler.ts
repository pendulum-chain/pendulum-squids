import { EventHandlerContext } from '../../processor'
import { Router } from '../../model'
import {
    decodeEvent,
    Event_Swap,
    Event_SwapPoolRegistered,
    Event_SwapPoolUnregistered,
} from '../../abi/router'
import * as swapPoolAbi from '../../abi/swap'
import {
    getSwapPoolsOfRouterForToken,
    getOrCreateNablaToken,
    getSwapPool,
    createNablaSwap,
    getSwapFee,
} from './creation'
import { updateSwapPoolCoverageAndSupply } from './swapPoolEventHandler'
import { hexToSs58, ss58ToHex } from './addresses'

export async function handleRouterEvent(
    ctx: EventHandlerContext,
    router: Router
) {
    const event = decodeEvent(ctx.event.args.data)

    switch (event.__kind) {
        case 'OwnershipTransferred':
            // This event will always be emitted on router creation
            // no action required
            break

        case 'Paused':
            await handlePaused(ctx, router)
            break

        case 'Swap':
            await handleSwap(ctx, event, router)
            break

        case 'SwapPoolRegistered':
            await handleSwapPoolRegistered(ctx, event, router)
            break

        case 'SwapPoolUnregistered':
            await handleSwapPoolUnregistered(ctx, event, router)
            break

        case 'Unpaused':
            await handleUnpaused(ctx, router)
            break
    }
}

export async function handlePaused(ctx: EventHandlerContext, router: Router) {
    // Set the 'paused' property to true
    router.paused = true
    await ctx.store.save(router)
}

export async function handleUnpaused(ctx: EventHandlerContext, router: Router) {
    // Set the 'paused' property to false
    router.paused = false
    await ctx.store.save(router)
}

export async function handleSwap(
    ctx: EventHandlerContext,
    event: Event_Swap,
    router: Router
) {
    const tokenIn = await getOrCreateNablaToken(ctx, event.tokenIn)
    const tokenOut = await getOrCreateNablaToken(ctx, event.tokenOut)

    const swapPoolIn = await getSwapPoolsOfRouterForToken(
        ctx,
        router.id,
        tokenIn.id
    )
    const swapPoolOut = await getSwapPoolsOfRouterForToken(
        ctx,
        router.id,
        tokenOut.id
    )

    if (swapPoolIn !== undefined) {
        await updateSwapPoolCoverageAndSupply(ctx, swapPoolIn)
        await ctx.store.save(swapPoolIn)
    }

    if (swapPoolOut !== undefined) {
        await updateSwapPoolCoverageAndSupply(ctx, swapPoolOut)
        await ctx.store.save(swapPoolOut)
    }

    const swapFee = await getSwapFee(
        ctx,
        ctx.event.block.height,
        ctx.event.extrinsicIndex
    )

    await createNablaSwap(
        ctx,
        ctx.event.block.height,
        ctx.event.extrinsicIndex,
        ctx.event.block.timestamp!,
        hexToSs58(event.sender),
        event.amountIn,
        event.amountOut,
        tokenIn,
        tokenOut,
        hexToSs58(event.to),
        swapFee
    )
}

export async function handleSwapPoolRegistered(
    ctx: EventHandlerContext,
    event: Event_SwapPoolRegistered,
    router: Router
) {
    const swapPoolSs58Address = hexToSs58(event.pool)
    const swapPool = await getSwapPool(ctx, swapPoolSs58Address)

    if (swapPool === undefined) {
        // this is a non-standard or malicious swap pool, ignore
        return
    }

    await getOrCreateNablaToken(ctx, ss58ToHex(swapPool.token.id))

    const registeredSwapPool = await getSwapPoolsOfRouterForToken(
        ctx,
        router.id,
        swapPool.token.id
    )

    if (registeredSwapPool) {
        if (registeredSwapPool.id === swapPool.id) {
            // this swap pool is already registered, no action required
            console.log(
                `handleSwapPoolRegistered: swap pool already registered at ${swapPool.id}`
            )
            return
        }

        registeredSwapPool.router = null
        await ctx.store.save(registeredSwapPool)
    }

    const swapPoolContract = new swapPoolAbi.Contract(ctx, event.pool)
    const routerOfSwapPool = await swapPoolContract.router()
    if (routerOfSwapPool === ss58ToHex(router.id)) {
        swapPool.router = router
        await ctx.store.save(swapPool)
    }
}

export async function handleSwapPoolUnregistered(
    ctx: EventHandlerContext,
    event: Event_SwapPoolUnregistered,
    router: Router
) {
    const token = await getOrCreateNablaToken(ctx, event.asset)

    const unregisteredSwapPool = await getSwapPoolsOfRouterForToken(
        ctx,
        router.id,
        token.id
    )

    if (unregisteredSwapPool) {
        unregisteredSwapPool.router = null
        await ctx.store.save(unregisteredSwapPool)
    }
}
