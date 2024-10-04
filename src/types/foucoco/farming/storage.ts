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

export const poolInfos = {
    /**
     *  Record reward pool info.
     *
     *  map PoolId => PoolInfo
     */
    v18: new StorageType(
        'Farming.PoolInfos',
        'Optional',
        [sts.number()],
        v18.PoolInfo
    ) as PoolInfosV18,
}

/**
 *  Record reward pool info.
 *
 *  map PoolId => PoolInfo
 */
export interface PoolInfosV18 {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: number): Promise<v18.PoolInfo | undefined>
    getMany(block: Block, keys: number[]): Promise<(v18.PoolInfo | undefined)[]>
    getKeys(block: Block): Promise<number[]>
    getKeys(block: Block, key: number): Promise<number[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<number[]>
    getKeysPaged(
        pageSize: number,
        block: Block,
        key: number
    ): AsyncIterable<number[]>
    getPairs(block: Block): Promise<[k: number, v: v18.PoolInfo | undefined][]>
    getPairs(
        block: Block,
        key: number
    ): Promise<[k: number, v: v18.PoolInfo | undefined][]>
    getPairsPaged(
        pageSize: number,
        block: Block
    ): AsyncIterable<[k: number, v: v18.PoolInfo | undefined][]>
    getPairsPaged(
        pageSize: number,
        block: Block,
        key: number
    ): AsyncIterable<[k: number, v: v18.PoolInfo | undefined][]>
}

export const gaugePoolInfos = {
    /**
     *  Record gauge farming pool info.
     *
     *  map PoolId => GaugePoolInfo
     */
    v18: new StorageType(
        'Farming.GaugePoolInfos',
        'Optional',
        [sts.number()],
        v18.GaugePoolInfo
    ) as GaugePoolInfosV18,
}

/**
 *  Record gauge farming pool info.
 *
 *  map PoolId => GaugePoolInfo
 */
export interface GaugePoolInfosV18 {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: number): Promise<v18.GaugePoolInfo | undefined>
    getMany(
        block: Block,
        keys: number[]
    ): Promise<(v18.GaugePoolInfo | undefined)[]>
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
    ): Promise<[k: number, v: v18.GaugePoolInfo | undefined][]>
    getPairs(
        block: Block,
        key: number
    ): Promise<[k: number, v: v18.GaugePoolInfo | undefined][]>
    getPairsPaged(
        pageSize: number,
        block: Block
    ): AsyncIterable<[k: number, v: v18.GaugePoolInfo | undefined][]>
    getPairsPaged(
        pageSize: number,
        block: Block,
        key: number
    ): AsyncIterable<[k: number, v: v18.GaugePoolInfo | undefined][]>
}

export const gaugeInfos = {
    v18: new StorageType(
        'Farming.GaugeInfos',
        'Optional',
        [sts.number(), v18.AccountId32],
        v18.GaugeInfo
    ) as GaugeInfosV18,
}

export interface GaugeInfosV18 {
    is(block: RuntimeCtx): boolean
    get(
        block: Block,
        key1: number,
        key2: v18.AccountId32
    ): Promise<v18.GaugeInfo | undefined>
    getMany(
        block: Block,
        keys: [number, v18.AccountId32][]
    ): Promise<(v18.GaugeInfo | undefined)[]>
    getKeys(block: Block): Promise<[number, v18.AccountId32][]>
    getKeys(block: Block, key1: number): Promise<[number, v18.AccountId32][]>
    getKeys(
        block: Block,
        key1: number,
        key2: v18.AccountId32
    ): Promise<[number, v18.AccountId32][]>
    getKeysPaged(
        pageSize: number,
        block: Block
    ): AsyncIterable<[number, v18.AccountId32][]>
    getKeysPaged(
        pageSize: number,
        block: Block,
        key1: number
    ): AsyncIterable<[number, v18.AccountId32][]>
    getKeysPaged(
        pageSize: number,
        block: Block,
        key1: number,
        key2: v18.AccountId32
    ): AsyncIterable<[number, v18.AccountId32][]>
    getPairs(
        block: Block
    ): Promise<[k: [number, v18.AccountId32], v: v18.GaugeInfo | undefined][]>
    getPairs(
        block: Block,
        key1: number
    ): Promise<[k: [number, v18.AccountId32], v: v18.GaugeInfo | undefined][]>
    getPairs(
        block: Block,
        key1: number,
        key2: v18.AccountId32
    ): Promise<[k: [number, v18.AccountId32], v: v18.GaugeInfo | undefined][]>
    getPairsPaged(
        pageSize: number,
        block: Block
    ): AsyncIterable<
        [k: [number, v18.AccountId32], v: v18.GaugeInfo | undefined][]
    >
    getPairsPaged(
        pageSize: number,
        block: Block,
        key1: number
    ): AsyncIterable<
        [k: [number, v18.AccountId32], v: v18.GaugeInfo | undefined][]
    >
    getPairsPaged(
        pageSize: number,
        block: Block,
        key1: number,
        key2: v18.AccountId32
    ): AsyncIterable<
        [k: [number, v18.AccountId32], v: v18.GaugeInfo | undefined][]
    >
}

