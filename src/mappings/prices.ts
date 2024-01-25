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

type AnalysisMap = { [timestamp: number]: AnalysisResult }

// Map of number to AnalysisResult
const KsmUsdAnalysis: AnalysisMap = {}

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
                KsmUsdAnalysis[timestamp] = {
                    priceDiff,
                    priceDiffPercentage,
                    timestamp,
                }

                analyseResults(KsmUsdAnalysis)
            } catch (e) {
                console.log('Error getting KSM price', e)
            }
        }

        await ctx.store.save(oraclePrice)
    }
}

function analyseResults(results: AnalysisMap) {
    const timestamps = Object.keys(results)
    const priceDiffs = timestamps.map((timestamp) => {
        const result = results[Number(timestamp)]
        return result.priceDiff
    })
    const averagePriceDiff =
        priceDiffs.reduce((a, b) => a + b) / priceDiffs.length
    console.log('Average price difference', averagePriceDiff)

    const priceDiffPercentages = timestamps.map((timestamp) => {
        const result = results[Number(timestamp)]
        return result.priceDiffPercentage
    })
    const averagePriceDiffPercentage =
        priceDiffPercentages.reduce((a, b) => a + b) /
        priceDiffPercentages.length
    console.log(
        'Average price difference percentage',
        averagePriceDiffPercentage
    )

    // Find outliers that have a price difference of more than 0.1%
    const outliers = priceDiffPercentages.filter(
        (percentage) => percentage > 0.1
    )
    console.log('Number of outliers', outliers.length)
}
