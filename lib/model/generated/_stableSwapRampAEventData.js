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
exports.StableSwapRampAEventData = void 0;
const assert_1 = __importDefault(require("assert"));
const marshal = __importStar(require("./marshal"));
class StableSwapRampAEventData {
    constructor(props, json) {
        this.isTypeOf = 'StableSwapRampAEventData';
        Object.assign(this, props);
        if (json != null) {
            this._oldA = marshal.bigint.fromJSON(json.oldA);
            this._newA = marshal.bigint.fromJSON(json.newA);
            this._initialTime = marshal.bigint.fromJSON(json.initialTime);
            this._futureTime = marshal.bigint.fromJSON(json.futureTime);
        }
    }
    get oldA() {
        (0, assert_1.default)(this._oldA != null, 'uninitialized access');
        return this._oldA;
    }
    set oldA(value) {
        this._oldA = value;
    }
    get newA() {
        (0, assert_1.default)(this._newA != null, 'uninitialized access');
        return this._newA;
    }
    set newA(value) {
        this._newA = value;
    }
    get initialTime() {
        (0, assert_1.default)(this._initialTime != null, 'uninitialized access');
        return this._initialTime;
    }
    set initialTime(value) {
        this._initialTime = value;
    }
    get futureTime() {
        (0, assert_1.default)(this._futureTime != null, 'uninitialized access');
        return this._futureTime;
    }
    set futureTime(value) {
        this._futureTime = value;
    }
    toJSON() {
        return {
            isTypeOf: this.isTypeOf,
            oldA: marshal.bigint.toJSON(this.oldA),
            newA: marshal.bigint.toJSON(this.newA),
            initialTime: marshal.bigint.toJSON(this.initialTime),
            futureTime: marshal.bigint.toJSON(this.futureTime),
        };
    }
}
exports.StableSwapRampAEventData = StableSwapRampAEventData;
//# sourceMappingURL=_stableSwapRampAEventData.js.map