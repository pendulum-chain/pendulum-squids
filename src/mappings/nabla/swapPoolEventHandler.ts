import { EventHandlerContext } from '../../processor'
import {
    ZERO_ADDRESS,
    createNablaSwapLiquidityDeposit,
    createNablaSwapLiquidityWithdrawal,
    createSwapFee,
    getBackstopPool,
    getSwapPool,
} from './creation'
import { NablaSwap, NablaSwapFee, SwapPool } from '../../model'
import {
    decodeEvent,
    Contract as SwapPoolContract,
    Event_ChargedSwapFees,
    Event_ProtocolTreasuryChanged,
    Event_Mint,
    Event_Burn,
} from '../../abi/swap'
import { Contract as BackstopPoolContract } from '../../abi/backstop'
import { hexToSs58, ss58ToHex } from './addresses'
import { updateBackstopCoverageAndSupply } from './backstopPoolEventHandler'
import { addSwapLP, removeSwapLP } from '../points/handlePoints'

const SWAP_FEE_PRUNE_INTERVAL_MILLI_SECONDS = 7 * 24 * 60 * 60 * 1000

export async function handleSwapPoolEvent(
    ctx: EventHandlerContext,
    swapPool: SwapPool
) {
    const event = decodeEvent(ctx.event.args.data)

    switch (event.__kind) {
        case 'Approval':
            // No action required
            break

        case 'BackstopDrain':
            await handleBackstopDrain(ctx, swapPool)
            break

        case 'Burn':
            await handleBurn(ctx, event, swapPool)
            break

        case 'ChargedSwapFees':
            await handleChargedSwapFees(ctx, event, swapPool)
            break

        case 'Mint':
            await handleMint(ctx, event, swapPool)
            break

        case 'OwnershipTransferred':
            // This event will always be emitted on pool creation
            // No action required
            break

        case 'Paused':
            await handlePaused(ctx, swapPool)
            break

        case 'ProtocolTreasuryChanged':
            await handleProtocolTreasuryChanged(ctx, event, swapPool)
            break

        case 'Transfer':
            // No action required
            break

        case 'Unpaused':
            await handleUnpaused(ctx, swapPool)
            break
    }
}

export async function handleBackstopDrain(
    ctx: EventHandlerContext,
    swapPool: SwapPool
) {
    await updateSwapPoolCoverageAndSupply(ctx, swapPool)
    await ctx.store.save(swapPool)

    if (swapPool.backstop) {
        const backstop = (await getBackstopPool(ctx, swapPool.backstop.id))!
        await updateBackstopCoverageAndSupply(ctx, backstop)
        await ctx.store.save(backstop)
    }
}

export async function handleBurn(
    ctx: EventHandlerContext,
    event: Event_Burn,
    swapPool: SwapPool
) {
    await updateSwapPoolCoverageAndSupply(ctx, swapPool)
    await createNablaSwapLiquidityWithdrawal(
        ctx,
        ctx.event.block.height,
        ctx.event.extrinsicIndex,
        ctx.event.block.timestamp,
        hexToSs58(event.sender),
        event.poolSharesBurned,
        event.amountPrincipleWithdrawn,
        swapPool
    )

    removeSwapLP(hexToSs58(event.sender), swapPool.id, event.poolSharesBurned)

    await ctx.store.save(swapPool)
}

export async function handleChargedSwapFees(
    ctx: EventHandlerContext,
    event: Event_ChargedSwapFees,
    swapPool: SwapPool
) {
    const backstopPool = (await getBackstopPool(ctx, swapPool.backstop.id))!

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

    // load swap pool with complete fee history
    swapPool = (await getSwapPool(ctx, swapPool.id, true))!
    await updateAprAfterSwap(ctx, swapPool, swapFee)
}

export async function handleMint(
    ctx: EventHandlerContext,
    event: Event_Mint,
    swapPool: SwapPool
) {
    await updateSwapPoolCoverageAndSupply(ctx, swapPool)
    await createNablaSwapLiquidityDeposit(
        ctx,
        ctx.event.block.height,
        ctx.event.extrinsicIndex,
        ctx.event.block.timestamp,
        hexToSs58(event.sender),
        event.poolSharesMinted,
        event.amountPrincipleDeposited,
        swapPool
    )
    addSwapLP(hexToSs58(event.sender), swapPool.id, event.poolSharesMinted)

    await ctx.store.save(swapPool)
}

