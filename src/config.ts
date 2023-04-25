import { ProcessorConfig } from './types'

export const config: ProcessorConfig = {
    chainName: 'amplitude',
    prefix: 'amplitude',
    dataSource: {
        archive: 'https://amplitude.archive.subsquid.io/graphql',
        chain: 'wss://rpc-amplitude.pendulumchain.tech',
    },
}
