import {
    Entity as Entity_,
    Column as Column_,
    PrimaryColumn as PrimaryColumn_,
    ManyToOne as ManyToOne_,
    Index as Index_,
} from 'typeorm'
import * as marshal from './marshal'
import { Router } from './router.model'
import { BackstopPool } from './backstopPool.model'
import { NablaToken } from './nablaToken.model'

@Entity_()
export class SwapPool {
    constructor(props?: Partial<SwapPool>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @ManyToOne_(() => Router, { nullable: true })
    router!: Router

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
}