export async function handlePaused(
    ctx: EventHandlerContext,
    swapPool: SwapPool
) {
    swapPool.paused = true
    await ctx.store.save(swapPool)
}

export async function handleProtocolTreasuryChanged(
    ctx: EventHandlerContext,
    event: Event_ProtocolTreasuryChanged,
    swapPool: SwapPool
) {
    const protocolTreasurySs58Address =
        event.newProtocolTreasury === ZERO_ADDRESS
            ? null
            : hexToSs58(event.newProtocolTreasury)

    swapPool.protocolTreasuryAddress = protocolTreasurySs58Address
    await ctx.store.save(swapPool)
}

export async function handleUnpaused(
    ctx: EventHandlerContext,
    swapPool: SwapPool
) {
    swapPool.paused = false
    await ctx.store.save(swapPool)
}

export async function updateSwapPoolCoverageAndSupply(
    ctx: EventHandlerContext,
    swapPool: SwapPool
) {
    const contract = new SwapPoolContract(
        ctx,
        ss58ToHex(swapPool.id),
        ctx.block.hash
    )
    const coverage = await contract.coverage()

    swapPool.totalSupply = await contract.totalSupply()
    swapPool.reserve = coverage[0]
    swapPool.totalLiabilities = coverage[1]
    swapPool.reserveWithSlippage = await contract.reserveWithSlippage()
}

async function pruneSwapFeeHistory(
    ctx: EventHandlerContext,
    swapPoolWithFeeHistory: SwapPool,
    newSwapFee: NablaSwapFee
): Promise<void> {
    // Prune fee events older than 7 days
    const sevenDaysAgo =
        newSwapFee.timestamp - BigInt(SWAP_FEE_PRUNE_INTERVAL_MILLI_SECONDS)
    const poolFeesHistory = swapPoolWithFeeHistory.feesHistory
    await filterSwapFeeHistory(ctx, poolFeesHistory, sevenDaysAgo)
}

async function filterSwapFeeHistory(
    ctx: EventHandlerContext,
    feesHistory: NablaSwapFee[],
    pastPeriodInSeconds: bigint
) {
    for (const swapFee of feesHistory) {
        if (swapFee.timestamp < pastPeriodInSeconds) {
            // Check for references in the NablaSwap table
            const swapReference = await ctx.store.findOne(NablaSwap, {
                where: { swapFee: { id: swapFee.id } },
            })
            if (swapReference) {
                swapReference.swapFee = null
                await ctx.store.save(swapReference)
            }

            // Now it should be safe to remove the swap fee
            await ctx.store.remove(swapFee)
        }
    }
}

export async function updateAprAfterSwap(
    ctx: EventHandlerContext,
    swapPoolWithFeeHistory: SwapPool,
    newSwapFee: NablaSwapFee
): Promise<void> {
    // Update the fee history (swapFee, backstopFee)
    await pruneSwapFeeHistory(ctx, swapPoolWithFeeHistory, newSwapFee)
    const updatedSwapPool = (await getSwapPool(
        ctx,
        swapPoolWithFeeHistory.id,
        true
    ))!

    const swapPoolContract = new SwapPoolContract(
        ctx,
        ss58ToHex(updatedSwapPool.id),
        ctx.block.hash
    )
    const swapPoolLpTokenDecimals = await swapPoolContract.decimals()

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
        BigInt(swapPoolLpTokenDecimals)
    )
    await ctx.store.save(updatedSwapPool)

    /*
     * Backstop Pool fees history
     */
    const backstop = updatedSwapPool.backstop
        ? await getBackstopPool(ctx, updatedSwapPool.backstop.id, true)
        : undefined

    if (backstop !== undefined) {
        const backstopPoolContract = new BackstopPoolContract(
            ctx,
            ss58ToHex(backstop.id),
            ctx.block.hash
        )
        const backstopPoolLpTokenDecimals =
            await backstopPoolContract.decimals()

        const totalBackstopFees = backstop.feesHistory.reduce(
            (a, b) => a + b.backstopFees,
            0n
        )

        const backstopTotalSupply = backstop.totalSupply
        backstop.apr = calculateApr(
            totalBackstopFees,
            backstopTotalSupply,
            BigInt(backstopPoolLpTokenDecimals)
        )
        await ctx.store.save(backstop)
    }
}

/// This function takes
///  - some total fee generated within 7 days and
///  - some amount of token (totalSupply)
/// It then extrapolates the total fee generated in a year
/// (assuming the same rate) per token of the total supply
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
