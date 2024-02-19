import { EventHandlerContext } from '../processor'
import * as foucocoEvents from './foucoco/events'
import * as pendulumEvents from './pendulum/events'
import * as amplitudeEvents from './amplitude/events'

import * as foucocoStorage from './foucoco/storage'
import * as pendulumStorage from './pendulum/storage'
import * as amplitudeStorage from './amplitude/storage'

import { StorageType as StorageTypeFoucoco } from './foucoco/support'
import { StorageType as StorageTypePendulum } from './pendulum/support'
import { StorageType as StorageTypeAmplitude } from './amplitude/support'
// Must keep up to date with the possible versions
// of events and storage
const foucocoVersions: string[] = ['v1', 'v4']
const pendulumVersions: string[] = ['v1', 'v3', 'v9', 'v10']
const amplitudeVersions: string[] = ['v1', 'v3', 'v7', 'v8', 'v10', 'v12']

export function decodeEvent(
    network: string,
    ctx: EventHandlerContext,
    moduleName: string,
    eventName: string
) {
    let networkEventsAny
    let eventVersions: string[]

    if (network === 'foucoco' || network === 'local') {
        networkEventsAny = foucocoEvents as { [key: string]: any }
        eventVersions = foucocoVersions
    } else if (network === 'pendulum') {
        networkEventsAny = pendulumEvents as { [key: string]: any }
        eventVersions = pendulumVersions
    } else if (network === 'amplitude') {
        networkEventsAny = amplitudeEvents as { [key: string]: any }
        eventVersions = amplitudeVersions
    } else {
        throw new Error(
            `Unable to decode events for network ${network}. Network is not supported.`
        )
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
    if (network === 'foucoco' || network === 'local') {
        networkStorageAny = foucocoStorage as { [key: string]: any }
        storageVersions = foucocoVersions
    } else if (network === 'pendulum') {
        networkStorageAny = pendulumStorage as { [key: string]: any }
        storageVersions = pendulumVersions
    } else if (network === 'amplitude') {
        networkStorageAny = amplitudeStorage as { [key: string]: any }
        storageVersions = amplitudeVersions
    } else {
        throw new Error(
            `Unable to find storage for network ${network}. Network is not supported.`
        )
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
