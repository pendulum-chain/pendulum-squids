import {
    Entity as Entity_,
    Column as Column_,
    PrimaryColumn as PrimaryColumn_,
    BigIntColumn as BigIntColumn_,
    ManyToOne as ManyToOne_,
    Index as Index_,
    StringColumn as StringColumn_,
    IntColumn as IntColumn_,
} from '@subsquid/typeorm-store'
import { Pair } from './pair.model'

@Entity_()
export class PairHourData {
    constructor(props?: Partial<PairHourData>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @BigIntColumn_({ nullable: false })
    hourStartUnix!: bigint

    @Index_()
    @ManyToOne_(() => Pair, { nullable: true })
    pair!: Pair

    @StringColumn_({ nullable: false })
    reserve0!: string

    @StringColumn_({ nullable: false })
    reserve1!: string

    @StringColumn_({ nullable: false })
    totalSupply!: string

    @StringColumn_({ nullable: false })
    reserveUSD!: string

    @StringColumn_({ nullable: false })
    hourlyVolumeToken0!: string

    @StringColumn_({ nullable: false })
    hourlyVolumeToken1!: string

    @StringColumn_({ nullable: false })
    hourlyVolumeUSD!: string

    @IntColumn_({ nullable: false })
    hourlyTxns!: number
}
