import {
    SubstrateBatchProcessorFields,
    DataHandlerContext,
    SubstrateBatchProcessor,
    Block,
    BlockHeader,
    Event,
    Call,
    Extrinsic,
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
import {
    blockRetentionNumber,
    config,
    maxHeightPromise,
    catchupPriceUpdatePeriod,
} from './config'

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
import { handleBatchWithRemark } from './mappings/remark'
import {
    saveBlock,
    saveCall,
    saveEvent,
    saveExtrinsic,
} from './mappings/block-details'
import {
    handleContractEvent,
    handleContractInstantiated,
} from './mappings/nabla/handleEvent'

const processor = new SubstrateBatchProcessor()
    .setDataSource(config.dataSource)
    .setFields({
        block: {
            timestamp: true,
            digest: true,
            extrinsicsRoot: true,
            stateRoot: true,
            validator: true,
        },
        call: {
            name: true,
            args: true,
            origin: true,
            success: true,
            error: true,
        },
        event: {
            name: true,
            args: true,
            phase: true,
        },
        extrinsic: {
            hash: true,
            success: true,
            error: true,
            fee: true,
            signature: true,
            tip: true,
            version: true,
        },
    })
    .addCall({
        name: ['System.remark', 'Utility.batch', 'Utility.batch_all'],
        extrinsic: true,
        stack: true,
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
            'Contracts.Instantiated',
        ],
        call: true,
        extrinsic: true,
    })
    .includeAllBlocks()

type Fields = SubstrateBatchProcessorFields<typeof processor>
export type Call_ = Call<Fields>
export type Event_ = Event<Fields>
export type Extrinsic_ = Extrinsic<Fields>
export type Block_ = Block<Fields>
export type BlockHeader_ = BlockHeader<Fields>
export type Ctx = DataHandlerContext<Store, Fields>

export interface EventHandlerContext extends Ctx {
    block: BlockHeader<Fields>
    event: Event<Fields>
}

export interface CallHandlerContext extends Ctx {
    block: BlockHeader<Fields>
    call: Call<Fields>
}

processor.run(new TypeormDatabase(), async (ctx) => {
    // Fetch max block height from the archive
    const maxHeight = await maxHeightPromise

    for (const { header: block, calls, events, extrinsics } of ctx.blocks) {
        ctx.log.debug(
            `block ${block.height}: extrinsics - ${extrinsics.length}, calls - ${calls.length}, events - ${events.length}`
        )

        // Block is saved only if it's in the most recent BLOCK_RETENTION_NUMBER blocks or newer
        if (block.height >= maxHeight - blockRetentionNumber) {
            try {
                await saveBlock(ctx, block)

                for (const extrinsic of extrinsics) {
                    await saveExtrinsic(ctx, extrinsic)
                }

                for (const call of calls.reverse()) {
                    await saveCall(ctx, call)
                }

                for (const event of events) {
                    await saveEvent(ctx, event)
                }
            } catch (e) {
                console.log(
                    `Error saving block details for block '${block.height}'.`,
                    e
                )
            }
        }

        for (const event of events) {
            try {
                switch (event.name) {
                    case 'Tokens.Deposited':
                        await handleTokenDeposited({
                            ...ctx,
                            block,
                            event,
                        })
                        break
                    case 'Tokens.Withdrawn':
                        await handleTokenWithdrawn({
                            ...ctx,
                            block,
                            event,
                        })
                        break
                    case 'Tokens.Transfer':
                        await handleTokenTransfer({
                            ...ctx,
                            block,
                            event,
                        })
                        break
                    //zenlink
                    case 'ZenlinkProtocol.LiquidityAdded':
                        await handleLiquidityAdded({
                            ...ctx,
                            block,
                            event,
                        })
                        break
                    case 'ZenlinkProtocol.LiquidityRemoved':
                        await handleLiquidityRemoved({
                            ...ctx,
                            block,
                            event,
                        })
                        break
                    case 'ZenlinkProtocol.AssetSwap':
                        await handleAssetSwap({
                            ...ctx,
                            block,
                            event,
                        })
                        break
                    // farming
                    case 'Farming.FarmingPoolCreated':
                        await handleFarmingPoolCreated({
                            ...ctx,
                            block,
                            event,
                        })
                        break
                    case 'Farming.FarmingPoolReset':
                        await handleFarmingPoolReset({
                            ...ctx,
                            block,
                            event,
                        })
                        break
                    case 'Farming.FarmingPoolClosed':
                        await handleFarmingPoolClosed({
                            ...ctx,
                            block,
                            event,
                        })
                        break
                    case 'Farming.FarmingPoolKilled':
                        await handleFarmingPoolKilled({
                            ...ctx,
                            block,
                            event,
                        })
                        break
                    case 'Farming.FarmingPoolEdited':
                        await handleFarmingPoolEdited({
                            ...ctx,
                            block,
                            event,
                        })
                        break
                    case 'Farming.Charged':
                        await handleFarmingCharged({
                            ...ctx,
                            block,
                            event,
                        })
                        break
                    case 'Farming.Deposited':
                        await handleFarmingDeposited({
                            ...ctx,
                            block,
                            event,
                        })
                        break
                    case 'Farming.Withdrawn':
                        await handleFarmingWithdrawn({
                            ...ctx,
                            block,
                            event,
                        })
                        break
                    case 'Farming.Claimed':
                        await handleFarmingClaimed({
                            ...ctx,
                            block,
                            event,
                        })
                        break
                    case 'Farming.WithdrawClaimed':
                        await handleFarmingWithdrawClaimed({
                            ...ctx,
                            block,
                            event,
                        })
                        break
                    case 'Farming.GaugeWithdrawn':
                        await handleFarmingGaugeWithdrawn({
                            ...ctx,
                            block,
                            event,
                        })
                        break
                    // balances
                    case 'Balances.Transfer':
                        await handleBalanceTransfer({
                            ...ctx,
                            block,
                            event,
                        })
                        break
                    // contracts
                    case 'Contracts.ContractEmitted':
                        await handleContractEvent({
                            ...ctx,
                            block,
                            event,
                        })
                        break
                    case 'Contracts.Instantiated':
                        await handleContractInstantiated({
                            ...ctx,
                            block,
                            event,
                        })
                        break
                    // price oracle
                    case 'DiaOracleModule.UpdatedPrices':
                        // Only processing these events once every CATCHUP_PRICE_UPDATE_PERIOD blocks or if the current block is the 'head' of the chain
                        // CATCHUP_PRICE_UPDATE_PERIOD is used so that we don't have to process these events for every block but still maintain a fairly accurate price history
                        if (
                            ctx.isHead ||
                            block.height % catchupPriceUpdatePeriod === 0
                        ) {
                            await handleUpdatedPrices({
                                ...ctx,
                                block,
                                event,
                            })
                        }
                        break
                    default:
                        break
                }
            } catch (e) {
                console.log(
                    `Error processing event '${event.name}'. Skipping due to error:`,
                    e
                )
            }
        }
        // It's important to process the calls after the events,
        // because for the system.remark call we need to have
        // processed the token transfers first
        for (const call of calls) {
            try {
                switch (call.name) {
                    case 'Utility.batch':
                        if (!call.success) continue
                        await handleBatchWithRemark({
                            ...ctx,
                            block,
                            call,
                        })
                        break
                    case 'Utility.batch_all':
                        if (!call.success) continue
                        await handleBatchWithRemark({
                            ...ctx,
                            block,
                            call,
                        })
                        break
                }
            } catch (e) {
                console.log(
                    `Error processing call '${call.name}'. Skipping due to error:`,
                    e
                )
            }
        }
    }
})
