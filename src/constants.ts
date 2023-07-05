import { TokenBase } from './types'
import { Big as BigDecimal } from 'big.js'
import { AssetId } from './types/common'
import { zenlinkAssetIdToCurrencyId } from './utils/token'

// Probably need our own tokens
export const TOKEN_METADATA_MAP: { [address: string]: TokenBase } = {
    '2124-0-0': { name: 'AMPLITUDE', symbol: 'AMPE', decimals: 12 },
    '2124-2-0': { name: 'Kusama', symbol: 'KSM', decimals: 12 },
    // TODO - add more tokens
}

export const CHAIN_ID = 2124

// Zenlink parachain id
// TODO do we need this?
export const ZLK_ASSET_ID: AssetId = {
    chainId: CHAIN_ID, // Need to change this to 2124
    assetType: 2,
    assetIndex: 519n,
}

export const ZLK_CURRENCY_ID = zenlinkAssetIdToCurrencyId(ZLK_ASSET_ID)

export const ZLK_GOV_ACCOUNT = [
    'cRzg4nyCBKbCZaCYmNQksWGMJuectrHom15ZiuYd7h6NtvW',
]

export const ZERO_BI = 0n
export const ONE_BI = 1n
export const ZERO_BD = BigDecimal(0)
export const ONE_BD = BigDecimal(1)
export const BI_18 = 1000000000000000000n
