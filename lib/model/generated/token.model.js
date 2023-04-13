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
exports.Token = void 0;
const typeorm_1 = require("typeorm");
const tokenDayData_model_1 = require("./tokenDayData.model");
const pairDayData_model_1 = require("./pairDayData.model");
const pair_model_1 = require("./pair.model");
let Token = class Token {
    constructor(props) {
        Object.assign(this, props);
    }
};
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], Token.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { nullable: false }),
    __metadata("design:type", String)
], Token.prototype, "symbol", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { nullable: false }),
    __metadata("design:type", String)
], Token.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)("int4", { nullable: false }),
    __metadata("design:type", Number)
], Token.prototype, "decimals", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { nullable: false }),
    __metadata("design:type", String)
], Token.prototype, "totalSupply", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { nullable: false }),
    __metadata("design:type", String)
], Token.prototype, "tradeVolume", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { nullable: false }),
    __metadata("design:type", String)
], Token.prototype, "tradeVolumeUSD", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { nullable: false }),
    __metadata("design:type", String)
], Token.prototype, "untrackedVolumeUSD", void 0);
__decorate([
    (0, typeorm_1.Column)("int4", { nullable: false }),
    __metadata("design:type", Number)
], Token.prototype, "txCount", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { nullable: false }),
    __metadata("design:type", String)
], Token.prototype, "totalLiquidity", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { nullable: false }),
    __metadata("design:type", String)
], Token.prototype, "derivedETH", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => tokenDayData_model_1.TokenDayData, e => e.token),
    __metadata("design:type", Array)
], Token.prototype, "tokenDayData", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => pairDayData_model_1.PairDayData, e => e.token0),
    __metadata("design:type", Array)
], Token.prototype, "pairDayDataBase", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => pairDayData_model_1.PairDayData, e => e.token1),
    __metadata("design:type", Array)
], Token.prototype, "pairDayDataQuote", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => pair_model_1.Pair, e => e.token0),
    __metadata("design:type", Array)
], Token.prototype, "pairBase", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => pair_model_1.Pair, e => e.token1),
    __metadata("design:type", Array)
], Token.prototype, "pairQuote", void 0);
Token = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [Object])
], Token);
exports.Token = Token;
//# sourceMappingURL=token.model.js.map