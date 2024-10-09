import {
    sts,
    Block,
    Bytes,
    Option,
    Result,
    EventType,
    RuntimeCtx,
} from '../support'
import * as v8 from '../v8'
import * as v10 from '../v10'
import * as v12 from '../v12'

export const requestRedeem = {
    name: 'Redeem.RequestRedeem',
    v8: new EventType(
        'Redeem.RequestRedeem',
        sts.struct({
            redeemId: v8.H256,
            redeemer: v8.AccountId32,
            vaultId: v8.VaultId,
            amount: sts.bigint(),
            asset: v8.CurrencyId,
            fee: sts.bigint(),
            premium: sts.bigint(),
            stellarAddress: sts.bytes(),
            transferFee: sts.bigint(),
        })
    ),
    v10: new EventType(
        'Redeem.RequestRedeem',
        sts.struct({
            redeemId: v10.H256,
            redeemer: v10.AccountId32,
            vaultId: v10.VaultId,
            amount: sts.bigint(),
            asset: v10.CurrencyId,
            fee: sts.bigint(),
            premium: sts.bigint(),
            stellarAddress: sts.bytes(),
            transferFee: sts.bigint(),
        })
    ),
    v12: new EventType(
        'Redeem.RequestRedeem',
        sts.struct({
            redeemId: v12.H256,
            redeemer: v12.AccountId32,
            vaultId: v12.VaultId,
            amount: sts.bigint(),
            asset: v12.CurrencyId,
            fee: sts.bigint(),
            premium: sts.bigint(),
            stellarAddress: sts.bytes(),
            transferFee: sts.bigint(),
        })
    ),
}

export const liquidationRedeem = {
    name: 'Redeem.LiquidationRedeem',
    v8: new EventType(
        'Redeem.LiquidationRedeem',
        sts.struct({
            redeemer: v8.AccountId32,
            amount: sts.bigint(),
            asset: v8.CurrencyId,
        })
    ),
    v10: new EventType(
        'Redeem.LiquidationRedeem',
        sts.struct({
            redeemer: v10.AccountId32,
            amount: sts.bigint(),
            asset: v10.CurrencyId,
        })
    ),
    v12: new EventType(
        'Redeem.LiquidationRedeem',
        sts.struct({
            redeemer: v12.AccountId32,
            amount: sts.bigint(),
            asset: v12.CurrencyId,
        })
    ),
}

export const executeRedeem = {
    name: 'Redeem.ExecuteRedeem',
    v8: new EventType(
        'Redeem.ExecuteRedeem',
        sts.struct({
            redeemId: v8.H256,
            redeemer: v8.AccountId32,
            vaultId: v8.VaultId,
            amount: sts.bigint(),
            asset: v8.CurrencyId,
            fee: sts.bigint(),
            transferFee: sts.bigint(),
        })
    ),
    v10: new EventType(
        'Redeem.ExecuteRedeem',
        sts.struct({
            redeemId: v10.H256,
            redeemer: v10.AccountId32,
            vaultId: v10.VaultId,
            amount: sts.bigint(),
            asset: v10.CurrencyId,
            fee: sts.bigint(),
            transferFee: sts.bigint(),
        })
    ),
    v12: new EventType(
        'Redeem.ExecuteRedeem',
        sts.struct({
            redeemId: v12.H256,
            redeemer: v12.AccountId32,
            vaultId: v12.VaultId,
            amount: sts.bigint(),
            asset: v12.CurrencyId,
            fee: sts.bigint(),
            transferFee: sts.bigint(),
        })
    ),
}

export const cancelRedeem = {
    name: 'Redeem.CancelRedeem',
    v8: new EventType(
        'Redeem.CancelRedeem',
        sts.struct({
            redeemId: v8.H256,
            redeemer: v8.AccountId32,
            vaultId: v8.VaultId,
            slashedAmount: sts.bigint(),
            status: v8.RedeemRequestStatus,
        })
    ),
    v10: new EventType(
        'Redeem.CancelRedeem',
        sts.struct({
            redeemId: v10.H256,
            redeemer: v10.AccountId32,
            vaultId: v10.VaultId,
            slashedAmount: sts.bigint(),
            status: v10.RedeemRequestStatus,
        })
    ),
    v12: new EventType(
        'Redeem.CancelRedeem',
        sts.struct({
            redeemId: v12.H256,
            redeemer: v12.AccountId32,
            vaultId: v12.VaultId,
            slashedAmount: sts.bigint(),
            status: v12.RedeemRequestStatus,
        })
    ),
}

export const mintTokensForReimbursedRedeem = {
    name: 'Redeem.MintTokensForReimbursedRedeem',
    v8: new EventType(
        'Redeem.MintTokensForReimbursedRedeem',
        sts.struct({
            redeemId: v8.H256,
            vaultId: v8.VaultId,
            amount: sts.bigint(),
        })
    ),
    v10: new EventType(
        'Redeem.MintTokensForReimbursedRedeem',
        sts.struct({
            redeemId: v10.H256,
            vaultId: v10.VaultId,
            amount: sts.bigint(),
        })
    ),
    v12: new EventType(
        'Redeem.MintTokensForReimbursedRedeem',
        sts.struct({
            redeemId: v12.H256,
            vaultId: v12.VaultId,
            amount: sts.bigint(),
        })
    ),
}
