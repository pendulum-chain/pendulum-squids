import {
    sts,
    Block,
    Bytes,
    Option,
    Result,
    EventType,
    RuntimeCtx,
} from '../support'
import * as v7 from '../v7'

export const liquidityAdded = {
    name: 'ZenlinkProtocol.LiquidityAdded',
    /**
     * Add liquidity. \[owner, asset_0, asset_1, add_balance_0, add_balance_1,
     * mint_balance_lp\]
     */
    v7: new EventType(
        'ZenlinkProtocol.LiquidityAdded',
        sts.tuple([
            v7.AccountId32,
            v7.AssetId,
            v7.AssetId,
            sts.bigint(),
            sts.bigint(),
            sts.bigint(),
        ])
    ),
}

export const liquidityRemoved = {
    name: 'ZenlinkProtocol.LiquidityRemoved',
    /**
     * Remove liquidity. \[owner, recipient, asset_0, asset_1, rm_balance_0, rm_balance_1,
     * burn_balance_lp\]
     */
    v7: new EventType(
        'ZenlinkProtocol.LiquidityRemoved',
        sts.tuple([
            v7.AccountId32,
            v7.AccountId32,
            v7.AssetId,
            v7.AssetId,
            sts.bigint(),
            sts.bigint(),
            sts.bigint(),
        ])
    ),
}

export const assetSwap = {
    name: 'ZenlinkProtocol.AssetSwap',
    /**
     * Transact in trading \[owner, recipient, swap_path, balances\]
     */
    v7: new EventType(
        'ZenlinkProtocol.AssetSwap',
        sts.tuple([
            v7.AccountId32,
            v7.AccountId32,
            sts.array(() => v7.AssetId),
            sts.array(() => sts.bigint()),
        ])
    ),
}
