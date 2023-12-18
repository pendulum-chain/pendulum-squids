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
import * as v4 from '../v4'

export const poolInfos = {
    /**
     *  Record reward pool info.
     *
     *  map PoolId => PoolInfo
     */
    v1: new StorageType(
        'Farming.PoolInfos',
        'Optional',
        [sts.number()],
        v1.PoolInfo
    ) as PoolInfosV1,
    /**
     *  Record reward pool info.
     *
     *  map PoolId => PoolInfo
     */
    v4: new StorageType(
        'Farming.PoolInfos',
        'Optional',
        [sts.number()],
        v4.PoolInfo
    ) as PoolInfosV4,
}

/**
 *  Record reward pool info.
 *
 *  map PoolId => PoolInfo
 */
export interface PoolInfosV1 {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: number): Promise<v1.PoolInfo | undefined>
    getMany(block: Block, keys: number[]): Promise<(v1.PoolInfo | undefined)[]>
    getKeys(block: Block): Promise<number[]>
    getKeys(block: Block, key: number): Promise<number[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<number[]>
    getKeysPaged(
        pageSize: number,
        block: Block,
        key: number
    ): AsyncIterable<number[]>
    getPairs(block: Block): Promise<[k: number, v: v1.PoolInfo | undefined][]>
    getPairs(
        block: Block,
        key: number
    ): Promise<[k: number, v: v1.PoolInfo | undefined][]>
    getPairsPaged(
        pageSize: number,
        block: Block
    ): AsyncIterable<[k: number, v: v1.PoolInfo | undefined][]>
    getPairsPaged(
        pageSize: number,
        block: Block,
        key: number
    ): AsyncIterable<[k: number, v: v1.PoolInfo | undefined][]>
}

/**
 *  Record reward pool info.
 *
 *  map PoolId => PoolInfo
 */
export interface PoolInfosV4 {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: number): Promise<v4.PoolInfo | undefined>
    getMany(block: Block, keys: number[]): Promise<(v4.PoolInfo | undefined)[]>
    getKeys(block: Block): Promise<number[]>
    getKeys(block: Block, key: number): Promise<number[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<number[]>
    getKeysPaged(
        pageSize: number,
        block: Block,
        key: number
    ): AsyncIterable<number[]>
    getPairs(block: Block): Promise<[k: number, v: v4.PoolInfo | undefined][]>
    getPairs(
        block: Block,
        key: number
    ): Promise<[k: number, v: v4.PoolInfo | undefined][]>
    getPairsPaged(
        pageSize: number,
        block: Block
    ): AsyncIterable<[k: number, v: v4.PoolInfo | undefined][]>
    getPairsPaged(
        pageSize: number,
        block: Block,
        key: number
    ): AsyncIterable<[k: number, v: v4.PoolInfo | undefined][]>
}

export const gaugePoolInfos = {
    /**
     *  Record gauge farming pool info.
     *
     *  map PoolId => GaugePoolInfo
     */
    v1: new StorageType(
        'Farming.GaugePoolInfos',
        'Optional',
        [sts.number()],
        v1.GaugePoolInfo
    ) as GaugePoolInfosV1,
    /**
     *  Record gauge farming pool info.
     *
     *  map PoolId => GaugePoolInfo
     */
    v4: new StorageType(
        'Farming.GaugePoolInfos',
        'Optional',
        [sts.number()],
        v4.GaugePoolInfo
    ) as GaugePoolInfosV4,
}

/**
 *  Record gauge farming pool info.
 *
 *  map PoolId => GaugePoolInfo
 */
export interface GaugePoolInfosV1 {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: number): Promise<v1.GaugePoolInfo | undefined>
    getMany(
        block: Block,
        keys: number[]
    ): Promise<(v1.GaugePoolInfo | undefined)[]>
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
    ): Promise<[k: number, v: v1.GaugePoolInfo | undefined][]>
    getPairs(
        block: Block,
        key: number
    ): Promise<[k: number, v: v1.GaugePoolInfo | undefined][]>
    getPairsPaged(
        pageSize: number,
        block: Block
    ): AsyncIterable<[k: number, v: v1.GaugePoolInfo | undefined][]>
    getPairsPaged(
        pageSize: number,
        block: Block,
        key: number
    ): AsyncIterable<[k: number, v: v1.GaugePoolInfo | undefined][]>
}

/**
 *  Record gauge farming pool info.
 *
 *  map PoolId => GaugePoolInfo
 */
