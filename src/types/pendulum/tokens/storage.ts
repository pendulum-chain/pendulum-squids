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
import * as v3 from '../v3'

export const totalIssuance = {
    /**
     *  The total issuance of a token type.
     */
    v1: new StorageType(
        'Tokens.TotalIssuance',
        'Default',
        [v1.CurrencyId],
        sts.bigint()
    ) as TotalIssuanceV1,
    /**
     *  The total issuance of a token type.
     */
    v3: new StorageType(
        'Tokens.TotalIssuance',
        'Default',
        [v3.CurrencyId],
        sts.bigint()
    ) as TotalIssuanceV3,
}

/**
 *  The total issuance of a token type.
 */
export interface TotalIssuanceV1 {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): bigint
    get(block: Block, key: v1.CurrencyId): Promise<bigint | undefined>
    getMany(
        block: Block,
        keys: v1.CurrencyId[]
    ): Promise<(bigint | undefined)[]>
    getKeys(block: Block): Promise<v1.CurrencyId[]>
    getKeys(block: Block, key: v1.CurrencyId): Promise<v1.CurrencyId[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v1.CurrencyId[]>
    getKeysPaged(
        pageSize: number,
        block: Block,
        key: v1.CurrencyId
    ): AsyncIterable<v1.CurrencyId[]>
    getPairs(block: Block): Promise<[k: v1.CurrencyId, v: bigint | undefined][]>
    getPairs(
        block: Block,
        key: v1.CurrencyId
    ): Promise<[k: v1.CurrencyId, v: bigint | undefined][]>
    getPairsPaged(
        pageSize: number,
        block: Block
    ): AsyncIterable<[k: v1.CurrencyId, v: bigint | undefined][]>
    getPairsPaged(
        pageSize: number,
        block: Block,
        key: v1.CurrencyId
    ): AsyncIterable<[k: v1.CurrencyId, v: bigint | undefined][]>
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

export const accounts = {
    /**
     *  The balance of a token type under an account.
     *
     *  NOTE: If the total is ever zero, decrease account ref account.
     *
     *  NOTE: This is only used in the case that this module is used to store
     *  balances.
     */
    v1: new StorageType(
        'Tokens.Accounts',
        'Default',
        [v1.AccountId32, v1.CurrencyId],
        v1.Type_361
    ) as AccountsV1,
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
        v3.Type_418
    ) as AccountsV3,
}

/**
 *  The balance of a token type under an account.
 *
 *  NOTE: If the total is ever zero, decrease account ref account.
 *
 *  NOTE: This is only used in the case that this module is used to store
 *  balances.
 */
export interface AccountsV1 {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v1.Type_361
    get(
        block: Block,
        key1: v1.AccountId32,
        key2: v1.CurrencyId
    ): Promise<v1.Type_361 | undefined>
    getMany(
        block: Block,
        keys: [v1.AccountId32, v1.CurrencyId][]
    ): Promise<(v1.Type_361 | undefined)[]>
    getKeys(block: Block): Promise<[v1.AccountId32, v1.CurrencyId][]>
    getKeys(
        block: Block,
        key1: v1.AccountId32
    ): Promise<[v1.AccountId32, v1.CurrencyId][]>
    getKeys(
        block: Block,
        key1: v1.AccountId32,
        key2: v1.CurrencyId
    ): Promise<[v1.AccountId32, v1.CurrencyId][]>
    getKeysPaged(
        pageSize: number,
        block: Block
    ): AsyncIterable<[v1.AccountId32, v1.CurrencyId][]>
    getKeysPaged(
        pageSize: number,
        block: Block,
        key1: v1.AccountId32
    ): AsyncIterable<[v1.AccountId32, v1.CurrencyId][]>
    getKeysPaged(
        pageSize: number,
        block: Block,
        key1: v1.AccountId32,
        key2: v1.CurrencyId
    ): AsyncIterable<[v1.AccountId32, v1.CurrencyId][]>
    getPairs(
        block: Block
    ): Promise<
        [k: [v1.AccountId32, v1.CurrencyId], v: v1.Type_361 | undefined][]
    >
    getPairs(
        block: Block,
        key1: v1.AccountId32
    ): Promise<
        [k: [v1.AccountId32, v1.CurrencyId], v: v1.Type_361 | undefined][]
    >
    getPairs(
        block: Block,
        key1: v1.AccountId32,
        key2: v1.CurrencyId
    ): Promise<
        [k: [v1.AccountId32, v1.CurrencyId], v: v1.Type_361 | undefined][]
    >
    getPairsPaged(
        pageSize: number,
        block: Block
    ): AsyncIterable<
        [k: [v1.AccountId32, v1.CurrencyId], v: v1.Type_361 | undefined][]
    >
    getPairsPaged(
        pageSize: number,
        block: Block,
        key1: v1.AccountId32
    ): AsyncIterable<
        [k: [v1.AccountId32, v1.CurrencyId], v: v1.Type_361 | undefined][]
    >
    getPairsPaged(
        pageSize: number,
        block: Block,
        key1: v1.AccountId32,
        key2: v1.CurrencyId
    ): AsyncIterable<
        [k: [v1.AccountId32, v1.CurrencyId], v: v1.Type_361 | undefined][]
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
export interface AccountsV3 {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v3.Type_418
    get(
        block: Block,
        key1: v3.AccountId32,
        key2: v3.CurrencyId
    ): Promise<v3.Type_418 | undefined>
    getMany(
        block: Block,
        keys: [v3.AccountId32, v3.CurrencyId][]
    ): Promise<(v3.Type_418 | undefined)[]>
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
        [k: [v3.AccountId32, v3.CurrencyId], v: v3.Type_418 | undefined][]
    >
    getPairs(
        block: Block,
        key1: v3.AccountId32
    ): Promise<
        [k: [v3.AccountId32, v3.CurrencyId], v: v3.Type_418 | undefined][]
    >
    getPairs(
        block: Block,
        key1: v3.AccountId32,
        key2: v3.CurrencyId
    ): Promise<
        [k: [v3.AccountId32, v3.CurrencyId], v: v3.Type_418 | undefined][]
    >
    getPairsPaged(
        pageSize: number,
        block: Block
    ): AsyncIterable<
        [k: [v3.AccountId32, v3.CurrencyId], v: v3.Type_418 | undefined][]
    >
    getPairsPaged(
        pageSize: number,
        block: Block,
        key1: v3.AccountId32
    ): AsyncIterable<
        [k: [v3.AccountId32, v3.CurrencyId], v: v3.Type_418 | undefined][]
    >
    getPairsPaged(
        pageSize: number,
        block: Block,
        key1: v3.AccountId32,
        key2: v3.CurrencyId
    ): AsyncIterable<
        [k: [v3.AccountId32, v3.CurrencyId], v: v3.Type_418 | undefined][]
    >
}
