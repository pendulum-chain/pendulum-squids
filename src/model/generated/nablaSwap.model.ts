import {
    Entity as Entity_,
    Column as Column_,
    PrimaryColumn as PrimaryColumn_,
    ManyToOne as ManyToOne_,
    Index as Index_,
} from 'typeorm'
import * as marshal from './marshal'
import { NablaSwapFee } from './nablaSwapFee.model'

@Entity_()
export class NablaSwap {
    constructor(props?: Partial<NablaSwap>) {
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
    amountIn!: bigint

    @Column_('numeric', {
        transformer: marshal.bigintTransformer,
        nullable: false,
    })
    amountOut!: bigint

    @Column_('text', { nullable: false })
    tokenIn!: string

    @Column_('text', { nullable: false })
    tokenOut!: string

    @Column_('text', { nullable: false })
    to!: string

    @Index_()
    @ManyToOne_(() => NablaSwapFee, { nullable: true })
    swapFee!: NablaSwapFee
}
