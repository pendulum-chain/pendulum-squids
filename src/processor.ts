import {
    BatchContext,
    BatchProcessorItem,
    SubstrateBatchProcessor,
} from '@subsquid/substrate-processor'
import { Store, TypeormDatabase } from '@subsquid/typeorm-store'
import { config } from './config'
import {
    handleAssetSwap,
    handleLiquidityAdded,
    handleLiquidityRemoved,
} from './mappings/protocol'
import {
    handleTokenDeposited,
    handleTokenTransfer,
    handleTokenWithdrawn,
} from './mappings/token'
import { handleBalanceTransfer } from './mappings/balances'
import { handleContractEvent } from './mappings/nabla'

import * as ss58 from '@subsquid/ss58'
import { toHex } from '@subsquid/util-internal-hex'

import {
    BACKSTOP_POOL_CONTRACT_ADDRESS,
    ROUTER_CONTRACT_ADDRESS,
    SWAP_POOL_USD_CONTRACT_ADDRESS,
    SWAP_POOL_ETH_CONTRACT_ADDRESS,
    SWAP_POOL_EUR_CONTRACT_ADDRESS,
} from './mappings/nabla'

const DataSelection = { data: { event: true } } as const

const CONTRACT_ADDRESS_SS58 = 'XnrLUQucQvzp5kaaWLG9Q3LbZw5DPwpGn69B5YcywSWVr5w'
const CONTRACT_ADDRESS = toHex(ss58.decode(CONTRACT_ADDRESS_SS58).bytes)
const SS58_PREFIX = ss58.decode(CONTRACT_ADDRESS_SS58).prefix

const processor = new SubstrateBatchProcessor()
    .setDataSource(config.dataSource)

    // Zenlink
    .addEvent('ZenlinkProtocol.LiquidityAdded', DataSelection)
    .addEvent('ZenlinkProtocol.LiquidityRemoved', DataSelection)
    .addEvent('ZenlinkProtocol.AssetSwap', DataSelection)

    .addEvent('Balances.Transfer', DataSelection)

    .addEvent('Tokens.Transfer', DataSelection)
    .addEvent('Tokens.Deposited', DataSelection)
    .addEvent('Tokens.Withdrawn', DataSelection)
    .addEvent('Tokens.BalanceSet', DataSelection)
    .addContractsContractEmitted(BACKSTOP_POOL_CONTRACT_ADDRESS, DataSelection)
    .addContractsContractEmitted(ROUTER_CONTRACT_ADDRESS, DataSelection)
    .addContractsContractEmitted(SWAP_POOL_ETH_CONTRACT_ADDRESS, DataSelection)
    .addContractsContractEmitted(SWAP_POOL_USD_CONTRACT_ADDRESS, DataSelection)
    .addContractsContractEmitted(SWAP_POOL_EUR_CONTRACT_ADDRESS, DataSelection)

type Item = BatchProcessorItem<typeof processor>
export type Ctx = BatchContext<Store, Item>

processor.run(new TypeormDatabase(), async (ctx) => {
    for (let block of ctx.blocks) {
        for (let item of block.items) {
            try {
                switch (item.name) {
                    case 'Tokens.Deposited':
                        await handleTokenDeposited({
                            ...ctx,
                            block: block.header,
                            event: item.event,
                        })
                        break
                    case 'Tokens.Withdrawn':
                        await handleTokenWithdrawn({
                            ...ctx,
                            block: block.header,
                            event: item.event,
                        })
                        break
                    case 'Tokens.Transfer':
                        await handleTokenTransfer({
                            ...ctx,
                            block: block.header,
                            event: item.event,
                        })
                        break
                    case 'ZenlinkProtocol.LiquidityAdded':
                        await handleLiquidityAdded({
                            ...ctx,
                            block: block.header,
                            event: item.event,
                        })
                        break
                    case 'ZenlinkProtocol.LiquidityRemoved':
                        await handleLiquidityRemoved({
                            ...ctx,
                            block: block.header,
                            event: item.event,
                        })
                        break
                    case 'ZenlinkProtocol.AssetSwap':
                        await handleAssetSwap({
                            ...ctx,
                            block: block.header,
                            event: item.event,
                        })
                        break
                    case 'Balances.Transfer':
                        await handleBalanceTransfer({
                            ...ctx,
                            block: block.header,
                            event: item.event,
                        })
                        break
                    case 'Contracts.ContractEmitted':
                        await handleContractEvent({
                            ...ctx,
                            block: block.header,
                            event: item.event,
                        })
                        break
                    default:
                        break
                }
            } catch (e) {
                console.log(
                    `Error processing event '${item.name}'. Skipping due to error:`,
                    e
                )
            }
        }
    }
})
