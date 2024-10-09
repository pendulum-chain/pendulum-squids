import {
    Entity as Entity_,
    Column as Column_,
    PrimaryColumn as PrimaryColumn_,
    Index as Index_,
    IntColumn as IntColumn_,
} from '@subsquid/typeorm-store'
import { ItemType } from './_itemType'
import { CounterLevel } from './_counterLevel'

@Entity_()
export class ItemsCounter {
    constructor(props?: Partial<ItemsCounter>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @Column_('varchar', { length: 10, nullable: false })
    type!: ItemType

    @Index_()
    @Column_('varchar', { length: 6, nullable: false })
    level!: CounterLevel

    @Index_()
    @IntColumn_({ nullable: false })
    total!: number
}
