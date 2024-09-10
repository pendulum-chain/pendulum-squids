import {
    SubstrateBatchProcessor,
    FieldSelection,
} from '@subsquid/substrate-processor'

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
    archive?: Parameters<
        SubstrateBatchProcessor<FieldSelection>['setArchive']
    >[0]
    blockRange?: Parameters<
        SubstrateBatchProcessor<FieldSelection>['setBlockRange']
    >[0]
}
