"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromJsonStableSwapExchangeData = void 0;
const _stableSwapTokenExchangeData_1 = require("./_stableSwapTokenExchangeData");
const _stableSwapTokenExchangeUnderlyingData_1 = require("./_stableSwapTokenExchangeUnderlyingData");
function fromJsonStableSwapExchangeData(json) {
    switch (json?.isTypeOf) {
        case 'StableSwapTokenExchangeData': return new _stableSwapTokenExchangeData_1.StableSwapTokenExchangeData(undefined, json);
        case 'StableSwapTokenExchangeUnderlyingData': return new _stableSwapTokenExchangeUnderlyingData_1.StableSwapTokenExchangeUnderlyingData(undefined, json);
        default: throw new TypeError('Unknown json object passed as StableSwapExchangeData');
    }
}
exports.fromJsonStableSwapExchangeData = fromJsonStableSwapExchangeData;
//# sourceMappingURL=_stableSwapExchangeData.js.map