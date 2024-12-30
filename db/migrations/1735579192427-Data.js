module.exports = class Data1735579192427 {
    name = 'Data1735579192427'

    async up(db) {
        await db.query(`ALTER TABLE "points" DROP COLUMN "points"`)
        await db.query(`ALTER TABLE "points" ADD "points_swap" text NOT NULL`)
        await db.query(
            `ALTER TABLE "points" ADD "points_lp_swap" text NOT NULL`
        )
        await db.query(
            `ALTER TABLE "points" ADD "points_lp_backstop" text NOT NULL`
        )
    }

    async down(db) {
        await db.query(`ALTER TABLE "points" ADD "points" text NOT NULL`)
        await db.query(`ALTER TABLE "points" DROP COLUMN "points_swap"`)
        await db.query(`ALTER TABLE "points" DROP COLUMN "points_lp_swap"`)
        await db.query(`ALTER TABLE "points" DROP COLUMN "points_lp_backstop"`)
    }
}
