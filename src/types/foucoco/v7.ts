import { sts, Result, Option, Bytes, BitSequence } from './support'

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

export type AccountId32 = Bytes

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

export interface Type_445 {
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

export const Type_445: sts.Type<Type_445> = sts.struct(() => {
    return {
        blockchain: sts.bytes(),
        symbol: sts.bytes(),
    }
})

export const AssetId: sts.Type<AssetId> = sts.struct(() => {
    return {
        chainId: sts.number(),
        assetType: sts.number(),
        assetIndex: sts.bigint(),
    }
})

export const AccountId32 = sts.bytes()

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
