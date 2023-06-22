import { codec } from '@subsquid/ss58'
import { EventHandlerContext } from '../types'
import { Transfer } from '../model'
import events from '../types/events'
import { config } from '../config'

export async function handleBalanceTransfer(ctx: EventHandlerContext) {
    const _event = new events.BalancesTransferEvent(ctx, ctx.event)
    const event = _event.asV1

    let from = codec(config.prefix).encode(event.from)
    let to = codec(config.prefix).encode(event.to)

    const transfer = new Transfer({
        id: ctx.event.id,
        blockNumber: ctx.block.height,
        timestamp: new Date(ctx.block.timestamp),
        extrinsicHash: ctx.event.extrinsic?.hash,
        from,
        to,
        amount: event.amount,
        fee: ctx.event.extrinsic?.fee || 0n,
    })

    await ctx.store.save(transfer)
}
