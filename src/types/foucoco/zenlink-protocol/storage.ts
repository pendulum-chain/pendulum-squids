import {
    sts,
    Block,
    Bytes,
    Option,
    Result,
    StorageType,
    RuntimeCtx,
} from '../support'
import * as v1 from '../v1'

export const liquidityPairs = {
    v1: new StorageType(
        'ZenlinkProtocol.LiquidityPairs',
        'Default',
        [sts.tuple(() => [v1.AssetId, v1.AssetId])],
        sts.option(() => v1.AssetId)
    ) as LiquidityPairsV1,
}

export interface LiquidityPairsV1 {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v1.AssetId | undefined
    get(
        block: Block,
        key: [v1.AssetId, v1.AssetId]
    ): Promise<(v1.AssetId | undefined) | undefined>
    getMany(
        block: Block,
        keys: [v1.AssetId, v1.AssetId][]
    ): Promise<((v1.AssetId | undefined) | undefined)[]>
    getKeys(block: Block): Promise<[v1.AssetId, v1.AssetId][]>
    getKeys(
        block: Block,
        key: [v1.AssetId, v1.AssetId]
    ): Promise<[v1.AssetId, v1.AssetId][]>
    getKeysPaged(
        pageSize: number,
        block: Block
    ): AsyncIterable<[v1.AssetId, v1.AssetId][]>
    getKeysPaged(
        pageSize: number,
        block: Block,
        key: [v1.AssetId, v1.AssetId]
    ): AsyncIterable<[v1.AssetId, v1.AssetId][]>
    getPairs(
        block: Block
    ): Promise<
        [k: [v1.AssetId, v1.AssetId], v: (v1.AssetId | undefined) | undefined][]
    >
    getPairs(
        block: Block,
        key: [v1.AssetId, v1.AssetId]
    ): Promise<
        [k: [v1.AssetId, v1.AssetId], v: (v1.AssetId | undefined) | undefined][]
    >
    getPairsPaged(
        pageSize: number,
        block: Block
    ): AsyncIterable<
        [k: [v1.AssetId, v1.AssetId], v: (v1.AssetId | undefined) | undefined][]
    >
    getPairsPaged(
        pageSize: number,
        block: Block,
        key: [v1.AssetId, v1.AssetId]
    ): AsyncIterable<
        [k: [v1.AssetId, v1.AssetId], v: (v1.AssetId | undefined) | undefined][]
    >
}

export const pairStatuses = {
    /**
     *  (T::AssetId, T::AssetId) -> PairStatus
     */
    v1: new StorageType(
        'ZenlinkProtocol.PairStatuses',
        'Default',
        [sts.tuple(() => [v1.AssetId, v1.AssetId])],
        v1.PairStatus
    ) as PairStatusesV1,
}

/**
 *  (T::AssetId, T::AssetId) -> PairStatus
 */
export interface PairStatusesV1 {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v1.PairStatus
    get(
        block: Block,
        key: [v1.AssetId, v1.AssetId]
    ): Promise<v1.PairStatus | undefined>
    getMany(
        block: Block,
        keys: [v1.AssetId, v1.AssetId][]
    ): Promise<(v1.PairStatus | undefined)[]>
    getKeys(block: Block): Promise<[v1.AssetId, v1.AssetId][]>
    getKeys(
        block: Block,
        key: [v1.AssetId, v1.AssetId]
    ): Promise<[v1.AssetId, v1.AssetId][]>
    getKeysPaged(
        pageSize: number,
        block: Block
    ): AsyncIterable<[v1.AssetId, v1.AssetId][]>
    getKeysPaged(
        pageSize: number,
        block: Block,
        key: [v1.AssetId, v1.AssetId]
    ): AsyncIterable<[v1.AssetId, v1.AssetId][]>
    getPairs(
        block: Block
    ): Promise<[k: [v1.AssetId, v1.AssetId], v: v1.PairStatus | undefined][]>
    getPairs(
        block: Block,
        key: [v1.AssetId, v1.AssetId]
    ): Promise<[k: [v1.AssetId, v1.AssetId], v: v1.PairStatus | undefined][]>
    getPairsPaged(
        pageSize: number,
        block: Block
    ): AsyncIterable<
        [k: [v1.AssetId, v1.AssetId], v: v1.PairStatus | undefined][]
    >
    getPairsPaged(
        pageSize: number,
        block: Block,
        key: [v1.AssetId, v1.AssetId]
    ): AsyncIterable<
        [k: [v1.AssetId, v1.AssetId], v: v1.PairStatus | undefined][]
    >
}
