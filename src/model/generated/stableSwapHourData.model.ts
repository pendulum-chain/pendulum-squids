import {
    Entity as Entity_,
    Column as Column_,
    PrimaryColumn as PrimaryColumn_,
    BigIntColumn as BigIntColumn_,
    ManyToOne as ManyToOne_,
    Index as Index_,
    StringColumn as StringColumn_,
} from '@subsquid/typeorm-store'
import { StableSwap } from './stableSwap.model'

@Entity_()
export class StableSwapHourData {
    constructor(props?: Partial<StableSwapHourData>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @BigIntColumn_({ nullable: false })
    hourStartUnix!: bigint

    @Index_()
    @ManyToOne_(() => StableSwap, { nullable: true })
    stableSwap!: StableSwap

    @StringColumn_({ nullable: false })
    hourlyVolumeUSD!: string

    @StringColumn_({ nullable: false })
    tvlUSD!: string
}
