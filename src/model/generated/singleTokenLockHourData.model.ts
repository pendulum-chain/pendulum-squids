import {
    Entity as Entity_,
    Column as Column_,
    PrimaryColumn as PrimaryColumn_,
    BigIntColumn as BigIntColumn_,
    ManyToOne as ManyToOne_,
    Index as Index_,
    StringColumn as StringColumn_,
} from '@subsquid/typeorm-store'
import { SingleTokenLock } from './singleTokenLock.model'

@Entity_()
export class SingleTokenLockHourData {
    constructor(props?: Partial<SingleTokenLockHourData>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @BigIntColumn_({ nullable: false })
    hourStartUnix!: bigint

    @Index_()
    @ManyToOne_(() => SingleTokenLock, { nullable: true })
    singleTokenLock!: SingleTokenLock

    @StringColumn_({ nullable: false })
    totalLiquidity!: string

    @StringColumn_({ nullable: false })
    totalLiquidityUSD!: string

    @StringColumn_({ nullable: false })
    totalLiquidityETH!: string
}
