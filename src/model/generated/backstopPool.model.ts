import {
    Entity as Entity_,
    Column as Column_,
    PrimaryColumn as PrimaryColumn_,
    ManyToOne as ManyToOne_,
    Index as Index_,
} from 'typeorm'
import * as marshal from './marshal'
import { Router } from './router.model'
import { Token } from './token.model'

@Entity_()
export class BackstopPool {
    constructor(props?: Partial<BackstopPool>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @ManyToOne_(() => Router, { nullable: true })
    router!: Router

    @Index_()
    @ManyToOne_(() => Token, { nullable: true })
    token!: Token

    @Column_('numeric', {
        transformer: marshal.bigintTransformer,
        nullable: false,
    })
    reserves!: bigint

    @Column_('numeric', {
        transformer: marshal.bigintTransformer,
        nullable: false,
    })
    liabilities!: bigint

    @Column_('numeric', {
        transformer: marshal.bigintTransformer,
        nullable: false,
    })
    totalSupply!: bigint

    @Column_('bool', { nullable: false })
    paused!: boolean
}
