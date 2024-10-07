import {
    Entity as Entity_,
    Column as Column_,
    PrimaryColumn as PrimaryColumn_,
    DateTimeColumn as DateTimeColumn_,
    BigIntColumn as BigIntColumn_,
    StringColumn as StringColumn_,
    ManyToOne as ManyToOne_,
    Index as Index_,
} from '@subsquid/typeorm-store'
import { Vault } from './vault.model'
import { RedeemRequestStatus } from './_redeemRequestStatus'

@Entity_()
export class RedeemRequest {
    constructor(props?: Partial<RedeemRequest>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @DateTimeColumn_({ nullable: false })
    timestamp!: Date

    @BigIntColumn_({ nullable: false })
    opentime!: bigint

    @BigIntColumn_({ nullable: false })
    period!: bigint

    @StringColumn_({ nullable: false })
    redeemer!: string

    @BigIntColumn_({ nullable: false })
    amount!: bigint

    @Index_()
    @ManyToOne_(() => Vault, { nullable: true })
    vault!: Vault

    @BigIntColumn_({ nullable: false })
    fee!: bigint

    @BigIntColumn_({ nullable: false })
    premium!: bigint

    @BigIntColumn_({ nullable: false })
    transferFee!: bigint

    @BigIntColumn_({ nullable: true })
    slashedAmount!: bigint | undefined | null

    @Column_('varchar', { length: 17, nullable: false })
    status!: RedeemRequestStatus
}
