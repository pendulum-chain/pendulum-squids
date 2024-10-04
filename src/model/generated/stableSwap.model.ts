import {
    Entity as Entity_,
    Column as Column_,
    PrimaryColumn as PrimaryColumn_,
    StringColumn as StringColumn_,
    IntColumn as IntColumn_,
    BigIntColumn as BigIntColumn_,
    ManyToOne as ManyToOne_,
    Index as Index_,
    OneToMany as OneToMany_,
} from '@subsquid/typeorm-store'
import { StableSwapInfo } from './stableSwapInfo.model'
import { StableSwapEvent } from './stableSwapEvent.model'
import { StableSwapExchange } from './stableSwapExchange.model'
import { StableSwapDayData } from './stableSwapDayData.model'
import { StableSwapHourData } from './stableSwapHourData.model'
import { Farm } from './farm.model'

@Entity_()
export class StableSwap {
    constructor(props?: Partial<StableSwap>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @StringColumn_({ nullable: false })
    address!: string

    @StringColumn_({ nullable: false })
    baseSwapAddress!: string

    @IntColumn_({ nullable: false })
    numTokens!: number

    @StringColumn_({ array: true, nullable: false })
    tokens!: string[]

    @StringColumn_({ array: true, nullable: false })
    baseTokens!: string[]

    @StringColumn_({ array: true, nullable: false })
    allTokens!: string[]

    @StringColumn_({ array: true, nullable: false })
    balances!: string[]

    @StringColumn_({ nullable: false })
    lpToken!: string

    @StringColumn_({ nullable: false })
    lpTotalSupply!: string

    @BigIntColumn_({ nullable: false })
    a!: bigint

    @BigIntColumn_({ nullable: false })
    swapFee!: bigint

    @BigIntColumn_({ nullable: false })
    adminFee!: bigint

    @BigIntColumn_({ nullable: false })
    virtualPrice!: bigint

    @Index_()
    @ManyToOne_(() => StableSwapInfo, { nullable: true })
    stableSwapInfo!: StableSwapInfo

    @OneToMany_(() => StableSwapEvent, (e) => e.stableSwap)
    events!: StableSwapEvent[]

    @OneToMany_(() => StableSwapExchange, (e) => e.stableSwap)
    exchanges!: StableSwapExchange[]

    @OneToMany_(() => StableSwapDayData, (e) => e.stableSwap)
    stableSwapDayData!: StableSwapDayData[]

    @OneToMany_(() => StableSwapHourData, (e) => e.stableSwap)
    stableSwapHourData!: StableSwapHourData[]

    @OneToMany_(() => Farm, (e) => e.stableSwap)
    farm!: Farm[]

    /**
     * BigDecimal
     */
    @StringColumn_({ nullable: false })
    tvlUSD!: string

    /**
     * BigDecimal
     */
    @StringColumn_({ nullable: false })
    volumeUSD!: string
}
