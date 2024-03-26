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
import * as v13 from '../v13'

export const account = {
    /**
     *  The full account information for a particular account ID.
     */
    v1: new StorageType(
        'System.Account',
        'Default',
        [v1.AccountId32],
        v1.AccountInfo
    ) as AccountV1,
    /**
     *  The full account information for a particular account ID.
     */
    v13: new StorageType(
        'System.Account',
        'Default',
        [v13.AccountId32],
        v13.AccountInfo
    ) as AccountV13,
}

/**
 *  The full account information for a particular account ID.
 */
export interface AccountV1 {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v1.AccountInfo
    get(block: Block, key: v1.AccountId32): Promise<v1.AccountInfo | undefined>
    getMany(
        block: Block,
        keys: v1.AccountId32[]
    ): Promise<(v1.AccountInfo | undefined)[]>
    getKeys(block: Block): Promise<v1.AccountId32[]>
    getKeys(block: Block, key: v1.AccountId32): Promise<v1.AccountId32[]>
    getKeysPaged(
        pageSize: number,
        block: Block
    ): AsyncIterable<v1.AccountId32[]>
    getKeysPaged(
        pageSize: number,
        block: Block,
        key: v1.AccountId32
    ): AsyncIterable<v1.AccountId32[]>
    getPairs(
        block: Block
    ): Promise<[k: v1.AccountId32, v: v1.AccountInfo | undefined][]>
    getPairs(
        block: Block,
        key: v1.AccountId32
    ): Promise<[k: v1.AccountId32, v: v1.AccountInfo | undefined][]>
    getPairsPaged(
        pageSize: number,
        block: Block
    ): AsyncIterable<[k: v1.AccountId32, v: v1.AccountInfo | undefined][]>
    getPairsPaged(
        pageSize: number,
        block: Block,
        key: v1.AccountId32
    ): AsyncIterable<[k: v1.AccountId32, v: v1.AccountInfo | undefined][]>
}

/**
 *  The full account information for a particular account ID.
 */
export interface AccountV13 {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v13.AccountInfo
    get(
        block: Block,
        key: v13.AccountId32
    ): Promise<v13.AccountInfo | undefined>
    getMany(
        block: Block,
        keys: v13.AccountId32[]
    ): Promise<(v13.AccountInfo | undefined)[]>
    getKeys(block: Block): Promise<v13.AccountId32[]>
    getKeys(block: Block, key: v13.AccountId32): Promise<v13.AccountId32[]>
    getKeysPaged(
        pageSize: number,
        block: Block
    ): AsyncIterable<v13.AccountId32[]>
    getKeysPaged(
        pageSize: number,
        block: Block,
        key: v13.AccountId32
    ): AsyncIterable<v13.AccountId32[]>
    getPairs(
        block: Block
    ): Promise<[k: v13.AccountId32, v: v13.AccountInfo | undefined][]>
    getPairs(
        block: Block,
        key: v13.AccountId32
    ): Promise<[k: v13.AccountId32, v: v13.AccountInfo | undefined][]>
    getPairsPaged(
        pageSize: number,
        block: Block
    ): AsyncIterable<[k: v13.AccountId32, v: v13.AccountInfo | undefined][]>
    getPairsPaged(
        pageSize: number,
        block: Block,
        key: v13.AccountId32
    ): AsyncIterable<[k: v13.AccountId32, v: v13.AccountInfo | undefined][]>
}

export const blockHash = {
    /**
     *  Map of block numbers to block hashes.
     */
    v1: new StorageType(
        'System.BlockHash',
        'Default',
        [sts.number()],
        v1.H256
    ) as BlockHashV1,
}

/**
 *  Map of block numbers to block hashes.
 */
export interface BlockHashV1 {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v1.H256
    get(block: Block, key: number): Promise<v1.H256 | undefined>
    getMany(block: Block, keys: number[]): Promise<(v1.H256 | undefined)[]>
    getKeys(block: Block): Promise<number[]>
    getKeys(block: Block, key: number): Promise<number[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<number[]>
    getKeysPaged(
        pageSize: number,
        block: Block,
        key: number
    ): AsyncIterable<number[]>
    getPairs(block: Block): Promise<[k: number, v: v1.H256 | undefined][]>
    getPairs(
        block: Block,
        key: number
    ): Promise<[k: number, v: v1.H256 | undefined][]>
    getPairsPaged(
        pageSize: number,
        block: Block
    ): AsyncIterable<[k: number, v: v1.H256 | undefined][]>
    getPairsPaged(
        pageSize: number,
        block: Block,
        key: number
    ): AsyncIterable<[k: number, v: v1.H256 | undefined][]>
}
