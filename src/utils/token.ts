import { EventHandlerContext } from '../processor'
import { AssetId, CurrencyId, CurrencyIdV12 } from '../types/common'
import { codec } from '@subsquid/ss58'
import { config, network } from '../config'
import { invert } from 'lodash'
import { hexToU8a } from '@polkadot/util'
import { getVersionedStorage } from '../types/eventsAndStorageSelector'
export const currencyKeyMap: { [index: number]: string } = {
    0: 'Native',
    1: 'XCM',
    2: 'Stellar',
    3: 'ZenlinkLPToken',
}

function versionedCurrencyToCurrencyEnum(
    currency: CurrencyId | CurrencyIdV12
): CurrencyTypeEnum {
    switch (currency.__kind) {
        case 'Native':
            return CurrencyTypeEnum.Native
        case 'Stellar':
            return CurrencyTypeEnum.Stellar
        case 'XCM':
            return CurrencyTypeEnum.XCM
        case 'ZenlinkLPToken':
            return CurrencyTypeEnum.ZenlinkLPToken
        case 'Token':
            // Handle the additional Token type
            return CurrencyTypeEnum.Token
        default:
            throw new Error('Invalid currency type')
    }
}
export enum CurrencyTypeEnum {
    Native = 0,
    XCM = 1,
    Stellar = 2,
    ZenlinkLPToken = 3,
    Token = 4,
}

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

export const USDT_ISSUER: Uint8Array = new Uint8Array([
    59, 153, 17, 56, 14, 254, 152, 139, 160, 168, 144, 14, 177, 207, 228, 79,
    54, 111, 125, 190, 148, 107, 237, 7, 114, 64, 247, 246, 36, 223, 21, 197,
])

export const BRL_ISSUER: Uint8Array = new Uint8Array([
    234, 172, 104, 212, 208, 227, 123, 76, 36, 194, 83, 105, 22, 232, 48, 115,
    95, 3, 45, 13, 107, 42, 28, 143, 202, 59, 197, 162, 94, 8, 62, 58,
])

export const TZS_ISSUER: Uint8Array = new Uint8Array([
    52, 201, 75, 42, 75, 169, 232, 181, 123, 34, 84, 125, 203, 179, 15, 68, 60,
    76, 176, 45, 163, 130, 154, 137, 170, 27, 212, 120, 14, 68, 102, 186,
])

export const USDC_CODE: Uint8Array = new Uint8Array([85, 83, 68, 67])

export const TZS_CODE: Uint8Array = new Uint8Array([84, 90, 83, 0])

export const BRL_CODE: Uint8Array = new Uint8Array([66, 82, 76, 0])

function uint8ArrToHex(uintArray: Uint8Array): string {
    let buffer = Buffer.from(uintArray)
    return '0x' + buffer.toString('hex')
}

export function zenlinkAssetIdToCurrencyId(asset: AssetId): any {
    const assetIndex = Number(asset.assetIndex.toString())
    const tokenType = parseTokenType(assetIndex) as
        | 'ZenlinkLPToken'
        | 'Stellar'
        | 'XCM'
        | 'Native'
    const assetSymbolIndex = assetIndex & 0x0000_0000_0000_00ff

    if (tokenType == 'Native') {
        return { __kind: 'Native' }
    } else if (tokenType == 'XCM') {
        return {
            __kind: tokenType,
            value: assetSymbolIndex,
        }
    } else if (tokenType == 'ZenlinkLPToken') {
        let token0Id = assetIndex & (0x0000_0000_00ff_0000 >> 16)
        let token0Type = assetIndex & (0x0000_0000_ff00_0000 >> 24)
        let token1Id = assetIndex & (0x0000_00ff_0000_0000 >> 32)
        let token1Type = assetIndex & (0x0000_ff00_0000_0000 >> 40)
        return {
            __kind: tokenType,
            value: [token0Id, token0Type, token1Id, token1Type],
        }
    } else if (tokenType == 'Stellar') {
        switch (assetSymbolIndex) {
            case 0:
                return {
                    __kind: tokenType,
                    value: {
                        __kind: 'StellarNative',
                    },
                }
            case 1:
                return {
                    __kind: tokenType,
                    value: {
                        __kind: 'AlphaNum4',
                        code: uint8ArrToHex(USDC_CODE),
                        issuer: uint8ArrToHex(USDT_ISSUER),
                    },
                }
            case 2:
                return {
                    __kind: tokenType,
                    value: {
                        __kind: 'AlphaNum4',
                        code: uint8ArrToHex(TZS_CODE),
                        issuer: uint8ArrToHex(TZS_ISSUER),
                    },
                }
            case 3:
                return {
                    __kind: tokenType,
                    value: {
                        __kind: 'AlphaNum4',
                        code: uint8ArrToHex(BRL_CODE),
                        issuer: uint8ArrToHex(BRL_ISSUER),
                    },
                }
        }
    }
}

