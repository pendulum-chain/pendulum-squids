import {
    sts,
    Block,
    Bytes,
    Option,
    Result,
    EventType,
    RuntimeCtx,
} from '../support'
import * as v3 from '../v3'

export const updatedPrices = {
    name: 'DiaOracleModule.UpdatedPrices',
    /**
     * Event is triggered when prices are updated
     */
    v3: new EventType(
        'DiaOracleModule.UpdatedPrices',
        sts.array(() =>
            sts.tuple(() => [
                sts.tuple(() => [sts.bytes(), sts.bytes()]),
                v3.CoinInfo,
            ])
        )
    ),
}
