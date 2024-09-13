import { getChainIdFromNetwork } from '../constants'
import { getPair } from '../entities/pair'
import { getOrCreateToken } from '../entities/token'
import {
    updateSingleTokenLockDayData,
    updateSingleTokenLockHourData,
} from '../mappings/farming/update'
import { handleLiquiditySync } from '../mappings/protocol'
import { Bundle, Farm, Incentive, Pair, SingleTokenLock } from '../model'
import { EventHandlerContext } from '../processor'
import { convertTokenToDecimal, getTimePerBlock } from './helpers'
import { sortAssets } from './sort'
import { currencyIdToAssetIndex, parseToTokenIndex } from './token'
import { config, network } from '../config'
import { BlockHeader, ParentBlockHeader } from '@subsquid/substrate-processor'
import { codec } from '@subsquid/ss58'
import {
    getVersionedStorage,
    decodeEvent,
} from '../types/eventsAndStorageSelector'
import { v1 } from '../types/foucoco'

export function formatFarmingCreatedPoolEvent(ctx: EventHandlerContext) {
    return decodeEvent(network, ctx, 'farming', 'farmingPoolCreated')
}

export function formatFarmingPoolResetEvent(ctx: EventHandlerContext) {
    return decodeEvent(network, ctx, 'farming', 'farmingPoolReset')
}

export function formatFarmingPoolClosedEvent(ctx: EventHandlerContext) {
    return decodeEvent(network, ctx, 'farming', 'farmingPoolClosed')
}

export function formatFarmingPoolKilledEvent(ctx: EventHandlerContext) {
    return decodeEvent(network, ctx, 'farming', 'farmingPoolKilled')
}

export function formatFarmingPoolEditedEvent(ctx: EventHandlerContext) {
    return decodeEvent(network, ctx, 'farming', 'farmingPoolEdited')
}

export function formatFarmingChargedEvent(ctx: EventHandlerContext) {
    return decodeEvent(network, ctx, 'farming', 'charged')
}

export function formatFarmingDepositedEvent(ctx: EventHandlerContext) {
    return decodeEvent(network, ctx, 'farming', 'deposited')
}

export function formatFarmingWithdrawnEvent(ctx: EventHandlerContext) {
    return decodeEvent(network, ctx, 'farming', 'withdrawn')
}

export function formatFarmingClaimedEvent(ctx: EventHandlerContext) {
    return decodeEvent(network, ctx, 'farming', 'claimed')
}

export function formatFarmingWithdrawClaimedEvent(ctx: EventHandlerContext) {
    return decodeEvent(network, ctx, 'farming', 'withdrawClaimed')
}

export function formatFarmingGaugeWithdrawnEvent(ctx: EventHandlerContext) {
    return decodeEvent(network, ctx, 'farming', 'gaugeWithdrawn')
}

export function formatFarmingAllForceGaugeClaimedEvent(
    ctx: EventHandlerContext
) {
    return decodeEvent(network, ctx, 'farming', 'allForceGaugeClaimed')
}

export function formatFarmingPartiallyForceGaugeClaimedEvent(
    ctx: EventHandlerContext
) {
    return decodeEvent(network, ctx, 'farming', 'partiallyForceGaugeClaimed')
}

export function formatFarmingAllRetiredEvent(ctx: EventHandlerContext) {
    return decodeEvent(network, ctx, 'farming', 'allRetired')
}

export function formatFarmingPartiallyRetiredEvent(ctx: EventHandlerContext) {
    return decodeEvent(network, ctx, 'farming', 'partiallyRetired')
}

export function formatFarmingRetireLimitSetEvent(ctx: EventHandlerContext) {
    return decodeEvent(network, ctx, 'farming', 'retireLimitSet')
}

export async function getFamingPoolInfo(
    ctx: EventHandlerContext,
    pid: number,
    block: BlockHeader | ParentBlockHeader
) {
    const versionedStorage = await getVersionedStorage(
        network,
        ctx,
        'farming',
        'poolInfos'
    )
    return await versionedStorage.get(block, pid)
}

export async function getFamingSharesAndWithdrawnRewards(
    ctx: EventHandlerContext,
    pid: number,
    user: string
) {
    const versionedStorage = await getVersionedStorage(
        network,
        ctx,
        'farming',
        'sharesAndWithdrawnRewards'
    )
    return await versionedStorage.get(
        ctx.block,
        pid,
        codec(config.prefix).decode(user)
    )
}

