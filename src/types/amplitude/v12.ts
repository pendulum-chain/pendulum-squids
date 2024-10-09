import { sts, Result, Option, Bytes, BitSequence } from './support'

export interface ShareInfo {
    who: AccountId32
    share: bigint
    withdrawnRewards: [CurrencyId, bigint][]
    claimLastBlock: number
    withdrawList: [number, bigint][]
}

export const ShareInfo: sts.Type<ShareInfo> = sts.struct(() => {
    return {
        who: AccountId32,
        share: sts.bigint(),
        withdrawnRewards: sts.array(() =>
            sts.tuple(() => [CurrencyId, sts.bigint()])
        ),
        claimLastBlock: sts.number(),
        withdrawList: sts.array(() =>
            sts.tuple(() => [sts.number(), sts.bigint()])
        ),
    }
})

export interface GaugePoolInfo {
    pid: number
    token: CurrencyId
    keeper: AccountId32
    rewardIssuer: AccountId32
    rewards: [CurrencyId, [bigint, bigint, bigint]][]
    gaugeBasicRewards: [CurrencyId, bigint][]
    maxBlock: number
    gaugeAmount: bigint
    totalTimeFactor: bigint
    gaugeState: GaugeState
    gaugeLastBlock: number
}

export type GaugeState = GaugeState_Bonded | GaugeState_Unbond

export interface GaugeState_Bonded {
    __kind: 'Bonded'
}

export interface GaugeState_Unbond {
    __kind: 'Unbond'
}

export const GaugePoolInfo: sts.Type<GaugePoolInfo> = sts.struct(() => {
    return {
        pid: sts.number(),
        token: CurrencyId,
        keeper: AccountId32,
        rewardIssuer: AccountId32,
        rewards: sts.array(() =>
            sts.tuple(() => [
                CurrencyId,
                sts.tuple(() => [sts.bigint(), sts.bigint(), sts.bigint()]),
            ])
        ),
        gaugeBasicRewards: sts.array(() =>
            sts.tuple(() => [CurrencyId, sts.bigint()])
        ),
        maxBlock: sts.number(),
        gaugeAmount: sts.bigint(),
        totalTimeFactor: sts.bigint(),
        gaugeState: GaugeState,
        gaugeLastBlock: sts.number(),
    }
})

export const GaugeState: sts.Type<GaugeState> = sts.closedEnum(() => {
    return {
        Bonded: sts.unit(),
        Unbond: sts.unit(),
    }
})

export interface PoolInfo {
    tokensProportion: [CurrencyId, Perbill][]
    basicToken: [CurrencyId, Perbill]
    totalShares: bigint
    basicRewards: [CurrencyId, bigint][]
    rewards: [CurrencyId, [bigint, bigint]][]
    state: PoolState
    keeper: AccountId32
    rewardIssuer: AccountId32
    gauge?: number | undefined
    blockStartup?: number | undefined
    minDepositToStart: bigint
    afterBlockToStart: number
    withdrawLimitTime: number
    claimLimitTime: number
    withdrawLimitCount: number
}

export type PoolState =
    | PoolState_Charged
    | PoolState_Dead
    | PoolState_Ongoing
    | PoolState_Retired
    | PoolState_UnCharged

export interface PoolState_Charged {
    __kind: 'Charged'
}

export interface PoolState_Dead {
    __kind: 'Dead'
}

export interface PoolState_Ongoing {
    __kind: 'Ongoing'
}

export interface PoolState_Retired {
    __kind: 'Retired'
}

export interface PoolState_UnCharged {
    __kind: 'UnCharged'
}

export type Perbill = number

export const PoolInfo: sts.Type<PoolInfo> = sts.struct(() => {
    return {
        tokensProportion: sts.array(() =>
            sts.tuple(() => [CurrencyId, Perbill])
        ),
        basicToken: sts.tuple(() => [CurrencyId, Perbill]),
        totalShares: sts.bigint(),
        basicRewards: sts.array(() =>
            sts.tuple(() => [CurrencyId, sts.bigint()])
        ),
        rewards: sts.array(() =>
            sts.tuple(() => [
                CurrencyId,
                sts.tuple(() => [sts.bigint(), sts.bigint()]),
            ])
        ),
        state: PoolState,
        keeper: AccountId32,
        rewardIssuer: AccountId32,
        gauge: sts.option(() => sts.number()),
        blockStartup: sts.option(() => sts.number()),
        minDepositToStart: sts.bigint(),
        afterBlockToStart: sts.number(),
        withdrawLimitTime: sts.number(),
        claimLimitTime: sts.number(),
        withdrawLimitCount: sts.number(),
    }
})

export const PoolState: sts.Type<PoolState> = sts.closedEnum(() => {
    return {
        Charged: sts.unit(),
        Dead: sts.unit(),
        Ongoing: sts.unit(),
        Retired: sts.unit(),
        UnCharged: sts.unit(),
    }
})

export const Perbill = sts.number()

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

export interface Type_499 {
    free: bigint
    reserved: bigint
    frozen: bigint
}

export const Type_499: sts.Type<Type_499> = sts.struct(() => {
    return {
        free: sts.bigint(),
        reserved: sts.bigint(),
        frozen: sts.bigint(),
    }
})

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
