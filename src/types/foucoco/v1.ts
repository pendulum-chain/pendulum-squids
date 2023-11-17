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

export interface GaugeInfo {
    who: AccountId32
    gaugeAmount: bigint
    totalTimeFactor: bigint
    latestTimeFactor: bigint
    claimedTimeFactor: bigint
    gaugeStartBlock: number
    gaugeStopBlock: number
    gaugeLastBlock: number
    lastClaimBlock: number
}

export const GaugeInfo: sts.Type<GaugeInfo> = sts.struct(() => {
    return {
        who: AccountId32,
        gaugeAmount: sts.bigint(),
        totalTimeFactor: sts.bigint(),
        latestTimeFactor: sts.bigint(),
        claimedTimeFactor: sts.bigint(),
        gaugeStartBlock: sts.number(),
        gaugeStopBlock: sts.number(),
        gaugeLastBlock: sts.number(),
        lastClaimBlock: sts.number(),
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

export type PairStatus =
    | PairStatus_Bootstrap
    | PairStatus_Disable
    | PairStatus_Trading

export interface PairStatus_Bootstrap {
    __kind: 'Bootstrap'
    value: BootstrapParameter
}

export interface PairStatus_Disable {
    __kind: 'Disable'
}

export interface PairStatus_Trading {
    __kind: 'Trading'
    value: PairMetadata
}

export interface PairMetadata {
    pairAccount: AccountId32
    totalSupply: bigint
}

export interface BootstrapParameter {
    targetSupply: [bigint, bigint]
    capacitySupply: [bigint, bigint]
    accumulatedSupply: [bigint, bigint]
    endBlockNumber: number
    pairAccount: AccountId32
}

export const PairStatus: sts.Type<PairStatus> = sts.closedEnum(() => {
    return {
        Bootstrap: BootstrapParameter,
        Disable: sts.unit(),
        Trading: PairMetadata,
    }
})

export const PairMetadata: sts.Type<PairMetadata> = sts.struct(() => {
    return {
        pairAccount: AccountId32,
        totalSupply: sts.bigint(),
    }
})

export const BootstrapParameter: sts.Type<BootstrapParameter> = sts.struct(
    () => {
        return {
            targetSupply: sts.tuple(() => [sts.bigint(), sts.bigint()]),
            capacitySupply: sts.tuple(() => [sts.bigint(), sts.bigint()]),
            accumulatedSupply: sts.tuple(() => [sts.bigint(), sts.bigint()]),
            endBlockNumber: sts.number(),
            pairAccount: AccountId32,
        }
    }
)

export interface AssetId {
    chainId: number
    assetType: number
    assetIndex: bigint
}

export interface Type_507 {
    blockchain: Bytes
    symbol: Bytes
}

export interface CoinInfo {
    symbol: Bytes
    name: Bytes
    blockchain: Bytes
    supply: bigint
    lastUpdateTimestamp: bigint
    price: bigint
}

export const Type_507: sts.Type<Type_507> = sts.struct(() => {
    return {
        blockchain: sts.bytes(),
        symbol: sts.bytes(),
    }
})

export interface Type_475 {
    free: bigint
    reserved: bigint
    frozen: bigint
}

export const Type_475: sts.Type<Type_475> = sts.struct(() => {
    return {
        free: sts.bigint(),
        reserved: sts.bigint(),
        frozen: sts.bigint(),
    }
})

export type CurrencyId =
    | CurrencyId_Native
    | CurrencyId_Stellar
    | CurrencyId_XCM
    | CurrencyId_ZenlinkLPToken

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

export const AssetId: sts.Type<AssetId> = sts.struct(() => {
    return {
        chainId: sts.number(),
        assetType: sts.number(),
        assetIndex: sts.bigint(),
    }
})

export const CoinInfo: sts.Type<CoinInfo> = sts.struct(() => {
    return {
        symbol: sts.bytes(),
        name: sts.bytes(),
        blockchain: sts.bytes(),
        supply: sts.bigint(),
        lastUpdateTimestamp: sts.bigint(),
        price: sts.bigint(),
    }
})

export const CurrencyId: sts.Type<CurrencyId> = sts.closedEnum(() => {
    return {
        Native: sts.unit(),
        Stellar: Asset,
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
