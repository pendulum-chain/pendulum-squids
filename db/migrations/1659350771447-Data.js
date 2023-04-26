module.exports = class Data1659350771447 {
    name = 'Data1659350771447'

    async up(db) {
        await db.query(
            `CREATE TABLE "transfer" ("id" character varying NOT NULL, "block_number" integer NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "extrinsic_hash" text, "amount" numeric NOT NULL, "fee" numeric, "from" character varying, "to" character varying, CONSTRAINT "PK_fd9ddbdd49a17afcbe014401295" PRIMARY KEY ("id"))`
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
            `CREATE INDEX "IDX_76bdfed1a7eb27c6d8ecbb7349" ON "transfer" ("from") `
        )
        await db.query(
            `CREATE INDEX "IDX_0751309c66e97eac9ef1149362" ON "transfer" ("to") `
        )
        await db.query(
            `CREATE INDEX "IDX_f4007436c1b546ede08a4fd7ab" ON "transfer" ("amount") `
        )
        await db.query(
            `CREATE TABLE "account" ("id" character varying NOT NULL, CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`
        )

        // Zenlink
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
    }

    async down(db) {
        await db.query(`DROP TABLE "transfer"`)
        await db.query(`DROP INDEX "public"."IDX_d6624eacc30144ea97915fe846"`)
        await db.query(`DROP INDEX "public"."IDX_70ff8b624c3118ac3a4862d22c"`)
        await db.query(`DROP INDEX "public"."IDX_070c555a86b0b41a534a55a659"`)
        await db.query(`DROP INDEX "public"."IDX_76bdfed1a7eb27c6d8ecbb7349"`)
        await db.query(`DROP INDEX "public"."IDX_0751309c66e97eac9ef1149362"`)
        await db.query(`DROP INDEX "public"."IDX_f4007436c1b546ede08a4fd7ab"`)
        await db.query(`DROP TABLE "account"`)
        await db.query(
            `ALTER TABLE "transfer" DROP CONSTRAINT "FK_76bdfed1a7eb27c6d8ecbb73496"`
        )
        await db.query(
            `ALTER TABLE "transfer" DROP CONSTRAINT "FK_0751309c66e97eac9ef11493623"`
        )

        // Zenlink
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
        await db.query(`DROP TABLE "bundle"`)
        await db.query(`DROP TABLE "factory_day_data"`)
        await db.query(`DROP TABLE "stable_day_data"`)
        await db.query(`DROP TABLE "zenlink_day_info"`)
        await db.query(`DROP INDEX "public"."IDX_9f281ffbf4f668c1671ae24aeb"`)
        await db.query(`DROP INDEX "public"."IDX_3049b8ac70203e95dfc6b42c02"`)
        await db.query(`DROP TABLE "zlk_info"`)
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
    }
}
