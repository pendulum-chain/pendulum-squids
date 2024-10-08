import { EventHandlerContext } from '../processor'
import { Vault } from '../model'
import { hexToSs58 } from '../mappings/nabla/addresses'
import { deriveVaultIdAsString } from '../utils/vault'
export interface VaultIdFlat {
    accountId: string
    collateral: string
    wrapped: string
}

export async function getOrCreateVault(
    ctx: EventHandlerContext,
    vaultId: VaultIdFlat,
    vaultStellarPublicKey: string | undefined
): Promise<Vault | undefined> {
    const vaultIdString = deriveVaultIdAsString(vaultId)
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