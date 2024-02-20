import { Big as BigDecimal } from 'big.js'
import { ONE_BD, ZERO_BD } from '../constants'
import { getPair } from '../entities/pair'
import { getOrCreateToken } from '../entities/token'
import { Pair } from '../model'
import { EventHandlerContext } from '../processor'
import { assetIdFromAddress } from './token'
import { getOrCreateOraclePrice } from '../entities/oraclePrice'
import { network } from '../config'

export const WNATIVE_AMPLITUDE = '2124-0-0'
export const WNATIVE_PENDULUM = '2094-0-0'

function getNativeFromNetwork(network: string): string {
    if (network === 'amplitude') {
        return WNATIVE_AMPLITUDE
    } else if (network === 'pendulum') {
        return WNATIVE_PENDULUM
    } else if (network === 'foucoco') {
        return WNATIVE_AMPLITUDE
    } else {
        throw new Error(`Network ${network} not supported`)
    }
}

export const RELAY_NATIVE_AMPLITUDE = '2124-2-256'
export const RELAY_NATIVE_PENDULUM = '2094-2-256'

function getRelayFromNetwork(network: string): string {
    if (network === 'amplitude') {
        return RELAY_NATIVE_AMPLITUDE
    } else if (network === 'pendulum') {
        return RELAY_NATIVE_PENDULUM
    } else if (network === 'foucoco') {
        return RELAY_NATIVE_AMPLITUDE
    } else {
        throw new Error(`Network ${network} not supported`)
    }
}

export const WHITELIST: string[] = [
    '2124-0-0', // wnative
    '2124-2-256', // ksm
    '2124-2-257', // usdt
    '2124-2-512', // xlm
    '2124-2-513', // usdc
    '2124-2-514', // tzs
    '2124-2-515', // brl
    '2094-0-0', // wnative pendulum
    '2094-2-256', // dot
    '2094-2-262', // glmr
    '2094-2-512', // xlm
    '2094-2-513', // usdc
]

// minimum liquidity required to count towards tracked volume for pairs with small # of Lps
export const MINIMUM_USD_THRESHOLD_NEW_PAIRS = new BigDecimal(1000)

// minimum liquidity for price to get tracked
export const MINIMUM_LIQUIDITY_THRESHOLD_ETH = new BigDecimal(5)

// This function is used to get the price of our native token in USD
export async function getEthPriceInUSD(
    ctx: EventHandlerContext
): Promise<BigDecimal> {
    if (network === 'pendulum') {
        // On Pendulum, we use the price from the on-chain price oracle
        const penOraclePrice = await getOrCreateOraclePrice(
            ctx,
            'Pendulum',
            'PEN'
        )
        return penOraclePrice ? BigDecimal(penOraclePrice.price) : ZERO_BD
    }

    // On Amplitude, we use the ratio of the ksm-native pair and the KSM price stored in the on-chain price oracle to derive the price.
    const wnativePair = await getPair(ctx, [
        assetIdFromAddress(getNativeFromNetwork(network)),
        assetIdFromAddress(getRelayFromNetwork(network)),
    ])

    if (!wnativePair) {
        return BigDecimal(0)
    }

    const ksmOraclePrice = await getOrCreateOraclePrice(ctx, 'Kusama', 'KSM')
    if (!ksmOraclePrice) {
        return BigDecimal(0)
    }
    const ksmPrice = ksmOraclePrice.price
    const ksmPriceDecimal = BigDecimal(ksmPrice).div(
        10 ** ksmOraclePrice.decimals
    )

    return wnativePair.token0.id === getRelayFromNetwork(network)
        ? BigDecimal(wnativePair.token0Price).mul(ksmPriceDecimal)
        : BigDecimal(wnativePair.token1Price).mul(ksmPriceDecimal)
}

/**
 * Search through graph to find derived Eth per token.
 * @todo update to be derived ETH (plus stablecoin estimates)
 * */
export async function findEthPerToken(
    ctx: EventHandlerContext,
    tokenId: string
): Promise<BigDecimal> {
    // The basis of our prices is our native token, which we assign to have a price of 1 unit
    if (tokenId === getNativeFromNetwork(network)) {
        return ONE_BD
    }

    const whitelistPairs = await ctx.store.find(Pair, {
        where: WHITELIST.map((address) => [
            { token0: { id: address }, token1: { id: tokenId } },
            { token1: { id: address }, token0: { id: tokenId } },
        ]).flat(),
        relations: {
            token0: true,
            token1: true,
        },
    })

    // loop through whitelist and check if paired with any
    for (const pair of whitelistPairs) {
        if (BigDecimal(pair.reserveETH).gt(MINIMUM_LIQUIDITY_THRESHOLD_ETH)) {
            if (pair.token0.id === tokenId) {
                const token1 = (await getOrCreateToken(
                    ctx,
                    assetIdFromAddress(pair.token1.id)
                ))!
                return BigDecimal(pair.token1Price).mul(token1.derivedETH) // return token1 per our token * Eth per token 1
            }
            if (pair.token1.id === tokenId) {
                const token0 = (await getOrCreateToken(
                    ctx,
                    assetIdFromAddress(pair.token0.id)
                ))!
                return BigDecimal(pair.token0Price).mul(token0.derivedETH) // return token0 per our token * ETH per token 0
            }
        }
    }
    return ZERO_BD // nothing was found return 0
}
