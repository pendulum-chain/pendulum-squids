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
exports.StableSwapNewFeeEventData = void 0;
const assert_1 = __importDefault(require("assert"));
const marshal = __importStar(require("./marshal"));
class StableSwapNewFeeEventData {
    constructor(props, json) {
        this.isTypeOf = 'StableSwapNewFeeEventData';
        Object.assign(this, props);
        if (json != null) {
            this._swapFee = marshal.bigint.fromJSON(json.swapFee);
            this._adminFee = marshal.bigint.fromJSON(json.adminFee);
        }
    }
    get swapFee() {
        (0, assert_1.default)(this._swapFee != null, 'uninitialized access');
        return this._swapFee;
    }
    set swapFee(value) {
        this._swapFee = value;
    }
    get adminFee() {
        (0, assert_1.default)(this._adminFee != null, 'uninitialized access');
        return this._adminFee;
    }
    set adminFee(value) {
        this._adminFee = value;
    }
    toJSON() {
        return {
            isTypeOf: this.isTypeOf,
            swapFee: marshal.bigint.toJSON(this.swapFee),
            adminFee: marshal.bigint.toJSON(this.adminFee),
        };
    }
}
exports.StableSwapNewFeeEventData = StableSwapNewFeeEventData;
//# sourceMappingURL=_stableSwapNewFeeEventData.js.map