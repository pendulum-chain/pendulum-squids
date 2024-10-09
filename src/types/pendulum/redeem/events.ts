import {
    sts,
    Block,
    Bytes,
    Option,
    Result,
    EventType,
    RuntimeCtx,
} from '../support'
import * as v12 from '../v12'

export const requestRedeem = {
    name: 'Redeem.RequestRedeem',
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
    v12: new EventType(
        'Redeem.MintTokensForReimbursedRedeem',
        sts.struct({
            redeemId: v12.H256,
            vaultId: v12.VaultId,
            amount: sts.bigint(),
        })
    ),
}
