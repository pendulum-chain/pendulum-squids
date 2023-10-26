import { codec } from '@subsquid/ss58'
import { getPair } from '../entities/pair'
import { getPosition, getTransaction } from '../entities/utils'
import { CHAIN_ID, ZERO_BD } from '../constants'
import { EventHandlerContext } from '../types'
import { config } from '../config'
import { Big as BigDecimal } from 'big.js'
import { createLiquidityPosition } from '../utils/helpers'
import {
    Bundle,
    Burn,
    LiquidityPosition,
    LiquidityPositionSnapshot,
    Mint,
    Pair,
    Token,
    Transaction,
    User,
    TokenTransfer,
} from '../model'
import { amplitudeEvents, foucocoEvents, pendulumEvents } from '../types/events'
import { network } from '../config'
import {
    getPairAssetIdFromAssets,
    getPairStatusFromAssets,
    getTokenBalance,
} from '../utils/token'

async function isCompleteMint(
    ctx: EventHandlerContext,
    mintId: string
): Promise<boolean> {
    return !!(await ctx.store.get(Mint, mintId))?.sender // sufficient checks
}

export async function handleTokenDeposited(ctx: EventHandlerContext) {
    const transactionHash = ctx.event.extrinsic?.hash
    if (!transactionHash) return
    let event
    if (network === 'foucoco') {
        const _event = new foucocoEvents.TokensDepositedEvent(ctx, ctx.event)
        if (_event.isV1) {
            event = _event.asV1
        }
    } else if (network === 'pendulum') {
        const _event = new pendulumEvents.TokensDepositedEvent(ctx, ctx.event)
        if (_event.isV1) {
            event = _event.asV1
        } else {
            event = _event.asV3
        }
    } else {
        const _event = new amplitudeEvents.TokensDepositedEvent(ctx, ctx.event)
        if (_event.isV3) {
            event = _event.asV3
        } else if (_event.isV8) {
            event = _event.asV8
        } else if (_event.isV10) {
            event = _event.asV10
        }
    }

    if (!event) return

    const tokenDeposit = new TokenDeposit({
        id: ctx.event.id,
        blockNumber: ctx.block.height,
        timestamp: new Date(ctx.block.timestamp),
        extrinsicHash: ctx.event.extrinsic?.hash,
        who: event.who,
        amount: event.amount,
        currencyId: JSON.stringify(event.currencyId),
    })

    ctx.store.save(tokenDeposit)

    if (event?.currencyId.__kind !== 'ZenlinkLPToken') return

    const [token0Id, token0Type, token1Id, token1Type] = event.currencyId.value
    let token0Index = (token0Type << 8) + token0Id
    let token1Index = (token1Type << 8) + token1Id
    const asset0 = {
        chainId: CHAIN_ID,
        assetType: token0Index === 0 ? 0 : 2,
        assetIndex: BigInt(token0Index),
    }
    const asset1 = {
        chainId: CHAIN_ID,
        assetType: token1Index === 0 ? 0 : 2,
        assetIndex: BigInt(token1Index),
    }

    const pair = await getPair(ctx, [asset0, asset1])
    if (!pair) return

    const value = event.amount.toString()
    const to = codec(config.prefix).encode(event.who)
    let user = await ctx.store.get(User, to)
    if (!user) {
        user = new User({
            id: to,
            liquidityPositions: [],
            stableSwapLiquidityPositions: [],
            usdSwapped: ZERO_BD.toFixed(6),
        })
        await ctx.store.save(user)
    }

    let transaction = await getTransaction(ctx, transactionHash)
    if (!transaction) {
        transaction = new Transaction({
            id: transactionHash,
            blockNumber: BigInt(ctx.block.height),
            timestamp: new Date(ctx.block.timestamp),
            mints: [],
            burns: [],
            swaps: [],
        })
        await ctx.store.save(transaction)
    }

    pair.totalSupply = (
        await getPairStatusFromAssets(ctx, [asset0, asset1], false)
    )[1].toString()
    console.log('set pair total supply', pair.totalSupply)
    const { burns, mints } = transaction
    let burn: Burn
    if (burns.length > 0) {
        const currentBurn = await ctx.store.get(Burn, burns[burns.length - 1])
        if (currentBurn?.needsComplete) {
            burn = currentBurn
        } else {
            burn = new Burn({
                id: `${transactionHash}-${burns.length}`,
                transaction,
                needsComplete: false,
                pair,
                liquidity: value,
                timestamp: new Date(ctx.block.timestamp),
            })
        }
    } else {
        burn = new Burn({
            id: `${transactionHash}-${burns.length}`,
            transaction,
            needsComplete: false,
            pair,
            liquidity: value,
            timestamp: new Date(ctx.block.timestamp),
        })
    }

    // if this logical burn included a fee mint, account for this
    if (
        mints.length !== 0 &&
        !(await isCompleteMint(ctx, mints[mints.length - 1]))
    ) {
        const mint = await ctx.store.get(Mint, mints[mints.length - 1])
        if (mint) {
            burn.feeTo = mint.to
            burn.feeLiquidity = mint.liquidity
        }

        await ctx.store.remove(Mint, mints[mints.length - 1])
        mints.pop()
        transaction.mints = mints
    }
    await ctx.store.save(burn)
    if (burn.needsComplete) {
        // TODO: Consider using .slice(0, -1).concat() to protect against
        // unintended side effects for other code paths.
        burns[burns.length - 1] = burn.id
    } else {
        burns.push(burn.id)
    }
    transaction.burns = burns

    await ctx.store.save(transaction)
    await ctx.store.save(pair)

    const position = await updateLiquidityPosition(ctx, pair, user)
    position.liquidityTokenBalance =
        (await getTokenBalance(ctx, event.currencyId, event.who))?.toString() ??
        '0'
    await ctx.store.save(position)
    await createLiquiditySnapShot(ctx, pair, position)
}

