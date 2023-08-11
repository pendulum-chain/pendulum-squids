import { TokenBase } from './types'
import { Big as BigDecimal } from 'big.js'

export const PRICE_ORACLE_KEYS_TO_ADDRESS: { [address: string]: string } = {
    'Amplitude-AMPE': '2124-0-0',
    'Kusama-KSM': '2124-2-256',
}

// These are defined such that the data can be used to access the data from the on-chain price oracle
export const TOKEN_METADATA_MAP: { [address: string]: TokenBase } = {
    '2124-0-0': {
        name: 'AMPLITUDE',
        symbol: 'AMPE',
        blockchain: 'Amplitude',
        decimals: 12,
    },
    '2124-2-256': {
        name: 'Kusama',
        symbol: 'KSM',
        blockchain: 'Kusama',
        decimals: 12,
    },
}

export const CHAIN_ID = 2124

export const ZERO_BI = 0n
export const ONE_BI = 1n
export const ZERO_BD = BigDecimal(0)
export const ONE_BD = BigDecimal(1)
export const BI_18 = 1000000000000000000n
