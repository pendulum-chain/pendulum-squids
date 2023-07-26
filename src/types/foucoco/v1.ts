import type { Result, Option } from './support'

export type CurrencyId =
    | CurrencyId_Native
    | CurrencyId_XCM
    | CurrencyId_Stellar
    | CurrencyId_ZenlinkLPToken

export interface CurrencyId_Native {
    __kind: 'Native'
}

export interface CurrencyId_XCM {
    __kind: 'XCM'
    value: number
}

export interface CurrencyId_Stellar {
    __kind: 'Stellar'
    value: Asset
}

export interface CurrencyId_ZenlinkLPToken {
    __kind: 'ZenlinkLPToken'
    value: [number, number, number, number]
}

export interface AssetId {
    chainId: number
    assetType: number
    assetIndex: bigint
}

export interface AccountInfo {
    nonce: number
    consumers: number
    providers: number
    sufficients: number
    data: AccountData
}

export interface Type_475 {
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

export type Asset = Asset_StellarNative | Asset_AlphaNum4 | Asset_AlphaNum12

export interface Asset_StellarNative {
    __kind: 'StellarNative'
}

export interface Asset_AlphaNum4 {
    __kind: 'AlphaNum4'
    code: Uint8Array
    issuer: Uint8Array
}

export interface Asset_AlphaNum12 {
    __kind: 'AlphaNum12'
    code: Uint8Array
    issuer: Uint8Array
}

export interface AccountData {
    free: bigint
    reserved: bigint
    miscFrozen: bigint
    feeFrozen: bigint
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