// Adheres to derivations defined in [this](https://github.com/pendulum-chain/pendulum/blob/6f92a8d695a7a5ea23c769f03d5f3a621334094e/runtime/common/src/zenlink.rs#L63) function
export function currencyIdToAssetIndex(
    currency: CurrencyId | CurrencyIdV12
): number {
    const tokenType = versionedCurrencyToCurrencyEnum(currency)
    let tokenIndex = 0

    switch (currency.__kind) {
        case 'Native':
            tokenIndex = 0
            break
        case 'XCM':
            tokenIndex = currency.value
            break
        case 'Stellar':
            switch (currency.value.__kind) {
                case 'StellarNative':
                    tokenIndex = 0
                    break
                case 'AlphaNum4':
                    switch (u8a2s(hexToU8a(currency.value.code))) {
                        case 'USDC':
                            tokenIndex = 1
                            break
                        case 'TZS':
                            tokenIndex = 2
                            break
                        case 'BRL':
                            tokenIndex = 3
                            break
                    }
            }
            break
        case 'ZenlinkLPToken':
            tokenIndex =
                (currency.value[0] << 16) +
                (currency.value[1] << 24) +
                (currency.value[2] << 32) +
                (currency.value[3] << 40)
            break
        // we should not care much about this case since
        // Token variant is not yet supported in the zenlink implementation
        case 'Token':
            tokenIndex = Number(currency.value)
    }

    return parseToTokenIndex(tokenType, tokenIndex)
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
        const versionPairStorage = await getVersionedStorage(
            network,
            ctx,
            'zenlinkProtocol',
            'liquidityPairs'
        )
        if (!versionPairStorage.is) return undefined
        pairAssetId = await versionPairStorage.get(ctx.block, assets)
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
        const versionStorage = await getVersionedStorage(
            network,
            ctx,
            'zenlinkProtocol',
            'pairStatuses'
        )

        const result = await versionStorage.get(ctx.block, assets)

        if (!result) return [undefined, BigInt(0)]

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
    account: string
) {
    let result
    if (assetId.__kind === 'Native') {
        const systemAccountStorage = await getVersionedStorage(
            network,
            ctx,
            'system',
            'account'
        )
        result = (await systemAccountStorage.get(ctx.block, account))?.data
    } else {
        let versionedStorage = await getVersionedStorage(
            network,
            ctx,
            'tokens',
            'accounts'
        )
        result = await versionedStorage.get(ctx.block, account, assetId as any)
    }

    return result?.free
}

export async function getTotalIssuance(
    ctx: EventHandlerContext,
    assetId: CurrencyId
) {
    let result
    if (assetId.__kind === 'Native') {
        const balanceIssuanceStorage = await getVersionedStorage(
            network,
            ctx,
            'balances',
            'totalIssuance'
        )
        result = await balanceIssuanceStorage.get(ctx.block)
    } else {
        let versionedStorage = await getVersionedStorage(
            network,
            ctx,
            'tokens',
            'totalIssuance'
        )
        result = await versionedStorage.get(ctx.block, assetId as any)
    }

    return result
}

export async function getTokenBurned(
    ctx: EventHandlerContext,
    assetId: CurrencyId,
    account: string
) {
    let block = {
        hash: ctx.block.parentHash,
    }
    let result
    if (assetId.__kind === 'Native') {
        const systemAccountStorage = await getVersionedStorage(
            network,
            ctx,
            'system',
            'account'
        )
        result = (await systemAccountStorage.get(ctx.block, account))!.data
    } else {
        let versionedStorage = await getVersionedStorage(
            network,
            ctx,
            'tokens',
            'accounts'
        )
        result = await versionedStorage.get(ctx.block, assetId as any)
    }

    return result?.free
}

export function sortAndCheckIfSwitched(entries: [AssetId, AssetId]): {
    sortedPair: [AssetId, AssetId]
    isSwitched: boolean
} {
    const originalEntries = [...entries]

    const sortedPair = entries.sort((a, b) => {
        if (a.assetType < b.assetType) return -1
        if (a.assetType > b.assetType) return 1

        if (a.assetIndex < b.assetIndex) return -1
        if (a.assetIndex > b.assetIndex) return 1

        return 0
    })

    // check if any order was switched by comparing the sorted array to the original
    const isSwitched = !sortedPair.every(
        (item, index) => item === originalEntries[index]
    )

    return { sortedPair, isSwitched }
}
