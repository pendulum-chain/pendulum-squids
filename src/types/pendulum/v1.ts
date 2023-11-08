import { sts, Result, Option, Bytes, BitSequence } from './support'

export interface Type_361 {
    free: bigint
    reserved: bigint
    frozen: bigint
}

export const Type_361: sts.Type<Type_361> = sts.struct(() => {
    return {
        free: sts.bigint(),
        reserved: sts.bigint(),
        frozen: sts.bigint(),
    }
})

export type CurrencyId = CurrencyId_Native | CurrencyId_XCM

export interface CurrencyId_Native {
    __kind: 'Native'
}

export interface CurrencyId_XCM {
    __kind: 'XCM'
    value: ForeignCurrencyId
}

export type ForeignCurrencyId =
    | ForeignCurrencyId_AUSD
    | ForeignCurrencyId_BNC
    | ForeignCurrencyId_GENS
    | ForeignCurrencyId_HKO
    | ForeignCurrencyId_KAR
    | ForeignCurrencyId_KBTC
    | ForeignCurrencyId_KILT
    | ForeignCurrencyId_KINT
    | ForeignCurrencyId_KSM
    | ForeignCurrencyId_MOVR
    | ForeignCurrencyId_PHA
    | ForeignCurrencyId_SDN
    | ForeignCurrencyId_TEER
    | ForeignCurrencyId_USD
    | ForeignCurrencyId_VsKSM
    | ForeignCurrencyId_XOR
    | ForeignCurrencyId_ZTG

export interface ForeignCurrencyId_AUSD {
    __kind: 'AUSD'
}

export interface ForeignCurrencyId_BNC {
    __kind: 'BNC'
}

export interface ForeignCurrencyId_GENS {
    __kind: 'GENS'
}

export interface ForeignCurrencyId_HKO {
    __kind: 'HKO'
}

export interface ForeignCurrencyId_KAR {
    __kind: 'KAR'
}

export interface ForeignCurrencyId_KBTC {
    __kind: 'KBTC'
}

export interface ForeignCurrencyId_KILT {
    __kind: 'KILT'
}

export interface ForeignCurrencyId_KINT {
    __kind: 'KINT'
}

export interface ForeignCurrencyId_KSM {
    __kind: 'KSM'
}

export interface ForeignCurrencyId_MOVR {
    __kind: 'MOVR'
}

export interface ForeignCurrencyId_PHA {
    __kind: 'PHA'
}

export interface ForeignCurrencyId_SDN {
    __kind: 'SDN'
}

export interface ForeignCurrencyId_TEER {
    __kind: 'TEER'
}

export interface ForeignCurrencyId_USD {
    __kind: 'USD'
}

export interface ForeignCurrencyId_VsKSM {
    __kind: 'VsKSM'
}

export interface ForeignCurrencyId_XOR {
    __kind: 'XOR'
}

export interface ForeignCurrencyId_ZTG {
    __kind: 'ZTG'
}

export type H256 = Bytes

export const H256 = sts.bytes()

export type AccountId32 = Bytes

export interface AccountInfo {
    nonce: number
    consumers: number
    providers: number
    sufficients: number
    data: AccountData
}

export interface AccountData {
    free: bigint
    reserved: bigint
    miscFrozen: bigint
    feeFrozen: bigint
}

export const AccountInfo: sts.Type<AccountInfo> = sts.struct(() => {
    return {
        nonce: sts.number(),
        consumers: sts.number(),
        providers: sts.number(),
        sufficients: sts.number(),
        data: AccountData,
    }
})

export const AccountData: sts.Type<AccountData> = sts.struct(() => {
    return {
        free: sts.bigint(),
        reserved: sts.bigint(),
        miscFrozen: sts.bigint(),
        feeFrozen: sts.bigint(),
    }
})

export const CurrencyId: sts.Type<CurrencyId> = sts.closedEnum(() => {
    return {
        Native: sts.unit(),
        XCM: ForeignCurrencyId,
    }
})

export const ForeignCurrencyId: sts.Type<ForeignCurrencyId> = sts.closedEnum(
    () => {
        return {
            AUSD: sts.unit(),
            BNC: sts.unit(),
            GENS: sts.unit(),
            HKO: sts.unit(),
            KAR: sts.unit(),
            KBTC: sts.unit(),
            KILT: sts.unit(),
            KINT: sts.unit(),
            KSM: sts.unit(),
            MOVR: sts.unit(),
            PHA: sts.unit(),
            SDN: sts.unit(),
            TEER: sts.unit(),
            USD: sts.unit(),
            VsKSM: sts.unit(),
            XOR: sts.unit(),
            ZTG: sts.unit(),
        }
    }
)

export const AccountId32 = sts.bytes()
