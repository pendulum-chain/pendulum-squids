import {
    Block,
    BlockHeader,
    Call,
    DataHandlerContext,
    Event,
    Extrinsic,
    SubstrateBatchProcessor,
    SubstrateBatchProcessorFields,
} from '@subsquid/substrate-processor'

import { Store, TypeormDatabase } from '@subsquid/typeorm-store'
import { blockRetentionNumber, config, maxHeightPromise } from './config'
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
    .addEvent({
        name: ['DiaOracleModule.UpdatedPrices'],
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
    let maxHeight = await maxHeightPromise

    for (let { header: block, calls, events, extrinsics } of ctx.blocks) {
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

        for (let event of events) {
            try {
                switch (event.name) {
                    case 'DiaOracleModule.UpdatedPrices':
                        await handleUpdatedPrices({
                            ...ctx,
                            block,
                            event,
                        })
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
    }
})
