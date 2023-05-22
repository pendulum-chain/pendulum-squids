import { ProcessorConfig } from './types'

const network: string = process.env.NETWORK || 'amplitude'

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
    prefix: 'foucoco',
    dataSource: {
        archive: 'https://foucoco.archive.subsquid.io/graphql',
        chain: 'wss://rpc-foucoco.pendulumchain.tech',
    },
}

export const config: ProcessorConfig =
    network === 'foucoco' ? foucocoConfig : amplitudeConfig

console.log('Using ProcessorConfig: ', config)
