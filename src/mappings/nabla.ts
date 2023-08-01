import { EventHandlerContext } from '../types'
import { network } from '../config'
import * as ss58 from '@subsquid/ss58'
import { toHex } from '@subsquid/util-internal-hex'

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
    } else if (ctx.event.args.address == ROUTER_CONTRACT_ADDRESS) {
    } else if (ctx.event.args.address == MOCK_PLATYPUS_CURVE_CONTRACT_ADDRESS) {
    } else if (ctx.event.args.address == SWAP_POOL_CONTRACT_ADDRESS) {
    } else if (ctx.event.args.address == MOCK_ORACLE_CONTRACT_ADDRESS) {
    } else if (ctx.event.args.address == MOCK_ERC20_CONTRACT_ADDRESS) {
    }
}
