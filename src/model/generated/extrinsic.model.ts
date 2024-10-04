import {
    Entity as Entity_,
    Column as Column_,
    PrimaryColumn as PrimaryColumn_,
    ManyToOne as ManyToOne_,
    Index as Index_,
    IntColumn as IntColumn_,
    BigIntColumn as BigIntColumn_,
    BooleanColumn as BooleanColumn_,
    JSONColumn as JSONColumn_,
    BytesColumn as BytesColumn_,
    OneToMany as OneToMany_,
} from '@subsquid/typeorm-store'
import * as marshal from './marshal'
import { Block } from './block.model'
import { Call } from './call.model'
import { ExtrinsicSignature } from './_extrinsicSignature'
import { Event } from './event.model'

@Entity_()
export class Extrinsic {
    constructor(props?: Partial<Extrinsic>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @ManyToOne_(() => Block, { nullable: true })
    block!: Block

    @Index_()
    @ManyToOne_(() => Call, { nullable: true })
    call!: Call

    @IntColumn_({ nullable: false })
    index!: number

    @IntColumn_({ nullable: false })
    version!: number

    @Column_('jsonb', {
        transformer: {
            to: (obj) => (obj == null ? undefined : obj.toJSON()),
            from: (obj) =>
                obj == null
                    ? undefined
                    : new ExtrinsicSignature(undefined, obj),
        },
        nullable: true,
    })
    signature!: ExtrinsicSignature | undefined | null

    @BigIntColumn_({ nullable: true })
    tip!: bigint | undefined | null

    @BigIntColumn_({ nullable: true })
    fee!: bigint | undefined | null

    @Index_()
    @BooleanColumn_({ nullable: true })
    success!: boolean | undefined | null

    @JSONColumn_({ nullable: true })
    error!: unknown | undefined | null

    @Index_()
    @BytesColumn_({ nullable: false })
    hash!: Uint8Array

    @OneToMany_(() => Call, (e) => e.extrinsic)
    calls!: Call[]

    @OneToMany_(() => Event, (e) => e.extrinsic)
    events!: Event[]
}
