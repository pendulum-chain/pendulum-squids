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
export class NablaSwapLiquidityDeposit {
    constructor(props?: Partial<NablaSwapLiquidityDeposit>) {
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
    poolSharesMinted!: bigint

    @Column_('numeric', {
        transformer: marshal.bigintTransformer,
        nullable: false,
    })
    amountPoolTokensDeposited!: bigint

    @Index_()
    @ManyToOne_(() => SwapPool, { nullable: true })
    swapPool!: SwapPool
}
