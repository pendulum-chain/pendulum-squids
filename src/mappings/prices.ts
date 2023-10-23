import { EventHandlerContext } from '../types'
import { foucocoEvents, amplitudeEvents, pendulumEvents } from '../types/events'
import { network } from '../config'
import { getOrCreateOraclePrice } from '../entities/oraclePrice'

export async function handleUpdatedPrices(ctx: EventHandlerContext) {
    let event
    if (network === 'foucoco') {
        const _event = new foucocoEvents.DiaOracleModuleUpdatedPricesEvent(
            ctx,
            ctx.event
        )
        event = _event.asV1
    } else if (network === 'pendulum') {
        const _event = new pendulumEvents.DiaOracleModuleUpdatedPricesEvent(
            ctx,
            ctx.event
        )
        event = _event.asV3
    } else {
        const _event = new amplitudeEvents.DiaOracleModuleUpdatedPricesEvent(
            ctx,
            ctx.event
        )
        event = _event.asV7
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
