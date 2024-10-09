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

export const requestIssue = {
    name: 'Issue.RequestIssue',
    v18: new EventType(
        'Issue.RequestIssue',
        sts.struct({
            issueId: v18.H256,
            requester: v18.AccountId32,
            amount: sts.bigint(),
            asset: v18.CurrencyId,
            fee: sts.bigint(),
            griefingCollateral: sts.bigint(),
            vaultId: v18.VaultId,
            vaultStellarPublicKey: sts.bytes(),
        })
    ),
}

export const issueAmountChange = {
    name: 'Issue.IssueAmountChange',
    v18: new EventType(
        'Issue.IssueAmountChange',
        sts.struct({
            issueId: v18.H256,
            amount: sts.bigint(),
            asset: v18.CurrencyId,
            fee: sts.bigint(),
            confiscatedGriefingCollateral: sts.bigint(),
        })
    ),
}

export const executeIssue = {
    name: 'Issue.ExecuteIssue',
    v18: new EventType(
        'Issue.ExecuteIssue',
        sts.struct({
            issueId: v18.H256,
            requester: v18.AccountId32,
            vaultId: v18.VaultId,
            amount: sts.bigint(),
            asset: v18.CurrencyId,
            fee: sts.bigint(),
        })
    ),
}

export const cancelIssue = {
    name: 'Issue.CancelIssue',
    v18: new EventType(
        'Issue.CancelIssue',
        sts.struct({
            issueId: v18.H256,
            requester: v18.AccountId32,
            griefingCollateral: sts.bigint(),
        })
    ),
}
