import { codec } from '@subsquid/ss58'
import { CallHandlerContext } from '../processor'
import events from '../types/events'
import { config } from '../config'
import { TokenTransfer, Transfer } from '../model'
import { Call } from '@subsquid/substrate-processor'

export async function handleBatchWithRemark(ctx: CallHandlerContext) {
    let origin = codec(config.prefix).encode(ctx.call.origin.value.value)

    // filter out batch calls where there one transfer and
    // one remark only
    if (!hasSystemWithRemark(ctx.call)) {
        return
    }
    const calls = ctx.call.args.calls
    const kinds = calls.map((call: any) => call.__kind)
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

    // handle balances pallet transfer with remark
    if (kinds.includes('Balances')) {
        const balancesCall = calls.find(
            (call: any) => call.__kind === 'Balances'
        )

        // extract dest if it is a transfer call
        let destAddress
        if (balancesCall.value.__kind === 'transfer') {
            destAddress = codec(config.prefix).encode(
                balancesCall.value.dest.value
            )
        } else {
            return
        }

        let matchingBalanceTransfer = await ctx.store.findOne(Transfer, {
            where: {
                from: origin,
                to: destAddress,
                amount: balancesCall.value.amount,
            },
        })

        if (!matchingBalanceTransfer) {
            ctx.log.info(
                `Error when finding the correct transfer for remark with id ${ctx.call.id}.`
            )
            return
        }

        matchingBalanceTransfer.remark = remark ? remark : remarkRaw
        await ctx.store.save(matchingBalanceTransfer)
    } else if (kinds.includes('Tokens')) {
        const tokensCall = calls.find((call: any) => call.__kind === 'Tokens')

        let destAddress
        if (tokensCall.value.__kind === 'transfer') {
            destAddress = codec(config.prefix).encode(
                tokensCall.value.dest.value
            )
        } else {
            return
        }

        let matchingTokenTransfer = await ctx.store.findOne(TokenTransfer, {
            where: {
                from: origin,
                to: destAddress,
                amount: tokensCall.value.amount,
            },
        })

        if (!matchingTokenTransfer) {
            ctx.log.info(
                `Error when finding the correct token transfer for remark with id ${ctx.call.id}.`
            )
            return
        }

        matchingTokenTransfer.remark = remark ? remark : remarkRaw
        await ctx.store.save(matchingTokenTransfer)
    } else {
        // Ignore this case
        return
    }
}

function hasSystemWithRemark(call: Call) {
    try {
        for (const inner_call of call.args.calls) {
            if (inner_call.__kind === 'System') {
                if (inner_call.value.__kind === 'remark') {
                    return true
                } else {
                    return false
                }
            }
        }
    } catch {
        return false
    }
}
