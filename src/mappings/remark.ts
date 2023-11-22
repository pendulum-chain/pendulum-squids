import { codec } from '@subsquid/ss58'
import { CallHandlerContext } from '../processor'
import events from '../types/events'
import { config } from '../config'
import { TokenTransfer, Transfer } from '../model'

export async function handleSystemRemark(ctx: CallHandlerContext) {
    let origin = codec(config.prefix).encode(ctx.call.origin.value.value)

    let matchingBalanceTransfer = await ctx.store.findOne(Transfer, {
        where: {
            from: origin,
            blockNumber: ctx.call.block.height,
        },
    })

    let matchingTokenTransfer = await ctx.store.findOne(TokenTransfer, {
        where: {
            from: origin,
            blockNumber: ctx.call.block.height,
        },
    })

    // Error if found more than one on the union of both token and balances, or none
    if (matchingBalanceTransfer && matchingTokenTransfer) {
        ctx.log.info(
            `Error when finding the correct transfer for remark with id ${ctx.call.id}. Inconsistent number of transfers for user: ${origin}`
        )
        return
    }

    let remarkRaw = ctx.call.args.remark
    let remark = null
    try {
        // Try decoding remark from hex
        remark = Buffer.from(remarkRaw.slice(2), 'hex').toString('utf8')
    } catch (e) {
        ctx.log.info(
            `Error when decoding remark '${remarkRaw}' with id ${ctx.call.id}.`
        )
    }

    // Either we append the remark to balance transfer or token
    if (matchingBalanceTransfer) {
        matchingBalanceTransfer.remark = remark ? remark : remarkRaw
        await ctx.store.save(matchingBalanceTransfer)
    } else if (matchingTokenTransfer) {
        matchingTokenTransfer.remark = remark ? remark : remarkRaw
        await ctx.store.save(matchingTokenTransfer)
    }
}
