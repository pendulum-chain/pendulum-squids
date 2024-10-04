import {
    Entity as Entity_,
    Column as Column_,
    PrimaryColumn as PrimaryColumn_,
    ManyToOne as ManyToOne_,
    Index as Index_,
    DateTimeColumn as DateTimeColumn_,
    StringColumn as StringColumn_,
    IntColumn as IntColumn_,
} from '@subsquid/typeorm-store'
import { Transaction } from './transaction.model'
import { Pair } from './pair.model'

@Entity_()
export class Swap {
    constructor(props?: Partial<Swap>) {
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
    sender!: string

    @StringColumn_({ nullable: false })
    from!: string

    @StringColumn_({ nullable: false })
    amount0In!: string

    @StringColumn_({ nullable: false })
    amount1In!: string

    @StringColumn_({ nullable: false })
    amount0Out!: string

    @StringColumn_({ nullable: false })
    amount1Out!: string

    @StringColumn_({ nullable: false })
    to!: string

    @IntColumn_({ nullable: true })
    logIndex!: number | undefined | null

    @StringColumn_({ nullable: false })
    amountUSD!: string
}
