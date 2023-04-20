import assert from 'assert'
import {Chain, ChainContext, EventContext, Event, Result, Option} from './support'
import * as v906 from './v906'
import * as v944 from './v944'
import * as v956 from './v956'
import * as v962 from './v962'

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
     *  Transfer succeeded (from, to, value, fees).
     */
    get isV1020(): boolean {
        return this._chain.getEventHash('Balances.Transfer') === '72e6f0d399a72f77551d560f52df25d757e0643d0192b3bc837cbd91b6f36b27'
    }

    /**
     *  Transfer succeeded (from, to, value, fees).
     */
    get asV1020(): [Uint8Array, Uint8Array, bigint, bigint] {
        assert(this.isV1020)
        return this._chain.decodeEvent(this.event)
    }

    /**
     *  Transfer succeeded (from, to, value).
     */
    get isV1050(): boolean {
        return this._chain.getEventHash('Balances.Transfer') === 'dad2bcdca357505fa3c7832085d0db53ce6f902bd9f5b52823ee8791d351872c'
    }

    /**
     *  Transfer succeeded (from, to, value).
     */
    get asV1050(): [Uint8Array, Uint8Array, bigint] {
        assert(this.isV1050)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * Transfer succeeded.
     */
    get isV9130(): boolean {
        return this._chain.getEventHash('Balances.Transfer') === '0ffdf35c495114c2d42a8bf6c241483fd5334ca0198662e14480ad040f1e3a66'
    }

    /**
     * Transfer succeeded.
     */
    get asV9130(): { from: Uint8Array, to: Uint8Array, amount: bigint } {
        assert(this.isV9130)
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
     *  Transact in trading \[owner, recipient, swap_path, balances\]
     */
    get isV902(): boolean {
        return this._chain.getEventHash('ZenlinkProtocol.AssetSwap') === '159d6d9238d17b02ab3a687e4f6089399a062c5efe1bfaa809934fce8349d0c5'
    }

    /**
     *  Transact in trading \[owner, recipient, swap_path, balances\]
     */
    get asV902(): [Uint8Array, Uint8Array, number[], bigint[]] {
        assert(this.isV902)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * Transact in trading \[owner, recipient, swap_path, balances\]
     */
    get isV906(): boolean {
        return this._chain.getEventHash('ZenlinkProtocol.AssetSwap') === 'e9cbb9bf25ce7ca78f66cb163c5de7b5b796a1f9f5cf2f1d1955496bd76f264e'
    }

    /**
     * Transact in trading \[owner, recipient, swap_path, balances\]
     */
    get asV906(): [Uint8Array, Uint8Array, v906.AssetId[], bigint[]] {
        assert(this.isV906)
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
     *  Add liquidity. \[owner, asset_0, asset_1, add_balance_0, add_balance_1,
     *  mint_balance_lp\]
     */
    get isV902(): boolean {
        return this._chain.getEventHash('ZenlinkProtocol.LiquidityAdded') === '5fa357ce7da650f5b735003f8e97db8c734e1f20971d8bbd1aa763d2234bd502'
    }

    /**
     *  Add liquidity. \[owner, asset_0, asset_1, add_balance_0, add_balance_1,
     *  mint_balance_lp\]
     */
    get asV902(): [Uint8Array, number, number, bigint, bigint, bigint] {
        assert(this.isV902)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * Add liquidity. \[owner, asset_0, asset_1, add_balance_0, add_balance_1,
     * mint_balance_lp\]
     */
    get isV906(): boolean {
        return this._chain.getEventHash('ZenlinkProtocol.LiquidityAdded') === '1bfafadda80f84623e855502fa86cbd5fb805fa26a6254ee45104d1d976c2219'
    }

    /**
     * Add liquidity. \[owner, asset_0, asset_1, add_balance_0, add_balance_1,
     * mint_balance_lp\]
     */
    get asV906(): [Uint8Array, v906.AssetId, v906.AssetId, bigint, bigint, bigint] {
        assert(this.isV906)
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
     *  Remove liquidity. \[owner, recipient, asset_0, asset_1, rm_balance_0, rm_balance_1,
     *  burn_balance_lp\]
     */
    get isV902(): boolean {
        return this._chain.getEventHash('ZenlinkProtocol.LiquidityRemoved') === 'ed57df84841c01932655b4a0801d9728dd07d3b3f51c350a1a20d3731f980afb'
    }

    /**
     *  Remove liquidity. \[owner, recipient, asset_0, asset_1, rm_balance_0, rm_balance_1,
     *  burn_balance_lp\]
     */
    get asV902(): [Uint8Array, Uint8Array, number, number, bigint, bigint, bigint] {
        assert(this.isV902)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * Remove liquidity. \[owner, recipient, asset_0, asset_1, rm_balance_0, rm_balance_1,
     * burn_balance_lp\]
     */
    get isV906(): boolean {
        return this._chain.getEventHash('ZenlinkProtocol.LiquidityRemoved') === '9decbbc0fd030ae8322c18bf256e4f3ace487600f6cf3b11b8961ab923a40bf1'
    }

    /**
     * Remove liquidity. \[owner, recipient, asset_0, asset_1, rm_balance_0, rm_balance_1,
     * burn_balance_lp\]
     */
    get asV906(): [Uint8Array, Uint8Array, v906.AssetId, v906.AssetId, bigint, bigint, bigint] {
        assert(this.isV906)
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

    get isV944(): boolean {
        return this._chain.getEventHash('Farming.AllForceGaugeClaimed') === '5fc91e49a454b9b911770c486bb364158255e35bb8ac14e2cd8df4b39cf2ba51'
    }

    get asV944(): { gid: number } {
        assert(this.isV944)
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

    get isV944(): boolean {
        return this._chain.getEventHash('Farming.AllRetired') === 'e0d3b1898d0ebeeeab00a238a2b65a78f305e25439ec07795da1c76e12825bcc'
    }

    get asV944(): { pid: number } {
        assert(this.isV944)
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

    get isV944(): boolean {
        return this._chain.getEventHash('Farming.Charged') === 'c3d1c59b341540c4f9f6d3972ddfac8a4b0aaceb867c161a35299667a60d1f8d'
    }

    get asV944(): { who: Uint8Array, pid: number, rewards: [v944.CurrencyId, bigint][] } {
        assert(this.isV944)
        return this._chain.decodeEvent(this.event)
    }

    get isV956(): boolean {
        return this._chain.getEventHash('Farming.Charged') === '2fd9b615ba5d74fc1f8c1865e37d483cfbb6359f6f92bfbb88a91567d3a972c7'
    }

    get asV956(): { who: Uint8Array, pid: number, rewards: [v956.CurrencyId, bigint][] } {
        assert(this.isV956)
        return this._chain.decodeEvent(this.event)
    }

    get isV962(): boolean {
        return this._chain.getEventHash('Farming.Charged') === '6894ad45d0ddc47a0c8eb5ba834aaca533d18eddeeb618bf1d7a1748fa821bf7'
    }

    get asV962(): { who: Uint8Array, pid: number, rewards: [v962.CurrencyId, bigint][] } {
        assert(this.isV962)
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

    get isV944(): boolean {
        return this._chain.getEventHash('Farming.Claimed') === '89ce641abe29449db445666fb2eeb9e04162deb011ebf5f31c7d6ccdbc8dbbcb'
    }

    get asV944(): { who: Uint8Array, pid: number } {
        assert(this.isV944)
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

    get isV944(): boolean {
        return this._chain.getEventHash('Farming.Deposited') === '7703d993e467f7326c71c5fff1d9d8c87e8dbac70896103e60cbdd95c0d89347'
    }

    get asV944(): { who: Uint8Array, pid: number, addValue: bigint, gaugeInfo: ([bigint, number] | undefined) } {
        assert(this.isV944)
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

    get isV944(): boolean {
        return this._chain.getEventHash('Farming.FarmingPoolClosed') === 'e0d3b1898d0ebeeeab00a238a2b65a78f305e25439ec07795da1c76e12825bcc'
    }

    get asV944(): { pid: number } {
        assert(this.isV944)
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

    get isV944(): boolean {
        return this._chain.getEventHash('Farming.FarmingPoolCreated') === 'e0d3b1898d0ebeeeab00a238a2b65a78f305e25439ec07795da1c76e12825bcc'
    }

    get asV944(): { pid: number } {
        assert(this.isV944)
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

    get isV944(): boolean {
        return this._chain.getEventHash('Farming.FarmingPoolEdited') === 'e0d3b1898d0ebeeeab00a238a2b65a78f305e25439ec07795da1c76e12825bcc'
    }

    get asV944(): { pid: number } {
        assert(this.isV944)
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

    get isV944(): boolean {
        return this._chain.getEventHash('Farming.FarmingPoolKilled') === 'e0d3b1898d0ebeeeab00a238a2b65a78f305e25439ec07795da1c76e12825bcc'
    }

    get asV944(): { pid: number } {
        assert(this.isV944)
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

    get isV944(): boolean {
        return this._chain.getEventHash('Farming.FarmingPoolReset') === 'e0d3b1898d0ebeeeab00a238a2b65a78f305e25439ec07795da1c76e12825bcc'
    }

    get asV944(): { pid: number } {
        assert(this.isV944)
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

    get isV944(): boolean {
        return this._chain.getEventHash('Farming.GaugeWithdrawn') === '658e3741d543918bd767d541bf7175de9da29aee454a31604c16b575802aa21c'
    }

    get asV944(): { who: Uint8Array, gid: number } {
        assert(this.isV944)
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

    get isV944(): boolean {
        return this._chain.getEventHash('Farming.PartiallyForceGaugeClaimed') === '5fc91e49a454b9b911770c486bb364158255e35bb8ac14e2cd8df4b39cf2ba51'
    }

    get asV944(): { gid: number } {
        assert(this.isV944)
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

    get isV944(): boolean {
        return this._chain.getEventHash('Farming.PartiallyRetired') === 'e0d3b1898d0ebeeeab00a238a2b65a78f305e25439ec07795da1c76e12825bcc'
    }

    get asV944(): { pid: number } {
        assert(this.isV944)
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

    get isV944(): boolean {
        return this._chain.getEventHash('Farming.RetireLimitSet') === 'f707ff742083978d0b1f391a9771c28219f5e35ce5ba83507482cd04e92d916b'
    }

    get asV944(): { limit: number } {
        assert(this.isV944)
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

    get isV948(): boolean {
        return this._chain.getEventHash('Farming.WithdrawClaimed') === '89ce641abe29449db445666fb2eeb9e04162deb011ebf5f31c7d6ccdbc8dbbcb'
    }

    get asV948(): { who: Uint8Array, pid: number } {
        assert(this.isV948)
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

    get isV944(): boolean {
        return this._chain.getEventHash('Farming.Withdrawn') === 'f5231bf39060f5b29b8d9b30ed6cfd929166055825b5b1b4700b057961cadd54'
    }

    get asV944(): { who: Uint8Array, pid: number, removeValue: (bigint | undefined) } {
        assert(this.isV944)
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
     *  A balance was set by root. \[who, free, reserved\]
     */
    get isV802(): boolean {
        return this._chain.getEventHash('Tokens.BalanceSet') === 'd59167e6fa6e1cc5edfac472272cd823c1abb610b670fa1e42776213cea54ba0'
    }

    /**
     *  A balance was set by root. \[who, free, reserved\]
     */
    get asV802(): [v802.CurrencyId, Uint8Array, bigint, bigint] {
        assert(this.isV802)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * A balance was set by root. \[who, free, reserved\]
     */
    get isV906(): boolean {
        return this._chain.getEventHash('Tokens.BalanceSet') === 'b87fd915e42bf43bed1c29ffa7cdd7aae8e66e9bf8abe2a534a275b495528515'
    }

    /**
     * A balance was set by root. \[who, free, reserved\]
     */
    get asV906(): [v906.CurrencyId, Uint8Array, bigint, bigint] {
        assert(this.isV906)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * A balance was set by root. \[who, free, reserved\]
     */
    get isV916(): boolean {
        return this._chain.getEventHash('Tokens.BalanceSet') === '7b8188ff76713954bd121ac1e9cc97d968b12ae8904fe84afa382f572339cb58'
    }

    /**
     * A balance was set by root. \[who, free, reserved\]
     */
    get asV916(): [v916.CurrencyId, Uint8Array, bigint, bigint] {
        assert(this.isV916)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * A balance was set by root. \[who, free, reserved\]
     */
    get isV920(): boolean {
        return this._chain.getEventHash('Tokens.BalanceSet') === 'f79ad22597c9a4713b2ce62aec1afbdd322af47866ae6f07f5cb89d18d995df8'
    }

    /**
     * A balance was set by root. \[who, free, reserved\]
     */
    get asV920(): [v920.CurrencyId, Uint8Array, bigint, bigint] {
        assert(this.isV920)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * A balance was set by root.
     */
    get isV925(): boolean {
        return this._chain.getEventHash('Tokens.BalanceSet') === '42b44be6ddbd575235327ec8b73578a8e2b40e6035875cae6a91cb104548dd36'
    }

    /**
     * A balance was set by root.
     */
    get asV925(): { currencyId: v925.CurrencyId, who: Uint8Array, free: bigint, reserved: bigint } {
        assert(this.isV925)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * A balance was set by root.
     */
    get isV932(): boolean {
        return this._chain.getEventHash('Tokens.BalanceSet') === '3e7bcc7a9a0d905d187902778412f9eb8d6bc40ac232733b224250358aac576f'
    }

    /**
     * A balance was set by root.
     */
    get asV932(): { currencyId: v932.CurrencyId, who: Uint8Array, free: bigint, reserved: bigint } {
        assert(this.isV932)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * A balance was set by root.
     */
    get isV956(): boolean {
        return this._chain.getEventHash('Tokens.BalanceSet') === 'fdff760cb54afcd8db5c92b89fed1fb754f014d385f0e48e57bf6b914f8d03b5'
    }

    /**
     * A balance was set by root.
     */
    get asV956(): { currencyId: v956.CurrencyId, who: Uint8Array, free: bigint, reserved: bigint } {
        assert(this.isV956)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * A balance was set by root.
     */
    get isV962(): boolean {
        return this._chain.getEventHash('Tokens.BalanceSet') === '45992b0db96b3fb8c249d1f8892de429f3924228fad45b8e8c07f0b5c1b355a4'
    }

    /**
     * A balance was set by root.
     */
    get asV962(): { currencyId: v962.CurrencyId, who: Uint8Array, free: bigint, reserved: bigint } {
        assert(this.isV962)
        return this._chain.decodeEvent(this.event)
    }
}