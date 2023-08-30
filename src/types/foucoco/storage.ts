import assert from 'assert'
import {
    Block,
    BlockContext,
    Chain,
    ChainContext,
    Option,
    Result,
    StorageBase,
} from './support'
import * as v1 from './v1'

export class BalancesTotalIssuanceStorage extends StorageBase {
    protected getPrefix() {
        return 'Balances'
    }

    protected getName() {
        return 'TotalIssuance'
    }

    /**
     *  The total units issued in the system.
     */
    get isV1(): boolean {
        return (
            this.getTypeHash() ===
            'f8ebe28eb30158172c0ccf672f7747c46a244f892d08ef2ebcbaadde34a26bc0'
        )
    }

    /**
     *  The total units issued in the system.
     */
    get asV1(): BalancesTotalIssuanceStorageV1 {
        assert(this.isV1)
        return this as any
    }
}

/**
 *  The total units issued in the system.
 */
export interface BalancesTotalIssuanceStorageV1 {
    get(): Promise<bigint>
}

export class DiaOracleModuleCoinInfosMapStorage extends StorageBase {
    protected getPrefix() {
        return 'DiaOracleModule'
    }

    protected getName() {
        return 'CoinInfosMap'
    }

    /**
     *  Map of all the coins names to their respective info and price
     */
    get isV1(): boolean {
        return (
            this.getTypeHash() ===
            'ca6255144b7cf6607b20ac2559a85f4365b5839095dca04f10bcdbb06d6b7d8f'
        )
    }

    /**
     *  Map of all the coins names to their respective info and price
     */
    get asV1(): DiaOracleModuleCoinInfosMapStorageV1 {
        assert(this.isV1)
        return this as any
    }
}

/**
 *  Map of all the coins names to their respective info and price
 */
export interface DiaOracleModuleCoinInfosMapStorageV1 {
    get(key: v1.Type_507): Promise<v1.CoinInfo>
    getAll(): Promise<v1.CoinInfo[]>
    getMany(keys: v1.Type_507[]): Promise<v1.CoinInfo[]>
    getKeys(): Promise<v1.Type_507[]>
    getKeys(key: v1.Type_507): Promise<v1.Type_507[]>
    getKeysPaged(pageSize: number): AsyncIterable<v1.Type_507[]>
    getKeysPaged(
        pageSize: number,
        key: v1.Type_507
    ): AsyncIterable<v1.Type_507[]>
    getPairs(): Promise<[k: v1.Type_507, v: v1.CoinInfo][]>
    getPairs(key: v1.Type_507): Promise<[k: v1.Type_507, v: v1.CoinInfo][]>
    getPairsPaged(
        pageSize: number
    ): AsyncIterable<[k: v1.Type_507, v: v1.CoinInfo][]>
    getPairsPaged(
        pageSize: number,
        key: v1.Type_507
    ): AsyncIterable<[k: v1.Type_507, v: v1.CoinInfo][]>
}

export class FarmingGaugeInfosStorage extends StorageBase {
    protected getPrefix() {
        return 'Farming'
    }

    protected getName() {
        return 'GaugeInfos'
    }

    get isV1(): boolean {
        return (
            this.getTypeHash() ===
            'bfcac1c2fc5422a1bb4fc529e0239e7a73cb9de789e8d33533d200ba8dec513f'
        )
    }

    get asV1(): FarmingGaugeInfosStorageV1 {
        assert(this.isV1)
        return this as any
    }
}

