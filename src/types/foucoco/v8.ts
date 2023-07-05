import { CurrencyId_ZenlinkLPToken } from '../amplitude/v8'
import type { Result, Option } from './support'

export type CurrencyId =
    | CurrencyId_XCM
    | CurrencyId_Native
    | CurrencyId_StellarNative
    | CurrencyId_AlphaNum4
    | CurrencyId_AlphaNum12
    | CurrencyId_ZenlinkLPToken

export interface CurrencyId_XCM {
    __kind: 'XCM'
    value: ForeignCurrencyId
}

export interface CurrencyId_Native {
    __kind: 'Native'
}

export interface CurrencyId_StellarNative {
    __kind: 'StellarNative'
}

export interface CurrencyId_AlphaNum4 {
    __kind: 'AlphaNum4'
    code: Uint8Array
    issuer: Uint8Array
}

export interface CurrencyId_AlphaNum12 {
    __kind: 'AlphaNum12'
    code: Uint8Array
    issuer: Uint8Array
}

export interface Type_455 {
    free: bigint
    reserved: bigint
    frozen: bigint
}

export type ForeignCurrencyId =
    | ForeignCurrencyId_KSM
    | ForeignCurrencyId_KAR
    | ForeignCurrencyId_AUSD
    | ForeignCurrencyId_BNC
    | ForeignCurrencyId_VsKSM
    | ForeignCurrencyId_HKO
    | ForeignCurrencyId_MOVR
    | ForeignCurrencyId_SDN
    | ForeignCurrencyId_KINT
    | ForeignCurrencyId_KBTC
    | ForeignCurrencyId_GENS
    | ForeignCurrencyId_XOR
    | ForeignCurrencyId_TEER
    | ForeignCurrencyId_KILT
    | ForeignCurrencyId_PHA
    | ForeignCurrencyId_ZTG
    | ForeignCurrencyId_USD
    | ForeignCurrencyId_DOT

export interface ForeignCurrencyId_KSM {
    __kind: 'KSM'
}

export interface ForeignCurrencyId_KAR {
    __kind: 'KAR'
}

export interface ForeignCurrencyId_AUSD {
    __kind: 'AUSD'
}

export interface ForeignCurrencyId_BNC {
    __kind: 'BNC'
}

export interface ForeignCurrencyId_VsKSM {
    __kind: 'VsKSM'
}

export interface ForeignCurrencyId_HKO {
    __kind: 'HKO'
}

export interface ForeignCurrencyId_MOVR {
    __kind: 'MOVR'
}

export interface ForeignCurrencyId_SDN {
    __kind: 'SDN'
}

export interface ForeignCurrencyId_KINT {
    __kind: 'KINT'
}

export interface ForeignCurrencyId_KBTC {
    __kind: 'KBTC'
}

export interface ForeignCurrencyId_GENS {
    __kind: 'GENS'
}

export interface ForeignCurrencyId_XOR {
    __kind: 'XOR'
}

export interface ForeignCurrencyId_TEER {
    __kind: 'TEER'
}

export interface ForeignCurrencyId_KILT {
    __kind: 'KILT'
}

export interface ForeignCurrencyId_PHA {
    __kind: 'PHA'
}

export interface ForeignCurrencyId_ZTG {
    __kind: 'ZTG'
}

export interface ForeignCurrencyId_USD {
    __kind: 'USD'
}

export interface ForeignCurrencyId_DOT {
    __kind: 'DOT'
}
