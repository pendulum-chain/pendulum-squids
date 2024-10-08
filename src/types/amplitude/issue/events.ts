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

export const requestIssue = {
    name: 'Issue.RequestIssue',
    v8: new EventType(
        'Issue.RequestIssue',
        sts.struct({
            issueId: v8.H256,
            requester: v8.AccountId32,
            amount: sts.bigint(),
            asset: v8.CurrencyId,
            fee: sts.bigint(),
            griefingCollateral: sts.bigint(),
            vaultId: v8.VaultId,
            vaultStellarPublicKey: sts.bytes(),
        })
    ),
    v10: new EventType(
        'Issue.RequestIssue',
        sts.struct({
            issueId: v10.H256,
            requester: v10.AccountId32,
            amount: sts.bigint(),
            asset: v10.CurrencyId,
            fee: sts.bigint(),
            griefingCollateral: sts.bigint(),
            vaultId: v10.VaultId,
            vaultStellarPublicKey: sts.bytes(),
        })
    ),
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

export const issueAmountChange = {
    name: 'Issue.IssueAmountChange',
    v8: new EventType(
        'Issue.IssueAmountChange',
        sts.struct({
            issueId: v8.H256,
            amount: sts.bigint(),
            asset: v8.CurrencyId,
            fee: sts.bigint(),
            confiscatedGriefingCollateral: sts.bigint(),
        })
    ),
    v10: new EventType(
        'Issue.IssueAmountChange',
        sts.struct({
            issueId: v10.H256,
            amount: sts.bigint(),
            asset: v10.CurrencyId,
            fee: sts.bigint(),
            confiscatedGriefingCollateral: sts.bigint(),
        })
    ),
    v12: new EventType(
        'Issue.IssueAmountChange',
        sts.struct({
            issueId: v12.H256,
            amount: sts.bigint(),
            asset: v12.CurrencyId,
            fee: sts.bigint(),
            confiscatedGriefingCollateral: sts.bigint(),
        })
    ),
}

export const executeIssue = {
    name: 'Issue.ExecuteIssue',
    v8: new EventType(
        'Issue.ExecuteIssue',
        sts.struct({
            issueId: v8.H256,
            requester: v8.AccountId32,
            vaultId: v8.VaultId,
            amount: sts.bigint(),
            asset: v8.CurrencyId,
            fee: sts.bigint(),
        })
    ),
    v10: new EventType(
        'Issue.ExecuteIssue',
        sts.struct({
            issueId: v10.H256,
            requester: v10.AccountId32,
            vaultId: v10.VaultId,
            amount: sts.bigint(),
            asset: v10.CurrencyId,
            fee: sts.bigint(),
        })
    ),
    v12: new EventType(
        'Issue.ExecuteIssue',
        sts.struct({
            issueId: v12.H256,
            requester: v12.AccountId32,
            vaultId: v12.VaultId,
            amount: sts.bigint(),
            asset: v12.CurrencyId,
            fee: sts.bigint(),
        })
    ),
}

export const cancelIssue = {
    name: 'Issue.CancelIssue',
    v8: new EventType(
        'Issue.CancelIssue',
        sts.struct({
            issueId: v8.H256,
            requester: v8.AccountId32,
            griefingCollateral: sts.bigint(),
        })
    ),
}