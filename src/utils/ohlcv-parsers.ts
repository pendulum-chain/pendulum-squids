import fs from 'fs'
import { parse } from 'csv-parse'

interface OHLCV {
    time: Date
    open: number
    high: number
    low: number
    close: number
    volume: number
}

const OHLCV_FIELDS = ['time', 'open', 'high', 'low', 'close', 'volume']

// A function that reads a string from a csv file
function readCSV(path: string): string {
    let content = ''
    fs.createReadStream(path)
        .pipe(parse({ delimiter: ',', fromLine: 2 }))
        .on('data', function (row) {
            content += row
        })
        .on('end', function () {
            console.log('done parsing csv', path)
        })
        .on('error', function (error) {
            console.log('error parsing csv', path, error)
        })
    return content
}

// A function that takes a csv string and returns an array of OHLCV objects
// The csv string is the raw data from the exchange
export function parseFromCSV(csvPath: string): OHLCV[] {
    const csv = readCSV(csvPath)

    const lines = csv.split('\n')
    const ohlcv = []
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i]
        const [time, open, high, low, close, volume] = line.split(',')
        ohlcv.push({
            time: new Date(parseInt(time)),
            open: parseFloat(open),
            high: parseFloat(high),
            low: parseFloat(low),
            close: parseFloat(close),
            volume: parseFloat(volume),
        })
    }
    return ohlcv
}

// A function that takes a timestamp and returns the OHLCV object for that timestamp
// The timestamp is the timestamp of the candle
export function getOHLCVAtTime(ohlcv: OHLCV[], timestamp: Date): OHLCV {
    const index = ohlcv.findIndex(
        (candle) => candle.time.getTime() === timestamp.getTime()
    )
    if (index === -1) {
        throw new Error(`OHLCV for timestamp ${timestamp} not found`)
    }
    return ohlcv[index]
}
