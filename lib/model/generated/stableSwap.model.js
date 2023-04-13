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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StableSwap = void 0;
const typeorm_1 = require("typeorm");
const marshal = __importStar(require("./marshal"));
const stableSwapInfo_model_1 = require("./stableSwapInfo.model");
const stableSwapEvent_model_1 = require("./stableSwapEvent.model");
const stableSwapExchange_model_1 = require("./stableSwapExchange.model");
const stableSwapDayData_model_1 = require("./stableSwapDayData.model");
const stableSwapHourData_model_1 = require("./stableSwapHourData.model");
const farm_model_1 = require("./farm.model");
let StableSwap = class StableSwap {
    constructor(props) {
        Object.assign(this, props);
    }
};
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], StableSwap.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { nullable: false }),
    __metadata("design:type", String)
], StableSwap.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { nullable: false }),
    __metadata("design:type", String)
], StableSwap.prototype, "baseSwapAddress", void 0);
__decorate([
    (0, typeorm_1.Column)("int4", { nullable: false }),
    __metadata("design:type", Number)
], StableSwap.prototype, "numTokens", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { array: true, nullable: false }),
    __metadata("design:type", Array)
], StableSwap.prototype, "tokens", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { array: true, nullable: false }),
    __metadata("design:type", Array)
], StableSwap.prototype, "baseTokens", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { array: true, nullable: false }),
    __metadata("design:type", Array)
], StableSwap.prototype, "allTokens", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { array: true, nullable: false }),
    __metadata("design:type", Array)
], StableSwap.prototype, "balances", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { nullable: false }),
    __metadata("design:type", String)
], StableSwap.prototype, "lpToken", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { nullable: false }),
    __metadata("design:type", String)
], StableSwap.prototype, "lpTotalSupply", void 0);
__decorate([
    (0, typeorm_1.Column)("numeric", { transformer: marshal.bigintTransformer, nullable: false }),
    __metadata("design:type", BigInt)
], StableSwap.prototype, "a", void 0);
__decorate([
    (0, typeorm_1.Column)("numeric", { transformer: marshal.bigintTransformer, nullable: false }),
    __metadata("design:type", BigInt)
], StableSwap.prototype, "swapFee", void 0);
__decorate([
    (0, typeorm_1.Column)("numeric", { transformer: marshal.bigintTransformer, nullable: false }),
    __metadata("design:type", BigInt)
], StableSwap.prototype, "adminFee", void 0);
__decorate([
    (0, typeorm_1.Column)("numeric", { transformer: marshal.bigintTransformer, nullable: false }),
    __metadata("design:type", BigInt)
], StableSwap.prototype, "virtualPrice", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.ManyToOne)(() => stableSwapInfo_model_1.StableSwapInfo, { nullable: true }),
    __metadata("design:type", stableSwapInfo_model_1.StableSwapInfo)
], StableSwap.prototype, "stableSwapInfo", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => stableSwapEvent_model_1.StableSwapEvent, e => e.stableSwap),
    __metadata("design:type", Array)
], StableSwap.prototype, "events", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => stableSwapExchange_model_1.StableSwapExchange, e => e.stableSwap),
    __metadata("design:type", Array)
], StableSwap.prototype, "exchanges", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => stableSwapDayData_model_1.StableSwapDayData, e => e.stableSwap),
    __metadata("design:type", Array)
], StableSwap.prototype, "stableSwapDayData", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => stableSwapHourData_model_1.StableSwapHourData, e => e.stableSwap),
    __metadata("design:type", Array)
], StableSwap.prototype, "stableSwapHourData", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => farm_model_1.Farm, e => e.stableSwap),
    __metadata("design:type", Array)
], StableSwap.prototype, "farm", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { nullable: false }),
    __metadata("design:type", String)
], StableSwap.prototype, "tvlUSD", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { nullable: false }),
    __metadata("design:type", String)
], StableSwap.prototype, "volumeUSD", void 0);
StableSwap = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [Object])
], StableSwap);
exports.StableSwap = StableSwap;
//# sourceMappingURL=stableSwap.model.js.map