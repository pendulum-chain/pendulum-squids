import { EventHandlerContext } from '../../processor'
import { BackstopPool } from '../../model'

import {
    decodeEvent,
    Event_CoverSwapWithdrawal,
    Event_WithdrawSwapLiquidity,
    Contract as BackstopPoolContract,
    Event_InsuranceFeeSet,
} from '../../abi/backstop'
import { Contract as Erc20Contract } from '../../abi/erc20'
import { hexToSs58, ss58ToHex } from './addresses'
import { getSwapPool } from './creation'
import { updateSwapPoolCoverageAndSupply } from './swapPoolEventHandler'

export async function handleBackstopPoolEvent(
    ctx: EventHandlerContext,
    backstopPool: BackstopPool
) {
    const event = decodeEvent(ctx.event.args.data)

    switch (event.__kind) {
        case 'Approval':
            // No action required
            break

        case 'Burn':
            await handleBurn(ctx, backstopPool)
            break

        case 'CoverSwapWithdrawal':
            await handleCoverSwapWithdrawal(ctx, event, backstopPool)
            break

        case 'InsuranceFeeSet':
            await handleInsuranceFeeSet(ctx, event, backstopPool)
            break

        case 'Mint':
            await handleMint(ctx, backstopPool)
            break

        case 'OwnershipTransferred':
            // This event will always be emitted on pool creation
            // No action required
            break

        case 'Paused':
            await handlePaused(ctx, backstopPool)
            break

        case 'SwapPoolAdded':
            // No action required
            break

        case 'Transfer':
            // No action required
            break

        case 'Unpaused':
            await handleUnpaused(ctx, backstopPool)
            break

        case 'WithdrawSwapLiquidity':
            await handleWithdrawSwapLiquidity(ctx, event, backstopPool)
            break
    }
}

export async function handleBurn(
    ctx: EventHandlerContext,
    backstopPool: BackstopPool
) {
    await updateBackstopCoverageAndSupply(ctx, backstopPool)
    await ctx.store.save(backstopPool)
}

export async function handleCoverSwapWithdrawal(
    ctx: EventHandlerContext,
    event: Event_CoverSwapWithdrawal,
    backstopPool: BackstopPool
) {
    const swapPoolSs58Address = hexToSs58(event.swapPool)
    const pool = await getSwapPool(ctx, swapPoolSs58Address)
    if (pool === undefined || pool.backstop.id !== backstopPool.id) {
        // this is a non-standard or malicious swap pool, ignore
        return
    }

    await updateBackstopCoverageAndSupply(ctx, backstopPool)
    await updateSwapPoolCoverageAndSupply(ctx, pool)

    await ctx.store.save(backstopPool)
    await ctx.store.save(pool)
}

export async function handleInsuranceFeeSet(
    ctx: EventHandlerContext,
    event: Event_InsuranceFeeSet,
    backstopPool: BackstopPool
) {
    const swapPoolSs58Address = hexToSs58(event.swapPool)
    const swapPool = await getSwapPool(ctx, swapPoolSs58Address)
    if (swapPool === undefined || swapPool.backstop.id !== backstopPool.id) {
        // this is a non-standard or malicious swap pool, ignore
        return
    }

    swapPool.insuranceFeeBps = event.insuranceFeeBps
    await ctx.store.save(swapPool)
}

export async function handleMint(
    ctx: EventHandlerContext,
    backstopPool: BackstopPool
) {
    await updateBackstopCoverageAndSupply(ctx, backstopPool)
    await ctx.store.save(backstopPool)
}

export async function handlePaused(
    ctx: EventHandlerContext,
    backstopPool: BackstopPool
) {
    backstopPool.paused = true
    await ctx.store.save(backstopPool)
}

export async function handleUnpaused(
    ctx: EventHandlerContext,
    backstopPool: BackstopPool
) {
    backstopPool.paused = false
    await ctx.store.save(backstopPool)
}

export async function handleWithdrawSwapLiquidity(
    ctx: EventHandlerContext,
    event: Event_WithdrawSwapLiquidity,
    backstopPool: BackstopPool
) {
    const swapPoolSs58Address = hexToSs58(event.swapPool)
    const pool = await getSwapPool(ctx, swapPoolSs58Address)
    if (pool === undefined || pool.backstop.id !== backstopPool.id) {
        // this is a non-standard or malicious swap pool, ignore
        return
    }

    await updateBackstopCoverageAndSupply(ctx, backstopPool)
    await updateSwapPoolCoverageAndSupply(ctx, pool)

    await ctx.store.save(backstopPool)
    await ctx.store.save(pool)
}

export async function updateBackstopCoverageAndSupply(
    ctx: EventHandlerContext,
    backstopPool: BackstopPool
) {
    const contractHexAddress = ss58ToHex(backstopPool.id)
    const contract = new BackstopPoolContract(ctx, contractHexAddress)
    const poolTokenAddress = await contract.asset()
    const poolTokenContract = new Erc20Contract(ctx, poolTokenAddress)

    backstopPool.totalSupply = await contract.totalSupply()
    backstopPool.reserves = await poolTokenContract.balanceOf(
        contractHexAddress
    )
}
