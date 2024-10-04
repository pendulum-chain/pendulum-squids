import { sts, Result, Option, Bytes, BitSequence } from './support'

export const VaultId: sts.Type<VaultId> = sts.struct(() => {
    return {
        accountId: AccountId32,
        currencies: VaultCurrencyPair,
    }
})

export const VaultCurrencyPair: sts.Type<VaultCurrencyPair> = sts.struct(() => {
    return {
        collateral: CurrencyId,
        wrapped: CurrencyId,
    }
})

export interface VaultCurrencyPair {
    collateral: CurrencyId
    wrapped: CurrencyId
}

export type CurrencyId =
    | CurrencyId_Native
    | CurrencyId_Stellar
    | CurrencyId_Token
    | CurrencyId_XCM
    | CurrencyId_ZenlinkLPToken

export interface CurrencyId_Native {
    __kind: 'Native'
}

export interface CurrencyId_Stellar {
    __kind: 'Stellar'
    value: Asset
}

export interface CurrencyId_Token {
    __kind: 'Token'
    value: bigint
}

export interface CurrencyId_XCM {
    __kind: 'XCM'
    value: number
}

export interface CurrencyId_ZenlinkLPToken {
    __kind: 'ZenlinkLPToken'
    value: [number, number, number, number]
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

export interface VaultId {
    accountId: AccountId32
    currencies: VaultCurrencyPair
}

export type AccountId32 = Bytes

export const CurrencyId: sts.Type<CurrencyId> = sts.closedEnum(() => {
    return {
        Native: sts.unit(),
        Stellar: Asset,
        Token: sts.bigint(),
        XCM: sts.number(),
        ZenlinkLPToken: sts.tuple(() => [
            sts.number(),
            sts.number(),
            sts.number(),
            sts.number(),
        ]),
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

export const AccountId32 = sts.bytes()

export const H256 = sts.bytes()
