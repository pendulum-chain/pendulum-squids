import {
    Entity as Entity_,
    Column as Column_,
    PrimaryColumn as PrimaryColumn_,
    DateTimeColumn as DateTimeColumn_,
    ManyToOne as ManyToOne_,
    Index as Index_,
    StringColumn as StringColumn_,
} from '@subsquid/typeorm-store'
import { StableSwap } from './stableSwap.model'

@Entity_()
export class StableSwapDayData {
    constructor(props?: Partial<StableSwapDayData>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @DateTimeColumn_({ nullable: false })
    date!: Date

    @Index_()
    @ManyToOne_(() => StableSwap, { nullable: true })
    stableSwap!: StableSwap

    @StringColumn_({ nullable: false })
    dailyVolumeUSD!: string

    @StringColumn_({ nullable: false })
    tvlUSD!: string
}
