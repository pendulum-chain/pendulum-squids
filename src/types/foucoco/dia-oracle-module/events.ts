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

export const updatedPrices = {
    name: 'DiaOracleModule.UpdatedPrices',
    /**
     * Event is triggered when prices are updated
     */
    v18: new EventType(
        'DiaOracleModule.UpdatedPrices',
        sts.array(() =>
            sts.tuple(() => [
                sts.tuple(() => [sts.bytes(), sts.bytes()]),
                v18.CoinInfo,
            ])
        )
    ),
}
