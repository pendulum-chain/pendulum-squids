import {
    Entity as Entity_,
    Column as Column_,
    PrimaryColumn as PrimaryColumn_,
    StringColumn as StringColumn_,
} from '@subsquid/typeorm-store'

@Entity_()
export class Vault {
    constructor(props?: Partial<Vault>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @StringColumn_({ nullable: false })
    accountId!: string

    @StringColumn_({ nullable: false })
    wrapped!: string

    @StringColumn_({ nullable: false })
    collateral!: string

    @StringColumn_({ nullable: false })
    vaultStellarPublicKey!: string
}
