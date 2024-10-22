import {
    Entity as Entity_,
    Column as Column_,
    PrimaryColumn as PrimaryColumn_,
    IntColumn as IntColumn_,
    StringColumn as StringColumn_,
    OneToMany as OneToMany_,
} from '@subsquid/typeorm-store'
import { SwapPool } from './swapPool.model'
import { BackstopPool } from './backstopPool.model'

@Entity_()
export class NablaToken {
    constructor(props?: Partial<NablaToken>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @IntColumn_({ nullable: false })
    decimals!: number

    @StringColumn_({ nullable: false })
    name!: string

    @StringColumn_({ nullable: false })
    symbol!: string

    @OneToMany_(() => SwapPool, (e) => e.token)
    swapPools!: SwapPool[]

    @OneToMany_(() => BackstopPool, (e) => e.token)
    backstopPool!: BackstopPool[]
}
