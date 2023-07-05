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

export interface Type_455 {
    free: bigint
    reserved: bigint
    frozen: bigint
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
