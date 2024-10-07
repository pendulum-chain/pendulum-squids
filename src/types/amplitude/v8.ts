import { sts, Result, Option, Bytes, BitSequence } from './support'

export interface RedeemRequest {
    vault: VaultId
    opentime: number
    period: number
    fee: bigint
    transferFee: bigint
    amount: bigint
    asset: CurrencyId
    premium: bigint
    redeemer: AccountId32
    stellarAddress: Bytes
    status: RedeemRequestStatus
}

export type RedeemRequestStatus =
    | RedeemRequestStatus_Completed
    | RedeemRequestStatus_Pending
    | RedeemRequestStatus_Reimbursed
    | RedeemRequestStatus_Retried

export interface RedeemRequestStatus_Completed {
    __kind: 'Completed'
}

export interface RedeemRequestStatus_Pending {
    __kind: 'Pending'
}

export interface RedeemRequestStatus_Reimbursed {
    __kind: 'Reimbursed'
    value: boolean
}

export interface RedeemRequestStatus_Retried {
    __kind: 'Retried'
}

export interface VaultId {
    accountId: AccountId32
    currencies: VaultCurrencyPair
}

export interface VaultCurrencyPair {
    collateral: CurrencyId
    wrapped: CurrencyId
}

export const RedeemRequest: sts.Type<RedeemRequest> = sts.struct(() => {
    return {
        vault: VaultId,
        opentime: sts.number(),
        period: sts.number(),
        fee: sts.bigint(),
        transferFee: sts.bigint(),
        amount: sts.bigint(),
        asset: CurrencyId,
        premium: sts.bigint(),
        redeemer: AccountId32,
        stellarAddress: sts.bytes(),
        status: RedeemRequestStatus,
    }
})

export type H256 = Bytes

export interface IssueRequest {
    vault: VaultId
    opentime: number
    period: number
    griefingCollateral: bigint
    amount: bigint
    asset: CurrencyId
    fee: bigint
    requester: AccountId32
    stellarAddress: Bytes
    status: IssueRequestStatus
}

export type IssueRequestStatus =
    | IssueRequestStatus_Cancelled
    | IssueRequestStatus_Completed
    | IssueRequestStatus_Pending

export interface IssueRequestStatus_Cancelled {
    __kind: 'Cancelled'
}

export interface IssueRequestStatus_Completed {
    __kind: 'Completed'
}

export interface IssueRequestStatus_Pending {
    __kind: 'Pending'
}

export const IssueRequest: sts.Type<IssueRequest> = sts.struct(() => {
    return {
        vault: VaultId,
        opentime: sts.number(),
        period: sts.number(),
        griefingCollateral: sts.bigint(),
        amount: sts.bigint(),
        asset: CurrencyId,
        fee: sts.bigint(),
        requester: AccountId32,
        stellarAddress: sts.bytes(),
        status: IssueRequestStatus,
    }
})

export const IssueRequestStatus: sts.Type<IssueRequestStatus> = sts.closedEnum(
    () => {
        return {
            Cancelled: sts.unit(),
            Completed: sts.unit(),
            Pending: sts.unit(),
        }
    }
)

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

export const RedeemRequestStatus: sts.Type<RedeemRequestStatus> =
    sts.closedEnum(() => {
        return {
            Completed: sts.unit(),
            Pending: sts.unit(),
            Reimbursed: sts.boolean(),
            Retried: sts.unit(),
        }
    })

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

export const H256 = sts.bytes()

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
