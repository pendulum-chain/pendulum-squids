import { CHAIN_ID } from '../constants'
import { getPair } from '../entities/pair'
import { getOrCreateToken } from '../entities/token'
import {
    updateSingleTokenLockDayData,
    updateSingleTokenLockHourData,
} from '../mappings/farming/update'
import { handleLiquiditySync } from '../mappings/protocol'
import { Bundle, Farm, Incentive, Pair, SingleTokenLock } from '../model'
import { EventHandlerContext } from '../processor'
import { foucocoEvents, amplitudeEvents } from '../types/events'
import { amplitudeStorage, foucocoStorage } from '../types/storage'
import { convertTokenToDecimal, getTimePerBlock } from './helpers'
import { sortAssets } from './sort'
import {
    currencyIdToAssetIndex,
    invertedTokenSymbolMap,
    parseToTokenIndex,
} from './token'
import { config, network } from '../config'
import { BlockHeader, ParentBlockHeader } from '@subsquid/substrate-processor'
import { codec } from '@subsquid/ss58'

export function formatFarmingCreatedPoolEvent(ctx: EventHandlerContext) {
    let event
    if (network === 'foucoco') {
        event = foucocoEvents.farming.farmingPoolCreated.v1.decode(ctx.event)
    } else if (network === 'pendulum') {
        // FIXME: Change foucocoEvents to pendulumEvents when the farming pallet is implemented on pendulum.
        event = foucocoEvents.farming.farmingPoolCreated.v1.decode(ctx.event)
    } else {
        event = amplitudeEvents.farming.farmingPoolCreated.v10.decode(ctx.event)
    }
    return event
}

export function formatFarmingPoolResetEvent(ctx: EventHandlerContext) {
    let event
    if (network === 'foucoco') {
        event = foucocoEvents.farming.farmingPoolReset.v1.decode(ctx.event)
    } else if (network === 'pendulum') {
        // FIXME: Change foucocoEvents to pendulumEvents when the farming pallet is implemented on pendulum.
        event = foucocoEvents.farming.farmingPoolReset.v1.decode(ctx.event)
    } else {
        event = amplitudeEvents.farming.farmingPoolReset.v10.decode(ctx.event)
    }
    return event
}

export function formatFarmingPoolClosedEvent(ctx: EventHandlerContext) {
    let event
    if (network === 'foucoco') {
        event = foucocoEvents.farming.farmingPoolClosed.v1.decode(ctx.event)
    } else if (network === 'pendulum') {
        // FIXME: Change foucocoEvents to pendulumEvents when the farming pallet is implemented on pendulum.
        event = amplitudeEvents.farming.farmingPoolClosed.v10.decode(ctx.event)
    } else {
        event = amplitudeEvents.farming.farmingPoolClosed.v10.decode(ctx.event)
    }
    return event
}

export function formatFarmingPoolKilledEvent(ctx: EventHandlerContext) {
    let event
    if (network === 'foucoco') {
        event = foucocoEvents.farming.farmingPoolKilled.v1.decode(ctx.event)
    } else if (network === 'pendulum') {
        // FIXME: Change foucocoEvents to pendulumEvents when the farming pallet is implemented on pendulum.
        event = foucocoEvents.farming.farmingPoolKilled.v1.decode(ctx.event)
    } else {
        event = amplitudeEvents.farming.farmingPoolKilled.v10.decode(ctx.event)
    }
    return event
}

export function formatFarmingPoolEditedEvent(ctx: EventHandlerContext) {
    let event
    if (network === 'foucoco') {
        event = foucocoEvents.farming.farmingPoolEdited.v1.decode(ctx.event)
    } else if (network === 'pendulum') {
        // FIXME: Change foucocoEvents to pendulumEvents when the farming pallet is implemented on pendulum.
        event = foucocoEvents.farming.farmingPoolEdited.v1.decode(ctx.event)
    } else {
        event = amplitudeEvents.farming.farmingPoolEdited.v10.decode(ctx.event)
    }
    return event
}

