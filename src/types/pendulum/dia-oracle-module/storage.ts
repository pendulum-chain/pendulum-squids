import {
    sts,
    Block,
    Bytes,
    Option,
    Result,
    StorageType,
    RuntimeCtx,
} from '../support'
import * as v3 from '../v3'

export const coinInfosMap = {
    /**
     *  Map of all the coins names to their respective info and price
     */
    v3: new StorageType(
        'DiaOracleModule.CoinInfosMap',
        'Default',
        [v3.Type_449],
        v3.CoinInfo
    ) as CoinInfosMapV3,
}

/**
 *  Map of all the coins names to their respective info and price
 */
export interface CoinInfosMapV3 {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v3.CoinInfo
    get(block: Block, key: v3.Type_449): Promise<v3.CoinInfo | undefined>
    getMany(
        block: Block,
        keys: v3.Type_449[]
    ): Promise<(v3.CoinInfo | undefined)[]>
    getKeys(block: Block): Promise<v3.Type_449[]>
    getKeys(block: Block, key: v3.Type_449): Promise<v3.Type_449[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v3.Type_449[]>
    getKeysPaged(
        pageSize: number,
        block: Block,
        key: v3.Type_449
    ): AsyncIterable<v3.Type_449[]>
    getPairs(
        block: Block
    ): Promise<[k: v3.Type_449, v: v3.CoinInfo | undefined][]>
    getPairs(
        block: Block,
        key: v3.Type_449
    ): Promise<[k: v3.Type_449, v: v3.CoinInfo | undefined][]>
    getPairsPaged(
        pageSize: number,
        block: Block
    ): AsyncIterable<[k: v3.Type_449, v: v3.CoinInfo | undefined][]>
    getPairsPaged(
        pageSize: number,
        block: Block,
        key: v3.Type_449
    ): AsyncIterable<[k: v3.Type_449, v: v3.CoinInfo | undefined][]>
}
