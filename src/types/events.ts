import assert from 'assert'
import {Chain, ChainContext, EventContext, Event, Result, Option} from './support'
import * as v3 from './v3'
import * as v7 from './v7'
import * as v8 from './v8'

export class BalancesTransferEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Balances.Transfer')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Transfer succeeded.
     */
    get isV1(): boolean {
        return this._chain.getEventHash('Balances.Transfer') === '0ffdf35c495114c2d42a8bf6c241483fd5334ca0198662e14480ad040f1e3a66'
    }

    /**
     * Transfer succeeded.
     */
    get asV1(): {from: Uint8Array, to: Uint8Array, amount: bigint} {
        assert(this.isV1)
        return this._chain.decodeEvent(this.event)
    }
}

export class TokensBalanceSetEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Tokens.BalanceSet')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * A balance was set by root.
     */
    get isV3(): boolean {
        return this._chain.getEventHash('Tokens.BalanceSet') === '219ad45ff6115e031aeed1bc3cec4777aebb69e21e0502d08df00e5cbc1328e1'
    }

    /**
     * A balance was set by root.
     */
    get asV3(): {currencyId: v3.CurrencyId, who: Uint8Array, free: bigint, reserved: bigint} {
        assert(this.isV3)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * A balance was set by root.
     */
    get isV8(): boolean {
        return this._chain.getEventHash('Tokens.BalanceSet') === '912241b33e6c940c96d79f192a192f65bf386f0e8cf006b52a7986e36b8793e1'
    }

    /**
     * A balance was set by root.
     */
    get asV8(): {currencyId: v8.CurrencyId, who: Uint8Array, free: bigint, reserved: bigint} {
        assert(this.isV8)
        return this._chain.decodeEvent(this.event)
    }
}

export class TokensDepositedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Tokens.Deposited')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Deposited some balance into an account
     */
    get isV3(): boolean {
        return this._chain.getEventHash('Tokens.Deposited') === 'a8442ff01fe9baaf51b3bb3ae62365d8100656ccc162be57ce70e5024778755e'
    }

    /**
     * Deposited some balance into an account
     */
    get asV3(): {currencyId: v3.CurrencyId, who: Uint8Array, amount: bigint} {
        assert(this.isV3)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * Deposited some balance into an account
     */
    get isV8(): boolean {
        return this._chain.getEventHash('Tokens.Deposited') === 'a13c91dd611a64c0cafe1be7269fabe18ee807ee26257df0d0759119e39730f6'
    }

    /**
     * Deposited some balance into an account
     */
    get asV8(): {currencyId: v8.CurrencyId, who: Uint8Array, amount: bigint} {
        assert(this.isV8)
        return this._chain.decodeEvent(this.event)
    }
}

export class TokensTransferEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Tokens.Transfer')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Transfer succeeded.
     */
    get isV3(): boolean {
        return this._chain.getEventHash('Tokens.Transfer') === 'e8955df470c71892e6c76efd5b0ffb98dc64b4199dfcf705d9315063376817be'
    }

    /**
     * Transfer succeeded.
     */
    get asV3(): {currencyId: v3.CurrencyId, from: Uint8Array, to: Uint8Array, amount: bigint} {
        assert(this.isV3)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * Transfer succeeded.
     */
    get isV8(): boolean {
        return this._chain.getEventHash('Tokens.Transfer') === 'e5d8c78997d133e226445d7d76e698c2d78c60bf96c0470533c68a7d8b15ddb7'
    }

    /**
     * Transfer succeeded.
     */
    get asV8(): {currencyId: v8.CurrencyId, from: Uint8Array, to: Uint8Array, amount: bigint} {
        assert(this.isV8)
        return this._chain.decodeEvent(this.event)
    }
}

export class TokensWithdrawnEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Tokens.Withdrawn')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Some balances were withdrawn (e.g. pay for transaction fee)
     */
    get isV3(): boolean {
        return this._chain.getEventHash('Tokens.Withdrawn') === 'a8442ff01fe9baaf51b3bb3ae62365d8100656ccc162be57ce70e5024778755e'
    }

    /**
     * Some balances were withdrawn (e.g. pay for transaction fee)
     */
    get asV3(): {currencyId: v3.CurrencyId, who: Uint8Array, amount: bigint} {
        assert(this.isV3)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * Some balances were withdrawn (e.g. pay for transaction fee)
     */
    get isV8(): boolean {
        return this._chain.getEventHash('Tokens.Withdrawn') === 'a13c91dd611a64c0cafe1be7269fabe18ee807ee26257df0d0759119e39730f6'
    }

    /**
     * Some balances were withdrawn (e.g. pay for transaction fee)
     */
    get asV8(): {currencyId: v8.CurrencyId, who: Uint8Array, amount: bigint} {
        assert(this.isV8)
        return this._chain.decodeEvent(this.event)
    }
}

export class ZenlinkProtocolAssetSwapEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'ZenlinkProtocol.AssetSwap')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Transact in trading \[owner, recipient, swap_path, balances\]
     */
    get isV7(): boolean {
        return this._chain.getEventHash('ZenlinkProtocol.AssetSwap') === 'e9cbb9bf25ce7ca78f66cb163c5de7b5b796a1f9f5cf2f1d1955496bd76f264e'
    }

    /**
     * Transact in trading \[owner, recipient, swap_path, balances\]
     */
    get asV7(): [Uint8Array, Uint8Array, v7.AssetId[], bigint[]] {
        assert(this.isV7)
        return this._chain.decodeEvent(this.event)
    }
}

export class ZenlinkProtocolLiquidityAddedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'ZenlinkProtocol.LiquidityAdded')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Add liquidity. \[owner, asset_0, asset_1, add_balance_0, add_balance_1,
     * mint_balance_lp\]
     */
    get isV7(): boolean {
        return this._chain.getEventHash('ZenlinkProtocol.LiquidityAdded') === '1bfafadda80f84623e855502fa86cbd5fb805fa26a6254ee45104d1d976c2219'
    }

    /**
     * Add liquidity. \[owner, asset_0, asset_1, add_balance_0, add_balance_1,
     * mint_balance_lp\]
     */
    get asV7(): [Uint8Array, v7.AssetId, v7.AssetId, bigint, bigint, bigint] {
        assert(this.isV7)
        return this._chain.decodeEvent(this.event)
    }
}

export class ZenlinkProtocolLiquidityRemovedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'ZenlinkProtocol.LiquidityRemoved')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Remove liquidity. \[owner, recipient, asset_0, asset_1, rm_balance_0, rm_balance_1,
     * burn_balance_lp\]
     */
    get isV7(): boolean {
        return this._chain.getEventHash('ZenlinkProtocol.LiquidityRemoved') === '9decbbc0fd030ae8322c18bf256e4f3ace487600f6cf3b11b8961ab923a40bf1'
    }

    /**
     * Remove liquidity. \[owner, recipient, asset_0, asset_1, rm_balance_0, rm_balance_1,
     * burn_balance_lp\]
     */
    get asV7(): [Uint8Array, Uint8Array, v7.AssetId, v7.AssetId, bigint, bigint, bigint] {
        assert(this.isV7)
        return this._chain.decodeEvent(this.event)
    }
}
