import { codec } from '@subsquid/ss58'
import { CallHandlerContext } from '../processor'
import events from '../types/events'
import { config } from '../config'
import { TokenTransfer, Transfer } from '../model'
import { Call } from '@subsquid/substrate-processor'

export async function handleBatchWithRemark(ctx: CallHandlerContext) {
    let origin = codec(config.prefix).encode(ctx.call.origin.value.value)

    // filter out batch calls where there is one transfer and
    // one remark only
    if (!hasSystemWithRemark(ctx.call)) {
        return
    }
    const calls = ctx.call.args.calls
    const kinds = calls.map((call: any) => call.__kind)
    if (kinds.length != 2) return

    const remarkCall = calls.find((call: any) => call.__kind === 'System')

    let remarkRaw = remarkCall.value.remark
    let remark = null
    // Try decoding remark from hex
    try {
        remark = Buffer.from(remarkRaw.slice(2), 'hex').toString('utf8')
    } catch (e) {
        ctx.log.info(
            `Error when decoding remark '${remarkRaw}' with id ${ctx.call.id}.`
        )
    }

    // handle balances pallet and Tokens pallet transfer with remark
    if (kinds.includes('Balances')) {
        await processTransfer('Balances', calls, ctx, origin, remark, remarkRaw)
    } else if (kinds.includes('Tokens')) {
        await processTransfer('Tokens', calls, ctx, origin, remark, remarkRaw)
    } else {
        // Ignore anything else
        return
    }
}

function hasSystemWithRemark(call: Call) {
    let remarkCount = 0
    try {
        for (const inner_call of call.args.calls) {
            if (
                inner_call.__kind === 'System' &&
                inner_call.value.__kind === 'remark'
            ) {
                remarkCount++
            }
        }
    } catch {
        return false
    }

    return remarkCount === 1
}

async function processTransfer(
    kind: string,
    calls: any[],
    ctx: CallHandlerContext,
    origin: string,
    remark: string | null,
    remarkRaw: string
) {
    const call = calls.find((c) => c.__kind === kind)

    // Extract destination address
    let destAddress
    if (call.value.__kind === 'transfer') {
        destAddress = codec(config.prefix).encode(call.value.dest.value)
    } else {
        return
    }

    // Find matching transfer
    let matchingTransfer
    if (kind === 'Balances') {
        matchingTransfer = await ctx.store.findOne(Transfer, {
            where: {
                from: origin,
                to: destAddress,
                amount: call.value.amount,
                blockNumber: ctx.block.height,
            },
        })
    } else if (kind === 'Tokens') {
        matchingTransfer = await ctx.store.findOne(TokenTransfer, {
            where: {
                from: origin,
                to: destAddress,
                amount: call.value.amount,
                blockNumber: ctx.block.height,
            },
        })
    }

    if (!matchingTransfer) {
        ctx.log.info(
            `Error when finding the correct ${kind.toLowerCase()} transfer for remark with id ${
                ctx.call.id
            }.`
        )
        return
    }

    matchingTransfer.remark = remark ? remark : remarkRaw
    await ctx.store.save(matchingTransfer)
}
