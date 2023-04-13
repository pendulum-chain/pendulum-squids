"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getZLKInfo = exports.getZenlinkInfo = exports.getPosition = exports.getTransaction = exports.getFactory = void 0;
const constants_1 = require("../constants");
const model_1 = require("../model");
async function getFactory(ctx) {
    const factory = await ctx.store.get(model_1.Factory, '1');
    return factory;
}
exports.getFactory = getFactory;
async function getTransaction(ctx, id) {
    const item = await ctx.store.get(model_1.Transaction, id);
    return item;
}
exports.getTransaction = getTransaction;
async function getPosition(ctx, id) {
    const item = await ctx.store.get(model_1.LiquidityPosition, id);
    return item;
}
exports.getPosition = getPosition;
async function getZenlinkInfo(ctx) {
    let zenlinkInfo = await ctx.store.get(model_1.ZenlinkInfo, {
        where: { id: '1' },
        relations: { factory: true, stableSwapInfo: true }
    });
    if (!zenlinkInfo) {
        zenlinkInfo = new model_1.ZenlinkInfo({
            id: '1',
            updatedDate: new Date(ctx.block.timestamp),
            totalVolumeUSD: constants_1.ZERO_BD.toString(),
            totalTvlUSD: constants_1.ZERO_BD.toString(),
            txCount: 0,
            factory: await getFactory(ctx),
            // stableSwapInfo: await getStableSwapInfo(ctx)
        });
        await ctx.store.save(zenlinkInfo);
    }
    return zenlinkInfo;
}
exports.getZenlinkInfo = getZenlinkInfo;
async function getZLKInfo(ctx) {
    let zlkInfo = await ctx.store.get(model_1.ZLKInfo, {
        where: { id: '1' },
    });
    if (!zlkInfo) {
        zlkInfo = new model_1.ZLKInfo({
            id: '1',
            updatedDate: new Date(ctx.block.timestamp),
            // holders: 0,
            // circulatingSupply: 0n,
            // totalIssue: 0n,
            burn: 0n,
        });
        await ctx.store.save(zlkInfo);
    }
    return zlkInfo;
}
exports.getZLKInfo = getZLKInfo;
//# sourceMappingURL=utils.js.map