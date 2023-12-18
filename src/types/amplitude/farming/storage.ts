import {
    sts,
    Block,
    Bytes,
    Option,
    Result,
    StorageType,
    RuntimeCtx,
} from '../support'
import * as v10 from '../v10'
import * as v12 from '../v12'

export const poolInfos = {
    /**
     *  Record reward pool info.
     *
     *  map PoolId => PoolInfo
     */
    v10: new StorageType(
        'Farming.PoolInfos',
        'Optional',
        [sts.number()],
        v10.PoolInfo
    ) as PoolInfosV10,
    /**
     *  Record reward pool info.
     *
     *  map PoolId => PoolInfo
     */
    v12: new StorageType(
        'Farming.PoolInfos',
        'Optional',
        [sts.number()],
        v12.PoolInfo
    ) as PoolInfosV12,
}

/**
 *  Record reward pool info.
 *
 *  map PoolId => PoolInfo
 */
export interface PoolInfosV10 {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: number): Promise<v10.PoolInfo | undefined>
    getMany(block: Block, keys: number[]): Promise<(v10.PoolInfo | undefined)[]>
    getKeys(block: Block): Promise<number[]>
    getKeys(block: Block, key: number): Promise<number[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<number[]>
    getKeysPaged(
        pageSize: number,
        block: Block,
        key: number
    ): AsyncIterable<number[]>
    getPairs(block: Block): Promise<[k: number, v: v10.PoolInfo | undefined][]>
    getPairs(
        block: Block,
        key: number
    ): Promise<[k: number, v: v10.PoolInfo | undefined][]>
    getPairsPaged(
        pageSize: number,
        block: Block
    ): AsyncIterable<[k: number, v: v10.PoolInfo | undefined][]>
    getPairsPaged(
        pageSize: number,
        block: Block,
        key: number
    ): AsyncIterable<[k: number, v: v10.PoolInfo | undefined][]>
}

/**
 *  Record reward pool info.
 *
 *  map PoolId => PoolInfo
 */
export interface PoolInfosV12 {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: number): Promise<v12.PoolInfo | undefined>
    getMany(block: Block, keys: number[]): Promise<(v12.PoolInfo | undefined)[]>
    getKeys(block: Block): Promise<number[]>
    getKeys(block: Block, key: number): Promise<number[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<number[]>
    getKeysPaged(
        pageSize: number,
        block: Block,
        key: number
    ): AsyncIterable<number[]>
    getPairs(block: Block): Promise<[k: number, v: v12.PoolInfo | undefined][]>
    getPairs(
        block: Block,
        key: number
    ): Promise<[k: number, v: v12.PoolInfo | undefined][]>
    getPairsPaged(
        pageSize: number,
        block: Block
    ): AsyncIterable<[k: number, v: v12.PoolInfo | undefined][]>
    getPairsPaged(
        pageSize: number,
        block: Block,
        key: number
    ): AsyncIterable<[k: number, v: v12.PoolInfo | undefined][]>
}

export const gaugePoolInfos = {
    /**
     *  Record gauge farming pool info.
     *
     *  map PoolId => GaugePoolInfo
     */
    v10: new StorageType(
        'Farming.GaugePoolInfos',
        'Optional',
        [sts.number()],
        v10.GaugePoolInfo
    ) as GaugePoolInfosV10,
    /**
     *  Record gauge farming pool info.
     *
     *  map PoolId => GaugePoolInfo
     */
    v12: new StorageType(
        'Farming.GaugePoolInfos',
        'Optional',
        [sts.number()],
        v12.GaugePoolInfo
    ) as GaugePoolInfosV12,
}

/**
 *  Record gauge farming pool info.
 *
 *  map PoolId => GaugePoolInfo
 */
export interface GaugePoolInfosV10 {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: number): Promise<v10.GaugePoolInfo | undefined>
    getMany(
        block: Block,
        keys: number[]
    ): Promise<(v10.GaugePoolInfo | undefined)[]>
    getKeys(block: Block): Promise<number[]>
    getKeys(block: Block, key: number): Promise<number[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<number[]>
    getKeysPaged(
        pageSize: number,
        block: Block,
        key: number
    ): AsyncIterable<number[]>
    getPairs(
        block: Block
    ): Promise<[k: number, v: v10.GaugePoolInfo | undefined][]>
    getPairs(
        block: Block,
        key: number
    ): Promise<[k: number, v: v10.GaugePoolInfo | undefined][]>
    getPairsPaged(
        pageSize: number,
        block: Block
    ): AsyncIterable<[k: number, v: v10.GaugePoolInfo | undefined][]>
    getPairsPaged(
        pageSize: number,
        block: Block,
        key: number
    ): AsyncIterable<[k: number, v: v10.GaugePoolInfo | undefined][]>
}

