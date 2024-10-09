import {
    Entity as Entity_,
    Column as Column_,
    PrimaryColumn as PrimaryColumn_,
    StringColumn as StringColumn_,
    Index as Index_,
    BigIntColumn as BigIntColumn_,
    IntColumn as IntColumn_,
} from '@subsquid/typeorm-store'

@Entity_()
export class OraclePrice {
    constructor(props?: Partial<OraclePrice>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @StringColumn_({ nullable: false })
    symbol!: string

    @StringColumn_({ nullable: false })
    name!: string

    @Index_()
    @StringColumn_({ nullable: false })
    blockchain!: string

    @Index_()
    @BigIntColumn_({ nullable: false })
    timestamp!: bigint

    /**
     * BigDecimal
     */
    @Index_()
    @StringColumn_({ nullable: false })
    price!: string

    /**
     * BigDecimal
     */
    @StringColumn_({ nullable: false })
    supply!: string

    @IntColumn_({ nullable: false })
    decimals!: number
}
