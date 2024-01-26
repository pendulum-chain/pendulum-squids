import { EventHandlerContext } from '../../processor'
import * as pendulumEvents from './events'
import * as pendulumStorage from './storage'
import { StorageType } from './support'
// Must keep up to date with the possible versions
// of events and storage
const pendulumEventVersions: string[] = ['v1', 'v3', 'v9']
const pendulumStorageVersions: string[] = ['v1', 'v3', 'v9']

export function decodePendulumEvent(
    moduleName: string,
    eventName: string,
    ctx: EventHandlerContext
) {
    const pendulumEventsAny = pendulumEvents as { [key: string]: any }
    const eventModule = pendulumEventsAny[moduleName]

    for (const version of pendulumEventVersions) {
        const eventVersion = eventModule?.[eventName]?.[version]
        if (eventVersion?.is(ctx.event)) {
            return eventVersion.decode(ctx.event)
        }
    }

    return null
}

export async function getPendulumStorage(
    moduleName: string,
    storageEntity: string,
    ctx: EventHandlerContext
): Promise<StorageType | null> {
    const pendulumStorageAny = pendulumStorage as { [key: string]: any }
    const storageModule = pendulumStorageAny[moduleName]

    for (const version of pendulumStorageVersions) {
        const versionedStorage = storageModule?.[storageEntity]?.[version]
        if (versionedStorage?.is(ctx.block)) {
            return versionedStorage
        }
    }

    return null
}
