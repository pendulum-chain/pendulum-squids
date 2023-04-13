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
exports.ZenlinkInfo = void 0;
const typeorm_1 = require("typeorm");
const factory_model_1 = require("./factory.model");
const stableSwapInfo_model_1 = require("./stableSwapInfo.model");
let ZenlinkInfo = class ZenlinkInfo {
    constructor(props) {
        Object.assign(this, props);
    }
};
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], ZenlinkInfo.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp with time zone", { nullable: false }),
    __metadata("design:type", Date
    /**
     * BigDecimal
     */
    )
], ZenlinkInfo.prototype, "updatedDate", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { nullable: false }),
    __metadata("design:type", String)
], ZenlinkInfo.prototype, "totalVolumeUSD", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { nullable: false }),
    __metadata("design:type", String)
], ZenlinkInfo.prototype, "totalTvlUSD", void 0);
__decorate([
    (0, typeorm_1.Column)("int4", { nullable: false }),
    __metadata("design:type", Number)
], ZenlinkInfo.prototype, "txCount", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.ManyToOne)(() => factory_model_1.Factory, { nullable: true }),
    __metadata("design:type", factory_model_1.Factory)
], ZenlinkInfo.prototype, "factory", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.ManyToOne)(() => stableSwapInfo_model_1.StableSwapInfo, { nullable: true }),
    __metadata("design:type", stableSwapInfo_model_1.StableSwapInfo)
], ZenlinkInfo.prototype, "stableSwapInfo", void 0);
ZenlinkInfo = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [Object])
], ZenlinkInfo);
exports.ZenlinkInfo = ZenlinkInfo;
//# sourceMappingURL=zenlinkInfo.model.js.map