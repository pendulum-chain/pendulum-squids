import {
    Entity as Entity_,
    Column as Column_,
    PrimaryColumn as PrimaryColumn_,
    Index as Index_,
} from 'typeorm'
import * as marshal from './marshal'

@Entity_()
export class OraclePrice {
    constructor(props?: Partial<OraclePrice>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @Column_('text', { nullable: false })
    symbol!: string

    @Column_('text', { nullable: false })
    name!: string

    @Index_()
    @Column_('text', { nullable: false })
    blockchain!: string

    @Index_()
    @Column_('numeric', {
        transformer: marshal.bigintTransformer,
        nullable: false,
    })
    timestamp!: bigint

    /**
     * BigDecimal
     */
    @Index_()
    @Column_('text', { nullable: false })
    price!: string

    /**
     * BigDecimal
     */
    @Column_('text', { nullable: false })
    supply!: string

    @Column_('int4', { nullable: false })
    decimals!: number
}
