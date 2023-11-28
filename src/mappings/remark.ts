import { codec } from '@subsquid/ss58'
import { CallHandlerContext } from '../processor'
import events from '../types/events'
import { config } from '../config'
import { TokenTransfer, Transfer } from '../model'
import { Call } from '@subsquid/substrate-processor'

export async function handleBatchWithRemark(ctx: CallHandlerContext) {
    // ignore unsigned batch calls
    if (ctx.call.origin.value.__kind != 'Signed') {
        return
    }
    let origin = codec(config.prefix).encode(ctx.call.origin.value.value)

    // filter out batch calls where there is one transfer and
    // one remark only
    let remarkCall = hasSystemWithRemark(ctx.call)
    let transferCall = hasBalancesOrTokensTransfer(ctx.call)
    if (!remarkCall || !transferCall) {
        return
    }
    const calls = ctx.call.args.calls
    const kinds = calls.map((call: any) => call.__kind)

    let remarkRaw = remarkCall.remark
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
        await processTransfer(
            'Balances',
            transferCall,
            ctx,
            origin,
            remark,
            remarkRaw
        )
    } else if (kinds.includes('Tokens')) {
        await processTransfer(
            'Tokens',
            transferCall,
            ctx,
            origin,
            remark,
            remarkRaw
        )
    } else {
        // Ignore anything else
        return
    }
}

function hasSystemWithRemark(call: Call) {
    let remarkCount = 0
    let match
    try {
        for (const inner_call of call.args.calls) {
            if (
                inner_call.__kind === 'System' &&
                inner_call.value.__kind === 'remark'
            ) {
                match = inner_call.value
                remarkCount++
            }
        }
    } catch {
        return false
    }
    // it is okay to return the last match
    // since we filter for only one found
    if (remarkCount === 1) {
        return match
    }
    return false
}

function hasBalancesOrTokensTransfer(call: Call) {
    let transferCount = 0
    let transfer
    try {
        for (const inner_call of call.args.calls) {
            if (
                (inner_call.__kind === 'Balances' ||
                    inner_call.__kind === 'Tokens') &&
                inner_call.value.__kind === 'transfer'
            ) {
                transferCount++
                transfer = inner_call.value
            }
        }
    } catch {
        return false
    }

    if (transferCount === 1) {
        return transfer
    }
    return false
}

async function processTransfer(
    kind: string,
    transferCall: any,
    ctx: CallHandlerContext,
    origin: string,
    remark: string | null,
    remarkRaw: string
) {
    // Extract destination address

    let destAddress = codec(config.prefix).encode(transferCall.dest.value)

    // Find matching transfer
    let matchingTransfer
    if (kind === 'Balances') {
        matchingTransfer = await ctx.store.findOne(Transfer, {
            where: {
                from: origin,
                to: destAddress,
                amount: transferCall.amount,
                blockNumber: ctx.block.height,
            },
        })
    } else if (kind === 'Tokens') {
        matchingTransfer = await ctx.store.findOne(TokenTransfer, {
            where: {
                from: origin,
                to: destAddress,
                amount: transferCall.amount,
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
