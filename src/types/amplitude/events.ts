import assert from 'assert'
import {
    Chain,
    ChainContext,
    EventContext,
    Event,
    Result,
    Option,
} from './support'
import * as v3 from './v3'
import * as v7 from './v7'
import * as v8 from './v8'
import * as v10 from './v10'

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
    get isV7(): boolean {
        return (
            this._chain.getEventHash('DiaOracleModule.UpdatedPrices') ===
            'a95ec71ae20ecf7d0621b22ad3f636dc4dea11a58a924e27d208ba412c7fe74d'
        )
    }

    /**
     * Event is triggered when prices are updated
     */
    get asV7(): [[Uint8Array, Uint8Array], v7.CoinInfo][] {
        assert(this.isV7)
        return this._chain.decodeEvent(this.event)
    }
}

export class FarmingAllForceGaugeClaimedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Farming.AllForceGaugeClaimed')
        this._chain = ctx._chain
        this.event = event
    }

    get isV10(): boolean {
        return (
            this._chain.getEventHash('Farming.AllForceGaugeClaimed') ===
            '5fc91e49a454b9b911770c486bb364158255e35bb8ac14e2cd8df4b39cf2ba51'
        )
    }

    get asV10(): { gid: number } {
        assert(this.isV10)
        return this._chain.decodeEvent(this.event)
    }
}

export class FarmingAllRetiredEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Farming.AllRetired')
        this._chain = ctx._chain
        this.event = event
    }

    get isV10(): boolean {
        return (
            this._chain.getEventHash('Farming.AllRetired') ===
            'e0d3b1898d0ebeeeab00a238a2b65a78f305e25439ec07795da1c76e12825bcc'
        )
    }

    get asV10(): { pid: number } {
        assert(this.isV10)
        return this._chain.decodeEvent(this.event)
    }
}

export class FarmingChargedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Farming.Charged')
        this._chain = ctx._chain
        this.event = event
    }

    get isV10(): boolean {
        return (
            this._chain.getEventHash('Farming.Charged') ===
            'c8952912c5cb42ffb810827d76bcdee02670357fd3cda85a6c7381c759ff840c'
        )
    }

    get asV10(): {
        who: Uint8Array
        pid: number
        rewards: [v10.CurrencyId, bigint][]
    } {
        assert(this.isV10)
        return this._chain.decodeEvent(this.event)
    }
}

export class FarmingClaimedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Farming.Claimed')
        this._chain = ctx._chain
        this.event = event
    }

    get isV10(): boolean {
        return (
            this._chain.getEventHash('Farming.Claimed') ===
            '89ce641abe29449db445666fb2eeb9e04162deb011ebf5f31c7d6ccdbc8dbbcb'
        )
    }

    get asV10(): { who: Uint8Array; pid: number } {
        assert(this.isV10)
        return this._chain.decodeEvent(this.event)
    }
}

export class FarmingDepositedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Farming.Deposited')
        this._chain = ctx._chain
        this.event = event
    }

    get isV10(): boolean {
        return (
            this._chain.getEventHash('Farming.Deposited') ===
            '7703d993e467f7326c71c5fff1d9d8c87e8dbac70896103e60cbdd95c0d89347'
        )
    }

    get asV10(): {
        who: Uint8Array
        pid: number
        addValue: bigint
        gaugeInfo: [bigint, number] | undefined
    } {
        assert(this.isV10)
        return this._chain.decodeEvent(this.event)
    }
}

export class FarmingFarmingPoolClosedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Farming.FarmingPoolClosed')
        this._chain = ctx._chain
        this.event = event
    }

    get isV10(): boolean {
        return (
            this._chain.getEventHash('Farming.FarmingPoolClosed') ===
            'e0d3b1898d0ebeeeab00a238a2b65a78f305e25439ec07795da1c76e12825bcc'
        )
    }

    get asV10(): { pid: number } {
        assert(this.isV10)
        return this._chain.decodeEvent(this.event)
    }
}

export class FarmingFarmingPoolCreatedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Farming.FarmingPoolCreated')
        this._chain = ctx._chain
        this.event = event
    }

    get isV10(): boolean {
        return (
            this._chain.getEventHash('Farming.FarmingPoolCreated') ===
            'e0d3b1898d0ebeeeab00a238a2b65a78f305e25439ec07795da1c76e12825bcc'
        )
    }

    get asV10(): { pid: number } {
        assert(this.isV10)
        return this._chain.decodeEvent(this.event)
    }
}

export class FarmingFarmingPoolEditedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Farming.FarmingPoolEdited')
        this._chain = ctx._chain
        this.event = event
    }

    get isV10(): boolean {
        return (
            this._chain.getEventHash('Farming.FarmingPoolEdited') ===
            'e0d3b1898d0ebeeeab00a238a2b65a78f305e25439ec07795da1c76e12825bcc'
        )
    }

    get asV10(): { pid: number } {
        assert(this.isV10)
        return this._chain.decodeEvent(this.event)
    }
}

export class FarmingFarmingPoolKilledEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Farming.FarmingPoolKilled')
        this._chain = ctx._chain
        this.event = event
    }

    get isV10(): boolean {
        return (
            this._chain.getEventHash('Farming.FarmingPoolKilled') ===
            'e0d3b1898d0ebeeeab00a238a2b65a78f305e25439ec07795da1c76e12825bcc'
        )
    }

    get asV10(): { pid: number } {
        assert(this.isV10)
        return this._chain.decodeEvent(this.event)
    }
}

export class FarmingFarmingPoolResetEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Farming.FarmingPoolReset')
        this._chain = ctx._chain
        this.event = event
    }

    get isV10(): boolean {
        return (
            this._chain.getEventHash('Farming.FarmingPoolReset') ===
            'e0d3b1898d0ebeeeab00a238a2b65a78f305e25439ec07795da1c76e12825bcc'
        )
    }

    get asV10(): { pid: number } {
        assert(this.isV10)
        return this._chain.decodeEvent(this.event)
    }
}

export class FarmingGaugeWithdrawnEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Farming.GaugeWithdrawn')
        this._chain = ctx._chain
        this.event = event
    }

    get isV10(): boolean {
        return (
            this._chain.getEventHash('Farming.GaugeWithdrawn') ===
            '658e3741d543918bd767d541bf7175de9da29aee454a31604c16b575802aa21c'
        )
    }

    get asV10(): { who: Uint8Array; gid: number } {
        assert(this.isV10)
        return this._chain.decodeEvent(this.event)
    }
}

export class FarmingPartiallyForceGaugeClaimedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Farming.PartiallyForceGaugeClaimed')
        this._chain = ctx._chain
        this.event = event
    }

    get isV10(): boolean {
        return (
            this._chain.getEventHash('Farming.PartiallyForceGaugeClaimed') ===
            '5fc91e49a454b9b911770c486bb364158255e35bb8ac14e2cd8df4b39cf2ba51'
        )
    }

    get asV10(): { gid: number } {
        assert(this.isV10)
        return this._chain.decodeEvent(this.event)
    }
}

export class FarmingPartiallyRetiredEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Farming.PartiallyRetired')
        this._chain = ctx._chain
        this.event = event
    }

    get isV10(): boolean {
        return (
            this._chain.getEventHash('Farming.PartiallyRetired') ===
            'e0d3b1898d0ebeeeab00a238a2b65a78f305e25439ec07795da1c76e12825bcc'
        )
    }

    get asV10(): { pid: number } {
        assert(this.isV10)
        return this._chain.decodeEvent(this.event)
    }
}

export class FarmingRetireLimitSetEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Farming.RetireLimitSet')
        this._chain = ctx._chain
        this.event = event
    }

    get isV10(): boolean {
        return (
            this._chain.getEventHash('Farming.RetireLimitSet') ===
            'f707ff742083978d0b1f391a9771c28219f5e35ce5ba83507482cd04e92d916b'
        )
    }

    get asV10(): { limit: number } {
        assert(this.isV10)
        return this._chain.decodeEvent(this.event)
    }
}

export class FarmingWithdrawClaimedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Farming.WithdrawClaimed')
        this._chain = ctx._chain
        this.event = event
    }

    get isV10(): boolean {
        return (
            this._chain.getEventHash('Farming.WithdrawClaimed') ===
            '89ce641abe29449db445666fb2eeb9e04162deb011ebf5f31c7d6ccdbc8dbbcb'
        )
    }

    get asV10(): { who: Uint8Array; pid: number } {
        assert(this.isV10)
        return this._chain.decodeEvent(this.event)
    }
}

export class FarmingWithdrawnEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Farming.Withdrawn')
        this._chain = ctx._chain
        this.event = event
    }

    get isV10(): boolean {
        return (
            this._chain.getEventHash('Farming.Withdrawn') ===
            'f5231bf39060f5b29b8d9b30ed6cfd929166055825b5b1b4700b057961cadd54'
        )
    }

    get asV10(): {
        who: Uint8Array
        pid: number
        removeValue: bigint | undefined
    } {
        assert(this.isV10)
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
            '912241b33e6c940c96d79f192a192f65bf386f0e8cf006b52a7986e36b8793e1'
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
    get isV10(): boolean {
        return (
            this._chain.getEventHash('Tokens.BalanceSet') ===
            'a3280cc5f0988fd2dd0903f37fed8bdf08570e6c119dbe2884a374b1a1fa4d73'
        )
    }

    /**
     * A balance was set by root.
     */
    get asV10(): {
        currencyId: v10.CurrencyId
        who: Uint8Array
        free: bigint
        reserved: bigint
    } {
        assert(this.isV10)
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
            'a13c91dd611a64c0cafe1be7269fabe18ee807ee26257df0d0759119e39730f6'
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
    get isV10(): boolean {
        return (
            this._chain.getEventHash('Tokens.Deposited') ===
            '4fa4a060a834b339cb92a0ccc5b42c75c3efc524f239890bb22193481f75ca20'
        )
    }

    /**
     * Deposited some balance into an account
     */
    get asV10(): {
        currencyId: v10.CurrencyId
        who: Uint8Array
        amount: bigint
    } {
        assert(this.isV10)
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
            'e5d8c78997d133e226445d7d76e698c2d78c60bf96c0470533c68a7d8b15ddb7'
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
    get isV10(): boolean {
        return (
            this._chain.getEventHash('Tokens.Transfer') ===
            '69b9c9c58a654fd892ebc91626d06bc3ac0c366d2e23c752cd90eb0a805f01c0'
        )
    }

    /**
     * Transfer succeeded.
     */
    get asV10(): {
        currencyId: v10.CurrencyId
        from: Uint8Array
        to: Uint8Array
        amount: bigint
    } {
        assert(this.isV10)
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
            'a13c91dd611a64c0cafe1be7269fabe18ee807ee26257df0d0759119e39730f6'
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
    get isV10(): boolean {
        return (
            this._chain.getEventHash('Tokens.Withdrawn') ===
            '4fa4a060a834b339cb92a0ccc5b42c75c3efc524f239890bb22193481f75ca20'
        )
    }

    /**
     * Some balances were withdrawn (e.g. pay for transaction fee)
     */
    get asV10(): {
        currencyId: v10.CurrencyId
        who: Uint8Array
        amount: bigint
    } {
        assert(this.isV10)
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
