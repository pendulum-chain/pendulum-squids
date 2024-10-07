import { VaultIdFlat } from '../entities/vault'
import { beautifyCurrencyIdString } from '../mappings/token'

export function parseVaultId(vaultId: any): VaultIdFlat {
    return {
        accountId: vaultId.accountId,
        collateral: beautifyCurrencyIdString(vaultId.currencies.collateral),
        wrapped: beautifyCurrencyIdString(vaultId.currencies.wrapped),
    }
}

export function deriveVaultIdAsString(vaultId: VaultIdFlat) {
    return `${vaultId.accountId}-${vaultId.collateral}-${vaultId.wrapped}`
}
