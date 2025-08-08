import { EventHandlerContext } from '../../processor'
import * as backstopPoolAbi from '../../abi/backstop'
import * as swapPoolAbi from '../../abi/swap'
import * as routerAbi from '../../abi/router'
import {
    ZERO_ADDRESS,
    getBackstopPool,
    getRouter,
    getSwapPool,
} from './creation'
import { createBackstopPool, createRouter, createSwapPool } from './creation'
import { handleBackstopPoolEvent } from './backstopPoolEventHandler'
import { handleRouterEvent } from './routerEventHandler'
import { handleSwapPoolEvent } from './swapPoolEventHandler'
import { hexToSs58 } from './addresses'

export async function handleContractInstantiated(ctx: EventHandlerContext) {
    const contractHexAddress = ctx.event.args.contract
    if (contractHexAddress === ZERO_ADDRESS) {
        return
    }

    const contractInfo = await ctx.block._runtime.queryStorage(
        ctx.block.hash,
        'Contracts.ContractInfoOf',
        [contractHexAddress]
    )
    const contractCodeHash = contractInfo[0].codeHash as string

    switch (contractCodeHash) {
        case backstopPoolAbi.metadata.source.hash:
            await createBackstopPool(ctx, contractHexAddress)
            break

        case routerAbi.metadata.source.hash:
            await createRouter(ctx, contractHexAddress)
            break

        case swapPoolAbi.metadata.source.hash:
            await createSwapPool(ctx, contractHexAddress)
            break
        case '0x90c0d03030a2ba21a18c33af3c9931fc0f0a988b31f081bcc2c86c7107c48ccd': // Hash of the new SwapPool for BRLA
            await createSwapPool(ctx, contractHexAddress)
            break
    }
}

export async function handleContractEvent(ctx: EventHandlerContext) {
    const contractSs58Address = hexToSs58(ctx.event.args.contract)

    const [maybeBackstopPool, maybeRouter, maybeSwapPool] = await Promise.all([
        getBackstopPool(ctx, contractSs58Address),
        getRouter(ctx, contractSs58Address),
        getSwapPool(ctx, contractSs58Address),
    ])

    switch (true) {
        case maybeBackstopPool !== undefined:
            await handleBackstopPoolEvent(ctx, maybeBackstopPool!)
            break

        case maybeRouter !== undefined:
            await handleRouterEvent(ctx, maybeRouter!)
            break

        case maybeSwapPool !== undefined:
            await handleSwapPoolEvent(ctx, maybeSwapPool!)
            break
    }
}
