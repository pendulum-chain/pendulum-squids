import assert from 'assert'
import {StorageBase} from './support'

import * as v1 from './v1'
import * as v902 from './v902'
import * as v906 from './v906'
import * as v956 from './v956'
import * as v962 from './v962'


export class AssetRegistryCurrencyMetadatasStorage extends StorageBase {
    protected getPrefix() {
        return 'AssetRegistry'
    }

    protected getName() {
        return 'CurrencyMetadatas'
    }

    /**
     *  The storages for AssetMetadata.
     * 
     *  CurrencyMetadatas: map CurrencyId => Option<AssetMetadata>
     */
    get isV956(): boolean {
        return this.getTypeHash() === 'e08bc4f3aa66be2b3c650bc88441394e425e6447384c7f6022be4cc6f0185f8c'
    }

    /**
     *  The storages for AssetMetadata.
     * 
     *  CurrencyMetadatas: map CurrencyId => Option<AssetMetadata>
     */
    get asV956(): AssetRegistryCurrencyMetadatasStorageV956 {
        assert(this.isV956)
        return this as any
    }

    /**
     *  The storages for AssetMetadata.
     * 
     *  CurrencyMetadatas: map CurrencyId => Option<AssetMetadata>
     */
    get isV962(): boolean {
        return this.getTypeHash() === '9119afad27c100216eed976bb02714bc032591d19a759cdbc209d5dc868aa7b2'
    }

    /**
     *  The storages for AssetMetadata.
     * 
     *  CurrencyMetadatas: map CurrencyId => Option<AssetMetadata>
     */
    get asV962(): AssetRegistryCurrencyMetadatasStorageV962 {
        assert(this.isV962)
        return this as any
    }
}


/**
 *  The storages for AssetMetadata.
 * 
 *  CurrencyMetadatas: map CurrencyId => Option<AssetMetadata>
 */
 export interface AssetRegistryCurrencyMetadatasStorageV956 {
    get(key: v956.CurrencyId): Promise<(v956.AssetMetadata | undefined)>
    getAll(): Promise<v956.AssetMetadata[]>
    getMany(keys: v956.CurrencyId[]): Promise<(v956.AssetMetadata | undefined)[]>
    getKeys(): Promise<v956.CurrencyId[]>
    getKeys(key: v956.CurrencyId): Promise<v956.CurrencyId[]>
    getKeysPaged(pageSize: number): AsyncIterable<v956.CurrencyId[]>
    getKeysPaged(pageSize: number, key: v956.CurrencyId): AsyncIterable<v956.CurrencyId[]>
    getPairs(): Promise<[k: v956.CurrencyId, v: v956.AssetMetadata][]>
    getPairs(key: v956.CurrencyId): Promise<[k: v956.CurrencyId, v: v956.AssetMetadata][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: v956.CurrencyId, v: v956.AssetMetadata][]>
    getPairsPaged(pageSize: number, key: v956.CurrencyId): AsyncIterable<[k: v956.CurrencyId, v: v956.AssetMetadata][]>
}

