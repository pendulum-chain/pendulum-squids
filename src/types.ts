import {
    SubstrateBatchProcessor,
    FieldSelection,
} from '@subsquid/substrate-processor'
import { Store } from '@subsquid/typeorm-store'
import {
    getFoucocoStorage,
    decodeFoucocoEvent,
} from './types/foucoco/eventsAndStorageSelector'
import {
    getAmplitudeStorage,
    decodeAmplitudeEvent,
} from './types/amplitude/eventsAndStorageSelector'
import {
    getPendulumStorage,
    decodePendulumEvent,
} from './types/pendulum/eventsAndStorageSelector'
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

export async function getVersionedStorage(
    network: string,
    ctx: EventHandlerContext,
    moduleName: string,
    storageEntity: string
) {
    let versionedStorage
    if (network === 'foucoco') {
        versionedStorage = await getFoucocoStorage(
            moduleName,
            storageEntity,
            ctx
        )
    } else if (network === 'pendulum') {
        versionedStorage = await getPendulumStorage(
            moduleName,
            storageEntity,
            ctx
        )
    } else {
        versionedStorage = await getAmplitudeStorage(
            moduleName,
            storageEntity,
            ctx
        )
    }

    if (versionedStorage) {
        return versionedStorage
    } else {
        throw new Error('Storage for could not be found')
    }
}

export function decodeEvent(
    network: string,
    ctx: EventHandlerContext,
    moduleName: string,
    eventName: string
) {
    let event
    if (network === 'foucoco') {
        event = decodeFoucocoEvent(moduleName, eventName, ctx)
    } else if (network === 'pendulum') {
        event = decodePendulumEvent(moduleName, eventName, ctx)
    } else {
        event = decodeAmplitudeEvent(moduleName, eventName, ctx)
    }

    if (event) {
        return event
    } else {
        throw new Error('Coud not decode event')
    }
}
