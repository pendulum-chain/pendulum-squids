import {
    Entity as Entity_,
    Column as Column_,
    PrimaryColumn as PrimaryColumn_,
    DateTimeColumn as DateTimeColumn_,
    StringColumn as StringColumn_,
    IntColumn as IntColumn_,
    ManyToOne as ManyToOne_,
    Index as Index_,
} from '@subsquid/typeorm-store'
import { Factory } from './factory.model'
import { StableSwapInfo } from './stableSwapInfo.model'

@Entity_()
export class ZenlinkInfo {
    constructor(props?: Partial<ZenlinkInfo>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @DateTimeColumn_({ nullable: false })
    updatedDate!: Date

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

    @Index_()
    @ManyToOne_(() => Factory, { nullable: true })
    factory!: Factory

    @Index_()
    @ManyToOne_(() => StableSwapInfo, { nullable: true })
    stableSwapInfo!: StableSwapInfo
}
