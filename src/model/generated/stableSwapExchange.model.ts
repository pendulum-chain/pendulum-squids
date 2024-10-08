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
    StableSwapExchangeData,
    fromJsonStableSwapExchangeData,
} from './_stableSwapExchangeData'

@Entity_()
export class StableSwapExchange {
    constructor(props?: Partial<StableSwapExchange>) {
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
                obj == null ? undefined : fromJsonStableSwapExchangeData(obj),
        },
        nullable: true,
    })
    data!: StableSwapExchangeData | undefined | null

    @BigIntColumn_({ nullable: false })
    block!: bigint

    @BigIntColumn_({ nullable: false })
    timestamp!: bigint

    @BytesColumn_({ nullable: false })
    transaction!: Uint8Array
}
