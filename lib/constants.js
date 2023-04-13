"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BI_18 = exports.ONE_BD = exports.ZERO_BD = exports.ONE_BI = exports.ZERO_BI = exports.ZLK_GOV_ACCOUNT = exports.ZLK_CURRENCY_ID = exports.ZLK_ASSET_ID = exports.TOKEN_METADATA_MAP = void 0;
const big_js_1 = require("big.js");
const token_1 = require("./utils/token");
// Probably need our own tokens
exports.TOKEN_METADATA_MAP = {
    '2001-0-0': { name: 'Bifrost', symbol: 'BNC', decimals: 12 },
    '2001-2-770': { name: 'Karura Dollar', symbol: 'aUSD', decimals: 12 },
    '2001-2-516': { name: 'Kusama', symbol: 'KSM', decimals: 12 },
    '2001-2-519': { name: 'Zenlink Network Token', symbol: 'ZLK', decimals: 18 },
    '2001-2-518': { name: 'Karura', symbol: 'KAR', decimals: 12 },
    '2001-2-1028': { name: 'vsKSM', symbol: 'vsKSM', decimals: 12 },
    '2001-2-521': { name: 'RMRK', symbol: 'RMRK', decimals: 10 },
    '2001-2-260': { name: 'vKusama', symbol: 'vKSM', decimals: 12 },
    '2001-2-2048': { name: 'USDT', symbol: 'USDT', decimals: 6 },
    // Unsure what the key in the mapping is
    '2124-2-2048': { name: 'AMPLITUDE', symbol: 'AMPE', decimals: 12 },
};
// Zenlink parachain id
exports.ZLK_ASSET_ID = {
    chainId: 2001,
    assetType: 2,
    assetIndex: 519n
};
exports.ZLK_CURRENCY_ID = (0, token_1.zenlinkAssetIdToCurrencyId)(exports.ZLK_ASSET_ID);
exports.ZLK_GOV_ACCOUNT = ['cRzg4nyCBKbCZaCYmNQksWGMJuectrHom15ZiuYd7h6NtvW'];
exports.ZERO_BI = 0n;
exports.ONE_BI = 1n;
exports.ZERO_BD = (0, big_js_1.Big)(0);
exports.ONE_BD = (0, big_js_1.Big)(1);
exports.BI_18 = 1000000000000000000n;
//# sourceMappingURL=constants.js.map