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
import { handleUpdatedPrices } from './mappings/prices'

const DataSelection = { data: { event: true } } as const

const processor = new SubstrateBatchProcessor()
    .setDataSource(config.dataSource)

    // Zenlink
    .addEvent('ZenlinkProtocol.LiquidityAdded', DataSelection)
    .addEvent('ZenlinkProtocol.LiquidityRemoved', DataSelection)
    .addEvent('ZenlinkProtocol.AssetSwap', DataSelection)
    // Farming
    .addEvent('Farming.FarmingPoolCreated', DataSelection)
    .addEvent('Farming.FarmingPoolReset', DataSelection)
    .addEvent('Farming.FarmingPoolClosed', DataSelection)
    .addEvent('Farming.FarmingPoolKilled', DataSelection)
    .addEvent('Farming.FarmingPoolEdited', DataSelection)
    .addEvent('Farming.Charged', DataSelection)
    .addEvent('Farming.Deposited', DataSelection)
    .addEvent('Farming.Withdrawn', DataSelection)
    .addEvent('Farming.Claimed', DataSelection)
    .addEvent('Farming.WithdrawClaimed', DataSelection)
    .addEvent('Farming.GaugeWithdrawn', DataSelection)
    .addEvent('Farming.AllForceGaugeClaimed', DataSelection)
    .addEvent('Farming.PartiallyForceGaugeClaimed', DataSelection)
    .addEvent('Farming.AllRetired', DataSelection)
    .addEvent('Farming.PartiallyRetired', DataSelection)
    .addEvent('Farming.RetireLimitSet', DataSelection)

    .addEvent('Balances.Transfer', DataSelection)

    .addEvent('DiaOracleModule.UpdatedPrices', DataSelection)

    .addEvent('Tokens.Transfer', DataSelection)
    .addEvent('Tokens.Deposited', DataSelection)
    .addEvent('Tokens.Withdrawn', DataSelection)
    .addEvent('Tokens.BalanceSet', DataSelection)

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
                    // zenlink
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
                    // farming
                    case 'Farming.FarmingPoolCreated':
                        console.log(
                            'Farming.FarmingPoolCreated',
                            ctx,
                            block,
                            item
                        )
                        await handleFarmingPoolCreated({
                            ...ctx,
                            block: block.header,
                            event: item.event,
                        })
                        break
                    case 'Farming.FarmingPoolReset':
                        await handleFarmingPoolReset({
                            ...ctx,
                            block: block.header,
                            event: item.event,
                        })
                        break
                    case 'Farming.FarmingPoolClosed':
                        await handleFarmingPoolClosed({
                            ...ctx,
                            block: block.header,
                            event: item.event,
                        })
                        break
                    case 'Farming.FarmingPoolKilled':
                        await handleFarmingPoolKilled({
                            ...ctx,
                            block: block.header,
                            event: item.event,
                        })
                        break
                    case 'Farming.FarmingPoolEdited':
                        await handleFarmingPoolEdited({
                            ...ctx,
                            block: block.header,
                            event: item.event,
                        })
                        break
                    case 'Farming.Charged':
                        await handleFarmingCharged({
                            ...ctx,
                            block: block.header,
                            event: item.event,
                        })
                        break
                    case 'Farming.Deposited':
                        await handleFarmingDeposited({
                            ...ctx,
                            block: block.header,
                            event: item.event,
                        })
                        break
                    case 'Farming.Withdrawn':
                        await handleFarmingWithdrawn({
                            ...ctx,
                            block: block.header,
                            event: item.event,
                        })
                        break
                    case 'Farming.Claimed':
                        await handleFarmingClaimed({
                            ...ctx,
                            block: block.header,
                            event: item.event,
                        })
                        break
                    case 'Farming.WithdrawClaimed':
                        await handleFarmingWithdrawClaimed({
                            ...ctx,
                            block: block.header,
                            event: item.event,
                        })
                        break
                    case 'Farming.GaugeWithdrawn':
                        await handleFarmingGaugeWithdrawn({
                            ...ctx,
                            block: block.header,
                            event: item.event,
                        })
                        break
                    // balances
                    case 'Balances.Transfer':
                        await handleBalanceTransfer({
                            ...ctx,
                            block: block.header,
                            event: item.event,
                        })
                        break
                    // price oracle
                    case 'DiaOracleModule.UpdatedPrices':
                        await handleUpdatedPrices({
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
