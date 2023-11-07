import {
    sts,
    Block,
    Bytes,
    Option,
    Result,
    EventType,
    RuntimeCtx,
} from '../support'
import * as v3 from '../v3'
import * as v8 from '../v8'
import * as v10 from '../v10'

export const transfer = {
    name: 'Tokens.Transfer',
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
    v8: new EventType(
        'Tokens.Transfer',
        sts.struct({
            currencyId: v8.CurrencyId,
            from: v8.AccountId32,
            to: v8.AccountId32,
            amount: sts.bigint(),
        })
    ),
    /**
     * Transfer succeeded.
     */
    v10: new EventType(
        'Tokens.Transfer',
        sts.struct({
            currencyId: v10.CurrencyId,
            from: v10.AccountId32,
            to: v10.AccountId32,
            amount: sts.bigint(),
        })
    ),
}

export const balanceSet = {
    name: 'Tokens.BalanceSet',
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
    v8: new EventType(
        'Tokens.BalanceSet',
        sts.struct({
            currencyId: v8.CurrencyId,
            who: v8.AccountId32,
            free: sts.bigint(),
            reserved: sts.bigint(),
        })
    ),
    /**
     * A balance was set by root.
     */
    v10: new EventType(
        'Tokens.BalanceSet',
        sts.struct({
            currencyId: v10.CurrencyId,
            who: v10.AccountId32,
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
    v8: new EventType(
        'Tokens.Withdrawn',
        sts.struct({
            currencyId: v8.CurrencyId,
            who: v8.AccountId32,
            amount: sts.bigint(),
        })
    ),
    /**
     * Some balances were withdrawn (e.g. pay for transaction fee)
     */
    v10: new EventType(
        'Tokens.Withdrawn',
        sts.struct({
            currencyId: v10.CurrencyId,
            who: v10.AccountId32,
            amount: sts.bigint(),
        })
    ),
}

export const deposited = {
    name: 'Tokens.Deposited',
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
    v8: new EventType(
        'Tokens.Deposited',
        sts.struct({
            currencyId: v8.CurrencyId,
            who: v8.AccountId32,
            amount: sts.bigint(),
        })
    ),
    /**
     * Deposited some balance into an account
     */
    v10: new EventType(
        'Tokens.Deposited',
        sts.struct({
            currencyId: v10.CurrencyId,
            who: v10.AccountId32,
            amount: sts.bigint(),
        })
    ),
}
