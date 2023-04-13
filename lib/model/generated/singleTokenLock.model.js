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
exports.SingleTokenLock = void 0;
const typeorm_1 = require("typeorm");
const token_model_1 = require("./token.model");
const singleTokenLockDayData_model_1 = require("./singleTokenLockDayData.model");
const singleTokenLockHourData_model_1 = require("./singleTokenLockHourData.model");
const farm_model_1 = require("./farm.model");
let SingleTokenLock = class SingleTokenLock {
    constructor(props) {
        Object.assign(this, props);
    }
};
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], SingleTokenLock.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.ManyToOne)(() => token_model_1.Token, { nullable: true }),
    __metadata("design:type", token_model_1.Token
    /**
     * BigDecimal
     */
    )
], SingleTokenLock.prototype, "token", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { nullable: false }),
    __metadata("design:type", String)
], SingleTokenLock.prototype, "totalLiquidityUSD", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { nullable: false }),
    __metadata("design:type", String)
], SingleTokenLock.prototype, "totalLiquidity", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { nullable: false }),
    __metadata("design:type", String)
], SingleTokenLock.prototype, "totalLiquidityETH", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => singleTokenLockDayData_model_1.SingleTokenLockDayData, e => e.singleTokenLock),
    __metadata("design:type", Array)
], SingleTokenLock.prototype, "singleTokenLockDayData", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => singleTokenLockHourData_model_1.SingleTokenLockHourData, e => e.singleTokenLock),
    __metadata("design:type", Array)
], SingleTokenLock.prototype, "singleTokenLockHourData", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => farm_model_1.Farm, e => e.singleTokenLock),
    __metadata("design:type", Array)
], SingleTokenLock.prototype, "farm", void 0);
SingleTokenLock = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [Object])
], SingleTokenLock);
exports.SingleTokenLock = SingleTokenLock;
//# sourceMappingURL=singleTokenLock.model.js.map