export function formatFarmingChargedEvent(ctx: EventHandlerContext) {
    let event
    if (network === 'foucoco') {
        event = foucocoEvents.farming.charged.v1.decode(ctx.event)
    } else if (network === 'pendulum') {
        // FIXME: Change foucocoEvents to pendulumEvents when the farming pallet is implemented on pendulum.
        event = amplitudeEvents.farming.charged.v10.decode(ctx.event)
    } else {
        if (amplitudeEvents.farming.charged.v10.is(ctx.event)) {
            event = amplitudeEvents.farming.charged.v10.decode(ctx.event)
        }
        if (amplitudeEvents.farming.charged.v12.is(ctx.event)) {
            event = amplitudeEvents.farming.charged.v12.decode(ctx.event)
        }
    }
    return event
}

export function formatFarmingDepositedEvent(ctx: EventHandlerContext) {
    let event
    if (network === 'foucoco') {
        event = foucocoEvents.farming.deposited.v1.decode(ctx.event)
    } else if (network === 'pendulum') {
        // FIXME: Change foucocoEvents to pendulumEvents when the farming pallet is implemented on pendulum.
        event = foucocoEvents.farming.deposited.v1.decode(ctx.event)
    } else {
        event = amplitudeEvents.farming.deposited.v10.decode(ctx.event)
    }
    return event
}

export function formatFarmingWithdrawnEvent(ctx: EventHandlerContext) {
    let event
    if (network === 'foucoco') {
        event = foucocoEvents.farming.withdrawn.v1.decode(ctx.event)
    } else if (network === 'pendulum') {
        // FIXME: Change foucocoEvents to pendulumEvents when the farming pallet is implemented on pendulum.
        event = foucocoEvents.farming.withdrawn.v1.decode(ctx.event)
    } else {
        event = amplitudeEvents.farming.withdrawn.v10.decode(ctx.event)
    }
    return event
}

export function formatFarmingClaimedEvent(ctx: EventHandlerContext) {
    let event
    if (network === 'foucoco') {
        event = foucocoEvents.farming.claimed.v1.decode(ctx.event)
    } else if (network === 'pendulum') {
        // FIXME: Change foucocoEvents to pendulumEvents when the farming pallet is implemented on pendulum.
        event = foucocoEvents.farming.claimed.v1.decode(ctx.event)
    } else {
        event = amplitudeEvents.farming.claimed.v10.decode(ctx.event)
    }
    return event
}

export function formatFarmingWithdrawClaimedEvent(ctx: EventHandlerContext) {
    let event
    if (network === 'foucoco') {
        event = foucocoEvents.farming.withdrawClaimed.v1.decode(ctx.event)
    } else if (network === 'pendulum') {
        // FIXME: Change foucocoEvents to pendulumEvents when the farming pallet is implemented on pendulum.
        event = foucocoEvents.farming.withdrawClaimed.v1.decode(ctx.event)
    } else {
        event = amplitudeEvents.farming.withdrawClaimed.v10.decode(ctx.event)
    }
    return event
}

export function formatFarmingGaugeWithdrawnEvent(ctx: EventHandlerContext) {
    let event
    if (network === 'foucoco') {
        event = foucocoEvents.farming.gaugeWithdrawn.v1.decode(ctx.event)
    } else if (network === 'pendulum') {
        // FIXME: Change foucocoEvents to pendulumEvents when the farming pallet is implemented on pendulum.
        event = foucocoEvents.farming.gaugeWithdrawn.v1.decode(ctx.event)
    } else {
        event = amplitudeEvents.farming.gaugeWithdrawn.v10.decode(ctx.event)
    }
    return event
}

export function formatFarmingAllForceGaugeClaimedEvent(
    ctx: EventHandlerContext
) {
    let event
    if (network === 'foucoco') {
        event = foucocoEvents.farming.allForceGaugeClaimed.v1.decode(ctx.event)
    } else if (network === 'pendulum') {
        // FIXME: Change foucocoEvents to pendulumEvents when the farming pallet is implemented on pendulum.
        event = foucocoEvents.farming.allForceGaugeClaimed.v1.decode(ctx.event)
    } else {
        event = amplitudeEvents.farming.allForceGaugeClaimed.v10.decode(
            ctx.event
        )
    }
    return event
}

export function formatFarmingPartiallyForceGaugeClaimedEvent(
    ctx: EventHandlerContext
) {
    let event
    if (network === 'foucoco') {
        event = foucocoEvents.farming.partiallyForceGaugeClaimed.v1.decode(
            ctx.event
        )
    } else if (network === 'pendulum') {
        // FIXME: Change foucocoEvents to pendulumEvents when the farming pallet is implemented on pendulum.
        event = foucocoEvents.farming.partiallyForceGaugeClaimed.v1.decode(
            ctx.event
        )
    } else {
        event = amplitudeEvents.farming.partiallyForceGaugeClaimed.v10.decode(
            ctx.event
        )
    }
    return event
}

