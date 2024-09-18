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

export const liquidityAdded = {
    name: 'ZenlinkProtocol.LiquidityAdded',
    /**
     * Add liquidity. \[owner, asset_0, asset_1, add_balance_0, add_balance_1,
     * mint_balance_lp\]
     */
    v18: new EventType(
        'ZenlinkProtocol.LiquidityAdded',
        sts.tuple([
            v18.AccountId32,
            v18.AssetId,
            v18.AssetId,
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
    v18: new EventType(
        'ZenlinkProtocol.LiquidityRemoved',
        sts.tuple([
            v18.AccountId32,
            v18.AccountId32,
            v18.AssetId,
            v18.AssetId,
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
    v18: new EventType(
        'ZenlinkProtocol.AssetSwap',
        sts.tuple([
            v18.AccountId32,
            v18.AccountId32,
            sts.array(() => v18.AssetId),
            sts.array(() => sts.bigint()),
        ])
    ),
}
