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
exports.ZenlinkDayInfo = void 0;
const typeorm_1 = require("typeorm");
const factoryDayData_model_1 = require("./factoryDayData.model");
const stableSwapDayData_model_1 = require("./stableSwapDayData.model");
let ZenlinkDayInfo = class ZenlinkDayInfo {
    constructor(props) {
        Object.assign(this, props);
    }
};
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], ZenlinkDayInfo.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp with time zone", { nullable: false }),
    __metadata("design:type", Date)
], ZenlinkDayInfo.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.ManyToOne)(() => factoryDayData_model_1.FactoryDayData, { nullable: true }),
    __metadata("design:type", factoryDayData_model_1.FactoryDayData)
], ZenlinkDayInfo.prototype, "standardInfo", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.ManyToOne)(() => stableSwapDayData_model_1.StableSwapDayData, { nullable: true }),
    __metadata("design:type", stableSwapDayData_model_1.StableSwapDayData)
], ZenlinkDayInfo.prototype, "stableInfo", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { nullable: false }),
    __metadata("design:type", String)
], ZenlinkDayInfo.prototype, "dailyVolumeUSD", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { nullable: false }),
    __metadata("design:type", String)
], ZenlinkDayInfo.prototype, "tvlUSD", void 0);
ZenlinkDayInfo = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [Object])
], ZenlinkDayInfo);
exports.ZenlinkDayInfo = ZenlinkDayInfo;
//# sourceMappingURL=zenlinkDayInfo.model.js.map