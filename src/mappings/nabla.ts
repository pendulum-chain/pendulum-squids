import { EventHandlerContext } from '../types'
import { network } from '../config'
import * as ss58 from '@subsquid/ss58'
import { toHex } from '@subsquid/util-internal-hex'
import { BackstopPool, Router, NablaToken, SwapPool } from '../model'
import * as bpool from '../abi/backstop'
import * as erc20 from '../abi/erc20'
import * as spool from '../abi/swap'
import * as rou from '../abi/router'

function ss8ToHex(ss8Address: string[]) {
    var addresses = []

    for (var address of ss8Address) {
        addresses.push(toHex(ss58.decode(address).bytes))
    }

    return addresses
}

const FOUCOCO_CONTRACTS = [
    '6h7p67AZyzWiN42FSzkWyGZaqMuajo2BAm43LXBQHVXJ8sq7', // Backstop Pool
    '6mrTyH54tYXKsVxrahapG1S54cVMqqwqtnmTLLbj3NZT2f1k', // Router
    '6mnENTpY6B5mqtUHsjv3BxwKucT9hqF761QrYGfD22ccLzdC', // Platypus Curve
    '6gxRBjkhfaWMAhMQmEA1MUvGssc2f9ercXPZrzFUKWTTaCyq', // Swap Pool example
    '6n32n4F11qfFXfFYhVj15fChZTXpVP5zJSM98361gK5QKrxW', // Mock Oracle
    '6h6JMHYBV7P6uQekZXzHmmpzx7tzHutTyx448MnFogR6dNde', // ERC20 example
]

const AMPLITUDE_CONTRACTS = [
    '6h7p67AZyzWiN42FSzkWyGZaqMuajo2BAm43LXBQHVXJ8sq7', // Backstop Pool
    '6mrTyH54tYXKsVxrahapG1S54cVMqqwqtnmTLLbj3NZT2f1k', // Router
    '6mnENTpY6B5mqtUHsjv3BxwKucT9hqF761QrYGfD22ccLzdC', // Platypus Curve
    '6gxRBjkhfaWMAhMQmEA1MUvGssc2f9ercXPZrzFUKWTTaCyq', // Swap Pool example
    '6n32n4F11qfFXfFYhVj15fChZTXpVP5zJSM98361gK5QKrxW', // Mock Oracle
    '6h6JMHYBV7P6uQekZXzHmmpzx7tzHutTyx448MnFogR6dNde', // ERC20 example
]

function getContractsAddresses() {
    if (network == 'foucoco') {
        return ss8ToHex(FOUCOCO_CONTRACTS)
    } else {
        return ss8ToHex(AMPLITUDE_CONTRACTS)
    }
}

export const [
    BACKSTOP_POOL_CONTRACT_ADDRESS,
    ROUTER_CONTRACT_ADDRESS,
    MOCK_PLATYPUS_CURVE_CONTRACT_ADDRESS,
    SWAP_POOL_CONTRACT_ADDRESS,
    MOCK_ORACLE_CONTRACT_ADDRESS,
    MOCK_ERC20_CONTRACT_ADDRESS,
] = getContractsAddresses()

export async function handleContractEvent(ctx: EventHandlerContext) {
    if (ctx.event.args.contract == BACKSTOP_POOL_CONTRACT_ADDRESS) {
        const event = bpool.decodeEvent(ctx.event.args.data)
        if (event.__kind == 'Burn') {
            await backstophandleBurn(ctx)
        } else if (event.__kind == 'CoverSwapWithdrawal') {
            await backstopHandleCoverSwapWithdrawal(ctx, event)
        } else if (event.__kind == 'WithdrawSwapLiquidity') {
            await backstopHandleWithdrawSwapLiquidity(ctx, event)
        } else if (event.__kind == 'Mint') {
            await backstopHandleMint(ctx)
        } else if (event.__kind == 'OwnershipTransferred') {
            await backstopHandleOwnershipTransferred(ctx)
        } else if (event.__kind == 'Paused') {
            await backstopHandlePaused(ctx)
        } else if (event.__kind == 'Unpaused') {
            await backstopHandleUnpaused(ctx)
        } else if (event.__kind == 'Transfer') {
            await backstopHandleTransfer(ctx)
        }
    } else if (ctx.event.args.contract == ROUTER_CONTRACT_ADDRESS) {
        const event = rou.decodeEvent(ctx.event.args.data)
        if (event.__kind == 'OwnershipTransferred') {
            await routerHandleOwnershipTransferred(ctx)
        } else if (event.__kind == 'Paused') {
            await routerHandlePaused(ctx)
        } else if (event.__kind == 'Swap') {
            await routerHandleSwap(ctx)
        } else if (event.__kind == 'Unpaused') {
            await routerHandleUnpaused(ctx)
        }
    } else if (ctx.event.args.contract == SWAP_POOL_CONTRACT_ADDRESS) {
        const event = spool.decodeEvent(ctx.event.args.data)
        if (event.__kind == 'BackstopDrain') {
            await swapHandleBackstopDrain(ctx)
        } else if (event.__kind == 'Burn') {
            await swapHandleBurn(ctx)
        } else if (event.__kind == 'Mint') {
            await swapHandleMint(ctx)
        } else if (event.__kind == 'ChargedSwapFees') {
            await swapHandleChargedSwapFees(ctx)
        } else if (event.__kind == 'OwnershipTransferred') {
            await swapHandleOwnershipTransferred(ctx)
        } else if (event.__kind == 'Paused') {
            await swapHandlePaused(ctx)
        } else if (event.__kind == 'Unpaused') {
            await swapHandleUnpaused(ctx)
        } else if (event.__kind == 'Transfer') {
            await swapHandleTransfer(ctx)
        }
    }
}

