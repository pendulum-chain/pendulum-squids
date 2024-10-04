import {
    Entity as Entity_,
    Column as Column_,
    PrimaryColumn as PrimaryColumn_,
    BigIntColumn as BigIntColumn_,
    ManyToOne as ManyToOne_,
    Index as Index_,
    StringColumn as StringColumn_,
    OneToMany as OneToMany_,
} from '@subsquid/typeorm-store'
import { SingleTokenLock } from './singleTokenLock.model'
import { StableSwap } from './stableSwap.model'
import { Pair } from './pair.model'
import { Incentive } from './incentive.model'
import { StakePosition } from './stakePosition.model'

@Entity_()
export class Farm {
    constructor(props?: Partial<Farm>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @BigIntColumn_({ nullable: false })
    pid!: bigint

    @Index_()
    @ManyToOne_(() => SingleTokenLock, { nullable: true })
    singleTokenLock!: SingleTokenLock | undefined | null

    @Index_()
    @ManyToOne_(() => StableSwap, { nullable: true })
    stableSwap!: StableSwap | undefined | null

    @Index_()
    @ManyToOne_(() => Pair, { nullable: true })
    pair!: Pair | undefined | null

    @StringColumn_({ nullable: false })
    stakeToken!: string

    @BigIntColumn_({ nullable: false })
    liquidityStaked!: bigint

    @BigIntColumn_({ nullable: false })
    createdAtBlock!: bigint

    @BigIntColumn_({ nullable: false })
    createdAtTimestamp!: bigint

    @StringColumn_({ nullable: false })
    stakedUSD!: string

    @StringColumn_({ nullable: false })
    rewardUSDPerDay!: string

    @StringColumn_({ nullable: false })
    stakeApr!: string

    @OneToMany_(() => Incentive, (e) => e.farm)
    incentives!: Incentive[]

    @OneToMany_(() => StakePosition, (e) => e.farm)
    stakePositions!: StakePosition[]
}
