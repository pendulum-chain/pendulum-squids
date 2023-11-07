import {
    sts,
    Block,
    Bytes,
    Option,
    Result,
    StorageType,
    RuntimeCtx,
} from '../support'
import * as v3 from '../v3'
import * as v8 from '../v8'
import * as v10 from '../v10'

export const totalIssuance = {
    /**
     *  The total issuance of a token type.
     */
    v3: new StorageType(
        'Tokens.TotalIssuance',
        'Default',
        [v3.CurrencyId],
        sts.bigint()
    ) as TotalIssuanceV3,
    /**
     *  The total issuance of a token type.
     */
    v8: new StorageType(
        'Tokens.TotalIssuance',
        'Default',
        [v8.CurrencyId],
        sts.bigint()
    ) as TotalIssuanceV8,
    /**
     *  The total issuance of a token type.
     */
    v10: new StorageType(
        'Tokens.TotalIssuance',
        'Default',
        [v10.CurrencyId],
        sts.bigint()
    ) as TotalIssuanceV10,
}

/**
 *  The total issuance of a token type.
 */
export interface TotalIssuanceV3 {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): bigint
    get(block: Block, key: v3.CurrencyId): Promise<bigint | undefined>
    getMany(
        block: Block,
        keys: v3.CurrencyId[]
    ): Promise<(bigint | undefined)[]>
    getKeys(block: Block): Promise<v3.CurrencyId[]>
    getKeys(block: Block, key: v3.CurrencyId): Promise<v3.CurrencyId[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v3.CurrencyId[]>
    getKeysPaged(
        pageSize: number,
        block: Block,
        key: v3.CurrencyId
    ): AsyncIterable<v3.CurrencyId[]>
    getPairs(block: Block): Promise<[k: v3.CurrencyId, v: bigint | undefined][]>
    getPairs(
        block: Block,
        key: v3.CurrencyId
    ): Promise<[k: v3.CurrencyId, v: bigint | undefined][]>
    getPairsPaged(
        pageSize: number,
        block: Block
    ): AsyncIterable<[k: v3.CurrencyId, v: bigint | undefined][]>
    getPairsPaged(
        pageSize: number,
        block: Block,
        key: v3.CurrencyId
    ): AsyncIterable<[k: v3.CurrencyId, v: bigint | undefined][]>
}

/**
 *  The total issuance of a token type.
 */
export interface TotalIssuanceV8 {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): bigint
    get(block: Block, key: v8.CurrencyId): Promise<bigint | undefined>
    getMany(
        block: Block,
        keys: v8.CurrencyId[]
    ): Promise<(bigint | undefined)[]>
    getKeys(block: Block): Promise<v8.CurrencyId[]>
    getKeys(block: Block, key: v8.CurrencyId): Promise<v8.CurrencyId[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v8.CurrencyId[]>
    getKeysPaged(
        pageSize: number,
        block: Block,
        key: v8.CurrencyId
    ): AsyncIterable<v8.CurrencyId[]>
    getPairs(block: Block): Promise<[k: v8.CurrencyId, v: bigint | undefined][]>
    getPairs(
        block: Block,
        key: v8.CurrencyId
    ): Promise<[k: v8.CurrencyId, v: bigint | undefined][]>
    getPairsPaged(
        pageSize: number,
        block: Block
    ): AsyncIterable<[k: v8.CurrencyId, v: bigint | undefined][]>
    getPairsPaged(
        pageSize: number,
        block: Block,
        key: v8.CurrencyId
    ): AsyncIterable<[k: v8.CurrencyId, v: bigint | undefined][]>
}

/**
 *  The total issuance of a token type.
 */
export interface TotalIssuanceV10 {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): bigint
    get(block: Block, key: v10.CurrencyId): Promise<bigint | undefined>
    getMany(
        block: Block,
        keys: v10.CurrencyId[]
    ): Promise<(bigint | undefined)[]>
    getKeys(block: Block): Promise<v10.CurrencyId[]>
    getKeys(block: Block, key: v10.CurrencyId): Promise<v10.CurrencyId[]>
    getKeysPaged(
        pageSize: number,
        block: Block
    ): AsyncIterable<v10.CurrencyId[]>
    getKeysPaged(
        pageSize: number,
        block: Block,
        key: v10.CurrencyId
    ): AsyncIterable<v10.CurrencyId[]>
    getPairs(
        block: Block
    ): Promise<[k: v10.CurrencyId, v: bigint | undefined][]>
    getPairs(
        block: Block,
        key: v10.CurrencyId
    ): Promise<[k: v10.CurrencyId, v: bigint | undefined][]>
    getPairsPaged(
        pageSize: number,
        block: Block
    ): AsyncIterable<[k: v10.CurrencyId, v: bigint | undefined][]>
    getPairsPaged(
        pageSize: number,
        block: Block,
        key: v10.CurrencyId
    ): AsyncIterable<[k: v10.CurrencyId, v: bigint | undefined][]>
}

