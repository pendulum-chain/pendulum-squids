import { EventHandlerContext } from '../processor'
import { network } from '../config'
import { getOrCreateOraclePrice } from '../entities/oraclePrice'
import { hexToString } from '@polkadot/util'
import { decodeEvent } from '../types'
import {
    AnalysisResult,
    getOHLCVAtTime,
    PriceAnalysis,
    readCSV,
    RollingAverage,
} from '../utils/ohlcv-parsers'

const TIMEFRAME_INTERVAL_IN_MINUTES = 1
const KrakenKsmUsd = readCSV(
    `ohlcv/KSMUSD_${TIMEFRAME_INTERVAL_IN_MINUTES}.csv`
)
const KrakenXlmUsd = readCSV(
    `ohlcv/XLMUSD_${TIMEFRAME_INTERVAL_IN_MINUTES}.csv`
)
const KrakenDotUsd = readCSV(
    `ohlcv/DOTUSD_${TIMEFRAME_INTERVAL_IN_MINUTES}.csv`
)

export const KsmRollingAverage = new RollingAverage(0.1)

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

        // Check against the Kraken price
        if (blockchain === 'Kusama' && symbol === 'KSM') {
            // We try to pick the timestamp reported by the block, because the timestamp might not be up-to-date
            const timestamp =
                ctx.block.timestamp || Number(coinInfo.lastUpdateTimestamp)
            try {
                const data = await KrakenKsmUsd
                const ohlcvAtTime = getOHLCVAtTime(data, timestamp)
                const krakenPrice = ohlcvAtTime.close
                let diaPrice = Number(coinInfo.price.toString())
                // We downscale the price by 12 decimals
                diaPrice = diaPrice / 10 ** 12
                const priceDiff = Math.abs(krakenPrice - diaPrice)
                // We calculate the percentage difference between the two prices
                const priceDiffPercentage = priceDiff / krakenPrice
                KsmRollingAverage.add(priceDiffPercentage)
            } catch (e) {
                console.log('Error getting KSM price', e)
            }
        }

        // await ctx.store.save(oraclePrice)
    }
}
