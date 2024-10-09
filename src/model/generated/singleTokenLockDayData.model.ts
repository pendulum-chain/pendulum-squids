import {
    Entity as Entity_,
    Column as Column_,
    PrimaryColumn as PrimaryColumn_,
    ManyToOne as ManyToOne_,
    Index as Index_,
    DateTimeColumn as DateTimeColumn_,
    StringColumn as StringColumn_,
} from '@subsquid/typeorm-store'
import { SingleTokenLock } from './singleTokenLock.model'

@Entity_()
export class SingleTokenLockDayData {
    constructor(props?: Partial<SingleTokenLockDayData>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @ManyToOne_(() => SingleTokenLock, { nullable: true })
    singleTokenLock!: SingleTokenLock

    @DateTimeColumn_({ nullable: false })
    date!: Date

    @StringColumn_({ nullable: false })
    totalLiquidity!: string

    @StringColumn_({ nullable: false })
    totalLiquidityUSD!: string

    @StringColumn_({ nullable: false })
    totalLiquidityETH!: string
}
