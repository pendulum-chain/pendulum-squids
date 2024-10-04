import {
    Entity as Entity_,
    Column as Column_,
    PrimaryColumn as PrimaryColumn_,
    DateTimeColumn as DateTimeColumn_,
    ManyToOne as ManyToOne_,
    Index as Index_,
    StringColumn as StringColumn_,
} from '@subsquid/typeorm-store'
import { FactoryDayData } from './factoryDayData.model'
import { StableSwapDayData } from './stableSwapDayData.model'

@Entity_()
export class ZenlinkDayInfo {
    constructor(props?: Partial<ZenlinkDayInfo>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @DateTimeColumn_({ nullable: false })
    date!: Date

    @Index_()
    @ManyToOne_(() => FactoryDayData, { nullable: true })
    standardInfo!: FactoryDayData

    @Index_()
    @ManyToOne_(() => StableSwapDayData, { nullable: true })
    stableInfo!: StableSwapDayData

    @StringColumn_({ nullable: false })
    dailyVolumeUSD!: string

    @StringColumn_({ nullable: false })
    tvlUSD!: string
}
