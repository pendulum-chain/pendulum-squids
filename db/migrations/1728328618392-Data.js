module.exports = class Data1728328618392 {
    name = 'Data1728328618392'

    async up(db) {
        await db.query(
            `CREATE TABLE "oracle_price" ("id" character varying NOT NULL, "symbol" text NOT NULL, "name" text NOT NULL, "blockchain" text NOT NULL, "timestamp" numeric NOT NULL, "price" text NOT NULL, "supply" text NOT NULL, "decimals" integer NOT NULL, CONSTRAINT "PK_606c938b2474588b154eb625f3b" PRIMARY KEY ("id"))`
        )
        await db.query(
            `CREATE INDEX "IDX_6554f47abd46667280a2523381" ON "oracle_price" ("symbol") `
        )
        await db.query(
            `CREATE INDEX "IDX_2026224855490e321e5c0b6911" ON "oracle_price" ("blockchain") `
        )
        await db.query(
            `CREATE INDEX "IDX_a77ac6d79f0929522f5a1aefcb" ON "oracle_price" ("timestamp") `
        )
        await db.query(
            `CREATE INDEX "IDX_f7c9bf3bae39fb0a75f12b87dd" ON "oracle_price" ("price") `
        )
        await db.query(
            `CREATE TABLE "transfer" ("id" character varying NOT NULL, "block_number" integer NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "extrinsic_hash" text, "from" text NOT NULL, "to" text NOT NULL, "amount" numeric NOT NULL, "fee" numeric NOT NULL, "remark" text, CONSTRAINT "PK_fd9ddbdd49a17afcbe014401295" PRIMARY KEY ("id"))`
        )
        await db.query(
            `CREATE INDEX "IDX_d6624eacc30144ea97915fe846" ON "transfer" ("block_number") `
        )
        await db.query(
            `CREATE INDEX "IDX_70ff8b624c3118ac3a4862d22c" ON "transfer" ("timestamp") `
        )
        await db.query(
            `CREATE INDEX "IDX_070c555a86b0b41a534a55a659" ON "transfer" ("extrinsic_hash") `
        )
        await db.query(
            `CREATE INDEX "IDX_f4007436c1b546ede08a4fd7ab" ON "transfer" ("amount") `
        )
        await db.query(
            `CREATE TABLE "factory" ("id" character varying NOT NULL, "pair_count" integer NOT NULL, "total_volume_usd" text NOT NULL, "total_volume_eth" text NOT NULL, "untracked_volume_usd" text NOT NULL, "total_liquidity_usd" text NOT NULL, "total_liquidity_eth" text NOT NULL, "tx_count" integer NOT NULL, CONSTRAINT "PK_1372e5a7d114a3fa80736ba66bb" PRIMARY KEY ("id"))`
        )
        await db.query(
            `CREATE TABLE "stable_swap_event" ("id" character varying NOT NULL, "data" jsonb, "block" numeric NOT NULL, "timestamp" numeric NOT NULL, "transaction" bytea NOT NULL, "stable_swap_id" character varying, CONSTRAINT "PK_8b61dbc9b556ed8fcb4030fee7d" PRIMARY KEY ("id"))`
        )
        await db.query(
            `CREATE INDEX "IDX_3a147c85b92441217540579be8" ON "stable_swap_event" ("stable_swap_id") `
        )
        await db.query(
            `CREATE TABLE "stable_swap_exchange" ("id" character varying NOT NULL, "data" jsonb, "block" numeric NOT NULL, "timestamp" numeric NOT NULL, "transaction" bytea NOT NULL, "stable_swap_id" character varying, CONSTRAINT "PK_f06e489da865134dcfac3bbcd22" PRIMARY KEY ("id"))`
        )
        await db.query(
            `CREATE INDEX "IDX_1180a78feea28e278229de7db4" ON "stable_swap_exchange" ("stable_swap_id") `
        )
        await db.query(
            `CREATE TABLE "stable_swap_day_data" ("id" character varying NOT NULL, "date" TIMESTAMP WITH TIME ZONE NOT NULL, "daily_volume_usd" text NOT NULL, "tvl_usd" text NOT NULL, "stable_swap_id" character varying, CONSTRAINT "PK_819b3b7bf9c8055e14e0bf1c578" PRIMARY KEY ("id"))`
        )
        await db.query(
            `CREATE INDEX "IDX_648b49eb1a4f2a47f24f13bb51" ON "stable_swap_day_data" ("stable_swap_id") `
        )
        await db.query(
            `CREATE TABLE "stable_swap_hour_data" ("id" character varying NOT NULL, "hour_start_unix" numeric NOT NULL, "hourly_volume_usd" text NOT NULL, "tvl_usd" text NOT NULL, "stable_swap_id" character varying, CONSTRAINT "PK_2aedd41b95c37330a4a8429e192" PRIMARY KEY ("id"))`
        )
        await db.query(
            `CREATE INDEX "IDX_94584d2925c30ae0d4b80aadfc" ON "stable_swap_hour_data" ("stable_swap_id") `
        )
        await db.query(
            `CREATE TABLE "token_day_data" ("id" character varying NOT NULL, "date" TIMESTAMP WITH TIME ZONE NOT NULL, "daily_volume_token" text NOT NULL, "daily_volume_eth" text NOT NULL, "daily_volume_usd" text NOT NULL, "daily_txns" integer NOT NULL, "total_liquidity_token" text NOT NULL, "total_liquidity_eth" text NOT NULL, "total_liquidity_usd" text NOT NULL, "price_usd" text NOT NULL, "token_id" character varying, CONSTRAINT "PK_73fc06337215e86196b36822116" PRIMARY KEY ("id"))`
        )
        await db.query(
            `CREATE INDEX "IDX_b8950a8bc7b60231137573740e" ON "token_day_data" ("token_id") `
        )
        await db.query(
            `CREATE TABLE "pair_hour_data" ("id" character varying NOT NULL, "hour_start_unix" numeric NOT NULL, "reserve0" text NOT NULL, "reserve1" text NOT NULL, "total_supply" text NOT NULL, "reserve_usd" text NOT NULL, "hourly_volume_token0" text NOT NULL, "hourly_volume_token1" text NOT NULL, "hourly_volume_usd" text NOT NULL, "hourly_txns" integer NOT NULL, "pair_id" character varying, CONSTRAINT "PK_ffc544bb3e72cfd3e48a8b01452" PRIMARY KEY ("id"))`
        )
        await db.query(
            `CREATE INDEX "IDX_cf50c55389e428096a68598ee3" ON "pair_hour_data" ("pair_id") `
        )
        await db.query(
            `CREATE TABLE "stable_swap_liquidity_position" ("id" character varying NOT NULL, "liquidity_token_balance" text NOT NULL, "user_id" character varying, "stable_swap_id" character varying, CONSTRAINT "PK_12f435243c8a739330c0881d720" PRIMARY KEY ("id"))`
        )
        await db.query(
            `CREATE INDEX "IDX_f953aebc7c0752f6b8434c9eef" ON "stable_swap_liquidity_position" ("user_id") `
        )
        await db.query(
            `CREATE INDEX "IDX_405e0d7aeca80975d88a63bc6e" ON "stable_swap_liquidity_position" ("stable_swap_id") `
        )
        await db.query(
            `CREATE TABLE "stake_position" ("id" character varying NOT NULL, "liquidity_staked_balance" numeric NOT NULL, "user_id" character varying, "farm_id" character varying, CONSTRAINT "PK_17615803509bd6065f1ab8b0ced" PRIMARY KEY ("id"))`
        )
        await db.query(
            `CREATE INDEX "IDX_2a2b22d2744b497bbcfb03e6ab" ON "stake_position" ("user_id") `
        )
        await db.query(
            `CREATE INDEX "IDX_670629d9904e1f48f4a31abb49" ON "stake_position" ("farm_id") `
        )
        await db.query(
            `CREATE TABLE "user" ("id" character varying NOT NULL, "usd_swapped" text NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
        )
        await db.query(
            `CREATE TABLE "liquidity_position" ("id" character varying NOT NULL, "liquidity_token_balance" text NOT NULL, "user_id" character varying, "pair_id" character varying, CONSTRAINT "PK_db00d963c96b3914d26abe3c3d2" PRIMARY KEY ("id"))`
        )
        await db.query(
            `CREATE INDEX "IDX_781470585a67fef4e215a59977" ON "liquidity_position" ("user_id") `
        )
        await db.query(
            `CREATE INDEX "IDX_5a626c8b8962dc01e0f8801be6" ON "liquidity_position" ("pair_id") `
        )
        await db.query(
            `CREATE TABLE "liquidity_position_snapshot" ("id" character varying NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "block" integer NOT NULL, "token0_price_usd" text NOT NULL, "token1_price_usd" text NOT NULL, "reserve0" text NOT NULL, "reserve1" text NOT NULL, "reserve_usd" text NOT NULL, "liquidity_token_total_supply" text NOT NULL, "liquidity_token_balance" text NOT NULL, "liquidity_position_id" character varying, "user_id" character varying, "pair_id" character varying, CONSTRAINT "PK_cd4ed3539266b2439349a9fa791" PRIMARY KEY ("id"))`
        )
        await db.query(
            `CREATE INDEX "IDX_eb823fd4d5a47575039e902efa" ON "liquidity_position_snapshot" ("liquidity_position_id") `
        )
        await db.query(
            `CREATE INDEX "IDX_ed32a41150bc13f18a01974153" ON "liquidity_position_snapshot" ("user_id") `
        )
        await db.query(
            `CREATE INDEX "IDX_ce85a847b2952f7e685f150de1" ON "liquidity_position_snapshot" ("pair_id") `
        )
        await db.query(
            `CREATE TABLE "transaction" ("id" character varying NOT NULL, "block_number" numeric NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "mints" text array NOT NULL, "burns" text array NOT NULL, "swaps" text array NOT NULL, CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))`
        )
        await db.query(
            `CREATE TABLE "mint" ("id" character varying NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "to" text NOT NULL, "liquidity" text NOT NULL, "sender" text, "amount0" text, "amount1" text, "log_index" integer, "amount_usd" text, "fee_to" text, "fee_liquidity" text, "transaction_id" character varying, "pair_id" character varying, CONSTRAINT "PK_fcaea791104aa41aa11dac29cb2" PRIMARY KEY ("id"))`
        )
        await db.query(
            `CREATE INDEX "IDX_19f4328320501dfd14e2bae085" ON "mint" ("transaction_id") `
        )
        await db.query(
            `CREATE INDEX "IDX_81d470127d4c55d09e9213bc4e" ON "mint" ("pair_id") `
        )
        await db.query(
            `CREATE TABLE "burn" ("id" character varying NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "liquidity" text NOT NULL, "sender" text, "amount0" text, "amount1" text, "to" text, "log_index" integer, "amount_usd" text, "needs_complete" boolean NOT NULL, "fee_to" text, "fee_liquidity" text, "transaction_id" character varying, "pair_id" character varying, CONSTRAINT "PK_dcb4f14ee4534154b31116553f0" PRIMARY KEY ("id"))`
        )
        await db.query(
            `CREATE INDEX "IDX_20ec76c5c56dd6b47dec5f0aaa" ON "burn" ("transaction_id") `
        )
        await db.query(
            `CREATE INDEX "IDX_ba144ce938b3266a470d4dd70f" ON "burn" ("pair_id") `
        )
        await db.query(
            `CREATE TABLE "swap" ("id" character varying NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "sender" text NOT NULL, "from" text NOT NULL, "amount0_in" text NOT NULL, "amount1_in" text NOT NULL, "amount0_out" text NOT NULL, "amount1_out" text NOT NULL, "to" text NOT NULL, "log_index" integer, "amount_usd" text NOT NULL, "transaction_id" character varying, "pair_id" character varying, CONSTRAINT "PK_4a10d0f359339acef77e7f986d9" PRIMARY KEY ("id"))`
        )
        await db.query(
            `CREATE INDEX "IDX_78506c4050ae7cedd50b08c0dc" ON "swap" ("transaction_id") `
        )
        await db.query(
            `CREATE INDEX "IDX_3571ab1dad7640a6b93c705b8f" ON "swap" ("pair_id") `
        )
        await db.query(
            `CREATE TABLE "pair" ("id" character varying NOT NULL, "reserve0" text NOT NULL, "reserve1" text NOT NULL, "total_supply" text NOT NULL, "reserve_eth" text NOT NULL, "reserve_usd" text NOT NULL, "tracked_reserve_eth" text NOT NULL, "token0_price" text NOT NULL, "token1_price" text NOT NULL, "volume_token0" text NOT NULL, "volume_token1" text NOT NULL, "volume_usd" text NOT NULL, "untracked_volume_usd" text NOT NULL, "tx_count" integer NOT NULL, "created_at_timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "created_at_block_number" numeric NOT NULL, "liquidity_provider_count" integer NOT NULL, "token0_id" character varying, "token1_id" character varying, CONSTRAINT "PK_3eaf216329c5c50aedb94fa797e" PRIMARY KEY ("id"))`
        )
        await db.query(
            `CREATE INDEX "IDX_f74dc53460944a424b56b8f7da" ON "pair" ("token0_id") `
        )
        await db.query(
            `CREATE INDEX "IDX_4419691fc411b8af754dfa65ce" ON "pair" ("token1_id") `
        )
        await db.query(
            `CREATE TABLE "pair_day_data" ("id" character varying NOT NULL, "date" TIMESTAMP WITH TIME ZONE NOT NULL, "pair_address" text NOT NULL, "reserve0" text NOT NULL, "reserve1" text NOT NULL, "total_supply" text NOT NULL, "reserve_usd" text NOT NULL, "daily_volume_token0" text NOT NULL, "daily_volume_token1" text NOT NULL, "daily_volume_usd" text NOT NULL, "daily_txns" integer NOT NULL, "pair_id" character varying, "token0_id" character varying, "token1_id" character varying, CONSTRAINT "PK_ac35ed26ab0c71d491a62e2881a" PRIMARY KEY ("id"))`
        )
        await db.query(
            `CREATE INDEX "IDX_d8ba7d7d7ad9f0e1c2933a0b7e" ON "pair_day_data" ("pair_id") `
        )
        await db.query(
            `CREATE INDEX "IDX_88f6e19c40b47053e6e197db1c" ON "pair_day_data" ("token0_id") `
        )
        await db.query(
            `CREATE INDEX "IDX_ce435d6fc7c373d58e7aab156d" ON "pair_day_data" ("token1_id") `
        )
        await db.query(
            `CREATE TABLE "token" ("id" character varying NOT NULL, "symbol" text NOT NULL, "name" text NOT NULL, "decimals" integer NOT NULL, "total_supply" text NOT NULL, "trade_volume" text NOT NULL, "trade_volume_usd" text NOT NULL, "untracked_volume_usd" text NOT NULL, "tx_count" integer NOT NULL, "total_liquidity" text NOT NULL, "derived_eth" text NOT NULL, CONSTRAINT "PK_82fae97f905930df5d62a702fc9" PRIMARY KEY ("id"))`
        )
        await db.query(
            `CREATE TABLE "single_token_lock_day_data" ("id" character varying NOT NULL, "date" TIMESTAMP WITH TIME ZONE NOT NULL, "total_liquidity" text NOT NULL, "total_liquidity_usd" text NOT NULL, "total_liquidity_eth" text NOT NULL, "single_token_lock_id" character varying, CONSTRAINT "PK_87d03adf6b8624eaff434355e53" PRIMARY KEY ("id"))`
        )
        await db.query(
            `CREATE INDEX "IDX_f3bf64f43101176dbe5f11a36b" ON "single_token_lock_day_data" ("single_token_lock_id") `
        )
        await db.query(
            `CREATE TABLE "single_token_lock_hour_data" ("id" character varying NOT NULL, "hour_start_unix" numeric NOT NULL, "total_liquidity" text NOT NULL, "total_liquidity_usd" text NOT NULL, "total_liquidity_eth" text NOT NULL, "single_token_lock_id" character varying, CONSTRAINT "PK_9173bf5d597c5ce35bbce2e664b" PRIMARY KEY ("id"))`
        )
        await db.query(
            `CREATE INDEX "IDX_b2a84dc625103153d651b701dd" ON "single_token_lock_hour_data" ("single_token_lock_id") `
        )
        await db.query(
            `CREATE TABLE "single_token_lock" ("id" character varying NOT NULL, "total_liquidity_usd" text NOT NULL, "total_liquidity" text NOT NULL, "total_liquidity_eth" text NOT NULL, "token_id" character varying, CONSTRAINT "PK_b3d635331ccfacc4f532569364b" PRIMARY KEY ("id"))`
        )
        await db.query(
            `CREATE INDEX "IDX_8ebffe66457859d6e1c37b81ac" ON "single_token_lock" ("token_id") `
        )
        await db.query(
            `CREATE TABLE "incentive" ("id" character varying NOT NULL, "reward_per_day" text NOT NULL, "farm_id" character varying, "reward_token_id" character varying, CONSTRAINT "PK_fc2c4e32d8711392ddf918b9f6c" PRIMARY KEY ("id"))`
        )
        await db.query(
            `CREATE INDEX "IDX_35286137967591eaff8dee7ca2" ON "incentive" ("farm_id") `
        )
        await db.query(
            `CREATE INDEX "IDX_041db4166864a3841e5efed53c" ON "incentive" ("reward_token_id") `
        )
        await db.query(
            `CREATE TABLE "farm" ("id" character varying NOT NULL, "pid" numeric NOT NULL, "stake_token" text NOT NULL, "liquidity_staked" numeric NOT NULL, "created_at_block" numeric NOT NULL, "created_at_timestamp" numeric NOT NULL, "staked_usd" text NOT NULL, "reward_usd_per_day" text NOT NULL, "stake_apr" text NOT NULL, "single_token_lock_id" character varying, "stable_swap_id" character varying, "pair_id" character varying, CONSTRAINT "PK_3bf246b27a3b6678dfc0b7a3f64" PRIMARY KEY ("id"))`
        )
        await db.query(
            `CREATE INDEX "IDX_679106a1febf251d7fe7fe081a" ON "farm" ("single_token_lock_id") `
        )
        await db.query(
            `CREATE INDEX "IDX_00b8f5b860927b1b85e866b20d" ON "farm" ("stable_swap_id") `
        )
        await db.query(
            `CREATE INDEX "IDX_11da1bf5c406898262d91b41cb" ON "farm" ("pair_id") `
        )
        await db.query(
            `CREATE TABLE "stable_swap" ("id" character varying NOT NULL, "address" text NOT NULL, "base_swap_address" text NOT NULL, "num_tokens" integer NOT NULL, "tokens" text array NOT NULL, "base_tokens" text array NOT NULL, "all_tokens" text array NOT NULL, "balances" text array NOT NULL, "lp_token" text NOT NULL, "lp_total_supply" text NOT NULL, "a" numeric NOT NULL, "swap_fee" numeric NOT NULL, "admin_fee" numeric NOT NULL, "virtual_price" numeric NOT NULL, "tvl_usd" text NOT NULL, "volume_usd" text NOT NULL, "stable_swap_info_id" character varying, CONSTRAINT "PK_37316f6fedc29bf95a6f1804c65" PRIMARY KEY ("id"))`
        )
        await db.query(
            `CREATE INDEX "IDX_88cce14adee6d21f5057551c3e" ON "stable_swap" ("stable_swap_info_id") `
        )
        await db.query(
            `CREATE TABLE "stable_swap_info" ("id" character varying NOT NULL, "pool_count" integer NOT NULL, "total_volume_usd" text NOT NULL, "total_tvl_usd" text NOT NULL, "tx_count" integer NOT NULL, CONSTRAINT "PK_21998b071d5e28639e21e9b2da7" PRIMARY KEY ("id"))`
        )
        await db.query(
            `CREATE TABLE "zenlink_info" ("id" character varying NOT NULL, "updated_date" TIMESTAMP WITH TIME ZONE NOT NULL, "total_volume_usd" text NOT NULL, "total_tvl_usd" text NOT NULL, "tx_count" integer NOT NULL, "factory_id" character varying, "stable_swap_info_id" character varying, CONSTRAINT "PK_2526d46468e5c4f7c4156840a90" PRIMARY KEY ("id"))`
        )
        await db.query(
            `CREATE INDEX "IDX_9a6b55d2085464668b622dffe6" ON "zenlink_info" ("factory_id") `
        )
        await db.query(
            `CREATE INDEX "IDX_0795adc3723792868094ec76c0" ON "zenlink_info" ("stable_swap_info_id") `
        )
        await db.query(
            `CREATE TABLE "token_transfer" ("id" character varying NOT NULL, "block_number" integer NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "extrinsic_hash" text, "from" text NOT NULL, "to" text NOT NULL, "currency_id" text NOT NULL, "amount" numeric NOT NULL, "remark" text, CONSTRAINT "PK_77384b7f5874553f012eba9da41" PRIMARY KEY ("id"))`
        )
        await db.query(
            `CREATE INDEX "IDX_b47f7192b72dd8436ef4e6d253" ON "token_transfer" ("block_number") `
        )
        await db.query(
            `CREATE INDEX "IDX_752d6c330729a7b2e283003374" ON "token_transfer" ("timestamp") `
        )
        await db.query(
            `CREATE INDEX "IDX_2ef35b71d641ec79b7de3ac237" ON "token_transfer" ("extrinsic_hash") `
        )
        await db.query(
            `CREATE INDEX "IDX_aae50046f62ba400c07477fb6c" ON "token_transfer" ("amount") `
        )
        await db.query(
            `CREATE TABLE "token_deposit" ("id" character varying NOT NULL, "block_number" integer NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "extrinsic_hash" text, "who" text NOT NULL, "currency_id" text NOT NULL, "amount" numeric NOT NULL, CONSTRAINT "PK_7c5eea7aeab3f0e71da8d2d9f4f" PRIMARY KEY ("id"))`
        )
        await db.query(
            `CREATE INDEX "IDX_395da815b9927f13e2f87c6b54" ON "token_deposit" ("block_number") `
        )
        await db.query(
            `CREATE INDEX "IDX_0f87d313517eaa806c75444749" ON "token_deposit" ("timestamp") `
        )
        await db.query(
            `CREATE INDEX "IDX_7194acc3ea037189ff3da743ec" ON "token_deposit" ("extrinsic_hash") `
        )
        await db.query(
            `CREATE INDEX "IDX_d23ae7a0ea1f640e8e9875b3c2" ON "token_deposit" ("amount") `
        )
        await db.query(
            `CREATE TABLE "token_withdrawn" ("id" character varying NOT NULL, "block_number" integer NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "extrinsic_hash" text, "who" text NOT NULL, "currency_id" text NOT NULL, "amount" numeric NOT NULL, CONSTRAINT "PK_658727649cde2e20f8cf69abeb5" PRIMARY KEY ("id"))`
        )
        await db.query(
            `CREATE INDEX "IDX_e7fd99cae9a1df2e8f69d60892" ON "token_withdrawn" ("block_number") `
        )
        await db.query(
            `CREATE INDEX "IDX_70e98131fb737e4dce4455ca43" ON "token_withdrawn" ("timestamp") `
        )
        await db.query(
            `CREATE INDEX "IDX_867e6d004e7a4994b3b2aeba63" ON "token_withdrawn" ("extrinsic_hash") `
        )
        await db.query(
            `CREATE INDEX "IDX_5697bf049746e5102413ebd832" ON "token_withdrawn" ("amount") `
        )
        await db.query(
            `CREATE TABLE "bundle" ("id" character varying NOT NULL, "eth_price" text NOT NULL, CONSTRAINT "PK_637e3f87e837d6532109c198dea" PRIMARY KEY ("id"))`
        )
        await db.query(
            `CREATE TABLE "factory_day_data" ("id" character varying NOT NULL, "date" TIMESTAMP WITH TIME ZONE NOT NULL, "daily_volume_eth" text NOT NULL, "daily_volume_usd" text NOT NULL, "daily_volume_untracked" text NOT NULL, "total_volume_eth" text NOT NULL, "total_liquidity_eth" text NOT NULL, "total_volume_usd" text NOT NULL, "total_liquidity_usd" text NOT NULL, "tx_count" integer NOT NULL, CONSTRAINT "PK_4b56c54390ce8e399d8e37e169d" PRIMARY KEY ("id"))`
        )
        await db.query(
            `CREATE TABLE "stable_day_data" ("id" character varying NOT NULL, "date" TIMESTAMP WITH TIME ZONE NOT NULL, "daily_volume_usd" text NOT NULL, "tvl_usd" text NOT NULL, CONSTRAINT "PK_3663f18340bb5fdc0023ecc624a" PRIMARY KEY ("id"))`
        )
        await db.query(
            `CREATE TABLE "zenlink_day_info" ("id" character varying NOT NULL, "date" TIMESTAMP WITH TIME ZONE NOT NULL, "daily_volume_usd" text NOT NULL, "tvl_usd" text NOT NULL, "standard_info_id" character varying, "stable_info_id" character varying, CONSTRAINT "PK_747195cfa3811d6eea0ff6389de" PRIMARY KEY ("id"))`
        )
        await db.query(
            `CREATE INDEX "IDX_9f281ffbf4f668c1671ae24aeb" ON "zenlink_day_info" ("standard_info_id") `
        )
        await db.query(
            `CREATE INDEX "IDX_3049b8ac70203e95dfc6b42c02" ON "zenlink_day_info" ("stable_info_id") `
        )
        await db.query(
            `CREATE TABLE "zlk_info" ("id" character varying NOT NULL, "updated_date" TIMESTAMP WITH TIME ZONE NOT NULL, "burn" numeric NOT NULL, CONSTRAINT "PK_58853b5e24384aba0da2023e91e" PRIMARY KEY ("id"))`
        )
        await db.query(
            `CREATE TABLE "nabla_token" ("id" character varying NOT NULL, "decimals" integer NOT NULL, "name" text NOT NULL, "symbol" text NOT NULL, CONSTRAINT "PK_d036fec883bded17a5c2e09cf0a" PRIMARY KEY ("id"))`
        )
        await db.query(
            `CREATE TABLE "nabla_swap_fee" ("id" character varying NOT NULL, "lp_fees" numeric NOT NULL, "backstop_fees" numeric NOT NULL, "protocol_fees" numeric NOT NULL, "timestamp" numeric NOT NULL, "swap_pool_id" character varying, "backstop_pool_id" character varying, CONSTRAINT "PK_8824e4a63ae77ecf8a55aa5359a" PRIMARY KEY ("id"))`
        )
        await db.query(
            `CREATE INDEX "IDX_208d304702d154e73e4f85c978" ON "nabla_swap_fee" ("swap_pool_id") `
        )
        await db.query(
            `CREATE INDEX "IDX_86080eda96a6de9c3c60be41d8" ON "nabla_swap_fee" ("backstop_pool_id") `
        )
        await db.query(
            `CREATE TABLE "backstop_pool" ("id" character varying NOT NULL, "name" text NOT NULL, "symbol" text NOT NULL, "lp_token_decimals" integer NOT NULL, "reserves" numeric NOT NULL, "total_supply" numeric NOT NULL, "paused" boolean NOT NULL, "apr" numeric NOT NULL, "router_id" character varying, "token_id" character varying, CONSTRAINT "PK_bf2d01d9ce60ad9ee4b1b087d9d" PRIMARY KEY ("id"))`
        )
        await db.query(
            `CREATE INDEX "IDX_13ef09b925620aedf12b3342ca" ON "backstop_pool" ("router_id") `
        )
        await db.query(
            `CREATE INDEX "IDX_8a7a25fa2d22ff634bd3041d81" ON "backstop_pool" ("token_id") `
        )
        await db.query(
            `CREATE TABLE "swap_pool" ("id" character varying NOT NULL, "name" text NOT NULL, "symbol" text NOT NULL, "lp_token_decimals" integer NOT NULL, "reserve" numeric NOT NULL, "reserve_with_slippage" numeric NOT NULL, "total_liabilities" numeric NOT NULL, "total_supply" numeric NOT NULL, "paused" boolean NOT NULL, "apr" numeric NOT NULL, "insurance_fee_bps" numeric NOT NULL, "protocol_treasury_address" text, "router_id" character varying, "backstop_id" character varying, "token_id" character varying, CONSTRAINT "PK_e78e7b899d2e3327494e5fe975d" PRIMARY KEY ("id"))`
        )
        await db.query(
            `CREATE INDEX "IDX_2f5409f002e18e4a6e2fddd858" ON "swap_pool" ("router_id") `
        )
        await db.query(
            `CREATE INDEX "IDX_5c3209a88e41d53bdc450605b3" ON "swap_pool" ("backstop_id") `
        )
        await db.query(
            `CREATE INDEX "IDX_b66a5cc8d2ce7bba1b48fd8c1a" ON "swap_pool" ("token_id") `
        )
        await db.query(
            `CREATE TABLE "router" ("id" character varying NOT NULL, "paused" boolean NOT NULL, CONSTRAINT "PK_510c864aa88ac8eb3a306789801" PRIMARY KEY ("id"))`
        )
        await db.query(
            `CREATE TABLE "nabla_swap" ("id" character varying NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "sender" text NOT NULL, "amount_in" numeric NOT NULL, "amount_out" numeric NOT NULL, "to" text NOT NULL, "token_in_id" character varying, "token_out_id" character varying, "swap_fee_id" character varying, CONSTRAINT "PK_6274610b518e1a9e61b1c6f03bb" PRIMARY KEY ("id"))`
        )
        await db.query(
            `CREATE INDEX "IDX_78ad17aaf8e256aada35d50c95" ON "nabla_swap" ("token_in_id") `
        )
        await db.query(
            `CREATE INDEX "IDX_3ddf0d667a8f06da7f6ab50004" ON "nabla_swap" ("token_out_id") `
        )
        await db.query(
            `CREATE INDEX "IDX_dd24afed240ad46290bfcf0603" ON "nabla_swap" ("swap_fee_id") `
        )
        await db.query(
            `CREATE TABLE "nabla_backstop_liquidity_deposit" ("id" character varying NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "sender" text NOT NULL, "pool_shares_minted" numeric NOT NULL, "amount_pool_tokens_deposited" numeric NOT NULL, "backstop_pool_id" character varying, CONSTRAINT "PK_6a7b952f6ac801d591360e47743" PRIMARY KEY ("id"))`
        )
        await db.query(
            `CREATE INDEX "IDX_a3ce6e5ba78f5987919e7ee346" ON "nabla_backstop_liquidity_deposit" ("backstop_pool_id") `
        )
        await db.query(
            `CREATE TABLE "nabla_swap_liquidity_deposit" ("id" character varying NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "sender" text NOT NULL, "pool_shares_minted" numeric NOT NULL, "amount_pool_tokens_deposited" numeric NOT NULL, "swap_pool_id" character varying, CONSTRAINT "PK_4788b03472eec9547df44a82c48" PRIMARY KEY ("id"))`
        )
        await db.query(
            `CREATE INDEX "IDX_e0480f777845618674d1bbc3b1" ON "nabla_swap_liquidity_deposit" ("swap_pool_id") `
        )
        await db.query(
            `CREATE TABLE "nabla_backstop_liquidity_withdrawal" ("id" character varying NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "sender" text NOT NULL, "pool_shares_burned" numeric NOT NULL, "amount_pool_tokens_withdrawn" numeric NOT NULL, "backstop_pool_id" character varying, CONSTRAINT "PK_9fca1665db21118d0b318e1f828" PRIMARY KEY ("id"))`
        )
        await db.query(
            `CREATE INDEX "IDX_33f15234263ac9c6d07fe5441f" ON "nabla_backstop_liquidity_withdrawal" ("backstop_pool_id") `
        )
        await db.query(
            `CREATE TABLE "nabla_swap_liquidity_withdrawal" ("id" character varying NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "sender" text NOT NULL, "pool_shares_burned" numeric NOT NULL, "amount_pool_tokens_withdrawn" numeric NOT NULL, "swap_pool_id" character varying, CONSTRAINT "PK_38c9ff7047fcf36ccbd4b7cb521" PRIMARY KEY ("id"))`
        )
        await db.query(
            `CREATE INDEX "IDX_ec313e0ceb8429cb76aa63ed74" ON "nabla_swap_liquidity_withdrawal" ("swap_pool_id") `
        )
        await db.query(
            `CREATE TABLE "vault" ("id" character varying NOT NULL, "account_id" text NOT NULL, "wrapped" text NOT NULL, "collateral" text NOT NULL, "vault_stellar_public_key" text NOT NULL, CONSTRAINT "PK_dd0898234c77f9d97585171ac59" PRIMARY KEY ("id"))`
        )
        await db.query(
            `CREATE TABLE "issue_request" ("id" character varying NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "opentime" numeric NOT NULL, "period" numeric NOT NULL, "requester" text NOT NULL, "amount" numeric NOT NULL, "fee" numeric NOT NULL, "griefing_collateral" numeric NOT NULL, "slashed_collateral" numeric, "status" character varying(9) NOT NULL, "vault_id" character varying, CONSTRAINT "PK_498cd8089f9302db334fd7fe7f6" PRIMARY KEY ("id"))`
        )
        await db.query(
            `CREATE INDEX "IDX_62755a570447cc6fb07d57ec30" ON "issue_request" ("vault_id") `
        )
        await db.query(
            `CREATE TABLE "redeem_request" ("id" character varying NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "opentime" numeric NOT NULL, "period" numeric NOT NULL, "redeemer" text NOT NULL, "amount" numeric NOT NULL, "fee" numeric NOT NULL, "premium" numeric NOT NULL, "transfer_fee" numeric NOT NULL, "slashed_amount" numeric, "status" character varying(17) NOT NULL, "vault_id" character varying, CONSTRAINT "PK_cfc413a4a56777d07b29de675fa" PRIMARY KEY ("id"))`
        )
        await db.query(
            `CREATE INDEX "IDX_1b3c9ec8a5fa79b7af69bb30ad" ON "redeem_request" ("vault_id") `
        )
        await db.query(
            `CREATE TABLE "event" ("id" character varying NOT NULL, "index" integer NOT NULL, "phase" text NOT NULL, "pallet" text NOT NULL, "name" text NOT NULL, "args" jsonb, "args_str" text array, "block_id" character varying, "extrinsic_id" character varying, "call_id" character varying, CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`
        )
        await db.query(
            `CREATE INDEX "IDX_2b0d35d675c4f99751855c4502" ON "event" ("block_id") `
        )
        await db.query(
            `CREATE INDEX "IDX_129efedcb305c80256db2d57a5" ON "event" ("extrinsic_id") `
        )
        await db.query(
            `CREATE INDEX "IDX_83cf1bd59aa4521ed882fa5145" ON "event" ("call_id") `
        )
        await db.query(
            `CREATE INDEX "IDX_7723d04c5a2f56c4373b6a4048" ON "event" ("pallet") `
        )
        await db.query(
            `CREATE INDEX "IDX_b535fbe8ec6d832dde22065ebd" ON "event" ("name") `
        )
        await db.query(
            `CREATE INDEX "IDX_0a00d817e614a91cda40d734cf" ON "event" ("id", "pallet", "name") `
        )
        await db.query(
            `CREATE TABLE "call" ("id" character varying NOT NULL, "address" integer array NOT NULL, "success" boolean NOT NULL, "error" jsonb, "pallet" text NOT NULL, "name" text NOT NULL, "args" jsonb, "args_str" text array, "block_id" character varying, "extrinsic_id" character varying, "parent_id" character varying, CONSTRAINT "PK_2098af0169792a34f9cfdd39c47" PRIMARY KEY ("id"))`
        )
        await db.query(
            `CREATE INDEX "IDX_bd3f11fd4110d60ac8b96cd62f" ON "call" ("block_id") `
        )
        await db.query(
            `CREATE INDEX "IDX_dde30e4f2c6a80f9236bfdf259" ON "call" ("extrinsic_id") `
        )
        await db.query(
            `CREATE INDEX "IDX_11c1e76d5be8f04c472c4a05b9" ON "call" ("parent_id") `
        )
        await db.query(
            `CREATE INDEX "IDX_d3a8c3d00494950ad6dc93297d" ON "call" ("success") `
        )
        await db.query(
            `CREATE INDEX "IDX_776bccbd3d7b3001c8708cf4e0" ON "call" ("pallet") `
        )
        await db.query(
            `CREATE INDEX "IDX_8b212022b7428232091e2f8aa5" ON "call" ("name") `
        )
        await db.query(
            `CREATE INDEX "IDX_f1e953379e1b3c453cd896bcd4" ON "call" ("id", "pallet", "name") `
        )
        await db.query(
            `CREATE TABLE "extrinsic" ("id" character varying NOT NULL, "index" integer NOT NULL, "version" integer NOT NULL, "signature" jsonb, "tip" numeric, "fee" numeric, "success" boolean, "error" jsonb, "hash" bytea NOT NULL, "block_id" character varying, "call_id" character varying, CONSTRAINT "PK_80d7db0e4b1e83e30336bc76755" PRIMARY KEY ("id"))`
        )
        await db.query(
            `CREATE INDEX "IDX_a3b99daba1259dab0dd040d4f7" ON "extrinsic" ("block_id") `
        )
        await db.query(
            `CREATE INDEX "IDX_824d47cc4b2cda726405aa507c" ON "extrinsic" ("call_id") `
        )
        await db.query(
            `CREATE INDEX "IDX_21e5db7671dfa1b00dbe6dbbd6" ON "extrinsic" ("success") `
        )
        await db.query(
            `CREATE INDEX "IDX_1f45de0713a55049009e8e8127" ON "extrinsic" ("hash") `
        )
        await db.query(
            `CREATE TABLE "block" ("id" character varying NOT NULL, "height" integer NOT NULL, "hash" bytea NOT NULL, "parent_hash" bytea NOT NULL, "state_root" bytea NOT NULL, "extrinsicsic_root" bytea NOT NULL, "spec_name" text NOT NULL, "spec_version" integer NOT NULL, "impl_name" text NOT NULL, "impl_version" integer NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "validator" bytea, "extrinsics_count" integer NOT NULL, "calls_count" integer NOT NULL, "events_count" integer NOT NULL, CONSTRAINT "PK_d0925763efb591c2e2ffb267572" PRIMARY KEY ("id"))`
        )
        await db.query(
            `CREATE INDEX "IDX_bce676e2b005104ccb768495db" ON "block" ("height") `
        )
        await db.query(
            `CREATE INDEX "IDX_f8fba63d7965bfee9f304c487a" ON "block" ("hash") `
        )
        await db.query(
            `CREATE INDEX "IDX_5b79d140fa8e2c64a7ef223598" ON "block" ("spec_version") `
        )
        await db.query(
            `CREATE INDEX "IDX_5c67cbcf4960c1a39e5fe25e87" ON "block" ("timestamp") `
        )
        await db.query(
            `CREATE INDEX "IDX_b7e2f8fe1384a2910825029dcb" ON "block" ("validator") `
        )
        await db.query(
            `CREATE TABLE "items_counter" ("id" character varying NOT NULL, "type" character varying(10) NOT NULL, "level" character varying(6) NOT NULL, "total" integer NOT NULL, CONSTRAINT "PK_161dcf46142538463f5d7174793" PRIMARY KEY ("id"))`
        )
        await db.query(
            `CREATE INDEX "IDX_68d2eadecb3eeb540d2004acef" ON "items_counter" ("type") `
        )
        await db.query(
            `CREATE INDEX "IDX_1d9be1d79f197d42dd163f86c8" ON "items_counter" ("level") `
        )
        await db.query(
            `CREATE INDEX "IDX_e03dd1c60ac7622914f72ac2f1" ON "items_counter" ("total") `
        )
        await db.query(
            `ALTER TABLE "stable_swap_event" ADD CONSTRAINT "FK_3a147c85b92441217540579be88" FOREIGN KEY ("stable_swap_id") REFERENCES "stable_swap"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        )
        await db.query(
            `ALTER TABLE "stable_swap_exchange" ADD CONSTRAINT "FK_1180a78feea28e278229de7db46" FOREIGN KEY ("stable_swap_id") REFERENCES "stable_swap"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        )
        await db.query(
            `ALTER TABLE "stable_swap_day_data" ADD CONSTRAINT "FK_648b49eb1a4f2a47f24f13bb510" FOREIGN KEY ("stable_swap_id") REFERENCES "stable_swap"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        )
        await db.query(
            `ALTER TABLE "stable_swap_hour_data" ADD CONSTRAINT "FK_94584d2925c30ae0d4b80aadfc8" FOREIGN KEY ("stable_swap_id") REFERENCES "stable_swap"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        )
        await db.query(
            `ALTER TABLE "token_day_data" ADD CONSTRAINT "FK_b8950a8bc7b60231137573740ea" FOREIGN KEY ("token_id") REFERENCES "token"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        )
        await db.query(
            `ALTER TABLE "pair_hour_data" ADD CONSTRAINT "FK_cf50c55389e428096a68598ee33" FOREIGN KEY ("pair_id") REFERENCES "pair"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        )
        await db.query(
            `ALTER TABLE "stable_swap_liquidity_position" ADD CONSTRAINT "FK_f953aebc7c0752f6b8434c9eef8" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        )
        await db.query(
            `ALTER TABLE "stable_swap_liquidity_position" ADD CONSTRAINT "FK_405e0d7aeca80975d88a63bc6ee" FOREIGN KEY ("stable_swap_id") REFERENCES "stable_swap"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        )
        await db.query(
            `ALTER TABLE "stake_position" ADD CONSTRAINT "FK_2a2b22d2744b497bbcfb03e6ab0" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        )
        await db.query(
            `ALTER TABLE "stake_position" ADD CONSTRAINT "FK_670629d9904e1f48f4a31abb495" FOREIGN KEY ("farm_id") REFERENCES "farm"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        )
        await db.query(
            `ALTER TABLE "liquidity_position" ADD CONSTRAINT "FK_781470585a67fef4e215a599773" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        )
        await db.query(
            `ALTER TABLE "liquidity_position" ADD CONSTRAINT "FK_5a626c8b8962dc01e0f8801be61" FOREIGN KEY ("pair_id") REFERENCES "pair"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        )
        await db.query(
            `ALTER TABLE "liquidity_position_snapshot" ADD CONSTRAINT "FK_eb823fd4d5a47575039e902efa7" FOREIGN KEY ("liquidity_position_id") REFERENCES "liquidity_position"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        )
        await db.query(
            `ALTER TABLE "liquidity_position_snapshot" ADD CONSTRAINT "FK_ed32a41150bc13f18a019741534" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        )
        await db.query(
            `ALTER TABLE "liquidity_position_snapshot" ADD CONSTRAINT "FK_ce85a847b2952f7e685f150de1d" FOREIGN KEY ("pair_id") REFERENCES "pair"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        )
        await db.query(
            `ALTER TABLE "mint" ADD CONSTRAINT "FK_19f4328320501dfd14e2bae0855" FOREIGN KEY ("transaction_id") REFERENCES "transaction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        )
        await db.query(
            `ALTER TABLE "mint" ADD CONSTRAINT "FK_81d470127d4c55d09e9213bc4e1" FOREIGN KEY ("pair_id") REFERENCES "pair"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        )
        await db.query(
            `ALTER TABLE "burn" ADD CONSTRAINT "FK_20ec76c5c56dd6b47dec5f0aaa8" FOREIGN KEY ("transaction_id") REFERENCES "transaction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        )
        await db.query(
            `ALTER TABLE "burn" ADD CONSTRAINT "FK_ba144ce938b3266a470d4dd70fa" FOREIGN KEY ("pair_id") REFERENCES "pair"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        )
        await db.query(
            `ALTER TABLE "swap" ADD CONSTRAINT "FK_78506c4050ae7cedd50b08c0dc5" FOREIGN KEY ("transaction_id") REFERENCES "transaction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        )
        await db.query(
            `ALTER TABLE "swap" ADD CONSTRAINT "FK_3571ab1dad7640a6b93c705b8f7" FOREIGN KEY ("pair_id") REFERENCES "pair"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        )
        await db.query(
            `ALTER TABLE "pair" ADD CONSTRAINT "FK_f74dc53460944a424b56b8f7da5" FOREIGN KEY ("token0_id") REFERENCES "token"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        )
        await db.query(
            `ALTER TABLE "pair" ADD CONSTRAINT "FK_4419691fc411b8af754dfa65ce4" FOREIGN KEY ("token1_id") REFERENCES "token"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        )
        await db.query(
            `ALTER TABLE "pair_day_data" ADD CONSTRAINT "FK_d8ba7d7d7ad9f0e1c2933a0b7e2" FOREIGN KEY ("pair_id") REFERENCES "pair"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        )
        await db.query(
            `ALTER TABLE "pair_day_data" ADD CONSTRAINT "FK_88f6e19c40b47053e6e197db1c9" FOREIGN KEY ("token0_id") REFERENCES "token"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        )
        await db.query(
            `ALTER TABLE "pair_day_data" ADD CONSTRAINT "FK_ce435d6fc7c373d58e7aab156d9" FOREIGN KEY ("token1_id") REFERENCES "token"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        )
        await db.query(
            `ALTER TABLE "single_token_lock_day_data" ADD CONSTRAINT "FK_f3bf64f43101176dbe5f11a36bd" FOREIGN KEY ("single_token_lock_id") REFERENCES "single_token_lock"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        )
        await db.query(
            `ALTER TABLE "single_token_lock_hour_data" ADD CONSTRAINT "FK_b2a84dc625103153d651b701dd1" FOREIGN KEY ("single_token_lock_id") REFERENCES "single_token_lock"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        )
        await db.query(
            `ALTER TABLE "single_token_lock" ADD CONSTRAINT "FK_8ebffe66457859d6e1c37b81ac3" FOREIGN KEY ("token_id") REFERENCES "token"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        )
        await db.query(
            `ALTER TABLE "incentive" ADD CONSTRAINT "FK_35286137967591eaff8dee7ca2a" FOREIGN KEY ("farm_id") REFERENCES "farm"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        )
        await db.query(
            `ALTER TABLE "incentive" ADD CONSTRAINT "FK_041db4166864a3841e5efed53c4" FOREIGN KEY ("reward_token_id") REFERENCES "token"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        )
        await db.query(
            `ALTER TABLE "farm" ADD CONSTRAINT "FK_679106a1febf251d7fe7fe081ad" FOREIGN KEY ("single_token_lock_id") REFERENCES "single_token_lock"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        )
        await db.query(
            `ALTER TABLE "farm" ADD CONSTRAINT "FK_00b8f5b860927b1b85e866b20da" FOREIGN KEY ("stable_swap_id") REFERENCES "stable_swap"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        )
        await db.query(
            `ALTER TABLE "farm" ADD CONSTRAINT "FK_11da1bf5c406898262d91b41cbb" FOREIGN KEY ("pair_id") REFERENCES "pair"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        )
        await db.query(
            `ALTER TABLE "stable_swap" ADD CONSTRAINT "FK_88cce14adee6d21f5057551c3ea" FOREIGN KEY ("stable_swap_info_id") REFERENCES "stable_swap_info"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        )
        await db.query(
            `ALTER TABLE "zenlink_info" ADD CONSTRAINT "FK_9a6b55d2085464668b622dffe64" FOREIGN KEY ("factory_id") REFERENCES "factory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        )
        await db.query(
            `ALTER TABLE "zenlink_info" ADD CONSTRAINT "FK_0795adc3723792868094ec76c07" FOREIGN KEY ("stable_swap_info_id") REFERENCES "stable_swap_info"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        )
        await db.query(
            `ALTER TABLE "zenlink_day_info" ADD CONSTRAINT "FK_9f281ffbf4f668c1671ae24aeb0" FOREIGN KEY ("standard_info_id") REFERENCES "factory_day_data"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        )
        await db.query(
            `ALTER TABLE "zenlink_day_info" ADD CONSTRAINT "FK_3049b8ac70203e95dfc6b42c027" FOREIGN KEY ("stable_info_id") REFERENCES "stable_swap_day_data"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        )
        await db.query(
            `ALTER TABLE "nabla_swap_fee" ADD CONSTRAINT "FK_208d304702d154e73e4f85c978b" FOREIGN KEY ("swap_pool_id") REFERENCES "swap_pool"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        )
        await db.query(
            `ALTER TABLE "nabla_swap_fee" ADD CONSTRAINT "FK_86080eda96a6de9c3c60be41d86" FOREIGN KEY ("backstop_pool_id") REFERENCES "backstop_pool"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        )
        await db.query(
            `ALTER TABLE "backstop_pool" ADD CONSTRAINT "FK_13ef09b925620aedf12b3342caa" FOREIGN KEY ("router_id") REFERENCES "router"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        )
        await db.query(
            `ALTER TABLE "backstop_pool" ADD CONSTRAINT "FK_8a7a25fa2d22ff634bd3041d818" FOREIGN KEY ("token_id") REFERENCES "nabla_token"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        )
        await db.query(
            `ALTER TABLE "swap_pool" ADD CONSTRAINT "FK_2f5409f002e18e4a6e2fddd8582" FOREIGN KEY ("router_id") REFERENCES "router"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        )
        await db.query(
            `ALTER TABLE "swap_pool" ADD CONSTRAINT "FK_5c3209a88e41d53bdc450605b3b" FOREIGN KEY ("backstop_id") REFERENCES "backstop_pool"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        )
        await db.query(
            `ALTER TABLE "swap_pool" ADD CONSTRAINT "FK_b66a5cc8d2ce7bba1b48fd8c1ab" FOREIGN KEY ("token_id") REFERENCES "nabla_token"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        )
        await db.query(
            `ALTER TABLE "nabla_swap" ADD CONSTRAINT "FK_78ad17aaf8e256aada35d50c95a" FOREIGN KEY ("token_in_id") REFERENCES "nabla_token"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        )
        await db.query(
            `ALTER TABLE "nabla_swap" ADD CONSTRAINT "FK_3ddf0d667a8f06da7f6ab50004f" FOREIGN KEY ("token_out_id") REFERENCES "nabla_token"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        )
        await db.query(
            `ALTER TABLE "nabla_swap" ADD CONSTRAINT "FK_dd24afed240ad46290bfcf0603b" FOREIGN KEY ("swap_fee_id") REFERENCES "nabla_swap_fee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        )
        await db.query(
            `ALTER TABLE "nabla_backstop_liquidity_deposit" ADD CONSTRAINT "FK_a3ce6e5ba78f5987919e7ee3467" FOREIGN KEY ("backstop_pool_id") REFERENCES "backstop_pool"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        )
        await db.query(
            `ALTER TABLE "nabla_swap_liquidity_deposit" ADD CONSTRAINT "FK_e0480f777845618674d1bbc3b18" FOREIGN KEY ("swap_pool_id") REFERENCES "swap_pool"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        )
        await db.query(
            `ALTER TABLE "nabla_backstop_liquidity_withdrawal" ADD CONSTRAINT "FK_33f15234263ac9c6d07fe5441f0" FOREIGN KEY ("backstop_pool_id") REFERENCES "backstop_pool"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        )
        await db.query(
            `ALTER TABLE "nabla_swap_liquidity_withdrawal" ADD CONSTRAINT "FK_ec313e0ceb8429cb76aa63ed746" FOREIGN KEY ("swap_pool_id") REFERENCES "swap_pool"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        )
        await db.query(
            `ALTER TABLE "issue_request" ADD CONSTRAINT "FK_62755a570447cc6fb07d57ec30e" FOREIGN KEY ("vault_id") REFERENCES "vault"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        )
        await db.query(
            `ALTER TABLE "redeem_request" ADD CONSTRAINT "FK_1b3c9ec8a5fa79b7af69bb30ad2" FOREIGN KEY ("vault_id") REFERENCES "vault"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        )
        await db.query(
            `ALTER TABLE "event" ADD CONSTRAINT "FK_2b0d35d675c4f99751855c45021" FOREIGN KEY ("block_id") REFERENCES "block"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        )
        await db.query(
            `ALTER TABLE "event" ADD CONSTRAINT "FK_129efedcb305c80256db2d57a59" FOREIGN KEY ("extrinsic_id") REFERENCES "extrinsic"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        )
        await db.query(
            `ALTER TABLE "event" ADD CONSTRAINT "FK_83cf1bd59aa4521ed882fa51452" FOREIGN KEY ("call_id") REFERENCES "call"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        )
        await db.query(
            `ALTER TABLE "call" ADD CONSTRAINT "FK_bd3f11fd4110d60ac8b96cd62f3" FOREIGN KEY ("block_id") REFERENCES "block"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        )
        await db.query(
            `ALTER TABLE "call" ADD CONSTRAINT "FK_dde30e4f2c6a80f9236bfdf2590" FOREIGN KEY ("extrinsic_id") REFERENCES "extrinsic"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        )
        await db.query(
            `ALTER TABLE "call" ADD CONSTRAINT "FK_11c1e76d5be8f04c472c4a05b95" FOREIGN KEY ("parent_id") REFERENCES "call"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        )
        await db.query(
            `ALTER TABLE "extrinsic" ADD CONSTRAINT "FK_a3b99daba1259dab0dd040d4f74" FOREIGN KEY ("block_id") REFERENCES "block"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        )
        await db.query(
            `ALTER TABLE "extrinsic" ADD CONSTRAINT "FK_824d47cc4b2cda726405aa507ca" FOREIGN KEY ("call_id") REFERENCES "call"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        )
    }

    async down(db) {
        await db.query(`DROP TABLE "oracle_price"`)
        await db.query(`DROP INDEX "public"."IDX_6554f47abd46667280a2523381"`)
        await db.query(`DROP INDEX "public"."IDX_2026224855490e321e5c0b6911"`)
        await db.query(`DROP INDEX "public"."IDX_a77ac6d79f0929522f5a1aefcb"`)
        await db.query(`DROP INDEX "public"."IDX_f7c9bf3bae39fb0a75f12b87dd"`)
        await db.query(`DROP TABLE "transfer"`)
        await db.query(`DROP INDEX "public"."IDX_d6624eacc30144ea97915fe846"`)
        await db.query(`DROP INDEX "public"."IDX_70ff8b624c3118ac3a4862d22c"`)
        await db.query(`DROP INDEX "public"."IDX_070c555a86b0b41a534a55a659"`)
        await db.query(`DROP INDEX "public"."IDX_f4007436c1b546ede08a4fd7ab"`)
        await db.query(`DROP TABLE "factory"`)
        await db.query(`DROP TABLE "stable_swap_event"`)
        await db.query(`DROP INDEX "public"."IDX_3a147c85b92441217540579be8"`)
        await db.query(`DROP TABLE "stable_swap_exchange"`)
        await db.query(`DROP INDEX "public"."IDX_1180a78feea28e278229de7db4"`)
        await db.query(`DROP TABLE "stable_swap_day_data"`)
        await db.query(`DROP INDEX "public"."IDX_648b49eb1a4f2a47f24f13bb51"`)
        await db.query(`DROP TABLE "stable_swap_hour_data"`)
        await db.query(`DROP INDEX "public"."IDX_94584d2925c30ae0d4b80aadfc"`)
        await db.query(`DROP TABLE "token_day_data"`)
        await db.query(`DROP INDEX "public"."IDX_b8950a8bc7b60231137573740e"`)
        await db.query(`DROP TABLE "pair_hour_data"`)
        await db.query(`DROP INDEX "public"."IDX_cf50c55389e428096a68598ee3"`)
        await db.query(`DROP TABLE "stable_swap_liquidity_position"`)
        await db.query(`DROP INDEX "public"."IDX_f953aebc7c0752f6b8434c9eef"`)
        await db.query(`DROP INDEX "public"."IDX_405e0d7aeca80975d88a63bc6e"`)
        await db.query(`DROP TABLE "stake_position"`)
        await db.query(`DROP INDEX "public"."IDX_2a2b22d2744b497bbcfb03e6ab"`)
        await db.query(`DROP INDEX "public"."IDX_670629d9904e1f48f4a31abb49"`)
        await db.query(`DROP TABLE "user"`)
        await db.query(`DROP TABLE "liquidity_position"`)
        await db.query(`DROP INDEX "public"."IDX_781470585a67fef4e215a59977"`)
        await db.query(`DROP INDEX "public"."IDX_5a626c8b8962dc01e0f8801be6"`)
        await db.query(`DROP TABLE "liquidity_position_snapshot"`)
        await db.query(`DROP INDEX "public"."IDX_eb823fd4d5a47575039e902efa"`)
        await db.query(`DROP INDEX "public"."IDX_ed32a41150bc13f18a01974153"`)
        await db.query(`DROP INDEX "public"."IDX_ce85a847b2952f7e685f150de1"`)
        await db.query(`DROP TABLE "transaction"`)
        await db.query(`DROP TABLE "mint"`)
        await db.query(`DROP INDEX "public"."IDX_19f4328320501dfd14e2bae085"`)
        await db.query(`DROP INDEX "public"."IDX_81d470127d4c55d09e9213bc4e"`)
        await db.query(`DROP TABLE "burn"`)
        await db.query(`DROP INDEX "public"."IDX_20ec76c5c56dd6b47dec5f0aaa"`)
        await db.query(`DROP INDEX "public"."IDX_ba144ce938b3266a470d4dd70f"`)
        await db.query(`DROP TABLE "swap"`)
        await db.query(`DROP INDEX "public"."IDX_78506c4050ae7cedd50b08c0dc"`)
        await db.query(`DROP INDEX "public"."IDX_3571ab1dad7640a6b93c705b8f"`)
        await db.query(`DROP TABLE "pair"`)
        await db.query(`DROP INDEX "public"."IDX_f74dc53460944a424b56b8f7da"`)
        await db.query(`DROP INDEX "public"."IDX_4419691fc411b8af754dfa65ce"`)
        await db.query(`DROP TABLE "pair_day_data"`)
        await db.query(`DROP INDEX "public"."IDX_d8ba7d7d7ad9f0e1c2933a0b7e"`)
        await db.query(`DROP INDEX "public"."IDX_88f6e19c40b47053e6e197db1c"`)
        await db.query(`DROP INDEX "public"."IDX_ce435d6fc7c373d58e7aab156d"`)
        await db.query(`DROP TABLE "token"`)
        await db.query(`DROP TABLE "single_token_lock_day_data"`)
        await db.query(`DROP INDEX "public"."IDX_f3bf64f43101176dbe5f11a36b"`)
        await db.query(`DROP TABLE "single_token_lock_hour_data"`)
        await db.query(`DROP INDEX "public"."IDX_b2a84dc625103153d651b701dd"`)
        await db.query(`DROP TABLE "single_token_lock"`)
        await db.query(`DROP INDEX "public"."IDX_8ebffe66457859d6e1c37b81ac"`)
        await db.query(`DROP TABLE "incentive"`)
        await db.query(`DROP INDEX "public"."IDX_35286137967591eaff8dee7ca2"`)
        await db.query(`DROP INDEX "public"."IDX_041db4166864a3841e5efed53c"`)
        await db.query(`DROP TABLE "farm"`)
        await db.query(`DROP INDEX "public"."IDX_679106a1febf251d7fe7fe081a"`)
        await db.query(`DROP INDEX "public"."IDX_00b8f5b860927b1b85e866b20d"`)
        await db.query(`DROP INDEX "public"."IDX_11da1bf5c406898262d91b41cb"`)
        await db.query(`DROP TABLE "stable_swap"`)
        await db.query(`DROP INDEX "public"."IDX_88cce14adee6d21f5057551c3e"`)
        await db.query(`DROP TABLE "stable_swap_info"`)
        await db.query(`DROP TABLE "zenlink_info"`)
        await db.query(`DROP INDEX "public"."IDX_9a6b55d2085464668b622dffe6"`)
        await db.query(`DROP INDEX "public"."IDX_0795adc3723792868094ec76c0"`)
        await db.query(`DROP TABLE "token_transfer"`)
        await db.query(`DROP INDEX "public"."IDX_b47f7192b72dd8436ef4e6d253"`)
        await db.query(`DROP INDEX "public"."IDX_752d6c330729a7b2e283003374"`)
        await db.query(`DROP INDEX "public"."IDX_2ef35b71d641ec79b7de3ac237"`)
        await db.query(`DROP INDEX "public"."IDX_aae50046f62ba400c07477fb6c"`)
        await db.query(`DROP TABLE "token_deposit"`)
        await db.query(`DROP INDEX "public"."IDX_395da815b9927f13e2f87c6b54"`)
        await db.query(`DROP INDEX "public"."IDX_0f87d313517eaa806c75444749"`)
        await db.query(`DROP INDEX "public"."IDX_7194acc3ea037189ff3da743ec"`)
        await db.query(`DROP INDEX "public"."IDX_d23ae7a0ea1f640e8e9875b3c2"`)
        await db.query(`DROP TABLE "token_withdrawn"`)
        await db.query(`DROP INDEX "public"."IDX_e7fd99cae9a1df2e8f69d60892"`)
        await db.query(`DROP INDEX "public"."IDX_70e98131fb737e4dce4455ca43"`)
        await db.query(`DROP INDEX "public"."IDX_867e6d004e7a4994b3b2aeba63"`)
        await db.query(`DROP INDEX "public"."IDX_5697bf049746e5102413ebd832"`)
        await db.query(`DROP TABLE "bundle"`)
        await db.query(`DROP TABLE "factory_day_data"`)
        await db.query(`DROP TABLE "stable_day_data"`)
        await db.query(`DROP TABLE "zenlink_day_info"`)
        await db.query(`DROP INDEX "public"."IDX_9f281ffbf4f668c1671ae24aeb"`)
        await db.query(`DROP INDEX "public"."IDX_3049b8ac70203e95dfc6b42c02"`)
        await db.query(`DROP TABLE "zlk_info"`)
        await db.query(`DROP TABLE "nabla_token"`)
        await db.query(`DROP TABLE "nabla_swap_fee"`)
        await db.query(`DROP INDEX "public"."IDX_208d304702d154e73e4f85c978"`)
        await db.query(`DROP INDEX "public"."IDX_86080eda96a6de9c3c60be41d8"`)
        await db.query(`DROP TABLE "backstop_pool"`)
        await db.query(`DROP INDEX "public"."IDX_13ef09b925620aedf12b3342ca"`)
        await db.query(`DROP INDEX "public"."IDX_8a7a25fa2d22ff634bd3041d81"`)
        await db.query(`DROP TABLE "swap_pool"`)
        await db.query(`DROP INDEX "public"."IDX_2f5409f002e18e4a6e2fddd858"`)
        await db.query(`DROP INDEX "public"."IDX_5c3209a88e41d53bdc450605b3"`)
        await db.query(`DROP INDEX "public"."IDX_b66a5cc8d2ce7bba1b48fd8c1a"`)
        await db.query(`DROP TABLE "router"`)
        await db.query(`DROP TABLE "nabla_swap"`)
        await db.query(`DROP INDEX "public"."IDX_78ad17aaf8e256aada35d50c95"`)
        await db.query(`DROP INDEX "public"."IDX_3ddf0d667a8f06da7f6ab50004"`)
        await db.query(`DROP INDEX "public"."IDX_dd24afed240ad46290bfcf0603"`)
        await db.query(`DROP TABLE "nabla_backstop_liquidity_deposit"`)
        await db.query(`DROP INDEX "public"."IDX_a3ce6e5ba78f5987919e7ee346"`)
        await db.query(`DROP TABLE "nabla_swap_liquidity_deposit"`)
        await db.query(`DROP INDEX "public"."IDX_e0480f777845618674d1bbc3b1"`)
        await db.query(`DROP TABLE "nabla_backstop_liquidity_withdrawal"`)
        await db.query(`DROP INDEX "public"."IDX_33f15234263ac9c6d07fe5441f"`)
        await db.query(`DROP TABLE "nabla_swap_liquidity_withdrawal"`)
        await db.query(`DROP INDEX "public"."IDX_ec313e0ceb8429cb76aa63ed74"`)
        await db.query(`DROP TABLE "vault"`)
        await db.query(`DROP TABLE "issue_request"`)
        await db.query(`DROP INDEX "public"."IDX_62755a570447cc6fb07d57ec30"`)
        await db.query(`DROP TABLE "redeem_request"`)
        await db.query(`DROP INDEX "public"."IDX_1b3c9ec8a5fa79b7af69bb30ad"`)
        await db.query(`DROP TABLE "event"`)
        await db.query(`DROP INDEX "public"."IDX_2b0d35d675c4f99751855c4502"`)
        await db.query(`DROP INDEX "public"."IDX_129efedcb305c80256db2d57a5"`)
        await db.query(`DROP INDEX "public"."IDX_83cf1bd59aa4521ed882fa5145"`)
        await db.query(`DROP INDEX "public"."IDX_7723d04c5a2f56c4373b6a4048"`)
        await db.query(`DROP INDEX "public"."IDX_b535fbe8ec6d832dde22065ebd"`)
        await db.query(`DROP INDEX "public"."IDX_0a00d817e614a91cda40d734cf"`)
        await db.query(`DROP TABLE "call"`)
        await db.query(`DROP INDEX "public"."IDX_bd3f11fd4110d60ac8b96cd62f"`)
        await db.query(`DROP INDEX "public"."IDX_dde30e4f2c6a80f9236bfdf259"`)
        await db.query(`DROP INDEX "public"."IDX_11c1e76d5be8f04c472c4a05b9"`)
        await db.query(`DROP INDEX "public"."IDX_d3a8c3d00494950ad6dc93297d"`)
        await db.query(`DROP INDEX "public"."IDX_776bccbd3d7b3001c8708cf4e0"`)
        await db.query(`DROP INDEX "public"."IDX_8b212022b7428232091e2f8aa5"`)
        await db.query(`DROP INDEX "public"."IDX_f1e953379e1b3c453cd896bcd4"`)
        await db.query(`DROP TABLE "extrinsic"`)
        await db.query(`DROP INDEX "public"."IDX_a3b99daba1259dab0dd040d4f7"`)
        await db.query(`DROP INDEX "public"."IDX_824d47cc4b2cda726405aa507c"`)
        await db.query(`DROP INDEX "public"."IDX_21e5db7671dfa1b00dbe6dbbd6"`)
        await db.query(`DROP INDEX "public"."IDX_1f45de0713a55049009e8e8127"`)
        await db.query(`DROP TABLE "block"`)
        await db.query(`DROP INDEX "public"."IDX_bce676e2b005104ccb768495db"`)
        await db.query(`DROP INDEX "public"."IDX_f8fba63d7965bfee9f304c487a"`)
        await db.query(`DROP INDEX "public"."IDX_5b79d140fa8e2c64a7ef223598"`)
        await db.query(`DROP INDEX "public"."IDX_5c67cbcf4960c1a39e5fe25e87"`)
        await db.query(`DROP INDEX "public"."IDX_b7e2f8fe1384a2910825029dcb"`)
        await db.query(`DROP TABLE "items_counter"`)
        await db.query(`DROP INDEX "public"."IDX_68d2eadecb3eeb540d2004acef"`)
        await db.query(`DROP INDEX "public"."IDX_1d9be1d79f197d42dd163f86c8"`)
        await db.query(`DROP INDEX "public"."IDX_e03dd1c60ac7622914f72ac2f1"`)
        await db.query(
            `ALTER TABLE "stable_swap_event" DROP CONSTRAINT "FK_3a147c85b92441217540579be88"`
        )
        await db.query(
            `ALTER TABLE "stable_swap_exchange" DROP CONSTRAINT "FK_1180a78feea28e278229de7db46"`
        )
        await db.query(
            `ALTER TABLE "stable_swap_day_data" DROP CONSTRAINT "FK_648b49eb1a4f2a47f24f13bb510"`
        )
        await db.query(
            `ALTER TABLE "stable_swap_hour_data" DROP CONSTRAINT "FK_94584d2925c30ae0d4b80aadfc8"`
        )
        await db.query(
            `ALTER TABLE "token_day_data" DROP CONSTRAINT "FK_b8950a8bc7b60231137573740ea"`
        )
        await db.query(
            `ALTER TABLE "pair_hour_data" DROP CONSTRAINT "FK_cf50c55389e428096a68598ee33"`
        )
        await db.query(
            `ALTER TABLE "stable_swap_liquidity_position" DROP CONSTRAINT "FK_f953aebc7c0752f6b8434c9eef8"`
        )
        await db.query(
            `ALTER TABLE "stable_swap_liquidity_position" DROP CONSTRAINT "FK_405e0d7aeca80975d88a63bc6ee"`
        )
        await db.query(
            `ALTER TABLE "stake_position" DROP CONSTRAINT "FK_2a2b22d2744b497bbcfb03e6ab0"`
        )
        await db.query(
            `ALTER TABLE "stake_position" DROP CONSTRAINT "FK_670629d9904e1f48f4a31abb495"`
        )
        await db.query(
            `ALTER TABLE "liquidity_position" DROP CONSTRAINT "FK_781470585a67fef4e215a599773"`
        )
        await db.query(
            `ALTER TABLE "liquidity_position" DROP CONSTRAINT "FK_5a626c8b8962dc01e0f8801be61"`
        )
        await db.query(
            `ALTER TABLE "liquidity_position_snapshot" DROP CONSTRAINT "FK_eb823fd4d5a47575039e902efa7"`
        )
        await db.query(
            `ALTER TABLE "liquidity_position_snapshot" DROP CONSTRAINT "FK_ed32a41150bc13f18a019741534"`
        )
        await db.query(
            `ALTER TABLE "liquidity_position_snapshot" DROP CONSTRAINT "FK_ce85a847b2952f7e685f150de1d"`
        )
        await db.query(
            `ALTER TABLE "mint" DROP CONSTRAINT "FK_19f4328320501dfd14e2bae0855"`
        )
        await db.query(
            `ALTER TABLE "mint" DROP CONSTRAINT "FK_81d470127d4c55d09e9213bc4e1"`
        )
        await db.query(
            `ALTER TABLE "burn" DROP CONSTRAINT "FK_20ec76c5c56dd6b47dec5f0aaa8"`
        )
        await db.query(
            `ALTER TABLE "burn" DROP CONSTRAINT "FK_ba144ce938b3266a470d4dd70fa"`
        )
        await db.query(
            `ALTER TABLE "swap" DROP CONSTRAINT "FK_78506c4050ae7cedd50b08c0dc5"`
        )
        await db.query(
            `ALTER TABLE "swap" DROP CONSTRAINT "FK_3571ab1dad7640a6b93c705b8f7"`
        )
        await db.query(
            `ALTER TABLE "pair" DROP CONSTRAINT "FK_f74dc53460944a424b56b8f7da5"`
        )
        await db.query(
            `ALTER TABLE "pair" DROP CONSTRAINT "FK_4419691fc411b8af754dfa65ce4"`
        )
        await db.query(
            `ALTER TABLE "pair_day_data" DROP CONSTRAINT "FK_d8ba7d7d7ad9f0e1c2933a0b7e2"`
        )
        await db.query(
            `ALTER TABLE "pair_day_data" DROP CONSTRAINT "FK_88f6e19c40b47053e6e197db1c9"`
        )
        await db.query(
            `ALTER TABLE "pair_day_data" DROP CONSTRAINT "FK_ce435d6fc7c373d58e7aab156d9"`
        )
        await db.query(
            `ALTER TABLE "single_token_lock_day_data" DROP CONSTRAINT "FK_f3bf64f43101176dbe5f11a36bd"`
        )
        await db.query(
            `ALTER TABLE "single_token_lock_hour_data" DROP CONSTRAINT "FK_b2a84dc625103153d651b701dd1"`
        )
        await db.query(
            `ALTER TABLE "single_token_lock" DROP CONSTRAINT "FK_8ebffe66457859d6e1c37b81ac3"`
        )
        await db.query(
            `ALTER TABLE "incentive" DROP CONSTRAINT "FK_35286137967591eaff8dee7ca2a"`
        )
        await db.query(
            `ALTER TABLE "incentive" DROP CONSTRAINT "FK_041db4166864a3841e5efed53c4"`
        )
        await db.query(
            `ALTER TABLE "farm" DROP CONSTRAINT "FK_679106a1febf251d7fe7fe081ad"`
        )
        await db.query(
            `ALTER TABLE "farm" DROP CONSTRAINT "FK_00b8f5b860927b1b85e866b20da"`
        )
        await db.query(
            `ALTER TABLE "farm" DROP CONSTRAINT "FK_11da1bf5c406898262d91b41cbb"`
        )
        await db.query(
            `ALTER TABLE "stable_swap" DROP CONSTRAINT "FK_88cce14adee6d21f5057551c3ea"`
        )
        await db.query(
            `ALTER TABLE "zenlink_info" DROP CONSTRAINT "FK_9a6b55d2085464668b622dffe64"`
        )
        await db.query(
            `ALTER TABLE "zenlink_info" DROP CONSTRAINT "FK_0795adc3723792868094ec76c07"`
        )
        await db.query(
            `ALTER TABLE "zenlink_day_info" DROP CONSTRAINT "FK_9f281ffbf4f668c1671ae24aeb0"`
        )
        await db.query(
            `ALTER TABLE "zenlink_day_info" DROP CONSTRAINT "FK_3049b8ac70203e95dfc6b42c027"`
        )
        await db.query(
            `ALTER TABLE "nabla_swap_fee" DROP CONSTRAINT "FK_208d304702d154e73e4f85c978b"`
        )
        await db.query(
            `ALTER TABLE "nabla_swap_fee" DROP CONSTRAINT "FK_86080eda96a6de9c3c60be41d86"`
        )
        await db.query(
            `ALTER TABLE "backstop_pool" DROP CONSTRAINT "FK_13ef09b925620aedf12b3342caa"`
        )
        await db.query(
            `ALTER TABLE "backstop_pool" DROP CONSTRAINT "FK_8a7a25fa2d22ff634bd3041d818"`
        )
        await db.query(
            `ALTER TABLE "swap_pool" DROP CONSTRAINT "FK_2f5409f002e18e4a6e2fddd8582"`
        )
        await db.query(
            `ALTER TABLE "swap_pool" DROP CONSTRAINT "FK_5c3209a88e41d53bdc450605b3b"`
        )
        await db.query(
            `ALTER TABLE "swap_pool" DROP CONSTRAINT "FK_b66a5cc8d2ce7bba1b48fd8c1ab"`
        )
        await db.query(
            `ALTER TABLE "nabla_swap" DROP CONSTRAINT "FK_78ad17aaf8e256aada35d50c95a"`
        )
        await db.query(
            `ALTER TABLE "nabla_swap" DROP CONSTRAINT "FK_3ddf0d667a8f06da7f6ab50004f"`
        )
        await db.query(
            `ALTER TABLE "nabla_swap" DROP CONSTRAINT "FK_dd24afed240ad46290bfcf0603b"`
        )
        await db.query(
            `ALTER TABLE "nabla_backstop_liquidity_deposit" DROP CONSTRAINT "FK_a3ce6e5ba78f5987919e7ee3467"`
        )
        await db.query(
            `ALTER TABLE "nabla_swap_liquidity_deposit" DROP CONSTRAINT "FK_e0480f777845618674d1bbc3b18"`
        )
        await db.query(
            `ALTER TABLE "nabla_backstop_liquidity_withdrawal" DROP CONSTRAINT "FK_33f15234263ac9c6d07fe5441f0"`
        )
        await db.query(
            `ALTER TABLE "nabla_swap_liquidity_withdrawal" DROP CONSTRAINT "FK_ec313e0ceb8429cb76aa63ed746"`
        )
        await db.query(
            `ALTER TABLE "issue_request" DROP CONSTRAINT "FK_62755a570447cc6fb07d57ec30e"`
        )
        await db.query(
            `ALTER TABLE "redeem_request" DROP CONSTRAINT "FK_1b3c9ec8a5fa79b7af69bb30ad2"`
        )
        await db.query(
            `ALTER TABLE "event" DROP CONSTRAINT "FK_2b0d35d675c4f99751855c45021"`
        )
        await db.query(
            `ALTER TABLE "event" DROP CONSTRAINT "FK_129efedcb305c80256db2d57a59"`
        )
        await db.query(
            `ALTER TABLE "event" DROP CONSTRAINT "FK_83cf1bd59aa4521ed882fa51452"`
        )
        await db.query(
            `ALTER TABLE "call" DROP CONSTRAINT "FK_bd3f11fd4110d60ac8b96cd62f3"`
        )
        await db.query(
            `ALTER TABLE "call" DROP CONSTRAINT "FK_dde30e4f2c6a80f9236bfdf2590"`
        )
        await db.query(
            `ALTER TABLE "call" DROP CONSTRAINT "FK_11c1e76d5be8f04c472c4a05b95"`
        )
        await db.query(
            `ALTER TABLE "extrinsic" DROP CONSTRAINT "FK_a3b99daba1259dab0dd040d4f74"`
        )
        await db.query(
            `ALTER TABLE "extrinsic" DROP CONSTRAINT "FK_824d47cc4b2cda726405aa507ca"`
        )
    }
}
