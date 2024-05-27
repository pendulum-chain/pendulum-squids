import { EventHandlerContext } from '../../processor'
import {
    BackstopPool,
    Router,
    NablaToken,
    SwapPool,
    NablaSwapFee,
} from '../../model'
import * as backstopPoolAbi from '../../abi/backstop'
import * as erc20Abi from '../../abi/erc20'
import * as swapPoolAbi from '../../abi/swap'
import { hexToSs58 } from './addresses'

export const ZERO_ADDRESS =
    '0x0000000000000000000000000000000000000000000000000000000000000000'

export async function getBackstopPool(
    ctx: EventHandlerContext,
    ss58Address: string,
    withFeeHistory: boolean = false
) {
    return await ctx.store.findOne(BackstopPool, {
        where: { id: ss58Address },
        relations: { token: true, router: true, feesHistory: withFeeHistory },
    })
}

export async function getRouter(ctx: EventHandlerContext, ss58Address: string) {
    return await ctx.store.get(Router, ss58Address)
}

export async function getSwapPool(
    ctx: EventHandlerContext,
    ss58Address: string,
    withFeeHistory: boolean = false
) {
    return await ctx.store.findOne(SwapPool, {
        where: { id: ss58Address },
        relations: { token: true, backstop: true, feesHistory: withFeeHistory },
    })
}

export async function getSwapPoolsOfRouterForToken(
    ctx: EventHandlerContext,
    routerSs58Address: string,
    tokenSs58Address: string
) {
    return await ctx.store.findOne(SwapPool, {
        where: {
            router: { id: routerSs58Address },
            token: { id: tokenSs58Address },
        },
        relations: { token: true },
    })
}

export async function createBackstopPool(
    ctx: EventHandlerContext,
    hexAddress: string
) {
    const ss58Address = hexToSs58(hexAddress)
    if (await getBackstopPool(ctx, ss58Address)) {
        // Unexpected error: backstop pool already exists at that address
        console.log(
            `createBackstopPool: backstop pool already exists at ${ss58Address}`
        )
        return
    }

    const contract = new backstopPoolAbi.Contract(ctx, hexAddress)

    const routerAddress = await contract.router()
    const tokenAddress = await contract.asset()

    if (routerAddress === ZERO_ADDRESS || tokenAddress === ZERO_ADDRESS) {
        return undefined
    }

    const router = await getRouter(ctx, hexToSs58(routerAddress))
    if (router === undefined) {
        return undefined
    }

    const token = await getOrCreateNablaToken(ctx, tokenAddress)
    const tokenContract = new erc20Abi.Contract(ctx, tokenAddress)

    const backstop = new BackstopPool({
        id: ss58Address,
        name: await contract.name(),
        symbol: await contract.symbol(),
        lpTokenDecimals: await contract.decimals(),
        router: router,
        token: token,
        reserves: await tokenContract.balanceOf(hexAddress),
        totalSupply: await contract.totalSupply(),
        paused: false,
        apr: 0n,
    })
    await ctx.store.save(backstop)
}

export async function createRouter(
    ctx: EventHandlerContext,
    hexAddress: string
) {
    const ss58Address = hexToSs58(hexAddress)
    if (await getRouter(ctx, ss58Address)) {
        // Unexpected error: router already exists at that address
        console.log(`createRouter: router already exists at ${ss58Address}`)
        return
    }

    const router = new Router({
        id: ss58Address,
        paused: false,
    })
    await ctx.store.save(router)
}

export async function getOrCreateNablaToken(
    ctx: EventHandlerContext,
    hexAddress: string
) {
    const ss58Address = hexToSs58(hexAddress)
    let nablaToken = await ctx.store.get(NablaToken, ss58Address)
    if (!nablaToken) {
        const contract = new erc20Abi.Contract(ctx, hexAddress)
        nablaToken = new NablaToken({
            id: ss58Address,
            decimals: await contract.decimals(),
            name: await contract.name(),
            symbol: await contract.symbol(),
        })
        await ctx.store.save(nablaToken)
    }
    return nablaToken
}

export async function createSwapPool(
    ctx: EventHandlerContext,
    hexAddress: string
) {
    const ss58Address = hexToSs58(hexAddress)
    if (await getSwapPool(ctx, ss58Address)) {
        // Unexpected error: swap pool already exists at that address
        console.log(
            `createSwapPool: swap pool already exists at ${ss58Address}`
        )
        return
    }

    const contract = new swapPoolAbi.Contract(ctx, hexAddress)

    const backstopPoolAddress = await contract.backstop()
    const routerAddress = await contract.router()
    const tokenAddress = await contract.asset()
    const protocolTreasuryAddress = await contract.protocolTreasury()

    if (
        backstopPoolAddress === ZERO_ADDRESS ||
        routerAddress === ZERO_ADDRESS ||
        tokenAddress === ZERO_ADDRESS
    ) {
        return undefined
    }

    const protocolTreasurySs58Address =
        protocolTreasuryAddress === ZERO_ADDRESS
            ? null
            : hexToSs58(protocolTreasuryAddress)
    const backstopPoolSs58Address = hexToSs58(backstopPoolAddress)
    const routerSs58Address = hexToSs58(routerAddress)
    const backstop = await getBackstopPool(ctx, backstopPoolSs58Address)
    const router = await getRouter(ctx, routerSs58Address)

    if (backstop === undefined || router === undefined) {
        return undefined
    }

    const token = await getOrCreateNablaToken(ctx, tokenAddress)
    const coverage = await contract.coverage()

    const swapPool = new SwapPool({
        id: ss58Address,
        name: await contract.name(),
        symbol: await contract.symbol(),
        lpTokenDecimals: await contract.decimals(),
        router: undefined, // only register router when owner adds this swap pool
        backstop: backstop,
        token: token,
        reserve: coverage[0],
        reserveWithSlippage: await contract.reserveWithSlippage(),
        totalLiabilities: coverage[1],
        totalSupply: await contract.totalSupply(),
        paused: false,
        apr: 0n,
        insuranceFeeBps: 0n,
        protocolTreasuryAddress: protocolTreasurySs58Address,
    })
    await ctx.store.save(swapPool)
}

export async function createSwapFee(
    ctx: EventHandlerContext,
    blockNumber: number,
    extrinsicIndex: number | undefined,
    lpFees: bigint,
    backstopFees: bigint,
    protocolFees: bigint,
    timestamp: number | undefined,
    swapPool: SwapPool,
    backstopPool: BackstopPool | undefined
): Promise<NablaSwapFee> {
    const swapFeeId = `${blockNumber}-${extrinsicIndex ?? ''}`
    const swapFee = new NablaSwapFee({
        id: swapFeeId,
        lpFees,
        backstopFees,
        protocolFees,
        timestamp: BigInt(timestamp ?? Date.now() / 1000),
        swapPool,
        backstopPool,
    })

    await ctx.store.save(swapFee)
    return swapFee
}