export async function backstophandleBurn(ctx: EventHandlerContext) {
    const backstop = await getOrCreateBackstopPool(ctx, ctx.event.args.contract)

    await updateBackstopCoverageAndSupply(ctx, backstop)
    ctx.store.save(backstop)
}

export async function backstopHandleCoverSwapWithdrawal(
    ctx: EventHandlerContext,
    event: bpool.Event_CoverSwapWithdrawal
) {
    const backstop = await getOrCreateBackstopPool(ctx, ctx.event.args.contract)
    const pool = await getOrCreateSwapPool(ctx, toHex(event.swapPool))

    updateBackstopCoverageAndSupply(ctx, backstop)
    updateSwapPoolCoverageAndSupply(ctx, pool)

    ctx.store.save(backstop)
    ctx.store.save(pool)
}

export async function backstopHandleMint(ctx: EventHandlerContext) {
    const backstop = await getOrCreateBackstopPool(ctx, ctx.event.args.contract)

    updateBackstopCoverageAndSupply(ctx, backstop)
    ctx.store.save(backstop)
}

export async function backstopHandleOwnershipTransferred(
    ctx: EventHandlerContext
) {
    // This event will always be emitted on pool creation
    const backstop = await getOrCreateBackstopPool(ctx, ctx.event.args.contract)
    ctx.store.save(backstop)
}

export async function backstopHandlePaused(ctx: EventHandlerContext) {
    const backstop = await getOrCreateBackstopPool(ctx, ctx.event.args.contract)

    backstop.paused = true
    ctx.store.save(backstop)
}

export async function backstopHandleTransfer(ctx: EventHandlerContext) {
    const backstop = await getOrCreateBackstopPool(ctx, ctx.event.args.contract)
    ctx.store.save(backstop)
}

export async function backstopHandleUnpaused(ctx: EventHandlerContext) {
    const backstop = await getOrCreateBackstopPool(ctx, ctx.event.args.contract)

    backstop.paused = false
    ctx.store.save(backstop)
}

export async function backstopHandleWithdrawSwapLiquidity(
    ctx: EventHandlerContext,
    event: bpool.Event_WithdrawSwapLiquidity
) {
    const backstop = await getOrCreateBackstopPool(ctx, ctx.event.args.contract)
    const pool = await getOrCreateSwapPool(ctx, toHex(event.swapPool))
    await updateBackstopCoverageAndSupply(ctx, backstop)
    await updateSwapPoolCoverageAndSupply(ctx, pool)

    ctx.store.save(backstop)
    ctx.store.save(pool)
}

export async function swapHandleBackstopDrain(ctx: EventHandlerContext) {
    const pool = await getOrCreateSwapPool(ctx, ctx.event.args.contract)
    const backstop = await getOrCreateBackstopPool(ctx, pool.backstop.id)

    await updateSwapPoolCoverageAndSupply(ctx, pool)
    await updateBackstopCoverageAndSupply(ctx, backstop)

    ctx.store.save(pool)
    ctx.store.save(backstop)
}

export async function swapHandleBurn(ctx: EventHandlerContext) {
    const pool = await getOrCreateSwapPool(ctx, ctx.event.args.contract)

    await updateSwapPoolCoverageAndSupply(ctx, pool)
    ctx.store.save(pool)
}

export function swapHandleChargedSwapFees(ctx: EventHandlerContext) {
    // TODO
}

export async function swapHandleMint(ctx: EventHandlerContext) {
    const pool = await getOrCreateSwapPool(ctx, ctx.event.args.contract)

    await updateSwapPoolCoverageAndSupply(ctx, pool)
    ctx.store.save(pool)
}

export async function swapHandleOwnershipTransferred(ctx: EventHandlerContext) {
    // This event will always be emitted on pool creation
    const pool = await getOrCreateSwapPool(ctx, ctx.event.args.contract)
    ctx.store.save(pool)
}

