import assert from 'assert'
import {
    Chain,
    ChainContext,
    EventContext,
    Event,
    Result,
    Option,
} from './support'
import * as v2 from './v2'
import * as v3 from './v3'
import * as v7 from './v7'
import * as v8 from './v8'
import * as v9 from './v9'
import * as v12 from './v12'

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
    get isV2(): boolean {
        return (
            this._chain.getEventHash('Tokens.BalanceSet') ===
            '738a31e6ccb8473243093d7ad5e0d661a7246696d4c4f5fb9527f693823ee3c4'
        )
    }

    /**
     * A balance was set by root.
     */
    get asV2(): {
        currencyId: v2.CurrencyId
        who: Uint8Array
        free: bigint
        reserved: bigint
    } {
        assert(this.isV2)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * A balance was set by root.
     */
    get isV3(): boolean {
        return (
            this._chain.getEventHash('Tokens.BalanceSet') ===
            '219ad45ff6115e031aeed1bc3cec4777aebb69e21e0502d08df00e5cbc1328e1'
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

    /**
     * A balance was set by root.
     */
    get isV8(): boolean {
        return (
            this._chain.getEventHash('Tokens.BalanceSet') ===
            'bc01dd4bac8c02785c0548b1ee1bb58c364eb869e245f71cebe8227c55a7b289'
        )
    }

    /**
     * A balance was set by root.
     */
    get asV8(): {
        currencyId: v8.CurrencyId
        who: Uint8Array
        free: bigint
        reserved: bigint
    } {
        assert(this.isV8)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * A balance was set by root.
     */
    get isV9(): boolean {
        return (
            this._chain.getEventHash('Tokens.BalanceSet') ===
            '5a968091337df06514d715dadda86ceb89e1c8ad41c4e6e0c0caf636c36a95d5'
        )
    }

    /**
     * A balance was set by root.
     */
    get asV9(): {
        currencyId: v9.CurrencyId
        who: Uint8Array
        free: bigint
        reserved: bigint
    } {
        assert(this.isV9)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * A balance was set by root.
     */
    get isV12(): boolean {
        return (
            this._chain.getEventHash('Tokens.BalanceSet') ===
            '912241b33e6c940c96d79f192a192f65bf386f0e8cf006b52a7986e36b8793e1'
        )
    }

    /**
     * A balance was set by root.
     */
    get asV12(): {
        currencyId: v12.CurrencyId
        who: Uint8Array
        free: bigint
        reserved: bigint
    } {
        assert(this.isV12)
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
    get isV2(): boolean {
        return (
            this._chain.getEventHash('Tokens.Deposited') ===
            '11429b7a33d5ea537cf48c5826eaa0391fe0c6b8c1ded12911520d672f59791c'
        )
    }

    /**
     * Deposited some balance into an account
     */
    get asV2(): { currencyId: v2.CurrencyId; who: Uint8Array; amount: bigint } {
        assert(this.isV2)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * Deposited some balance into an account
     */
    get isV3(): boolean {
        return (
            this._chain.getEventHash('Tokens.Deposited') ===
            'a8442ff01fe9baaf51b3bb3ae62365d8100656ccc162be57ce70e5024778755e'
        )
    }

    /**
     * Deposited some balance into an account
     */
    get asV3(): { currencyId: v3.CurrencyId; who: Uint8Array; amount: bigint } {
        assert(this.isV3)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * Deposited some balance into an account
     */
    get isV8(): boolean {
        return (
            this._chain.getEventHash('Tokens.Deposited') ===
            'b4c5a47cb3520c6922a1b62427c8da206e0bc70016863cd9a683c7b6eae58861'
        )
    }

    /**
     * Deposited some balance into an account
     */
    get asV8(): { currencyId: v8.CurrencyId; who: Uint8Array; amount: bigint } {
        assert(this.isV8)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * Deposited some balance into an account
     */
    get isV9(): boolean {
        return (
            this._chain.getEventHash('Tokens.Deposited') ===
            '6c5549b2903897f710408ad495e628843b35abb0c008a572e2d9d94e770ab76c'
        )
    }

    /**
     * Deposited some balance into an account
     */
    get asV9(): { currencyId: v9.CurrencyId; who: Uint8Array; amount: bigint } {
        assert(this.isV9)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * Deposited some balance into an account
     */
    get isV12(): boolean {
        return (
            this._chain.getEventHash('Tokens.Deposited') ===
            'a13c91dd611a64c0cafe1be7269fabe18ee807ee26257df0d0759119e39730f6'
        )
    }

    /**
     * Deposited some balance into an account
     */
    get asV12(): {
        currencyId: v12.CurrencyId
        who: Uint8Array
        amount: bigint
    } {
        assert(this.isV12)
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
    get isV2(): boolean {
        return (
            this._chain.getEventHash('Tokens.Transfer') ===
            '02fe06d54a9380912a54c082ba68a3ac90bfe47c1888524c075c9c0f14f5168d'
        )
    }

    /**
     * Transfer succeeded.
     */
    get asV2(): {
        currencyId: v2.CurrencyId
        from: Uint8Array
        to: Uint8Array
        amount: bigint
    } {
        assert(this.isV2)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * Transfer succeeded.
     */
    get isV3(): boolean {
        return (
            this._chain.getEventHash('Tokens.Transfer') ===
            'e8955df470c71892e6c76efd5b0ffb98dc64b4199dfcf705d9315063376817be'
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

    /**
     * Transfer succeeded.
     */
    get isV8(): boolean {
        return (
            this._chain.getEventHash('Tokens.Transfer') ===
            'd78bb54f77724a758fef4f9e865767cd845d30564f7e13190e20b36600fe9620'
        )
    }

    /**
     * Transfer succeeded.
     */
    get asV8(): {
        currencyId: v8.CurrencyId
        from: Uint8Array
        to: Uint8Array
        amount: bigint
    } {
        assert(this.isV8)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * Transfer succeeded.
     */
    get isV9(): boolean {
        return (
            this._chain.getEventHash('Tokens.Transfer') ===
            'c6a75d6d1ab1e8206a39f0804f07715db1104d5462c6fa7cb5fe063279577e0c'
        )
    }

    /**
     * Transfer succeeded.
     */
    get asV9(): {
        currencyId: v9.CurrencyId
        from: Uint8Array
        to: Uint8Array
        amount: bigint
    } {
        assert(this.isV9)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * Transfer succeeded.
     */
    get isV12(): boolean {
        return (
            this._chain.getEventHash('Tokens.Transfer') ===
            'e5d8c78997d133e226445d7d76e698c2d78c60bf96c0470533c68a7d8b15ddb7'
        )
    }

    /**
     * Transfer succeeded.
     */
    get asV12(): {
        currencyId: v12.CurrencyId
        from: Uint8Array
        to: Uint8Array
        amount: bigint
    } {
        assert(this.isV12)
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
    get isV2(): boolean {
        return (
            this._chain.getEventHash('Tokens.Withdrawn') ===
            '11429b7a33d5ea537cf48c5826eaa0391fe0c6b8c1ded12911520d672f59791c'
        )
    }

    /**
     * Some balances were withdrawn (e.g. pay for transaction fee)
     */
    get asV2(): { currencyId: v2.CurrencyId; who: Uint8Array; amount: bigint } {
        assert(this.isV2)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * Some balances were withdrawn (e.g. pay for transaction fee)
     */
    get isV3(): boolean {
        return (
            this._chain.getEventHash('Tokens.Withdrawn') ===
            'a8442ff01fe9baaf51b3bb3ae62365d8100656ccc162be57ce70e5024778755e'
        )
    }

    /**
     * Some balances were withdrawn (e.g. pay for transaction fee)
     */
    get asV3(): { currencyId: v3.CurrencyId; who: Uint8Array; amount: bigint } {
        assert(this.isV3)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * Some balances were withdrawn (e.g. pay for transaction fee)
     */
    get isV8(): boolean {
        return (
            this._chain.getEventHash('Tokens.Withdrawn') ===
            'b4c5a47cb3520c6922a1b62427c8da206e0bc70016863cd9a683c7b6eae58861'
        )
    }

    /**
     * Some balances were withdrawn (e.g. pay for transaction fee)
     */
    get asV8(): { currencyId: v8.CurrencyId; who: Uint8Array; amount: bigint } {
        assert(this.isV8)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * Some balances were withdrawn (e.g. pay for transaction fee)
     */
    get isV9(): boolean {
        return (
            this._chain.getEventHash('Tokens.Withdrawn') ===
            '6c5549b2903897f710408ad495e628843b35abb0c008a572e2d9d94e770ab76c'
        )
    }

    /**
     * Some balances were withdrawn (e.g. pay for transaction fee)
     */
    get asV9(): { currencyId: v9.CurrencyId; who: Uint8Array; amount: bigint } {
        assert(this.isV9)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * Some balances were withdrawn (e.g. pay for transaction fee)
     */
    get isV12(): boolean {
        return (
            this._chain.getEventHash('Tokens.Withdrawn') ===
            'a13c91dd611a64c0cafe1be7269fabe18ee807ee26257df0d0759119e39730f6'
        )
    }

    /**
     * Some balances were withdrawn (e.g. pay for transaction fee)
     */
    get asV12(): {
        currencyId: v12.CurrencyId
        who: Uint8Array
        amount: bigint
    } {
        assert(this.isV12)
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
        return (
            this._chain.getEventHash('ZenlinkProtocol.AssetSwap') ===
            'e9cbb9bf25ce7ca78f66cb163c5de7b5b796a1f9f5cf2f1d1955496bd76f264e'
        )
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
        return (
            this._chain.getEventHash('ZenlinkProtocol.LiquidityAdded') ===
            '1bfafadda80f84623e855502fa86cbd5fb805fa26a6254ee45104d1d976c2219'
        )
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
        return (
            this._chain.getEventHash('ZenlinkProtocol.LiquidityRemoved') ===
            '9decbbc0fd030ae8322c18bf256e4f3ace487600f6cf3b11b8961ab923a40bf1'
        )
    }

    /**
     * Remove liquidity. \[owner, recipient, asset_0, asset_1, rm_balance_0, rm_balance_1,
     * burn_balance_lp\]
     */
    get asV7(): [
        Uint8Array,
        Uint8Array,
        v7.AssetId,
        v7.AssetId,
        bigint,
        bigint,
        bigint
    ] {
        assert(this.isV7)
        return this._chain.decodeEvent(this.event)
    }
}
