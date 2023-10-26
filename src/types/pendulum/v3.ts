import type { Result, Option } from './support'

export interface CoinInfo {
    symbol: Uint8Array
    name: Uint8Array
    blockchain: Uint8Array
    supply: bigint
    lastUpdateTimestamp: bigint
    price: bigint
}

export type CurrencyId = CurrencyId_Native | CurrencyId_XCM

export interface CurrencyId_Native {
    __kind: 'Native'
}

export interface CurrencyId_XCM {
    __kind: 'XCM'
    value: number
}

export interface AssetId {
    chainId: number
    assetType: number
    assetIndex: bigint
}

export interface Type_449 {
    blockchain: Uint8Array
    symbol: Uint8Array
}

export interface Type_418 {
    free: bigint
    reserved: bigint
    frozen: bigint
}

export type PairStatus =
    | PairStatus_Trading
    | PairStatus_Bootstrap
    | PairStatus_Disable

export interface PairStatus_Trading {
    __kind: 'Trading'
    value: PairMetadata
}

export interface PairStatus_Bootstrap {
    __kind: 'Bootstrap'
    value: BootstrapParameter
}

export interface PairStatus_Disable {
    __kind: 'Disable'
}

export interface PairMetadata {
    pairAccount: Uint8Array
    totalSupply: bigint
}

export interface BootstrapParameter {
    targetSupply: [bigint, bigint]
    capacitySupply: [bigint, bigint]
    accumulatedSupply: [bigint, bigint]
    endBlockNumber: number
    pairAccount: Uint8Array
}
