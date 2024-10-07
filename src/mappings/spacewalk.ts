import { EventHandlerContext } from '../processor'
import { RedeemRequest, IssueRequest } from '../model'
import { hexToSs58 } from './nabla/addresses'
import { getOrCreateVault } from '../entities/vault'
import { parseVaultId } from '../utils/vault'
import { getVersionedStorage } from '../types/eventsAndStorageSelector'
import { network } from '../config'
import { IssueRequestStatus } from '../model/generated/_issueRequestStatus'
import { RedeemRequestStatus } from '../model/generated/_redeemRequestStatus'

export async function handleIssueRequest(ctx: EventHandlerContext) {
    const { args } = ctx.event
    const {
        issueId,
        requester,
        amount,
        vaultId,
        vaultStellarPublicKey,
        fee,
        griefingCollateral,
    } = args
    const vaultIdFlat = parseVaultId(vaultId)
    const vault = await getOrCreateVault(
        ctx,
        vaultIdFlat,
        vaultStellarPublicKey
    )

    const issueRequestStorage = await getVersionedStorage(
        network,
        ctx,
        'issue',
        'issueRequests'
    )
    const createdIssue = await issueRequestStorage.get(ctx.block, issueId)

    const issueRequest = new IssueRequest({
        id: issueId,
        timestamp: new Date(ctx.block.timestamp ?? 0),
        opentime: createdIssue.opentime,
        period: createdIssue.period,
        requester: hexToSs58(requester),
        amount: amount,
        vault: vault,
        fee: fee,
        griefingCollateral: griefingCollateral,
        status: IssueRequestStatus.PENDING,
    })
    await ctx.store.save(issueRequest)
}

export async function handleIssueRequestExecuted(ctx: EventHandlerContext) {
    const { args } = ctx.event
    const { issueId, amount, fee } = args

    let issueRequest = await ctx.store.get(IssueRequest, issueId)

    if (issueRequest == null) {
        throw new Error(
            'Issue request MUST exists on the database when handling executed event'
        )
    }
    // set property to completed, amount and fee could have also changed.
    issueRequest.status = IssueRequestStatus.COMPLETED
    issueRequest.amount = amount
    issueRequest.fee = fee

    await ctx.store.save(issueRequest)
}

export async function handleIssueRequestCancelled(ctx: EventHandlerContext) {
    const { args } = ctx.event
    const { issueId, griefingCollateral } = args

    let issueRequest = await ctx.store.get(IssueRequest, issueId)

    if (issueRequest == null) {
        throw new Error(
            'Issue request MUST exists on the database when handling cancel event'
        )
    }
    // set property to completed. Griefing collateral slashed depends on when the requester cancelled, or if it expired.
    issueRequest.status = IssueRequestStatus.CANCELLED
    issueRequest.slashedCollateral = griefingCollateral

    await ctx.store.save(issueRequest)
}

export async function handleIssueRequestAmountChanged(
    ctx: EventHandlerContext
) {
    const { args } = ctx.event
    const { issueId, confiscatedGriefingCollateral } = args

    let issueRequest = await ctx.store.get(IssueRequest, issueId)

    if (issueRequest == null) {
        throw new Error(
            'Issue request MUST exists on the database when handling cancel event'
        )
    }

    // we update on this event the slashed collateral if the amount sent was not enough. The amount is updated on the executed event.
    issueRequest.slashedCollateral = confiscatedGriefingCollateral
    await ctx.store.save(issueRequest)
}

export async function handleRedeemRequest(ctx: EventHandlerContext) {
    const { args } = ctx.event
    const { redeemId, redeemer, amount, vaultId, fee, premium, transferFee } =
        args
    const vaultIdFlat = parseVaultId(vaultId)
    const vault = await getOrCreateVault(
        ctx,
        vaultIdFlat,
        undefined // It doesn't matter we don't have this, the vault should have already issued something and therefore must have been created.
    )

    const redeemRequestStorage = await getVersionedStorage(
        network,
        ctx,
        'redeem',
        'redeemRequests'
    )
    const createdRedeem = await redeemRequestStorage.get(ctx.block, redeemId)

    const redeemRequest = new RedeemRequest({
        id: redeemId,
        timestamp: new Date(ctx.block.timestamp ?? 0),
        opentime: createdRedeem.opentimes,
        period: createdRedeem.period,
        redeemer: hexToSs58(redeemer),
        amount: amount,
        vault: vault,
        fee: fee,
        premium: premium,
        transferFee: transferFee,
        status: RedeemRequestStatus.PENDING,
    })

    await ctx.store.save(redeemRequest)
}

export async function handleRedeemRequestExecuted(ctx: EventHandlerContext) {
    const { args } = ctx.event
    const { redeemId } = args

    let redeemRequest = await ctx.store.get(RedeemRequest, redeemId)

    if (redeemRequest == null) {
        throw new Error(
            'Redeem request MUST exists on the database when handling executed event'
        )
    }

    redeemRequest.status = RedeemRequestStatus.COMPLETED

    await ctx.store.save(redeemRequest)
}

export async function handleRedeemRequestCancelled(ctx: EventHandlerContext) {
    const { args } = ctx.event
    const { redeemId, status, slashedAmount } = args

    let redeemRequest = await ctx.store.get(RedeemRequest, redeemId)

    if (redeemRequest == null) {
        throw new Error(
            'Redeem request MUST exists on the database when handling cancel event'
        )
    }

    if (status == 'Reimbursed') {
        redeemRequest.status = RedeemRequestStatus.REIMBURSED
        // Todo, not sure how this status is represented.
    } else if (status == 'Reimbursed(true)?') {
        redeemRequest.status = RedeemRequestStatus.REIMBURSED_MINTED
    } else {
        redeemRequest.status = RedeemRequestStatus.RETRIED
    }
    redeemRequest.slashedAmount = slashedAmount

    await ctx.store.save(redeemRequest)
}
