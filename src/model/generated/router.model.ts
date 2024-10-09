import {
    Entity as Entity_,
    Column as Column_,
    PrimaryColumn as PrimaryColumn_,
    OneToMany as OneToMany_,
    BooleanColumn as BooleanColumn_,
} from '@subsquid/typeorm-store'
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

    @OneToMany_(() => BackstopPool, (e) => e.router)
    backstopPool!: BackstopPool[]

    @BooleanColumn_({ nullable: false })
    paused!: boolean
}
