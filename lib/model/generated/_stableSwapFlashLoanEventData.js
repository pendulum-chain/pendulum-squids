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
exports.StableSwapFlashLoanEventData = void 0;
const assert_1 = __importDefault(require("assert"));
const marshal = __importStar(require("./marshal"));
class StableSwapFlashLoanEventData {
    constructor(props, json) {
        this.isTypeOf = 'StableSwapFlashLoanEventData';
        Object.assign(this, props);
        if (json != null) {
            this._caller = marshal.bytes.fromJSON(json.caller);
            this._receiver = marshal.bytes.fromJSON(json.receiver);
            this._amountsOut = marshal.fromList(json.amountsOut, val => marshal.bigint.fromJSON(val));
        }
    }
    get caller() {
        (0, assert_1.default)(this._caller != null, 'uninitialized access');
        return this._caller;
    }
    set caller(value) {
        this._caller = value;
    }
    get receiver() {
        (0, assert_1.default)(this._receiver != null, 'uninitialized access');
        return this._receiver;
    }
    set receiver(value) {
        this._receiver = value;
    }
    get amountsOut() {
        (0, assert_1.default)(this._amountsOut != null, 'uninitialized access');
        return this._amountsOut;
    }
    set amountsOut(value) {
        this._amountsOut = value;
    }
    toJSON() {
        return {
            isTypeOf: this.isTypeOf,
            caller: marshal.bytes.toJSON(this.caller),
            receiver: marshal.bytes.toJSON(this.receiver),
            amountsOut: this.amountsOut.map((val) => marshal.bigint.toJSON(val)),
        };
    }
}
exports.StableSwapFlashLoanEventData = StableSwapFlashLoanEventData;
//# sourceMappingURL=_stableSwapFlashLoanEventData.js.map