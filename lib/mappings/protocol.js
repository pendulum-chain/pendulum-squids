"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleAssetSwap = exports.handleLiquidityRemoved = exports.handleLiquidityAdded = exports.handleLiquiditySync = void 0;
const pair_1 = require("../entities/pair");
const utils_1 = require("../entities/utils");
const big_js_1 = require("big.js");
const model_1 = require("../model");
const events_1 = require("../types/events");
const helpers_1 = require("../utils/helpers");
const sort_1 = require("../utils/sort");
const token_1 = require("../utils/token");
const constants_1 = require("../constants");
const ss58_1 = require("@subsquid/ss58");
const config_1 = require("../config");
const pricing_1 = require("../utils/pricing");
const token_2 = require("./token");
const updates_1 = require("../utils/updates");
async function handleLiquiditySync(ctx, pair) {
    const bundle = (await ctx.store.get(model_1.Bundle, '1'));
    const factory = (await (0, utils_1.getFactory)(ctx));
    const { token0, token1 } = pair;
    const asset0 = (0, token_1.assetIdFromAddress)(token0.id);
    const asset1 = (0, token_1.assetIdFromAddress)(token1.id);
    const [pairAccount] = await (0, token_1.getPairStatusFromAssets)(ctx, [asset0, asset1]);
    if (!pairAccount)
        return;
    factory.totalLiquidityETH = (0, big_js_1.Big)(factory.totalLiquidityETH)
        .minus(pair.trackedReserveETH)
        .toFixed(6);
    token0.totalLiquidity = (0, big_js_1.Big)(token0.totalLiquidity)
        .minus(pair.reserve0)
        .toString();
    token1.totalLiquidity = (0, big_js_1.Big)(token1.totalLiquidity)
        .minus(pair.reserve1)
        .toString();
    pair.reserve0 = (await (0, token_1.getTokenBalance)(ctx, (0, token_1.zenlinkAssetIdToCurrencyId)(asset0), (0, ss58_1.codec)(config_1.config.prefix).decode(pairAccount)))?.toString() ?? '0';
    pair.reserve1 = (await (0, token_1.getTokenBalance)(ctx, (0, token_1.zenlinkAssetIdToCurrencyId)(asset1), (0, ss58_1.codec)(config_1.config.prefix).decode(pairAccount)))?.toString() ?? '0';
    const reserve0Decimal = (0, helpers_1.convertTokenToDecimal)(BigInt(pair.reserve0), token0.decimals);
    const reserve1Decimal = (0, helpers_1.convertTokenToDecimal)(BigInt(pair.reserve1), token1.decimals);
    pair.token0Price = !(0, big_js_1.Big)(reserve1Decimal).eq(constants_1.ZERO_BD)
        ? (0, big_js_1.Big)(reserve0Decimal).div(reserve1Decimal).toFixed(6)
        : constants_1.ZERO_BD.toFixed(6);
    pair.token1Price = !(0, big_js_1.Big)(reserve0Decimal).eq(constants_1.ZERO_BD)
        ? (0, big_js_1.Big)(reserve1Decimal).div(reserve0Decimal).toFixed(6)
        : constants_1.ZERO_BD.toFixed(6);
    await ctx.store.save(pair);
    // update ETH price now that reserves could have changed
    bundle.ethPrice = (await (0, pricing_1.getEthPriceInUSD)(ctx)).toFixed(6);
    await ctx.store.save(bundle);
    token0.derivedETH = (await (0, pricing_1.findEthPerToken)(ctx, token0.id)).toFixed(6);
    token1.derivedETH = (await (0, pricing_1.findEthPerToken)(ctx, token1.id)).toFixed(6);
    let trackedLiquidityETH = constants_1.ZERO_BD;
    if (!(0, big_js_1.Big)(bundle.ethPrice).eq(constants_1.ZERO_BD)) {
        const price0 = (0, big_js_1.Big)(token0.derivedETH).times(bundle.ethPrice);
        const price1 = (0, big_js_1.Big)(token1.derivedETH).times(bundle.ethPrice);
        // both are whitelist tokens, take average of both amounts
        if (pricing_1.WHITELIST.includes(token0.id) && pricing_1.WHITELIST.includes(token1.id)) {
            trackedLiquidityETH = (0, big_js_1.Big)(reserve0Decimal)
                .times(price0)
                .plus((0, big_js_1.Big)(reserve1Decimal)
                .times(price1));
        }
        // take double value of the whitelisted token amount
        if (pricing_1.WHITELIST.includes(token0.id) && !pricing_1.WHITELIST.includes(token1.id)) {
            trackedLiquidityETH = (0, big_js_1.Big)(reserve0Decimal).times(price0).times(2);
        }
        // take double value of the whitelisted token amount
        if (!pricing_1.WHITELIST.includes(token0.id) && pricing_1.WHITELIST.includes(token1.id)) {
            trackedLiquidityETH = (0, big_js_1.Big)(reserve1Decimal).times(price1).times(2);
        }
        trackedLiquidityETH = trackedLiquidityETH.div(bundle.ethPrice);
    }
    pair.trackedReserveETH = trackedLiquidityETH.toFixed(6);
    pair.reserveETH = (0, big_js_1.Big)(reserve0Decimal)
        .times(token0.derivedETH)
        .plus((0, big_js_1.Big)(reserve1Decimal).times(token1.derivedETH))
        .toFixed(6);
    pair.reserveUSD = (0, big_js_1.Big)(pair.reserveETH).times(bundle.ethPrice).toFixed(6);
    await ctx.store.save(pair);
    // use tracked amounts globally
    factory.totalLiquidityETH = (0, big_js_1.Big)(factory.totalLiquidityETH).plus(trackedLiquidityETH).toFixed(6);
    factory.totalLiquidityUSD = (0, big_js_1.Big)(factory.totalLiquidityETH).times(bundle.ethPrice).toFixed(6);
    await ctx.store.save(factory);
    // now correctly set liquidity amounts for each token
    token0.totalLiquidity = (0, big_js_1.Big)(token0.totalLiquidity).plus(pair.reserve0).toString();
    token1.totalLiquidity = (0, big_js_1.Big)(token1.totalLiquidity).plus(pair.reserve1).toString();
    await ctx.store.save([token0, token1]);
}
exports.handleLiquiditySync = handleLiquiditySync;
async function handleLiquidityAdded(ctx) {
    const txHash = ctx.event.extrinsic?.hash;
    if (!txHash)
        return;
    const transaction = await ctx.store.get(model_1.Transaction, txHash);
    // safety check
    if (!transaction)
        return;
    const { mints } = transaction;
    if (!mints.length)
        return;
    const mint = await ctx.store.get(model_1.Mint, mints[mints.length - 1]);
    if (!mint)
        return;
    const _event = new events_1.ZenlinkProtocolLiquidityAddedEvent(ctx, ctx.event);
    if (_event.isV902)
        return;
    const event = _event.asV906;
    const [asset0, asset1] = (0, sort_1.sortAssets)([event[1], event[2]]);
    const pair = await (0, pair_1.getPair)(ctx, [asset0, asset1]);
    if (!pair)
        return;
    await handleLiquiditySync(ctx, pair);
    const { token0, token1 } = pair;
    token0.txCount += 1;
    token1.txCount += 1;
    // update exchange info (except balances, sync will cover that)
    const token0Amount = (0, helpers_1.convertTokenToDecimal)(event[3], token0.decimals);
    const token1Amount = (0, helpers_1.convertTokenToDecimal)(event[4], token1.decimals);
    const bundle = (await ctx.store.get(model_1.Bundle, '1'));
    const factory = (await (0, utils_1.getFactory)(ctx));
    const amountTotalUSD = (0, big_js_1.Big)(token1.derivedETH)
        .times(token1Amount)
        .plus((0, big_js_1.Big)(token0.derivedETH).times(token0Amount))
        .times(bundle.ethPrice);
    pair.txCount += 1;
    factory.txCount += 1;
    await ctx.store.save(token0);
    await ctx.store.save(token1);
    await ctx.store.save(pair);
    await ctx.store.save(factory);
    mint.sender = (0, ss58_1.codec)(config_1.config.prefix).encode(event[0]);
    mint.amount0 = token0Amount.toFixed(6);
    mint.amount1 = token1Amount.toFixed(6);
    mint.logIndex = ctx.event.indexInBlock;
    mint.amountUSD = amountTotalUSD.toFixed(6);
    await ctx.store.save(mint);
    const user = (await ctx.store.get(model_1.User, mint.to));
    // update the LP position
    const liquidityPosition = await (0, token_2.updateLiquidityPosition)(ctx, pair, user);
    await (0, token_2.createLiquiditySnapShot)(ctx, pair, liquidityPosition);
    // update day entities
    await (0, updates_1.updatePairDayData)(ctx, pair);
    await (0, updates_1.updatePairHourData)(ctx, pair);
    await (0, updates_1.updateFactoryDayData)(ctx);
    await (0, updates_1.updateTokenDayData)(ctx, token0);
    await (0, updates_1.updateTokenDayData)(ctx, token1);
}
exports.handleLiquidityAdded = handleLiquidityAdded;
async function handleLiquidityRemoved(ctx) {
    const txHash = ctx.event.extrinsic?.hash;
    if (!txHash)
        return;
    const transaction = await ctx.store.get(model_1.Transaction, txHash);
    if (!transaction)
        return;
    const { burns } = transaction;
    if (!burns.length)
        return;
    const burn = await ctx.store.get(model_1.Burn, burns[burns.length - 1]);
    if (!burn)
        return;
    const _event = new events_1.ZenlinkProtocolLiquidityRemovedEvent(ctx, ctx.event);
    if (_event.isV902)
        return;
    const event = _event.asV906;
    const [asset0, asset1] = (0, sort_1.sortAssets)([event[2], event[3]]);
    const pair = await (0, pair_1.getPair)(ctx, [asset0, asset1]);
    if (!pair)
        return;
    await handleLiquiditySync(ctx, pair);
    const factory = (await (0, utils_1.getFactory)(ctx));
    // update txn counts
    pair.txCount += 1;
    // update txn counts
    factory.txCount += 1;
    // update txn counts
    const { token0, token1 } = pair;
    token0.txCount += 1;
    token1.txCount += 1;
    const token0Amount = (0, helpers_1.convertTokenToDecimal)(BigInt(event[4]), token0.decimals);
    const token1Amount = (0, helpers_1.convertTokenToDecimal)(BigInt(event[5]), token1.decimals);
    const bundle = (await ctx.store.get(model_1.Bundle, '1'));
    const amountTotalUSD = (0, big_js_1.Big)(token1.derivedETH)
        .times(token1Amount)
        .plus((0, big_js_1.Big)(token0.derivedETH).times(token0Amount))
        .times(bundle.ethPrice);
    const sender = (0, ss58_1.codec)(config_1.config.prefix).encode(event[0]);
    const to = (0, ss58_1.codec)(config_1.config.prefix).encode(event[0]);
    let user = await ctx.store.get(model_1.User, sender);
    if (!user) {
        user = new model_1.User({
            id: sender,
            liquidityPositions: [],
            stableSwapLiquidityPositions: [],
            usdSwapped: constants_1.ZERO_BD.toFixed(6)
        });
        await ctx.store.save(user);
    }
    await (0, token_2.updateLiquidityPosition)(ctx, pair, user);
    await ctx.store.save(factory);
    await ctx.store.save(pair);
    await handleLiquiditySync(ctx, pair);
    await ctx.store.save([token0, token1]);
    burn.sender = sender;
    burn.to = to;
    burn.amount0 = token0Amount.toFixed(6);
    burn.amount1 = token1Amount.toFixed(6);
    burn.logIndex = ctx.event.indexInBlock;
    burn.amountUSD = amountTotalUSD.toFixed(6);
    await ctx.store.save(burn);
    // update the LP position
    const liquidityPosition = await (0, token_2.updateLiquidityPosition)(ctx, pair, user);
    await (0, token_2.createLiquiditySnapShot)(ctx, pair, liquidityPosition);
    // update day entities
    await (0, updates_1.updatePairDayData)(ctx, pair);
    await (0, updates_1.updatePairHourData)(ctx, pair);
    await (0, updates_1.updateFactoryDayData)(ctx);
    await (0, updates_1.updateTokenDayData)(ctx, token0);
    await (0, updates_1.updateTokenDayData)(ctx, token1);
}
exports.handleLiquidityRemoved = handleLiquidityRemoved;
async function handleAssetSwap(ctx) {
    const txHash = ctx.event.extrinsic?.hash;
    if (!txHash)
        return;
    const _event = new events_1.ZenlinkProtocolAssetSwapEvent(ctx, ctx.event);
    if (_event.isV902)
        return;
    const event = _event.asV906;
    const path = event[2];
    const amounts = event[3];
    const sender = (0, ss58_1.codec)(config_1.config.prefix).encode(event[0]);
    const to = (0, ss58_1.codec)(config_1.config.prefix).encode(event[1]);
    for (let i = 1; i < path.length; i++) {
        const asset0 = path[i - 1];
        const asset1 = path[i];
        const pair = await (0, pair_1.getPair)(ctx, [asset0, asset1]);
        if (!pair)
            return;
        await handleLiquiditySync(ctx, pair);
        const factory = await (0, utils_1.getFactory)(ctx);
        if (!pair || !factory)
            return;
        const bundle = (await ctx.store.get(model_1.Bundle, '1'));
        const { token0, token1 } = pair;
        const amount0In = (0, helpers_1.convertTokenToDecimal)(amounts[i - 1], token0.decimals);
        const amount0Out = (0, helpers_1.convertTokenToDecimal)(0n, token0.decimals);
        const amount0Total = amount0Out.plus(amount0In);
        const amount1In = (0, helpers_1.convertTokenToDecimal)(0n, token1.decimals);
        const amount1Out = (0, helpers_1.convertTokenToDecimal)(amounts[i], token1.decimals);
        const amount1Total = amount1Out.plus(amount1In);
        // get total amounts of derived USD and ETH for tracking
        const derivedAmountETH = (0, big_js_1.Big)(token1.derivedETH)
            .times(amount1Total)
            .plus((0, big_js_1.Big)(token0.derivedETH).times(amount0Total))
            .div(2);
        const derivedAmountUSD = derivedAmountETH.times(bundle.ethPrice);
        // only accounts for volume through white listed tokens
        let trackedAmountUSD = constants_1.ZERO_BD;
        const price0 = (0, big_js_1.Big)(token0.derivedETH).times(bundle.ethPrice);
        const price1 = (0, big_js_1.Big)(token1.derivedETH).times(bundle.ethPrice);
        const reserve0USD = (0, helpers_1.convertTokenToDecimal)(BigInt(pair.reserve0), token0.decimals).times(price0);
        const reserve1USD = (0, helpers_1.convertTokenToDecimal)(BigInt(pair.reserve1), token1.decimals).times(price1);
        // if less than 5 LPs, require high minimum reserve amount amount or return 0
        if (pair.liquidityProviderCount < 5 &&
            ((pricing_1.WHITELIST.includes(token0.id) &&
                pricing_1.WHITELIST.includes(token1.id) &&
                reserve0USD.plus(reserve1USD).lt(pricing_1.MINIMUM_USD_THRESHOLD_NEW_PAIRS)) ||
                (pricing_1.WHITELIST.includes(token0.id) &&
                    !pricing_1.WHITELIST.includes(token1.id) &&
                    reserve0USD.times(2).lt(pricing_1.MINIMUM_USD_THRESHOLD_NEW_PAIRS)) ||
                (!pricing_1.WHITELIST.includes(token0.id) &&
                    pricing_1.WHITELIST.includes(token1.id) &&
                    reserve1USD.times(2).lt(pricing_1.MINIMUM_USD_THRESHOLD_NEW_PAIRS)))) {
            // do nothing
        }
        else {
            // both are whitelist tokens, take average of both amounts
            if (pricing_1.WHITELIST.includes(token0.id) && pricing_1.WHITELIST.includes(token1.id)) {
                trackedAmountUSD = amount0Total.times(price0).plus(amount1Total.times(price1)).div(2);
            }
            // take full value of the whitelisted token amount
            if (pricing_1.WHITELIST.includes(token0.id) && !pricing_1.WHITELIST.includes(token1.id)) {
                trackedAmountUSD = amount0Total.times(price0);
            }
            // take full value of the whitelisted token amount
            if (!pricing_1.WHITELIST.includes(token0.id) && pricing_1.WHITELIST.includes(token1.id)) {
                trackedAmountUSD = amount1Total.times(price1);
            }
        }
        const trackedAmountETH = (0, big_js_1.Big)(bundle.ethPrice).eq(constants_1.ZERO_BD)
            ? constants_1.ZERO_BD
            : trackedAmountUSD.div(bundle.ethPrice);
        // update token0 global volume and token liquidity stats
        token0.tradeVolume = (0, big_js_1.Big)(token0.tradeVolume).plus(amount0Total).toFixed(6);
        token0.tradeVolumeUSD = (0, big_js_1.Big)(token0.tradeVolumeUSD).plus(trackedAmountUSD).toFixed(6);
        token0.untrackedVolumeUSD = (0, big_js_1.Big)(token0.untrackedVolumeUSD).plus(derivedAmountUSD).toFixed(6);
        token0.txCount += 1;
        // update token1 global volume and token liquidity stats
        token1.tradeVolume = (0, big_js_1.Big)(token1.tradeVolume).plus(amount1Total).toFixed(6);
        token1.tradeVolumeUSD = (0, big_js_1.Big)(token1.tradeVolumeUSD).plus(trackedAmountUSD).toFixed(6);
        token1.untrackedVolumeUSD = (0, big_js_1.Big)(token1.untrackedVolumeUSD).plus(derivedAmountUSD).toFixed(6);
        token1.txCount += 1;
        await ctx.store.save([token0, token1]);
        // update pair volume data, use tracked amount if we have it as its probably more accurate
        pair.volumeUSD = (0, big_js_1.Big)(pair.volumeUSD).plus(trackedAmountUSD).toFixed(6);
        pair.volumeToken0 = (0, big_js_1.Big)(pair.volumeToken0).plus(amount0Total).toFixed(6);
        pair.volumeToken1 = (0, big_js_1.Big)(pair.volumeToken1).plus(amount1Total).toFixed(6);
        pair.untrackedVolumeUSD = (0, big_js_1.Big)(pair.untrackedVolumeUSD).plus(derivedAmountUSD).toFixed(6);
        pair.txCount += 1;
        await ctx.store.save(pair);
        // update global values, only used tracked amounts for volume
        factory.totalVolumeUSD = (0, big_js_1.Big)(factory.totalVolumeUSD).plus(trackedAmountUSD).toFixed(6);
        factory.totalVolumeETH = (0, big_js_1.Big)(factory.totalVolumeETH).plus(trackedAmountETH).toFixed(6);
        factory.untrackedVolumeUSD = (0, big_js_1.Big)(factory.untrackedVolumeUSD).plus(derivedAmountUSD).toFixed(6);
        factory.txCount += 1;
        await ctx.store.save(factory);
        let transaction = await (0, utils_1.getTransaction)(ctx, txHash);
        if (!transaction) {
            transaction = new model_1.Transaction({
                id: txHash,
                blockNumber: BigInt(ctx.block.height),
                timestamp: new Date(ctx.block.timestamp),
                mints: [],
                swaps: [],
                burns: [],
            });
            await ctx.store.save(transaction);
        }
        const swapId = `${transaction.id}-${transaction.swaps.length}`;
        transaction.swaps.push(swapId);
        await ctx.store.save(transaction);
        const swap = new model_1.Swap({
            id: swapId,
            transaction,
            pair,
            timestamp: new Date(ctx.block.timestamp),
            amount0In: amount0In.toFixed(6),
            amount1In: amount1In.toFixed(6),
            amount0Out: amount0Out.toFixed(6),
            amount1Out: amount1Out.toFixed(6),
            sender: sender.toLowerCase(),
            from: sender.toLowerCase(),
            to: to.toLowerCase(),
            logIndex: ctx.event.indexInBlock,
            amountUSD: trackedAmountUSD.eq(constants_1.ZERO_BD)
                ? derivedAmountUSD.toFixed(6)
                : trackedAmountUSD.toFixed(6),
        });
        await ctx.store.save(swap);
        const pairDayData = await (0, updates_1.updatePairDayData)(ctx, pair);
        const pairHourData = await (0, updates_1.updatePairHourData)(ctx, pair);
        const factoryDayData = await (0, updates_1.updateFactoryDayData)(ctx);
        const token0DayData = await (0, updates_1.updateTokenDayData)(ctx, token0);
        const token1DayData = await (0, updates_1.updateTokenDayData)(ctx, token1);
        await (0, updates_1.updateZenlinkInfo)(ctx);
        // swap specific updating
        factoryDayData.dailyVolumeUSD = (0, big_js_1.Big)(factoryDayData.dailyVolumeUSD).plus(trackedAmountUSD).toFixed(6);
        factoryDayData.dailyVolumeETH = (0, big_js_1.Big)(factoryDayData.dailyVolumeETH).plus(trackedAmountETH).toFixed(6);
        factoryDayData.dailyVolumeUntracked = (0, big_js_1.Big)(factoryDayData.dailyVolumeUntracked).plus(derivedAmountUSD).toFixed(6);
        await ctx.store.save(factoryDayData);
        // swap specific updating for pair
        pairDayData.dailyVolumeToken0 = (0, big_js_1.Big)(pairDayData.dailyVolumeToken0).plus(amount0Total).toFixed(6);
        pairDayData.dailyVolumeToken1 = (0, big_js_1.Big)(pairDayData.dailyVolumeToken1).plus(amount1Total).toFixed(6);
        pairDayData.dailyVolumeUSD = (0, big_js_1.Big)(pairDayData.dailyVolumeUSD).plus(trackedAmountUSD).toFixed(6);
        await ctx.store.save(pairDayData);
        pairHourData.hourlyVolumeToken0 = (0, big_js_1.Big)(pairHourData.hourlyVolumeToken0).plus(amount0Total).toFixed(6);
        pairHourData.hourlyVolumeToken1 = (0, big_js_1.Big)(pairHourData.hourlyVolumeToken1).plus(amount1Total).toFixed(6);
        pairHourData.hourlyVolumeUSD = (0, big_js_1.Big)(pairHourData.hourlyVolumeUSD).plus(trackedAmountUSD).toFixed(6);
        await ctx.store.save(pairHourData);
        // swap specific updating for token0
        token0DayData.dailyVolumeToken = (0, big_js_1.Big)(token0DayData.dailyVolumeToken).plus(amount0Total).toFixed(6);
        token0DayData.dailyVolumeETH = (0, big_js_1.Big)(token0DayData.dailyVolumeETH)
            .plus(amount0Total.times(token0.derivedETH))
            .toFixed(6);
        token0DayData.dailyVolumeUSD = (0, big_js_1.Big)(token0DayData.dailyVolumeUSD)
            .plus(amount0Total.times(token0.derivedETH).times(bundle.ethPrice))
            .toFixed(6);
        await ctx.store.save(token0DayData);
        // swap specific updating
        token1DayData.dailyVolumeToken = (0, big_js_1.Big)(token1DayData.dailyVolumeToken)
            .plus(amount1Total)
            .toFixed(6);
        token1DayData.dailyVolumeETH = (0, big_js_1.Big)(token1DayData.dailyVolumeETH)
            .plus(amount1Total.times(token1.derivedETH))
            .toFixed(6);
        token1DayData.dailyVolumeUSD = (0, big_js_1.Big)(token1DayData.dailyVolumeUSD).plus(amount1Total.times(token1.derivedETH).times(bundle.ethPrice)).toFixed(6);
        await ctx.store.save(token1DayData);
    }
}
exports.handleAssetSwap = handleAssetSwap;
//# sourceMappingURL=protocol.js.map