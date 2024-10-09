import {
    Entity as Entity_,
    Column as Column_,
    PrimaryColumn as PrimaryColumn_,
    DateTimeColumn as DateTimeColumn_,
    StringColumn as StringColumn_,
    ManyToOne as ManyToOne_,
    Index as Index_,
    IntColumn as IntColumn_,
} from '@subsquid/typeorm-store'
import { Pair } from './pair.model'
import { Token } from './token.model'

@Entity_()
export class PairDayData {
    constructor(props?: Partial<PairDayData>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @DateTimeColumn_({ nullable: false })
    date!: Date

    @StringColumn_({ nullable: false })
    pairAddress!: string

    @Index_()
    @ManyToOne_(() => Pair, { nullable: true })
    pair!: Pair

    @Index_()
    @ManyToOne_(() => Token, { nullable: true })
    token0!: Token

    @Index_()
    @ManyToOne_(() => Token, { nullable: true })
    token1!: Token

    @StringColumn_({ nullable: false })
    reserve0!: string

    @StringColumn_({ nullable: false })
    reserve1!: string

    @StringColumn_({ nullable: false })
    totalSupply!: string

    @StringColumn_({ nullable: false })
    reserveUSD!: string

    @StringColumn_({ nullable: false })
    dailyVolumeToken0!: string

    @StringColumn_({ nullable: false })
    dailyVolumeToken1!: string

    @StringColumn_({ nullable: false })
    dailyVolumeUSD!: string

    @IntColumn_({ nullable: false })
    dailyTxns!: number
}
