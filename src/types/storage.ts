import assert from 'assert'
import {Block, BlockContext, Chain, ChainContext, Option, Result, StorageBase} from './support'
import * as v7 from './v7'

export class ZenlinkProtocolLiquidityPairsStorage extends StorageBase {
    protected getPrefix() {
        return 'ZenlinkProtocol'
    }

    protected getName() {
        return 'LiquidityPairs'
    }

    get isV7(): boolean {
        return this.getTypeHash() === '789cf3f60e0a697e380821675a1d5385e419abba09e35755b95a3eb7b5a28f1f'
    }

    get asV7(): ZenlinkProtocolLiquidityPairsStorageV7 {
        assert(this.isV7)
        return this as any
    }
}

export interface ZenlinkProtocolLiquidityPairsStorageV7 {
    get(key: [v7.AssetId, v7.AssetId]): Promise<(v7.AssetId | undefined)>
    getAll(): Promise<(v7.AssetId | undefined)[]>
    getMany(keys: [v7.AssetId, v7.AssetId][]): Promise<(v7.AssetId | undefined)[]>
    getKeys(): Promise<[v7.AssetId, v7.AssetId][]>
    getKeys(key: [v7.AssetId, v7.AssetId]): Promise<[v7.AssetId, v7.AssetId][]>
    getKeysPaged(pageSize: number): AsyncIterable<[v7.AssetId, v7.AssetId][]>
    getKeysPaged(pageSize: number, key: [v7.AssetId, v7.AssetId]): AsyncIterable<[v7.AssetId, v7.AssetId][]>
    getPairs(): Promise<[k: [v7.AssetId, v7.AssetId], v: (v7.AssetId | undefined)][]>
    getPairs(key: [v7.AssetId, v7.AssetId]): Promise<[k: [v7.AssetId, v7.AssetId], v: (v7.AssetId | undefined)][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: [v7.AssetId, v7.AssetId], v: (v7.AssetId | undefined)][]>
    getPairsPaged(pageSize: number, key: [v7.AssetId, v7.AssetId]): AsyncIterable<[k: [v7.AssetId, v7.AssetId], v: (v7.AssetId | undefined)][]>
}

export class ZenlinkProtocolPairStatusesStorage extends StorageBase {
    protected getPrefix() {
        return 'ZenlinkProtocol'
    }

    protected getName() {
        return 'PairStatuses'
    }

    /**
     *  (T::AssetId, T::AssetId) -> PairStatus
     */
    get isV7(): boolean {
        return this.getTypeHash() === 'bad89eddde62d5d40bc938d63d2495e173228abf7011695d72c252612979bde7'
    }

    /**
     *  (T::AssetId, T::AssetId) -> PairStatus
     */
    get asV7(): ZenlinkProtocolPairStatusesStorageV7 {
        assert(this.isV7)
        return this as any
    }
}

/**
 *  (T::AssetId, T::AssetId) -> PairStatus
 */
export interface ZenlinkProtocolPairStatusesStorageV7 {
    get(key: [v7.AssetId, v7.AssetId]): Promise<v7.PairStatus>
    getAll(): Promise<v7.PairStatus[]>
    getMany(keys: [v7.AssetId, v7.AssetId][]): Promise<v7.PairStatus[]>
    getKeys(): Promise<[v7.AssetId, v7.AssetId][]>
    getKeys(key: [v7.AssetId, v7.AssetId]): Promise<[v7.AssetId, v7.AssetId][]>
    getKeysPaged(pageSize: number): AsyncIterable<[v7.AssetId, v7.AssetId][]>
    getKeysPaged(pageSize: number, key: [v7.AssetId, v7.AssetId]): AsyncIterable<[v7.AssetId, v7.AssetId][]>
    getPairs(): Promise<[k: [v7.AssetId, v7.AssetId], v: v7.PairStatus][]>
    getPairs(key: [v7.AssetId, v7.AssetId]): Promise<[k: [v7.AssetId, v7.AssetId], v: v7.PairStatus][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: [v7.AssetId, v7.AssetId], v: v7.PairStatus][]>
    getPairsPaged(pageSize: number, key: [v7.AssetId, v7.AssetId]): AsyncIterable<[k: [v7.AssetId, v7.AssetId], v: v7.PairStatus][]>
}
