import {
    Entity as Entity_,
    Column as Column_,
    PrimaryColumn as PrimaryColumn_,
    DateTimeColumn as DateTimeColumn_,
    BigIntColumn as BigIntColumn_,
} from '@subsquid/typeorm-store'

@Entity_()
export class ZLKInfo {
    constructor(props?: Partial<ZLKInfo>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @DateTimeColumn_({ nullable: false })
    updatedDate!: Date

    @BigIntColumn_({ nullable: false })
    burn!: bigint
}
