import { codec } from '@subsquid/ss58'
import { EventHandlerContext } from '../types'
import { DiaOracleModuleUpdatedPricesEvent } from '../types/foucoco/events'
import { config } from '../config'
import { getOrCreateOraclePrice } from '../entities/oraclePrice'

export async function handleUpdatedPrices(ctx: EventHandlerContext) {
    const _event = new DiaOracleModuleUpdatedPricesEvent(ctx, ctx.event)
    const event = _event.asV1

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
