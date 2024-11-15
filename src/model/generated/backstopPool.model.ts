import {
    Entity as Entity_,
    Column as Column_,
    PrimaryColumn as PrimaryColumn_,
    StringColumn as StringColumn_,
    IntColumn as IntColumn_,
    ManyToOne as ManyToOne_,
    Index as Index_,
    BigIntColumn as BigIntColumn_,
    BooleanColumn as BooleanColumn_,
    OneToMany as OneToMany_,
} from '@subsquid/typeorm-store'
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

    @StringColumn_({ nullable: false })
    name!: string

    @StringColumn_({ nullable: false })
    symbol!: string

    @IntColumn_({ nullable: false })
    lpTokenDecimals!: number

    @Index_()
    @ManyToOne_(() => Router, { nullable: true })
    router!: Router

    @Index_()
    @ManyToOne_(() => NablaToken, { nullable: true })
    token!: NablaToken

    @BigIntColumn_({ nullable: false })
    reserves!: bigint

    @BigIntColumn_({ nullable: false })
    totalSupply!: bigint

    @BooleanColumn_({ nullable: false })
    paused!: boolean

    @OneToMany_(() => SwapPool, (e) => e.backstop)
    coveredSwapPools!: SwapPool[]

    @OneToMany_(() => NablaSwapFee, (e) => e.backstopPool)
    feesHistory!: NablaSwapFee[]

    @BigIntColumn_({ nullable: false })
    apr!: bigint

    @BigIntColumn_({ nullable: false })
    poolValue!: bigint
}
