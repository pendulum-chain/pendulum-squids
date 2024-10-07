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

export const redeemRequests = {
    /**
     *  Users create redeem requests to receive stellar assets in return for their previously issued
     *  tokens. This mapping provides access from a unique hash redeemId to a Redeem struct.
     */
    v18: new StorageType(
        'Redeem.RedeemRequests',
        'Optional',
        [v18.H256],
        v18.RedeemRequest
    ) as RedeemRequestsV18,
}

/**
 *  Users create redeem requests to receive stellar assets in return for their previously issued
 *  tokens. This mapping provides access from a unique hash redeemId to a Redeem struct.
 */
export interface RedeemRequestsV18 {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v18.H256): Promise<v18.RedeemRequest | undefined>
    getMany(
        block: Block,
        keys: v18.H256[]
    ): Promise<(v18.RedeemRequest | undefined)[]>
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
    ): Promise<[k: v18.H256, v: v18.RedeemRequest | undefined][]>
    getPairs(
        block: Block,
        key: v18.H256
    ): Promise<[k: v18.H256, v: v18.RedeemRequest | undefined][]>
    getPairsPaged(
        pageSize: number,
        block: Block
    ): AsyncIterable<[k: v18.H256, v: v18.RedeemRequest | undefined][]>
    getPairsPaged(
        pageSize: number,
        block: Block,
        key: v18.H256
    ): AsyncIterable<[k: v18.H256, v: v18.RedeemRequest | undefined][]>
}
