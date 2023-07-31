import { ProcessorConfig } from './types'

export type Network = 'foucoco' | 'amplitude'
export const network: Network =
    <'foucoco' | 'amplitude'>process.env.NETWORK || 'amplitude'

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
    network === 'foucoco' ? foucocoConfig : amplitudeConfig

console.log('Using ProcessorConfig: ', config)
