import { ProcessorConfig } from './types'
import { lookupArchive } from '@subsquid/archive-registry'
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

const pendulumConfig: ProcessorConfig = {
    chainName: 'pendulum',
    prefix: 'pendulum',
    dataSource: {
        archive: lookupArchive('pendulum', { release: 'ArrowSquid' }),
        chain: 'wss://rpc-pendulum.prd.pendulumchain.tech/',
    },
}

const amplitudeConfig: ProcessorConfig = {
    chainName: 'amplitude',
    prefix: 'amplitude',
    dataSource: {
        archive: lookupArchive('amplitude', { release: 'ArrowSquid' }),
        chain: 'wss://rpc-amplitude.pendulumchain.tech',
    },
}

const foucocoConfig: ProcessorConfig = {
    chainName: 'foucoco',
    prefix: 'amplitude',
    dataSource: {
        archive: lookupArchive('foucoco', { release: 'ArrowSquid' }),
        chain: 'wss://pencol-roa-00.pendulumchain.tech',
    },
}

const localConfig: ProcessorConfig = {
    chainName: 'local',
    prefix: 'amplitude',
    dataSource: {
        archive: undefined,
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
export const maxHeightPromise = isLocalExecution
    ? Promise.resolve(0)
    : axios
          .get(config.dataSource.archive + '/height')
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
              return Number.MAX_SAFE_INTEGER
          })

// Derive ids from block number and extrinsic index of the event
export function generateId(
    blockNumber: number,
    extrinsicIndex?: number
): string {
    return `${blockNumber}-${extrinsicIndex ?? ''}`
}
