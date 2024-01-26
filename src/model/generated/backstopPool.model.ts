import {
    Entity as Entity_,
    Column as Column_,
    PrimaryColumn as PrimaryColumn_,
    OneToOne as OneToOne_,
    Index as Index_,
    JoinColumn as JoinColumn_,
    ManyToOne as ManyToOne_,
} from 'typeorm'
import * as marshal from './marshal'
import { Router } from './router.model'
import { NablaToken } from './nablaToken.model'

@Entity_()
export class BackstopPool {
    constructor(props?: Partial<BackstopPool>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_({ unique: true })
    @OneToOne_(() => Router, { nullable: true })
    @JoinColumn_()
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
}
