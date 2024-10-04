import { codec } from '@subsquid/ss58'
import { EventHandlerContext } from '../processor'
import { Transfer } from '../model'
import { config, network } from '../config'
import { decodeEvent } from '../types/eventsAndStorageSelector'

export async function handleBalanceTransfer(ctx: EventHandlerContext) {
    const event = decodeEvent(network, ctx, 'balances', 'transfer')

    const from = codec(config.prefix).encode(event.from)
    const to = codec(config.prefix).encode(event.to)

    const transfer = new Transfer({
        id: ctx.event.id,
        blockNumber: ctx.block.height,
        timestamp: new Date(ctx.block.timestamp!),
        extrinsicHash: ctx.event.extrinsic?.hash,
        from,
        to,
        amount: event.amount,
        fee: ctx.event.extrinsic?.fee || 0n,
    })

    await ctx.store.save(transfer)
}
