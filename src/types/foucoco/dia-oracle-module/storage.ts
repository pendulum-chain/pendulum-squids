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

export const coinInfosMap = {
    /**
     *  Map of all the coins names to their respective info and price
     */
    v1: new StorageType(
        'DiaOracleModule.CoinInfosMap',
        'Default',
        [v1.Type_507],
        v1.CoinInfo
    ) as CoinInfosMapV1,
}

/**
 *  Map of all the coins names to their respective info and price
 */
export interface CoinInfosMapV1 {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v1.CoinInfo
    get(block: Block, key: v1.Type_507): Promise<v1.CoinInfo | undefined>
    getMany(
        block: Block,
        keys: v1.Type_507[]
    ): Promise<(v1.CoinInfo | undefined)[]>
    getKeys(block: Block): Promise<v1.Type_507[]>
    getKeys(block: Block, key: v1.Type_507): Promise<v1.Type_507[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v1.Type_507[]>
    getKeysPaged(
        pageSize: number,
        block: Block,
        key: v1.Type_507
    ): AsyncIterable<v1.Type_507[]>
    getPairs(
        block: Block
    ): Promise<[k: v1.Type_507, v: v1.CoinInfo | undefined][]>
    getPairs(
        block: Block,
        key: v1.Type_507
    ): Promise<[k: v1.Type_507, v: v1.CoinInfo | undefined][]>
    getPairsPaged(
        pageSize: number,
        block: Block
    ): AsyncIterable<[k: v1.Type_507, v: v1.CoinInfo | undefined][]>
    getPairsPaged(
        pageSize: number,
        block: Block,
        key: v1.Type_507
    ): AsyncIterable<[k: v1.Type_507, v: v1.CoinInfo | undefined][]>
}
