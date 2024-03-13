import { promises as fs } from 'fs'
import { parse } from 'csv-parse'

export interface OHLCV {
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
export function getOHLCVAtTime(
    ohlcv: OHLCV[],
    timestampMs: number
): OHLCV | undefined {
    const timestamp = Math.floor(timestampMs / 1000)
    // Assuming the timestamp is at the START of the candle period
    let index = -1
    for (let i = 0; i < ohlcv.length; i++) {
        const candle = ohlcv[i]
        const nextCandle = ohlcv[i + 1]
        if (nextCandle === undefined) {
            break
        }

        if (candle.time <= timestamp && nextCandle.time > timestamp) {
            index = i
            break
        }
    }

    if (index === -1) {
        return undefined
    }
    return ohlcv[index]
}

/// A class that calculates the rolling average of a series of numbers.
/// It does not store the numbers, but only the sum and the size of the series
/// because we don't want to store all the numbers in memory
export class RollingAverage {
    size: number = 0
    private sum: number = 0
    name: string

    outlierThreshold: number

    maxValue: number = 0
    minValue: number = Number.MAX_SAFE_INTEGER

    outliers: number[] = []

    constructor(name: string, outlierThreshold: number = 0.1) {
        this.name = name
        this.outlierThreshold = outlierThreshold
    }

    get average(): number {
        return this.sum / this.size
    }

    get outlierCount(): number {
        return this.outliers.length
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
            this.outliers.push(value)
        }
    }

    print() {
        const outlierDeviation = this.analyzeOutlierDeviation()
        console.log(
            `RollingAverage of ${this.name}: size: ${this.size}, sum: ${this.sum}, outlierCount: ${this.outlierCount}, maxValue: ${this.maxValue}, minValue: ${this.minValue}, average: ${this.average}, outlierPercentage: ${this.outlierPercentage}, outlierDeviation: ${outlierDeviation}`
        )
    }

    // Analyze outliers
    analyzeOutlierDeviation() {
        const outliers = this.outliers

        // Calculate the deviation from the average
        const average = this.average
        const deviations = outliers.map((value) => {
            return Math.abs(value - average)
        })

        // Calculate the average deviation
        const averageDeviation =
            deviations.reduce((a, b) => a + b, 0) / deviations.length

        return averageDeviation
    }
}