export interface FarmingGaugeInfosStorageV1 {
    get(key1: number, key2: Uint8Array): Promise<v1.GaugeInfo | undefined>
    getAll(): Promise<v1.GaugeInfo[]>
    getMany(keys: [number, Uint8Array][]): Promise<(v1.GaugeInfo | undefined)[]>
    getKeys(): Promise<[number, Uint8Array][]>
    getKeys(key1: number): Promise<[number, Uint8Array][]>
    getKeys(key1: number, key2: Uint8Array): Promise<[number, Uint8Array][]>
    getKeysPaged(pageSize: number): AsyncIterable<[number, Uint8Array][]>
    getKeysPaged(
        pageSize: number,
        key1: number
    ): AsyncIterable<[number, Uint8Array][]>
    getKeysPaged(
        pageSize: number,
        key1: number,
        key2: Uint8Array
    ): AsyncIterable<[number, Uint8Array][]>
    getPairs(): Promise<[k: [number, Uint8Array], v: v1.GaugeInfo][]>
    getPairs(
        key1: number
    ): Promise<[k: [number, Uint8Array], v: v1.GaugeInfo][]>
    getPairs(
        key1: number,
        key2: Uint8Array
    ): Promise<[k: [number, Uint8Array], v: v1.GaugeInfo][]>
    getPairsPaged(
        pageSize: number
    ): AsyncIterable<[k: [number, Uint8Array], v: v1.GaugeInfo][]>
    getPairsPaged(
        pageSize: number,
        key1: number
    ): AsyncIterable<[k: [number, Uint8Array], v: v1.GaugeInfo][]>
    getPairsPaged(
        pageSize: number,
        key1: number,
        key2: Uint8Array
    ): AsyncIterable<[k: [number, Uint8Array], v: v1.GaugeInfo][]>
}

export class FarmingGaugePoolInfosStorage extends StorageBase {
    protected getPrefix() {
        return 'Farming'
    }

    protected getName() {
        return 'GaugePoolInfos'
    }

    /**
     *  Record gauge farming pool info.
     *
     *  map PoolId => GaugePoolInfo
     */
    get isV1(): boolean {
        return (
            this.getTypeHash() ===
            '416ce745d59e070e1ac33ea21b05aa73d21df5fd40c136ceb8b314e3584a7cd9'
        )
    }

    /**
     *  Record gauge farming pool info.
     *
     *  map PoolId => GaugePoolInfo
     */
    get asV1(): FarmingGaugePoolInfosStorageV1 {
        assert(this.isV1)
        return this as any
    }
}

/**
 *  Record gauge farming pool info.
 *
 *  map PoolId => GaugePoolInfo
 */
export interface FarmingGaugePoolInfosStorageV1 {
    get(key: number): Promise<v1.GaugePoolInfo | undefined>
    getAll(): Promise<v1.GaugePoolInfo[]>
    getMany(keys: number[]): Promise<(v1.GaugePoolInfo | undefined)[]>
    getKeys(): Promise<number[]>
    getKeys(key: number): Promise<number[]>
    getKeysPaged(pageSize: number): AsyncIterable<number[]>
    getKeysPaged(pageSize: number, key: number): AsyncIterable<number[]>
    getPairs(): Promise<[k: number, v: v1.GaugePoolInfo][]>
    getPairs(key: number): Promise<[k: number, v: v1.GaugePoolInfo][]>
    getPairsPaged(
        pageSize: number
    ): AsyncIterable<[k: number, v: v1.GaugePoolInfo][]>
    getPairsPaged(
        pageSize: number,
        key: number
    ): AsyncIterable<[k: number, v: v1.GaugePoolInfo][]>
}

export class FarmingPoolInfosStorage extends StorageBase {
    protected getPrefix() {
        return 'Farming'
    }

    protected getName() {
        return 'PoolInfos'
    }

    /**
     *  Record reward pool info.
     *
     *  map PoolId => PoolInfo
     */
    get isV1(): boolean {
        return (
            this.getTypeHash() ===
            '1fe4c061f2de853f79b38ceacbdfdaa793e296003e91a1aba0e7f5e03969f44e'
        )
    }

    /**
     *  Record reward pool info.
     *
     *  map PoolId => PoolInfo
     */
    get asV1(): FarmingPoolInfosStorageV1 {
        assert(this.isV1)
        return this as any
    }
}

/**
 *  Record reward pool info.
 *
 *  map PoolId => PoolInfo
 */
