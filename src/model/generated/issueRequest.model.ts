import {
    Entity as Entity_,
    Column as Column_,
    PrimaryColumn as PrimaryColumn_,
    StringColumn as StringColumn_,
    DateTimeColumn as DateTimeColumn_,
    BigIntColumn as BigIntColumn_,
    ManyToOne as ManyToOne_,
    Index as Index_,
} from '@subsquid/typeorm-store'
import { Vault } from './vault.model'

@Entity_()
export class IssueRequest {
    constructor(props?: Partial<IssueRequest>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @StringColumn_({ nullable: false })
    issueId!: string

    @DateTimeColumn_({ nullable: false })
    timestamp!: Date

    @StringColumn_({ nullable: false })
    requester!: string

    @BigIntColumn_({ nullable: false })
    amount!: bigint

    @Index_()
    @ManyToOne_(() => Vault, { nullable: true })
    vault!: Vault
}
