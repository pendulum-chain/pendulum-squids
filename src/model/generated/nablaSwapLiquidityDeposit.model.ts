import {
    Entity as Entity_,
    Column as Column_,
    PrimaryColumn as PrimaryColumn_,
    DateTimeColumn as DateTimeColumn_,
    StringColumn as StringColumn_,
    BigIntColumn as BigIntColumn_,
    ManyToOne as ManyToOne_,
    Index as Index_,
} from '@subsquid/typeorm-store'
import { SwapPool } from './swapPool.model'

@Entity_()
export class NablaSwapLiquidityDeposit {
    constructor(props?: Partial<NablaSwapLiquidityDeposit>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @DateTimeColumn_({ nullable: false })
    timestamp!: Date

    @StringColumn_({ nullable: false })
    sender!: string

    @BigIntColumn_({ nullable: false })
    poolSharesMinted!: bigint

    @BigIntColumn_({ nullable: false })
    amountPoolTokensDeposited!: bigint

    @Index_()
    @ManyToOne_(() => SwapPool, { nullable: true })
    swapPool!: SwapPool
}
