import {
    Entity as Entity_,
    Column as Column_,
    PrimaryColumn as PrimaryColumn_,
    StringColumn as StringColumn_,
    IntColumn as IntColumn_,
    OneToMany as OneToMany_,
} from '@subsquid/typeorm-store'
import { TokenDayData } from './tokenDayData.model'
import { PairDayData } from './pairDayData.model'
import { Pair } from './pair.model'

@Entity_()
export class Token {
    constructor(props?: Partial<Token>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @StringColumn_({ nullable: false })
    symbol!: string

    @StringColumn_({ nullable: false })
    name!: string

    @IntColumn_({ nullable: false })
    decimals!: number

    @StringColumn_({ nullable: false })
    totalSupply!: string

    /**
     * BigDecimal
     */
    @StringColumn_({ nullable: false })
    tradeVolume!: string

    /**
     * BigDecimal
     */
    @StringColumn_({ nullable: false })
    tradeVolumeUSD!: string

    /**
     * BigDecimal
     */
    @StringColumn_({ nullable: false })
    untrackedVolumeUSD!: string

    @IntColumn_({ nullable: false })
    txCount!: number

    /**
     * BigDecimal
     */
    @StringColumn_({ nullable: false })
    totalLiquidity!: string

    /**
     * BigDecimal
     */
    @StringColumn_({ nullable: false })
    derivedETH!: string

    @OneToMany_(() => TokenDayData, (e) => e.token)
    tokenDayData!: TokenDayData[]

    @OneToMany_(() => PairDayData, (e) => e.token0)
    pairDayDataBase!: PairDayData[]

    @OneToMany_(() => PairDayData, (e) => e.token1)
    pairDayDataQuote!: PairDayData[]

    @OneToMany_(() => Pair, (e) => e.token0)
    pairBase!: Pair[]

    @OneToMany_(() => Pair, (e) => e.token1)
    pairQuote!: Pair[]
}
