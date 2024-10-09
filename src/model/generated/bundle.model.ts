import {
    Entity as Entity_,
    Column as Column_,
    PrimaryColumn as PrimaryColumn_,
    StringColumn as StringColumn_,
} from '@subsquid/typeorm-store'

@Entity_()
export class Bundle {
    constructor(props?: Partial<Bundle>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    /**
     * BigDecimal
     */
    @StringColumn_({ nullable: false })
    ethPrice!: string
}
