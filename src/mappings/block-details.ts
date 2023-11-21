import { Ctx, BlockHeader_, Call_, Event_, Extrinsic_ } from '../processor'

import { decodeHex } from '@subsquid/substrate-processor'
import * as model from '../model'

export async function saveBlock(ctx: Ctx, block: BlockHeader_) {
    const entity = new model.Block({
        id: block.id,
        height: block.height,
        hash: decodeHex(block.hash),
        parentHash: decodeHex(block.parentHash),
        timestamp: new Date(block.timestamp ?? 0),
        extrinsicsicRoot: decodeHex(block.extrinsicsRoot),
        specName: block.specName,
        specVersion: block.specVersion,
        implName: block.implName,
        implVersion: block.implVersion,
        stateRoot: decodeHex(block.stateRoot),
        validator: block.validator ? decodeHex(block.validator) : undefined,
        extrinsicsCount: 0,
        callsCount: 0,
        eventsCount: 0,
    })

    await ctx.store.insert(entity)
}

export async function saveExtrinsic(ctx: Ctx, extrinsic: Extrinsic_) {
    const block = await ctx.store.get(model.Block, extrinsic.block.id)

    if (block == null) {
        throw new Error('Failed to save extrinsic')
    }

    const entity = new model.Extrinsic({
        id: extrinsic.id,
        block,
        error: extrinsic.error,
        fee: extrinsic.fee,
        hash: decodeHex(extrinsic.hash),
        index: extrinsic.index,
        signature: new model.ExtrinsicSignature(extrinsic.signature),
        success: extrinsic.success,
        tip: extrinsic.tip,
        version: extrinsic.version,
    })
    await ctx.store.insert(entity)

    block.extrinsicsCount += 1
    await ctx.store.upsert(block)
}

export async function saveCall(ctx: Ctx, call: Call_) {
    const block = await ctx.store.get(model.Block, call.block.id)
    const extrinsic = await ctx.store.get(
        model.Extrinsic,
        call.getExtrinsic().id
    )
    const parent = call.parentCall
        ? await ctx.store.get(model.Call, call.parentCall.id)
        : undefined

    if (
        block == null ||
        extrinsic == null ||
        (call.parentCall && parent == null)
    ) {
        throw new Error('Failed to save call')
    }

    const [pallet, name] = call.name.split('.')

    const entity = new model.Call({
        id: call.id,
        block,
        address: call.address,
        args: call.args,
        error: call.error,
        extrinsic,
        name,
        pallet,
        parent,
        success: call.success,
    })
    await ctx.store.insert(entity)

    block.callsCount += 1
    await ctx.store.upsert(block)

    if (call.address.length == 0) {
        extrinsic.call = entity
        await ctx.store.upsert(extrinsic)
    }
}

export async function saveEvent(ctx: Ctx, event: Event_) {
    const block = await ctx.store.get(model.Block, event.block.id)
    const extrinsic = event.extrinsic
        ? await ctx.store.get(model.Extrinsic, event.extrinsic.id)
        : undefined
    const call = event.call
        ? await ctx.store.get(model.Call, event.call.id)
        : undefined

    if (
        block == null ||
        (event.extrinsic && extrinsic == null) ||
        (event.call && call == null)
    ) {
        throw new Error('Failed to save event')
    }

    const [pallet, name] = event.name.split('.')

    const entity = new model.Event({
        id: event.id,
        block,
        args: event.args,
        call,
        extrinsic,
        index: event.index,
        name,
        pallet,
        phase: event.phase,
    })
    await ctx.store.insert(entity)

    block.eventsCount += 1
    await ctx.store.upsert(block)
}
