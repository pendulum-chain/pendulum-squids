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

export const requestIssue = {
    name: 'Issue.RequestIssue',
    v12: new EventType(
        'Issue.RequestIssue',
        sts.struct({
            issueId: v12.H256,
            requester: v12.AccountId32,
            amount: sts.bigint(),
            asset: v12.CurrencyId,
            fee: sts.bigint(),
            griefingCollateral: sts.bigint(),
            vaultId: v12.VaultId,
            vaultStellarPublicKey: sts.bytes(),
        })
    ),
}
