import { EventHandlerContext } from '../../processor'
import * as foucocoEvents from './events'
import * as foucocoStorage from './storage'
import { StorageType } from './support'
// Must keep up to date with the possible versions
// of events and storage
const foucocoEventVersions: string[] = ['v1', 'v4']
const foucocoStorageVersions: string[] = ['v1', 'v4']

export function decodeFoucocoEvent(
    moduleName: string,
    eventName: string,
    ctx: EventHandlerContext
) {
    const foucocoEventsAny = foucocoEvents as { [key: string]: any }
    const eventModule = foucocoEventsAny[moduleName]

    for (const version of foucocoEventVersions) {
        const eventVersion = eventModule?.[eventName]?.[version]
        if (eventVersion?.is(ctx.event)) {
            return eventVersion.decode(ctx.event)
        }
    }

    return null
}

export async function getFoucocoStorage(
    moduleName: string,
    storageEntity: string,
    ctx: EventHandlerContext
): Promise<StorageType | null> {
    const foucocoStorageAny = foucocoStorage as { [key: string]: any }
    const storageModule = foucocoStorageAny[moduleName]

    for (const version of foucocoStorageVersions) {
        const versionedStorage = storageModule?.[storageEntity]?.[version]
        if (versionedStorage?.is(ctx.block)) {
            return versionedStorage
        }
    }

    return null
}