export async function updateFarmingPoolInfo(
    ctx: EventHandlerContext,
    pid: number
) {
    const farmingPoolInfo = await getFamingPoolInfo(ctx, pid, ctx.block)
    const farmingTokens = farmingPoolInfo?.tokensProportion.map(
        (item: any) => item[0]
    )
    const farmingToken = farmingTokens[0]
    const assetIdIndex = currencyIdToAssetIndex(farmingToken)

    const poolState = farmingPoolInfo?.state

    let stakeToken = assetIdIndex.toString()
    const liquidityStaked = farmingPoolInfo?.totalShares ?? 0n

    const timePerBlock = getTimePerBlock(ctx)

    const blocksPerDay = BigInt(((3600 * 1000 * 24) / timePerBlock).toFixed(0))

    let stakeUSD = '0'
    let rewardUSDRate = '0'

    let stakeApr = '0'

    const basicRewardPerDay = await Promise.all(
        farmingPoolInfo!.basicRewards.map(async (item: any) => {
            const assetIndex = currencyIdToAssetIndex(item[0])
            const token = await getOrCreateToken(ctx, {
                chainId: getChainIdFromNetwork(network),
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
        farmingPoolInfo!.basicRewards.map(async (item: any) => {
            const assetIndex = currencyIdToAssetIndex(item[0])
            const token = await getOrCreateToken(ctx, {
                chainId: getChainIdFromNetwork(network),
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
                .toFixed(10)
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
        const token0Index = parseToTokenIndex(token0Id, Number(token0Symbol))
        const token1Index = parseToTokenIndex(token1Id, Number(token1Symbol))
        const _asset0 = {
            chainId: getChainIdFromNetwork(network),
            assetType: token0Index === 0 ? 0 : 2,
            assetIndex: BigInt(token0Index),
        }
        const _asset1 = {
            chainId: getChainIdFromNetwork(network),
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

            rewardUSDRate = rewardUSDPerDay.toFixed(10)
            stakeToken = pair.id
            const stakedUSD =
                BigInt(pair.totalSupply) === 0n
                    ? 0
                    : (Number(liquidityStaked) * Number(pair.reserveUSD ?? 0)) /
                      Number(BigInt(pair.totalSupply ?? 0))
            stakeUSD = stakedUSD.toFixed(10)

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
        rewardUSDRate = rewardUSDPerDay.toFixed(10)

        const token = await getOrCreateToken(ctx, {
            chainId: getChainIdFromNetwork(network),
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
        stakeUSD = stakedUSD.toFixed(10)

        singleTokenLock.totalLiquidity = liquidityStaked.toString()
        singleTokenLock.totalLiquidityETH = stakeTokenDecimal
            .times(token.derivedETH)
            .toFixed(10)
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
        stakeApr = ((rewardUSDPerDay * 365) / Number(stakeUSD)).toFixed(10)
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
                rewardPerDay: reward.rewardPerDay.toFixed(10),
            })
        }
        incentive.rewardPerDay = reward.rewardPerDay.toFixed(10)
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
    )
    const farmingToken = farmingTokens[0]
    const assetIdIndex = currencyIdToAssetIndex(farmingToken)

    const poolState = farmingPoolInfo?.state

    let stakeToken = assetIdIndex.toString()
    const liquidityStaked = farmingPoolInfo?.totalShares ?? 0n

    const timePerBlock = getTimePerBlock(ctx)

    const blocksPerDay = BigInt(((3600 * 1000 * 24) / timePerBlock).toFixed(0))

    let stakeUSD = '0'
    let rewardUSDRate = '0'

    let stakeApr = '0'

    const basicRewardPerDay = await Promise.all(
        farmingPoolInfo!.basicRewards.map(async (item: any) => {
            const assetIndex = currencyIdToAssetIndex(item[0])
            const token = await getOrCreateToken(ctx, {
                chainId: getChainIdFromNetwork(network),
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
                chainId: getChainIdFromNetwork(network),
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
                .toFixed(10)
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
        const token0Index = parseToTokenIndex(token0Id, Number(token0Symbol))
        const token1Index = parseToTokenIndex(token1Id, Number(token1Symbol))
        const _asset0 = {
            chainId: getChainIdFromNetwork(network),
            assetType: token0Index === 0 ? 0 : 2,
            assetIndex: BigInt(token0Index),
        }
        const _asset1 = {
            chainId: getChainIdFromNetwork(network),
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

            rewardUSDRate = rewardUSDPerDay.toFixed(10)
            stakeToken = pair.id
            const stakedUSD =
                BigInt(pair.totalSupply) === 0n
                    ? 0
                    : (Number(liquidityStaked) * Number(pair.reserveUSD ?? 0)) /
                      Number(BigInt(pair.totalSupply ?? 0))
            stakeUSD = stakedUSD.toFixed(10)

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
        rewardUSDRate = rewardUSDPerDay.toFixed(10)

        const token = await getOrCreateToken(ctx, {
            chainId: getChainIdFromNetwork(network),
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
        stakeUSD = stakedUSD.toFixed(10)

        singleTokenLock.totalLiquidity = liquidityStaked.toString()
        singleTokenLock.totalLiquidityETH = stakeTokenDecimal
            .times(token.derivedETH)
            .toFixed(10)
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
        stakeApr = ((rewardUSDPerDay * 365) / Number(stakeUSD)).toFixed(10)
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
                rewardPerDay: reward.rewardPerDay.toFixed(10),
            })
        }
        incentive.rewardPerDay = reward.rewardPerDay.toFixed(10)
        await ctx.store.save(incentive)
    }
}
