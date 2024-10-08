import { EventHandlerContext } from '../processor'
import { RedeemRequest, IssueRequest } from '../model'
import { hexToSs58 } from './nabla/addresses'
import { getOrCreateVault } from '../entities/vault'
import { parseVaultId } from '../utils/vault'
import { getVersionedStorage } from '../types/eventsAndStorageSelector'
import { network } from '../config'
import { IssueRequestStatus } from '../model/generated/_issueRequestStatus'
import { RedeemRequestStatus } from '../model/generated/_redeemRequestStatus'
import { IssueRequestType } from '../types/common'
import { beautifyCurrencyIdString } from './token'

function getIssueRequestStatus(status: IssueRequestType['status']) {
    switch (status.__kind) {
        case 'Cancelled':
            return IssueRequestStatus.CANCELLED
        case 'Completed':
            return IssueRequestStatus.COMPLETED
        case 'Pending':
            return IssueRequestStatus.PENDING
    }
}

// This function is used to get the latest info about an issue request from the storage and save it to the database.
async function createOrUpdateIssueRequest(
    ctx: EventHandlerContext,
    issueId: string
) {
    const issueRequestStorage = await getVersionedStorage(
        network,
        ctx,
        'issue',
        'issueRequests'
    )
    const storageIssue = (await issueRequestStorage.get(
        ctx.block,
        issueId
    )) as IssueRequestType

    // Get existing issue request from the database if any
    let existingIssueRequest = await ctx.store.get(IssueRequest, issueId)

    const issueRequest = new IssueRequest({
        id: issueId,
        timestamp: existingIssueRequest
            ? existingIssueRequest.timestamp
            : new Date(ctx.block.timestamp ?? 0),
        opentime: storageIssue.opentime as any, // Fixme: opentime is not a number
        period: storageIssue.period as any, // Fixme: period is not a number
        requester: hexToSs58(storageIssue.requester),
        amount: storageIssue.amount,
        vault: storageIssue.vault as any, // Fixme: vault is not a string
        fee: storageIssue.fee,
        asset: beautifyCurrencyIdString(storageIssue.asset),
        stellarAddress: storageIssue.stellarAddress, // TODO possibly already convert to proper Stellar encoding
        griefingCollateral: storageIssue.griefingCollateral,
        status: getIssueRequestStatus(storageIssue.status),
    })

    await ctx.store.save(issueRequest)
}

export async function handleIssueRequest(ctx: EventHandlerContext) {
    const { args } = ctx.event
    const { issueId } = args

    await createOrUpdateIssueRequest(ctx, issueId)
}

export async function handleIssueRequestExecuted(ctx: EventHandlerContext) {
    const { args } = ctx.event
    const { issueId } = args

    await createOrUpdateIssueRequest(ctx, issueId)
}

export async function handleIssueRequestCancelled(ctx: EventHandlerContext) {
    const { args } = ctx.event
    const { issueId } = args

    await createOrUpdateIssueRequest(ctx, issueId)
}

export async function handleIssueRequestAmountChanged(
    ctx: EventHandlerContext
) {
    const { args } = ctx.event
    const { issueId } = args

    await createOrUpdateIssueRequest(ctx, issueId)
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