export interface FarmingPoolInfosStorageV1 {
    get(key: number): Promise<v1.PoolInfo | undefined>
    getAll(): Promise<v1.PoolInfo[]>
    getMany(keys: number[]): Promise<(v1.PoolInfo | undefined)[]>
    getKeys(): Promise<number[]>
    getKeys(key: number): Promise<number[]>
    getKeysPaged(pageSize: number): AsyncIterable<number[]>
    getKeysPaged(pageSize: number, key: number): AsyncIterable<number[]>
    getPairs(): Promise<[k: number, v: v1.PoolInfo][]>
    getPairs(key: number): Promise<[k: number, v: v1.PoolInfo][]>
    getPairsPaged(
        pageSize: number
    ): AsyncIterable<[k: number, v: v1.PoolInfo][]>
    getPairsPaged(
        pageSize: number,
        key: number
    ): AsyncIterable<[k: number, v: v1.PoolInfo][]>
}

export class FarmingSharesAndWithdrawnRewardsStorage extends StorageBase {
    protected getPrefix() {
        return 'Farming'
    }

    protected getName() {
        return 'SharesAndWithdrawnRewards'
    }

    /**
     *  Record share amount, reward currency and withdrawn reward amount for
     *  specific `AccountId` under `PoolId`.
     *
     *  double_map (PoolId, AccountId) => ShareInfo
     */
    get isV1(): boolean {
        return (
            this.getTypeHash() ===
            'a052ada8bd1f1deef2d049fefb81c7816d8ccd88e8d80b620d13e028e3ca5215'
        )
    }

    /**
     *  Record share amount, reward currency and withdrawn reward amount for
     *  specific `AccountId` under `PoolId`.
     *
     *  double_map (PoolId, AccountId) => ShareInfo
     */
    get asV1(): FarmingSharesAndWithdrawnRewardsStorageV1 {
        assert(this.isV1)
        return this as any
    }
}

/**
 *  Record share amount, reward currency and withdrawn reward amount for
 *  specific `AccountId` under `PoolId`.
 *
 *  double_map (PoolId, AccountId) => ShareInfo
 */
export interface FarmingSharesAndWithdrawnRewardsStorageV1 {
    get(key1: number, key2: Uint8Array): Promise<v1.ShareInfo | undefined>
    getAll(): Promise<v1.ShareInfo[]>
    getMany(keys: [number, Uint8Array][]): Promise<(v1.ShareInfo | undefined)[]>
    getKeys(): Promise<[number, Uint8Array][]>
    getKeys(key1: number): Promise<[number, Uint8Array][]>
    getKeys(key1: number, key2: Uint8Array): Promise<[number, Uint8Array][]>
    getKeysPaged(pageSize: number): AsyncIterable<[number, Uint8Array][]>
    getKeysPaged(
        pageSize: number,
        key1: number
    ): AsyncIterable<[number, Uint8Array][]>
    getKeysPaged(
        pageSize: number,
        key1: number,
        key2: Uint8Array
    ): AsyncIterable<[number, Uint8Array][]>
    getPairs(): Promise<[k: [number, Uint8Array], v: v1.ShareInfo][]>
    getPairs(
        key1: number
    ): Promise<[k: [number, Uint8Array], v: v1.ShareInfo][]>
    getPairs(
        key1: number,
        key2: Uint8Array
    ): Promise<[k: [number, Uint8Array], v: v1.ShareInfo][]>
    getPairsPaged(
        pageSize: number
    ): AsyncIterable<[k: [number, Uint8Array], v: v1.ShareInfo][]>
    getPairsPaged(
        pageSize: number,
        key1: number
    ): AsyncIterable<[k: [number, Uint8Array], v: v1.ShareInfo][]>
    getPairsPaged(
        pageSize: number,
        key1: number,
        key2: Uint8Array
    ): AsyncIterable<[k: [number, Uint8Array], v: v1.ShareInfo][]>
}

export class SystemAccountStorage extends StorageBase {
    protected getPrefix() {
        return 'System'
    }

    protected getName() {
        return 'Account'
    }

    /**
     *  The full account information for a particular account ID.
     */
    get isV1(): boolean {
        return (
            this.getTypeHash() ===
            '1ddc7ade926221442c388ee4405a71c9428e548fab037445aaf4b3a78f4735c1'
        )
    }

