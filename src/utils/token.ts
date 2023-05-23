import { EventHandlerContext } from '../types'
import storage from '../types/storage'
import { AssetId, CurrencyId } from '../types/common'
import { codec } from '@subsquid/ss58'
import { config } from '../config'
import { invert } from 'lodash'

export const currencyKeyMap: { [index: number]: string } = {
    0: 'Native',
    1: 'XCM',
    2: 'Stellar',
}

export enum CurrencyTypeEnum {
    Native = 0,
    XCM = 1,
    Stellar = 2,
}

export enum CurrencyIndexEnum {
    KSM = 0,
    USDT = 1,
    XLM = 256,
}

export const currencyTokenSymbolMap: { [index: number]: string } = {
    // XCM assets
    0: 'KSM',
    1: 'USDT',

    // Stellar assets
    256: 'XLM',
}

export const invertedTokenSymbolMap = invert(currencyTokenSymbolMap)

export function addressFromAsset({ chainId, assetIndex, assetType }: AssetId) {
    return `${chainId}-${assetType}-${assetIndex.toString()}`
}

export function assetIdFromAddress(address: string): AssetId {
    const [chainId, assetType, assetIndex] = address.split('-')
    return {
        chainId: Number(chainId),
        assetType: Number(assetType),
        assetIndex: BigInt(assetIndex),
    }
}

export function parseTokenType(assetIndex: number): string {
    const assetU8 = (assetIndex & 0x0000_0000_0000_ff00) >> 8

    return currencyKeyMap[assetU8]
}

export function zenlinkAssetIdToCurrencyId(asset: AssetId): CurrencyId {
    const assetIndex = Number(asset.assetIndex.toString())
    const tokenType = parseTokenType(assetIndex) as 'Stellar' | 'XCM' | 'Native'
    const assetSymbolIndex = assetIndex & 0x0000_0000_0000_000ff

    // For assets below u8::max(), we use the assetIndex as the XCM index
    if (assetSymbolIndex < 256) {
        return {
            __kind: 'XCM',
            value: assetSymbolIndex,
        }
    }

    const tokenSymbol = currencyTokenSymbolMap[assetSymbolIndex]

    if (tokenSymbol == 'XLM') {
        return {
            __kind: 'Stellar',
            value: {
                __kind: 'StellarNative',
            },
        }
    } else {
        const code = s2u8a(tokenSymbol)
        // TODO fix me
        const issuer = s2u8a('')
        const stellarCurrencyKind =
            code.length <= 4 ? 'AlphaNum4' : 'AlphaNum12'

        return {
            __kind: 'Stellar',
            value: {
                __kind: stellarCurrencyKind,
                code,
                issuer,
            },
        }
    }
}

export function u8a2s(u8a: Uint8Array) {
    let dataString = ''
    for (let i = 0; i < u8a.length; i++) {
        dataString += String.fromCharCode(u8a[i])
    }

    return dataString
}

export function s2u8a(str: string) {
    const arr = []
    for (let i = 0, j = str.length; i < j; ++i) {
        arr.push(str.charCodeAt(i))
    }

    return new Uint8Array(arr)
}

export function parseToTokenIndex(type: number, index: number): number {
    if (type === 0) return 0

    return (type << 8) + index
}

const pairAssetIds = new Map<string, AssetId>()

export async function getPairAssetIdFromAssets(
    ctx: EventHandlerContext,
    assets: [AssetId, AssetId]
) {
    const [asset0, asset1] = assets
    const token0Address = addressFromAsset(asset0)
    const token1Address = addressFromAsset(asset1)
    const assetsId = `${token0Address}-${token1Address}`
    let pairAssetId: AssetId | undefined
    if (pairAssetIds.has(assetsId)) {
        pairAssetId = pairAssetIds.get(assetsId)
    } else {
        const pairsStorage = new storage.ZenlinkProtocolLiquidityPairsStorage(
            ctx,
            ctx.block
        )
        if (!pairsStorage.isExists) return undefined
        pairAssetId = await pairsStorage.asV7.get(assets)
        if (pairAssetId) {
            pairAssetIds.set(assetsId, pairAssetId)
        }
    }
    return pairAssetId
}

