import {
    sts,
    Block,
    Bytes,
    Option,
    Result,
    StorageType,
    RuntimeCtx,
} from '../support'
import * as v12 from '../v12'

export const issueRequests = {
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
