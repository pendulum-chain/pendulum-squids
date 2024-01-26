import {
    Entity as Entity_,
    Column as Column_,
    PrimaryColumn as PrimaryColumn_,
    OneToMany as OneToMany_,
} from 'typeorm'
import { SwapPool } from './swapPool.model'
import { BackstopPool } from './backstopPool.model'

@Entity_()
export class Router {
    constructor(props?: Partial<Router>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @OneToMany_(() => SwapPool, (e) => e.router)
    swapPools!: SwapPool[]

    @Column_('bool', { nullable: false })
    paused!: boolean
}
