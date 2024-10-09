import {
    Entity as Entity_,
    Column as Column_,
    PrimaryColumn as PrimaryColumn_,
    DateTimeColumn as DateTimeColumn_,
    StringColumn as StringColumn_,
    IntColumn as IntColumn_,
} from '@subsquid/typeorm-store'

@Entity_()
export class FactoryDayData {
    constructor(props?: Partial<FactoryDayData>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @DateTimeColumn_({ nullable: false })
    date!: Date

    @StringColumn_({ nullable: false })
    dailyVolumeETH!: string

    @StringColumn_({ nullable: false })
    dailyVolumeUSD!: string

    @StringColumn_({ nullable: false })
    dailyVolumeUntracked!: string

    @StringColumn_({ nullable: false })
    totalVolumeETH!: string

    @StringColumn_({ nullable: false })
    totalLiquidityETH!: string

    @StringColumn_({ nullable: false })
    totalVolumeUSD!: string

    @StringColumn_({ nullable: false })
    totalLiquidityUSD!: string

    @IntColumn_({ nullable: false })
    txCount!: number
}