export function formatFarmingAllRetiredEvent(ctx: EventHandlerContext) {
    let event
    if (network === 'foucoco') {
        event = foucocoEvents.farming.allRetired.v1.decode(ctx.event)
    } else if (network === 'pendulum') {
        // FIXME: Change foucocoEvents to pendulumEvents when the farming pallet is implemented on pendulum.
        event = foucocoEvents.farming.allRetired.v1.decode(ctx.event)
    } else {
        event = amplitudeEvents.farming.allRetired.v10.decode(ctx.event)
    }
    return event
}

export function formatFarmingPartiallyRetiredEvent(ctx: EventHandlerContext) {
    let event
    if (network === 'foucoco') {
        event = foucocoEvents.farming.partiallyRetired.v1.decode(ctx.event)
    } else if (network === 'pendulum') {
        // FIXME: Change foucocoEvents to pendulumEvents when the farming pallet is implemented on pendulum.
        event = foucocoEvents.farming.partiallyRetired.v1.decode(ctx.event)
    } else {
        event = amplitudeEvents.farming.partiallyRetired.v10.decode(ctx.event)
    }
    return event
}

export function formatFarmingRetireLimitSetEvent(ctx: EventHandlerContext) {
    let event
    if (network === 'foucoco') {
        event = foucocoEvents.farming.retireLimitSet.v1.decode(ctx.event)
    } else if (network === 'pendulum') {
        // FIXME: Change foucocoEvents to pendulumEvents when the farming pallet is implemented on pendulum.
        event = foucocoEvents.farming.retireLimitSet.v1.decode(ctx.event)
    } else {
        event = amplitudeEvents.farming.retireLimitSet.v10.decode(ctx.event)
    }
    return event
}

export async function getFamingPoolInfo(
    ctx: EventHandlerContext,
    pid: number,
    block: BlockHeader | ParentBlockHeader
) {
    let result
    if (network === 'foucoco') {
        result = await foucocoStorage.farming.poolInfos.v1.get(block, pid)
    } else if (network === 'pendulum') {
        // FIXME: Change foucocoStorage to pendulumStorage when the farming pallet is implemented on pendulum.
        result = await foucocoStorage.farming.poolInfos.v1.get(ctx.block, pid)
    } else {
        if (amplitudeStorage.farming.poolInfos.v10.is(ctx.block)) {
            result = await amplitudeStorage.farming.poolInfos.v10.get(
                ctx.block,
                pid
            )
        }
        if (amplitudeStorage.farming.poolInfos.v12.is(ctx.block)) {
            result = await amplitudeStorage.farming.poolInfos.v12.get(
                ctx.block,
                pid
            )
        }
    }
    return result
}

export async function getFamingSharesAndWithdrawnRewards(
    ctx: EventHandlerContext,
    pid: number,
    user: string
) {
    let result

    if (network === 'foucoco') {
        result = await foucocoStorage.farming.sharesAndWithdrawnRewards.v1.get(
            ctx.block,
            pid,
            codec(config.prefix).decode(user)
        )
    } else if (network === 'pendulum') {
        // FIXME: Change foucocoStorage to pendulumStorage when the farming pallet is implemented on pendulum.
        result = await foucocoStorage.farming.sharesAndWithdrawnRewards.v1.get(
            ctx.block,
            pid,
            codec(config.prefix).decode(user)
        )
    } else {
        if (
            amplitudeStorage.farming.sharesAndWithdrawnRewards.v10.is(ctx.block)
        ) {
            result =
                await amplitudeStorage.farming.sharesAndWithdrawnRewards.v10.get(
                    ctx.block,
                    pid,
                    codec(config.prefix).decode(user)
                )
        }
        if (
            amplitudeStorage.farming.sharesAndWithdrawnRewards.v12.is(ctx.block)
        ) {
            result =
                await amplitudeStorage.farming.sharesAndWithdrawnRewards.v12.get(
                    ctx.block,
                    pid,
                    codec(config.prefix).decode(user)
                )
        }
    }
    return result
}

