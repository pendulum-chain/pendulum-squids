"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrCreateToken = void 0;
const constants_1 = require("../constants");
const model_1 = require("../model");
const storage_1 = require("../types/storage");
const token_1 = require("../utils/token");
async function getOrCreateToken(ctx, asset) {
    const address = (0, token_1.addressFromAsset)(asset);
    let token = await ctx.store.get(model_1.Token, address);
    if (!token) {
        const metadataStorage = new storage_1.AssetRegistryCurrencyMetadatasStorage(ctx, ctx.block);
        let metaddata;
        if (!metadataStorage.isExists) {
            metaddata = constants_1.TOKEN_METADATA_MAP[address];
        }
        else {
            const currencyId = (0, token_1.zenlinkAssetIdToCurrencyId)(asset);
            const result = metadataStorage.isV956
                ? await metadataStorage.asV956.get(currencyId)
                : metadataStorage.isV962
                    ? await metadataStorage.asV962.get(currencyId)
                    : undefined;
            if (result) {
                metaddata = {
                    symbol: (0, token_1.u8a2s)(result.symbol),
                    name: (0, token_1.u8a2s)(result.name),
                    decimals: result.decimals
                };
            }
        }
        if (!metaddata)
            return undefined;
        const { name, symbol, decimals } = metaddata;
        const totalSupply = await (0, token_1.getTotalIssuance)(ctx, (0, token_1.zenlinkAssetIdToCurrencyId)(asset));
        token = new model_1.Token({
            id: address.toLowerCase(),
            name,
            symbol,
            totalSupply: totalSupply?.toString() ?? '0',
            decimals,
            derivedETH: constants_1.ZERO_BD.toString(),
            tradeVolume: constants_1.ZERO_BD.toString(),
            tradeVolumeUSD: constants_1.ZERO_BD.toString(),
            untrackedVolumeUSD: constants_1.ZERO_BD.toString(),
            totalLiquidity: constants_1.ZERO_BD.toString(),
            txCount: 0,
        });
        await ctx.store.save(token);
    }
    return token;
}
exports.getOrCreateToken = getOrCreateToken;
//# sourceMappingURL=token.js.map