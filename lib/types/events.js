"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZenlinkProtocolLiquidityRemovedEvent = exports.ZenlinkProtocolLiquidityAddedEvent = exports.ZenlinkProtocolAssetSwapEvent = exports.BalancesTransferEvent = void 0;
const assert_1 = __importDefault(require("assert"));
class BalancesTransferEvent {
    constructor(ctx, event) {
        event = event || ctx.event;
        (0, assert_1.default)(event.name === 'Balances.Transfer');
        this._chain = ctx._chain;
        this.event = event;
    }
    /**
     *  Transfer succeeded (from, to, value, fees).
     */
    get isV1020() {
        return this._chain.getEventHash('Balances.Transfer') === '72e6f0d399a72f77551d560f52df25d757e0643d0192b3bc837cbd91b6f36b27';
    }
    /**
     *  Transfer succeeded (from, to, value, fees).
     */
    get asV1020() {
        (0, assert_1.default)(this.isV1020);
        return this._chain.decodeEvent(this.event);
    }
    /**
     *  Transfer succeeded (from, to, value).
     */
    get isV1050() {
        return this._chain.getEventHash('Balances.Transfer') === 'dad2bcdca357505fa3c7832085d0db53ce6f902bd9f5b52823ee8791d351872c';
    }
    /**
     *  Transfer succeeded (from, to, value).
     */
    get asV1050() {
        (0, assert_1.default)(this.isV1050);
        return this._chain.decodeEvent(this.event);
    }
    /**
     * Transfer succeeded.
     */
    get isV9130() {
        return this._chain.getEventHash('Balances.Transfer') === '0ffdf35c495114c2d42a8bf6c241483fd5334ca0198662e14480ad040f1e3a66';
    }
    /**
     * Transfer succeeded.
     */
    get asV9130() {
        (0, assert_1.default)(this.isV9130);
        return this._chain.decodeEvent(this.event);
    }
}
exports.BalancesTransferEvent = BalancesTransferEvent;
class ZenlinkProtocolAssetSwapEvent {
    constructor(ctx, event) {
        event = event || ctx.event;
        (0, assert_1.default)(event.name === 'ZenlinkProtocol.AssetSwap');
        this._chain = ctx._chain;
        this.event = event;
    }
    /**
     *  Transact in trading \[owner, recipient, swap_path, balances\]
     */
    get isV902() {
        return this._chain.getEventHash('ZenlinkProtocol.AssetSwap') === '159d6d9238d17b02ab3a687e4f6089399a062c5efe1bfaa809934fce8349d0c5';
    }
    /**
     *  Transact in trading \[owner, recipient, swap_path, balances\]
     */
    get asV902() {
        (0, assert_1.default)(this.isV902);
        return this._chain.decodeEvent(this.event);
    }
    /**
     * Transact in trading \[owner, recipient, swap_path, balances\]
     */
    get isV906() {
        return this._chain.getEventHash('ZenlinkProtocol.AssetSwap') === 'e9cbb9bf25ce7ca78f66cb163c5de7b5b796a1f9f5cf2f1d1955496bd76f264e';
    }
    /**
     * Transact in trading \[owner, recipient, swap_path, balances\]
     */
    get asV906() {
        (0, assert_1.default)(this.isV906);
        return this._chain.decodeEvent(this.event);
    }
}
exports.ZenlinkProtocolAssetSwapEvent = ZenlinkProtocolAssetSwapEvent;
class ZenlinkProtocolLiquidityAddedEvent {
    constructor(ctx, event) {
        event = event || ctx.event;
        (0, assert_1.default)(event.name === 'ZenlinkProtocol.LiquidityAdded');
        this._chain = ctx._chain;
        this.event = event;
    }
    /**
     *  Add liquidity. \[owner, asset_0, asset_1, add_balance_0, add_balance_1,
     *  mint_balance_lp\]
     */
    get isV902() {
        return this._chain.getEventHash('ZenlinkProtocol.LiquidityAdded') === '5fa357ce7da650f5b735003f8e97db8c734e1f20971d8bbd1aa763d2234bd502';
    }
    /**
     *  Add liquidity. \[owner, asset_0, asset_1, add_balance_0, add_balance_1,
     *  mint_balance_lp\]
     */
    get asV902() {
        (0, assert_1.default)(this.isV902);
        return this._chain.decodeEvent(this.event);
    }
    /**
     * Add liquidity. \[owner, asset_0, asset_1, add_balance_0, add_balance_1,
     * mint_balance_lp\]
     */
    get isV906() {
        return this._chain.getEventHash('ZenlinkProtocol.LiquidityAdded') === '1bfafadda80f84623e855502fa86cbd5fb805fa26a6254ee45104d1d976c2219';
    }
    /**
     * Add liquidity. \[owner, asset_0, asset_1, add_balance_0, add_balance_1,
     * mint_balance_lp\]
     */
    get asV906() {
        (0, assert_1.default)(this.isV906);
        return this._chain.decodeEvent(this.event);
    }
}
exports.ZenlinkProtocolLiquidityAddedEvent = ZenlinkProtocolLiquidityAddedEvent;
class ZenlinkProtocolLiquidityRemovedEvent {
    constructor(ctx, event) {
        event = event || ctx.event;
        (0, assert_1.default)(event.name === 'ZenlinkProtocol.LiquidityRemoved');
        this._chain = ctx._chain;
        this.event = event;
    }
    /**
     *  Remove liquidity. \[owner, recipient, asset_0, asset_1, rm_balance_0, rm_balance_1,
     *  burn_balance_lp\]
     */
    get isV902() {
        return this._chain.getEventHash('ZenlinkProtocol.LiquidityRemoved') === 'ed57df84841c01932655b4a0801d9728dd07d3b3f51c350a1a20d3731f980afb';
    }
    /**
     *  Remove liquidity. \[owner, recipient, asset_0, asset_1, rm_balance_0, rm_balance_1,
     *  burn_balance_lp\]
     */
    get asV902() {
        (0, assert_1.default)(this.isV902);
        return this._chain.decodeEvent(this.event);
    }
    /**
     * Remove liquidity. \[owner, recipient, asset_0, asset_1, rm_balance_0, rm_balance_1,
     * burn_balance_lp\]
     */
    get isV906() {
        return this._chain.getEventHash('ZenlinkProtocol.LiquidityRemoved') === '9decbbc0fd030ae8322c18bf256e4f3ace487600f6cf3b11b8961ab923a40bf1';
    }
    /**
     * Remove liquidity. \[owner, recipient, asset_0, asset_1, rm_balance_0, rm_balance_1,
     * burn_balance_lp\]
     */
    get asV906() {
        (0, assert_1.default)(this.isV906);
        return this._chain.decodeEvent(this.event);
    }
}
exports.ZenlinkProtocolLiquidityRemovedEvent = ZenlinkProtocolLiquidityRemovedEvent;
//# sourceMappingURL=events.js.map