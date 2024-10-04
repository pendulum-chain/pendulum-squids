import {
    Entity as Entity_,
    Column as Column_,
    PrimaryColumn as PrimaryColumn_,
    ManyToOne as ManyToOne_,
    Index as Index_,
    StringColumn as StringColumn_,
    OneToMany as OneToMany_,
} from '@subsquid/typeorm-store'
import { Token } from './token.model'
import { SingleTokenLockDayData } from './singleTokenLockDayData.model'
import { SingleTokenLockHourData } from './singleTokenLockHourData.model'
import { Farm } from './farm.model'

@Entity_()
export class SingleTokenLock {
    constructor(props?: Partial<SingleTokenLock>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @ManyToOne_(() => Token, { nullable: true })
    token!: Token

    /**
     * BigDecimal
     */
    @StringColumn_({ nullable: false })
    totalLiquidityUSD!: string

    /**
     * BigDecimal
     */
    @StringColumn_({ nullable: false })
    totalLiquidity!: string

    @StringColumn_({ nullable: false })
    totalLiquidityETH!: string

    @OneToMany_(() => SingleTokenLockDayData, (e) => e.singleTokenLock)
    singleTokenLockDayData!: SingleTokenLockDayData[]

    @OneToMany_(() => SingleTokenLockHourData, (e) => e.singleTokenLock)
    singleTokenLockHourData!: SingleTokenLockHourData[]

    @OneToMany_(() => Farm, (e) => e.singleTokenLock)
    farm!: Farm[]
}
