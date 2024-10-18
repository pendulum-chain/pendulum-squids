module.exports = class Data1729193177882 {
    name = 'Data1729193177882'

    async up(db) {
        await db.query(
            `CREATE TABLE "points" ("id" character varying NOT NULL, "points" numeric NOT NULL, CONSTRAINT "PK_57a558e5e1e17668324b165dadf" PRIMARY KEY ("id"))`
        )
    }

    async down(db) {
        await db.query(`DROP TABLE "points"`)
    }
}
