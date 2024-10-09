import {
    Entity as Entity_,
    Column as Column_,
    PrimaryColumn as PrimaryColumn_,
    ManyToOne as ManyToOne_,
    Index as Index_,
    DateTimeColumn as DateTimeColumn_,
    StringColumn as StringColumn_,
    IntColumn as IntColumn_,
    BooleanColumn as BooleanColumn_,
} from '@subsquid/typeorm-store'
import { Transaction } from './transaction.model'
import { Pair } from './pair.model'

@Entity_()
export class Burn {
    constructor(props?: Partial<Burn>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @ManyToOne_(() => Transaction, { nullable: true })
    transaction!: Transaction

    @DateTimeColumn_({ nullable: false })
    timestamp!: Date

    @Index_()
    @ManyToOne_(() => Pair, { nullable: true })
    pair!: Pair

    @StringColumn_({ nullable: false })
    liquidity!: string

    @StringColumn_({ nullable: true })
    sender!: string | undefined | null

    @StringColumn_({ nullable: true })
    amount0!: string | undefined | null

    @StringColumn_({ nullable: true })
    amount1!: string | undefined | null

    @StringColumn_({ nullable: true })
    to!: string | undefined | null

    @IntColumn_({ nullable: true })
    logIndex!: number | undefined | null

    @StringColumn_({ nullable: true })
    amountUSD!: string | undefined | null

    @BooleanColumn_({ nullable: false })
    needsComplete!: boolean

    @StringColumn_({ nullable: true })
    feeTo!: string | undefined | null

    @StringColumn_({ nullable: true })
    feeLiquidity!: string | undefined | null
}