export async function handleTokenWithdrawn(ctx: EventHandlerContext) {
    const transactionHash = ctx.event.extrinsic?.hash
    if (!transactionHash) return

    let event
    if (network === 'foucoco') {
        const _event = new foucocoEvents.TokensWithdrawnEvent(ctx, ctx.event)
        if (_event.isV1) {
            event = _event.asV1
        }
    } else if (network === 'pendulum') {
        const _event = new pendulumEvents.TokensWithdrawnEvent(ctx, ctx.event)
        if (_event.isV1) {
            event = _event.asV1
        } else {
            event = _event.asV3
        }
    } else {
        const _event = new amplitudeEvents.TokensWithdrawnEvent(ctx, ctx.event)
        if (_event.isV3) {
            event = _event.asV3
        } else if (_event.isV8) {
            event = _event.asV8
        } else if (_event.isV10) {
            event = _event.asV10
        }
    }

    if (!event) return

    const tokenWithdrawn = new TokenWithdrawn({
        id: ctx.event.id,
        blockNumber: ctx.block.height,
        timestamp: new Date(ctx.block.timestamp),
        extrinsicHash: ctx.event.extrinsic?.hash,
        who: event.who,
        amount: event.amount,
        currencyId: JSON.stringify(event.currencyId),
    })

    ctx.store.save(tokenWithdrawn)

    if (event?.currencyId.__kind !== 'ZenlinkLPToken') return

    const [token0Id, token0Type, token1Id, token1Type] = event.currencyId.value
    let token0Index = (token0Type << 8) + token0Id
    let token1Index = (token1Type << 8) + token1Id
    const asset0 = {
        chainId: CHAIN_ID,
        assetType: token0Index === 0 ? 0 : 2,
        assetIndex: BigInt(token0Index),
    }
    const asset1 = {
        chainId: CHAIN_ID,
        assetType: token1Index === 0 ? 0 : 2,
        assetIndex: BigInt(token1Index),
    }

    const pair = await getPair(ctx, [asset0, asset1])
    if (!pair) return

    const value = event.amount.toString()
    const to = codec(config.prefix).encode(event.who)
    let user = await ctx.store.get(User, to)
    if (!user) {
        user = new User({
            id: to,
            liquidityPositions: [],
            usdSwapped: ZERO_BD.toFixed(6),
        })
        await ctx.store.save(user)
    }

    // get or create transaction
    let transaction = await getTransaction(ctx, transactionHash)
    if (!transaction) {
        transaction = new Transaction({
            id: transactionHash,
            blockNumber: BigInt(ctx.block.height),
            timestamp: new Date(ctx.block.timestamp),
            mints: [],
            burns: [],
            swaps: [],
        })
        await ctx.store.save(transaction)
    }

    pair.totalSupply = (
        await getPairStatusFromAssets(ctx, [asset0, asset1], false)
    )[1].toString()
    console.log('also set pair.totalSupply', pair.totalSupply)
    const { burns, mints } = transaction
    let burn: Burn
    if (burns.length > 0) {
        const currentBurn = await ctx.store.get(Burn, burns[burns.length - 1])
        if (currentBurn?.needsComplete) {
            burn = currentBurn
        } else {
            burn = new Burn({
                id: `${transactionHash}-${burns.length}`,
                transaction,
                needsComplete: false,
                pair,
                liquidity: value,
                timestamp: new Date(ctx.block.timestamp),
            })
        }
    } else {
        burn = new Burn({
            id: `${transactionHash}-${burns.length}`,
            transaction,
            needsComplete: false,
            pair,
            liquidity: value,
            timestamp: new Date(ctx.block.timestamp),
        })
    }

    // if this logical burn included a fee mint, account for this
    if (
        mints.length !== 0 &&
        !(await isCompleteMint(ctx, mints[mints.length - 1]))
    ) {
        const mint = await ctx.store.get(Mint, mints[mints.length - 1])
        if (mint) {
            burn.feeTo = mint.to
            burn.feeLiquidity = mint.liquidity
        }

        await ctx.store.remove(Mint, mints[mints.length - 1])
        mints.pop()
        transaction.mints = mints
    }
    await ctx.store.save(burn)
    if (burn.needsComplete) {
        // TODO: Consider using .slice(0, -1).concat() to protect against
        // unintended side effects for other code paths.
        burns[burns.length - 1] = burn.id
    } else {
        burns.push(burn.id)
    }
    transaction.burns = burns

    await ctx.store.save(transaction)
    await ctx.store.save(pair)

    const position = await updateLiquidityPosition(ctx, pair, user)
    position.liquidityTokenBalance =
        (await getTokenBalance(ctx, event.currencyId, event.who))?.toString() ??
        '0'
    await ctx.store.save(position)
    await createLiquiditySnapShot(ctx, pair, position)
}

