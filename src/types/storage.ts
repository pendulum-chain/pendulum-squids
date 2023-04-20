import assert from 'assert'
import {StorageBase} from './support'

import * as v1 from './v1'
import * as v902 from './v902'
import * as v906 from './v906'
import * as v944 from './v944'
import * as v956 from './v956'
import * as v962 from './v962'
import * as v968 from './v968'


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


export class FarmingGaugeInfosStorage extends StorageBase {
    protected getPrefix() {
        return 'Farming'
    }

    protected getName() {
        return 'GaugeInfos'
    }

    get isV944(): boolean {
        return this.getTypeHash() === 'bfcac1c2fc5422a1bb4fc529e0239e7a73cb9de789e8d33533d200ba8dec513f'
    }

    get asV944(): FarmingGaugeInfosStorageV944 {
        assert(this.isV944)
        return this as any
    }
}

export interface FarmingGaugeInfosStorageV944 {
    get(key1: number, key2: Uint8Array): Promise<(v944.GaugeInfo | undefined)>
    getAll(): Promise<v944.GaugeInfo[]>
    getMany(keys: [number, Uint8Array][]): Promise<(v944.GaugeInfo | undefined)[]>
    getKeys(): Promise<[number, Uint8Array][]>
    getKeys(key1: number): Promise<[number, Uint8Array][]>
    getKeys(key1: number, key2: Uint8Array): Promise<[number, Uint8Array][]>
    getKeysPaged(pageSize: number): AsyncIterable<[number, Uint8Array][]>
    getKeysPaged(pageSize: number, key1: number): AsyncIterable<[number, Uint8Array][]>
    getKeysPaged(pageSize: number, key1: number, key2: Uint8Array): AsyncIterable<[number, Uint8Array][]>
    getPairs(): Promise<[k: [number, Uint8Array], v: v944.GaugeInfo][]>
    getPairs(key1: number): Promise<[k: [number, Uint8Array], v: v944.GaugeInfo][]>
    getPairs(key1: number, key2: Uint8Array): Promise<[k: [number, Uint8Array], v: v944.GaugeInfo][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: [number, Uint8Array], v: v944.GaugeInfo][]>
    getPairsPaged(pageSize: number, key1: number): AsyncIterable<[k: [number, Uint8Array], v: v944.GaugeInfo][]>
    getPairsPaged(pageSize: number, key1: number, key2: Uint8Array): AsyncIterable<[k: [number, Uint8Array], v: v944.GaugeInfo][]>
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
    get isV944(): boolean {
        return this.getTypeHash() === 'f1cdb6ac784a11773490a50ed09e04a6a427db17a246624f62827710c852e0ff'
    }

    /**
     *  Record gauge farming pool info.
     *
     *  map PoolId => GaugePoolInfo
     */
    get asV944(): FarmingGaugePoolInfosStorageV944 {
        assert(this.isV944)
        return this as any
    }

    /**
     *  Record gauge farming pool info.
     *
     *  map PoolId => GaugePoolInfo
     */
    get isV956(): boolean {
        return this.getTypeHash() === 'ee55c0fe28b43fc3e0a8f41aa531af729a2ddcc62d7103fd1e067dcd36836146'
    }

    /**
     *  Record gauge farming pool info.
     *
     *  map PoolId => GaugePoolInfo
     */
    get asV956(): FarmingGaugePoolInfosStorageV956 {
        assert(this.isV956)
        return this as any
    }

    /**
     *  Record gauge farming pool info.
     *
     *  map PoolId => GaugePoolInfo
     */
    get isV962(): boolean {
        return this.getTypeHash() === '1819ce67483f76f3eea7d5cdfd6044cdb9418430a90defed263d6f23aeee72e5'
    }

    /**
     *  Record gauge farming pool info.
     *
     *  map PoolId => GaugePoolInfo
     */
    get asV962(): FarmingGaugePoolInfosStorageV962 {
        assert(this.isV962)
        return this as any
    }
}

