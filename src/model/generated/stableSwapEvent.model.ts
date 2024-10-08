import {
    Entity as Entity_,
    Column as Column_,
    PrimaryColumn as PrimaryColumn_,
    ManyToOne as ManyToOne_,
    Index as Index_,
    BigIntColumn as BigIntColumn_,
    BytesColumn as BytesColumn_,
} from '@subsquid/typeorm-store'
import * as marshal from './marshal'
import { StableSwap } from './stableSwap.model'
import {
    StableSwapEventData,
    fromJsonStableSwapEventData,
} from './_stableSwapEventData'

@Entity_()
export class StableSwapEvent {
    constructor(props?: Partial<StableSwapEvent>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @ManyToOne_(() => StableSwap, { nullable: true })
    stableSwap!: StableSwap

    @Column_('jsonb', {
        transformer: {
            to: (obj) => (obj == null ? undefined : obj.toJSON()),
            from: (obj) =>
                obj == null ? undefined : fromJsonStableSwapEventData(obj),
        },
        nullable: true,
    })
    data!: StableSwapEventData | undefined | null

    @BigIntColumn_({ nullable: false })
    block!: bigint

    @BigIntColumn_({ nullable: false })
    timestamp!: bigint

    @BytesColumn_({ nullable: false })
    transaction!: Uint8Array
}
