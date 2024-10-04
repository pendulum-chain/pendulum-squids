import { EventHandlerContext } from '../processor'
import { RedeemRequest, IssueRequest } from '../model'
import { beautifyCurrencyIdString } from '../mappings/token'
import { hexToSs58 } from './nabla/addresses'
import { VaultIdFlat, getOrCreateVault } from '../entities/vault'

export async function handleIssueRequest(ctx: EventHandlerContext) {
    const { id: eventId, args } = ctx.event
    const { issueId, requester, amount, vaultId, vaultStellarPublicKey } = args
    const vaultIdFlat = parseVaultId(vaultId)
    const vault = await getOrCreateVault(
        ctx,
        vaultIdFlat,
        vaultStellarPublicKey
    )

    const issueRequest = new IssueRequest({
        id: eventId,
        timestamp: new Date(ctx.block.timestamp ?? 0),
        issueId: issueId,
        requester: hexToSs58(requester),
        amount: amount,
        vault: vault,
    })

    await ctx.store.save(issueRequest)
}

export async function handleRedeemRequest(ctx: EventHandlerContext) {
    const { id: eventId, args } = ctx.event
    const { redeemId, redeemer, amount, vaultId } = args
    const vaultIdFlat = parseVaultId(vaultId)
    const vault = await getOrCreateVault(
        ctx,
        vaultIdFlat,
        undefined // It doesn't matter we don't have this, the vault should have already issued something and therefore must have been created.
    )

    const redeemRequest = new RedeemRequest({
        id: eventId,
        timestamp: new Date(ctx.block.timestamp ?? 0),
        redeemId: redeemId,
        redeemer: hexToSs58(redeemer),
        amount: amount,
        vault: vault,
    })

    await ctx.store.save(redeemRequest)
}

function parseVaultId(vaultId: any): VaultIdFlat {
    return {
        accountId: vaultId.accountId,
        collateral: beautifyCurrencyIdString(vaultId.currencies.collateral),
        wrapped: beautifyCurrencyIdString(vaultId.currencies.wrapped),
    }
}
