import {
    Entity as Entity_,
    Column as Column_,
    PrimaryColumn as PrimaryColumn_,
    BigIntColumn as BigIntColumn_,
    DateTimeColumn as DateTimeColumn_,
    StringColumn as StringColumn_,
} from '@subsquid/typeorm-store'

@Entity_()
export class Transaction {
    constructor(props?: Partial<Transaction>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @BigIntColumn_({ nullable: false })
    blockNumber!: bigint

    @DateTimeColumn_({ nullable: false })
    timestamp!: Date

    @StringColumn_({ array: true, nullable: false })
    mints!: string[]

    @StringColumn_({ array: true, nullable: false })
    burns!: string[]

    @StringColumn_({ array: true, nullable: false })
    swaps!: string[]
}
