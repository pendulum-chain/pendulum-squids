import type {Result, Option} from './support'

export type CurrencyId = CurrencyId_Native | CurrencyId_XCM

export interface CurrencyId_Native {
    __kind: 'Native'
}

export interface CurrencyId_XCM {
    __kind: 'XCM'
    value: ForeignCurrencyId
}

export interface Type_360 {
    free: bigint
    reserved: bigint
    frozen: bigint
}

export type ForeignCurrencyId = ForeignCurrencyId_KSM | ForeignCurrencyId_KAR | ForeignCurrencyId_AUSD | ForeignCurrencyId_BNC | ForeignCurrencyId_VsKSM | ForeignCurrencyId_HKO | ForeignCurrencyId_MOVR | ForeignCurrencyId_SDN | ForeignCurrencyId_KINT | ForeignCurrencyId_KBTC | ForeignCurrencyId_GENS | ForeignCurrencyId_XOR | ForeignCurrencyId_TEER | ForeignCurrencyId_KILT | ForeignCurrencyId_PHA | ForeignCurrencyId_ZTG | ForeignCurrencyId_USD

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
