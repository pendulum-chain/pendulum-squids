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

    @StringColumn_({ nullable: false })
    name!: string

    @StringColumn_({ nullable: false })
    symbol!: string

    @IntColumn_({ nullable: false })
    lpTokenDecimals!: number

    @Index_()
    @ManyToOne_(() => Router, { nullable: true })
    router!: Router | undefined | null

    @Index_()
    @ManyToOne_(() => BackstopPool, { nullable: true })
    backstop!: BackstopPool

    @Index_()
    @ManyToOne_(() => NablaToken, { nullable: true })
    token!: NablaToken

    @BigIntColumn_({ nullable: false })
    reserve!: bigint

    @BigIntColumn_({ nullable: false })
    reserveWithSlippage!: bigint

    @BigIntColumn_({ nullable: false })
    totalLiabilities!: bigint

    @BigIntColumn_({ nullable: false })
    totalSupply!: bigint

    @BooleanColumn_({ nullable: false })
    paused!: boolean

    @OneToMany_(() => NablaSwapFee, (e) => e.swapPool)
    feesHistory!: NablaSwapFee[]

    @BigIntColumn_({ nullable: false })
    backstopFees24h!: bigint

    @BigIntColumn_({ nullable: false })
    backstopFees7d!: bigint

    @BigIntColumn_({ nullable: false })
    apr24h!: bigint

    @BigIntColumn_({ nullable: false })
    apr7d!: bigint

    @BigIntColumn_({ nullable: false })
    lastAprUpdate!: bigint

    @BigIntColumn_({ nullable: false })
    insuranceFeeBps!: bigint

    @StringColumn_({ nullable: true })
    protocolTreasuryAddress!: string | undefined | null
}
