import { promises as fs } from 'fs'
import { parse } from 'csv-parse'

interface OHLCV {
    time: number
    open: number
    high: number
    low: number
    close: number
    volume: number
}

const OHLCV_FIELDS = ['time', 'open', 'high', 'low', 'close', 'volume']

// A function that reads a string from a csv file
export async function readCSV(path: string): Promise<OHLCV[]> {
    const content = await fs.readFile(path)
    return new Promise((resolve, reject) => {
        parse(content, { cast: true }, (err, records: Array<number[]>) => {
            if (err) {
                reject(err)
            }
            // Convert the records to OHLCV objects
            const ohlcvs: OHLCV[] = records.map((record: number[]) => {
                const ohlcv: OHLCV = {} as OHLCV
                for (let i = 0; i < OHLCV_FIELDS.length; i++) {
                    const field = OHLCV_FIELDS[i]
                    // @ts-ignore
                    ohlcv[field] = Number(record[i])
                }
                return ohlcv
            })

            resolve(ohlcvs)
        })
    })
}

// A function that takes a timestamp and returns the OHLCV object for that timestamp
// The timestamp is the timestamp of the candle
export function getOHLCVAtTime(ohlcv: OHLCV[], timestampMs: number): OHLCV {
    const timestamp = Math.floor(timestampMs / 1000)
    // Go through the list and return the index of the timestamp that is closest to the timestamp we are looking for
    // because we cannot be sure to find the exact same timestamp in the list
    let index = -1
    for (let i = 0; i < ohlcv.length; i++) {
        const candle = ohlcv[i]
        if (candle.time === timestamp) {
            index = i
            break
        }
        if (candle.time > timestamp) {
            index = i - 1
            break
        }
    }

    if (index === -1) {
        throw new Error(`OHLCV for timestamp ${timestamp} not found`)
    }
    return ohlcv[index]
}

/// ** Analysis **

export class RollingAverage {
    size: number = 0
    private sum: number = 0

    outlierThreshold: number
    outlierCount: number = 0

    maxValue: number = 0
    minValue: number = Number.MAX_SAFE_INTEGER

    constructor(outlierThreshold: number = 0.1) {
        this.outlierThreshold = outlierThreshold
    }

    get average(): number {
        return this.sum / this.size
    }

    get outlierPercentage(): number {
        return this.outlierCount / this.size
    }

    add(value: number) {
        this.sum += value
        this.size++

        if (value > this.maxValue) {
            this.maxValue = value
        }
        if (value < this.minValue) {
            this.minValue = value
        }

        if (value > this.outlierThreshold) {
            this.outlierCount++
        }
    }
}

export interface AnalysisResult {
    priceDiff: number
    priceDiffPercentage: number
    timestamp: number
}

// Make sure we only have one AnalysisResult per timestamp
type AnalysisMap = { [timestamp: number]: AnalysisResult }

export class PriceAnalysis {
    private results: AnalysisMap = {}
    private name: string
    private outlierThreshold: number

    constructor(name: string, outlierThreshold: number = 0.001) {
        this.name = name
        this.outlierThreshold = outlierThreshold
    }

    addResult(result: AnalysisResult) {
        this.results[result.timestamp] = result
    }

    analyseResults() {
        const results = this.results
        console.log(
            `Number of ${this.name} results`,
            Object.keys(results).length
        )

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

        // Find outliers that have a price difference of more than the threshold
        const outliers = priceDiffPercentages.filter(
            (percentage) => percentage > this.outlierThreshold
        )
        console.log('Number of outliers', outliers.length)
    }
}
