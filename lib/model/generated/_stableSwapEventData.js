"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromJsonStableSwapEventData = void 0;
const _stableSwapNewFeeEventData_1 = require("./_stableSwapNewFeeEventData");
const _stableSwapRampAEventData_1 = require("./_stableSwapRampAEventData");
const _stableSwapStopRampAEventData_1 = require("./_stableSwapStopRampAEventData");
const _stableSwapAddLiquidityEventData_1 = require("./_stableSwapAddLiquidityEventData");
const _stableSwapRemoveLiquidityEventData_1 = require("./_stableSwapRemoveLiquidityEventData");
const _stableSwapFlashLoanEventData_1 = require("./_stableSwapFlashLoanEventData");
function fromJsonStableSwapEventData(json) {
    switch (json?.isTypeOf) {
        case 'StableSwapNewFeeEventData': return new _stableSwapNewFeeEventData_1.StableSwapNewFeeEventData(undefined, json);
        case 'StableSwapRampAEventData': return new _stableSwapRampAEventData_1.StableSwapRampAEventData(undefined, json);
        case 'StableSwapStopRampAEventData': return new _stableSwapStopRampAEventData_1.StableSwapStopRampAEventData(undefined, json);
        case 'StableSwapAddLiquidityEventData': return new _stableSwapAddLiquidityEventData_1.StableSwapAddLiquidityEventData(undefined, json);
        case 'StableSwapRemoveLiquidityEventData': return new _stableSwapRemoveLiquidityEventData_1.StableSwapRemoveLiquidityEventData(undefined, json);
        case 'StableSwapFlashLoanEventData': return new _stableSwapFlashLoanEventData_1.StableSwapFlashLoanEventData(undefined, json);
        default: throw new TypeError('Unknown json object passed as StableSwapEventData');
    }
}
exports.fromJsonStableSwapEventData = fromJsonStableSwapEventData;
//# sourceMappingURL=_stableSwapEventData.js.map