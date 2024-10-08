import { VaultIdFlat } from '../entities/vault'
import { beautifyCurrencyIdString } from '../mappings/token'
import { VaultIdType } from '../types/common'
import { hexToSs58 } from '../mappings/nabla/addresses'

export function parseVaultId(vault: VaultIdType): VaultIdFlat {
    return {
        accountId: hexToSs58(vault.accountId),
        collateral: beautifyCurrencyIdString(vault.currencies.collateral),
        wrapped: beautifyCurrencyIdString(vault.currencies.wrapped),
    }
}

export function deriveVaultIdAsString(vaultId: VaultIdFlat) {
    return `${vaultId.accountId}-${vaultId.collateral}-${vaultId.wrapped}`
}
