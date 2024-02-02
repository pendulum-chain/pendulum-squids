import { EventHandlerContext } from './processor'
import * as foucocoEvents from './types/foucoco/events'
import * as pendulumEvents from './types/pendulum/events'
import * as amplitudeEvents from './types/amplitude/events'

import * as foucocoStorage from './types/foucoco/storage'
import * as pendulumStorage from './types/pendulum/storage'
import * as amplitudeStorage from './types/amplitude/storage'

import { StorageType as StorageTypeFoucoco } from './types/foucoco/support'
import { StorageType as StorageTypePendulum } from './types/pendulum/support'
import { StorageType as StorageTypeAmplitude } from './types/amplitude/support'
// Must keep up to date with the possible versions
// of events and storage
const foucocoEventVersions: string[] = ['v1', 'v4']
const foucocoStorageVersions: string[] = ['v1', 'v4']
const pendulumEventVersions: string[] = ['v1', 'v3', 'v9', 'v10']
const pendulumStorageVersions: string[] = ['v1', 'v3', 'v9', 'v10']
const amplitudeEventVersions: string[] = ['v1', 'v3', 'v7', 'v8', 'v10', 'v12']
const amplitudeStorageVersions: string[] = [
    'v1',
    'v3',
    'v7',
    'v8',
    'v10',
    'v12',
]

export function decodeEvent(
    network: string,
    ctx: EventHandlerContext,
    moduleName: string,
    eventName: string
) {
    let networkEventsAny
    let eventVersions: string[]

    if (network === 'foucoco') {
        networkEventsAny = foucocoEvents as { [key: string]: any }
        eventVersions = foucocoEventVersions
    } else if (network === 'pendulum') {
        networkEventsAny = pendulumEvents as { [key: string]: any }
        eventVersions = pendulumEventVersions
    } else {
        networkEventsAny = amplitudeEvents as { [key: string]: any }
        eventVersions = amplitudeEventVersions
    }

    const eventModule = networkEventsAny[moduleName]

    for (const version of eventVersions) {
        const eventVersion = eventModule?.[eventName]?.[version]
        if (eventVersion?.is(ctx.event)) {
            return eventVersion.decode(ctx.event)
        }
    }

    throw new Error('Coud not decode event')
}

export async function getVersionedStorage(
    network: string,
    ctx: EventHandlerContext,
    moduleName: string,
    storageEntity: string
): Promise<StorageTypeFoucoco | StorageTypePendulum | StorageTypeAmplitude> {
    let networkStorageAny
    let storageVersions: string[]
    if (network === 'foucoco') {
        networkStorageAny = foucocoStorage as { [key: string]: any }
        storageVersions = foucocoStorageVersions
    } else if (network === 'pendulum') {
        networkStorageAny = pendulumStorage as { [key: string]: any }
        storageVersions = pendulumStorageVersions
    } else {
        networkStorageAny = amplitudeStorage as { [key: string]: any }
        storageVersions = amplitudeStorageVersions
    }

    const storageModule = networkStorageAny[moduleName]

    for (const version of storageVersions) {
        const versionedStorage = storageModule?.[storageEntity]?.[version]
        if (versionedStorage?.is(ctx.block)) {
            return versionedStorage
        }
    }

    throw new Error(`Storage for ${network} could not be found`)
}
