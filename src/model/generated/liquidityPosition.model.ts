import {
    Entity as Entity_,
    Column as Column_,
    PrimaryColumn as PrimaryColumn_,
    ManyToOne as ManyToOne_,
    Index as Index_,
    StringColumn as StringColumn_,
} from '@subsquid/typeorm-store'
import { User } from './user.model'
import { Pair } from './pair.model'

@Entity_()
export class LiquidityPosition {
    constructor(props?: Partial<LiquidityPosition>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

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
    liquidityTokenBalance!: string
}
