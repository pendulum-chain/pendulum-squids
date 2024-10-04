import { EventHandlerContext } from '../processor'
import { Vault, RedeemRequest, IssueRequest } from '../model'
import { beautifyCurrencyIdString } from '../mappings/token'
import { hexToSs58 } from './nabla/addresses'

interface VaultIdFlat {
    accountId: string
    collateral: string
    wrapped: string
}

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
    const { redeemId, redeemer, amount, vaultId, vaultStellarPublicKey } = args
    const vaultIdFlat = parseVaultId(vaultId)
    const vault = await getOrCreateVault(
        ctx,
        vaultIdFlat,
        vaultStellarPublicKey
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

export async function getOrCreateVault(
    ctx: EventHandlerContext,
    vaultId: VaultIdFlat,
    vaultStellarPublicKey: string
): Promise<Vault | undefined> {
    const vaultIdString = `${vaultId.accountId}-${vaultId.collateral}-${vaultId.wrapped}`
    let vault = await ctx.store.get(Vault, vaultIdString)

    if (!vault) {
        vault = new Vault({
            id: vaultIdString,
            accountId: hexToSs58(vaultId.accountId),
            collateral: vaultId.collateral,
            wrapped: vaultId.wrapped,
            vaultStellarPublicKey: vaultStellarPublicKey,
        })
        await ctx.store.save(vault)
    }

    return vault
}

function parseVaultId(vaultId: any): VaultIdFlat {
    return {
        accountId: vaultId.accountId,
        collateral: beautifyCurrencyIdString(vaultId.currencies.collateral),
        wrapped: beautifyCurrencyIdString(vaultId.currencies.wrapped),
    }
}
