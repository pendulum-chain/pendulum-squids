import {
    Entity as Entity_,
    Column as Column_,
    PrimaryColumn as PrimaryColumn_,
    ManyToOne as ManyToOne_,
    Index as Index_,
    OneToMany as OneToMany_,
} from 'typeorm'
import * as marshal from './marshal'
import { Router } from './router.model'
import { BackstopPool } from './backstopPool.model'
import { NablaToken } from './nablaToken.model'
import { NablaSwapFee } from './nablaSwapFee.model'

@Entity_()
export class SwapPool {
    constructor(props?: Partial<SwapPool>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Column_('text', { nullable: false })
    name!: string

    @Column_('text', { nullable: false })
    symbol!: string

    @Index_()
    @ManyToOne_(() => Router, { nullable: true })
    router!: Router | undefined | null

    @Index_()
    @ManyToOne_(() => BackstopPool, { nullable: true })
    backstop!: BackstopPool

    @Index_()
    @ManyToOne_(() => NablaToken, { nullable: true })
    token!: NablaToken

    @Column_('numeric', {
        transformer: marshal.bigintTransformer,
        nullable: false,
    })
    reserve!: bigint

    @Column_('numeric', {
        transformer: marshal.bigintTransformer,
        nullable: false,
    })
    reserveWithSlippage!: bigint

    @Column_('numeric', {
        transformer: marshal.bigintTransformer,
        nullable: false,
    })
    totalLiabilities!: bigint

    @Column_('numeric', {
        transformer: marshal.bigintTransformer,
        nullable: false,
    })
    totalSupply!: bigint

    @Column_('bool', { nullable: false })
    paused!: boolean

    @OneToMany_(() => NablaSwapFee, (e) => e.swapPool)
    feesHistory!: NablaSwapFee[]

    @Column_('numeric', {
        transformer: marshal.bigintTransformer,
        nullable: false,
    })
    apr!: bigint

    @Column_('numeric', {
        transformer: marshal.bigintTransformer,
        nullable: true,
    })
    coveredIndex!: bigint | undefined | null
}