/**
 *  Record gauge farming pool info.
 *
 *  map PoolId => GaugePoolInfo
 */
export interface FarmingGaugePoolInfosStorageV944 {
    get(key: number): Promise<(v944.GaugePoolInfo | undefined)>
    getAll(): Promise<v944.GaugePoolInfo[]>
    getMany(keys: number[]): Promise<(v944.GaugePoolInfo | undefined)[]>
    getKeys(): Promise<number[]>
    getKeys(key: number): Promise<number[]>
    getKeysPaged(pageSize: number): AsyncIterable<number[]>
    getKeysPaged(pageSize: number, key: number): AsyncIterable<number[]>
    getPairs(): Promise<[k: number, v: v944.GaugePoolInfo][]>
    getPairs(key: number): Promise<[k: number, v: v944.GaugePoolInfo][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: number, v: v944.GaugePoolInfo][]>
    getPairsPaged(pageSize: number, key: number): AsyncIterable<[k: number, v: v944.GaugePoolInfo][]>
}

/**
 *  Record gauge farming pool info.
 *
 *  map PoolId => GaugePoolInfo
 */
export interface FarmingGaugePoolInfosStorageV956 {
    get(key: number): Promise<(v956.GaugePoolInfo | undefined)>
    getAll(): Promise<v956.GaugePoolInfo[]>
    getMany(keys: number[]): Promise<(v956.GaugePoolInfo | undefined)[]>
    getKeys(): Promise<number[]>
    getKeys(key: number): Promise<number[]>
    getKeysPaged(pageSize: number): AsyncIterable<number[]>
    getKeysPaged(pageSize: number, key: number): AsyncIterable<number[]>
    getPairs(): Promise<[k: number, v: v956.GaugePoolInfo][]>
    getPairs(key: number): Promise<[k: number, v: v956.GaugePoolInfo][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: number, v: v956.GaugePoolInfo][]>
    getPairsPaged(pageSize: number, key: number): AsyncIterable<[k: number, v: v956.GaugePoolInfo][]>
}

/**
 *  Record gauge farming pool info.
 *
 *  map PoolId => GaugePoolInfo
 */
export interface FarmingGaugePoolInfosStorageV962 {
    get(key: number): Promise<(v962.GaugePoolInfo | undefined)>
    getAll(): Promise<v962.GaugePoolInfo[]>
    getMany(keys: number[]): Promise<(v962.GaugePoolInfo | undefined)[]>
    getKeys(): Promise<number[]>
    getKeys(key: number): Promise<number[]>
    getKeysPaged(pageSize: number): AsyncIterable<number[]>
    getKeysPaged(pageSize: number, key: number): AsyncIterable<number[]>
    getPairs(): Promise<[k: number, v: v962.GaugePoolInfo][]>
    getPairs(key: number): Promise<[k: number, v: v962.GaugePoolInfo][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: number, v: v962.GaugePoolInfo][]>
    getPairsPaged(pageSize: number, key: number): AsyncIterable<[k: number, v: v962.GaugePoolInfo][]>
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
    get isV944(): boolean {
        return this.getTypeHash() === '834d2e44981e9f68eae39a166281a398fa964e99472b23a8b2702818b3ea3c51'
    }

    /**
     *  Record reward pool info.
     *
     *  map PoolId => PoolInfo
     */
    get asV944(): FarmingPoolInfosStorageV944 {
        assert(this.isV944)
        return this as any
    }

    /**
     *  Record reward pool info.
     *
     *  map PoolId => PoolInfo
     */
    get isV956(): boolean {
        return this.getTypeHash() === 'e7d117987f08551112c90989e0a64aa516f66a9069e0efa0a69aed831e83e3b2'
    }

    /**
     *  Record reward pool info.
     *
     *  map PoolId => PoolInfo
     */
    get asV956(): FarmingPoolInfosStorageV956 {
        assert(this.isV956)
        return this as any
    }

