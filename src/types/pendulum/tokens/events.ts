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
import * as v3 from '../v3'
import * as v9 from '../v9'

export const transfer = {
    name: 'Tokens.Transfer',
    /**
     * Transfer succeeded.
     */
    v1: new EventType(
        'Tokens.Transfer',
        sts.struct({
            currencyId: v1.CurrencyId,
            from: v1.AccountId32,
            to: v1.AccountId32,
            amount: sts.bigint(),
        })
    ),
    /**
     * Transfer succeeded.
     */
    v3: new EventType(
        'Tokens.Transfer',
        sts.struct({
            currencyId: v3.CurrencyId,
            from: v3.AccountId32,
            to: v3.AccountId32,
            amount: sts.bigint(),
        })
    ),
    /**
     * Transfer succeeded.
     */
    v9: new EventType(
        'Tokens.Transfer',
        sts.struct({
            currencyId: v9.CurrencyId,
            from: v9.AccountId32,
            to: v9.AccountId32,
            amount: sts.bigint(),
        })
    ),
}

export const balanceSet = {
    name: 'Tokens.BalanceSet',
    /**
     * A balance was set by root.
     */
    v1: new EventType(
        'Tokens.BalanceSet',
        sts.struct({
            currencyId: v1.CurrencyId,
            who: v1.AccountId32,
            free: sts.bigint(),
            reserved: sts.bigint(),
        })
    ),
    /**
     * A balance was set by root.
     */
    v3: new EventType(
        'Tokens.BalanceSet',
        sts.struct({
            currencyId: v3.CurrencyId,
            who: v3.AccountId32,
            free: sts.bigint(),
            reserved: sts.bigint(),
        })
    ),
    /**
     * A balance was set by root.
     */
    v9: new EventType(
        'Tokens.BalanceSet',
        sts.struct({
            currencyId: v9.CurrencyId,
            who: v9.AccountId32,
            free: sts.bigint(),
            reserved: sts.bigint(),
        })
    ),
}

export const withdrawn = {
    name: 'Tokens.Withdrawn',
    /**
     * Some balances were withdrawn (e.g. pay for transaction fee)
     */
    v1: new EventType(
        'Tokens.Withdrawn',
        sts.struct({
            currencyId: v1.CurrencyId,
            who: v1.AccountId32,
            amount: sts.bigint(),
        })
    ),
    /**
     * Some balances were withdrawn (e.g. pay for transaction fee)
     */
    v3: new EventType(
        'Tokens.Withdrawn',
        sts.struct({
            currencyId: v3.CurrencyId,
            who: v3.AccountId32,
            amount: sts.bigint(),
        })
    ),
    /**
     * Some balances were withdrawn (e.g. pay for transaction fee)
     */
    v9: new EventType(
        'Tokens.Withdrawn',
        sts.struct({
            currencyId: v9.CurrencyId,
            who: v9.AccountId32,
            amount: sts.bigint(),
        })
    ),
}

export const deposited = {
    name: 'Tokens.Deposited',
    /**
     * Deposited some balance into an account
     */
    v1: new EventType(
        'Tokens.Deposited',
        sts.struct({
            currencyId: v1.CurrencyId,
            who: v1.AccountId32,
            amount: sts.bigint(),
        })
    ),
    /**
     * Deposited some balance into an account
     */
    v3: new EventType(
        'Tokens.Deposited',
        sts.struct({
            currencyId: v3.CurrencyId,
            who: v3.AccountId32,
            amount: sts.bigint(),
        })
    ),
    /**
     * Deposited some balance into an account
     */
    v9: new EventType(
        'Tokens.Deposited',
        sts.struct({
            currencyId: v9.CurrencyId,
            who: v9.AccountId32,
            amount: sts.bigint(),
        })
    ),
}