    /**
     *  The full account information for a particular account ID.
     */
    get asV1(): SystemAccountStorageV1 {
        assert(this.isV1)
        return this as any
    }
}

/**
 *  The full account information for a particular account ID.
 */
export interface SystemAccountStorageV1 {
    get(key: Uint8Array): Promise<v1.AccountInfo>
    getAll(): Promise<v1.AccountInfo[]>
    getMany(keys: Uint8Array[]): Promise<v1.AccountInfo[]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: v1.AccountInfo][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: v1.AccountInfo][]>
    getPairsPaged(
        pageSize: number
    ): AsyncIterable<[k: Uint8Array, v: v1.AccountInfo][]>
    getPairsPaged(
        pageSize: number,
        key: Uint8Array
    ): AsyncIterable<[k: Uint8Array, v: v1.AccountInfo][]>
}

export class SystemBlockHashStorage extends StorageBase {
    protected getPrefix() {
        return 'System'
    }

    protected getName() {
        return 'BlockHash'
    }

    /**
     *  Map of block numbers to block hashes.
     */
    get isV1(): boolean {
        return (
            this.getTypeHash() ===
            '06f5703796027f4b198d4ffd50b721273430d8ff663660646793873168f9df17'
        )
    }

    /**
     *  Map of block numbers to block hashes.
     */
    get asV1(): SystemBlockHashStorageV1 {
        assert(this.isV1)
        return this as any
    }
}

/**
 *  Map of block numbers to block hashes.
 */
export interface SystemBlockHashStorageV1 {
    get(key: number): Promise<Uint8Array>
    getAll(): Promise<Uint8Array[]>
    getMany(keys: number[]): Promise<Uint8Array[]>
    getKeys(): Promise<number[]>
    getKeys(key: number): Promise<number[]>
    getKeysPaged(pageSize: number): AsyncIterable<number[]>
    getKeysPaged(pageSize: number, key: number): AsyncIterable<number[]>
    getPairs(): Promise<[k: number, v: Uint8Array][]>
    getPairs(key: number): Promise<[k: number, v: Uint8Array][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: number, v: Uint8Array][]>
    getPairsPaged(
        pageSize: number,
        key: number
    ): AsyncIterable<[k: number, v: Uint8Array][]>
}

export class TimestampNowStorage extends StorageBase {
    protected getPrefix() {
        return 'Timestamp'
    }

    protected getName() {
        return 'Now'
    }

    /**
     *  Current time for the current block.
     */
    get isV1(): boolean {
        return (
            this.getTypeHash() ===
            '95ff4f914f08e149ddbe1ae2dcb1743bbf9aaae69d04c486e1a398cacfcca06a'
        )
    }

    /**
     *  Current time for the current block.
     */
    get asV1(): TimestampNowStorageV1 {
        assert(this.isV1)
        return this as any
    }
}

/**
 *  Current time for the current block.
 */
export interface TimestampNowStorageV1 {
    get(): Promise<bigint>
}

export class TokensAccountsStorage extends StorageBase {
    protected getPrefix() {
        return 'Tokens'
    }

    protected getName() {
        return 'Accounts'
    }

    /**
     *  The balance of a token type under an account.
     *
     *  NOTE: If the total is ever zero, decrease account ref account.
     *
     *  NOTE: This is only used in the case that this module is used to store
     *  balances.
     */
    get isV1(): boolean {
        return (
            this.getTypeHash() ===
            'c93fd28a26156cd75008347a9caef1024636b70f65e1c711776470a74d507c7e'
        )
    }

    /**
     *  The balance of a token type under an account.
     *
     *  NOTE: If the total is ever zero, decrease account ref account.
     *
     *  NOTE: This is only used in the case that this module is used to store
     *  balances.
     */
    get asV1(): TokensAccountsStorageV1 {
        assert(this.isV1)
        return this as any
    }
}

/**
 *  The balance of a token type under an account.
 *
 *  NOTE: If the total is ever zero, decrease account ref account.
 *
 *  NOTE: This is only used in the case that this module is used to store
 *  balances.
 */
