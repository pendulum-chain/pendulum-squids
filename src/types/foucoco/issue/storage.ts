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

export const issueRequests = {
    /**
     *  Users create issue requests to issue tokens. This mapping provides access
     *  from a unique hash `IssueId` to an `IssueRequest` struct.
     */
    v18: new StorageType(
        'Issue.IssueRequests',
        'Optional',
        [v18.H256],
        v18.IssueRequest
    ) as IssueRequestsV18,
}

/**
 *  Users create issue requests to issue tokens. This mapping provides access
 *  from a unique hash `IssueId` to an `IssueRequest` struct.
 */
export interface IssueRequestsV18 {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v18.H256): Promise<v18.IssueRequest | undefined>
    getMany(
        block: Block,
        keys: v18.H256[]
    ): Promise<(v18.IssueRequest | undefined)[]>
    getKeys(block: Block): Promise<v18.H256[]>
    getKeys(block: Block, key: v18.H256): Promise<v18.H256[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v18.H256[]>
    getKeysPaged(
        pageSize: number,
        block: Block,
        key: v18.H256
    ): AsyncIterable<v18.H256[]>
    getPairs(
        block: Block
    ): Promise<[k: v18.H256, v: v18.IssueRequest | undefined][]>
    getPairs(
        block: Block,
        key: v18.H256
    ): Promise<[k: v18.H256, v: v18.IssueRequest | undefined][]>
    getPairsPaged(
        pageSize: number,
        block: Block
    ): AsyncIterable<[k: v18.H256, v: v18.IssueRequest | undefined][]>
    getPairsPaged(
        pageSize: number,
        block: Block,
        key: v18.H256
    ): AsyncIterable<[k: v18.H256, v: v18.IssueRequest | undefined][]>
}
