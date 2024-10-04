import {
    Entity as Entity_,
    Column as Column_,
    PrimaryColumn as PrimaryColumn_,
    DateTimeColumn as DateTimeColumn_,
    StringColumn as StringColumn_,
} from '@subsquid/typeorm-store'

@Entity_()
export class StableDayData {
    constructor(props?: Partial<StableDayData>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @DateTimeColumn_({ nullable: false })
    date!: Date

    @StringColumn_({ nullable: false })
    dailyVolumeUSD!: string

    @StringColumn_({ nullable: false })
    tvlUSD!: string
}
