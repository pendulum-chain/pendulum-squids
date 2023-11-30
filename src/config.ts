import { ProcessorConfig } from './types'
import { lookupArchive } from '@subsquid/archive-registry'
import axios from 'axios'
export type Network = 'foucoco' | 'amplitude' | 'pendulum'
export const network: Network =
    <'foucoco' | 'amplitude' | 'pendulum'>process.env.NETWORK || 'amplitude'
export const blockRetentionNumber = process.env.BLOCK_RETENTION_NUMBER
    ? parseInt(process.env.BLOCK_RETENTION_NUMBER, 10)
    : 7200

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

export const config: ProcessorConfig =
    network === 'foucoco'
        ? foucocoConfig
        : network === 'amplitude'
        ? amplitudeConfig
        : pendulumConfig

console.log('Using ProcessorConfig: ', config)

// Fetch max height from the archive and export it as a promise

export const maxHeightPromise = axios
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
