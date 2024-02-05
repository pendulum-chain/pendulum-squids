import {
    SubstrateBatchProcessor,
    FieldSelection,
} from '@subsquid/substrate-processor'
import { Store } from '@subsquid/typeorm-store'
import { EventHandlerContext } from './processor'

export interface TokenBase {
    name: string
    blockchain: string
    symbol: string
    decimals: number
}

export interface ProcessorConfig {
    chainName: string
    prefix: number | string
    dataSource: Parameters<
        SubstrateBatchProcessor<FieldSelection>['setDataSource']
    >[0]
    blockRange?: Parameters<
        SubstrateBatchProcessor<FieldSelection>['setBlockRange']
    >[0]
}
