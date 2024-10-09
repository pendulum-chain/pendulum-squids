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

export const redeemRequests = {
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
