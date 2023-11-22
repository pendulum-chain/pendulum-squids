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
import {
    saveBlock,
    saveCall,
    saveEvent,
    saveExtrinsic,
} from './mappings/block-details'

const DataSelection = { data: { event: true } } as const

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

processor.run(new TypeormDatabase(), async (ctx) => {
    for (let { header: block, calls, events, extrinsics } of ctx.blocks) {
        ctx.log.debug(
            `block ${block.height}: extrinsics - ${extrinsics.length}, calls - ${calls.length}, events - ${events.length}`
        )

        await saveBlock(ctx, block)

        for (const extrinsic of extrinsics) {
            await saveExtrinsic(ctx, extrinsic)
        }

        for (const call of calls.reverse()) {
            await saveCall(ctx, call)
        }

        for (let event of events) {
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
                    // zenlink
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
                    // price oracle
                    case 'DiaOracleModule.UpdatedPrices':
                        await handleUpdatedPrices({
                            ...ctx,
                            block,
                            event,
                        })
                        break
                    default:
                        await saveEvent(ctx, event)
                        break
                }
            } catch (e) {
                console.log(
                    `Error processing event '${event.name}'. Skipping due to error:`,
                    e
                )
            }
        }
    }
})
