import {
    sts,
    Block,
    Bytes,
    Option,
    Result,
    StorageType,
    RuntimeCtx,
} from '../support'
import * as v7 from '../v7'

export const coinInfosMap = {
    /**
     *  Map of all the coins names to their respective info and price
     */
    v7: new StorageType(
        'DiaOracleModule.CoinInfosMap',
        'Default',
        [v7.Type_445],
        v7.CoinInfo
    ) as CoinInfosMapV7,
}

/**
 *  Map of all the coins names to their respective info and price
 */
export interface CoinInfosMapV7 {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v7.CoinInfo
    get(block: Block, key: v7.Type_445): Promise<v7.CoinInfo | undefined>
    getMany(
        block: Block,
        keys: v7.Type_445[]
    ): Promise<(v7.CoinInfo | undefined)[]>
    getKeys(block: Block): Promise<v7.Type_445[]>
    getKeys(block: Block, key: v7.Type_445): Promise<v7.Type_445[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v7.Type_445[]>
    getKeysPaged(
        pageSize: number,
        block: Block,
        key: v7.Type_445
    ): AsyncIterable<v7.Type_445[]>
    getPairs(
        block: Block
    ): Promise<[k: v7.Type_445, v: v7.CoinInfo | undefined][]>
    getPairs(
        block: Block,
        key: v7.Type_445
    ): Promise<[k: v7.Type_445, v: v7.CoinInfo | undefined][]>
    getPairsPaged(
        pageSize: number,
        block: Block
    ): AsyncIterable<[k: v7.Type_445, v: v7.CoinInfo | undefined][]>
    getPairsPaged(
        pageSize: number,
        block: Block,
        key: v7.Type_445
    ): AsyncIterable<[k: v7.Type_445, v: v7.CoinInfo | undefined][]>
}
