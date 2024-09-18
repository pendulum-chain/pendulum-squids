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

export const totalIssuance = {
    /**
     *  The total issuance of a token type.
     */
    v18: new StorageType(
        'Tokens.TotalIssuance',
        'Default',
        [v18.CurrencyId],
        sts.bigint()
    ) as TotalIssuanceV18,
}

/**
 *  The total issuance of a token type.
 */
export interface TotalIssuanceV18 {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): bigint
    get(block: Block, key: v18.CurrencyId): Promise<bigint | undefined>
    getMany(
        block: Block,
        keys: v18.CurrencyId[]
    ): Promise<(bigint | undefined)[]>
    getKeys(block: Block): Promise<v18.CurrencyId[]>
    getKeys(block: Block, key: v18.CurrencyId): Promise<v18.CurrencyId[]>
    getKeysPaged(
        pageSize: number,
        block: Block
    ): AsyncIterable<v18.CurrencyId[]>
    getKeysPaged(
        pageSize: number,
        block: Block,
        key: v18.CurrencyId
    ): AsyncIterable<v18.CurrencyId[]>
    getPairs(
        block: Block
    ): Promise<[k: v18.CurrencyId, v: bigint | undefined][]>
    getPairs(
        block: Block,
        key: v18.CurrencyId
    ): Promise<[k: v18.CurrencyId, v: bigint | undefined][]>
    getPairsPaged(
        pageSize: number,
        block: Block
    ): AsyncIterable<[k: v18.CurrencyId, v: bigint | undefined][]>
    getPairsPaged(
        pageSize: number,
        block: Block,
        key: v18.CurrencyId
    ): AsyncIterable<[k: v18.CurrencyId, v: bigint | undefined][]>
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
    v18: new StorageType(
        'Tokens.Accounts',
        'Default',
        [v18.AccountId32, v18.CurrencyId],
        v18.Type_520
    ) as AccountsV18,
}

/**
 *  The balance of a token type under an account.
 *
 *  NOTE: If the total is ever zero, decrease account ref account.
 *
 *  NOTE: This is only used in the case that this module is used to store
 *  balances.
 */
export interface AccountsV18 {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v18.Type_520
    get(
        block: Block,
        key1: v18.AccountId32,
        key2: v18.CurrencyId
    ): Promise<v18.Type_520 | undefined>
    getMany(
        block: Block,
        keys: [v18.AccountId32, v18.CurrencyId][]
    ): Promise<(v18.Type_520 | undefined)[]>
    getKeys(block: Block): Promise<[v18.AccountId32, v18.CurrencyId][]>
    getKeys(
        block: Block,
        key1: v18.AccountId32
    ): Promise<[v18.AccountId32, v18.CurrencyId][]>
    getKeys(
        block: Block,
        key1: v18.AccountId32,
        key2: v18.CurrencyId
    ): Promise<[v18.AccountId32, v18.CurrencyId][]>
    getKeysPaged(
        pageSize: number,
        block: Block
    ): AsyncIterable<[v18.AccountId32, v18.CurrencyId][]>
    getKeysPaged(
        pageSize: number,
        block: Block,
        key1: v18.AccountId32
    ): AsyncIterable<[v18.AccountId32, v18.CurrencyId][]>
    getKeysPaged(
        pageSize: number,
        block: Block,
        key1: v18.AccountId32,
        key2: v18.CurrencyId
    ): AsyncIterable<[v18.AccountId32, v18.CurrencyId][]>
    getPairs(
        block: Block
    ): Promise<
        [k: [v18.AccountId32, v18.CurrencyId], v: v18.Type_520 | undefined][]
    >
    getPairs(
        block: Block,
        key1: v18.AccountId32
    ): Promise<
        [k: [v18.AccountId32, v18.CurrencyId], v: v18.Type_520 | undefined][]
    >
    getPairs(
        block: Block,
        key1: v18.AccountId32,
        key2: v18.CurrencyId
    ): Promise<
        [k: [v18.AccountId32, v18.CurrencyId], v: v18.Type_520 | undefined][]
    >
    getPairsPaged(
        pageSize: number,
        block: Block
    ): AsyncIterable<
        [k: [v18.AccountId32, v18.CurrencyId], v: v18.Type_520 | undefined][]
    >
    getPairsPaged(
        pageSize: number,
        block: Block,
        key1: v18.AccountId32
    ): AsyncIterable<
        [k: [v18.AccountId32, v18.CurrencyId], v: v18.Type_520 | undefined][]
    >
    getPairsPaged(
        pageSize: number,
        block: Block,
        key1: v18.AccountId32,
        key2: v18.CurrencyId
    ): AsyncIterable<
        [k: [v18.AccountId32, v18.CurrencyId], v: v18.Type_520 | undefined][]
    >
}
