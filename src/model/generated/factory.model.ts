import {
    Entity as Entity_,
    Column as Column_,
    PrimaryColumn as PrimaryColumn_,
    IntColumn as IntColumn_,
    StringColumn as StringColumn_,
} from '@subsquid/typeorm-store'

@Entity_()
export class Factory {
    constructor(props?: Partial<Factory>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @IntColumn_({ nullable: false })
    pairCount!: number

    /**
     * BigDecimal
     */
    @StringColumn_({ nullable: false })
    totalVolumeUSD!: string

    /**
     * BigDecimal
     */
    @StringColumn_({ nullable: false })
    totalVolumeETH!: string

    /**
     * BigDecimal
     */
    @StringColumn_({ nullable: false })
    untrackedVolumeUSD!: string

    /**
     * BigDecimal
     */
    @StringColumn_({ nullable: false })
    totalLiquidityUSD!: string

    /**
     * BigDecimal
     */
    @StringColumn_({ nullable: false })
    totalLiquidityETH!: string

    @IntColumn_({ nullable: false })
    txCount!: number
}