export const sharesAndWithdrawnRewards = {
    /**
     *  Record share amount, reward currency and withdrawn reward amount for
     *  specific `AccountId` under `PoolId`.
     *
     *  double_map (PoolId, AccountId) => ShareInfo
     */
    v18: new StorageType(
        'Farming.SharesAndWithdrawnRewards',
        'Optional',
        [sts.number(), v18.AccountId32],
        v18.ShareInfo
    ) as SharesAndWithdrawnRewardsV18,
}

/**
 *  Record share amount, reward currency and withdrawn reward amount for
 *  specific `AccountId` under `PoolId`.
 *
 *  double_map (PoolId, AccountId) => ShareInfo
 */
export interface SharesAndWithdrawnRewardsV18 {
    is(block: RuntimeCtx): boolean
    get(
        block: Block,
        key1: number,
        key2: v18.AccountId32
    ): Promise<v18.ShareInfo | undefined>
    getMany(
        block: Block,
        keys: [number, v18.AccountId32][]
    ): Promise<(v18.ShareInfo | undefined)[]>
    getKeys(block: Block): Promise<[number, v18.AccountId32][]>
    getKeys(block: Block, key1: number): Promise<[number, v18.AccountId32][]>
    getKeys(
        block: Block,
        key1: number,
        key2: v18.AccountId32
    ): Promise<[number, v18.AccountId32][]>
    getKeysPaged(
        pageSize: number,
        block: Block
    ): AsyncIterable<[number, v18.AccountId32][]>
    getKeysPaged(
        pageSize: number,
        block: Block,
        key1: number
    ): AsyncIterable<[number, v18.AccountId32][]>
    getKeysPaged(
        pageSize: number,
        block: Block,
        key1: number,
        key2: v18.AccountId32
    ): AsyncIterable<[number, v18.AccountId32][]>
    getPairs(
        block: Block
    ): Promise<[k: [number, v18.AccountId32], v: v18.ShareInfo | undefined][]>
    getPairs(
        block: Block,
        key1: number
    ): Promise<[k: [number, v18.AccountId32], v: v18.ShareInfo | undefined][]>
    getPairs(
        block: Block,
        key1: number,
        key2: v18.AccountId32
    ): Promise<[k: [number, v18.AccountId32], v: v18.ShareInfo | undefined][]>
    getPairsPaged(
        pageSize: number,
        block: Block
    ): AsyncIterable<
        [k: [number, v18.AccountId32], v: v18.ShareInfo | undefined][]
    >
    getPairsPaged(
        pageSize: number,
        block: Block,
        key1: number
    ): AsyncIterable<
        [k: [number, v18.AccountId32], v: v18.ShareInfo | undefined][]
    >
    getPairsPaged(
        pageSize: number,
        block: Block,
        key1: number,
        key2: v18.AccountId32
    ): AsyncIterable<
        [k: [number, v18.AccountId32], v: v18.ShareInfo | undefined][]
    >
}
