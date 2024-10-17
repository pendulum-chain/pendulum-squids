import {
    Entity as Entity_,
    Column as Column_,
    PrimaryColumn as PrimaryColumn_,
    BigIntColumn as BigIntColumn_,
} from '@subsquid/typeorm-store'

@Entity_()
export class Points {
    constructor(props?: Partial<Points>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @BigIntColumn_({ nullable: false })
    points!: bigint
}