export async function swapHandlePaused(ctx: EventHandlerContext) {
    const pool = await getOrCreateSwapPool(ctx, ctx.event.args.contract)

    pool.paused = true
    ctx.store.save(pool)
}

export async function swapHandleTransfer(ctx: EventHandlerContext) {}

export async function swapHandleUnpaused(ctx: EventHandlerContext) {
    const pool = await getOrCreateSwapPool(ctx, ctx.event.args.contract)

    pool.paused = false
    ctx.store.save(pool)
}

export async function routerHandleOwnershipTransferred(
    ctx: EventHandlerContext
) {
    // This event will always be emitted on router creation
    const router = await getOrCreateRouter(ctx, ctx.event.args.contract)
    ctx.store.save(router)
}

export async function routerHandlePaused(ctx: EventHandlerContext) {
    const router = await getOrCreateRouter(ctx, ctx.event.args.contract)
    // Set the 'paused' property to true
    router.paused = true
    ctx.store.save(router)
}

export async function routerHandleUnpaused(ctx: EventHandlerContext) {
    const router = await getOrCreateRouter(ctx, ctx.event.args.contract)
    // Set the 'paused' property to false
    router.paused = false
    ctx.store.save(router)
}

export async function routerHandleSwap(ctx: EventHandlerContext) {
    await getOrCreateRouter(ctx, ctx.event.args.contract)
}

export async function routerHandleSwapPoolRegistered(ctx: EventHandlerContext) {
    await getOrCreateRouter(ctx, ctx.event.args.contract)
    await getOrCreateSwapPool(ctx, ctx.event.args.pool)
}

export async function updateBackstopCoverageAndSupply(
    ctx: EventHandlerContext,
    backstop: BackstopPool
) {
    const contract = new bpool.Contract(ctx, backstop.id)
    const coverage = await contract.coverage()

    backstop.totalSupply = await contract.totalSupply()
    backstop.reserves = coverage[0]
    backstop.liabilities = coverage[1]
}

export async function updateSwapPoolCoverageAndSupply(
    ctx: EventHandlerContext,
    pool: SwapPool
) {
    const contract = new spool.Contract(ctx, pool.id)
    const coverage = await contract.coverage()

    pool.totalSupply = await contract.totalSupply()
    pool.reserves = coverage[0]
    pool.liabilities = coverage[1]
}

export async function getOrCreateBackstopPool(
    ctx: EventHandlerContext,
    address: string
) {
    let backstop = await ctx.store.get(BackstopPool, address)
    if (!backstop) {
        const contract = new bpool.Contract(ctx, address)
        let router = await getOrCreateRouter(
            ctx,
            toHex(await contract.router())
        )
        let coverage = await contract.coverage()
        backstop = new BackstopPool({
            id: BACKSTOP_POOL_CONTRACT_ADDRESS,
            router: router,
            token: await getOrCreateNablaToken(
                ctx,
                toHex(await contract.asset())
            ),
            totalSupply: await contract.totalSupply(),
            reserves: coverage[0],
            liabilities: coverage[1],
            paused: false,
        })
        ctx.store.save(backstop)
    }
    return backstop
}

export async function getOrCreateRouter(
    ctx: EventHandlerContext,
    address: string
) {
    let router = await ctx.store.get(Router, address)
    if (!router) {
        router = new Router({
            id: address,
            swapPools: [],
            backstopPools: [],
            paused: false,
        })
        ctx.store.save(router)
    }
    return router
}

export async function getOrCreateNablaToken(
    ctx: EventHandlerContext,
    address: string
) {
    let nablaToken = await ctx.store.get(NablaToken, address)
    if (!nablaToken) {
        const contract = new erc20.Contract(ctx, address)
        nablaToken = new NablaToken({
            id: address,
            decimals: await contract.decimals(),
            name: await contract.name(),
            symbol: await contract.symbol(),
        })
        ctx.store.save(nablaToken)
    }
    return nablaToken
}

export async function getOrCreateSwapPool(
    ctx: EventHandlerContext,
    address: string
) {
    let swapPool = await ctx.store.get(SwapPool, address)
    if (!swapPool) {
        const contract = new spool.Contract(ctx, address)
        let router = await getOrCreateRouter(
            ctx,
            toHex(await contract.router())
        )
        let backstop = await getOrCreateBackstopPool(
            ctx,
            toHex(await contract.backstop())
        )
        let token = await getOrCreateNablaToken(
            ctx,
            toHex(await contract.asset())
        )
        let coverage = await contract.coverage()
        swapPool = new SwapPool({
            id: address,
            router: router,
            backstop: backstop,
            token: token,
            totalSupply: await contract.totalSupply(),
            reserves: coverage[0],
            liabilities: coverage[1],
            paused: false,
        })
        ctx.store.save(swapPool)
    }
    return swapPool
}
