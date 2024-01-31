import {
    Entity as Entity_,
    Column as Column_,
    PrimaryColumn as PrimaryColumn_,
    ManyToOne as ManyToOne_,
    Index as Index_,
} from 'typeorm'
import * as marshal from './marshal'
import { SwapPool } from './swapPool.model'
import { BackstopPool } from './backstopPool.model'

@Entity_()
export class NablaSwapFee {
    constructor(props?: Partial<NablaSwapFee>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Column_('numeric', {
        transformer: marshal.bigintTransformer,
        nullable: false,
    })
    lpFees!: bigint

    @Column_('numeric', {
        transformer: marshal.bigintTransformer,
        nullable: false,
    })
    backstopFees!: bigint

    @Column_('numeric', {
        transformer: marshal.bigintTransformer,
        nullable: false,
    })
    protocolFees!: bigint

    @Column_('numeric', {
        transformer: marshal.bigintTransformer,
        nullable: false,
    })
    timestamp!: bigint

    @Index_()
    @ManyToOne_(() => SwapPool, { nullable: true })
    swapPool!: SwapPool

    @Index_()
    @ManyToOne_(() => BackstopPool, { nullable: true })
    backstopPool!: BackstopPool | undefined | null
}
