import {
    sts,
    Block,
    Bytes,
    Option,
    Result,
    StorageType,
    RuntimeCtx,
} from '../support'
import * as v3 from '../v3'

export const liquidityPairs = {
    v3: new StorageType(
        'ZenlinkProtocol.LiquidityPairs',
        'Default',
        [sts.tuple(() => [v3.AssetId, v3.AssetId])],
        sts.option(() => v3.AssetId)
    ) as LiquidityPairsV3,
}

export interface LiquidityPairsV3 {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v3.AssetId | undefined
    get(
        block: Block,
        key: [v3.AssetId, v3.AssetId]
    ): Promise<(v3.AssetId | undefined) | undefined>
    getMany(
        block: Block,
        keys: [v3.AssetId, v3.AssetId][]
    ): Promise<((v3.AssetId | undefined) | undefined)[]>
    getKeys(block: Block): Promise<[v3.AssetId, v3.AssetId][]>
    getKeys(
        block: Block,
        key: [v3.AssetId, v3.AssetId]
    ): Promise<[v3.AssetId, v3.AssetId][]>
    getKeysPaged(
        pageSize: number,
        block: Block
    ): AsyncIterable<[v3.AssetId, v3.AssetId][]>
    getKeysPaged(
        pageSize: number,
        block: Block,
        key: [v3.AssetId, v3.AssetId]
    ): AsyncIterable<[v3.AssetId, v3.AssetId][]>
    getPairs(
        block: Block
    ): Promise<
        [k: [v3.AssetId, v3.AssetId], v: (v3.AssetId | undefined) | undefined][]
    >
    getPairs(
        block: Block,
        key: [v3.AssetId, v3.AssetId]
    ): Promise<
        [k: [v3.AssetId, v3.AssetId], v: (v3.AssetId | undefined) | undefined][]
    >
    getPairsPaged(
        pageSize: number,
        block: Block
    ): AsyncIterable<
        [k: [v3.AssetId, v3.AssetId], v: (v3.AssetId | undefined) | undefined][]
    >
    getPairsPaged(
        pageSize: number,
        block: Block,
        key: [v3.AssetId, v3.AssetId]
    ): AsyncIterable<
        [k: [v3.AssetId, v3.AssetId], v: (v3.AssetId | undefined) | undefined][]
    >
}

export const pairStatuses = {
    /**
     *  (T::AssetId, T::AssetId) -> PairStatus
     */
    v3: new StorageType(
        'ZenlinkProtocol.PairStatuses',
        'Default',
        [sts.tuple(() => [v3.AssetId, v3.AssetId])],
        v3.PairStatus
    ) as PairStatusesV3,
}

/**
 *  (T::AssetId, T::AssetId) -> PairStatus
 */
export interface PairStatusesV3 {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v3.PairStatus
    get(
        block: Block,
        key: [v3.AssetId, v3.AssetId]
    ): Promise<v3.PairStatus | undefined>
    getMany(
        block: Block,
        keys: [v3.AssetId, v3.AssetId][]
    ): Promise<(v3.PairStatus | undefined)[]>
    getKeys(block: Block): Promise<[v3.AssetId, v3.AssetId][]>
    getKeys(
        block: Block,
        key: [v3.AssetId, v3.AssetId]
    ): Promise<[v3.AssetId, v3.AssetId][]>
    getKeysPaged(
        pageSize: number,
        block: Block
    ): AsyncIterable<[v3.AssetId, v3.AssetId][]>
    getKeysPaged(
        pageSize: number,
        block: Block,
        key: [v3.AssetId, v3.AssetId]
    ): AsyncIterable<[v3.AssetId, v3.AssetId][]>
    getPairs(
        block: Block
    ): Promise<[k: [v3.AssetId, v3.AssetId], v: v3.PairStatus | undefined][]>
    getPairs(
        block: Block,
        key: [v3.AssetId, v3.AssetId]
    ): Promise<[k: [v3.AssetId, v3.AssetId], v: v3.PairStatus | undefined][]>
    getPairsPaged(
        pageSize: number,
        block: Block
    ): AsyncIterable<
        [k: [v3.AssetId, v3.AssetId], v: v3.PairStatus | undefined][]
    >
    getPairsPaged(
        pageSize: number,
        block: Block,
        key: [v3.AssetId, v3.AssetId]
    ): AsyncIterable<
        [k: [v3.AssetId, v3.AssetId], v: v3.PairStatus | undefined][]
    >
}
