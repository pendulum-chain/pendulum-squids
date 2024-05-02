import {
    Entity as Entity_,
    Column as Column_,
    PrimaryColumn as PrimaryColumn_,
} from 'typeorm'
import * as marshal from './marshal'

@Entity_()
export class NablaBackstopLiquidityWithdrawal {
    constructor(props?: Partial<NablaBackstopLiquidityWithdrawal>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Column_('timestamp with time zone', { nullable: false })
    timestamp!: Date

    @Column_('text', { nullable: false })
    sender!: string

    @Column_('numeric', {
        transformer: marshal.bigintTransformer,
        nullable: false,
    })
    poolSharesBurned!: bigint

    @Column_('numeric', {
        transformer: marshal.bigintTransformer,
        nullable: false,
    })
    amountPrincipleWithdrawn!: bigint
}
