import {
    Entity as Entity_,
    Column as Column_,
    PrimaryColumn as PrimaryColumn_,
    ManyToOne as ManyToOne_,
    Index as Index_,
} from 'typeorm'
import * as marshal from './marshal'
import { NablaToken } from './nablaToken.model'
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

    @Index_()
    @ManyToOne_(() => NablaToken, { nullable: true })
    tokenIn!: NablaToken

    @Index_()
    @ManyToOne_(() => NablaToken, { nullable: true })
    tokenOut!: NablaToken

    @Column_('text', { nullable: false })
    to!: string

    @Index_()
    @ManyToOne_(() => NablaSwapFee, { nullable: true })
    swapFee!: NablaSwapFee | undefined | null
}
