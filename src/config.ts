import { ProcessorConfig } from './types'

export type Network = 'foucoco' | 'amplitude' | 'pendulum'
export const network: Network =
    <'foucoco' | 'amplitude' | 'pendulum'>process.env.NETWORK || 'amplitude'

const pendulumConfig: ProcessorConfig = {
    chainName: 'pendulum',
    prefix: 'pendulum',
    dataSource: {
        archive: 'https://pendulum.archive.subsquid.io/graphql',
        chain: 'wss://rpc-pendulum.pendulumchain.tech',
    },
}

const amplitudeConfig: ProcessorConfig = {
    chainName: 'amplitude',
    prefix: 'amplitude',
    dataSource: {
        archive: 'https://amplitude.archive.subsquid.io/graphql',
        chain: 'wss://rpc-amplitude.pendulumchain.tech',
    },
}

const foucocoConfig: ProcessorConfig = {
    chainName: 'foucoco',
    prefix: 'amplitude',
    dataSource: {
        archive: 'https://foucoco.archive.subsquid.io/graphql',
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
