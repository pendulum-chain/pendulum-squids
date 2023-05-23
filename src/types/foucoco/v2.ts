import type { Result, Option } from './support'

export type CurrencyId =
    | CurrencyId_Native
    | CurrencyId_KSM
    | CurrencyId_AUSD
    | CurrencyId_ForeignAsset

export interface CurrencyId_Native {
    __kind: 'Native'
}

export interface CurrencyId_KSM {
    __kind: 'KSM'
}

export interface CurrencyId_AUSD {
    __kind: 'AUSD'
}

export interface CurrencyId_ForeignAsset {
    __kind: 'ForeignAsset'
    value: number
}

export interface Type_318 {
    free: bigint
    reserved: bigint
    frozen: bigint
}
