import {
    sts,
    Block,
    Bytes,
    Option,
    Result,
    StorageType,
    RuntimeCtx,
} from '../support'
import * as v7 from '../v7'

export const liquidityPairs = {
    v7: new StorageType(
        'ZenlinkProtocol.LiquidityPairs',
        'Default',
        [sts.tuple(() => [v7.AssetId, v7.AssetId])],
        sts.option(() => v7.AssetId)
    ) as LiquidityPairsV7,
}

export interface LiquidityPairsV7 {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v7.AssetId | undefined
    get(
        block: Block,
        key: [v7.AssetId, v7.AssetId]
    ): Promise<(v7.AssetId | undefined) | undefined>
    getMany(
        block: Block,
        keys: [v7.AssetId, v7.AssetId][]
    ): Promise<((v7.AssetId | undefined) | undefined)[]>
    getKeys(block: Block): Promise<[v7.AssetId, v7.AssetId][]>
    getKeys(
        block: Block,
        key: [v7.AssetId, v7.AssetId]
    ): Promise<[v7.AssetId, v7.AssetId][]>
    getKeysPaged(
        pageSize: number,
        block: Block
    ): AsyncIterable<[v7.AssetId, v7.AssetId][]>
    getKeysPaged(
        pageSize: number,
        block: Block,
        key: [v7.AssetId, v7.AssetId]
    ): AsyncIterable<[v7.AssetId, v7.AssetId][]>
    getPairs(
        block: Block
    ): Promise<
        [k: [v7.AssetId, v7.AssetId], v: (v7.AssetId | undefined) | undefined][]
    >
    getPairs(
        block: Block,
        key: [v7.AssetId, v7.AssetId]
    ): Promise<
        [k: [v7.AssetId, v7.AssetId], v: (v7.AssetId | undefined) | undefined][]
    >
    getPairsPaged(
        pageSize: number,
        block: Block
    ): AsyncIterable<
        [k: [v7.AssetId, v7.AssetId], v: (v7.AssetId | undefined) | undefined][]
    >
    getPairsPaged(
        pageSize: number,
        block: Block,
        key: [v7.AssetId, v7.AssetId]
    ): AsyncIterable<
        [k: [v7.AssetId, v7.AssetId], v: (v7.AssetId | undefined) | undefined][]
    >
}

export const pairStatuses = {
    /**
     *  (T::AssetId, T::AssetId) -> PairStatus
     */
    v7: new StorageType(
        'ZenlinkProtocol.PairStatuses',
        'Default',
        [sts.tuple(() => [v7.AssetId, v7.AssetId])],
        v7.PairStatus
    ) as PairStatusesV7,
}

/**
 *  (T::AssetId, T::AssetId) -> PairStatus
 */
export interface PairStatusesV7 {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v7.PairStatus
    get(
        block: Block,
        key: [v7.AssetId, v7.AssetId]
    ): Promise<v7.PairStatus | undefined>
    getMany(
        block: Block,
        keys: [v7.AssetId, v7.AssetId][]
    ): Promise<(v7.PairStatus | undefined)[]>
    getKeys(block: Block): Promise<[v7.AssetId, v7.AssetId][]>
    getKeys(
        block: Block,
        key: [v7.AssetId, v7.AssetId]
    ): Promise<[v7.AssetId, v7.AssetId][]>
    getKeysPaged(
        pageSize: number,
        block: Block
    ): AsyncIterable<[v7.AssetId, v7.AssetId][]>
    getKeysPaged(
        pageSize: number,
        block: Block,
        key: [v7.AssetId, v7.AssetId]
    ): AsyncIterable<[v7.AssetId, v7.AssetId][]>
    getPairs(
        block: Block
    ): Promise<[k: [v7.AssetId, v7.AssetId], v: v7.PairStatus | undefined][]>
    getPairs(
        block: Block,
        key: [v7.AssetId, v7.AssetId]
    ): Promise<[k: [v7.AssetId, v7.AssetId], v: v7.PairStatus | undefined][]>
    getPairsPaged(
        pageSize: number,
        block: Block
    ): AsyncIterable<
        [k: [v7.AssetId, v7.AssetId], v: v7.PairStatus | undefined][]
    >
    getPairsPaged(
        pageSize: number,
        block: Block,
        key: [v7.AssetId, v7.AssetId]
    ): AsyncIterable<
        [k: [v7.AssetId, v7.AssetId], v: v7.PairStatus | undefined][]
    >
}