/**
 *  The storages for AssetMetadata.
 * 
 *  CurrencyMetadatas: map CurrencyId => Option<AssetMetadata>
 */
 export interface AssetRegistryCurrencyMetadatasStorageV962 {
    get(key: v962.CurrencyId): Promise<(v962.AssetMetadata | undefined)>
    getAll(): Promise<v962.AssetMetadata[]>
    getMany(keys: v962.CurrencyId[]): Promise<(v962.AssetMetadata | undefined)[]>
    getKeys(): Promise<v962.CurrencyId[]>
    getKeys(key: v962.CurrencyId): Promise<v962.CurrencyId[]>
    getKeysPaged(pageSize: number): AsyncIterable<v962.CurrencyId[]>
    getKeysPaged(pageSize: number, key: v962.CurrencyId): AsyncIterable<v962.CurrencyId[]>
    getPairs(): Promise<[k: v962.CurrencyId, v: v962.AssetMetadata][]>
    getPairs(key: v962.CurrencyId): Promise<[k: v962.CurrencyId, v: v962.AssetMetadata][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: v962.CurrencyId, v: v962.AssetMetadata][]>
    getPairsPaged(pageSize: number, key: v962.CurrencyId): AsyncIterable<[k: v962.CurrencyId, v: v962.AssetMetadata][]>
}

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
        return this.getTypeHash() === 'f8ebe28eb30158172c0ccf672f7747c46a244f892d08ef2ebcbaadde34a26bc0'
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
        return this.getTypeHash() === '1ddc7ade926221442c388ee4405a71c9428e548fab037445aaf4b3a78f4735c1'
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
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: v1.AccountInfo][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: v1.AccountInfo][]>
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
    get isV906(): boolean {
        return this.getTypeHash() === '8ea314d04aa7f347c62c956b85a71b71b4c155a0546ef6c7fc901ae08951705f'
    }

    /**
     *  The balance of a token type under an account.
     * 
     *  NOTE: If the total is ever zero, decrease account ref account.
     * 
     *  NOTE: This is only used in the case that this module is used to store
     *  balances.
     */
    get asV906(): TokensAccountsStorageV906 {
        assert(this.isV906)
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
    get isV956(): boolean {
        return this.getTypeHash() === 'b6a53be77df83383c0a1b8395b54ecfacf478653d11f6ac618bc625a62cf9435'
    }

    /**
     *  The balance of a token type under an account.
     * 
     *  NOTE: If the total is ever zero, decrease account ref account.
     * 
     *  NOTE: This is only used in the case that this module is used to store
     *  balances.
     */
    get asV956(): TokensAccountsStorageV956 {
        assert(this.isV956)
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
    get isV962(): boolean {
        return this.getTypeHash() === '320cf65e8586698cf6c17de6d0fd1a55530700be0e4ec598786cf5644a87f656'
    }

    /**
     *  The balance of a token type under an account.
     * 
     *  NOTE: If the total is ever zero, decrease account ref account.
     * 
     *  NOTE: This is only used in the case that this module is used to store
     *  balances.
     */
    get asV962(): TokensAccountsStorageV962 {
        assert(this.isV962)
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
 export interface TokensAccountsStorageV906 {
    get(key1: Uint8Array, key2: v906.CurrencyId): Promise<v906.Type_363>
    getAll(): Promise<v906.Type_363[]>
    getMany(keys: [Uint8Array, v906.CurrencyId][]): Promise<v906.Type_363[]>
    getKeys(): Promise<[Uint8Array, v906.CurrencyId][]>
    getKeys(key1: Uint8Array): Promise<[Uint8Array, v906.CurrencyId][]>
    getKeys(key1: Uint8Array, key2: v906.CurrencyId): Promise<[Uint8Array, v906.CurrencyId][]>
    getKeysPaged(pageSize: number): AsyncIterable<[Uint8Array, v906.CurrencyId][]>
    getKeysPaged(pageSize: number, key1: Uint8Array): AsyncIterable<[Uint8Array, v906.CurrencyId][]>
    getKeysPaged(pageSize: number, key1: Uint8Array, key2: v906.CurrencyId): AsyncIterable<[Uint8Array, v906.CurrencyId][]>
    getPairs(): Promise<[k: [Uint8Array, v906.CurrencyId], v: v906.Type_363][]>
    getPairs(key1: Uint8Array): Promise<[k: [Uint8Array, v906.CurrencyId], v: v906.Type_363][]>
    getPairs(key1: Uint8Array, key2: v906.CurrencyId): Promise<[k: [Uint8Array, v906.CurrencyId], v: v906.Type_363][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: [Uint8Array, v906.CurrencyId], v: v906.Type_363][]>
    getPairsPaged(pageSize: number, key1: Uint8Array): AsyncIterable<[k: [Uint8Array, v906.CurrencyId], v: v906.Type_363][]>
    getPairsPaged(pageSize: number, key1: Uint8Array, key2: v906.CurrencyId): AsyncIterable<[k: [Uint8Array, v906.CurrencyId], v: v906.Type_363][]>
}
/**
 *  The balance of a token type under an account.
 * 
 *  NOTE: If the total is ever zero, decrease account ref account.
 * 
 *  NOTE: This is only used in the case that this module is used to store
 *  balances.
 */
 export interface TokensAccountsStorageV956 {
    get(key1: Uint8Array, key2: v956.CurrencyId): Promise<v956.Type_568>
    getAll(): Promise<v956.Type_568[]>
    getMany(keys: [Uint8Array, v956.CurrencyId][]): Promise<v956.Type_568[]>
    getKeys(): Promise<[Uint8Array, v956.CurrencyId][]>
    getKeys(key1: Uint8Array): Promise<[Uint8Array, v956.CurrencyId][]>
    getKeys(key1: Uint8Array, key2: v956.CurrencyId): Promise<[Uint8Array, v956.CurrencyId][]>
    getKeysPaged(pageSize: number): AsyncIterable<[Uint8Array, v956.CurrencyId][]>
    getKeysPaged(pageSize: number, key1: Uint8Array): AsyncIterable<[Uint8Array, v956.CurrencyId][]>
    getKeysPaged(pageSize: number, key1: Uint8Array, key2: v956.CurrencyId): AsyncIterable<[Uint8Array, v956.CurrencyId][]>
    getPairs(): Promise<[k: [Uint8Array, v956.CurrencyId], v: v956.Type_568][]>
    getPairs(key1: Uint8Array): Promise<[k: [Uint8Array, v956.CurrencyId], v: v956.Type_568][]>
    getPairs(key1: Uint8Array, key2: v956.CurrencyId): Promise<[k: [Uint8Array, v956.CurrencyId], v: v956.Type_568][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: [Uint8Array, v956.CurrencyId], v: v956.Type_568][]>
    getPairsPaged(pageSize: number, key1: Uint8Array): AsyncIterable<[k: [Uint8Array, v956.CurrencyId], v: v956.Type_568][]>
    getPairsPaged(pageSize: number, key1: Uint8Array, key2: v956.CurrencyId): AsyncIterable<[k: [Uint8Array, v956.CurrencyId], v: v956.Type_568][]>
}

/**
 *  The balance of a token type under an account.
 * 
 *  NOTE: If the total is ever zero, decrease account ref account.
 * 
 *  NOTE: This is only used in the case that this module is used to store
 *  balances.
 */
export interface TokensAccountsStorageV962 {
    get(key1: Uint8Array, key2: v962.CurrencyId): Promise<v962.Type_591>
    getAll(): Promise<v962.Type_591[]>
    getMany(keys: [Uint8Array, v962.CurrencyId][]): Promise<v962.Type_591[]>
    getKeys(): Promise<[Uint8Array, v962.CurrencyId][]>
    getKeys(key1: Uint8Array): Promise<[Uint8Array, v962.CurrencyId][]>
    getKeys(key1: Uint8Array, key2: v962.CurrencyId): Promise<[Uint8Array, v962.CurrencyId][]>
    getKeysPaged(pageSize: number): AsyncIterable<[Uint8Array, v962.CurrencyId][]>
    getKeysPaged(pageSize: number, key1: Uint8Array): AsyncIterable<[Uint8Array, v962.CurrencyId][]>
    getKeysPaged(pageSize: number, key1: Uint8Array, key2: v962.CurrencyId): AsyncIterable<[Uint8Array, v962.CurrencyId][]>
    getPairs(): Promise<[k: [Uint8Array, v962.CurrencyId], v: v962.Type_591][]>
    getPairs(key1: Uint8Array): Promise<[k: [Uint8Array, v962.CurrencyId], v: v962.Type_591][]>
    getPairs(key1: Uint8Array, key2: v962.CurrencyId): Promise<[k: [Uint8Array, v962.CurrencyId], v: v962.Type_591][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: [Uint8Array, v962.CurrencyId], v: v962.Type_591][]>
    getPairsPaged(pageSize: number, key1: Uint8Array): AsyncIterable<[k: [Uint8Array, v962.CurrencyId], v: v962.Type_591][]>
    getPairsPaged(pageSize: number, key1: Uint8Array, key2: v962.CurrencyId): AsyncIterable<[k: [Uint8Array, v962.CurrencyId], v: v962.Type_591][]>
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
    get isV906(): boolean {
        return this.getTypeHash() === 'bc7ace11b9acb0503943c179b0df6b087fe54378a529b00bc4d74e91a92b8d20'
    }

    /**
     *  The total issuance of a token type.
     */
    get asV906(): TokensTotalIssuanceStorageV906 {
        assert(this.isV906)
        return this as any
    }

 
 
 
    /**
     *  The total issuance of a token type.
     */
    get isV956(): boolean {
        return this.getTypeHash() === '4c39b9bae716dbe5a3072da27c59dffcdf999bdf64e2e4128f5e6038396d4a03'
    }

    /**
     *  The total issuance of a token type.
     */
    get asV956(): TokensTotalIssuanceStorageV956 {
        assert(this.isV956)
        return this as any
    }

    /**
     *  The total issuance of a token type.
     */
    get isV962(): boolean {
        return this.getTypeHash() === '90285da57e7305354cef41c507a8403919ee1ccfad0a423e082e82bb7abe002a'
    }

    /**
     *  The total issuance of a token type.
     */
    get asV962(): TokensTotalIssuanceStorageV962 {
        assert(this.isV962)
        return this as any
    }
}

 

/**
 *  The total issuance of a token type.
 */
export interface TokensTotalIssuanceStorageV906 {
    get(key: v906.CurrencyId): Promise<bigint>
    getAll(): Promise<bigint[]>
    getMany(keys: v906.CurrencyId[]): Promise<bigint[]>
    getKeys(): Promise<v906.CurrencyId[]>
    getKeys(key: v906.CurrencyId): Promise<v906.CurrencyId[]>
    getKeysPaged(pageSize: number): AsyncIterable<v906.CurrencyId[]>
    getKeysPaged(pageSize: number, key: v906.CurrencyId): AsyncIterable<v906.CurrencyId[]>
    getPairs(): Promise<[k: v906.CurrencyId, v: bigint][]>
    getPairs(key: v906.CurrencyId): Promise<[k: v906.CurrencyId, v: bigint][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: v906.CurrencyId, v: bigint][]>
    getPairsPaged(pageSize: number, key: v906.CurrencyId): AsyncIterable<[k: v906.CurrencyId, v: bigint][]>
}

 

 

 
/**
 *  The total issuance of a token type.
 */
export interface TokensTotalIssuanceStorageV956 {
    get(key: v956.CurrencyId): Promise<bigint>
    getAll(): Promise<bigint[]>
    getMany(keys: v956.CurrencyId[]): Promise<bigint[]>
    getKeys(): Promise<v956.CurrencyId[]>
    getKeys(key: v956.CurrencyId): Promise<v956.CurrencyId[]>
    getKeysPaged(pageSize: number): AsyncIterable<v956.CurrencyId[]>
    getKeysPaged(pageSize: number, key: v956.CurrencyId): AsyncIterable<v956.CurrencyId[]>
    getPairs(): Promise<[k: v956.CurrencyId, v: bigint][]>
    getPairs(key: v956.CurrencyId): Promise<[k: v956.CurrencyId, v: bigint][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: v956.CurrencyId, v: bigint][]>
    getPairsPaged(pageSize: number, key: v956.CurrencyId): AsyncIterable<[k: v956.CurrencyId, v: bigint][]>
}

/**
 *  The total issuance of a token type.
 */
export interface TokensTotalIssuanceStorageV962 {
    get(key: v962.CurrencyId): Promise<bigint>
    getAll(): Promise<bigint[]>
    getMany(keys: v962.CurrencyId[]): Promise<bigint[]>
    getKeys(): Promise<v962.CurrencyId[]>
    getKeys(key: v962.CurrencyId): Promise<v962.CurrencyId[]>
    getKeysPaged(pageSize: number): AsyncIterable<v962.CurrencyId[]>
    getKeysPaged(pageSize: number, key: v962.CurrencyId): AsyncIterable<v962.CurrencyId[]>
    getPairs(): Promise<[k: v962.CurrencyId, v: bigint][]>
    getPairs(key: v962.CurrencyId): Promise<[k: v962.CurrencyId, v: bigint][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: v962.CurrencyId, v: bigint][]>
    getPairsPaged(pageSize: number, key: v962.CurrencyId): AsyncIterable<[k: v962.CurrencyId, v: bigint][]>
}



export class ZenlinkProtocolLiquidityPairsStorage extends StorageBase {
    protected getPrefix() {
        return 'ZenlinkProtocol'
    }

    protected getName() {
        return 'LiquidityPairs'
    }

    get isV902(): boolean {
        return this.getTypeHash() === 'e95fb5126bd8e5d9a624a5075b31639743d7dfb5262de60578b320acf59ce453'
    }

    get asV902(): ZenlinkProtocolLiquidityPairsStorageV902 {
        assert(this.isV902)
        return this as any
    }

    get isV906(): boolean {
        return this.getTypeHash() === '789cf3f60e0a697e380821675a1d5385e419abba09e35755b95a3eb7b5a28f1f'
    }

    get asV906(): ZenlinkProtocolLiquidityPairsStorageV906 {
        assert(this.isV906)
        return this as any
    }
}

export interface ZenlinkProtocolLiquidityPairsStorageV902 {
    get(key: [number, number]): Promise<(number | undefined)>
    getAll(): Promise<(number | undefined)[]>
    getMany(keys: [number, number][]): Promise<(number | undefined)[]>
    getKeys(): Promise<[number, number][]>
    getKeys(key: [number, number]): Promise<[number, number][]>
    getKeysPaged(pageSize: number): AsyncIterable<[number, number][]>
    getKeysPaged(pageSize: number, key: [number, number]): AsyncIterable<[number, number][]>
    getPairs(): Promise<[k: [number, number], v: (number | undefined)][]>
    getPairs(key: [number, number]): Promise<[k: [number, number], v: (number | undefined)][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: [number, number], v: (number | undefined)][]>
    getPairsPaged(pageSize: number, key: [number, number]): AsyncIterable<[k: [number, number], v: (number | undefined)][]>
}

export interface ZenlinkProtocolLiquidityPairsStorageV906 {
    get(key: [v906.AssetId, v906.AssetId]): Promise<(v906.AssetId | undefined)>
    getAll(): Promise<(v906.AssetId | undefined)[]>
    getMany(keys: [v906.AssetId, v906.AssetId][]): Promise<(v906.AssetId | undefined)[]>
    getKeys(): Promise<[v906.AssetId, v906.AssetId][]>
    getKeys(key: [v906.AssetId, v906.AssetId]): Promise<[v906.AssetId, v906.AssetId][]>
    getKeysPaged(pageSize: number): AsyncIterable<[v906.AssetId, v906.AssetId][]>
    getKeysPaged(pageSize: number, key: [v906.AssetId, v906.AssetId]): AsyncIterable<[v906.AssetId, v906.AssetId][]>
    getPairs(): Promise<[k: [v906.AssetId, v906.AssetId], v: (v906.AssetId | undefined)][]>
    getPairs(key: [v906.AssetId, v906.AssetId]): Promise<[k: [v906.AssetId, v906.AssetId], v: (v906.AssetId | undefined)][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: [v906.AssetId, v906.AssetId], v: (v906.AssetId | undefined)][]>
    getPairsPaged(pageSize: number, key: [v906.AssetId, v906.AssetId]): AsyncIterable<[k: [v906.AssetId, v906.AssetId], v: (v906.AssetId | undefined)][]>
}

export class ZenlinkProtocolPairStatusesStorage extends StorageBase {
    protected getPrefix() {
        return 'ZenlinkProtocol'
    }

    protected getName() {
        return 'PairStatuses'
    }

    /**
     *  (AssetId, AssetId) -> PairStatus
     */
    get isV902(): boolean {
        return this.getTypeHash() === '2faae79f4ae95d419833b1d0471ee60a503e09075a12d9ccba4e2fec7b728d75'
    }

    /**
     *  (AssetId, AssetId) -> PairStatus
     */
    get asV902(): ZenlinkProtocolPairStatusesStorageV902 {
        assert(this.isV902)
        return this as any
    }

    /**
     *  (AssetId, AssetId) -> PairStatus
     */
    get isV906(): boolean {
        return this.getTypeHash() === 'bad89eddde62d5d40bc938d63d2495e173228abf7011695d72c252612979bde7'
    }

    /**
     *  (AssetId, AssetId) -> PairStatus
     */
    get asV906(): ZenlinkProtocolPairStatusesStorageV906 {
        assert(this.isV906)
        return this as any
    }
}

/**
 *  (AssetId, AssetId) -> PairStatus
 */
export interface ZenlinkProtocolPairStatusesStorageV902 {
    get(key: [number, number]): Promise<v902.PairStatus>
    getAll(): Promise<v902.PairStatus[]>
    getMany(keys: [number, number][]): Promise<v902.PairStatus[]>
    getKeys(): Promise<[number, number][]>
    getKeys(key: [number, number]): Promise<[number, number][]>
    getKeysPaged(pageSize: number): AsyncIterable<[number, number][]>
    getKeysPaged(pageSize: number, key: [number, number]): AsyncIterable<[number, number][]>
    getPairs(): Promise<[k: [number, number], v: v902.PairStatus][]>
    getPairs(key: [number, number]): Promise<[k: [number, number], v: v902.PairStatus][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: [number, number], v: v902.PairStatus][]>
    getPairsPaged(pageSize: number, key: [number, number]): AsyncIterable<[k: [number, number], v: v902.PairStatus][]>
}

/**
 *  (AssetId, AssetId) -> PairStatus
 */
export interface ZenlinkProtocolPairStatusesStorageV906 {
    get(key: [v906.AssetId, v906.AssetId]): Promise<v906.PairStatus>
    getAll(): Promise<v906.PairStatus[]>
    getMany(keys: [v906.AssetId, v906.AssetId][]): Promise<v906.PairStatus[]>
    getKeys(): Promise<[v906.AssetId, v906.AssetId][]>
    getKeys(key: [v906.AssetId, v906.AssetId]): Promise<[v906.AssetId, v906.AssetId][]>
    getKeysPaged(pageSize: number): AsyncIterable<[v906.AssetId, v906.AssetId][]>
    getKeysPaged(pageSize: number, key: [v906.AssetId, v906.AssetId]): AsyncIterable<[v906.AssetId, v906.AssetId][]>
    getPairs(): Promise<[k: [v906.AssetId, v906.AssetId], v: v906.PairStatus][]>
    getPairs(key: [v906.AssetId, v906.AssetId]): Promise<[k: [v906.AssetId, v906.AssetId], v: v906.PairStatus][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: [v906.AssetId, v906.AssetId], v: v906.PairStatus][]>
    getPairsPaged(pageSize: number, key: [v906.AssetId, v906.AssetId]): AsyncIterable<[k: [v906.AssetId, v906.AssetId], v: v906.PairStatus][]>
}
