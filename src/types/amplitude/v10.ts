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

export interface GaugeInfo {
    who: Uint8Array
    gaugeAmount: bigint
    totalTimeFactor: bigint
    latestTimeFactor: bigint
    claimedTimeFactor: bigint
    gaugeStartBlock: number
    gaugeStopBlock: number
    gaugeLastBlock: number
    lastClaimBlock: number
}

export interface GaugePoolInfo {
    pid: number
    token: CurrencyId
    keeper: Uint8Array
    rewardIssuer: Uint8Array
    rewards: [CurrencyId, [bigint, bigint, bigint]][]
    gaugeBasicRewards: [CurrencyId, bigint][]
    maxBlock: number
    gaugeAmount: bigint
    totalTimeFactor: bigint
    gaugeState: GaugeState
    gaugeLastBlock: number
}

export interface PoolInfo {
    tokensProportion: [CurrencyId, number][]
    basicToken: [CurrencyId, number]
    totalShares: bigint
    basicRewards: [CurrencyId, bigint][]
    rewards: [CurrencyId, [bigint, bigint]][]
    state: PoolState
    keeper: Uint8Array
    rewardIssuer: Uint8Array
    gauge: number | undefined
    blockStartup: number | undefined
    minDepositToStart: bigint
    afterBlockToStart: number
    withdrawLimitTime: number
    claimLimitTime: number
    withdrawLimitCount: number
}

export interface ShareInfo {
    who: Uint8Array
    share: bigint
    withdrawnRewards: [CurrencyId, bigint][]
    claimLastBlock: number
    withdrawList: [number, bigint][]
}

export interface Type_480 {
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

export type GaugeState = GaugeState_Unbond | GaugeState_Bonded

export interface GaugeState_Unbond {
    __kind: 'Unbond'
}

export interface GaugeState_Bonded {
    __kind: 'Bonded'
}

export type PoolState =
    | PoolState_UnCharged
    | PoolState_Charged
    | PoolState_Ongoing
    | PoolState_Dead
    | PoolState_Retired

export interface PoolState_UnCharged {
    __kind: 'UnCharged'
}

export interface PoolState_Charged {
    __kind: 'Charged'
}

export interface PoolState_Ongoing {
    __kind: 'Ongoing'
}

export interface PoolState_Dead {
    __kind: 'Dead'
}

export interface PoolState_Retired {
    __kind: 'Retired'
}