    /**
     *  Record reward pool info.
     *
     *  map PoolId => PoolInfo
     */
    get isV962(): boolean {
        return this.getTypeHash() === '097a8858df9534e9bdb57fc698960b51fbb8dab6c18e073aec315f3eab6450eb'
    }

    /**
     *  Record reward pool info.
     *
     *  map PoolId => PoolInfo
     */
    get asV962(): FarmingPoolInfosStorageV962 {
        assert(this.isV962)
        return this as any
    }

    /**
     *  Record reward pool info.
     *
     *  map PoolId => PoolInfo
     */
    get isV968(): boolean {
        return this.getTypeHash() === 'a137fc4fd5a2cd937b4616bd7396848c001dafdf98cd770cf89192fe2efbd1c8'
    }

    /**
     *  Record reward pool info.
     *
     *  map PoolId => PoolInfo
     */
    get asV968(): FarmingPoolInfosStorageV968 {
        assert(this.isV968)
        return this as any
    }
}

/**
 *  Record reward pool info.
 *
 *  map PoolId => PoolInfo
 */
export interface FarmingPoolInfosStorageV944 {
    get(key: number): Promise<(v944.Type_628 | undefined)>
    getAll(): Promise<v944.Type_628[]>
    getMany(keys: number[]): Promise<(v944.Type_628 | undefined)[]>
    getKeys(): Promise<number[]>
    getKeys(key: number): Promise<number[]>
    getKeysPaged(pageSize: number): AsyncIterable<number[]>
    getKeysPaged(pageSize: number, key: number): AsyncIterable<number[]>
    getPairs(): Promise<[k: number, v: v944.Type_628][]>
    getPairs(key: number): Promise<[k: number, v: v944.Type_628][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: number, v: v944.Type_628][]>
    getPairsPaged(pageSize: number, key: number): AsyncIterable<[k: number, v: v944.Type_628][]>
}

/**
 *  Record reward pool info.
 *
 *  map PoolId => PoolInfo
 */
export interface FarmingPoolInfosStorageV956 {
    get(key: number): Promise<(v956.Type_646 | undefined)>
    getAll(): Promise<v956.Type_646[]>
    getMany(keys: number[]): Promise<(v956.Type_646 | undefined)[]>
    getKeys(): Promise<number[]>
    getKeys(key: number): Promise<number[]>
    getKeysPaged(pageSize: number): AsyncIterable<number[]>
    getKeysPaged(pageSize: number, key: number): AsyncIterable<number[]>
    getPairs(): Promise<[k: number, v: v956.Type_646][]>
    getPairs(key: number): Promise<[k: number, v: v956.Type_646][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: number, v: v956.Type_646][]>
    getPairsPaged(pageSize: number, key: number): AsyncIterable<[k: number, v: v956.Type_646][]>
}

/**
 *  Record reward pool info.
 *
 *  map PoolId => PoolInfo
 */
export interface FarmingPoolInfosStorageV962 {
    get(key: number): Promise<(v962.Type_674 | undefined)>
    getAll(): Promise<v962.Type_674[]>
    getMany(keys: number[]): Promise<(v962.Type_674 | undefined)[]>
    getKeys(): Promise<number[]>
    getKeys(key: number): Promise<number[]>
    getKeysPaged(pageSize: number): AsyncIterable<number[]>
    getKeysPaged(pageSize: number, key: number): AsyncIterable<number[]>
    getPairs(): Promise<[k: number, v: v962.Type_674][]>
    getPairs(key: number): Promise<[k: number, v: v962.Type_674][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: number, v: v962.Type_674][]>
    getPairsPaged(pageSize: number, key: number): AsyncIterable<[k: number, v: v962.Type_674][]>
}

/**
 *  Record reward pool info.
 *
 *  map PoolId => PoolInfo
 */
