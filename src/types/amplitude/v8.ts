import { sts, Result, Option, Bytes, BitSequence } from './support'

export type AccountId32 = Bytes

export interface Type_452 {
    free: bigint
    reserved: bigint
    frozen: bigint
}

export const Type_452: sts.Type<Type_452> = sts.struct(() => {
    return {
        free: sts.bigint(),
        reserved: sts.bigint(),
        frozen: sts.bigint(),
    }
})

export type CurrencyId = CurrencyId_Native | CurrencyId_Stellar | CurrencyId_XCM

export interface CurrencyId_Native {
    __kind: 'Native'
}

export interface CurrencyId_Stellar {
    __kind: 'Stellar'
    value: Asset
}

export interface CurrencyId_XCM {
    __kind: 'XCM'
    value: number
}

export type Asset = Asset_AlphaNum12 | Asset_AlphaNum4 | Asset_StellarNative

export interface Asset_AlphaNum12 {
    __kind: 'AlphaNum12'
    code: Bytes
    issuer: Bytes
}

export interface Asset_AlphaNum4 {
    __kind: 'AlphaNum4'
    code: Bytes
    issuer: Bytes
}

export interface Asset_StellarNative {
    __kind: 'StellarNative'
}

export const AccountId32 = sts.bytes()

export const CurrencyId: sts.Type<CurrencyId> = sts.closedEnum(() => {
    return {
        Native: sts.unit(),
        Stellar: Asset,
        XCM: sts.number(),
    }
})

export const Asset: sts.Type<Asset> = sts.closedEnum(() => {
    return {
        AlphaNum12: sts.enumStruct({
            code: sts.bytes(),
            issuer: sts.bytes(),
        }),
        AlphaNum4: sts.enumStruct({
            code: sts.bytes(),
            issuer: sts.bytes(),
        }),
        StellarNative: sts.unit(),
    }
})
