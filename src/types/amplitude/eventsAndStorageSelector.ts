import { EventHandlerContext } from '../../processor'
import * as amplitudeEvents from './events'
import * as amplitudeStorage from './storage'
import { StorageType } from './support'
// Must keep up to date with the possible versions
// of events and storage
const amplitudeEventVersions: string[] = ['v1', 'v3', 'v7', 'v8', 'v10', 'v12']
const amplitudeStorageVersions: string[] = [
    'v1',
    'v3',
    'v7',
    'v8',
    'v10',
    'v12',
]

export function decodeAmplitudeEvent(
    moduleName: string,
    eventName: string,
    ctx: EventHandlerContext
) {
    const amplitudeEventsAny = amplitudeEvents as { [key: string]: any }
    const eventModule = amplitudeEventsAny[moduleName]

    for (const version of amplitudeEventVersions) {
        const eventVersion = eventModule?.[eventName]?.[version]
        if (eventVersion?.is(ctx.event)) {
            return eventVersion.decode(ctx.event)
        }
    }

    return null
}

export async function getAmplitudeStorage(
    moduleName: string,
    storageEntity: string,
    ctx: EventHandlerContext
): Promise<StorageType | null> {
    const amplitudeStorageAny = amplitudeStorage as { [key: string]: any }
    const storageModule = amplitudeStorageAny[moduleName]

    for (const version of amplitudeStorageVersions) {
        const versionedStorage = storageModule?.[storageEntity]?.[version]
        if (versionedStorage?.is(ctx.block)) {
            return versionedStorage
        }
    }

    return null
}
