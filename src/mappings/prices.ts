import { EventHandlerContext } from '../processor'
import { foucocoEvents, amplitudeEvents, pendulumEvents } from '../types/events'
import { network } from '../config'
import { getOrCreateOraclePrice } from '../entities/oraclePrice'
import { hexToString } from '@polkadot/util'
export async function handleUpdatedPrices(ctx: EventHandlerContext) {
    let event
    if (network === 'foucoco') {
        event = foucocoEvents.diaOracleModule.updatedPrices.v1.decode(ctx.event)
    } else if (network === 'pendulum') {
        event = pendulumEvents.diaOracleModule.updatedPrices.v3.decode(
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

        const blockchain = hexToString(blockchainEncoded.toString())
        const symbol = hexToString(symbolEncoded.toString())

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