/**
 *  Record gauge farming pool info.
 *
 *  map PoolId => GaugePoolInfo
 */
export interface GaugePoolInfosV12 {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: number): Promise<v12.GaugePoolInfo | undefined>
    getMany(
        block: Block,
        keys: number[]
    ): Promise<(v12.GaugePoolInfo | undefined)[]>
    getKeys(block: Block): Promise<number[]>
    getKeys(block: Block, key: number): Promise<number[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<number[]>
    getKeysPaged(
        pageSize: number,
        block: Block,
        key: number
    ): AsyncIterable<number[]>
    getPairs(
        block: Block
    ): Promise<[k: number, v: v12.GaugePoolInfo | undefined][]>
    getPairs(
        block: Block,
        key: number
    ): Promise<[k: number, v: v12.GaugePoolInfo | undefined][]>
    getPairsPaged(
        pageSize: number,
        block: Block
    ): AsyncIterable<[k: number, v: v12.GaugePoolInfo | undefined][]>
    getPairsPaged(
        pageSize: number,
        block: Block,
        key: number
    ): AsyncIterable<[k: number, v: v12.GaugePoolInfo | undefined][]>
}

export const gaugeInfos = {
    v10: new StorageType(
        'Farming.GaugeInfos',
        'Optional',
        [sts.number(), v10.AccountId32],
        v10.GaugeInfo
    ) as GaugeInfosV10,
}

export interface GaugeInfosV10 {
    is(block: RuntimeCtx): boolean
    get(
        block: Block,
        key1: number,
        key2: v10.AccountId32
    ): Promise<v10.GaugeInfo | undefined>
    getMany(
        block: Block,
        keys: [number, v10.AccountId32][]
    ): Promise<(v10.GaugeInfo | undefined)[]>
    getKeys(block: Block): Promise<[number, v10.AccountId32][]>
    getKeys(block: Block, key1: number): Promise<[number, v10.AccountId32][]>
    getKeys(
        block: Block,
        key1: number,
        key2: v10.AccountId32
    ): Promise<[number, v10.AccountId32][]>
    getKeysPaged(
        pageSize: number,
        block: Block
    ): AsyncIterable<[number, v10.AccountId32][]>
    getKeysPaged(
        pageSize: number,
        block: Block,
        key1: number
    ): AsyncIterable<[number, v10.AccountId32][]>
    getKeysPaged(
        pageSize: number,
        block: Block,
        key1: number,
        key2: v10.AccountId32
    ): AsyncIterable<[number, v10.AccountId32][]>
    getPairs(
        block: Block
    ): Promise<[k: [number, v10.AccountId32], v: v10.GaugeInfo | undefined][]>
    getPairs(
        block: Block,
        key1: number
    ): Promise<[k: [number, v10.AccountId32], v: v10.GaugeInfo | undefined][]>
    getPairs(
        block: Block,
        key1: number,
        key2: v10.AccountId32
    ): Promise<[k: [number, v10.AccountId32], v: v10.GaugeInfo | undefined][]>
    getPairsPaged(
        pageSize: number,
        block: Block
    ): AsyncIterable<
        [k: [number, v10.AccountId32], v: v10.GaugeInfo | undefined][]
    >
    getPairsPaged(
        pageSize: number,
        block: Block,
        key1: number
    ): AsyncIterable<
        [k: [number, v10.AccountId32], v: v10.GaugeInfo | undefined][]
    >
    getPairsPaged(
        pageSize: number,
        block: Block,
        key1: number,
        key2: v10.AccountId32
    ): AsyncIterable<
        [k: [number, v10.AccountId32], v: v10.GaugeInfo | undefined][]
    >
}

export const sharesAndWithdrawnRewards = {
    /**
     *  Record share amount, reward currency and withdrawn reward amount for
     *  specific `AccountId` under `PoolId`.
     *
     *  double_map (PoolId, AccountId) => ShareInfo
     */
    v10: new StorageType(
        'Farming.SharesAndWithdrawnRewards',
        'Optional',
        [sts.number(), v10.AccountId32],
        v10.ShareInfo
    ) as SharesAndWithdrawnRewardsV10,
    /**
     *  Record share amount, reward currency and withdrawn reward amount for
     *  specific `AccountId` under `PoolId`.
     *
     *  double_map (PoolId, AccountId) => ShareInfo
     */
    v12: new StorageType(
        'Farming.SharesAndWithdrawnRewards',
        'Optional',
        [sts.number(), v12.AccountId32],
        v12.ShareInfo
    ) as SharesAndWithdrawnRewardsV12,
}

/**
 *  Record share amount, reward currency and withdrawn reward amount for
 *  specific `AccountId` under `PoolId`.
 *
 *  double_map (PoolId, AccountId) => ShareInfo
 */
