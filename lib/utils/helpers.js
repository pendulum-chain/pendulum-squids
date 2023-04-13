"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTimePerBlock = exports.createLiquidityPosition = exports.convertTokenToDecimal = void 0;
const big_js_1 = require("big.js");
const constants_1 = require("../constants");
const model_1 = require("../model");
function convertTokenToDecimal(amount, decimals) {
    return (0, big_js_1.Big)(amount.toString()).div((10 ** decimals));
}
exports.convertTokenToDecimal = convertTokenToDecimal;
function createLiquidityPosition(data) {
    const { pair, user } = data;
    return new model_1.LiquidityPosition({
        id: `${pair.id}-${user.id}`,
        liquidityTokenBalance: constants_1.ZERO_BD.toString(),
        pair,
        user,
    });
}
exports.createLiquidityPosition = createLiquidityPosition;
const BLOCK_RECORD = {
    pre: {
        blockHeight: 0,
        timestamp: 0,
    },
    middle: {
        blockHeight: 0,
        timestamp: 0,
    },
    cur: {
        blockHeight: 0,
        timestamp: 0,
    }
};
async function getTimePerBlock(ctx) {
    if (BLOCK_RECORD.pre.blockHeight === 0) {
        BLOCK_RECORD.pre.blockHeight = ctx.block.height;
        BLOCK_RECORD.pre.timestamp = ctx.block.timestamp;
        BLOCK_RECORD.middle.blockHeight = ctx.block.height;
        BLOCK_RECORD.middle.timestamp = ctx.block.timestamp;
    }
    BLOCK_RECORD.cur.blockHeight = ctx.block.height;
    BLOCK_RECORD.cur.timestamp = ctx.block.timestamp;
    const blockDiff = BLOCK_RECORD.cur.blockHeight - BLOCK_RECORD.pre.blockHeight;
    const blockMidDiff = BLOCK_RECORD.cur.blockHeight - BLOCK_RECORD.middle.blockHeight;
    if (blockDiff > 10000 && blockMidDiff > 5000) {
        BLOCK_RECORD.pre.blockHeight = BLOCK_RECORD.middle.blockHeight;
        BLOCK_RECORD.pre.timestamp = BLOCK_RECORD.middle.timestamp;
        BLOCK_RECORD.middle.blockHeight = ctx.block.height;
        BLOCK_RECORD.middle.timestamp = ctx.block.timestamp;
    }
    const blocks = BLOCK_RECORD.cur.blockHeight - BLOCK_RECORD.pre.blockHeight;
    const currentTimestamp = BLOCK_RECORD.cur.timestamp;
    const anchorTimestamp = BLOCK_RECORD.pre.timestamp;
    const averageBlock = (currentTimestamp - anchorTimestamp) / blocks;
    if (blocks <= 0)
        return 12000;
    return averageBlock;
}
exports.getTimePerBlock = getTimePerBlock;
//# sourceMappingURL=helpers.js.map