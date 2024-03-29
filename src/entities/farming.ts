import { StakePosition } from '../model'
import { EventHandlerContext } from '../processor'

export async function getStakePosition(ctx: EventHandlerContext, id: string) {
    const item = await ctx.store.get(StakePosition, id)
    return item
}