export async function handleTokenTransfer(ctx: EventHandlerContext) {
    let event
    if (network === 'foucoco') {
        const _event = new foucocoEvents.TokensTransferEvent(ctx, ctx.event)
        if (_event.isV1) {
            event = _event.asV1
        }
    } else if (network === 'pendulum') {
        const _event = new pendulumEvents.TokensTransferEvent(ctx, ctx.event)
        if (_event.isV1) {
            event = _event.asV1
        } else {
            event = _event.asV3
        }
    } else {
        const _event = new amplitudeEvents.TokensTransferEvent(ctx, ctx.event)
        if (_event.isV3) {
            event = _event.asV3
        } else if (_event.isV8) {
            event = _event.asV8
        } else if (_event.isV10) {
            event = _event.asV10
        }
    }

    if (!event) return

    const tokenTransfer = new TokenTransfer({
        id: ctx.event.id,
        blockNumber: ctx.block.height,
        timestamp: new Date(ctx.block.timestamp),
        extrinsicHash: ctx.event.extrinsic?.hash,
        from: codec(config.prefix).encode(event.from),
        to: codec(config.prefix).encode(event.to),
        amount: event.amount,
        currencyId: JSON.stringify(event.currencyId),
    })

    ctx.store.save(tokenTransfer)

    if (event?.currencyId.__kind !== 'ZenlinkLPToken') return

    const [token0Id, token0Type, token1Id, token1Type] = event.currencyId.value
    let token0Index = (token0Type << 8) + token0Id
    let token1Index = (token1Type << 8) + token1Id
    const asset0 = {
        chainId: CHAIN_ID,
        assetType: token0Index === 0 ? 0 : 2,
        assetIndex: BigInt(token0Index),
    }
    const asset1 = {
        chainId: CHAIN_ID,
        assetType: token1Index === 0 ? 0 : 2,
        assetIndex: BigInt(token1Index),
    }

    const pair = await getPair(ctx, [asset0, asset1])
    if (!pair) return

    const from = codec(config.prefix).encode(event.from)
    const to = codec(config.prefix).encode(event.to)

    let userFrom = await ctx.store.get(User, from)
    if (!userFrom) {
        userFrom = new User({
            id: from,
            liquidityPositions: [],
            stableSwapLiquidityPositions: [],
            usdSwapped: ZERO_BD.toString(),
        })
    }
    const positionFrom = await updateLiquidityPosition(ctx, pair, userFrom)
    positionFrom.liquidityTokenBalance =
        (
            await getTokenBalance(ctx, event.currencyId, event.from)
        )?.toString() ?? '0'
    await ctx.store.save(positionFrom)
    await createLiquiditySnapShot(ctx, pair, positionFrom)

    let userTo = await ctx.store.get(User, to)
    if (!userTo) {
        userTo = new User({
            id: to,
            liquidityPositions: [],
            stableSwapLiquidityPositions: [],
            usdSwapped: ZERO_BD.toFixed(6),
        })
        await ctx.store.save(userTo)
    }
    const positionTo = await updateLiquidityPosition(ctx, pair, userTo)
    positionTo.liquidityTokenBalance =
        (await getTokenBalance(ctx, event.currencyId, event.to))?.toString() ??
        '0'
    await ctx.store.save(positionTo)
    await createLiquiditySnapShot(ctx, pair, positionTo)
}

