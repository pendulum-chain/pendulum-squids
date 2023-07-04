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
import * as v3 from './v3'
import * as v7 from './v7'
import * as v8 from './v8'

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
    get isV3(): boolean {
        return (
            this.getTypeHash() ===
            'f741d87278aef397443c05fd06e3d212341910447aa8cc33f1f219cdc1eb052a'
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
    get asV3(): TokensAccountsStorageV3 {
        assert(this.isV3)
        return this as any
    }

    /**
     *  The balance of a token type under an account.
     *
     *  NOTE: If the total is ever zero, decrease account ref account.
     *
     *  NOTE: This is only used in the case that this module is used to store
     *  balances.
     */
    get isV8(): boolean {
        return (
            this.getTypeHash() ===
            'b2f34ee2eebc590b20341e2bf6215c062b445e466e84386b570e270645bb7d51'
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
    get asV8(): TokensAccountsStorageV8 {
        assert(this.isV8)
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
export interface TokensAccountsStorageV3 {
    get(key1: Uint8Array, key2: v3.CurrencyId): Promise<v3.Type_360>
    getAll(): Promise<v3.Type_360[]>
    getMany(keys: [Uint8Array, v3.CurrencyId][]): Promise<v3.Type_360[]>
    getKeys(): Promise<[Uint8Array, v3.CurrencyId][]>
    getKeys(key1: Uint8Array): Promise<[Uint8Array, v3.CurrencyId][]>
    getKeys(
        key1: Uint8Array,
        key2: v3.CurrencyId
    ): Promise<[Uint8Array, v3.CurrencyId][]>
    getKeysPaged(pageSize: number): AsyncIterable<[Uint8Array, v3.CurrencyId][]>
    getKeysPaged(
        pageSize: number,
        key1: Uint8Array
    ): AsyncIterable<[Uint8Array, v3.CurrencyId][]>
    getKeysPaged(
        pageSize: number,
        key1: Uint8Array,
        key2: v3.CurrencyId
    ): AsyncIterable<[Uint8Array, v3.CurrencyId][]>
    getPairs(): Promise<[k: [Uint8Array, v3.CurrencyId], v: v3.Type_360][]>
    getPairs(
        key1: Uint8Array
    ): Promise<[k: [Uint8Array, v3.CurrencyId], v: v3.Type_360][]>
    getPairs(
        key1: Uint8Array,
        key2: v3.CurrencyId
    ): Promise<[k: [Uint8Array, v3.CurrencyId], v: v3.Type_360][]>
    getPairsPaged(
        pageSize: number
    ): AsyncIterable<[k: [Uint8Array, v3.CurrencyId], v: v3.Type_360][]>
    getPairsPaged(
        pageSize: number,
        key1: Uint8Array
    ): AsyncIterable<[k: [Uint8Array, v3.CurrencyId], v: v3.Type_360][]>
    getPairsPaged(
        pageSize: number,
        key1: Uint8Array,
        key2: v3.CurrencyId
    ): AsyncIterable<[k: [Uint8Array, v3.CurrencyId], v: v3.Type_360][]>
}

/**
 *  The balance of a token type under an account.
 *
 *  NOTE: If the total is ever zero, decrease account ref account.
 *
 *  NOTE: This is only used in the case that this module is used to store
 *  balances.
 */
export interface TokensAccountsStorageV8 {
    get(key1: Uint8Array, key2: v8.CurrencyId): Promise<v8.Type_452>
    getAll(): Promise<v8.Type_452[]>
    getMany(keys: [Uint8Array, v8.CurrencyId][]): Promise<v8.Type_452[]>
    getKeys(): Promise<[Uint8Array, v8.CurrencyId][]>
    getKeys(key1: Uint8Array): Promise<[Uint8Array, v8.CurrencyId][]>
    getKeys(
        key1: Uint8Array,
        key2: v8.CurrencyId
    ): Promise<[Uint8Array, v8.CurrencyId][]>
    getKeysPaged(pageSize: number): AsyncIterable<[Uint8Array, v8.CurrencyId][]>
    getKeysPaged(
        pageSize: number,
        key1: Uint8Array
    ): AsyncIterable<[Uint8Array, v8.CurrencyId][]>
    getKeysPaged(
        pageSize: number,
        key1: Uint8Array,
        key2: v8.CurrencyId
    ): AsyncIterable<[Uint8Array, v8.CurrencyId][]>
    getPairs(): Promise<[k: [Uint8Array, v8.CurrencyId], v: v8.Type_452][]>
    getPairs(
        key1: Uint8Array
    ): Promise<[k: [Uint8Array, v8.CurrencyId], v: v8.Type_452][]>
    getPairs(
        key1: Uint8Array,
        key2: v8.CurrencyId
    ): Promise<[k: [Uint8Array, v8.CurrencyId], v: v8.Type_452][]>
    getPairsPaged(
        pageSize: number
    ): AsyncIterable<[k: [Uint8Array, v8.CurrencyId], v: v8.Type_452][]>
    getPairsPaged(
        pageSize: number,
        key1: Uint8Array
    ): AsyncIterable<[k: [Uint8Array, v8.CurrencyId], v: v8.Type_452][]>
    getPairsPaged(
        pageSize: number,
        key1: Uint8Array,
        key2: v8.CurrencyId
    ): AsyncIterable<[k: [Uint8Array, v8.CurrencyId], v: v8.Type_452][]>
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
    get isV3(): boolean {
        return (
            this.getTypeHash() ===
            '3180077969081921b1f1260f6696684789757f8c0b6adc91a41e6029dfe49428'
        )
    }

    /**
     *  The total issuance of a token type.
     */
    get asV3(): TokensTotalIssuanceStorageV3 {
        assert(this.isV3)
        return this as any
    }

    /**
     *  The total issuance of a token type.
     */
    get isV8(): boolean {
        return (
            this.getTypeHash() ===
            'cdfa53f72a693e3be9f1b744ea79875ce4fe38d67a7fbf3b2b11e88d72354ff9'
        )
    }

    /**
     *  The total issuance of a token type.
     */
    get asV8(): TokensTotalIssuanceStorageV8 {
        assert(this.isV8)
        return this as any
    }
}

/**
 *  The total issuance of a token type.
 */
export interface TokensTotalIssuanceStorageV3 {
    get(key: v3.CurrencyId): Promise<bigint>
    getAll(): Promise<bigint[]>
    getMany(keys: v3.CurrencyId[]): Promise<bigint[]>
    getKeys(): Promise<v3.CurrencyId[]>
    getKeys(key: v3.CurrencyId): Promise<v3.CurrencyId[]>
    getKeysPaged(pageSize: number): AsyncIterable<v3.CurrencyId[]>
    getKeysPaged(
        pageSize: number,
        key: v3.CurrencyId
    ): AsyncIterable<v3.CurrencyId[]>
    getPairs(): Promise<[k: v3.CurrencyId, v: bigint][]>
    getPairs(key: v3.CurrencyId): Promise<[k: v3.CurrencyId, v: bigint][]>
    getPairsPaged(
        pageSize: number
    ): AsyncIterable<[k: v3.CurrencyId, v: bigint][]>
    getPairsPaged(
        pageSize: number,
        key: v3.CurrencyId
    ): AsyncIterable<[k: v3.CurrencyId, v: bigint][]>
}

/**
 *  The total issuance of a token type.
 */
export interface TokensTotalIssuanceStorageV8 {
    get(key: v8.CurrencyId): Promise<bigint>
    getAll(): Promise<bigint[]>
    getMany(keys: v8.CurrencyId[]): Promise<bigint[]>
    getKeys(): Promise<v8.CurrencyId[]>
    getKeys(key: v8.CurrencyId): Promise<v8.CurrencyId[]>
    getKeysPaged(pageSize: number): AsyncIterable<v8.CurrencyId[]>
    getKeysPaged(
        pageSize: number,
        key: v8.CurrencyId
    ): AsyncIterable<v8.CurrencyId[]>
    getPairs(): Promise<[k: v8.CurrencyId, v: bigint][]>
    getPairs(key: v8.CurrencyId): Promise<[k: v8.CurrencyId, v: bigint][]>
    getPairsPaged(
        pageSize: number
    ): AsyncIterable<[k: v8.CurrencyId, v: bigint][]>
    getPairsPaged(
        pageSize: number,
        key: v8.CurrencyId
    ): AsyncIterable<[k: v8.CurrencyId, v: bigint][]>
}

export class ZenlinkProtocolLiquidityPairsStorage extends StorageBase {
    protected getPrefix() {
        return 'ZenlinkProtocol'
    }

    protected getName() {
        return 'LiquidityPairs'
    }

    get isV7(): boolean {
        return (
            this.getTypeHash() ===
            '789cf3f60e0a697e380821675a1d5385e419abba09e35755b95a3eb7b5a28f1f'
        )
    }

    get asV7(): ZenlinkProtocolLiquidityPairsStorageV7 {
        assert(this.isV7)
        return this as any
    }
}

export interface ZenlinkProtocolLiquidityPairsStorageV7 {
    get(key: [v7.AssetId, v7.AssetId]): Promise<v7.AssetId | undefined>
    getAll(): Promise<(v7.AssetId | undefined)[]>
    getMany(
        keys: [v7.AssetId, v7.AssetId][]
    ): Promise<(v7.AssetId | undefined)[]>
    getKeys(): Promise<[v7.AssetId, v7.AssetId][]>
    getKeys(key: [v7.AssetId, v7.AssetId]): Promise<[v7.AssetId, v7.AssetId][]>
    getKeysPaged(pageSize: number): AsyncIterable<[v7.AssetId, v7.AssetId][]>
    getKeysPaged(
        pageSize: number,
        key: [v7.AssetId, v7.AssetId]
    ): AsyncIterable<[v7.AssetId, v7.AssetId][]>
    getPairs(): Promise<
        [k: [v7.AssetId, v7.AssetId], v: v7.AssetId | undefined][]
    >
    getPairs(
        key: [v7.AssetId, v7.AssetId]
    ): Promise<[k: [v7.AssetId, v7.AssetId], v: v7.AssetId | undefined][]>
    getPairsPaged(
        pageSize: number
    ): AsyncIterable<[k: [v7.AssetId, v7.AssetId], v: v7.AssetId | undefined][]>
    getPairsPaged(
        pageSize: number,
        key: [v7.AssetId, v7.AssetId]
    ): AsyncIterable<[k: [v7.AssetId, v7.AssetId], v: v7.AssetId | undefined][]>
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
        return (
            this.getTypeHash() ===
            'bad89eddde62d5d40bc938d63d2495e173228abf7011695d72c252612979bde7'
        )
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
    getKeysPaged(
        pageSize: number,
        key: [v7.AssetId, v7.AssetId]
    ): AsyncIterable<[v7.AssetId, v7.AssetId][]>
    getPairs(): Promise<[k: [v7.AssetId, v7.AssetId], v: v7.PairStatus][]>
    getPairs(
        key: [v7.AssetId, v7.AssetId]
    ): Promise<[k: [v7.AssetId, v7.AssetId], v: v7.PairStatus][]>
    getPairsPaged(
        pageSize: number
    ): AsyncIterable<[k: [v7.AssetId, v7.AssetId], v: v7.PairStatus][]>
    getPairsPaged(
        pageSize: number,
        key: [v7.AssetId, v7.AssetId]
    ): AsyncIterable<[k: [v7.AssetId, v7.AssetId], v: v7.PairStatus][]>
}