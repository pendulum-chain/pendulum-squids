import { TOKEN_METADATA_MAP, ZERO_BD } from '../constants'
import { Token } from '../model'
import { EventHandlerContext } from '../processor'
import {
    addressFromAsset,
    getTotalIssuance,
    u8a2s,
    zenlinkAssetIdToCurrencyId,
} from '../utils/token'
import { AssetId } from '../types/common'

export async function getOrCreateToken(
    ctx: EventHandlerContext,
    asset: AssetId
): Promise<Token | undefined> {
    const address = addressFromAsset(asset)
    let token = await ctx.store.get(Token, address)

    if (!token) {
        const metadata = TOKEN_METADATA_MAP[address]

        if (!metadata) return undefined
        const { name, symbol, decimals } = metadata
        const totalSupply = await getTotalIssuance(
            ctx,
            zenlinkAssetIdToCurrencyId(asset)
        )
        token = new Token({
            id: address.toLowerCase(),
            name,
            symbol,
            totalSupply: totalSupply?.toString() ?? '0',
            decimals,
            derivedETH: ZERO_BD.toString(),
            tradeVolume: ZERO_BD.toString(),
            tradeVolumeUSD: ZERO_BD.toString(),
            untrackedVolumeUSD: ZERO_BD.toString(),
            totalLiquidity: ZERO_BD.toString(),
            txCount: 0,
        })

        await ctx.store.save(token)
    }

    return token
}
