import { ProcessorConfig } from "./types";

export const config: ProcessorConfig = {
  chainName: 'amplitude',
  prefix: 'amplitude',
  dataSource: {
    archive: 'https://amplitude.explorer.subsquid.io/graphql',
    chain: 'wss://rpc-amplitude.pendulumchain.tech',
  },
}
