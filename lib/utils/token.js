"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTokenBurned = exports.getTotalIssuance = exports.getTokenBalance = exports.getPairStatusFromAssets = exports.getPairAssetIdFromAssets = exports.parseToTokenIndex = exports.s2u8a = exports.u8a2s = exports.currencyIdToAssetIndex = exports.zenlinkAssetIdToCurrencyId = exports.parseTokenType = exports.assetIdFromAddress = exports.addressFromAsset = exports.invertedTokenSymbolMap = exports.currencyTokenSymbolMap = exports.TokenIndexMap = exports.CurrencyIndexEnum = exports.CurrencyTypeEnum = exports.currencyKeyMap = void 0;
const storage_1 = require("../types/storage");
const ss58_1 = require("@subsquid/ss58");
const config_1 = require("../config");
const lodash_1 = require("lodash");
exports.currencyKeyMap = {
    0: 'Native',
    1: 'VToken',
    2: 'Token',
    3: 'Stable',
    4: 'VSToken',
    5: 'VSBond',
    6: 'LPToken',
    7: 'ForeignAsset',
    8: 'Token2',
    9: 'VToken2',
    10: 'VSToken2',
    11: 'VSBond2',
    12: 'StableLpToken'
};
var CurrencyTypeEnum;
(function (CurrencyTypeEnum) {
    CurrencyTypeEnum[CurrencyTypeEnum["Native"] = 0] = "Native";
    CurrencyTypeEnum[CurrencyTypeEnum["VToken"] = 1] = "VToken";
    CurrencyTypeEnum[CurrencyTypeEnum["Token"] = 2] = "Token";
    CurrencyTypeEnum[CurrencyTypeEnum["Stable"] = 3] = "Stable";
    CurrencyTypeEnum[CurrencyTypeEnum["VSToken"] = 4] = "VSToken";
    CurrencyTypeEnum[CurrencyTypeEnum["VSBond"] = 5] = "VSBond";
    CurrencyTypeEnum[CurrencyTypeEnum["LPToken"] = 6] = "LPToken";
    CurrencyTypeEnum[CurrencyTypeEnum["ForeignAsset"] = 7] = "ForeignAsset";
    CurrencyTypeEnum[CurrencyTypeEnum["Token2"] = 8] = "Token2";
    CurrencyTypeEnum[CurrencyTypeEnum["VToken2"] = 9] = "VToken2";
    CurrencyTypeEnum[CurrencyTypeEnum["VSToken2"] = 10] = "VSToken2";
    CurrencyTypeEnum[CurrencyTypeEnum["VSBond2"] = 11] = "VSBond2";
    CurrencyTypeEnum[CurrencyTypeEnum["StableLpToken"] = 12] = "StableLpToken";
})(CurrencyTypeEnum = exports.CurrencyTypeEnum || (exports.CurrencyTypeEnum = {}));
;
var CurrencyIndexEnum;
(function (CurrencyIndexEnum) {
    CurrencyIndexEnum[CurrencyIndexEnum["ASG"] = 0] = "ASG";
    CurrencyIndexEnum[CurrencyIndexEnum["BNC"] = 1] = "BNC";
    CurrencyIndexEnum[CurrencyIndexEnum["KUSD"] = 2] = "KUSD";
    CurrencyIndexEnum[CurrencyIndexEnum["DOT"] = 3] = "DOT";
    CurrencyIndexEnum[CurrencyIndexEnum["KSM"] = 4] = "KSM";
    CurrencyIndexEnum[CurrencyIndexEnum["ETH"] = 5] = "ETH";
    CurrencyIndexEnum[CurrencyIndexEnum["KAR"] = 6] = "KAR";
    CurrencyIndexEnum[CurrencyIndexEnum["ZLK"] = 7] = "ZLK";
    CurrencyIndexEnum[CurrencyIndexEnum["PHA"] = 8] = "PHA";
    CurrencyIndexEnum[CurrencyIndexEnum["RMRK"] = 9] = "RMRK";
    CurrencyIndexEnum[CurrencyIndexEnum["MOVR"] = 10] = "MOVR";
})(CurrencyIndexEnum = exports.CurrencyIndexEnum || (exports.CurrencyIndexEnum = {}));
;
exports.TokenIndexMap = {
    7: 'ForeignAsset',
    8: 'Token2',
    9: 'VToken2',
    10: 'VSToken2',
    12: 'StableLpToken'
};
exports.currencyTokenSymbolMap = {
    0: 'ASG',
    1: 'BNC',
    2: 'KUSD',
    3: 'DOT',
    4: 'KSM',
    5: 'ETH',
    6: 'KAR',
    7: 'ZLK',
    8: 'PHA',
    9: 'RMRK',
    10: 'MOVR'
};
exports.invertedTokenSymbolMap = (0, lodash_1.invert)(exports.currencyTokenSymbolMap);
function addressFromAsset({ chainId, assetIndex, assetType }) {
    return `${chainId}-${assetType}-${assetIndex.toString()}`;
}
exports.addressFromAsset = addressFromAsset;
function assetIdFromAddress(address) {
    const [chainId, assetType, assetIndex] = address.split('-');
    return {
        chainId: Number(chainId),
        assetType: Number(assetType),
        assetIndex: BigInt(assetIndex)
    };
}
exports.assetIdFromAddress = assetIdFromAddress;
function parseTokenType(assetIndex) {
    const assetU8 = ((assetIndex & 65280) >> 8);
    return exports.currencyKeyMap[assetU8];
}
exports.parseTokenType = parseTokenType;
function zenlinkAssetIdToCurrencyId(asset) {
    const assetIndex = Number(asset.assetIndex.toString());
    const assetU8 = ((assetIndex & 65280) >> 8);
    const tokenType = parseTokenType(assetIndex);
    const assetSymbolIndex = ((assetIndex & 255));
    if (exports.TokenIndexMap[assetU8]) {
        return {
            __kind: tokenType,
            value: assetSymbolIndex
        };
    }
    const tokenSymbol = exports.currencyTokenSymbolMap[assetSymbolIndex];
    return {
        __kind: tokenType,
        value: {
            __kind: tokenSymbol === 'ASG' ? 'BNC' : tokenSymbol
        }
    };
}
exports.zenlinkAssetIdToCurrencyId = zenlinkAssetIdToCurrencyId;
function currencyIdToAssetIndex(currency) {
    const tokenType = CurrencyTypeEnum[currency.__kind];
    let tokenIndex;
    if (exports.TokenIndexMap[tokenType]) {
        tokenIndex = currency.value;
        return tokenIndex;
    }
    tokenIndex = CurrencyIndexEnum[(currency.value).__kind];
    const assetIdIndex = parseToTokenIndex(tokenType, tokenIndex);
    return assetIdIndex;
}
exports.currencyIdToAssetIndex = currencyIdToAssetIndex;
function u8a2s(u8a) {
    let dataString = "";
    for (let i = 0; i < u8a.length; i++) {
        dataString += String.fromCharCode(u8a[i]);
    }
    return dataString;
}
exports.u8a2s = u8a2s;
function s2u8a(str) {
    const arr = [];
    for (let i = 0, j = str.length; i < j; ++i) {
        arr.push(str.charCodeAt(i));
    }
    return new Uint8Array(arr);
}
exports.s2u8a = s2u8a;
function parseToTokenIndex(type, index) {
    if (type === 0)
        return 0;
    return (type << 8) + index;
}
exports.parseToTokenIndex = parseToTokenIndex;
const pairAssetIds = new Map();
async function getPairAssetIdFromAssets(ctx, assets) {
    const [asset0, asset1] = assets;
    const token0Address = addressFromAsset(asset0);
    const token1Address = addressFromAsset(asset1);
    const assetsId = `${token0Address}-${token1Address}`;
    let pairAssetId;
    if (pairAssetIds.has(assetsId)) {
        pairAssetId = pairAssetIds.get(assetsId);
    }
    else {
        const pairsStorage = new storage_1.ZenlinkProtocolLiquidityPairsStorage(ctx, ctx.block);
        if (!pairsStorage.isExists)
            return undefined;
        pairAssetId = await pairsStorage.asV906.get(assets);
        if (pairAssetId) {
            pairAssetIds.set(assetsId, pairAssetId);
        }
    }
    return pairAssetId;
}
exports.getPairAssetIdFromAssets = getPairAssetIdFromAssets;
const pairAccounts = new Map();
async function getPairStatusFromAssets(ctx, assets, onlyAccount = true) {
    const [asset0, asset1] = assets;
    const token0Address = addressFromAsset(asset0);
    const token1Address = addressFromAsset(asset1);
    const assetsId = `${token0Address}-${token1Address}`;
    let pairAccount;
    if (pairAccounts.has(assetsId) && onlyAccount) {
        pairAccount = pairAccounts.get(assetsId);
        return [pairAccount, BigInt(0)];
    }
    else {
        const statusStorage = new storage_1.ZenlinkProtocolPairStatusesStorage(ctx, ctx.block);
        if (!statusStorage.isExists)
            return [undefined, BigInt(0)];
        const result = await statusStorage.asV906.get(assets);
        if (result.__kind === 'Trading') {
            pairAccount = (0, ss58_1.codec)(config_1.config.prefix).encode(result.value.pairAccount);
            pairAccounts.set(assetsId, pairAccount);
            return [pairAccount, result.value.totalSupply];
        }
        return [undefined, BigInt(0)];
    }
}
exports.getPairStatusFromAssets = getPairStatusFromAssets;
async function getTokenBalance(ctx, assetId, account) {
    let result;
    if (assetId.__kind === 'Native') {
        const systemAccountStorate = new storage_1.SystemAccountStorage(ctx, ctx.block);
        result = (await systemAccountStorate.asV1.get(account)).data;
    }
    else {
        const tokenAccountsStorage = new storage_1.TokensAccountsStorage(ctx, ctx.block);
        if (tokenAccountsStorage.isV906) {
        }
        else if (tokenAccountsStorage.isV906) {
            result = await tokenAccountsStorage.asV906.get(account, assetId);
        }
        else if (tokenAccountsStorage.isV956) {
            result = await tokenAccountsStorage.asV956.get(account, assetId);
        }
        else if (tokenAccountsStorage.isV962)
            (result = await tokenAccountsStorage.asV962.get(account, assetId));
    }
    return result?.free;
}
exports.getTokenBalance = getTokenBalance;
async function getTotalIssuance(ctx, assetId) {
    let result;
    if (assetId.__kind === 'Native') {
        const balanceIssuanceStorage = new storage_1.BalancesTotalIssuanceStorage(ctx, ctx.block);
        result = await balanceIssuanceStorage.asV1.get();
    }
    else {
        const tokenIssuanceStorage = new storage_1.TokensTotalIssuanceStorage(ctx, ctx.block);
        if (tokenIssuanceStorage.isV906) {
            result = await tokenIssuanceStorage.asV906.get(assetId);
        }
        else if (tokenIssuanceStorage.isV956) {
            result = await tokenIssuanceStorage.asV956.get(assetId);
        }
        else if (tokenIssuanceStorage.isV962)
            (result = await tokenIssuanceStorage.asV962.get(assetId));
    }
    return result;
}
exports.getTotalIssuance = getTotalIssuance;
async function getTokenBurned(ctx, assetId, account) {
    let block = {
        hash: ctx.block.parentHash
    };
    let result;
    if (assetId.__kind === 'Native') {
        const systemAccountStorate = new storage_1.SystemAccountStorage(ctx, block);
        result = (await systemAccountStorate.asV1.get(account)).data;
    }
    else {
        const tokenAccountsStorage = new storage_1.TokensAccountsStorage(ctx, block);
        if (tokenAccountsStorage.isV906) {
            result = await tokenAccountsStorage.asV906.get(account, assetId);
        }
        else if (tokenAccountsStorage.isV956) {
            result = await tokenAccountsStorage.asV956.get(account, assetId);
        }
        else if (tokenAccountsStorage.isV962)
            (result = await tokenAccountsStorage.asV962.get(account, assetId));
    }
    return result?.free;
}
exports.getTokenBurned = getTokenBurned;
//# sourceMappingURL=token.js.map