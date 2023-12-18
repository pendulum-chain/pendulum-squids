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
    v4: new StorageType(
        'Tokens.TotalIssuance',
        'Default',
        [v4.CurrencyId],
        sts.bigint()
    ) as TotalIssuanceV4,
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
export interface TotalIssuanceV4 {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): bigint
    get(block: Block, key: v4.CurrencyId): Promise<bigint | undefined>
    getMany(
        block: Block,
        keys: v4.CurrencyId[]
    ): Promise<(bigint | undefined)[]>
    getKeys(block: Block): Promise<v4.CurrencyId[]>
    getKeys(block: Block, key: v4.CurrencyId): Promise<v4.CurrencyId[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v4.CurrencyId[]>
    getKeysPaged(
        pageSize: number,
        block: Block,
        key: v4.CurrencyId
    ): AsyncIterable<v4.CurrencyId[]>
    getPairs(block: Block): Promise<[k: v4.CurrencyId, v: bigint | undefined][]>
    getPairs(
        block: Block,
        key: v4.CurrencyId
    ): Promise<[k: v4.CurrencyId, v: bigint | undefined][]>
    getPairsPaged(
        pageSize: number,
        block: Block
    ): AsyncIterable<[k: v4.CurrencyId, v: bigint | undefined][]>
    getPairsPaged(
        pageSize: number,
        block: Block,
        key: v4.CurrencyId
    ): AsyncIterable<[k: v4.CurrencyId, v: bigint | undefined][]>
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
        v1.Type_475
    ) as AccountsV1,
    /**
     *  The balance of a token type under an account.
     *
     *  NOTE: If the total is ever zero, decrease account ref account.
     *
     *  NOTE: This is only used in the case that this module is used to store
     *  balances.
     */
    v4: new StorageType(
        'Tokens.Accounts',
        'Default',
        [v4.AccountId32, v4.CurrencyId],
        v4.Type_503
    ) as AccountsV4,
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
    getDefault(block: Block): v1.Type_475
    get(
        block: Block,
        key1: v1.AccountId32,
        key2: v1.CurrencyId
    ): Promise<v1.Type_475 | undefined>
    getMany(
        block: Block,
        keys: [v1.AccountId32, v1.CurrencyId][]
    ): Promise<(v1.Type_475 | undefined)[]>
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
        [k: [v1.AccountId32, v1.CurrencyId], v: v1.Type_475 | undefined][]
    >
    getPairs(
        block: Block,
        key1: v1.AccountId32
    ): Promise<
        [k: [v1.AccountId32, v1.CurrencyId], v: v1.Type_475 | undefined][]
    >
    getPairs(
        block: Block,
        key1: v1.AccountId32,
        key2: v1.CurrencyId
    ): Promise<
        [k: [v1.AccountId32, v1.CurrencyId], v: v1.Type_475 | undefined][]
    >
    getPairsPaged(
        pageSize: number,
        block: Block
    ): AsyncIterable<
        [k: [v1.AccountId32, v1.CurrencyId], v: v1.Type_475 | undefined][]
    >
    getPairsPaged(
        pageSize: number,
        block: Block,
        key1: v1.AccountId32
    ): AsyncIterable<
        [k: [v1.AccountId32, v1.CurrencyId], v: v1.Type_475 | undefined][]
    >
    getPairsPaged(
        pageSize: number,
        block: Block,
        key1: v1.AccountId32,
        key2: v1.CurrencyId
    ): AsyncIterable<
        [k: [v1.AccountId32, v1.CurrencyId], v: v1.Type_475 | undefined][]
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
export interface AccountsV4 {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v4.Type_503
    get(
        block: Block,
        key1: v4.AccountId32,
        key2: v4.CurrencyId
    ): Promise<v4.Type_503 | undefined>
    getMany(
        block: Block,
        keys: [v4.AccountId32, v4.CurrencyId][]
    ): Promise<(v4.Type_503 | undefined)[]>
    getKeys(block: Block): Promise<[v4.AccountId32, v4.CurrencyId][]>
    getKeys(
        block: Block,
        key1: v4.AccountId32
    ): Promise<[v4.AccountId32, v4.CurrencyId][]>
    getKeys(
        block: Block,
        key1: v4.AccountId32,
        key2: v4.CurrencyId
    ): Promise<[v4.AccountId32, v4.CurrencyId][]>
    getKeysPaged(
        pageSize: number,
        block: Block
    ): AsyncIterable<[v4.AccountId32, v4.CurrencyId][]>
    getKeysPaged(
        pageSize: number,
        block: Block,
        key1: v4.AccountId32
    ): AsyncIterable<[v4.AccountId32, v4.CurrencyId][]>
    getKeysPaged(
        pageSize: number,
        block: Block,
        key1: v4.AccountId32,
        key2: v4.CurrencyId
    ): AsyncIterable<[v4.AccountId32, v4.CurrencyId][]>
    getPairs(
        block: Block
    ): Promise<
        [k: [v4.AccountId32, v4.CurrencyId], v: v4.Type_503 | undefined][]
    >
    getPairs(
        block: Block,
        key1: v4.AccountId32
    ): Promise<
        [k: [v4.AccountId32, v4.CurrencyId], v: v4.Type_503 | undefined][]
    >
    getPairs(
        block: Block,
        key1: v4.AccountId32,
        key2: v4.CurrencyId
    ): Promise<
        [k: [v4.AccountId32, v4.CurrencyId], v: v4.Type_503 | undefined][]
    >
    getPairsPaged(
        pageSize: number,
        block: Block
    ): AsyncIterable<
        [k: [v4.AccountId32, v4.CurrencyId], v: v4.Type_503 | undefined][]
    >
    getPairsPaged(
        pageSize: number,
        block: Block,
        key1: v4.AccountId32
    ): AsyncIterable<
        [k: [v4.AccountId32, v4.CurrencyId], v: v4.Type_503 | undefined][]
    >
    getPairsPaged(
        pageSize: number,
        block: Block,
        key1: v4.AccountId32,
        key2: v4.CurrencyId
    ): AsyncIterable<
        [k: [v4.AccountId32, v4.CurrencyId], v: v4.Type_503 | undefined][]
    >
}
