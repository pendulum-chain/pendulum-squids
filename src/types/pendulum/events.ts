import assert from 'assert'
import {
    Chain,
    ChainContext,
    EventContext,
    Event,
    Result,
    Option,
} from './support'
import * as v1 from './v1'
import * as v3 from './v3'

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
        return (
            this._chain.getEventHash('Balances.Transfer') ===
            '0ffdf35c495114c2d42a8bf6c241483fd5334ca0198662e14480ad040f1e3a66'
        )
    }

    /**
     * Transfer succeeded.
     */
    get asV1(): { from: Uint8Array; to: Uint8Array; amount: bigint } {
        assert(this.isV1)
        return this._chain.decodeEvent(this.event)
    }
}

export class DiaOracleModuleUpdatedPricesEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'DiaOracleModule.UpdatedPrices')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Event is triggered when prices are updated
     */
    get isV3(): boolean {
        return (
            this._chain.getEventHash('DiaOracleModule.UpdatedPrices') ===
            'a95ec71ae20ecf7d0621b22ad3f636dc4dea11a58a924e27d208ba412c7fe74d'
        )
    }

    /**
     * Event is triggered when prices are updated
     */
    get asV3(): [[Uint8Array, Uint8Array], v3.CoinInfo][] {
        assert(this.isV3)
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
    get isV1(): boolean {
        return (
            this._chain.getEventHash('Tokens.BalanceSet') ===
            '219ad45ff6115e031aeed1bc3cec4777aebb69e21e0502d08df00e5cbc1328e1'
        )
    }

    /**
     * A balance was set by root.
     */
    get asV1(): {
        currencyId: v1.CurrencyId
        who: Uint8Array
        free: bigint
        reserved: bigint
    } {
        assert(this.isV1)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * A balance was set by root.
     */
    get isV3(): boolean {
        return (
            this._chain.getEventHash('Tokens.BalanceSet') ===
            '352dd1eb5aa782b5cb915ad1a616eea87e66963ca53146b83e647b650af30751'
        )
    }

    /**
     * A balance was set by root.
     */
    get asV3(): {
        currencyId: v3.CurrencyId
        who: Uint8Array
        free: bigint
        reserved: bigint
    } {
        assert(this.isV3)
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
    get isV1(): boolean {
        return (
            this._chain.getEventHash('Tokens.Deposited') ===
            'a8442ff01fe9baaf51b3bb3ae62365d8100656ccc162be57ce70e5024778755e'
        )
    }

    /**
     * Deposited some balance into an account
     */
    get asV1(): { currencyId: v1.CurrencyId; who: Uint8Array; amount: bigint } {
        assert(this.isV1)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * Deposited some balance into an account
     */
    get isV3(): boolean {
        return (
            this._chain.getEventHash('Tokens.Deposited') ===
            'c07b65b17f9ab4499880c4f2d15007e67d3ad1abb4da4ae0fc46a8c3e3d626ca'
        )
    }

    /**
     * Deposited some balance into an account
     */
    get asV3(): { currencyId: v3.CurrencyId; who: Uint8Array; amount: bigint } {
        assert(this.isV3)
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
    get isV1(): boolean {
        return (
            this._chain.getEventHash('Tokens.Transfer') ===
            'e8955df470c71892e6c76efd5b0ffb98dc64b4199dfcf705d9315063376817be'
        )
    }

    /**
     * Transfer succeeded.
     */
    get asV1(): {
        currencyId: v1.CurrencyId
        from: Uint8Array
        to: Uint8Array
        amount: bigint
    } {
        assert(this.isV1)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * Transfer succeeded.
     */
    get isV3(): boolean {
        return (
            this._chain.getEventHash('Tokens.Transfer') ===
            '6540edfd4c34e23f8c1b93fdaacba40ae3a9a98eae38b1dff93c38ae37186a0f'
        )
    }

    /**
     * Transfer succeeded.
     */
    get asV3(): {
        currencyId: v3.CurrencyId
        from: Uint8Array
        to: Uint8Array
        amount: bigint
    } {
        assert(this.isV3)
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
    get isV1(): boolean {
        return (
            this._chain.getEventHash('Tokens.Withdrawn') ===
            'a8442ff01fe9baaf51b3bb3ae62365d8100656ccc162be57ce70e5024778755e'
        )
    }

    /**
     * Some balances were withdrawn (e.g. pay for transaction fee)
     */
    get asV1(): { currencyId: v1.CurrencyId; who: Uint8Array; amount: bigint } {
        assert(this.isV1)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * Some balances were withdrawn (e.g. pay for transaction fee)
     */
    get isV3(): boolean {
        return (
            this._chain.getEventHash('Tokens.Withdrawn') ===
            'c07b65b17f9ab4499880c4f2d15007e67d3ad1abb4da4ae0fc46a8c3e3d626ca'
        )
    }

    /**
     * Some balances were withdrawn (e.g. pay for transaction fee)
     */
    get asV3(): { currencyId: v3.CurrencyId; who: Uint8Array; amount: bigint } {
        assert(this.isV3)
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
    get isV3(): boolean {
        return (
            this._chain.getEventHash('ZenlinkProtocol.AssetSwap') ===
            'e9cbb9bf25ce7ca78f66cb163c5de7b5b796a1f9f5cf2f1d1955496bd76f264e'
        )
    }

    /**
     * Transact in trading \[owner, recipient, swap_path, balances\]
     */
    get asV3(): [Uint8Array, Uint8Array, v3.AssetId[], bigint[]] {
        assert(this.isV3)
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
    get isV3(): boolean {
        return (
            this._chain.getEventHash('ZenlinkProtocol.LiquidityAdded') ===
            '1bfafadda80f84623e855502fa86cbd5fb805fa26a6254ee45104d1d976c2219'
        )
    }

    /**
     * Add liquidity. \[owner, asset_0, asset_1, add_balance_0, add_balance_1,
     * mint_balance_lp\]
     */
    get asV3(): [Uint8Array, v3.AssetId, v3.AssetId, bigint, bigint, bigint] {
        assert(this.isV3)
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
    get isV3(): boolean {
        return (
            this._chain.getEventHash('ZenlinkProtocol.LiquidityRemoved') ===
            '9decbbc0fd030ae8322c18bf256e4f3ace487600f6cf3b11b8961ab923a40bf1'
        )
    }

    /**
     * Remove liquidity. \[owner, recipient, asset_0, asset_1, rm_balance_0, rm_balance_1,
     * burn_balance_lp\]
     */
    get asV3(): [
        Uint8Array,
        Uint8Array,
        v3.AssetId,
        v3.AssetId,
        bigint,
        bigint,
        bigint
    ] {
        assert(this.isV3)
        return this._chain.decodeEvent(this.event)
    }
}
