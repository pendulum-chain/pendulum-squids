import {
    sts,
    Block,
    Bytes,
    Option,
    Result,
    StorageType,
    RuntimeCtx,
} from '../support'
import * as v18 from '../v18'

export const liquidityPairs = {
    v18: new StorageType(
        'ZenlinkProtocol.LiquidityPairs',
        'Default',
        [sts.tuple(() => [v18.AssetId, v18.AssetId])],
        sts.option(() => v18.AssetId)
    ) as LiquidityPairsV18,
}

export interface LiquidityPairsV18 {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v18.AssetId | undefined
    get(
        block: Block,
        key: [v18.AssetId, v18.AssetId]
    ): Promise<(v18.AssetId | undefined) | undefined>
    getMany(
        block: Block,
        keys: [v18.AssetId, v18.AssetId][]
    ): Promise<((v18.AssetId | undefined) | undefined)[]>
    getKeys(block: Block): Promise<[v18.AssetId, v18.AssetId][]>
    getKeys(
        block: Block,
        key: [v18.AssetId, v18.AssetId]
    ): Promise<[v18.AssetId, v18.AssetId][]>
    getKeysPaged(
        pageSize: number,
        block: Block
    ): AsyncIterable<[v18.AssetId, v18.AssetId][]>
    getKeysPaged(
        pageSize: number,
        block: Block,
        key: [v18.AssetId, v18.AssetId]
    ): AsyncIterable<[v18.AssetId, v18.AssetId][]>
    getPairs(
        block: Block
    ): Promise<
        [
            k: [v18.AssetId, v18.AssetId],
            v: (v18.AssetId | undefined) | undefined
        ][]
    >
    getPairs(
        block: Block,
        key: [v18.AssetId, v18.AssetId]
    ): Promise<
        [
            k: [v18.AssetId, v18.AssetId],
            v: (v18.AssetId | undefined) | undefined
        ][]
    >
    getPairsPaged(
        pageSize: number,
        block: Block
    ): AsyncIterable<
        [
            k: [v18.AssetId, v18.AssetId],
            v: (v18.AssetId | undefined) | undefined
        ][]
    >
    getPairsPaged(
        pageSize: number,
        block: Block,
        key: [v18.AssetId, v18.AssetId]
    ): AsyncIterable<
        [
            k: [v18.AssetId, v18.AssetId],
            v: (v18.AssetId | undefined) | undefined
        ][]
    >
}

export const pairStatuses = {
    /**
     *  (T::AssetId, T::AssetId) -> PairStatus
     */
    v18: new StorageType(
        'ZenlinkProtocol.PairStatuses',
        'Default',
        [sts.tuple(() => [v18.AssetId, v18.AssetId])],
        v18.PairStatus
    ) as PairStatusesV18,
}

/**
 *  (T::AssetId, T::AssetId) -> PairStatus
 */
export interface PairStatusesV18 {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v18.PairStatus
    get(
        block: Block,
        key: [v18.AssetId, v18.AssetId]
    ): Promise<v18.PairStatus | undefined>
    getMany(
        block: Block,
        keys: [v18.AssetId, v18.AssetId][]
    ): Promise<(v18.PairStatus | undefined)[]>
    getKeys(block: Block): Promise<[v18.AssetId, v18.AssetId][]>
    getKeys(
        block: Block,
        key: [v18.AssetId, v18.AssetId]
    ): Promise<[v18.AssetId, v18.AssetId][]>
    getKeysPaged(
        pageSize: number,
        block: Block
    ): AsyncIterable<[v18.AssetId, v18.AssetId][]>
    getKeysPaged(
        pageSize: number,
        block: Block,
        key: [v18.AssetId, v18.AssetId]
    ): AsyncIterable<[v18.AssetId, v18.AssetId][]>
    getPairs(
        block: Block
    ): Promise<[k: [v18.AssetId, v18.AssetId], v: v18.PairStatus | undefined][]>
    getPairs(
        block: Block,
        key: [v18.AssetId, v18.AssetId]
    ): Promise<[k: [v18.AssetId, v18.AssetId], v: v18.PairStatus | undefined][]>
    getPairsPaged(
        pageSize: number,
        block: Block
    ): AsyncIterable<
        [k: [v18.AssetId, v18.AssetId], v: v18.PairStatus | undefined][]
    >
    getPairsPaged(
        pageSize: number,
        block: Block,
        key: [v18.AssetId, v18.AssetId]
    ): AsyncIterable<
        [k: [v18.AssetId, v18.AssetId], v: v18.PairStatus | undefined][]
    >
}
