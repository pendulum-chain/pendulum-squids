import {
    Entity as Entity_,
    Column as Column_,
    PrimaryColumn as PrimaryColumn_,
    StringColumn as StringColumn_,
} from '@subsquid/typeorm-store'

@Entity_()
export class Points {
    constructor(props?: Partial<Points>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @StringColumn_({ nullable: false })
    pointsSwap!: string

    @StringColumn_({ nullable: false })
    pointsLpSwap!: string

    @StringColumn_({ nullable: false })
    pointsLpBackstop!: string
}
