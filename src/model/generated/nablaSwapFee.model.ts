import {
    Entity as Entity_,
    Column as Column_,
    PrimaryColumn as PrimaryColumn_,
} from 'typeorm'
import * as marshal from './marshal'

@Entity_()
export class NablaSwapFee {
    constructor(props?: Partial<NablaSwapFee>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Column_('numeric', {
        transformer: marshal.bigintTransformer,
        nullable: false,
    })
    lpFee!: bigint

    @Column_('numeric', {
        transformer: marshal.bigintTransformer,
        nullable: false,
    })
    backstopFees!: bigint

    @Column_('numeric', {
        transformer: marshal.bigintTransformer,
        nullable: false,
    })
    protocolFees!: bigint

    @Column_('numeric', {
        transformer: marshal.bigintTransformer,
        nullable: false,
    })
    timestamp!: bigint
}
