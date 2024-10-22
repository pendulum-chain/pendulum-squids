import { Ctx, BlockHeader_ } from '../../processor'
import { Router } from '../../model'
import { ss58ToHex } from '../nabla/addresses'
import { network } from '../../config'
import { BackstopPool, SwapPool, NablaToken } from '../../model'

import { Contract as BackstopPoolContract } from '../../abi/backstop'
import { Contract as OracleContract } from '../../abi/oracle'
import { Contract as RouterContract } from '../../abi/router'

import { Big } from 'big.js'

export async function getBackstopPoolLPPrice(
    ctx: Ctx,
    block: BlockHeader_,
    backstopPool: BackstopPool
) {
    const contract = new BackstopPoolContract(
        ctx,
        ss58ToHex(backstopPool.id),
        block.hash
    )
    const totalValue = await contract.getTotalPoolWorth()

    const { priceUsdUnits, decimals } = await getBackstopPoolTokenPrice(
        ctx,
        block,
        backstopPool
    )

    const totalValueBig = new Big(totalValue.toString()).times(priceUsdUnits)
    const totalSupplyBig = new Big(backstopPool.totalSupply.toString())
    const price = totalValueBig.div(totalSupplyBig)

    return price
}

export async function getSwapPoolLPPrice(
    ctx: Ctx,
    block: BlockHeader_,
    swapPool: SwapPool
) {
    const totalLiabilitiesBig = new Big(swapPool.totalLiabilities.toString())

    const { priceUsdUnits, decimals } = await getSwapPoolTokenPrice(
        ctx,
        block,
        swapPool
    )

    const totalSupplyBig = new Big(swapPool.totalSupply.toString())
    const price = totalLiabilitiesBig.times(priceUsdUnits).div(totalSupplyBig)

    return price
}

async function getSwapPoolTokenPrice(
    ctx: Ctx,
    block: BlockHeader_,
    swapPool: SwapPool
): Promise<any> {
    const { router, token } = await getRouterAndToken(ctx, swapPool, 'swapPool')

    const routerContract = new RouterContract(
        ctx,
        ss58ToHex(router.id),
        block.hash
    )
    const relevantOracleHexAddress = await routerContract.oracleByAsset(
        ss58ToHex(token.id)
    )
    const oracleContract = new OracleContract(
        ctx,
        relevantOracleHexAddress,
        block.hash
    )

    const poolAssetPrice = (await oracleContract.stateCall('0xb3596f07', [
        ss58ToHex(token.id),
    ])) as string

    const priceUsdUnits = new Big(poolAssetPrice).div(new Big(10).pow(12))
    return { priceUsdUnits: priceUsdUnits, decimals: token.decimals }
}

async function getBackstopPoolTokenPrice(
    ctx: Ctx,
    block: BlockHeader_,
    backstopPool: BackstopPool
): Promise<any> {
    const { router, token } = await getRouterAndToken(
        ctx,
        backstopPool,
        'backstopPool'
    )

    const routerContract = new RouterContract(
        ctx,
        ss58ToHex(router.id),
        block.hash
    )
    const relevantOracleHexAddress = await routerContract.oracleByAsset(
        ss58ToHex(token.id)
    )
    const oracleContract = new OracleContract(
        ctx,
        relevantOracleHexAddress,
        block.hash
    )

    const poolAssetPrice = (await oracleContract.stateCall('0xb3596f07', [
        //0xb3596f07 -> getAssetPrice call
        ss58ToHex(token.id),
    ])) as string
    const priceUsdUnits = new Big(poolAssetPrice).div(new Big(10).pow(12))

    return { priceUsdUnits: priceUsdUnits, decimals: token.decimals }
}

async function getRouterAndToken(
    ctx: Ctx,
    pool: SwapPool | BackstopPool,
    poolType: 'swapPool' | 'backstopPool'
): Promise<{ router: Router; token: NablaToken }> {
    const relationKey = poolType === 'swapPool' ? 'swapPools' : 'backstopPool'

    const router = await ctx.store.findOne(Router, {
        where: {
            [relationKey]: {
                id: pool.id,
            },
        },
    })

    const token = await ctx.store.findOne(NablaToken, {
        where: {
            [relationKey]: {
                id: pool.id,
            },
        },
    })

    if (!router || !token) {
        throw new Error(
            `Router address or token address not found for ${poolType} ${pool.id}. They should exist at this point.`
        )
    }

    return { router, token }
}
