import {
    PRICE_ORACLE_KEYS_TO_ADDRESS,
    TOKEN_METADATA_MAP,
    ZERO_BD,
} from '../constants'
import { OraclePrice } from '../model'
import { EventHandlerContext } from '../types'

export async function getOrCreateOraclePrice(
    ctx: EventHandlerContext,
    blockchain: string,
    symbol: string
): Promise<OraclePrice | undefined> {
    const key = `${blockchain}-${symbol}`
    // Derive the Zenlink asset ID from the blockchain and symbol
    const priceOracleKey = PRICE_ORACLE_KEYS_TO_ADDRESS[key]
    // If the price oracle key is not defined, then we don't have a price oracle for this token
    if (!priceOracleKey) return undefined

    let price = await ctx.store.get(OraclePrice, priceOracleKey)

    if (!price) {
        const metadata = TOKEN_METADATA_MAP[priceOracleKey]

        if (!metadata) return undefined
        const { name, symbol, decimals, blockchain } = metadata
        price = new OraclePrice({
            id: priceOracleKey,
            name,
            symbol,
            blockchain,
            timestamp: 0n,
            decimals,
            price: ZERO_BD.toString(),
            supply: ZERO_BD.toString(),
        })

        await ctx.store.save(price)
    }

    return price
}
