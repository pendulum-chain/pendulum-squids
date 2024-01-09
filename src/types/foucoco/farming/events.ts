import {
    sts,
    Block,
    Bytes,
    Option,
    Result,
    EventType,
    RuntimeCtx,
} from '../support'
import * as v1 from '../v1'
import * as v4 from '../v4'

export const farmingPoolCreated = {
    name: 'Farming.FarmingPoolCreated',
    v1: new EventType(
        'Farming.FarmingPoolCreated',
        sts.struct({
            pid: sts.number(),
        })
    ),
}

export const farmingPoolReset = {
    name: 'Farming.FarmingPoolReset',
    v1: new EventType(
        'Farming.FarmingPoolReset',
        sts.struct({
            pid: sts.number(),
        })
    ),
}

export const farmingPoolClosed = {
    name: 'Farming.FarmingPoolClosed',
    v1: new EventType(
        'Farming.FarmingPoolClosed',
        sts.struct({
            pid: sts.number(),
        })
    ),
}

export const farmingPoolKilled = {
    name: 'Farming.FarmingPoolKilled',
    v1: new EventType(
        'Farming.FarmingPoolKilled',
        sts.struct({
            pid: sts.number(),
        })
    ),
}

export const farmingPoolEdited = {
    name: 'Farming.FarmingPoolEdited',
    v1: new EventType(
        'Farming.FarmingPoolEdited',
        sts.struct({
            pid: sts.number(),
        })
    ),
}

export const charged = {
    name: 'Farming.Charged',
    v1: new EventType(
        'Farming.Charged',
        sts.struct({
            who: v1.AccountId32,
            pid: sts.number(),
            rewards: sts.array(() =>
                sts.tuple(() => [v1.CurrencyId, sts.bigint()])
            ),
        })
    ),
    v4: new EventType(
        'Farming.Charged',
        sts.struct({
            who: v4.AccountId32,
            pid: sts.number(),
            rewards: sts.array(() =>
                sts.tuple(() => [v4.CurrencyId, sts.bigint()])
            ),
        })
    ),
}

export const deposited = {
    name: 'Farming.Deposited',
    v1: new EventType(
        'Farming.Deposited',
        sts.struct({
            who: v1.AccountId32,
            pid: sts.number(),
            addValue: sts.bigint(),
            gaugeInfo: sts.option(() =>
                sts.tuple(() => [sts.bigint(), sts.number()])
            ),
        })
    ),
}

export const withdrawn = {
    name: 'Farming.Withdrawn',
    v1: new EventType(
        'Farming.Withdrawn',
        sts.struct({
            who: v1.AccountId32,
            pid: sts.number(),
            removeValue: sts.option(() => sts.bigint()),
        })
    ),
}

export const claimed = {
    name: 'Farming.Claimed',
    v1: new EventType(
        'Farming.Claimed',
        sts.struct({
            who: v1.AccountId32,
            pid: sts.number(),
        })
    ),
}

export const withdrawClaimed = {
    name: 'Farming.WithdrawClaimed',
    v1: new EventType(
        'Farming.WithdrawClaimed',
        sts.struct({
            who: v1.AccountId32,
            pid: sts.number(),
        })
    ),
}

export const gaugeWithdrawn = {
    name: 'Farming.GaugeWithdrawn',
    v1: new EventType(
        'Farming.GaugeWithdrawn',
        sts.struct({
            who: v1.AccountId32,
            gid: sts.number(),
        })
    ),
}

export const allForceGaugeClaimed = {
    name: 'Farming.AllForceGaugeClaimed',
    v1: new EventType(
        'Farming.AllForceGaugeClaimed',
        sts.struct({
            gid: sts.number(),
        })
    ),
}

export const partiallyForceGaugeClaimed = {
    name: 'Farming.PartiallyForceGaugeClaimed',
    v1: new EventType(
        'Farming.PartiallyForceGaugeClaimed',
        sts.struct({
            gid: sts.number(),
        })
    ),
}

export const allRetired = {
    name: 'Farming.AllRetired',
    v1: new EventType(
        'Farming.AllRetired',
        sts.struct({
            pid: sts.number(),
        })
    ),
}

export const partiallyRetired = {
    name: 'Farming.PartiallyRetired',
    v1: new EventType(
        'Farming.PartiallyRetired',
        sts.struct({
            pid: sts.number(),
        })
    ),
}

export const retireLimitSet = {
    name: 'Farming.RetireLimitSet',
    v1: new EventType(
        'Farming.RetireLimitSet',
        sts.struct({
            limit: sts.number(),
        })
    ),
}
