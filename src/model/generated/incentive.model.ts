import {
    Entity as Entity_,
    Column as Column_,
    PrimaryColumn as PrimaryColumn_,
    ManyToOne as ManyToOne_,
    Index as Index_,
    StringColumn as StringColumn_,
} from '@subsquid/typeorm-store'
import { Farm } from './farm.model'
import { Token } from './token.model'

@Entity_()
export class Incentive {
    constructor(props?: Partial<Incentive>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @ManyToOne_(() => Farm, { nullable: true })
    farm!: Farm

    @Index_()
    @ManyToOne_(() => Token, { nullable: true })
    rewardToken!: Token

    @StringColumn_({ nullable: false })
    rewardPerDay!: string
}