export async function updateLiquidityPosition(
    ctx: EventHandlerContext,
    pair: Pair,
    user: User
): Promise<LiquidityPosition> {
    let position = await getPosition(ctx, `${pair.id}-${user.id}`)
    if (!position) {
        position = createLiquidityPosition({
            pair,
            user,
        })

        await ctx.store.save(position)

        pair.liquidityProviderCount += 1
    }
    return position
}

export async function createLiquiditySnapShot(
    ctx: EventHandlerContext,
    pair: Pair,
    position: LiquidityPosition
): Promise<void> {
    const bundle = await ctx.store.get(Bundle, '1')
    const { timestamp } = ctx.block
    if (!pair || !bundle) return
    const token0 = await ctx.store.get(Token, pair.token0.id)
    const token1 = await ctx.store.get(Token, pair.token1.id)
    if (!token0 || !token1) return

    let snapshot = await ctx.store.get(
        LiquidityPositionSnapshot,
        `${position.id}${timestamp}`
    )

    if (!snapshot) {
        // create new snapshot
        snapshot = new LiquidityPositionSnapshot({
            id: `${position.id}${timestamp}`,
            liquidityPosition: position,
            timestamp: new Date(timestamp),
            block: ctx.block.height,
            user: position.user,
            pair: position.pair,
            token0PriceUSD: BigDecimal(token0.derivedETH)
                .times(BigDecimal(bundle.ethPrice))
                .toFixed(6),
            token1PriceUSD: BigDecimal(token1.derivedETH)
                .times(BigDecimal(bundle.ethPrice))
                .toFixed(6),
            reserve0: pair.reserve0,
            reserve1: pair.reserve1,
            reserveUSD: pair.reserveUSD,
            liquidityTokenTotalSupply: pair.totalSupply,
            liquidityTokenBalance: position.liquidityTokenBalance,
        })
        await ctx.store.save(snapshot)
    }
}
