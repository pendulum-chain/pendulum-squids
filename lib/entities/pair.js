"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPair = void 0;
const constants_1 = require("../constants");
const model_1 = require("../model");
const token_1 = require("../utils/token");
const token_2 = require("./token");
async function getPair(ctx, assets) {
    let factory = await ctx.store.get(model_1.Factory, '1');
    if (!factory) {
        factory = new model_1.Factory({
            id: '1',
            pairCount: 0,
            totalVolumeETH: constants_1.ZERO_BD.toString(),
            totalLiquidityETH: constants_1.ZERO_BD.toString(),
            totalVolumeUSD: constants_1.ZERO_BD.toString(),
            untrackedVolumeUSD: constants_1.ZERO_BD.toString(),
            totalLiquidityUSD: constants_1.ZERO_BD.toString(),
            txCount: 0,
        });
        // create new bundle
        const bundle = new model_1.Bundle({
            id: '1',
            ethPrice: constants_1.ZERO_BD.toString(),
        });
        await ctx.store.save(bundle);
    }
    const pairAssetId = await (0, token_1.getPairAssetIdFromAssets)(ctx, assets);
    if (!pairAssetId)
        return undefined;
    const pairAddress = (0, token_1.addressFromAsset)(pairAssetId);
    const token0 = await (0, token_2.getOrCreateToken)(ctx, assets[0]);
    const token1 = await (0, token_2.getOrCreateToken)(ctx, assets[1]);
    if (!token0 || !token1)
        return undefined;
    let pair = await ctx.store.get(model_1.Pair, {
        where: { id: pairAddress },
        relations: { token0: true, token1: true },
    });
    if (!pair) {
        factory.pairCount += 1;
        await ctx.store.save(factory);
        pair = new model_1.Pair({
            id: pairAddress.toLowerCase(),
            token0,
            token1,
            liquidityProviderCount: 0,
            createdAtTimestamp: new Date(ctx.block.timestamp),
            createdAtBlockNumber: BigInt(ctx.block.height),
            txCount: 0,
            reserve0: constants_1.ZERO_BD.toString(),
            reserve1: constants_1.ZERO_BD.toString(),
            trackedReserveETH: constants_1.ZERO_BD.toString(),
            reserveETH: constants_1.ZERO_BD.toString(),
            reserveUSD: constants_1.ZERO_BD.toString(),
            totalSupply: constants_1.ZERO_BD.toString(),
            volumeToken0: constants_1.ZERO_BD.toString(),
            volumeToken1: constants_1.ZERO_BD.toString(),
            volumeUSD: constants_1.ZERO_BD.toString(),
            untrackedVolumeUSD: constants_1.ZERO_BD.toString(),
            token0Price: constants_1.ZERO_BD.toString(),
            token1Price: constants_1.ZERO_BD.toString(),
        });
        await ctx.store.save(pair);
    }
    return pair;
}
exports.getPair = getPair;
//# sourceMappingURL=pair.js.map