export interface FarmingPoolInfosStorageV968 {
    get(key: number): Promise<(v968.Type_679 | undefined)>
    getAll(): Promise<v968.Type_679[]>
    getMany(keys: number[]): Promise<(v968.Type_679 | undefined)[]>
    getKeys(): Promise<number[]>
    getKeys(key: number): Promise<number[]>
    getKeysPaged(pageSize: number): AsyncIterable<number[]>
    getKeysPaged(pageSize: number, key: number): AsyncIterable<number[]>
    getPairs(): Promise<[k: number, v: v968.Type_679][]>
    getPairs(key: number): Promise<[k: number, v: v968.Type_679][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: number, v: v968.Type_679][]>
    getPairsPaged(pageSize: number, key: number): AsyncIterable<[k: number, v: v968.Type_679][]>
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
    get isV944(): boolean {
        return this.getTypeHash() === 'e6b679f38a737b0005b846ff0de5df64b60dfbabf651193ba3214be782b4db9d'
    }

    /**
     *  Record share amount, reward currency and withdrawn reward amount for
     *  specific `AccountId` under `PoolId`.
     *
     *  double_map (PoolId, AccountId) => ShareInfo
     */
    get asV944(): FarmingSharesAndWithdrawnRewardsStorageV944 {
        assert(this.isV944)
        return this as any
    }

    /**
     *  Record share amount, reward currency and withdrawn reward amount for
     *  specific `AccountId` under `PoolId`.
     *
     *  double_map (PoolId, AccountId) => ShareInfo
     */
    get isV956(): boolean {
        return this.getTypeHash() === 'f2ed87b7e53db13a0476b8236179a06c056517748d50f5cadf08aac5c3fec735'
    }

    /**
     *  Record share amount, reward currency and withdrawn reward amount for
     *  specific `AccountId` under `PoolId`.
     *
     *  double_map (PoolId, AccountId) => ShareInfo
     */
    get asV956(): FarmingSharesAndWithdrawnRewardsStorageV956 {
        assert(this.isV956)
        return this as any
    }

    /**
     *  Record share amount, reward currency and withdrawn reward amount for
     *  specific `AccountId` under `PoolId`.
     *
     *  double_map (PoolId, AccountId) => ShareInfo
     */
    get isV962(): boolean {
        return this.getTypeHash() === '1551d3fe381a42a8e29a3c90a6b6e211c534a7f3083a1e9b31b45273d8c21a2f'
    }

    /**
     *  Record share amount, reward currency and withdrawn reward amount for
     *  specific `AccountId` under `PoolId`.
     *
     *  double_map (PoolId, AccountId) => ShareInfo
     */
    get asV962(): FarmingSharesAndWithdrawnRewardsStorageV962 {
        assert(this.isV962)
        return this as any
    }
}

/**
 *  Record share amount, reward currency and withdrawn reward amount for
 *  specific `AccountId` under `PoolId`.
 *
 *  double_map (PoolId, AccountId) => ShareInfo
 */
export interface FarmingSharesAndWithdrawnRewardsStorageV944 {
    get(key1: number, key2: Uint8Array): Promise<(v944.ShareInfo | undefined)>
    getAll(): Promise<v944.ShareInfo[]>
    getMany(keys: [number, Uint8Array][]): Promise<(v944.ShareInfo | undefined)[]>
    getKeys(): Promise<[number, Uint8Array][]>
    getKeys(key1: number): Promise<[number, Uint8Array][]>
    getKeys(key1: number, key2: Uint8Array): Promise<[number, Uint8Array][]>
    getKeysPaged(pageSize: number): AsyncIterable<[number, Uint8Array][]>
    getKeysPaged(pageSize: number, key1: number): AsyncIterable<[number, Uint8Array][]>
    getKeysPaged(pageSize: number, key1: number, key2: Uint8Array): AsyncIterable<[number, Uint8Array][]>
    getPairs(): Promise<[k: [number, Uint8Array], v: v944.ShareInfo][]>
    getPairs(key1: number): Promise<[k: [number, Uint8Array], v: v944.ShareInfo][]>
    getPairs(key1: number, key2: Uint8Array): Promise<[k: [number, Uint8Array], v: v944.ShareInfo][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: [number, Uint8Array], v: v944.ShareInfo][]>
    getPairsPaged(pageSize: number, key1: number): AsyncIterable<[k: [number, Uint8Array], v: v944.ShareInfo][]>
    getPairsPaged(pageSize: number, key1: number, key2: Uint8Array): AsyncIterable<[k: [number, Uint8Array], v: v944.ShareInfo][]>
}

