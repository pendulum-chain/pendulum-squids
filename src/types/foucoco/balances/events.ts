import {
    sts,
    Block,
    Bytes,
    Option,
    Result,
    EventType,
    RuntimeCtx,
} from '../support'
import * as v18 from '../v18'

export const transfer = {
    name: 'Balances.Transfer',
    /**
     * Transfer succeeded.
     */
    v18: new EventType(
        'Balances.Transfer',
        sts.struct({
            from: v18.AccountId32,
            to: v18.AccountId32,
            amount: sts.bigint(),
        })
    ),
}
