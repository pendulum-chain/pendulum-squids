import {
    Entity as Entity_,
    Column as Column_,
    PrimaryColumn as PrimaryColumn_,
    IntColumn as IntColumn_,
    Index as Index_,
    DateTimeColumn as DateTimeColumn_,
    StringColumn as StringColumn_,
    BigIntColumn as BigIntColumn_,
} from '@subsquid/typeorm-store'

@Entity_()
export class TokenTransfer {
    constructor(props?: Partial<TokenTransfer>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @IntColumn_({ nullable: false })
    blockNumber!: number

    @Index_()
    @DateTimeColumn_({ nullable: false })
    timestamp!: Date

    @Index_()
    @StringColumn_({ nullable: true })
    extrinsicHash!: string | undefined | null

    @StringColumn_({ nullable: false })
    from!: string

    @StringColumn_({ nullable: false })
    to!: string

    @StringColumn_({ nullable: false })
    currencyId!: string

    @Index_()
    @BigIntColumn_({ nullable: false })
    amount!: bigint

    @StringColumn_({ nullable: true })
    remark!: string | undefined | null
}
