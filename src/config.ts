import { ProcessorConfig } from './types'
import axios from 'axios'

export type Network = 'foucoco' | 'amplitude' | 'pendulum'

function determineNetwork(): Network {
    switch (process.env.NETWORK) {
        case 'foucoco':
        case 'local':
            return 'foucoco'
        case 'pendulum':
            return 'pendulum'
        case 'amplitude':
        default:
            return 'amplitude'
    }
}

export const network = determineNetwork()
export const isLocalExecution = process.env.NETWORK === 'local'

export const blockRetentionNumber = process.env.BLOCK_RETENTION_NUMBER
    ? parseInt(process.env.BLOCK_RETENTION_NUMBER, 10)
    : 7200
export const catchupPriceUpdatePeriod = process.env.CATCHUP_PRICE_UPDATE_PERIOD
    ? parseInt(process.env.CATCHUP_PRICE_UPDATE_PERIOD, 10)
    : 100

// The timeout after which the RPC connection will be reset if no new blocks are received
export const newHeadTimeoutMs = 5 * 60_000

const pendulumConfig: ProcessorConfig = {
    chainName: 'pendulum',
    prefix: 'pendulum',
    archive: 'https://v2.archive.subsquid.io/network/pendulum',
    dataSource: {
        chain: {
            url: 'wss://rpc-pendulum.prd.pendulumchain.tech/',
        },
    },
}

const amplitudeConfig: ProcessorConfig = {
    chainName: 'amplitude',
    prefix: 'amplitude',
    archive: 'https://v2.archive.subsquid.io/network/amplitude',
    dataSource: {
        chain: 'wss://rpc-amplitude.pendulumchain.tech',
    },
}

const foucocoConfig: ProcessorConfig = {
    chainName: 'foucoco',
    prefix: 'amplitude',
    // archive: 'https://v2.archive.subsquid.io/network/foucoco',
    dataSource: {
        chain: 'wss://pencol-roa-00.pendulumchain.tech',
    },
}

const localConfig: ProcessorConfig = {
    chainName: 'local',
    prefix: 'amplitude',
    archive: undefined,
    dataSource: {
        chain: 'ws://127.0.0.1:9944',
    },
}

export const config: ProcessorConfig =
    network === 'foucoco'
        ? isLocalExecution
            ? localConfig
            : foucocoConfig
        : network === 'amplitude'
        ? amplitudeConfig
        : pendulumConfig

console.log('Using ProcessorConfig: ', config)

// Fetch max height from the archive and export it as a promise
export const maxHeightPromise =
    isLocalExecution || !config.archive
        ? Promise.resolve(0)
        : axios
              .get(config.archive + '/height')
              .then((response) => {
                  const data = response.data
                  console.log('Max height:', data)
                  return data
              })
              .catch((error) => {
                  console.error(
                      'Error getting block height from archive, using default value instead:',
                      error
                  )
                  return Number.MIN_SAFE_INTEGER
              })

// Derive ids from block number and extrinsic index of the event
export function generateId(
    blockNumber: number,
    extrinsicIndex?: number
): string {
    return `${blockNumber}-${extrinsicIndex ?? ''}`
}
