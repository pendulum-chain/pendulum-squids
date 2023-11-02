import {
    BatchContext,
    BatchProcessorItem,
    SubstrateBatchProcessor,
} from '@subsquid/substrate-processor'
import { Store, TypeormDatabase } from '@subsquid/typeorm-store'
import {
    handleFarmingCharged,
    handleFarmingClaimed,
    handleFarmingDeposited,
    handleFarmingGaugeWithdrawn,
    handleFarmingPoolClosed,
    handleFarmingPoolCreated,
    handleFarmingPoolEdited,
    handleFarmingPoolKilled,
    handleFarmingPoolReset,
    handleFarmingWithdrawClaimed,
    handleFarmingWithdrawn,
} from './mappings/farming/handle'
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
import { handleUpdatedPrices } from './mappings/prices'

const DataSelection = { data: { event: true } } as const

const processor = new SubstrateBatchProcessor()
    .setDataSource(config.dataSource)
    .setFields({
        event: {},
        call: {
            origin: true,
            success: true,
            error: true,
        },
        extrinsic: {
            hash: true,
            fee: true,
            tip: true,
        },
    })
    .addEvent({
        name: [
            // Zenlink
            'ZenlinkProtocol.LiquidityAdded',
            'ZenlinkProtocol.LiquidityRemoved',
            'ZenlinkProtocol.AssetSwap',
            // Farming
            'Farming.FarmingPoolCreated',
            'Farming.FarmingPoolReset',
            'Farming.FarmingPoolClosed',
            'Farming.FarmingPoolKilled',
            'Farming.FarmingPoolEdited',
            'Farming.Charged',
            'Farming.Deposited',
            'Farming.Withdrawn',
            'Farming.Claimed',
            'Farming.WithdrawClaimed',
            'Farming.GaugeWithdrawn',
            'Farming.AllForceGaugeClaimed',
            'Farming.PartiallyForceGaugeClaimed',
            'Farming.AllRetired',
            'Farming.PartiallyRetired',
            'Farming.RetireLimitSet',
            'Balances.Transfer',
            'DiaOracleModule.UpdatedPrices',
            // Token transactions
            'Tokens.Transfer',
            'Tokens.Deposited',
            'Tokens.Withdrawn',
            'Tokens.BalanceSet',
            // Contracts
            'Contracts.ContractEmitted',
        ],
        call: true,
        extrinsic: true,
    })

type Item = BatchProcessorItem<typeof processor>
export type Ctx = BatchContext<Store, Item>

processor.run(new TypeormDatabase(), async (ctx) => {
    for (let block of ctx.blocks) {
        for (let item of block.events) {
            try {
                switch (item.name) {
                    case 'Tokens.Deposited':
                        await handleTokenDeposited({
                            ...ctx,
                            block: block.header,
                            event: item,
                        })
                        break
                    case 'Tokens.Withdrawn':
                        await handleTokenWithdrawn({
                            ...ctx,
                            block: block.header,
                            event: item,
                        })
                        break
                    case 'Tokens.Transfer':
                        await handleTokenTransfer({
                            ...ctx,
                            block: block.header,
                            event: item,
                        })
                        break
                    // zenlink
                    case 'ZenlinkProtocol.LiquidityAdded':
                        await handleLiquidityAdded({
                            ...ctx,
                            block: block.header,
                            event: item,
                        })
                        break
                    case 'ZenlinkProtocol.LiquidityRemoved':
                        await handleLiquidityRemoved({
                            ...ctx,
                            block: block.header,
                            event: item,
                        })
                        break
                    case 'ZenlinkProtocol.AssetSwap':
                        await handleAssetSwap({
                            ...ctx,
                            block: block.header,
                            event: item,
                        })
                        break
                    // farming
                    case 'Farming.FarmingPoolCreated':
                        await handleFarmingPoolCreated({
                            ...ctx,
                            block: block.header,
                            event: item,
                        })
                        break
                    case 'Farming.FarmingPoolReset':
                        await handleFarmingPoolReset({
                            ...ctx,
                            block: block.header,
                            event: item,
                        })
                        break
                    case 'Farming.FarmingPoolClosed':
                        await handleFarmingPoolClosed({
                            ...ctx,
                            block: block.header,
                            event: item,
                        })
                        break
                    case 'Farming.FarmingPoolKilled':
                        await handleFarmingPoolKilled({
                            ...ctx,
                            block: block.header,
                            event: item,
                        })
                        break
                    case 'Farming.FarmingPoolEdited':
                        await handleFarmingPoolEdited({
                            ...ctx,
                            block: block.header,
                            event: item,
                        })
                        break
                    case 'Farming.Charged':
                        await handleFarmingCharged({
                            ...ctx,
                            block: block.header,
                            event: item,
                        })
                        break
                    case 'Farming.Deposited':
                        await handleFarmingDeposited({
                            ...ctx,
                            block: block.header,
                            event: item,
                        })
                        break
                    case 'Farming.Withdrawn':
                        await handleFarmingWithdrawn({
                            ...ctx,
                            block: block.header,
                            event: item,
                        })
                        break
                    case 'Farming.Claimed':
                        await handleFarmingClaimed({
                            ...ctx,
                            block: block.header,
                            event: item,
                        })
                        break
                    case 'Farming.WithdrawClaimed':
                        await handleFarmingWithdrawClaimed({
                            ...ctx,
                            block: block.header,
                            event: item,
                        })
                        break
                    case 'Farming.GaugeWithdrawn':
                        await handleFarmingGaugeWithdrawn({
                            ...ctx,
                            block: block.header,
                            event: item,
                        })
                        break
                    // balances
                    case 'Balances.Transfer':
                        await handleBalanceTransfer({
                            ...ctx,
                            block: block.header,
                            event: item,
                        })
                        break
                    // contracts
                    case 'Contracts.ContractEmitted':
                        await handleContractEvent({
                            ...ctx,
                            block: block.header,
                            event: item,
                        })
                        break
                    // price oracle
                    case 'DiaOracleModule.UpdatedPrices':
                        await handleUpdatedPrices({
                            ...ctx,
                            block: block.header,
                            event: item,
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
