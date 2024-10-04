import {
    Entity as Entity_,
    Column as Column_,
    PrimaryColumn as PrimaryColumn_,
    Index as Index_,
    ManyToOne as ManyToOne_,
    IntColumn as IntColumn_,
    BooleanColumn as BooleanColumn_,
    JSONColumn as JSONColumn_,
    StringColumn as StringColumn_,
    OneToMany as OneToMany_,
} from '@subsquid/typeorm-store'
import { Block } from './block.model'
import { Extrinsic } from './extrinsic.model'
import { Event } from './event.model'

@Index_(['id', 'pallet', 'name'], { unique: false })
@Entity_()
export class Call {
    constructor(props?: Partial<Call>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @ManyToOne_(() => Block, { nullable: true })
    block!: Block

    @Index_()
    @ManyToOne_(() => Extrinsic, { nullable: true })
    extrinsic!: Extrinsic | undefined | null

    @Index_()
    @ManyToOne_(() => Call, { nullable: true })
    parent!: Call | undefined | null

    @IntColumn_({ array: true, nullable: false })
    address!: number[]

    @Index_()
    @BooleanColumn_({ nullable: false })
    success!: boolean

    @JSONColumn_({ nullable: true })
    error!: unknown | undefined | null

    @Index_()
    @StringColumn_({ nullable: false })
    pallet!: string

    @Index_()
    @StringColumn_({ nullable: false })
    name!: string

    @JSONColumn_({ nullable: true })
    args!: unknown | undefined | null

    @StringColumn_({ array: true, nullable: true })
    argsStr!: (string | undefined | null)[] | undefined | null

    @OneToMany_(() => Call, (e) => e.parent)
    subcalls!: Call[]

    @OneToMany_(() => Event, (e) => e.call)
    events!: Event[]
}
