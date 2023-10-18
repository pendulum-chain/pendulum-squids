import { CHAIN_ID } from '../constants'
import { getPair } from '../entities/pair'
import { getOrCreateToken } from '../entities/token'
import {
    updateSingleTokenLockDayData,
    updateSingleTokenLockHourData,
} from '../mappings/farming/update'
import { handleLiquiditySync } from '../mappings/protocol'
import { Bundle, Farm, Incentive, Pair, SingleTokenLock } from '../model'
import { EventHandlerContext } from '../types'
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

export function formatFarmingCreatedPoolEvent(ctx: EventHandlerContext) {
    let event
    if (network === 'foucoco') {
        const _event = new foucocoEvents.FarmingFarmingPoolCreatedEvent(ctx)
        if (_event.isV1) {
            event = _event.asV1
        }
    } else if (network === 'pendulum') {
        const _event = new foucocoEvents.FarmingFarmingPoolCreatedEvent(
            ctx,
            ctx.event
        )
        event = _event.asV1
    } else {
        const _event = new amplitudeEvents.FarmingFarmingPoolCreatedEvent(ctx)
        if (_event.isV10) {
            event = _event.asV10
        }
    }
    return event
}

export function formatFarmingPoolResetEvent(ctx: EventHandlerContext) {
    let event
    if (network === 'foucoco') {
        const _event = new foucocoEvents.FarmingFarmingPoolResetEvent(ctx)
        if (_event.isV1) {
            event = _event.asV1
        }
    } else if (network === 'pendulum') {
        const _event = new foucocoEvents.FarmingFarmingPoolResetEvent(
            ctx,
            ctx.event
        )
        event = _event.asV1
    } else {
        const _event = new amplitudeEvents.FarmingFarmingPoolResetEvent(ctx)
        if (_event.isV10) {
            event = _event.asV10
        }
    }
    return event
}

export function formatFarmingPoolClosedEvent(ctx: EventHandlerContext) {
    let event
    if (network === 'foucoco') {
        const _event = new foucocoEvents.FarmingFarmingPoolClosedEvent(ctx)
        if (_event.isV1) {
            event = _event.asV1
        }
    } else if (network === 'pendulum') {
        const _event = new foucocoEvents.FarmingFarmingPoolClosedEvent(
            ctx,
            ctx.event
        )
        event = _event.asV1
    } else {
        const _event = new amplitudeEvents.FarmingFarmingPoolClosedEvent(ctx)
        if (_event.isV10) {
            event = _event.asV10
        }
    }
    return event
}

export function formatFarmingPoolKilledEvent(ctx: EventHandlerContext) {
    let event
    if (network === 'foucoco') {
        const _event = new foucocoEvents.FarmingFarmingPoolKilledEvent(ctx)
        if (_event.isV1) {
            event = _event.asV1
        }
    } else if (network === 'pendulum') {
        const _event = new foucocoEvents.FarmingFarmingPoolKilledEvent(
            ctx,
            ctx.event
        )
        event = _event.asV1
    } else {
        const _event = new amplitudeEvents.FarmingFarmingPoolKilledEvent(ctx)
        if (_event.isV10) {
            event = _event.asV10
        }
    }
    return event
}

export function formatFarmingPoolEditedEvent(ctx: EventHandlerContext) {
    let event
    if (network === 'foucoco') {
        const _event = new foucocoEvents.FarmingFarmingPoolEditedEvent(ctx)
        if (_event.isV1) {
            event = _event.asV1
        }
    } else if (network === 'pendulum') {
        const _event = new foucocoEvents.FarmingFarmingPoolEditedEvent(
            ctx,
            ctx.event
        )
        event = _event.asV1
    } else {
        const _event = new amplitudeEvents.FarmingFarmingPoolEditedEvent(ctx)
        if (_event.isV10) {
            event = _event.asV10
        }
    }
    return event
}

export function formatFarmingChargedEvent(ctx: EventHandlerContext) {
    let event
    if (network === 'foucoco') {
        const _event = new foucocoEvents.FarmingChargedEvent(ctx)
        if (_event.isV1) {
            event = _event.asV1
        }
    } else if (network === 'pendulum') {
        const _event = new foucocoEvents.FarmingChargedEvent(ctx, ctx.event)
        event = _event.asV1
    } else {
        const _event = new amplitudeEvents.FarmingChargedEvent(ctx)
        if (_event.isV10) {
            event = _event.asV10
        }
    }
    return event
}