export const accounts = {
    /**
     *  The balance of a token type under an account.
     *
     *  NOTE: If the total is ever zero, decrease account ref account.
     *
     *  NOTE: This is only used in the case that this module is used to store
     *  balances.
     */
    v3: new StorageType(
        'Tokens.Accounts',
        'Default',
        [v3.AccountId32, v3.CurrencyId],
        v3.Type_360
    ) as AccountsV3,
    /**
     *  The balance of a token type under an account.
     *
     *  NOTE: If the total is ever zero, decrease account ref account.
     *
     *  NOTE: This is only used in the case that this module is used to store
     *  balances.
     */
    v8: new StorageType(
        'Tokens.Accounts',
        'Default',
        [v8.AccountId32, v8.CurrencyId],
        v8.Type_452
    ) as AccountsV8,
    /**
     *  The balance of a token type under an account.
     *
     *  NOTE: If the total is ever zero, decrease account ref account.
     *
     *  NOTE: This is only used in the case that this module is used to store
     *  balances.
     */
    v10: new StorageType(
        'Tokens.Accounts',
        'Default',
        [v10.AccountId32, v10.CurrencyId],
        v10.Type_480
    ) as AccountsV10,
}

/**
 *  The balance of a token type under an account.
 *
 *  NOTE: If the total is ever zero, decrease account ref account.
 *
 *  NOTE: This is only used in the case that this module is used to store
 *  balances.
 */
export interface AccountsV3 {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v3.Type_360
    get(
        block: Block,
        key1: v3.AccountId32,
        key2: v3.CurrencyId
    ): Promise<v3.Type_360 | undefined>
    getMany(
        block: Block,
        keys: [v3.AccountId32, v3.CurrencyId][]
    ): Promise<(v3.Type_360 | undefined)[]>
    getKeys(block: Block): Promise<[v3.AccountId32, v3.CurrencyId][]>
    getKeys(
        block: Block,
        key1: v3.AccountId32
    ): Promise<[v3.AccountId32, v3.CurrencyId][]>
    getKeys(
        block: Block,
        key1: v3.AccountId32,
        key2: v3.CurrencyId
    ): Promise<[v3.AccountId32, v3.CurrencyId][]>
    getKeysPaged(
        pageSize: number,
        block: Block
    ): AsyncIterable<[v3.AccountId32, v3.CurrencyId][]>
    getKeysPaged(
        pageSize: number,
        block: Block,
        key1: v3.AccountId32
    ): AsyncIterable<[v3.AccountId32, v3.CurrencyId][]>
    getKeysPaged(
        pageSize: number,
        block: Block,
        key1: v3.AccountId32,
        key2: v3.CurrencyId
    ): AsyncIterable<[v3.AccountId32, v3.CurrencyId][]>
    getPairs(
        block: Block
    ): Promise<
        [k: [v3.AccountId32, v3.CurrencyId], v: v3.Type_360 | undefined][]
    >
    getPairs(
        block: Block,
        key1: v3.AccountId32
    ): Promise<
        [k: [v3.AccountId32, v3.CurrencyId], v: v3.Type_360 | undefined][]
    >
    getPairs(
        block: Block,
        key1: v3.AccountId32,
        key2: v3.CurrencyId
    ): Promise<
        [k: [v3.AccountId32, v3.CurrencyId], v: v3.Type_360 | undefined][]
    >
    getPairsPaged(
        pageSize: number,
        block: Block
    ): AsyncIterable<
        [k: [v3.AccountId32, v3.CurrencyId], v: v3.Type_360 | undefined][]
    >
    getPairsPaged(
        pageSize: number,
        block: Block,
        key1: v3.AccountId32
    ): AsyncIterable<
        [k: [v3.AccountId32, v3.CurrencyId], v: v3.Type_360 | undefined][]
    >
    getPairsPaged(
        pageSize: number,
        block: Block,
        key1: v3.AccountId32,
        key2: v3.CurrencyId
    ): AsyncIterable<
        [k: [v3.AccountId32, v3.CurrencyId], v: v3.Type_360 | undefined][]
    >
}

/**
 *  The balance of a token type under an account.
 *
 *  NOTE: If the total is ever zero, decrease account ref account.
 *
 *  NOTE: This is only used in the case that this module is used to store
 *  balances.
 */
