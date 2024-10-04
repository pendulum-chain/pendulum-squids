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

export const coinInfosMap = {
    /**
     *  Map of all the coins names to their respective info and price
     */
    v18: new StorageType(
        'DiaOracleModule.CoinInfosMap',
        'Default',
        [v18.Type_550],
        v18.CoinInfo
    ) as CoinInfosMapV18,
}

/**
 *  Map of all the coins names to their respective info and price
 */
export interface CoinInfosMapV18 {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v18.CoinInfo
    get(block: Block, key: v18.Type_550): Promise<v18.CoinInfo | undefined>
    getMany(
        block: Block,
        keys: v18.Type_550[]
    ): Promise<(v18.CoinInfo | undefined)[]>
    getKeys(block: Block): Promise<v18.Type_550[]>
    getKeys(block: Block, key: v18.Type_550): Promise<v18.Type_550[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v18.Type_550[]>
    getKeysPaged(
        pageSize: number,
        block: Block,
        key: v18.Type_550
    ): AsyncIterable<v18.Type_550[]>
    getPairs(
        block: Block
    ): Promise<[k: v18.Type_550, v: v18.CoinInfo | undefined][]>
    getPairs(
        block: Block,
        key: v18.Type_550
    ): Promise<[k: v18.Type_550, v: v18.CoinInfo | undefined][]>
    getPairsPaged(
        pageSize: number,
        block: Block
    ): AsyncIterable<[k: v18.Type_550, v: v18.CoinInfo | undefined][]>
    getPairsPaged(
        pageSize: number,
        block: Block,
        key: v18.Type_550
    ): AsyncIterable<[k: v18.Type_550, v: v18.CoinInfo | undefined][]>
}