export interface SharesAndWithdrawnRewardsV10 {
    is(block: RuntimeCtx): boolean
    get(
        block: Block,
        key1: number,
        key2: v10.AccountId32
    ): Promise<v10.ShareInfo | undefined>
    getMany(
        block: Block,
        keys: [number, v10.AccountId32][]
    ): Promise<(v10.ShareInfo | undefined)[]>
    getKeys(block: Block): Promise<[number, v10.AccountId32][]>
    getKeys(block: Block, key1: number): Promise<[number, v10.AccountId32][]>
    getKeys(
        block: Block,
        key1: number,
        key2: v10.AccountId32
    ): Promise<[number, v10.AccountId32][]>
    getKeysPaged(
        pageSize: number,
        block: Block
    ): AsyncIterable<[number, v10.AccountId32][]>
    getKeysPaged(
        pageSize: number,
        block: Block,
        key1: number
    ): AsyncIterable<[number, v10.AccountId32][]>
    getKeysPaged(
        pageSize: number,
        block: Block,
        key1: number,
        key2: v10.AccountId32
    ): AsyncIterable<[number, v10.AccountId32][]>
    getPairs(
        block: Block
    ): Promise<[k: [number, v10.AccountId32], v: v10.ShareInfo | undefined][]>
    getPairs(
        block: Block,
        key1: number
    ): Promise<[k: [number, v10.AccountId32], v: v10.ShareInfo | undefined][]>
    getPairs(
        block: Block,
        key1: number,
        key2: v10.AccountId32
    ): Promise<[k: [number, v10.AccountId32], v: v10.ShareInfo | undefined][]>
    getPairsPaged(
        pageSize: number,
        block: Block
    ): AsyncIterable<
        [k: [number, v10.AccountId32], v: v10.ShareInfo | undefined][]
    >
    getPairsPaged(
        pageSize: number,
        block: Block,
        key1: number
    ): AsyncIterable<
        [k: [number, v10.AccountId32], v: v10.ShareInfo | undefined][]
    >
    getPairsPaged(
        pageSize: number,
        block: Block,
        key1: number,
        key2: v10.AccountId32
    ): AsyncIterable<
        [k: [number, v10.AccountId32], v: v10.ShareInfo | undefined][]
    >
}

/**
 *  Record share amount, reward currency and withdrawn reward amount for
 *  specific `AccountId` under `PoolId`.
 *
 *  double_map (PoolId, AccountId) => ShareInfo
 */
export interface SharesAndWithdrawnRewardsV12 {
    is(block: RuntimeCtx): boolean
    get(
        block: Block,
        key1: number,
        key2: v12.AccountId32
    ): Promise<v12.ShareInfo | undefined>
    getMany(
        block: Block,
        keys: [number, v12.AccountId32][]
    ): Promise<(v12.ShareInfo | undefined)[]>
    getKeys(block: Block): Promise<[number, v12.AccountId32][]>
    getKeys(block: Block, key1: number): Promise<[number, v12.AccountId32][]>
    getKeys(
        block: Block,
        key1: number,
        key2: v12.AccountId32
    ): Promise<[number, v12.AccountId32][]>
    getKeysPaged(
        pageSize: number,
        block: Block
    ): AsyncIterable<[number, v12.AccountId32][]>
    getKeysPaged(
        pageSize: number,
        block: Block,
        key1: number
    ): AsyncIterable<[number, v12.AccountId32][]>
    getKeysPaged(
        pageSize: number,
        block: Block,
        key1: number,
        key2: v12.AccountId32
    ): AsyncIterable<[number, v12.AccountId32][]>
    getPairs(
        block: Block
    ): Promise<[k: [number, v12.AccountId32], v: v12.ShareInfo | undefined][]>
    getPairs(
        block: Block,
        key1: number
    ): Promise<[k: [number, v12.AccountId32], v: v12.ShareInfo | undefined][]>
    getPairs(
        block: Block,
        key1: number,
        key2: v12.AccountId32
    ): Promise<[k: [number, v12.AccountId32], v: v12.ShareInfo | undefined][]>
    getPairsPaged(
        pageSize: number,
        block: Block
    ): AsyncIterable<
        [k: [number, v12.AccountId32], v: v12.ShareInfo | undefined][]
    >
    getPairsPaged(
        pageSize: number,
        block: Block,
        key1: number
    ): AsyncIterable<
        [k: [number, v12.AccountId32], v: v12.ShareInfo | undefined][]
    >
    getPairsPaged(
        pageSize: number,
        block: Block,
        key1: number,
        key2: v12.AccountId32
    ): AsyncIterable<
        [k: [number, v12.AccountId32], v: v12.ShareInfo | undefined][]
    >
}
