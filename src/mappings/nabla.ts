import { EventHandlerContext } from '../types'
import { network } from '../config'
import * as ss58 from '@subsquid/ss58'
import { toHex } from '@subsquid/util-internal-hex'
import { BackstopPool, Router, NablaToken, SwapPool } from '../model'
import * as bpool from '../abi/backstop'
import * as erc20 from '../abi/erc20'
import * as spool from '../abi/swap'

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
    if (ctx.event.args.address == BACKSTOP_POOL_CONTRACT_ADDRESS) {
        await getOrCreateBackstopPool(ctx, BACKSTOP_POOL_CONTRACT_ADDRESS)
    } else if (ctx.event.args.address == ROUTER_CONTRACT_ADDRESS) {
        await getOrCreateRouter(ctx, ROUTER_CONTRACT_ADDRESS)
    } else if (ctx.event.args.address == MOCK_PLATYPUS_CURVE_CONTRACT_ADDRESS) {
    } else if (ctx.event.args.address == SWAP_POOL_CONTRACT_ADDRESS) {
    } else if (ctx.event.args.address == MOCK_ORACLE_CONTRACT_ADDRESS) {
    } else if (ctx.event.args.address == MOCK_ERC20_CONTRACT_ADDRESS) {
        await getOrCreateNablaToken(ctx, MOCK_ERC20_CONTRACT_ADDRESS)
    }
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
            reserves: coverage.at(0),
            liabilities: coverage.at(1),
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

// export async function getOrCreateSwapPool(
//     ctx: EventHandlerContext,
//     address: string
// ) {
//     let swapPool = await ctx.store.get(SwapPool, address)
//     if (!swapPool) {
//         const contract = new spool.Contract(ctx, address)
//         let router = await getOrCreateRouter(ctx, toHex(await contract.router()))
//         let backstop = await getOrCreateBackstopPool(ctx, toHex(await contract.backstop()))
//         // let tocken = await getOrCreateNablaToken(ctx, )
//         swapPool = new SwapPool({
//             id: address,
//             router: router,
//             backstop: backstop

//         })
//         ctx.store.save(swapPool)
//     }
//     return swapPool
// }