export function formatFarmingDepositedEvent(ctx: EventHandlerContext) {
    let event
    if (network === 'foucoco') {
        const _event = new foucocoEvents.FarmingDepositedEvent(ctx)
        if (_event.isV1) {
            event = _event.asV1
        }
    } else if (network === 'pendulum') {
        const _event = new foucocoEvents.FarmingDepositedEvent(ctx, ctx.event)
        event = _event.asV1
    } else {
        const _event = new amplitudeEvents.FarmingDepositedEvent(ctx)
        if (_event.isV10) {
            event = _event.asV10
        }
    }
    return event
}

export function formatFarmingWithdrawnEvent(ctx: EventHandlerContext) {
    let event
    if (network === 'foucoco') {
        const _event = new foucocoEvents.FarmingWithdrawnEvent(ctx)
        if (_event.isV1) {
            event = _event.asV1
        }
    } else if (network === 'pendulum') {
        const _event = new foucocoEvents.FarmingWithdrawnEvent(ctx, ctx.event)
        event = _event.asV1
    } else {
        const _event = new amplitudeEvents.FarmingWithdrawnEvent(ctx)
        if (_event.isV10) {
            event = _event.asV10
        }
    }
    return event
}

export function formatFarmingClaimedEvent(ctx: EventHandlerContext) {
    let event
    if (network === 'foucoco') {
        const _event = new foucocoEvents.FarmingClaimedEvent(ctx)
        if (_event.isV1) {
            event = _event.asV1
        }
    } else if (network === 'pendulum') {
        const _event = new foucocoEvents.FarmingClaimedEvent(ctx, ctx.event)
        event = _event.asV1
    } else {
        const _event = new amplitudeEvents.FarmingClaimedEvent(ctx)
        if (_event.isV10) {
            event = _event.asV10
        }
    }
    return event
}

export function formatFarmingWithdrawClaimedEvent(ctx: EventHandlerContext) {
    let event
    if (network === 'foucoco') {
        const _event = new foucocoEvents.FarmingWithdrawClaimedEvent(ctx)
        if (_event.isV1) {
            event = _event.asV1
        }
    } else if (network === 'pendulum') {
        const _event = new foucocoEvents.FarmingWithdrawClaimedEvent(
            ctx,
            ctx.event
        )
        event = _event.asV1
    } else {
        const _event = new amplitudeEvents.FarmingWithdrawClaimedEvent(ctx)
        if (_event.isV10) {
            event = _event.asV10
        }
    }
    return event
}

export function formatFarmingGaugeWithdrawnEvent(ctx: EventHandlerContext) {
    let event
    if (network === 'foucoco') {
        const _event = new foucocoEvents.FarmingGaugeWithdrawnEvent(ctx)
        if (_event.isV1) {
            event = _event.asV1
        }
    } else if (network === 'pendulum') {
        const _event = new foucocoEvents.FarmingGaugeWithdrawnEvent(
            ctx,
            ctx.event
        )
        event = _event.asV1
    } else {
        const _event = new amplitudeEvents.FarmingGaugeWithdrawnEvent(ctx)
        if (_event.isV10) {
            event = _event.asV10
        }
    }
    return event
}

export function formatFarmingAllForceGaugeClaimedEvent(
    ctx: EventHandlerContext
) {
    let event
    if (network === 'foucoco') {
        const _event = new foucocoEvents.FarmingAllForceGaugeClaimedEvent(ctx)
        if (_event.isV1) {
            event = _event.asV1
        }
    } else if (network === 'pendulum') {
        const _event = new foucocoEvents.FarmingAllForceGaugeClaimedEvent(
            ctx,
            ctx.event
        )
        event = _event.asV1
    } else {
        const _event = new amplitudeEvents.FarmingAllForceGaugeClaimedEvent(ctx)
        if (_event.isV10) {
            event = _event.asV10
        }
    }
    return event
}

export function formatFarmingPartiallyForceGaugeClaimedEvent(
    ctx: EventHandlerContext
) {
    let event
    if (network === 'foucoco') {
        const _event = new foucocoEvents.FarmingPartiallyForceGaugeClaimedEvent(
            ctx
        )
        if (_event.isV1) {
            event = _event.asV1
        }
    } else if (network === 'pendulum') {
        const _event = new foucocoEvents.FarmingPartiallyForceGaugeClaimedEvent(
            ctx,
            ctx.event
        )
        event = _event.asV1
    } else {
        const _event =
            new amplitudeEvents.FarmingPartiallyForceGaugeClaimedEvent(ctx)
        if (_event.isV10) {
            event = _event.asV10
        }
    }
    return event
}

