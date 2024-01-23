import { EventHandlerContext } from '../processor'
import { network } from '../config'
import { getOrCreateOraclePrice } from '../entities/oraclePrice'
import { hexToString } from '@polkadot/util'
import { decodeEvent } from '../types'
import { parseFromCSV } from '../utils/ohlcv-parsers'

const TIMEFRAME_INTERVAL_IN_MINUTES = 1
const KrakenXlmUsd = parseFromCSV(
    `ohlcv/XLMUSD_${TIMEFRAME_INTERVAL_IN_MINUTES}.csv`
)
const KrakenKsmUsd = parseFromCSV(
    `ohlcv/KSMUSD_${TIMEFRAME_INTERVAL_IN_MINUTES}.csv`
)
const KrakenDotUsd = parseFromCSV(
    `ohlcv/DOTUSD_${TIMEFRAME_INTERVAL_IN_MINUTES}.csv`
)

export async function handleUpdatedPrices(ctx: EventHandlerContext) {
    let event = await decodeEvent(
        network,
        ctx,
        'diaOracleModule',
        'updatedPrices'
    )
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
