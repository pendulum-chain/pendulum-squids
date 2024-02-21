module.exports = class Data1708525160246 {
    name = 'Data1708525160246'

    async up(db) {
        await db.query(
            `ALTER TABLE "backstop_pool" ADD "lp_token_decimals" integer NOT NULL`
        )
        await db.query(
            `ALTER TABLE "swap_pool" ADD "lp_token_decimals" integer NOT NULL`
        )
    }

    async down(db) {
        await db.query(
            `ALTER TABLE "backstop_pool" DROP COLUMN "lp_token_decimals"`
        )
        await db.query(
            `ALTER TABLE "swap_pool" DROP COLUMN "lp_token_decimals"`
        )
    }
}