export interface TokensAccountsStorageV1 {
    get(key1: Uint8Array, key2: v1.CurrencyId): Promise<v1.Type_475>
    getAll(): Promise<v1.Type_475[]>
    getMany(keys: [Uint8Array, v1.CurrencyId][]): Promise<v1.Type_475[]>
    getKeys(): Promise<[Uint8Array, v1.CurrencyId][]>
    getKeys(key1: Uint8Array): Promise<[Uint8Array, v1.CurrencyId][]>
    getKeys(
        key1: Uint8Array,
        key2: v1.CurrencyId
    ): Promise<[Uint8Array, v1.CurrencyId][]>
    getKeysPaged(pageSize: number): AsyncIterable<[Uint8Array, v1.CurrencyId][]>
    getKeysPaged(
        pageSize: number,
        key1: Uint8Array
    ): AsyncIterable<[Uint8Array, v1.CurrencyId][]>
    getKeysPaged(
        pageSize: number,
        key1: Uint8Array,
        key2: v1.CurrencyId
    ): AsyncIterable<[Uint8Array, v1.CurrencyId][]>
    getPairs(): Promise<[k: [Uint8Array, v1.CurrencyId], v: v1.Type_475][]>
    getPairs(
        key1: Uint8Array
    ): Promise<[k: [Uint8Array, v1.CurrencyId], v: v1.Type_475][]>
    getPairs(
        key1: Uint8Array,
        key2: v1.CurrencyId
    ): Promise<[k: [Uint8Array, v1.CurrencyId], v: v1.Type_475][]>
    getPairsPaged(
        pageSize: number
    ): AsyncIterable<[k: [Uint8Array, v1.CurrencyId], v: v1.Type_475][]>
    getPairsPaged(
        pageSize: number,
        key1: Uint8Array
    ): AsyncIterable<[k: [Uint8Array, v1.CurrencyId], v: v1.Type_475][]>
    getPairsPaged(
        pageSize: number,
        key1: Uint8Array,
        key2: v1.CurrencyId
    ): AsyncIterable<[k: [Uint8Array, v1.CurrencyId], v: v1.Type_475][]>
}

export class TokensTotalIssuanceStorage extends StorageBase {
    protected getPrefix() {
        return 'Tokens'
    }

    protected getName() {
        return 'TotalIssuance'
    }

    /**
     *  The total issuance of a token type.
     */
    get isV1(): boolean {
        return (
            this.getTypeHash() ===
            'b77c137fb3aca17635bd8885d50678d25a44381bfa04b75c1bd9d8f052e810e9'
        )
    }

    /**
     *  The total issuance of a token type.
     */
    get asV1(): TokensTotalIssuanceStorageV1 {
        assert(this.isV1)
        return this as any
    }
}

/**
 *  The total issuance of a token type.
 */
export interface TokensTotalIssuanceStorageV1 {
    get(key: v1.CurrencyId): Promise<bigint>
    getAll(): Promise<bigint[]>
    getMany(keys: v1.CurrencyId[]): Promise<bigint[]>
    getKeys(): Promise<v1.CurrencyId[]>
    getKeys(key: v1.CurrencyId): Promise<v1.CurrencyId[]>
    getKeysPaged(pageSize: number): AsyncIterable<v1.CurrencyId[]>
    getKeysPaged(
        pageSize: number,
        key: v1.CurrencyId
    ): AsyncIterable<v1.CurrencyId[]>
    getPairs(): Promise<[k: v1.CurrencyId, v: bigint][]>
    getPairs(key: v1.CurrencyId): Promise<[k: v1.CurrencyId, v: bigint][]>
    getPairsPaged(
        pageSize: number
    ): AsyncIterable<[k: v1.CurrencyId, v: bigint][]>
    getPairsPaged(
        pageSize: number,
        key: v1.CurrencyId
    ): AsyncIterable<[k: v1.CurrencyId, v: bigint][]>
}

