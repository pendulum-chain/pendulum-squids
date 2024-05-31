import {
    Entity as Entity_,
    Column as Column_,
    PrimaryColumn as PrimaryColumn_,
    ManyToOne as ManyToOne_,
    Index as Index_,
} from 'typeorm'
import * as marshal from './marshal'
import { SwapPool } from './swapPool.model'

@Entity_()
export class NablaSwapLiquidityWithdrawal {
    constructor(props?: Partial<NablaSwapLiquidityWithdrawal>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Column_('timestamp with time zone', { nullable: false })
    timestamp!: Date

    @Column_('text', { nullable: false })
    sender!: string

    @Column_('numeric', {
        transformer: marshal.bigintTransformer,
        nullable: false,
    })
    poolSharesBurned!: bigint

    @Column_('numeric', {
        transformer: marshal.bigintTransformer,
        nullable: false,
    })
    amountPoolTokensWithdrawn!: bigint

    @Index_()
    @ManyToOne_(() => SwapPool, { nullable: true })
    swapPool!: SwapPool
}
