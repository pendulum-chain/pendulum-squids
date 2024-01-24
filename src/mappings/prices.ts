import { EventHandlerContext } from '../processor'
import { network } from '../config'
import { getOrCreateOraclePrice } from '../entities/oraclePrice'
import { hexToString } from '@polkadot/util'
import { decodeEvent } from '../types'
import { getOHLCVAtTime, readCSV } from '../utils/ohlcv-parsers'

const TIMEFRAME_INTERVAL_IN_MINUTES = 1
const KrakenKsmUsd = readCSV(
    `ohlcv/KSMUSD_${TIMEFRAME_INTERVAL_IN_MINUTES}.csv`
)

interface AnalysisResult {
    priceDiff: number
    priceDiffPercentage: number
    timestamp: number
}

// Map of number to AnalysisResult
const KsmUsdAnalysis: { [timestamp: number]: AnalysisResult } = {}

// const KrakenXlmUsd = parseFromCSV(
//     `ohlcv/XLMUSD_${TIMEFRAME_INTERVAL_IN_MINUTES}.csv`
// )
// const KrakenDotUsd = parseFromCSV(
//     `ohlcv/DOTUSD_${TIMEFRAME_INTERVAL_IN_MINUTES}.csv`
// )

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

        // Check against the Kraken price
        if (blockchain === 'Kusama' && symbol === 'KSM') {
            const timestamp = Number(oraclePrice.timestamp)
            try {
                const data = await KrakenKsmUsd
                const ohlcvAtTime = getOHLCVAtTime(data, timestamp)
                const krakenPrice = ohlcvAtTime.close
                let diaPrice = Number(oraclePrice.price)
                // We downscale the price by 12 decimals
                diaPrice = diaPrice / 10 ** 12
                const priceDiff = Math.abs(krakenPrice - diaPrice)
                const priceDiffPercentage = priceDiff / krakenPrice
                if (priceDiffPercentage > 0.1) {
                    console.log(
                        `KSM price difference is ${priceDiffPercentage * 100}%`
                    )
                }
                console.log(
                    'Comparing KSM price to Kraken price',
                    krakenPrice,
                    diaPrice,
                    priceDiff,
                    priceDiffPercentage,
                    'at timestamp',
                    timestamp
                )
                KsmUsdAnalysis[timestamp] = {
                    priceDiff,
                    priceDiffPercentage,
                    timestamp,
                }
            } catch (e) {
                console.log('Error getting KSM price', e)
            }
        }

        await ctx.store.save(oraclePrice)
    }
}
