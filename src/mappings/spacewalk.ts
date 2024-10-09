import { EventHandlerContext } from '../processor'
import { RedeemRequest, IssueRequest } from '../model'
import { maybeHexToSs58 } from './nabla/addresses'
import { getOrCreateVault } from '../entities/vault'
import { getVersionedStorage } from '../types/eventsAndStorageSelector'
import { network } from '../config'
import { IssueRequestStatus } from '../model/generated/_issueRequestStatus'
import { RedeemRequestStatus } from '../model/generated/_redeemRequestStatus'
import { IssueRequestType, RedeemRequestType } from '../types/common'
import { beautifyCurrencyIdString } from './token'
import { deriveStellarPublicKeyFromHex } from './token'

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

function getRedeemRequestStatus(status: RedeemRequestType['status']) {
    switch (status.__kind) {
        case 'Pending':
            return RedeemRequestStatus.PENDING
        case 'Completed':
            return RedeemRequestStatus.COMPLETED
        case 'Retried':
            return RedeemRequestStatus.RETRIED
        case 'Reimbursed':
            if (status.value) {
                return RedeemRequestStatus.REIMBURSED_MINTED
            } else {
                return RedeemRequestStatus.REIMBURSED
            }
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

    const vault = await getOrCreateVault(
        ctx,
        storageIssue.vault,
        storageIssue.stellarAddress
    )

    // Get existing issue request from the database if any
    let existingIssueRequest = await ctx.store.get(IssueRequest, issueId)

    const issueRequest = new IssueRequest({
        id: issueId,
        timestamp: existingIssueRequest
            ? existingIssueRequest.timestamp
            : new Date(ctx.block.timestamp ?? 0),
        opentime: BigInt(storageIssue.opentime),
        period: BigInt(storageIssue.period),
        requester: maybeHexToSs58(storageIssue.requester),
        amount: BigInt(storageIssue.amount),
        vault: vault, // Our vault entity, not the storage's vault type
        fee: BigInt(storageIssue.fee),
        asset: beautifyCurrencyIdString(storageIssue.asset),
        stellarAddress: deriveStellarPublicKeyFromHex(
            storageIssue.stellarAddress
        ),
        griefingCollateral: BigInt(storageIssue.griefingCollateral),
        status: getIssueRequestStatus(storageIssue.status),
    })

    await ctx.store.save(issueRequest)
}

export async function handleIssueRequestCreated(ctx: EventHandlerContext) {
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

export async function createOrUpdateRedeemRequest(
    ctx: EventHandlerContext,
    redeemId: string
) {
    const redeemRequestStorage = await getVersionedStorage(
        network,
        ctx,
        'redeem',
        'redeemRequests'
    )
    const storageRedeem = (await redeemRequestStorage.get(
        ctx.block,
        redeemId
    )) as RedeemRequestType

    const vault = await getOrCreateVault(
        ctx,
        storageRedeem.vault,
        undefined // We don't have the stellar address of the vault in the redeem request. Nevertheless, the vault was already created on issue.
    )

    // vault must exist
    if (!vault) {
        throw new Error(`Vault ${storageRedeem.vault} not found`)
    }

    let existingRedeemRequest = await ctx.store.get(RedeemRequest, redeemId)

    const redeemRequest = new RedeemRequest({
        id: redeemId,
        timestamp: existingRedeemRequest
            ? existingRedeemRequest.timestamp
            : new Date(ctx.block.timestamp ?? 0),
        opentime: BigInt(storageRedeem.opentime),
        period: BigInt(storageRedeem.period),
        redeemer: maybeHexToSs58(storageRedeem.redeemer),
        amount: BigInt(storageRedeem.amount),
        asset: beautifyCurrencyIdString(storageRedeem.asset),
        vault: vault,
        fee: BigInt(storageRedeem.fee),
        premium: BigInt(storageRedeem.premium),
        transferFee: BigInt(storageRedeem.transferFee),
        status: getRedeemRequestStatus(storageRedeem.status),
        stellarAddress: deriveStellarPublicKeyFromHex(
            storageRedeem.stellarAddress
        ),
    })

    await ctx.store.save(redeemRequest)
}

export async function handleRedeemRequestCreated(ctx: EventHandlerContext) {
    const { args } = ctx.event
    const { redeemId } = args

    await createOrUpdateRedeemRequest(ctx, redeemId)
}

export async function handleRedeemRequestExecuted(ctx: EventHandlerContext) {
    const { args } = ctx.event
    const { redeemId } = args

    await createOrUpdateRedeemRequest(ctx, redeemId)
}

export async function handleRedeemRequestCancelled(ctx: EventHandlerContext) {
    const { args } = ctx.event
    const { redeemId } = args

    await createOrUpdateRedeemRequest(ctx, redeemId)
}

export async function handleMintTokensForReimburseRedeem(
    ctx: EventHandlerContext
) {
    const { args } = ctx.event
    const { redeemId } = args

    await createOrUpdateRedeemRequest(ctx, redeemId)
}
