import { TokenBase } from './types'
import { Big as BigDecimal } from 'big.js'

// These are defined such that the data can be used to access the data from the on-chain price oracle
// The key is the blockchain-symbol pair, and the value is the Zenlink asset ID
export const PRICE_ORACLE_KEYS_TO_ADDRESS: { [address: string]: string } = {
    // On Amplitude (capitalization matters)
    'Amplitude-AMPE': '2124-0-0',
    // On Foucoco (capitalization matters)
    'AMPLITUDE-AMPE': '2124-0-0',
    'Kusama-KSM': '2124-2-256',
    'Stellar-XLM': '2124-2-512',
    'FIAT-USD-USD': '2124-2-513',
    'FIAT-TZS-USD': '2124-2-514',
    'FIAT-BRL-USD': '2124-2-515',
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
    '2124-2-257': {
        name: 'Tether USDT',
        symbol: 'FIAT',
        blockchain: 'USD-USD',
        decimals: 12,
    },
    '2124-2-512': {
        name: 'Stellar Native',
        blockchain: 'Stellar',
        symbol: 'XLM',
        decimals: 12,
    },
    '2124-2-513': {
        name: 'Stellar USDC',
        blockchain: 'FIAT',
        symbol: 'USD-USD',
        decimals: 12,
    },
    '2124-2-514': {
        name: 'Stellar TZS',
        blockchain: 'FIAT',
        symbol: 'TZS-USD',
        decimals: 12,
    },
    '2124-2-515': {
        name: 'Stellar BRL',
        blockchain: 'FIAT',
        symbol: 'BRL-USD',
        decimals: 12,
    },
    '2094-0-0': {
        name: 'PENDULUM',
        blockchain: 'Pendulum',
        symbol: 'PEN',
        decimals: 12,
    },
    '2094-2-256': {
        name: 'Polkadot',
        symbol: 'DOT',
        blockchain: 'Polkadot',
        decimals: 10,
    },
    '2094-2-262': {
        name: 'Moonbeam',
        symbol: 'GLMR',
        blockchain: 'Moonbeam',
        decimals: 18,
    },
    '2094-2-512': {
        name: 'Stellar Native',
        blockchain: 'Stellar',
        symbol: 'XLM',
        decimals: 12,
    },
}

export const CHAIN_ID = 2124

export const ZERO_BI = 0n
export const ONE_BI = 1n
export const ZERO_BD = BigDecimal(0)
export const ONE_BD = BigDecimal(1)
export const BI_18 = 1000000000000000000n
