import type {Result, Option} from './support'

export interface AssetId {
    chainId: number
    assetType: number
    assetIndex: bigint
}

export type PairStatus = PairStatus_Trading | PairStatus_Bootstrap | PairStatus_Disable

export interface PairStatus_Trading {
    __kind: 'Trading'
    value: PairMetadata
}

export interface PairStatus_Bootstrap {
    __kind: 'Bootstrap'
    value: BootstrapParameter
}

export interface PairStatus_Disable {
    __kind: 'Disable'
}

export interface PairMetadata {
    pairAccount: Uint8Array
    totalSupply: bigint
}

export interface BootstrapParameter {
    targetSupply: [bigint, bigint]
    capacitySupply: [bigint, bigint]
    accumulatedSupply: [bigint, bigint]
    endBlockNumber: number
    pairAccount: Uint8Array
}
