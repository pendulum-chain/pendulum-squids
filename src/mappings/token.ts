
import { getPosition, getTransaction } from "../entities/utils";
import { EventHandlerContext, TOEKN_EVENT_TYPE } from "../types";
import { Big as BigDecimal } from 'big.js'
import { createLiquidityPosition } from '../utils/helpers';
import {
  Bundle,
  LiquidityPosition,
  LiquidityPositionSnapshot,
  Mint,
  Pair,
  Token,
  User
} from "../model";


async function isCompleteMint(ctx: EventHandlerContext, mintId: string): Promise<boolean> {
  return !!(await ctx.store.get(Mint, mintId))?.sender // sufficient checks
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
      user
    })

    await ctx.store.save(position)

    pair.liquidityProviderCount += 1
  }
  return position
}

export async function createLiquiditySnapShot(
  ctx: EventHandlerContext,
  pair: Pair,
  position: LiquidityPosition,
): Promise<void> {
  const bundle = await ctx.store.get(Bundle, '1')
  const { timestamp } = ctx.block
  if (!pair || !bundle) return
  const token0 = await ctx.store.get(Token, pair.token0.id)
  const token1 = await ctx.store.get(Token, pair.token1.id)
  if (!token0 || !token1) return

  let snapshot = await ctx.store.get(LiquidityPositionSnapshot, `${position.id}${timestamp}`)

  if (!snapshot) {
    // create new snapshot
    snapshot = new LiquidityPositionSnapshot({
      id: `${position.id}${timestamp}`,
      liquidityPosition: position,
      timestamp: new Date(timestamp),
      block: ctx.block.height,
      user: position.user,
      pair: position.pair,
      token0PriceUSD: BigDecimal(token0.derivedETH).times(BigDecimal(bundle.ethPrice)).toFixed(6),
      token1PriceUSD: BigDecimal(token1.derivedETH).times(BigDecimal(bundle.ethPrice)).toFixed(6),
      reserve0: pair.reserve0,
      reserve1: pair.reserve1,
      reserveUSD: pair.reserveUSD,
      liquidityTokenTotalSupply: pair.totalSupply,
      liquidityTokenBalance: position.liquidityTokenBalance,
    })
    await ctx.store.save(snapshot)
  }
}