export async function updateFarmingPoolInfo(
    ctx: EventHandlerContext,
    pid: number
) {
    const farmingPoolInfo = await getFamingPoolInfo(ctx, pid, ctx.block)
    const farmingTokens = farmingPoolInfo?.tokensProportion.map(
        (item) => item[0]
    )!
    const farmingToken = farmingTokens[0]
    const assetIdIndex = currencyIdToAssetIndex(farmingToken)

    const poolState = farmingPoolInfo?.state

    let stakeToken = assetIdIndex.toString()
    const liquidityStaked = farmingPoolInfo?.totalShares ?? 0n

    const timePerBlock = await getTimePerBlock(ctx)

    const blocksPerDay = BigInt(((3600 * 1000 * 24) / timePerBlock).toFixed(0))

    let stakeUSD = '0'
    let rewardUSDRate = '0'

    let stakeApr = '0'

    const basicRewardPerDay = await Promise.all(
        farmingPoolInfo!.basicRewards.map(async (item) => {
            const assetIndex = currencyIdToAssetIndex(item[0])
            const token = await getOrCreateToken(ctx, {
                chainId: CHAIN_ID,
                assetType: assetIndex === 0 ? 0 : 2,
                assetIndex: BigInt(assetIndex),
            })
            if (!token) return
            const rewardPerDay = item[1] * blocksPerDay

            const rewardTokenDecimal = convertTokenToDecimal(
                BigInt(rewardPerDay),
                token.decimals
            )
            return {
                token,
                rewardPerDay: rewardTokenDecimal,
            }
        })
    )

    const basicRewardEthPerDay = await Promise.all(
        farmingPoolInfo!.basicRewards.map(async (item) => {
            const assetIndex = currencyIdToAssetIndex(item[0])
            const token = await getOrCreateToken(ctx, {
                chainId: CHAIN_ID,
                assetType: assetIndex === 0 ? 0 : 2,
                assetIndex: BigInt(assetIndex),
            })
            if (!token) return '0'
            const rewardPerDay = item[1] * blocksPerDay

            const rewardTokenDecimal = convertTokenToDecimal(
                BigInt(rewardPerDay),
                token.decimals
            )
            const rewardEth = rewardTokenDecimal
                .times(token.derivedETH)
                .toFixed(6)
            return rewardEth
        })
    )

    const rewardEthPerDay = basicRewardEthPerDay.reduce((total, cur) => {
        return total + Number(cur)
    }, 0)

    let bundle = await ctx.store.get(Bundle, '1')
    let rewardUSDPerDay = rewardEthPerDay * Number(bundle?.ethPrice ?? 0)

    let farmingData: Farm | undefined

    if (farmingToken.__kind === 'ZenlinkLPToken') {
        const [token0Symbol, token0Id, token1Symbol, token1Id] =
            farmingToken.value
        const token0Index = parseToTokenIndex(
            token0Id,
            // TODO think about this
            // Number(invertedTokenSymbolMap[token0Symbol])
            Number(token0Symbol)
        )
        const token1Index = parseToTokenIndex(
            token1Id,
            // Number(invertedTokenSymbolMap[token1Symbol])
            Number(token1Symbol)
        )
        const _asset0 = {
            chainId: CHAIN_ID,
            assetType: token0Index === 0 ? 0 : 2,
            assetIndex: BigInt(token0Index),
        }
        const _asset1 = {
            chainId: CHAIN_ID,
            assetType: token1Index === 0 ? 0 : 2,
            assetIndex: BigInt(token1Index),
        }
        const [asset0, asset1] = sortAssets([_asset0, _asset1])
        let pair = await getPair(ctx, [asset0, asset1])
        if (pair) {
            await handleLiquiditySync(ctx, pair)
            pair = (await getPair(ctx, [asset0, asset1]))!

            bundle = await ctx.store.get(Bundle, '1')
            rewardUSDPerDay = rewardEthPerDay * Number(bundle?.ethPrice ?? 0)

            rewardUSDRate = rewardUSDPerDay.toFixed(6)
            stakeToken = pair.id
            const stakedUSD =
                BigInt(pair.totalSupply) === 0n
                    ? 0
                    : (Number(liquidityStaked) * Number(pair.reserveUSD ?? 0)) /
                      Number(BigInt(pair.totalSupply ?? 0))
            stakeUSD = stakedUSD.toFixed(6)

            const farmingId = `${stakeToken}-${pid}`
            farmingData = await ctx.store.get(Farm, farmingId)
            if (!farmingData) {
                farmingData = new Farm({
                    id: farmingId,
                    pid: BigInt(pid),
                    stakeToken: stakeToken,
                    liquidityStaked: liquidityStaked,
                    createdAtBlock: BigInt(ctx.block.height),
                    createdAtTimestamp: BigInt(ctx.block.timestamp!),
                    stakedUSD: stakeUSD,
                    rewardUSDPerDay: rewardUSDRate,
                    stakeApr,
                })
            }
            if (!farmingData.pair) {
                farmingData.pair = pair
            }
        }
    } else {
        // single token
        bundle = await ctx.store.get(Bundle, '1')
        rewardUSDPerDay = rewardEthPerDay * Number(bundle?.ethPrice ?? 0)
        rewardUSDRate = rewardUSDPerDay.toFixed(6)

        const token = await getOrCreateToken(ctx, {
            chainId: CHAIN_ID,
            assetType: assetIdIndex === 0 ? 0 : 2,
            assetIndex: BigInt(assetIdIndex),
        })

        if (!token) return

        let singleTokenLock = await ctx.store.get(SingleTokenLock, {
            where: {
                id: token.id,
            },
        })

        if (!singleTokenLock) {
            singleTokenLock = new SingleTokenLock({
                id: token.id,
                token: token,
                totalLiquidity: '0',
                totalLiquidityETH: '0',
                totalLiquidityUSD: '0',
            })
        }

        stakeToken = token.id
        const stakeTokenDecimal = convertTokenToDecimal(
            BigInt(liquidityStaked),
            token.decimals
        )

        const stakedUSD = stakeTokenDecimal
            .times(token.derivedETH)
            .times(bundle?.ethPrice ?? 0)
        stakeUSD = stakedUSD.toFixed(6)

        singleTokenLock.totalLiquidity = liquidityStaked.toString()
        singleTokenLock.totalLiquidityETH = stakeTokenDecimal
            .times(token.derivedETH)
            .toFixed(6)
        singleTokenLock.totalLiquidityUSD = stakeUSD
        await ctx.store.save(singleTokenLock)
        await updateSingleTokenLockHourData(ctx, singleTokenLock)
        await updateSingleTokenLockDayData(ctx, singleTokenLock)

        const farmingId = `${stakeToken}-${pid}`
        farmingData = await ctx.store.get(Farm, farmingId)
        if (!farmingData) {
            farmingData = new Farm({
                id: farmingId,
                pid: BigInt(pid),
                stakeToken: stakeToken,
                liquidityStaked: liquidityStaked,
                createdAtBlock: BigInt(ctx.block.height),
                createdAtTimestamp: BigInt(ctx.block.timestamp!),
                stakedUSD: stakeUSD,
                rewardUSDPerDay: rewardUSDRate,
                stakeApr,
            })
        }
        if (!farmingData.singleTokenLock) {
            farmingData.singleTokenLock = singleTokenLock
        }
    }

    if (Number(stakeUSD) !== 0) {
        stakeApr = ((rewardUSDPerDay * 365) / Number(stakeUSD)).toFixed(6)
    }

    if (!farmingData) return

    farmingData.liquidityStaked = liquidityStaked
    farmingData.stakedUSD = stakeUSD
    farmingData.rewardUSDPerDay = rewardUSDRate
    farmingData.stakeApr = stakeApr

    if (poolState?.__kind === 'Dead') {
        ;(farmingData.rewardUSDPerDay = '0'), (farmingData.stakeApr = '0')
    }
    await ctx.store.save(farmingData)

    for (const reward of basicRewardPerDay) {
        if (!reward) continue
        const incentiveId = `${farmingData.id}-${reward.token.id}`
        let incentive = await ctx.store.get(Incentive, {
            where: {
                id: incentiveId,
            },
        })
        if (!incentive) {
            incentive = new Incentive({
                id: incentiveId,
                farm: farmingData,
                rewardToken: reward.token,
                rewardPerDay: reward.rewardPerDay.toFixed(6),
            })
        }
        incentive.rewardPerDay = reward.rewardPerDay.toFixed(6)
        await ctx.store.save(incentive)
    }
}

