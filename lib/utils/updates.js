"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateZenlinkInfo = exports.updateZenlinkDayInfo = exports.updateTokenDayData = exports.updatePairHourData = exports.updatePairDayData = exports.updateFactoryDayData = void 0;
const constants_1 = require("../constants");
const model_1 = require("../model");
const big_js_1 = require("big.js");
const utils_1 = require("../entities/utils");
async function updateFactoryDayData(ctx) {
    const factory = (await ctx.store.get(model_1.Factory, '1'));
    const { timestamp } = ctx.block;
    const dayID = parseInt((timestamp / 86400000).toString(), 10);
    const dayStartTimestamp = Number(dayID) * 86400000;
    let factoryDayData = await ctx.store.get(model_1.FactoryDayData, dayID.toString());
    if (!factoryDayData) {
        factoryDayData = new model_1.FactoryDayData({
            id: dayID.toString(),
            date: new Date(dayStartTimestamp),
            dailyVolumeUSD: constants_1.ZERO_BD.toString(),
            dailyVolumeETH: constants_1.ZERO_BD.toString(),
            totalVolumeUSD: constants_1.ZERO_BD.toString(),
            totalVolumeETH: constants_1.ZERO_BD.toString(),
            dailyVolumeUntracked: constants_1.ZERO_BD.toString()
        });
    }
    factoryDayData.totalLiquidityUSD = factory?.totalLiquidityUSD || constants_1.ZERO_BD.toString();
    factoryDayData.totalLiquidityETH = factory?.totalLiquidityETH || constants_1.ZERO_BD.toString();
    factoryDayData.txCount = factory?.txCount || 0;
    await ctx.store.save(factoryDayData);
    await updateZenlinkDayInfo(ctx);
    return factoryDayData;
}
exports.updateFactoryDayData = updateFactoryDayData;
async function updatePairDayData(ctx, pair) {
    const { timestamp } = ctx.block;
    const dayID = parseInt((timestamp / 86400000).toString(), 10);
    const dayStartTimestamp = Number(dayID) * 86400000;
    const dayPairID = `${pair.id}-${dayID}`;
    let pairDayData = await ctx.store.get(model_1.PairDayData, dayPairID);
    if (!pairDayData) {
        pairDayData = new model_1.PairDayData({
            id: dayPairID,
            date: new Date(dayStartTimestamp),
            token0: pair.token0,
            token1: pair.token1,
            pair,
            pairAddress: pair.id,
            dailyVolumeToken0: constants_1.ZERO_BD.toString(),
            dailyVolumeToken1: constants_1.ZERO_BD.toString(),
            dailyVolumeUSD: constants_1.ZERO_BD.toString(),
            dailyTxns: 0
        });
    }
    pairDayData.totalSupply = pair.totalSupply;
    pairDayData.reserve0 = pair.reserve0;
    pairDayData.reserve1 = pair.reserve1;
    pairDayData.reserveUSD = pair.reserveUSD;
    pairDayData.dailyTxns += 1;
    await ctx.store.save(pairDayData);
    return pairDayData;
}
exports.updatePairDayData = updatePairDayData;
async function updatePairHourData(ctx, pair) {
    const { timestamp } = ctx.block;
    const hourIndex = parseInt((timestamp / 3600000).toString(), 10);
    const hourStartUnix = Number(hourIndex) * 3600000;
    const dayPairID = `${pair.id}-${hourIndex}`;
    let pairHourData = await ctx.store.get(model_1.PairHourData, dayPairID);
    if (!pairHourData) {
        pairHourData = new model_1.PairHourData({
            id: dayPairID,
            hourStartUnix: BigInt(hourStartUnix),
            pair,
            hourlyVolumeToken0: constants_1.ZERO_BD.toString(),
            hourlyVolumeToken1: constants_1.ZERO_BD.toString(),
            hourlyVolumeUSD: constants_1.ZERO_BD.toString(),
            hourlyTxns: 0
        });
    }
    pairHourData.totalSupply = pair.totalSupply;
    pairHourData.reserve0 = pair.reserve0;
    pairHourData.reserve1 = pair.reserve1;
    pairHourData.reserveUSD = pair.reserveUSD;
    pairHourData.hourlyTxns += 1;
    await ctx.store.save(pairHourData);
    return pairHourData;
}
exports.updatePairHourData = updatePairHourData;
async function updateTokenDayData(ctx, token) {
    const bundle = (await ctx.store.get(model_1.Bundle, '1'));
    const { timestamp } = ctx.block;
    const dayID = parseInt((timestamp / 86400000).toString(), 10);
    const dayStartTimestamp = Number(dayID) * 86400000;
    const tokenDayID = `${token.id}-${dayID}`;
    let tokenDayData = await ctx.store.get(model_1.TokenDayData, tokenDayID);
    if (!tokenDayData) {
        tokenDayData = new model_1.TokenDayData({
            id: tokenDayID,
            date: new Date(dayStartTimestamp),
            token,
            priceUSD: (0, big_js_1.Big)(token.derivedETH).times(bundle.ethPrice).toString(),
            dailyVolumeToken: constants_1.ZERO_BD.toString(),
            dailyVolumeETH: constants_1.ZERO_BD.toString(),
            dailyVolumeUSD: constants_1.ZERO_BD.toString(),
            dailyTxns: 0,
            totalLiquidityUSD: constants_1.ZERO_BD.toString()
        });
    }
    tokenDayData.priceUSD = (0, big_js_1.Big)(token.derivedETH).times(bundle.ethPrice).toFixed(6);
    tokenDayData.totalLiquidityToken = token.totalLiquidity;
    tokenDayData.totalLiquidityETH = (0, big_js_1.Big)(token.totalLiquidity).times(token.derivedETH).toString();
    tokenDayData.totalLiquidityUSD = (0, big_js_1.Big)(tokenDayData.totalLiquidityETH).times(bundle.ethPrice).toFixed(6);
    tokenDayData.dailyTxns += 1;
    await ctx.store.save(tokenDayData);
    return tokenDayData;
}
exports.updateTokenDayData = updateTokenDayData;
async function updateZenlinkDayInfo(ctx) {
    const { timestamp } = ctx.block;
    const dayID = parseInt((timestamp / 86400000).toString(), 10);
    const dayStartTimestamp = Number(dayID) * 86400000;
    let factoryDayData = await ctx.store.get(model_1.FactoryDayData, dayID.toString());
    if (!factoryDayData) {
        factoryDayData = await updateFactoryDayData(ctx);
    }
    // let stableDayData = await ctx.store.get(StableDayData, dayID.toString())
    // if (!stableDayData) {
    //   stableDayData = await updateStableDayData(ctx)
    // }
    let zenlinkDayInfo = await ctx.store.get(model_1.ZenlinkDayInfo, dayID.toString());
    if (!zenlinkDayInfo) {
        zenlinkDayInfo = new model_1.ZenlinkDayInfo({
            id: dayID.toString(),
            date: new Date(dayStartTimestamp),
            tvlUSD: constants_1.ZERO_BD.toString(),
            dailyVolumeUSD: constants_1.ZERO_BD.toString(),
        });
    }
    zenlinkDayInfo.tvlUSD = (0, big_js_1.Big)(factoryDayData.totalLiquidityUSD)
        // .add(stableDayData.tvlUSD)
        .toFixed(6);
    zenlinkDayInfo.dailyVolumeUSD = (0, big_js_1.Big)(factoryDayData.dailyVolumeUSD)
        // .add(stableDayData.dailyVolumeUSD)
        .toFixed(6);
    await ctx.store.save(zenlinkDayInfo);
    return zenlinkDayInfo;
}
exports.updateZenlinkDayInfo = updateZenlinkDayInfo;
async function updateZenlinkInfo(ctx) {
    const zenlinkInfo = await (0, utils_1.getZenlinkInfo)(ctx);
    const { factory } = zenlinkInfo;
    zenlinkInfo.totalTvlUSD = (0, big_js_1.Big)(factory?.totalLiquidityUSD || '0')
        // .add(stableSwapInfo.totalTvlUSD)
        .toFixed(6);
    zenlinkInfo.totalVolumeUSD = (0, big_js_1.Big)(factory?.totalVolumeUSD || '0')
        // .add(stableSwapInfo.totalVolumeUSD)
        .toFixed(6);
    zenlinkInfo.txCount = (factory?.txCount || 0);
    zenlinkInfo.updatedDate = new Date(ctx.block.timestamp);
    await ctx.store.save(zenlinkInfo);
    return zenlinkInfo;
}
exports.updateZenlinkInfo = updateZenlinkInfo;
//# sourceMappingURL=updates.js.map