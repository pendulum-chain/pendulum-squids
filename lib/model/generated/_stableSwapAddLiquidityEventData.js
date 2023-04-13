"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StableSwapAddLiquidityEventData = void 0;
const assert_1 = __importDefault(require("assert"));
const marshal = __importStar(require("./marshal"));
class StableSwapAddLiquidityEventData {
    constructor(props, json) {
        this.isTypeOf = 'StableSwapAddLiquidityEventData';
        Object.assign(this, props);
        if (json != null) {
            this._provider = marshal.bytes.fromJSON(json.provider);
            this._tokenAmounts = marshal.fromList(json.tokenAmounts, val => marshal.bigint.fromJSON(val));
            this._fees = marshal.fromList(json.fees, val => marshal.bigint.fromJSON(val));
            this._invariant = json.invariant == null ? undefined : marshal.bigint.fromJSON(json.invariant);
            this._lpTokenSupply = marshal.bigint.fromJSON(json.lpTokenSupply);
        }
    }
    get provider() {
        (0, assert_1.default)(this._provider != null, 'uninitialized access');
        return this._provider;
    }
    set provider(value) {
        this._provider = value;
    }
    get tokenAmounts() {
        (0, assert_1.default)(this._tokenAmounts != null, 'uninitialized access');
        return this._tokenAmounts;
    }
    set tokenAmounts(value) {
        this._tokenAmounts = value;
    }
    get fees() {
        (0, assert_1.default)(this._fees != null, 'uninitialized access');
        return this._fees;
    }
    set fees(value) {
        this._fees = value;
    }
    get invariant() {
        return this._invariant;
    }
    set invariant(value) {
        this._invariant = value;
    }
    get lpTokenSupply() {
        (0, assert_1.default)(this._lpTokenSupply != null, 'uninitialized access');
        return this._lpTokenSupply;
    }
    set lpTokenSupply(value) {
        this._lpTokenSupply = value;
    }
    toJSON() {
        return {
            isTypeOf: this.isTypeOf,
            provider: marshal.bytes.toJSON(this.provider),
            tokenAmounts: this.tokenAmounts.map((val) => marshal.bigint.toJSON(val)),
            fees: this.fees.map((val) => marshal.bigint.toJSON(val)),
            invariant: this.invariant == null ? undefined : marshal.bigint.toJSON(this.invariant),
            lpTokenSupply: marshal.bigint.toJSON(this.lpTokenSupply),
        };
    }
}
exports.StableSwapAddLiquidityEventData = StableSwapAddLiquidityEventData;
//# sourceMappingURL=_stableSwapAddLiquidityEventData.js.map