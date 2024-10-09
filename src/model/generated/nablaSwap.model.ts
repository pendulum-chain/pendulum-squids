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
import { NablaToken } from './nablaToken.model'
import { NablaSwapFee } from './nablaSwapFee.model'

@Entity_()
export class NablaSwap {
    constructor(props?: Partial<NablaSwap>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @DateTimeColumn_({ nullable: false })
    timestamp!: Date

    @StringColumn_({ nullable: false })
    sender!: string

    @BigIntColumn_({ nullable: false })
    amountIn!: bigint

    @BigIntColumn_({ nullable: false })
    amountOut!: bigint

    @Index_()
    @ManyToOne_(() => NablaToken, { nullable: true })
    tokenIn!: NablaToken

    @Index_()
    @ManyToOne_(() => NablaToken, { nullable: true })
    tokenOut!: NablaToken

    @StringColumn_({ nullable: false })
    to!: string

    @Index_()
    @ManyToOne_(() => NablaSwapFee, { nullable: true })
    swapFee!: NablaSwapFee | undefined | null
}
