import {
    Entity as Entity_,
    Column as Column_,
    PrimaryColumn as PrimaryColumn_,
    BigIntColumn as BigIntColumn_,
    ManyToOne as ManyToOne_,
    Index as Index_,
} from '@subsquid/typeorm-store'
import { SwapPool } from './swapPool.model'
import { BackstopPool } from './backstopPool.model'

@Entity_()
export class NablaSwapFee {
    constructor(props?: Partial<NablaSwapFee>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @BigIntColumn_({ nullable: false })
    lpFees!: bigint

    @BigIntColumn_({ nullable: false })
    backstopFees!: bigint

    @BigIntColumn_({ nullable: false })
    protocolFees!: bigint

    @BigIntColumn_({ nullable: false })
    timestamp!: bigint

    @Index_()
    @ManyToOne_(() => SwapPool, { nullable: true })
    swapPool!: SwapPool

    @Index_()
    @ManyToOne_(() => BackstopPool, { nullable: true })
    backstopPool!: BackstopPool | undefined | null
}