export class ZenlinkProtocolLiquidityPairsStorage extends StorageBase {
    protected getPrefix() {
        return 'ZenlinkProtocol'
    }

    protected getName() {
        return 'LiquidityPairs'
    }

    get isV1(): boolean {
        return (
            this.getTypeHash() ===
            '789cf3f60e0a697e380821675a1d5385e419abba09e35755b95a3eb7b5a28f1f'
        )
    }

    get asV1(): ZenlinkProtocolLiquidityPairsStorageV1 {
        assert(this.isV1)
        return this as any
    }
}

export interface ZenlinkProtocolLiquidityPairsStorageV1 {
    get(key: [v1.AssetId, v1.AssetId]): Promise<v1.AssetId | undefined>
    getAll(): Promise<(v1.AssetId | undefined)[]>
    getMany(
        keys: [v1.AssetId, v1.AssetId][]
    ): Promise<(v1.AssetId | undefined)[]>
    getKeys(): Promise<[v1.AssetId, v1.AssetId][]>
    getKeys(key: [v1.AssetId, v1.AssetId]): Promise<[v1.AssetId, v1.AssetId][]>
    getKeysPaged(pageSize: number): AsyncIterable<[v1.AssetId, v1.AssetId][]>
    getKeysPaged(
        pageSize: number,
        key: [v1.AssetId, v1.AssetId]
    ): AsyncIterable<[v1.AssetId, v1.AssetId][]>
    getPairs(): Promise<
        [k: [v1.AssetId, v1.AssetId], v: v1.AssetId | undefined][]
    >
    getPairs(
        key: [v1.AssetId, v1.AssetId]
    ): Promise<[k: [v1.AssetId, v1.AssetId], v: v1.AssetId | undefined][]>
    getPairsPaged(
        pageSize: number
    ): AsyncIterable<[k: [v1.AssetId, v1.AssetId], v: v1.AssetId | undefined][]>
    getPairsPaged(
        pageSize: number,
        key: [v1.AssetId, v1.AssetId]
    ): AsyncIterable<[k: [v1.AssetId, v1.AssetId], v: v1.AssetId | undefined][]>
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
    get isV1(): boolean {
        return (
            this.getTypeHash() ===
            'bad89eddde62d5d40bc938d63d2495e173228abf7011695d72c252612979bde7'
        )
    }

    /**
     *  (T::AssetId, T::AssetId) -> PairStatus
     */
    get asV1(): ZenlinkProtocolPairStatusesStorageV1 {
        assert(this.isV1)
        return this as any
    }
}

/**
 *  (T::AssetId, T::AssetId) -> PairStatus
 */
export interface ZenlinkProtocolPairStatusesStorageV1 {
    get(key: [v1.AssetId, v1.AssetId]): Promise<v1.PairStatus>
    getAll(): Promise<v1.PairStatus[]>
    getMany(keys: [v1.AssetId, v1.AssetId][]): Promise<v1.PairStatus[]>
    getKeys(): Promise<[v1.AssetId, v1.AssetId][]>
    getKeys(key: [v1.AssetId, v1.AssetId]): Promise<[v1.AssetId, v1.AssetId][]>
    getKeysPaged(pageSize: number): AsyncIterable<[v1.AssetId, v1.AssetId][]>
    getKeysPaged(
        pageSize: number,
        key: [v1.AssetId, v1.AssetId]
    ): AsyncIterable<[v1.AssetId, v1.AssetId][]>
    getPairs(): Promise<[k: [v1.AssetId, v1.AssetId], v: v1.PairStatus][]>
    getPairs(
        key: [v1.AssetId, v1.AssetId]
    ): Promise<[k: [v1.AssetId, v1.AssetId], v: v1.PairStatus][]>
    getPairsPaged(
        pageSize: number
    ): AsyncIterable<[k: [v1.AssetId, v1.AssetId], v: v1.PairStatus][]>
    getPairsPaged(
        pageSize: number,
        key: [v1.AssetId, v1.AssetId]
    ): AsyncIterable<[k: [v1.AssetId, v1.AssetId], v: v1.PairStatus][]>
}
