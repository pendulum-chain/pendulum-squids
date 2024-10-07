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

export const requestRedeem = {
    name: 'Redeem.RequestRedeem',
    v18: new EventType(
        'Redeem.RequestRedeem',
        sts.struct({
            redeemId: v18.H256,
            redeemer: v18.AccountId32,
            vaultId: v18.VaultId,
            amount: sts.bigint(),
            asset: v18.CurrencyId,
            fee: sts.bigint(),
            premium: sts.bigint(),
            stellarAddress: sts.bytes(),
            transferFee: sts.bigint(),
        })
    ),
}

export const executeRedeem = {
    name: 'Redeem.ExecuteRedeem',
    v18: new EventType(
        'Redeem.ExecuteRedeem',
        sts.struct({
            redeemId: v18.H256,
            redeemer: v18.AccountId32,
            vaultId: v18.VaultId,
            amount: sts.bigint(),
            asset: v18.CurrencyId,
            fee: sts.bigint(),
            transferFee: sts.bigint(),
        })
    ),
}

export const cancelRedeem = {
    name: 'Redeem.CancelRedeem',
    v18: new EventType(
        'Redeem.CancelRedeem',
        sts.struct({
            redeemId: v18.H256,
            redeemer: v18.AccountId32,
            vaultId: v18.VaultId,
            slashedAmount: sts.bigint(),
            status: v18.RedeemRequestStatus,
        })
    ),
}
