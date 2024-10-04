import {
    Entity as Entity_,
    Column as Column_,
    PrimaryColumn as PrimaryColumn_,
    DateTimeColumn as DateTimeColumn_,
    ManyToOne as ManyToOne_,
    Index as Index_,
    StringColumn as StringColumn_,
    IntColumn as IntColumn_,
} from '@subsquid/typeorm-store'
import { Token } from './token.model'

@Entity_()
export class TokenDayData {
    constructor(props?: Partial<TokenDayData>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @DateTimeColumn_({ nullable: false })
    date!: Date

    @Index_()
    @ManyToOne_(() => Token, { nullable: true })
    token!: Token

    @StringColumn_({ nullable: false })
    dailyVolumeToken!: string

    @StringColumn_({ nullable: false })
    dailyVolumeETH!: string

    @StringColumn_({ nullable: false })
    dailyVolumeUSD!: string

    @IntColumn_({ nullable: false })
    dailyTxns!: number

    @StringColumn_({ nullable: false })
    totalLiquidityToken!: string

    @StringColumn_({ nullable: false })
    totalLiquidityETH!: string

    @StringColumn_({ nullable: false })
    totalLiquidityUSD!: string

    @StringColumn_({ nullable: false })
    priceUSD!: string
}
