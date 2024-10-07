import {
    sts,
    Block,
    Bytes,
    Option,
    Result,
    StorageType,
    RuntimeCtx,
} from '../support'
import * as v8 from '../v8'
import * as v10 from '../v10'
import * as v12 from '../v12'

export const issueRequests = {
    /**
     *  Users create issue requests to issue tokens. This mapping provides access
     *  from a unique hash `IssueId` to an `IssueRequest` struct.
     */
    v8: new StorageType(
        'Issue.IssueRequests',
        'Optional',
        [v8.H256],
        v8.IssueRequest
    ) as IssueRequestsV8,
    /**
     *  Users create issue requests to issue tokens. This mapping provides access
     *  from a unique hash `IssueId` to an `IssueRequest` struct.
     */
    v10: new StorageType(
        'Issue.IssueRequests',
        'Optional',
        [v10.H256],
        v10.IssueRequest
    ) as IssueRequestsV10,
    /**
     *  Users create issue requests to issue tokens. This mapping provides access
     *  from a unique hash `IssueId` to an `IssueRequest` struct.
     */
    v12: new StorageType(
        'Issue.IssueRequests',
        'Optional',
        [v12.H256],
        v12.IssueRequest
    ) as IssueRequestsV12,
}

/**
 *  Users create issue requests to issue tokens. This mapping provides access
 *  from a unique hash `IssueId` to an `IssueRequest` struct.
 */
export interface IssueRequestsV8 {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v8.H256): Promise<v8.IssueRequest | undefined>
    getMany(
        block: Block,
        keys: v8.H256[]
    ): Promise<(v8.IssueRequest | undefined)[]>
    getKeys(block: Block): Promise<v8.H256[]>
    getKeys(block: Block, key: v8.H256): Promise<v8.H256[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v8.H256[]>
    getKeysPaged(
        pageSize: number,
        block: Block,
        key: v8.H256
    ): AsyncIterable<v8.H256[]>
    getPairs(
        block: Block
    ): Promise<[k: v8.H256, v: v8.IssueRequest | undefined][]>
    getPairs(
        block: Block,
        key: v8.H256
    ): Promise<[k: v8.H256, v: v8.IssueRequest | undefined][]>
    getPairsPaged(
        pageSize: number,
        block: Block
    ): AsyncIterable<[k: v8.H256, v: v8.IssueRequest | undefined][]>
    getPairsPaged(
        pageSize: number,
        block: Block,
        key: v8.H256
    ): AsyncIterable<[k: v8.H256, v: v8.IssueRequest | undefined][]>
}

/**
 *  Users create issue requests to issue tokens. This mapping provides access
 *  from a unique hash `IssueId` to an `IssueRequest` struct.
 */
export interface IssueRequestsV10 {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v10.H256): Promise<v10.IssueRequest | undefined>
    getMany(
        block: Block,
        keys: v10.H256[]
    ): Promise<(v10.IssueRequest | undefined)[]>
    getKeys(block: Block): Promise<v10.H256[]>
    getKeys(block: Block, key: v10.H256): Promise<v10.H256[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v10.H256[]>
    getKeysPaged(
        pageSize: number,
        block: Block,
        key: v10.H256
    ): AsyncIterable<v10.H256[]>
    getPairs(
        block: Block
    ): Promise<[k: v10.H256, v: v10.IssueRequest | undefined][]>
    getPairs(
        block: Block,
        key: v10.H256
    ): Promise<[k: v10.H256, v: v10.IssueRequest | undefined][]>
    getPairsPaged(
        pageSize: number,
        block: Block
    ): AsyncIterable<[k: v10.H256, v: v10.IssueRequest | undefined][]>
    getPairsPaged(
        pageSize: number,
        block: Block,
        key: v10.H256
    ): AsyncIterable<[k: v10.H256, v: v10.IssueRequest | undefined][]>
}

/**
 *  Users create issue requests to issue tokens. This mapping provides access
 *  from a unique hash `IssueId` to an `IssueRequest` struct.
 */
export interface IssueRequestsV12 {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v12.H256): Promise<v12.IssueRequest | undefined>
    getMany(
        block: Block,
        keys: v12.H256[]
    ): Promise<(v12.IssueRequest | undefined)[]>
    getKeys(block: Block): Promise<v12.H256[]>
    getKeys(block: Block, key: v12.H256): Promise<v12.H256[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v12.H256[]>
    getKeysPaged(
        pageSize: number,
        block: Block,
        key: v12.H256
    ): AsyncIterable<v12.H256[]>
    getPairs(
        block: Block
    ): Promise<[k: v12.H256, v: v12.IssueRequest | undefined][]>
    getPairs(
        block: Block,
        key: v12.H256
    ): Promise<[k: v12.H256, v: v12.IssueRequest | undefined][]>
    getPairsPaged(
        pageSize: number,
        block: Block
    ): AsyncIterable<[k: v12.H256, v: v12.IssueRequest | undefined][]>
    getPairsPaged(
        pageSize: number,
        block: Block,
        key: v12.H256
    ): AsyncIterable<[k: v12.H256, v: v12.IssueRequest | undefined][]>
}
