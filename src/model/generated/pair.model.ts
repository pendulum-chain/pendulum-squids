import {
    Entity as Entity_,
    Column as Column_,
    PrimaryColumn as PrimaryColumn_,
    ManyToOne as ManyToOne_,
    Index as Index_,
    StringColumn as StringColumn_,
    IntColumn as IntColumn_,
    DateTimeColumn as DateTimeColumn_,
    BigIntColumn as BigIntColumn_,
    OneToMany as OneToMany_,
} from '@subsquid/typeorm-store'
import { Token } from './token.model'
import { PairHourData } from './pairHourData.model'
import { PairDayData } from './pairDayData.model'
import { LiquidityPosition } from './liquidityPosition.model'
import { LiquidityPositionSnapshot } from './liquidityPositionSnapshot.model'
import { Mint } from './mint.model'
import { Burn } from './burn.model'
import { Swap } from './swap.model'
import { Farm } from './farm.model'

@Entity_()
export class Pair {
    constructor(props?: Partial<Pair>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @ManyToOne_(() => Token, { nullable: true })
    token0!: Token

    @Index_()
    @ManyToOne_(() => Token, { nullable: true })
    token1!: Token

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
    totalSupply!: string

    /**
     * BigDecimal
     */
    @StringColumn_({ nullable: false })
    reserveETH!: string

    /**
     * BigDecimal
     */
    @StringColumn_({ nullable: false })
    reserveUSD!: string

    /**
     * BigDecimal
     */
    @StringColumn_({ nullable: false })
    trackedReserveETH!: string

    /**
     * BigDecimal
     */
    @StringColumn_({ nullable: false })
    token0Price!: string

    /**
     * BigDecimal
     */
    @StringColumn_({ nullable: false })
    token1Price!: string

    /**
     * BigDecimal
     */
    @StringColumn_({ nullable: false })
    volumeToken0!: string

    /**
     * BigDecimal
     */
    @StringColumn_({ nullable: false })
    volumeToken1!: string

    /**
     * BigDecimal
     */
    @StringColumn_({ nullable: false })
    volumeUSD!: string

    /**
     * BigDecimal
     */
    @StringColumn_({ nullable: false })
    untrackedVolumeUSD!: string

    @IntColumn_({ nullable: false })
    txCount!: number

    @DateTimeColumn_({ nullable: false })
    createdAtTimestamp!: Date

    @BigIntColumn_({ nullable: false })
    createdAtBlockNumber!: bigint

    /**
     *  APR
     */
    @IntColumn_({ nullable: false })
    liquidityProviderCount!: number

    @OneToMany_(() => PairHourData, (e) => e.pair)
    pairHourData!: PairHourData[]

    @OneToMany_(() => PairDayData, (e) => e.pair)
    pairDayData!: PairDayData[]

    @OneToMany_(() => LiquidityPosition, (e) => e.pair)
    liquidityPositions!: LiquidityPosition[]

    @OneToMany_(() => LiquidityPositionSnapshot, (e) => e.pair)
    liquidityPositionSnapshots!: LiquidityPositionSnapshot[]

    @OneToMany_(() => Mint, (e) => e.pair)
    mints!: Mint[]

    @OneToMany_(() => Burn, (e) => e.pair)
    burns!: Burn[]

    @OneToMany_(() => Swap, (e) => e.pair)
    swaps!: Swap[]

    @OneToMany_(() => Farm, (e) => e.pair)
    farm!: Farm[]
}