export function formatFarmingAllRetiredEvent(ctx: EventHandlerContext) {
    let event
    if (network === 'foucoco') {
        const _event = new foucocoEvents.FarmingAllRetiredEvent(ctx)
        if (_event.isV1) {
            event = _event.asV1
        }
    } else if (network === 'pendulum') {
        const _event = new foucocoEvents.FarmingAllRetiredEvent(ctx, ctx.event)
        event = _event.asV1
    } else {
        const _event = new amplitudeEvents.FarmingAllRetiredEvent(ctx)
        if (_event.isV10) {
            event = _event.asV10
        }
    }
    return event
}

export function formatFarmingPartiallyRetiredEvent(ctx: EventHandlerContext) {
    let event
    if (network === 'foucoco') {
        const _event = new foucocoEvents.FarmingPartiallyRetiredEvent(ctx)
        if (_event.isV1) {
            event = _event.asV1
        }
    } else if (network === 'pendulum') {
        const _event = new foucocoEvents.FarmingPartiallyRetiredEvent(
            ctx,
            ctx.event
        )
        event = _event.asV1
    } else {
        const _event = new amplitudeEvents.FarmingPartiallyRetiredEvent(ctx)
        if (_event.isV10) {
            event = _event.asV10
        }
    }
    return event
}

export function formatFarmingRetireLimitSetEvent(ctx: EventHandlerContext) {
    let event
    if (network === 'foucoco') {
        const _event = new foucocoEvents.FarmingRetireLimitSetEvent(ctx)
        if (_event.isV1) {
            event = _event.asV1
        }
    } else if (network === 'pendulum') {
        const _event = new foucocoEvents.FarmingRetireLimitSetEvent(
            ctx,
            ctx.event
        )
        event = _event.asV1
    } else {
        const _event = new amplitudeEvents.FarmingRetireLimitSetEvent(ctx)
        if (_event.isV10) {
            event = _event.asV10
        }
    }
    return event
}

export async function getFamingPoolInfo(
    ctx: EventHandlerContext,
    pid: number,
    block = {
        hash: ctx.block.hash,
    }
) {
    let result
    if (network === 'foucoco') {
        const farmingPoolInfoStorage =
            new foucocoStorage.FarmingPoolInfosStorage(ctx, block)
        if (farmingPoolInfoStorage.isV1) {
            result = await farmingPoolInfoStorage.asV1.get(pid)
        }
    } else if (network === 'pendulum') {
        const farmingPoolInfoStorage =
            new foucocoStorage.FarmingPoolInfosStorage(ctx, block)
        if (farmingPoolInfoStorage.isV1) {
            result = await farmingPoolInfoStorage.asV1.get(pid)
        }
    } else {
        const farmingPoolInfoStorage =
            new amplitudeStorage.FarmingPoolInfosStorage(ctx, block)
        if (farmingPoolInfoStorage.isV10) {
            result = await farmingPoolInfoStorage.asV10.get(pid)
        }
    }
    return result
}

export async function getFamingSharesAndWithdrawnRewards(
    ctx: EventHandlerContext,
    pid: number,
    user: Uint8Array
) {
    let result

    if (network === 'foucoco') {
        const storage =
            new foucocoStorage.FarmingSharesAndWithdrawnRewardsStorage(
                ctx,
                ctx.block
            )
        if (storage.isV1) {
            result = await storage.asV1.get(pid, user)
        }
    } else if (network === 'pendulum') {
        const storage =
            new foucocoStorage.FarmingSharesAndWithdrawnRewardsStorage(
                ctx,
                ctx.block
            )
        if (storage.isV1) {
            result = await storage.asV1.get(pid, user)
        }
    } else {
        const storage =
            new amplitudeStorage.FarmingSharesAndWithdrawnRewardsStorage(
                ctx,
                ctx.block
            )
        if (storage.isV10) {
            result = await storage.asV10.get(pid, user)
        }
    }
    return result
}

export async function updateFarmingPoolInfo(
    ctx: EventHandlerContext,
    pid: number
) {
    const farmingPoolInfo = await getFamingPoolInfo(ctx, pid)
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
                    createdAtTimestamp: BigInt(ctx.block.timestamp),
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
                createdAtTimestamp: BigInt(ctx.block.timestamp),
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
    const farmingPoolInfo = await getFamingPoolInfo(ctx, pid, {
        hash: ctx.block.parentHash,
    })
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
                    createdAtTimestamp: BigInt(ctx.block.timestamp),
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
                createdAtTimestamp: BigInt(ctx.block.timestamp),
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
