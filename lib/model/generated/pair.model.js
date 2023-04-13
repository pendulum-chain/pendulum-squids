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
exports.Pair = void 0;
const typeorm_1 = require("typeorm");
const marshal = __importStar(require("./marshal"));
const token_model_1 = require("./token.model");
const pairHourData_model_1 = require("./pairHourData.model");
const pairDayData_model_1 = require("./pairDayData.model");
const liquidityPosition_model_1 = require("./liquidityPosition.model");
const liquidityPositionSnapshot_model_1 = require("./liquidityPositionSnapshot.model");
const mint_model_1 = require("./mint.model");
const burn_model_1 = require("./burn.model");
const swap_model_1 = require("./swap.model");
const farm_model_1 = require("./farm.model");
let Pair = class Pair {
    constructor(props) {
        Object.assign(this, props);
    }
};
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], Pair.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.ManyToOne)(() => token_model_1.Token, { nullable: true }),
    __metadata("design:type", token_model_1.Token)
], Pair.prototype, "token0", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.ManyToOne)(() => token_model_1.Token, { nullable: true }),
    __metadata("design:type", token_model_1.Token
    /**
     * BigDecimal
     */
    )
], Pair.prototype, "token1", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { nullable: false }),
    __metadata("design:type", String)
], Pair.prototype, "reserve0", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { nullable: false }),
    __metadata("design:type", String)
], Pair.prototype, "reserve1", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { nullable: false }),
    __metadata("design:type", String)
], Pair.prototype, "totalSupply", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { nullable: false }),
    __metadata("design:type", String)
], Pair.prototype, "reserveETH", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { nullable: false }),
    __metadata("design:type", String)
], Pair.prototype, "reserveUSD", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { nullable: false }),
    __metadata("design:type", String)
], Pair.prototype, "trackedReserveETH", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { nullable: false }),
    __metadata("design:type", String)
], Pair.prototype, "token0Price", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { nullable: false }),
    __metadata("design:type", String)
], Pair.prototype, "token1Price", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { nullable: false }),
    __metadata("design:type", String)
], Pair.prototype, "volumeToken0", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { nullable: false }),
    __metadata("design:type", String)
], Pair.prototype, "volumeToken1", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { nullable: false }),
    __metadata("design:type", String)
], Pair.prototype, "volumeUSD", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { nullable: false }),
    __metadata("design:type", String)
], Pair.prototype, "untrackedVolumeUSD", void 0);
__decorate([
    (0, typeorm_1.Column)("int4", { nullable: false }),
    __metadata("design:type", Number)
], Pair.prototype, "txCount", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp with time zone", { nullable: false }),
    __metadata("design:type", Date)
], Pair.prototype, "createdAtTimestamp", void 0);
__decorate([
    (0, typeorm_1.Column)("numeric", { transformer: marshal.bigintTransformer, nullable: false }),
    __metadata("design:type", BigInt)
], Pair.prototype, "createdAtBlockNumber", void 0);
__decorate([
    (0, typeorm_1.Column)("int4", { nullable: false }),
    __metadata("design:type", Number)
], Pair.prototype, "liquidityProviderCount", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => pairHourData_model_1.PairHourData, e => e.pair),
    __metadata("design:type", Array)
], Pair.prototype, "pairHourData", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => pairDayData_model_1.PairDayData, e => e.pair),
    __metadata("design:type", Array)
], Pair.prototype, "pairDayData", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => liquidityPosition_model_1.LiquidityPosition, e => e.pair),
    __metadata("design:type", Array)
], Pair.prototype, "liquidityPositions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => liquidityPositionSnapshot_model_1.LiquidityPositionSnapshot, e => e.pair),
    __metadata("design:type", Array)
], Pair.prototype, "liquidityPositionSnapshots", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => mint_model_1.Mint, e => e.pair),
    __metadata("design:type", Array)
], Pair.prototype, "mints", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => burn_model_1.Burn, e => e.pair),
    __metadata("design:type", Array)
], Pair.prototype, "burns", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => swap_model_1.Swap, e => e.pair),
    __metadata("design:type", Array)
], Pair.prototype, "swaps", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => farm_model_1.Farm, e => e.pair),
    __metadata("design:type", Array)
], Pair.prototype, "farm", void 0);
Pair = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [Object])
], Pair);
exports.Pair = Pair;
//# sourceMappingURL=pair.model.js.map