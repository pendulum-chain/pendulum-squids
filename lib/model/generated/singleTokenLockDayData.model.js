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
exports.SingleTokenLockDayData = void 0;
const typeorm_1 = require("typeorm");
const singleTokenLock_model_1 = require("./singleTokenLock.model");
let SingleTokenLockDayData = class SingleTokenLockDayData {
    constructor(props) {
        Object.assign(this, props);
    }
};
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], SingleTokenLockDayData.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.ManyToOne)(() => singleTokenLock_model_1.SingleTokenLock, { nullable: true }),
    __metadata("design:type", singleTokenLock_model_1.SingleTokenLock)
], SingleTokenLockDayData.prototype, "singleTokenLock", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp with time zone", { nullable: false }),
    __metadata("design:type", Date)
], SingleTokenLockDayData.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { nullable: false }),
    __metadata("design:type", String)
], SingleTokenLockDayData.prototype, "totalLiquidity", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { nullable: false }),
    __metadata("design:type", String)
], SingleTokenLockDayData.prototype, "totalLiquidityUSD", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { nullable: false }),
    __metadata("design:type", String)
], SingleTokenLockDayData.prototype, "totalLiquidityETH", void 0);
SingleTokenLockDayData = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [Object])
], SingleTokenLockDayData);
exports.SingleTokenLockDayData = SingleTokenLockDayData;
//# sourceMappingURL=singleTokenLockDayData.model.js.map