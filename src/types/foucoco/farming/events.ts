import {
    sts,
    Block,
    Bytes,
    Option,
    Result,
    EventType,
    RuntimeCtx,
} from '../support'
import * as v18 from '../v18'

export const farmingPoolCreated = {
    name: 'Farming.FarmingPoolCreated',
    v18: new EventType(
        'Farming.FarmingPoolCreated',
        sts.struct({
            pid: sts.number(),
        })
    ),
}

export const farmingPoolReset = {
    name: 'Farming.FarmingPoolReset',
    v18: new EventType(
        'Farming.FarmingPoolReset',
        sts.struct({
            pid: sts.number(),
        })
    ),
}

export const farmingPoolClosed = {
    name: 'Farming.FarmingPoolClosed',
    v18: new EventType(
        'Farming.FarmingPoolClosed',
        sts.struct({
            pid: sts.number(),
        })
    ),
}

export const farmingPoolKilled = {
    name: 'Farming.FarmingPoolKilled',
    v18: new EventType(
        'Farming.FarmingPoolKilled',
        sts.struct({
            pid: sts.number(),
        })
    ),
}

export const farmingPoolEdited = {
    name: 'Farming.FarmingPoolEdited',
    v18: new EventType(
        'Farming.FarmingPoolEdited',
        sts.struct({
            pid: sts.number(),
        })
    ),
}

export const charged = {
    name: 'Farming.Charged',
    v18: new EventType(
        'Farming.Charged',
        sts.struct({
            who: v18.AccountId32,
            pid: sts.number(),
            rewards: sts.array(() =>
                sts.tuple(() => [v18.CurrencyId, sts.bigint()])
            ),
        })
    ),
}

export const deposited = {
    name: 'Farming.Deposited',
    v18: new EventType(
        'Farming.Deposited',
        sts.struct({
            who: v18.AccountId32,
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
    v18: new EventType(
        'Farming.Withdrawn',
        sts.struct({
            who: v18.AccountId32,
            pid: sts.number(),
            removeValue: sts.option(() => sts.bigint()),
        })
    ),
}

export const claimed = {
    name: 'Farming.Claimed',
    v18: new EventType(
        'Farming.Claimed',
        sts.struct({
            who: v18.AccountId32,
            pid: sts.number(),
        })
    ),
}

export const withdrawClaimed = {
    name: 'Farming.WithdrawClaimed',
    v18: new EventType(
        'Farming.WithdrawClaimed',
        sts.struct({
            who: v18.AccountId32,
            pid: sts.number(),
        })
    ),
}

export const gaugeWithdrawn = {
    name: 'Farming.GaugeWithdrawn',
    v18: new EventType(
        'Farming.GaugeWithdrawn',
        sts.struct({
            who: v18.AccountId32,
            gid: sts.number(),
        })
    ),
}

export const allForceGaugeClaimed = {
    name: 'Farming.AllForceGaugeClaimed',
    v18: new EventType(
        'Farming.AllForceGaugeClaimed',
        sts.struct({
            gid: sts.number(),
        })
    ),
}

export const partiallyForceGaugeClaimed = {
    name: 'Farming.PartiallyForceGaugeClaimed',
    v18: new EventType(
        'Farming.PartiallyForceGaugeClaimed',
        sts.struct({
            gid: sts.number(),
        })
    ),
}

export const allRetired = {
    name: 'Farming.AllRetired',
    v18: new EventType(
        'Farming.AllRetired',
        sts.struct({
            pid: sts.number(),
        })
    ),
}

export const partiallyRetired = {
    name: 'Farming.PartiallyRetired',
    v18: new EventType(
        'Farming.PartiallyRetired',
        sts.struct({
            pid: sts.number(),
        })
    ),
}

export const retireLimitSet = {
    name: 'Farming.RetireLimitSet',
    v18: new EventType(
        'Farming.RetireLimitSet',
        sts.struct({
            limit: sts.number(),
        })
    ),
}
