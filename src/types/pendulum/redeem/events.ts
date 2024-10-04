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
