import { EventHandlerContext } from '../processor'
import { network } from '../config'
import { hexToString } from '@polkadot/util'
import { decodeEvent } from '../types'
import {
    getOHLCVAtTime,
    OHLCV,
    readCSV,
    RollingAverage,
} from '../utils/ohlcv-parsers'
import * as fs from 'fs'

const TIMEFRAME_INTERVAL_IN_MINUTES = 1
const KrakenKsmUsd = readCSV(
    `ohlcv/KSMUSD_${TIMEFRAME_INTERVAL_IN_MINUTES}.csv`
)
const KrakenXlmUsd = readCSV(
    `ohlcv/XLMUSD_${TIMEFRAME_INTERVAL_IN_MINUTES}.csv`
)
const KrakenEurUsd = readCSV(
    `ohlcv/EURUSD_${TIMEFRAME_INTERVAL_IN_MINUTES}.csv`
)
// We don't have the DOT price available on Pendulum because the DIA pallet was not configured yet
// const KrakenDotUsd = readCSV(
//     `ohlcv/DOTUSD_${TIMEFRAME_INTERVAL_IN_MINUTES}.csv`
// )

interface PriceDeviation {
    timestamp: number
    deviation: number | null
    high: number
    low: number
}

export const deviationObject: { [key: string]: PriceDeviation[] } = {}

async function handleAnalysisFor(
    ctx: EventHandlerContext,
    coinInfo: any,
    dataSet: Promise<OHLCV[]>,
    symbol: string
) {
    // We try to pick the timestamp reported by the block, because the timestamp in the coin info might not be up-to-date
    const timestamp =
        ctx.block.timestamp || Number(coinInfo.lastUpdateTimestamp)
    try {
        const data = await dataSet
        const ohlcvAtTime = getOHLCVAtTime(data, timestamp)

        if (!ohlcvAtTime) {
            console.log('No OHLCV data for', symbol, 'at', timestamp)
            let deviation: PriceDeviation = {
                timestamp,
                deviation: null,
                high: 0,
                low: 0,
            }
            saveDeviation(deviation, symbol)
        }

        let diaPrice = Number(coinInfo.price.toString()) / 10 ** 12
        if (diaPrice < ohlcvAtTime!.low) {
            const price_deviation =
                ((ohlcvAtTime!.low - diaPrice) / ohlcvAtTime!.low) * 100
            let deviation: PriceDeviation = {
                timestamp,
                deviation: price_deviation,
                high: ohlcvAtTime!.high,
                low: ohlcvAtTime!.low,
            }
            saveDeviation(deviation, symbol)
        } else if (diaPrice > ohlcvAtTime!.high) {
            const price_deviation =
                ((diaPrice - ohlcvAtTime!.high) / ohlcvAtTime!.high) * 100
            let deviation: PriceDeviation = {
                timestamp,
                deviation: price_deviation,
                high: ohlcvAtTime!.high,
                low: ohlcvAtTime!.low,
            }
            saveDeviation(deviation, symbol)
        }
    } catch (e) {
        console.log('Error analyzing price', e)
    }
}

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
        if (blockchain === 'Kusama') {
            switch (symbol) {
                case 'KSM':
                    await handleAnalysisFor(ctx, coinInfo, KrakenKsmUsd, symbol)
                    break
                case 'XLM':
                    await handleAnalysisFor(ctx, coinInfo, KrakenXlmUsd, symbol)
                    break
                case 'EUR':
                    await handleAnalysisFor(ctx, coinInfo, KrakenEurUsd, symbol)
                    break
            }
            // } else if (blockchain === 'Polkadot' && symbol === 'DOT') {
            //     await handleAnalysisFor(
            //         ctx,
            //         coinInfo,
            //         KrakenDotUsd,
            //         DotRollingAverage
            //     )
        }
    }
}

function saveDeviation(deviation: PriceDeviation, symbol: string): void {
    if (!deviationObject[symbol]) {
        let deviationsEmpty: PriceDeviation[] = []
        deviationsEmpty.push(deviation)
        deviationObject[symbol] = deviationsEmpty
    } else {
        deviationObject[symbol].push(deviation)
    }
}
