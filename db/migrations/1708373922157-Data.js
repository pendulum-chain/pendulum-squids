module.exports = class Data1708373922157 {
    name = 'Data1708373922157'

    async up(db) {
        await db.query(
            `ALTER TABLE "nabla_token" DROP CONSTRAINT "FK_03f6f92a4dd0116a68bd46ef66b"`
        )
        await db.query(`DROP INDEX "public"."IDX_03f6f92a4dd0116a68bd46ef66"`)
        await db.query(
            `ALTER TABLE "nabla_token" DROP COLUMN "latest_swap_pool_id"`
        )
        await db.query(`ALTER TABLE "swap_pool" DROP COLUMN "covered_index"`)
    }

    async down(db) {
        await db.query(
            `ALTER TABLE "nabla_token" ADD CONSTRAINT "FK_03f6f92a4dd0116a68bd46ef66b" FOREIGN KEY ("latest_swap_pool_id") REFERENCES "swap_pool"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        )
        await db.query(
            `CREATE INDEX "IDX_03f6f92a4dd0116a68bd46ef66" ON "nabla_token" ("latest_swap_pool_id") `
        )
        await db.query(
            `ALTER TABLE "nabla_token" ADD "latest_swap_pool_id" character varying`
        )
        await db.query(`ALTER TABLE "swap_pool" ADD "covered_index" numeric`)
    }
}
