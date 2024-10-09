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

export const redeemRequests = {
    /**
     *  Users create redeem requests to receive stellar assets in return for their previously issued
     *  tokens. This mapping provides access from a unique hash redeemId to a Redeem struct.
     */
    v8: new StorageType(
        'Redeem.RedeemRequests',
        'Optional',
        [v8.H256],
        v8.RedeemRequest
    ) as RedeemRequestsV8,
    /**
     *  Users create redeem requests to receive stellar assets in return for their previously issued
     *  tokens. This mapping provides access from a unique hash redeemId to a Redeem struct.
     */
    v10: new StorageType(
        'Redeem.RedeemRequests',
        'Optional',
        [v10.H256],
        v10.RedeemRequest
    ) as RedeemRequestsV10,
    /**
     *  Users create redeem requests to receive stellar assets in return for their previously issued
     *  tokens. This mapping provides access from a unique hash redeemId to a Redeem struct.
     */
    v12: new StorageType(
        'Redeem.RedeemRequests',
        'Optional',
        [v12.H256],
        v12.RedeemRequest
    ) as RedeemRequestsV12,
}

/**
 *  Users create redeem requests to receive stellar assets in return for their previously issued
 *  tokens. This mapping provides access from a unique hash redeemId to a Redeem struct.
 */
export interface RedeemRequestsV8 {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v8.H256): Promise<v8.RedeemRequest | undefined>
    getMany(
        block: Block,
        keys: v8.H256[]
    ): Promise<(v8.RedeemRequest | undefined)[]>
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
    ): Promise<[k: v8.H256, v: v8.RedeemRequest | undefined][]>
    getPairs(
        block: Block,
        key: v8.H256
    ): Promise<[k: v8.H256, v: v8.RedeemRequest | undefined][]>
    getPairsPaged(
        pageSize: number,
        block: Block
    ): AsyncIterable<[k: v8.H256, v: v8.RedeemRequest | undefined][]>
    getPairsPaged(
        pageSize: number,
        block: Block,
        key: v8.H256
    ): AsyncIterable<[k: v8.H256, v: v8.RedeemRequest | undefined][]>
}

/**
 *  Users create redeem requests to receive stellar assets in return for their previously issued
 *  tokens. This mapping provides access from a unique hash redeemId to a Redeem struct.
 */
export interface RedeemRequestsV10 {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v10.H256): Promise<v10.RedeemRequest | undefined>
    getMany(
        block: Block,
        keys: v10.H256[]
    ): Promise<(v10.RedeemRequest | undefined)[]>
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
    ): Promise<[k: v10.H256, v: v10.RedeemRequest | undefined][]>
    getPairs(
        block: Block,
        key: v10.H256
    ): Promise<[k: v10.H256, v: v10.RedeemRequest | undefined][]>
    getPairsPaged(
        pageSize: number,
        block: Block
    ): AsyncIterable<[k: v10.H256, v: v10.RedeemRequest | undefined][]>
    getPairsPaged(
        pageSize: number,
        block: Block,
        key: v10.H256
    ): AsyncIterable<[k: v10.H256, v: v10.RedeemRequest | undefined][]>
}

/**
 *  Users create redeem requests to receive stellar assets in return for their previously issued
 *  tokens. This mapping provides access from a unique hash redeemId to a Redeem struct.
 */
export interface RedeemRequestsV12 {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v12.H256): Promise<v12.RedeemRequest | undefined>
    getMany(
        block: Block,
        keys: v12.H256[]
    ): Promise<(v12.RedeemRequest | undefined)[]>
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
    ): Promise<[k: v12.H256, v: v12.RedeemRequest | undefined][]>
    getPairs(
        block: Block,
        key: v12.H256
    ): Promise<[k: v12.H256, v: v12.RedeemRequest | undefined][]>
    getPairsPaged(
        pageSize: number,
        block: Block
    ): AsyncIterable<[k: v12.H256, v: v12.RedeemRequest | undefined][]>
    getPairsPaged(
        pageSize: number,
        block: Block,
        key: v12.H256
    ): AsyncIterable<[k: v12.H256, v: v12.RedeemRequest | undefined][]>
}
