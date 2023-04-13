"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLiquiditySnapShot = exports.updateLiquidityPosition = void 0;
const utils_1 = require("../entities/utils");
const big_js_1 = require("big.js");
const helpers_1 = require("../utils/helpers");
const model_1 = require("../model");
async function isCompleteMint(ctx, mintId) {
    return !!(await ctx.store.get(model_1.Mint, mintId))?.sender; // sufficient checks
}
async function updateLiquidityPosition(ctx, pair, user) {
    let position = await (0, utils_1.getPosition)(ctx, `${pair.id}-${user.id}`);
    if (!position) {
        position = (0, helpers_1.createLiquidityPosition)({
            pair,
            user
        });
        await ctx.store.save(position);
        pair.liquidityProviderCount += 1;
    }
    return position;
}
exports.updateLiquidityPosition = updateLiquidityPosition;
async function createLiquiditySnapShot(ctx, pair, position) {
    const bundle = await ctx.store.get(model_1.Bundle, '1');
    const { timestamp } = ctx.block;
    if (!pair || !bundle)
        return;
    const token0 = await ctx.store.get(model_1.Token, pair.token0.id);
    const token1 = await ctx.store.get(model_1.Token, pair.token1.id);
    if (!token0 || !token1)
        return;
    let snapshot = await ctx.store.get(model_1.LiquidityPositionSnapshot, `${position.id}${timestamp}`);
    if (!snapshot) {
        // create new snapshot
        snapshot = new model_1.LiquidityPositionSnapshot({
            id: `${position.id}${timestamp}`,
            liquidityPosition: position,
            timestamp: new Date(timestamp),
            block: ctx.block.height,
            user: position.user,
            pair: position.pair,
            token0PriceUSD: (0, big_js_1.Big)(token0.derivedETH).times((0, big_js_1.Big)(bundle.ethPrice)).toFixed(6),
            token1PriceUSD: (0, big_js_1.Big)(token1.derivedETH).times((0, big_js_1.Big)(bundle.ethPrice)).toFixed(6),
            reserve0: pair.reserve0,
            reserve1: pair.reserve1,
            reserveUSD: pair.reserveUSD,
            liquidityTokenTotalSupply: pair.totalSupply,
            liquidityTokenBalance: position.liquidityTokenBalance,
        });
        await ctx.store.save(snapshot);
    }
}
exports.createLiquiditySnapShot = createLiquiditySnapShot;
//# sourceMappingURL=token.js.map