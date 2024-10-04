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

export const transfer = {
    name: 'Tokens.Transfer',
    /**
     * Transfer succeeded.
     */
    v18: new EventType(
        'Tokens.Transfer',
        sts.struct({
            currencyId: v18.CurrencyId,
            from: v18.AccountId32,
            to: v18.AccountId32,
            amount: sts.bigint(),
        })
    ),
}

export const balanceSet = {
    name: 'Tokens.BalanceSet',
    /**
     * A balance was set by root.
     */
    v18: new EventType(
        'Tokens.BalanceSet',
        sts.struct({
            currencyId: v18.CurrencyId,
            who: v18.AccountId32,
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
    v18: new EventType(
        'Tokens.Withdrawn',
        sts.struct({
            currencyId: v18.CurrencyId,
            who: v18.AccountId32,
            amount: sts.bigint(),
        })
    ),
}

export const deposited = {
    name: 'Tokens.Deposited',
    /**
     * Deposited some balance into an account
     */
    v18: new EventType(
        'Tokens.Deposited',
        sts.struct({
            currencyId: v18.CurrencyId,
            who: v18.AccountId32,
            amount: sts.bigint(),
        })
    ),
}
