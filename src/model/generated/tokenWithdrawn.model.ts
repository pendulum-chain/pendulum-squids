import {
    Entity as Entity_,
    Column as Column_,
    PrimaryColumn as PrimaryColumn_,
    Index as Index_,
} from 'typeorm'
import * as marshal from './marshal'

@Entity_()
export class TokenWithdrawn {
    constructor(props?: Partial<TokenWithdrawn>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @Column_('int4', { nullable: false })
    blockNumber!: number

    @Index_()
    @Column_('timestamp with time zone', { nullable: false })
    timestamp!: Date

    @Index_()
    @Column_('text', { nullable: true })
    extrinsicHash!: string | undefined | null

    @Column_('text', { nullable: false })
    who!: string

    @Column_('text', { nullable: false })
    currencyId!: string

    @Index_()
    @Column_('numeric', {
        transformer: marshal.bigintTransformer,
        nullable: false,
    })
    amount!: bigint
}
