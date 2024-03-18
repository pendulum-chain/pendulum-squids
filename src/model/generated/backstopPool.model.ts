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
import { NablaToken } from './nablaToken.model'
import { SwapPool } from './swapPool.model'
import { NablaSwapFee } from './nablaSwapFee.model'

@Entity_()
export class BackstopPool {
    constructor(props?: Partial<BackstopPool>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Column_('text', { nullable: false })
    name!: string

    @Column_('text', { nullable: false })
    symbol!: string

    @Column_('int4', { nullable: false })
    lpTokenDecimals!: number

    @Index_()
    @ManyToOne_(() => Router, { nullable: true })
    router!: Router

    @Index_()
    @ManyToOne_(() => NablaToken, { nullable: true })
    token!: NablaToken

    @Column_('numeric', {
        transformer: marshal.bigintTransformer,
        nullable: false,
    })
    reserves!: bigint

    @Column_('numeric', {
        transformer: marshal.bigintTransformer,
        nullable: false,
    })
    totalSupply!: bigint

    @Column_('bool', { nullable: false })
    paused!: boolean

    @OneToMany_(() => SwapPool, (e) => e.backstop)
    coveredSwapPools!: SwapPool[]

    @OneToMany_(() => NablaSwapFee, (e) => e.backstopPool)
    feesHistory!: NablaSwapFee[]

    @Column_('numeric', {
        transformer: marshal.bigintTransformer,
        nullable: false,
    })
    apr!: bigint
}
