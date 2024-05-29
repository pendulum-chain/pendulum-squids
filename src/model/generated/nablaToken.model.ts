import {
    Entity as Entity_,
    Column as Column_,
    PrimaryColumn as PrimaryColumn_,
    OneToMany as OneToMany_,
} from 'typeorm'
import { SwapPool } from './swapPool.model'

@Entity_()
export class NablaToken {
    constructor(props?: Partial<NablaToken>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Column_('int4', { nullable: false })
    decimals!: number

    @Column_('text', { nullable: false })
    name!: string

    @Column_('text', { nullable: false })
    symbol!: string

    @OneToMany_(() => SwapPool, (e) => e.token)
    swapPools!: SwapPool[]
}
