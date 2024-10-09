import {
    Entity as Entity_,
    Column as Column_,
    PrimaryColumn as PrimaryColumn_,
    IntColumn as IntColumn_,
    StringColumn as StringColumn_,
    OneToMany as OneToMany_,
} from '@subsquid/typeorm-store'
import { StableSwap } from './stableSwap.model'

@Entity_()
export class StableSwapInfo {
    constructor(props?: Partial<StableSwapInfo>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @IntColumn_({ nullable: false })
    poolCount!: number

    /**
     * BigDecimal
     */
    @StringColumn_({ nullable: false })
    totalVolumeUSD!: string

    /**
     * BigDecimal
     */
    @StringColumn_({ nullable: false })
    totalTvlUSD!: string

    @IntColumn_({ nullable: false })
    txCount!: number

    @OneToMany_(() => StableSwap, (e) => e.stableSwapInfo)
    swaps!: StableSwap[]
}
