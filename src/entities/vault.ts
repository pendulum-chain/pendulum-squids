import { EventHandlerContext } from '../processor'
import { Vault } from '../model'
import { hexToSs58 } from '../mappings/nabla/addresses'
import { deriveVaultIdAsString } from '../utils/vault'
import { deriveStellarPublicKeyFromHex } from '../mappings/token'
import { VaultIdType } from '../types/common'
import { parseVaultId } from '../utils/vault'
export interface VaultIdFlat {
    accountId: string
    collateral: string
    wrapped: string
}

export async function getOrCreateVault(
    ctx: EventHandlerContext,
    vaultId: VaultIdType,
    vaultStellarPublicKey: string | undefined
): Promise<Vault | undefined> {
    const vaultIdFlat = parseVaultId(vaultId)
    const vaultIdString = deriveVaultIdAsString(vaultIdFlat)
    let vault = await ctx.store.get(Vault, vaultIdString)

    if (!vault && vaultStellarPublicKey) {
        vault = new Vault({
            id: vaultIdString,
            accountId: hexToSs58(vaultId.accountId),
            collateral: vaultIdFlat.collateral,
            wrapped: vaultIdFlat.wrapped,
            vaultStellarPublicKey: deriveStellarPublicKeyFromHex(
                vaultStellarPublicKey
            ),
        })
        await ctx.store.save(vault)
    }

    return vault
}