export async function killFarmingPoolInfo(
    ctx: EventHandlerContext,
    pid: number
) {
    const farmingPoolInfo = await getFamingPoolInfo(
        ctx,
        pid,
        ctx.block.getParent()
    )
    const farmingTokens = farmingPoolInfo?.tokensProportion.map(
        (item: any) => item[0]
    )!
    const farmingToken = farmingTokens[0]
    const assetIdIndex = currencyIdToAssetIndex(farmingToken)

    const poolState = farmingPoolInfo?.state

    let stakeToken = assetIdIndex.toString()
    const liquidityStaked = farmingPoolInfo?.totalShares ?? 0n

    const timePerBlock = await getTimePerBlock(ctx)

    const blocksPerDay = BigInt(((3600 * 1000 * 24) / timePerBlock).toFixed(0))

    let stakeUSD = '0'
    let rewardUSDRate = '0'

    let stakeApr = '0'

    const basicRewardPerDay = await Promise.all(
        farmingPoolInfo!.basicRewards.map(async (item: any) => {
            const assetIndex = currencyIdToAssetIndex(item[0])
            const token = await getOrCreateToken(ctx, {
                chainId: CHAIN_ID,
                assetType: assetIndex === 0 ? 0 : 2,
                assetIndex: BigInt(assetIndex),
            })
            if (!token) return
            // const rewardPerDay = item[1] * blocksPerDay
            const rewardPerDay = 0

            const rewardTokenDecimal = convertTokenToDecimal(
                BigInt(rewardPerDay),
                token.decimals
            )
            return {
                token,
                rewardPerDay: rewardTokenDecimal,
            }
        })
    )

    const basicRewardEthPerDay = await Promise.all(
        farmingPoolInfo!.basicRewards.map(async (item: any) => {
            const assetIndex = currencyIdToAssetIndex(item[0])
            const token = await getOrCreateToken(ctx, {
                chainId: CHAIN_ID,
                assetType: assetIndex === 0 ? 0 : 2,
                assetIndex: BigInt(assetIndex),
            })
            if (!token) return '0'
            // const rewardPerDay = item[1] * blocksPerDay
            const rewardPerDay = 0

            const rewardTokenDecimal = convertTokenToDecimal(
                BigInt(rewardPerDay),
                token.decimals
            )
            const rewardEth = rewardTokenDecimal
                .times(token.derivedETH)
                .toFixed(6)
            return rewardEth
        })
    )

    const rewardEthPerDay = basicRewardEthPerDay.reduce((total, cur) => {
        return total + Number(cur)
    }, 0)

    let bundle = await ctx.store.get(Bundle, '1')
    let rewardUSDPerDay = rewardEthPerDay * Number(bundle?.ethPrice ?? 0)

    let farmingData: Farm | undefined

    if (farmingToken.__kind === 'LPToken') {
        const [token0Symbol, token0Id, token1Symbol, token1Id] =
            farmingToken.value
        const token0Index = parseToTokenIndex(
            token0Id,
            Number(invertedTokenSymbolMap[token0Symbol.__kind])
        )
        const token1Index = parseToTokenIndex(
            token1Id,
            Number(invertedTokenSymbolMap[token1Symbol.__kind])
        )
        const _asset0 = {
            chainId: CHAIN_ID,
            assetType: token0Index === 0 ? 0 : 2,
            assetIndex: BigInt(token0Index),
        }
        const _asset1 = {
            chainId: CHAIN_ID,
            assetType: token1Index === 0 ? 0 : 2,
            assetIndex: BigInt(token1Index),
        }
        const [asset0, asset1] = sortAssets([_asset0, _asset1])
        let pair = await getPair(ctx, [asset0, asset1])
        if (pair) {
            await handleLiquiditySync(ctx, pair)
            pair = (await getPair(ctx, [asset0, asset1]))!

            bundle = await ctx.store.get(Bundle, '1')
            rewardUSDPerDay = rewardEthPerDay * Number(bundle?.ethPrice ?? 0)

            rewardUSDRate = rewardUSDPerDay.toFixed(6)
            stakeToken = pair.id
            const stakedUSD =
                BigInt(pair.totalSupply) === 0n
                    ? 0
                    : (Number(liquidityStaked) * Number(pair.reserveUSD ?? 0)) /
                      Number(BigInt(pair.totalSupply ?? 0))
            stakeUSD = stakedUSD.toFixed(6)

            const farmingId = `${stakeToken}-${pid}`
            farmingData = await ctx.store.get(Farm, farmingId)
            if (!farmingData) {
                farmingData = new Farm({
                    id: farmingId,
                    pid: BigInt(pid),
                    stakeToken: stakeToken,
                    liquidityStaked: liquidityStaked,
                    createdAtBlock: BigInt(ctx.block.height),
                    createdAtTimestamp: BigInt(ctx.block.timestamp!),
                    stakedUSD: stakeUSD,
                    rewardUSDPerDay: rewardUSDRate,
                    stakeApr,
                })
            }
            if (!farmingData.pair) {
                farmingData.pair = pair
            }
        }
    } else {
        // single token
        bundle = await ctx.store.get(Bundle, '1')
        rewardUSDPerDay = rewardEthPerDay * Number(bundle?.ethPrice ?? 0)
        rewardUSDRate = rewardUSDPerDay.toFixed(6)

        const token = await getOrCreateToken(ctx, {
            chainId: CHAIN_ID,
            assetType: assetIdIndex === 0 ? 0 : 2,
            assetIndex: BigInt(assetIdIndex),
        })

        if (!token) return

        let singleTokenLock = await ctx.store.get(SingleTokenLock, {
            where: {
                id: token.id,
            },
        })

        if (!singleTokenLock) {
            singleTokenLock = new SingleTokenLock({
                id: token.id,
                token: token,
                totalLiquidity: '0',
                totalLiquidityETH: '0',
                totalLiquidityUSD: '0',
            })
        }

        stakeToken = token.id
        const stakeTokenDecimal = convertTokenToDecimal(
            BigInt(liquidityStaked),
            token.decimals
        )

        const stakedUSD = stakeTokenDecimal
            .times(token.derivedETH)
            .times(bundle?.ethPrice ?? 0)
        stakeUSD = stakedUSD.toFixed(6)

        singleTokenLock.totalLiquidity = liquidityStaked.toString()
        singleTokenLock.totalLiquidityETH = stakeTokenDecimal
            .times(token.derivedETH)
            .toFixed(6)
        singleTokenLock.totalLiquidityUSD = stakeUSD
        await ctx.store.save(singleTokenLock)
        await updateSingleTokenLockHourData(ctx, singleTokenLock)
        await updateSingleTokenLockDayData(ctx, singleTokenLock)

        const farmingId = `${stakeToken}-${pid}`
        farmingData = await ctx.store.get(Farm, farmingId)
        if (!farmingData) {
            farmingData = new Farm({
                id: farmingId,
                pid: BigInt(pid),
                stakeToken: stakeToken,
                liquidityStaked: liquidityStaked,
                createdAtBlock: BigInt(ctx.block.height),
                createdAtTimestamp: BigInt(ctx.block.timestamp!),
                stakedUSD: stakeUSD,
                rewardUSDPerDay: rewardUSDRate,
                stakeApr,
            })
        }
        if (!farmingData.singleTokenLock) {
            farmingData.singleTokenLock = singleTokenLock
        }
    }

    if (Number(stakeUSD) !== 0) {
        stakeApr = ((rewardUSDPerDay * 365) / Number(stakeUSD)).toFixed(6)
    }

    if (!farmingData) return

    farmingData.liquidityStaked = liquidityStaked
    farmingData.stakedUSD = stakeUSD
    farmingData.rewardUSDPerDay = rewardUSDRate
    farmingData.stakeApr = stakeApr

    if (poolState?.__kind === 'Dead') {
        ;(farmingData.rewardUSDPerDay = '0'), (farmingData.stakeApr = '0')
    }
    await ctx.store.save(farmingData)

    for (const reward of basicRewardPerDay) {
        if (!reward) continue
        const incentiveId = `${farmingData.id}-${reward.token.id}`
        let incentive = await ctx.store.get(Incentive, {
            where: {
                id: incentiveId,
            },
        })
        if (!incentive) {
            incentive = new Incentive({
                id: incentiveId,
                farm: farmingData,
                rewardToken: reward.token,
                rewardPerDay: reward.rewardPerDay.toFixed(6),
            })
        }
        incentive.rewardPerDay = reward.rewardPerDay.toFixed(6)
        await ctx.store.save(incentive)
    }
}
