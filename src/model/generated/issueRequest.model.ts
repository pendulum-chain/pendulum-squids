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
import { IssueRequestStatus } from './_issueRequestStatus'

@Entity_()
export class IssueRequest {
    constructor(props?: Partial<IssueRequest>) {
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
    requester!: string

    @BigIntColumn_({ nullable: false })
    amount!: bigint

    @Index_()
    @ManyToOne_(() => Vault, { nullable: true })
    vault!: Vault

    @StringColumn_({ nullable: false })
    asset!: string

    @BigIntColumn_({ nullable: false })
    fee!: bigint

    @BigIntColumn_({ nullable: false })
    griefingCollateral!: bigint

    @StringColumn_({ nullable: false })
    stellarAddress!: string

    @Column_('varchar', { length: 9, nullable: false })
    status!: IssueRequestStatus
}
