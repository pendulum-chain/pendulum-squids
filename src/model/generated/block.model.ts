import {
    Entity as Entity_,
    Column as Column_,
    PrimaryColumn as PrimaryColumn_,
    IntColumn as IntColumn_,
    Index as Index_,
    BytesColumn as BytesColumn_,
    StringColumn as StringColumn_,
    DateTimeColumn as DateTimeColumn_,
    OneToMany as OneToMany_,
} from '@subsquid/typeorm-store'
import { Extrinsic } from './extrinsic.model'
import { Call } from './call.model'
import { Event } from './event.model'

@Entity_()
export class Block {
    constructor(props?: Partial<Block>) {
        Object.assign(this, props)
    }

    /**
     * BlockHeight-blockHash - e.g. 0001812319-0001c
     */
    @PrimaryColumn_()
    id!: string

    @Index_()
    @IntColumn_({ nullable: false })
    height!: number

    @Index_()
    @BytesColumn_({ nullable: false })
    hash!: Uint8Array

    @BytesColumn_({ nullable: false })
    parentHash!: Uint8Array

    @BytesColumn_({ nullable: false })
    stateRoot!: Uint8Array

    @BytesColumn_({ nullable: false })
    extrinsicsicRoot!: Uint8Array

    @StringColumn_({ nullable: false })
    specName!: string

    @Index_()
    @IntColumn_({ nullable: false })
    specVersion!: number

    @StringColumn_({ nullable: false })
    implName!: string

    @IntColumn_({ nullable: false })
    implVersion!: number

    @Index_()
    @DateTimeColumn_({ nullable: false })
    timestamp!: Date

    @Index_()
    @BytesColumn_({ nullable: true })
    validator!: Uint8Array | undefined | null

    @IntColumn_({ nullable: false })
    extrinsicsCount!: number

    @IntColumn_({ nullable: false })
    callsCount!: number

    @IntColumn_({ nullable: false })
    eventsCount!: number

    @OneToMany_(() => Extrinsic, (e) => e.block)
    extrinsics!: Extrinsic[]

    @OneToMany_(() => Call, (e) => e.block)
    calls!: Call[]

    @OneToMany_(() => Event, (e) => e.block)
    events!: Event[]
}