export interface GaugePoolInfosV4 {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: number): Promise<v4.GaugePoolInfo | undefined>
    getMany(
        block: Block,
        keys: number[]
    ): Promise<(v4.GaugePoolInfo | undefined)[]>
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
    ): Promise<[k: number, v: v4.GaugePoolInfo | undefined][]>
    getPairs(
        block: Block,
        key: number
    ): Promise<[k: number, v: v4.GaugePoolInfo | undefined][]>
    getPairsPaged(
        pageSize: number,
        block: Block
    ): AsyncIterable<[k: number, v: v4.GaugePoolInfo | undefined][]>
    getPairsPaged(
        pageSize: number,
        block: Block,
        key: number
    ): AsyncIterable<[k: number, v: v4.GaugePoolInfo | undefined][]>
}

export const gaugeInfos = {
    v1: new StorageType(
        'Farming.GaugeInfos',
        'Optional',
        [sts.number(), v1.AccountId32],
        v1.GaugeInfo
    ) as GaugeInfosV1,
}

export interface GaugeInfosV1 {
    is(block: RuntimeCtx): boolean
    get(
        block: Block,
        key1: number,
        key2: v1.AccountId32
    ): Promise<v1.GaugeInfo | undefined>
    getMany(
        block: Block,
        keys: [number, v1.AccountId32][]
    ): Promise<(v1.GaugeInfo | undefined)[]>
    getKeys(block: Block): Promise<[number, v1.AccountId32][]>
    getKeys(block: Block, key1: number): Promise<[number, v1.AccountId32][]>
    getKeys(
        block: Block,
        key1: number,
        key2: v1.AccountId32
    ): Promise<[number, v1.AccountId32][]>
    getKeysPaged(
        pageSize: number,
        block: Block
    ): AsyncIterable<[number, v1.AccountId32][]>
    getKeysPaged(
        pageSize: number,
        block: Block,
        key1: number
    ): AsyncIterable<[number, v1.AccountId32][]>
    getKeysPaged(
        pageSize: number,
        block: Block,
        key1: number,
        key2: v1.AccountId32
    ): AsyncIterable<[number, v1.AccountId32][]>
    getPairs(
        block: Block
    ): Promise<[k: [number, v1.AccountId32], v: v1.GaugeInfo | undefined][]>
    getPairs(
        block: Block,
        key1: number
    ): Promise<[k: [number, v1.AccountId32], v: v1.GaugeInfo | undefined][]>
    getPairs(
        block: Block,
        key1: number,
        key2: v1.AccountId32
    ): Promise<[k: [number, v1.AccountId32], v: v1.GaugeInfo | undefined][]>
    getPairsPaged(
        pageSize: number,
        block: Block
    ): AsyncIterable<
        [k: [number, v1.AccountId32], v: v1.GaugeInfo | undefined][]
    >
    getPairsPaged(
        pageSize: number,
        block: Block,
        key1: number
    ): AsyncIterable<
        [k: [number, v1.AccountId32], v: v1.GaugeInfo | undefined][]
    >
    getPairsPaged(
        pageSize: number,
        block: Block,
        key1: number,
        key2: v1.AccountId32
    ): AsyncIterable<
        [k: [number, v1.AccountId32], v: v1.GaugeInfo | undefined][]
    >
}

export const sharesAndWithdrawnRewards = {
    /**
     *  Record share amount, reward currency and withdrawn reward amount for
     *  specific `AccountId` under `PoolId`.
     *
     *  double_map (PoolId, AccountId) => ShareInfo
     */
    v1: new StorageType(
        'Farming.SharesAndWithdrawnRewards',
        'Optional',
        [sts.number(), v1.AccountId32],
        v1.ShareInfo
    ) as SharesAndWithdrawnRewardsV1,
    /**
     *  Record share amount, reward currency and withdrawn reward amount for
     *  specific `AccountId` under `PoolId`.
     *
     *  double_map (PoolId, AccountId) => ShareInfo
     */
    v4: new StorageType(
        'Farming.SharesAndWithdrawnRewards',
        'Optional',
        [sts.number(), v4.AccountId32],
        v4.ShareInfo
    ) as SharesAndWithdrawnRewardsV4,
}

/**
 *  Record share amount, reward currency and withdrawn reward amount for
 *  specific `AccountId` under `PoolId`.
 *
 *  double_map (PoolId, AccountId) => ShareInfo
 */
