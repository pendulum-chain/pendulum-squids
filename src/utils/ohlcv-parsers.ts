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
export function getOHLCVAtTime(ohlcv: OHLCV[], timestamp: number): OHLCV {
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
