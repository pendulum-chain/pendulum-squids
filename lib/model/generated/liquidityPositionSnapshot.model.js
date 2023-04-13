"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LiquidityPositionSnapshot = void 0;
const typeorm_1 = require("typeorm");
const liquidityPosition_model_1 = require("./liquidityPosition.model");
const user_model_1 = require("./user.model");
const pair_model_1 = require("./pair.model");
let LiquidityPositionSnapshot = class LiquidityPositionSnapshot {
    constructor(props) {
        Object.assign(this, props);
    }
};
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], LiquidityPositionSnapshot.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.ManyToOne)(() => liquidityPosition_model_1.LiquidityPosition, { nullable: true }),
    __metadata("design:type", liquidityPosition_model_1.LiquidityPosition)
], LiquidityPositionSnapshot.prototype, "liquidityPosition", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp with time zone", { nullable: false }),
    __metadata("design:type", Date)
], LiquidityPositionSnapshot.prototype, "timestamp", void 0);
__decorate([
    (0, typeorm_1.Column)("int4", { nullable: false }),
    __metadata("design:type", Number)
], LiquidityPositionSnapshot.prototype, "block", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.ManyToOne)(() => user_model_1.User, { nullable: true }),
    __metadata("design:type", user_model_1.User)
], LiquidityPositionSnapshot.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.ManyToOne)(() => pair_model_1.Pair, { nullable: true }),
    __metadata("design:type", pair_model_1.Pair
    /**
     * BigDecimal
     */
    )
], LiquidityPositionSnapshot.prototype, "pair", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { nullable: false }),
    __metadata("design:type", String)
], LiquidityPositionSnapshot.prototype, "token0PriceUSD", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { nullable: false }),
    __metadata("design:type", String)
], LiquidityPositionSnapshot.prototype, "token1PriceUSD", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { nullable: false }),
    __metadata("design:type", String)
], LiquidityPositionSnapshot.prototype, "reserve0", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { nullable: false }),
    __metadata("design:type", String)
], LiquidityPositionSnapshot.prototype, "reserve1", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { nullable: false }),
    __metadata("design:type", String)
], LiquidityPositionSnapshot.prototype, "reserveUSD", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { nullable: false }),
    __metadata("design:type", String)
], LiquidityPositionSnapshot.prototype, "liquidityTokenTotalSupply", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { nullable: false }),
    __metadata("design:type", String)
], LiquidityPositionSnapshot.prototype, "liquidityTokenBalance", void 0);
LiquidityPositionSnapshot = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [Object])
], LiquidityPositionSnapshot);
exports.LiquidityPositionSnapshot = LiquidityPositionSnapshot;
//# sourceMappingURL=liquidityPositionSnapshot.model.js.map