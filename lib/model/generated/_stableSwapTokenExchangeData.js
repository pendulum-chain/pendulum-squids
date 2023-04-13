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
exports.StableSwapTokenExchangeData = void 0;
const assert_1 = __importDefault(require("assert"));
const marshal = __importStar(require("./marshal"));
class StableSwapTokenExchangeData {
    constructor(props, json) {
        this.isTypeOf = 'StableSwapTokenExchangeData';
        Object.assign(this, props);
        if (json != null) {
            this._buyer = marshal.bytes.fromJSON(json.buyer);
            this._boughtId = marshal.bigint.fromJSON(json.boughtId);
            this._tokensBought = marshal.bigint.fromJSON(json.tokensBought);
            this._soldId = marshal.bigint.fromJSON(json.soldId);
            this._tokensSold = marshal.bigint.fromJSON(json.tokensSold);
        }
    }
    get buyer() {
        (0, assert_1.default)(this._buyer != null, 'uninitialized access');
        return this._buyer;
    }
    set buyer(value) {
        this._buyer = value;
    }
    get boughtId() {
        (0, assert_1.default)(this._boughtId != null, 'uninitialized access');
        return this._boughtId;
    }
    set boughtId(value) {
        this._boughtId = value;
    }
    get tokensBought() {
        (0, assert_1.default)(this._tokensBought != null, 'uninitialized access');
        return this._tokensBought;
    }
    set tokensBought(value) {
        this._tokensBought = value;
    }
    get soldId() {
        (0, assert_1.default)(this._soldId != null, 'uninitialized access');
        return this._soldId;
    }
    set soldId(value) {
        this._soldId = value;
    }
    get tokensSold() {
        (0, assert_1.default)(this._tokensSold != null, 'uninitialized access');
        return this._tokensSold;
    }
    set tokensSold(value) {
        this._tokensSold = value;
    }
    toJSON() {
        return {
            isTypeOf: this.isTypeOf,
            buyer: marshal.bytes.toJSON(this.buyer),
            boughtId: marshal.bigint.toJSON(this.boughtId),
            tokensBought: marshal.bigint.toJSON(this.tokensBought),
            soldId: marshal.bigint.toJSON(this.soldId),
            tokensSold: marshal.bigint.toJSON(this.tokensSold),
        };
    }
}
exports.StableSwapTokenExchangeData = StableSwapTokenExchangeData;
//# sourceMappingURL=_stableSwapTokenExchangeData.js.map