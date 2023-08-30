import { EventDataRequest } from '@subsquid/substrate-processor/lib/interfaces/dataSelection'
import {
    SubstrateProcessor,
    BlockHandlerContext as _BlockHandlerContext,
    EventHandlerContext as _EventHandlerContext,
} from '@subsquid/substrate-processor'
import { Store } from '@subsquid/typeorm-store'

export type EventHandlerContext<T extends EventDataRequest = { event: true }> =
    _EventHandlerContext<Store, T>

export interface TokenBase {
    name: string
    blockchain: string
    symbol: string
    decimals: number
}

export interface ProcessorConfig {
    chainName: string
    prefix: number | string
    dataSource: Parameters<SubstrateProcessor<Store>['setDataSource']>[0]
    blockRange?: Parameters<SubstrateProcessor<Store>['setBlockRange']>[0]
}
