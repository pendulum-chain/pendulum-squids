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

export const account = {
    /**
     *  The full account information for a particular account ID.
     */
    v18: new StorageType(
        'System.Account',
        'Default',
        [v18.AccountId32],
        v18.AccountInfo
    ) as AccountV18,
}

/**
 *  The full account information for a particular account ID.
 */
export interface AccountV18 {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v18.AccountInfo
    get(
        block: Block,
        key: v18.AccountId32
    ): Promise<v18.AccountInfo | undefined>
    getMany(
        block: Block,
        keys: v18.AccountId32[]
    ): Promise<(v18.AccountInfo | undefined)[]>
    getKeys(block: Block): Promise<v18.AccountId32[]>
    getKeys(block: Block, key: v18.AccountId32): Promise<v18.AccountId32[]>
    getKeysPaged(
        pageSize: number,
        block: Block
    ): AsyncIterable<v18.AccountId32[]>
    getKeysPaged(
        pageSize: number,
        block: Block,
        key: v18.AccountId32
    ): AsyncIterable<v18.AccountId32[]>
    getPairs(
        block: Block
    ): Promise<[k: v18.AccountId32, v: v18.AccountInfo | undefined][]>
    getPairs(
        block: Block,
        key: v18.AccountId32
    ): Promise<[k: v18.AccountId32, v: v18.AccountInfo | undefined][]>
    getPairsPaged(
        pageSize: number,
        block: Block
    ): AsyncIterable<[k: v18.AccountId32, v: v18.AccountInfo | undefined][]>
    getPairsPaged(
        pageSize: number,
        block: Block,
        key: v18.AccountId32
    ): AsyncIterable<[k: v18.AccountId32, v: v18.AccountInfo | undefined][]>
}

export const blockHash = {
    /**
     *  Map of block numbers to block hashes.
     */
    v18: new StorageType(
        'System.BlockHash',
        'Default',
        [sts.number()],
        v18.H256
    ) as BlockHashV18,
}

/**
 *  Map of block numbers to block hashes.
 */
export interface BlockHashV18 {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v18.H256
    get(block: Block, key: number): Promise<v18.H256 | undefined>
    getMany(block: Block, keys: number[]): Promise<(v18.H256 | undefined)[]>
    getKeys(block: Block): Promise<number[]>
    getKeys(block: Block, key: number): Promise<number[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<number[]>
    getKeysPaged(
        pageSize: number,
        block: Block,
        key: number
    ): AsyncIterable<number[]>
    getPairs(block: Block): Promise<[k: number, v: v18.H256 | undefined][]>
    getPairs(
        block: Block,
        key: number
    ): Promise<[k: number, v: v18.H256 | undefined][]>
    getPairsPaged(
        pageSize: number,
        block: Block
    ): AsyncIterable<[k: number, v: v18.H256 | undefined][]>
    getPairsPaged(
        pageSize: number,
        block: Block,
        key: number
    ): AsyncIterable<[k: number, v: v18.H256 | undefined][]>
}
