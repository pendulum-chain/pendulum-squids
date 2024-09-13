import { isU8a } from '@polkadot/util'
import { codec } from '@subsquid/ss58'
import { config } from '../config'
import { ZERO_BD } from '../constants'
import { User } from '../model'
import { EventHandlerContext } from '../processor'

export async function getUser(
    ctx: EventHandlerContext,
    who: string
): Promise<User> {
    const address = codec(config.prefix).encode(who)
    let user = await ctx.store.get(User, address)
    if (!user) {
        user = new User({
            id: codec(config.prefix).encode(who),
            liquidityPositions: [],
            stableSwapLiquidityPositions: [],
            usdSwapped: ZERO_BD.toFixed(10),
        })
        await ctx.store.save(user)
    }
    return user
}
