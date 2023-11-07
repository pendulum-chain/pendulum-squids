import { EventHandlerContext } from '../processor'
import { foucocoEvents, amplitudeEvents, pendulumEvents } from '../types/events'
import { network } from '../config'
import { getOrCreateOraclePrice } from '../entities/oraclePrice'

export async function handleUpdatedPrices(ctx: EventHandlerContext) {
    let event
    if (network === 'foucoco') {
        event = foucocoEvents.diaOracleModule.updatedPrices.v7.decode(ctx.event)
    } else if (network === 'pendulum') {
        event = pendulumEvents.diaOracleModule.updatedPrices.v7.decode(
            ctx.event
        )
    } else {
        event = amplitudeEvents.diaOracleModule.updatedPrices.v7.decode(
            ctx.event
        )
    }

    for (const data of event) {
        // Decode the event data
        const {
            [0]: [blockchainEncoded, symbolEncoded],
            [1]: coinInfo,
        } = data

        const blockchain = blockchainEncoded.toString()
        const symbol = symbolEncoded.toString()

        const oraclePrice = await getOrCreateOraclePrice(
            ctx,
            blockchain,
            symbol
        )
        if (!oraclePrice) continue

        oraclePrice.price = coinInfo.price.toString()
        oraclePrice.supply = coinInfo.supply.toString()
        oraclePrice.timestamp = coinInfo.lastUpdateTimestamp

        await ctx.store.save(oraclePrice)
    }
}
