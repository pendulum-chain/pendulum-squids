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
import * as v15 from '../v15'

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
    v15: new StorageType(
        'System.Account',
        'Default',
        [v15.AccountId32],
        v15.AccountInfo
    ) as AccountV15,
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
export interface AccountV15 {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v15.AccountInfo
    get(
        block: Block,
        key: v15.AccountId32
    ): Promise<v15.AccountInfo | undefined>
    getMany(
        block: Block,
        keys: v15.AccountId32[]
    ): Promise<(v15.AccountInfo | undefined)[]>
    getKeys(block: Block): Promise<v15.AccountId32[]>
    getKeys(block: Block, key: v15.AccountId32): Promise<v15.AccountId32[]>
    getKeysPaged(
        pageSize: number,
        block: Block
    ): AsyncIterable<v15.AccountId32[]>
    getKeysPaged(
        pageSize: number,
        block: Block,
        key: v15.AccountId32
    ): AsyncIterable<v15.AccountId32[]>
    getPairs(
        block: Block
    ): Promise<[k: v15.AccountId32, v: v15.AccountInfo | undefined][]>
    getPairs(
        block: Block,
        key: v15.AccountId32
    ): Promise<[k: v15.AccountId32, v: v15.AccountInfo | undefined][]>
    getPairsPaged(
        pageSize: number,
        block: Block
    ): AsyncIterable<[k: v15.AccountId32, v: v15.AccountInfo | undefined][]>
    getPairsPaged(
        pageSize: number,
        block: Block,
        key: v15.AccountId32
    ): AsyncIterable<[k: v15.AccountId32, v: v15.AccountInfo | undefined][]>
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