/**
 *  Record share amount, reward currency and withdrawn reward amount for
 *  specific `AccountId` under `PoolId`.
 *
 *  double_map (PoolId, AccountId) => ShareInfo
 */
export interface FarmingSharesAndWithdrawnRewardsStorageV956 {
    get(key1: number, key2: Uint8Array): Promise<(v956.ShareInfo | undefined)>
    getAll(): Promise<v956.ShareInfo[]>
    getMany(keys: [number, Uint8Array][]): Promise<(v956.ShareInfo | undefined)[]>
    getKeys(): Promise<[number, Uint8Array][]>
    getKeys(key1: number): Promise<[number, Uint8Array][]>
    getKeys(key1: number, key2: Uint8Array): Promise<[number, Uint8Array][]>
    getKeysPaged(pageSize: number): AsyncIterable<[number, Uint8Array][]>
    getKeysPaged(pageSize: number, key1: number): AsyncIterable<[number, Uint8Array][]>
    getKeysPaged(pageSize: number, key1: number, key2: Uint8Array): AsyncIterable<[number, Uint8Array][]>
    getPairs(): Promise<[k: [number, Uint8Array], v: v956.ShareInfo][]>
    getPairs(key1: number): Promise<[k: [number, Uint8Array], v: v956.ShareInfo][]>
    getPairs(key1: number, key2: Uint8Array): Promise<[k: [number, Uint8Array], v: v956.ShareInfo][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: [number, Uint8Array], v: v956.ShareInfo][]>
    getPairsPaged(pageSize: number, key1: number): AsyncIterable<[k: [number, Uint8Array], v: v956.ShareInfo][]>
    getPairsPaged(pageSize: number, key1: number, key2: Uint8Array): AsyncIterable<[k: [number, Uint8Array], v: v956.ShareInfo][]>
}

/**
 *  Record share amount, reward currency and withdrawn reward amount for
 *  specific `AccountId` under `PoolId`.
 *
 *  double_map (PoolId, AccountId) => ShareInfo
 */
export interface FarmingSharesAndWithdrawnRewardsStorageV962 {
    get(key1: number, key2: Uint8Array): Promise<(v962.ShareInfo | undefined)>
    getAll(): Promise<v962.ShareInfo[]>
    getMany(keys: [number, Uint8Array][]): Promise<(v962.ShareInfo | undefined)[]>
    getKeys(): Promise<[number, Uint8Array][]>
    getKeys(key1: number): Promise<[number, Uint8Array][]>
    getKeys(key1: number, key2: Uint8Array): Promise<[number, Uint8Array][]>
    getKeysPaged(pageSize: number): AsyncIterable<[number, Uint8Array][]>
    getKeysPaged(pageSize: number, key1: number): AsyncIterable<[number, Uint8Array][]>
    getKeysPaged(pageSize: number, key1: number, key2: Uint8Array): AsyncIterable<[number, Uint8Array][]>
    getPairs(): Promise<[k: [number, Uint8Array], v: v962.ShareInfo][]>
    getPairs(key1: number): Promise<[k: [number, Uint8Array], v: v962.ShareInfo][]>
    getPairs(key1: number, key2: Uint8Array): Promise<[k: [number, Uint8Array], v: v962.ShareInfo][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: [number, Uint8Array], v: v962.ShareInfo][]>
    getPairsPaged(pageSize: number, key1: number): AsyncIterable<[k: [number, Uint8Array], v: v962.ShareInfo][]>
    getPairsPaged(pageSize: number, key1: number, key2: Uint8Array): AsyncIterable<[k: [number, Uint8Array], v: v962.ShareInfo][]>
}