const pairAccounts = new Map<string, string>()

export async function getPairStatusFromAssets(
    ctx: EventHandlerContext,
    assets: [AssetId, AssetId],
    onlyAccount = true
): Promise<[string | undefined, BigInt]> {
    const [asset0, asset1] = assets
    const token0Address = addressFromAsset(asset0)
    const token1Address = addressFromAsset(asset1)
    const assetsId = `${token0Address}-${token1Address}`
    let pairAccount: string | undefined
    if (pairAccounts.has(assetsId) && onlyAccount) {
        pairAccount = pairAccounts.get(assetsId)
        return [pairAccount!, BigInt(0)]
    } else {
        const statusStorage = new storage.ZenlinkProtocolPairStatusesStorage(
            ctx,
            ctx.block
        )
        if (!statusStorage.isExists) return [undefined, BigInt(0)]
        const result = await statusStorage.asV7.get(assets)
        if (result.__kind === 'Trading') {
            pairAccount = codec(config.prefix).encode(result.value.pairAccount)
            pairAccounts.set(assetsId, pairAccount)
            return [pairAccount, result.value.totalSupply]
        }

        return [undefined, BigInt(0)]
    }
}

export async function getTokenBalance(
    ctx: EventHandlerContext,
    assetId: CurrencyId,
    account: Uint8Array
) {
    let result
    if (assetId.__kind === 'Native') {
        const systemAccountStorage = new storage.SystemAccountStorage(
            ctx,
            ctx.block
        )
        result = (await systemAccountStorage.asV1.get(account)).data
    } else {
        const tokenAccountsStorage = new storage.TokensAccountsStorage(
            ctx,
            ctx.block
        )
        if (tokenAccountsStorage.isV3) {
            result = await tokenAccountsStorage.asV3.get(
                account,
                assetId as any
            )
        } else if (tokenAccountsStorage.isV8) {
            result = await tokenAccountsStorage.asV8.get(
                account,
                assetId as any
            )
        }
    }

    return result?.free
}

export async function getTotalIssuance(
    ctx: EventHandlerContext,
    assetId: CurrencyId
) {
    let result
    if (assetId.__kind === 'Native') {
        const balanceIssuanceStorage = new storage.BalancesTotalIssuanceStorage(
            ctx,
            ctx.block
        )
        result = await balanceIssuanceStorage.asV1.get()
    } else {
        const tokenIssuanceStorage = new storage.TokensTotalIssuanceStorage(
            ctx,
            ctx.block
        )
        if (tokenIssuanceStorage.isV3) {
            result = await tokenIssuanceStorage.asV3.get(assetId as any)
        } else if (tokenIssuanceStorage.isV8) {
            result = await tokenIssuanceStorage.asV8.get(assetId as any)
        }
    }

    return result
}

export async function getTokenBurned(
    ctx: EventHandlerContext,
    assetId: CurrencyId,
    account: Uint8Array
) {
    let block = {
        hash: ctx.block.parentHash,
    }
    let result
    if (assetId.__kind === 'Native') {
        const systemAccountStorage = new storage.SystemAccountStorage(
            ctx,
            block
        )
        result = (await systemAccountStorage.asV1.get(account)).data
    } else {
        const tokenAccountsStorage = new storage.TokensAccountsStorage(
            ctx,
            block
        )
        if (tokenAccountsStorage.isV3) {
            result = await tokenAccountsStorage.asV3.get(
                account,
                assetId as any
            )
        } else if (tokenAccountsStorage.isV8) {
            result = await tokenAccountsStorage.asV8.get(
                account,
                assetId as any
            )
        }
    }

    return result?.free
}
