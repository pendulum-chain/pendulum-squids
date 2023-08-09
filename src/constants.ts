import { TokenBase } from './types'
import { Big as BigDecimal } from 'big.js'
import { AssetId } from './types/common'
import { zenlinkAssetIdToCurrencyId } from './utils/token'

// Probably need our own tokens
export const TOKEN_METADATA_MAP: { [address: string]: TokenBase } = {
    '2124-0-0': { name: 'AMPLITUDE', symbol: 'AMPE', decimals: 12 },
    '2124-2-256': { name: 'Kusama', symbol: 'KSM', decimals: 12 },
    '2124-2-512': { name: 'Stellar Native', symbol: 'XLM', decimals: 12 },
    '2124-2-513': { name: 'Stellar USDC', symbol: 'USDC', decimals: 12 },
    '2124-2-514': { name: 'Stellar TZS', symbol: 'TZS', decimals: 12 },
    '2124-2-515': { name: 'Stellar BRL', symbol: 'BRL', decimals: 12 },
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

export const FOUCOCO_CONTRACTS = {
    backstopPoolContracts: ['6h7p67AZyzWiN42FSzkWyGZaqMuajo2BAm43LXBQHVXJ8sq7'],
    routerContracts: ['6mrTyH54tYXKsVxrahapG1S54cVMqqwqtnmTLLbj3NZT2f1k'],
    swapPoolContracts: [
        '6gxRBjkhfaWMAhMQmEA1MUvGssc2f9ercXPZrzFUKWTTaCyq',
        '6kauoQTrdZzBCR3RcqJKJwxEGeQyj6zd3yx8H7XBNwbzrcT5',
        '6mMDtTPgghASfTpW4cuwdxSJvuM6mvGMxTHZxXQf9cWVUioS',
    ],
}

export const AMPLITUDE_CONTRACTS = {
    backstopPoolContracts: [],
    routerContracts: [],
    swapPoolContracts: [],
}