export interface AccountsV8 {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v8.Type_452
    get(
        block: Block,
        key1: v8.AccountId32,
        key2: v8.CurrencyId
    ): Promise<v8.Type_452 | undefined>
    getMany(
        block: Block,
        keys: [v8.AccountId32, v8.CurrencyId][]
    ): Promise<(v8.Type_452 | undefined)[]>
    getKeys(block: Block): Promise<[v8.AccountId32, v8.CurrencyId][]>
    getKeys(
        block: Block,
        key1: v8.AccountId32
    ): Promise<[v8.AccountId32, v8.CurrencyId][]>
    getKeys(
        block: Block,
        key1: v8.AccountId32,
        key2: v8.CurrencyId
    ): Promise<[v8.AccountId32, v8.CurrencyId][]>
    getKeysPaged(
        pageSize: number,
        block: Block
    ): AsyncIterable<[v8.AccountId32, v8.CurrencyId][]>
    getKeysPaged(
        pageSize: number,
        block: Block,
        key1: v8.AccountId32
    ): AsyncIterable<[v8.AccountId32, v8.CurrencyId][]>
    getKeysPaged(
        pageSize: number,
        block: Block,
        key1: v8.AccountId32,
        key2: v8.CurrencyId
    ): AsyncIterable<[v8.AccountId32, v8.CurrencyId][]>
    getPairs(
        block: Block
    ): Promise<
        [k: [v8.AccountId32, v8.CurrencyId], v: v8.Type_452 | undefined][]
    >
    getPairs(
        block: Block,
        key1: v8.AccountId32
    ): Promise<
        [k: [v8.AccountId32, v8.CurrencyId], v: v8.Type_452 | undefined][]
    >
    getPairs(
        block: Block,
        key1: v8.AccountId32,
        key2: v8.CurrencyId
    ): Promise<
        [k: [v8.AccountId32, v8.CurrencyId], v: v8.Type_452 | undefined][]
    >
    getPairsPaged(
        pageSize: number,
        block: Block
    ): AsyncIterable<
        [k: [v8.AccountId32, v8.CurrencyId], v: v8.Type_452 | undefined][]
    >
    getPairsPaged(
        pageSize: number,
        block: Block,
        key1: v8.AccountId32
    ): AsyncIterable<
        [k: [v8.AccountId32, v8.CurrencyId], v: v8.Type_452 | undefined][]
    >
    getPairsPaged(
        pageSize: number,
        block: Block,
        key1: v8.AccountId32,
        key2: v8.CurrencyId
    ): AsyncIterable<
        [k: [v8.AccountId32, v8.CurrencyId], v: v8.Type_452 | undefined][]
    >
}

/**
 *  The balance of a token type under an account.
 *
 *  NOTE: If the total is ever zero, decrease account ref account.
 *
 *  NOTE: This is only used in the case that this module is used to store
 *  balances.
 */
export interface AccountsV10 {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v10.Type_480
    get(
        block: Block,
        key1: v10.AccountId32,
        key2: v10.CurrencyId
    ): Promise<v10.Type_480 | undefined>
    getMany(
        block: Block,
        keys: [v10.AccountId32, v10.CurrencyId][]
    ): Promise<(v10.Type_480 | undefined)[]>
    getKeys(block: Block): Promise<[v10.AccountId32, v10.CurrencyId][]>
    getKeys(
        block: Block,
        key1: v10.AccountId32
    ): Promise<[v10.AccountId32, v10.CurrencyId][]>
    getKeys(
        block: Block,
        key1: v10.AccountId32,
        key2: v10.CurrencyId
    ): Promise<[v10.AccountId32, v10.CurrencyId][]>
    getKeysPaged(
        pageSize: number,
        block: Block
    ): AsyncIterable<[v10.AccountId32, v10.CurrencyId][]>
    getKeysPaged(
        pageSize: number,
        block: Block,
        key1: v10.AccountId32
    ): AsyncIterable<[v10.AccountId32, v10.CurrencyId][]>
    getKeysPaged(
        pageSize: number,
        block: Block,
        key1: v10.AccountId32,
        key2: v10.CurrencyId
    ): AsyncIterable<[v10.AccountId32, v10.CurrencyId][]>
    getPairs(
        block: Block
    ): Promise<
        [k: [v10.AccountId32, v10.CurrencyId], v: v10.Type_480 | undefined][]
    >
    getPairs(
        block: Block,
        key1: v10.AccountId32
    ): Promise<
        [k: [v10.AccountId32, v10.CurrencyId], v: v10.Type_480 | undefined][]
    >
    getPairs(
        block: Block,
        key1: v10.AccountId32,
        key2: v10.CurrencyId
    ): Promise<
        [k: [v10.AccountId32, v10.CurrencyId], v: v10.Type_480 | undefined][]
    >
    getPairsPaged(
        pageSize: number,
        block: Block
    ): AsyncIterable<
        [k: [v10.AccountId32, v10.CurrencyId], v: v10.Type_480 | undefined][]
    >
    getPairsPaged(
        pageSize: number,
        block: Block,
        key1: v10.AccountId32
    ): AsyncIterable<
        [k: [v10.AccountId32, v10.CurrencyId], v: v10.Type_480 | undefined][]
    >
    getPairsPaged(
        pageSize: number,
        block: Block,
        key1: v10.AccountId32,
        key2: v10.CurrencyId
    ): AsyncIterable<
        [k: [v10.AccountId32, v10.CurrencyId], v: v10.Type_480 | undefined][]
    >
}
