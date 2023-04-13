"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findEthPerToken = exports.getEthPriceInUSD = exports.MINIMUM_LIQUIDITY_THRESHOLD_ETH = exports.MINIMUM_USD_THRESHOLD_NEW_PAIRS = exports.WHITELIST = exports.WNATIVE_USDC = exports.aUSD = exports.KSM = exports.USDC = exports.WNATIVE = void 0;
const big_js_1 = require("big.js");
const constants_1 = require("../constants");
const pair_1 = require("../entities/pair");
const token_1 = require("../entities/token");
const model_1 = require("../model");
const token_2 = require("./token");
exports.WNATIVE = '2001-0-0';
exports.USDC = '2001-2-2048';
exports.KSM = '2001-2-516';
exports.aUSD = '2001-2-770';
exports.WNATIVE_USDC = '2001-2-8796093023744';
exports.WHITELIST = [
    '2001-0-0',
    '2001-2-2048',
    '2001-2-519',
    '2001-2-516' // ksm
];
// minimum liquidity required to count towards tracked volume for pairs with small # of Lps
exports.MINIMUM_USD_THRESHOLD_NEW_PAIRS = new big_js_1.Big(1000);
// minimum liquidity for price to get tracked
exports.MINIMUM_LIQUIDITY_THRESHOLD_ETH = new big_js_1.Big(5);
async function getEthPriceInUSD(ctx) {
    const usdcPair = await (0, pair_1.getPair)(ctx, [(0, token_2.assetIdFromAddress)(exports.WNATIVE), (0, token_2.assetIdFromAddress)(exports.USDC)]);
    if (usdcPair) {
        return usdcPair.token0.id === exports.USDC
            ? (0, big_js_1.Big)(usdcPair.token0Price)
            : (0, big_js_1.Big)(usdcPair.token1Price);
    }
    // get ethprice from bnc-ksm > ksm-aUSD pair
    const ksmPair = await (0, pair_1.getPair)(ctx, [(0, token_2.assetIdFromAddress)(exports.KSM), (0, token_2.assetIdFromAddress)(exports.aUSD)]);
    const wnativePair = await (0, pair_1.getPair)(ctx, [(0, token_2.assetIdFromAddress)(exports.WNATIVE), (0, token_2.assetIdFromAddress)(exports.KSM)]);
    if (ksmPair && wnativePair) {
        const ksmPrice = ksmPair.token0.id === exports.aUSD
            ? (0, big_js_1.Big)(ksmPair.token0Price)
            : (0, big_js_1.Big)(ksmPair.token1Price);
        return wnativePair.token0.id === exports.KSM
            ? (0, big_js_1.Big)(wnativePair.token0Price).mul(ksmPrice)
            : (0, big_js_1.Big)(wnativePair.token1Price).mul(ksmPrice);
    }
    return (0, big_js_1.Big)(0);
}
exports.getEthPriceInUSD = getEthPriceInUSD;
/**
 * Search through graph to find derived Eth per token.
 * @todo update to be derived ETH (plus stablecoin estimates)
 * */
async function findEthPerToken(ctx, tokenId) {
    if (tokenId === exports.WNATIVE) {
        return constants_1.ONE_BD;
    }
    const whitelistPairs = await ctx.store.find(model_1.Pair, {
        where: exports.WHITELIST.map((address) => [
            { token0: { id: address }, token1: { id: tokenId } },
            { token1: { id: address }, token0: { id: tokenId } },
        ]).flat(),
        relations: {
            token0: true,
            token1: true,
        },
    });
    // loop through whitelist and check if paired with any
    for (const pair of whitelistPairs) {
        if ((0, big_js_1.Big)(pair.reserveETH).gt(exports.MINIMUM_LIQUIDITY_THRESHOLD_ETH)) {
            if (pair.token0.id === tokenId) {
                const token1 = (await (0, token_1.getOrCreateToken)(ctx, (0, token_2.assetIdFromAddress)(pair.token1.id)));
                return (0, big_js_1.Big)(pair.token1Price).mul(token1.derivedETH); // return token1 per our token * Eth per token 1
            }
            if (pair.token1.id === tokenId) {
                const token0 = (await (0, token_1.getOrCreateToken)(ctx, (0, token_2.assetIdFromAddress)(pair.token0.id)));
                return (0, big_js_1.Big)(pair.token0Price).mul(token0.derivedETH); // return token0 per our token * ETH per token 0
            }
        }
    }
    return constants_1.ZERO_BD; // nothing was found return 0
}
exports.findEthPerToken = findEthPerToken;
//# sourceMappingURL=pricing.js.map