export interface SharesAndWithdrawnRewardsV1 {
    is(block: RuntimeCtx): boolean
    get(
        block: Block,
        key1: number,
        key2: v1.AccountId32
    ): Promise<v1.ShareInfo | undefined>
    getMany(
        block: Block,
        keys: [number, v1.AccountId32][]
    ): Promise<(v1.ShareInfo | undefined)[]>
    getKeys(block: Block): Promise<[number, v1.AccountId32][]>
    getKeys(block: Block, key1: number): Promise<[number, v1.AccountId32][]>
    getKeys(
        block: Block,
        key1: number,
        key2: v1.AccountId32
    ): Promise<[number, v1.AccountId32][]>
    getKeysPaged(
        pageSize: number,
        block: Block
    ): AsyncIterable<[number, v1.AccountId32][]>
    getKeysPaged(
        pageSize: number,
        block: Block,
        key1: number
    ): AsyncIterable<[number, v1.AccountId32][]>
    getKeysPaged(
        pageSize: number,
        block: Block,
        key1: number,
        key2: v1.AccountId32
    ): AsyncIterable<[number, v1.AccountId32][]>
    getPairs(
        block: Block
    ): Promise<[k: [number, v1.AccountId32], v: v1.ShareInfo | undefined][]>
    getPairs(
        block: Block,
        key1: number
    ): Promise<[k: [number, v1.AccountId32], v: v1.ShareInfo | undefined][]>
    getPairs(
        block: Block,
        key1: number,
        key2: v1.AccountId32
    ): Promise<[k: [number, v1.AccountId32], v: v1.ShareInfo | undefined][]>
    getPairsPaged(
        pageSize: number,
        block: Block
    ): AsyncIterable<
        [k: [number, v1.AccountId32], v: v1.ShareInfo | undefined][]
    >
    getPairsPaged(
        pageSize: number,
        block: Block,
        key1: number
    ): AsyncIterable<
        [k: [number, v1.AccountId32], v: v1.ShareInfo | undefined][]
    >
    getPairsPaged(
        pageSize: number,
        block: Block,
        key1: number,
        key2: v1.AccountId32
    ): AsyncIterable<
        [k: [number, v1.AccountId32], v: v1.ShareInfo | undefined][]
    >
}

/**
 *  Record share amount, reward currency and withdrawn reward amount for
 *  specific `AccountId` under `PoolId`.
 *
 *  double_map (PoolId, AccountId) => ShareInfo
 */
export interface SharesAndWithdrawnRewardsV4 {
    is(block: RuntimeCtx): boolean
    get(
        block: Block,
        key1: number,
        key2: v4.AccountId32
    ): Promise<v4.ShareInfo | undefined>
    getMany(
        block: Block,
        keys: [number, v4.AccountId32][]
    ): Promise<(v4.ShareInfo | undefined)[]>
    getKeys(block: Block): Promise<[number, v4.AccountId32][]>
    getKeys(block: Block, key1: number): Promise<[number, v4.AccountId32][]>
    getKeys(
        block: Block,
        key1: number,
        key2: v4.AccountId32
    ): Promise<[number, v4.AccountId32][]>
    getKeysPaged(
        pageSize: number,
        block: Block
    ): AsyncIterable<[number, v4.AccountId32][]>
    getKeysPaged(
        pageSize: number,
        block: Block,
        key1: number
    ): AsyncIterable<[number, v4.AccountId32][]>
    getKeysPaged(
        pageSize: number,
        block: Block,
        key1: number,
        key2: v4.AccountId32
    ): AsyncIterable<[number, v4.AccountId32][]>
    getPairs(
        block: Block
    ): Promise<[k: [number, v4.AccountId32], v: v4.ShareInfo | undefined][]>
    getPairs(
        block: Block,
        key1: number
    ): Promise<[k: [number, v4.AccountId32], v: v4.ShareInfo | undefined][]>
    getPairs(
        block: Block,
        key1: number,
        key2: v4.AccountId32
    ): Promise<[k: [number, v4.AccountId32], v: v4.ShareInfo | undefined][]>
    getPairsPaged(
        pageSize: number,
        block: Block
    ): AsyncIterable<
        [k: [number, v4.AccountId32], v: v4.ShareInfo | undefined][]
    >
    getPairsPaged(
        pageSize: number,
        block: Block,
        key1: number
    ): AsyncIterable<
        [k: [number, v4.AccountId32], v: v4.ShareInfo | undefined][]
    >
    getPairsPaged(
        pageSize: number,
        block: Block,
        key1: number,
        key2: v4.AccountId32
    ): AsyncIterable<
        [k: [number, v4.AccountId32], v: v4.ShareInfo | undefined][]
    >
}
