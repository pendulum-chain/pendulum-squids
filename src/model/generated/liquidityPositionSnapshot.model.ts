import {
    Entity as Entity_,
    Column as Column_,
    PrimaryColumn as PrimaryColumn_,
    ManyToOne as ManyToOne_,
    Index as Index_,
    DateTimeColumn as DateTimeColumn_,
    IntColumn as IntColumn_,
    StringColumn as StringColumn_,
} from '@subsquid/typeorm-store'
import { LiquidityPosition } from './liquidityPosition.model'
import { User } from './user.model'
import { Pair } from './pair.model'

@Entity_()
export class LiquidityPositionSnapshot {
    constructor(props?: Partial<LiquidityPositionSnapshot>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @ManyToOne_(() => LiquidityPosition, { nullable: true })
    liquidityPosition!: LiquidityPosition

    @DateTimeColumn_({ nullable: false })
    timestamp!: Date

    @IntColumn_({ nullable: false })
    block!: number

    @Index_()
    @ManyToOne_(() => User, { nullable: true })
    user!: User

    @Index_()
    @ManyToOne_(() => Pair, { nullable: true })
    pair!: Pair

    /**
     * BigDecimal
     */
    @StringColumn_({ nullable: false })
    token0PriceUSD!: string

    /**
     * BigDecimal
     */
    @StringColumn_({ nullable: false })
    token1PriceUSD!: string

    /**
     * BigDecimal
     */
    @StringColumn_({ nullable: false })
    reserve0!: string

    /**
     * BigDecimal
     */
    @StringColumn_({ nullable: false })
    reserve1!: string

    /**
     * BigDecimal
     */
    @StringColumn_({ nullable: false })
    reserveUSD!: string

    /**
     * BigDecimal
     */
    @StringColumn_({ nullable: false })
    liquidityTokenTotalSupply!: string

    /**
     * BigDecimal
     */
    @StringColumn_({ nullable: false })
    liquidityTokenBalance!: string
}
