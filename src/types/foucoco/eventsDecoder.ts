import { EventHandlerContext } from '../../processor'
import * as foucocoEvents from './events'

const foucocoEventVersions: string[] = ['v1', 'v4']

export async function decodeFoucocoEvent(
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
