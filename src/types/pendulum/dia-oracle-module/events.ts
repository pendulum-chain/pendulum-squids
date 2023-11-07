import {
    sts,
    Block,
    Bytes,
    Option,
    Result,
    EventType,
    RuntimeCtx,
} from '../support'
import * as v7 from '../v7'

export const updatedPrices = {
    name: 'DiaOracleModule.UpdatedPrices',
    /**
     * Event is triggered when prices are updated
     */
    v7: new EventType(
        'DiaOracleModule.UpdatedPrices',
        sts.array(() =>
            sts.tuple(() => [
                sts.tuple(() => [sts.bytes(), sts.bytes()]),
                v7.CoinInfo,
            ])
        )
    ),
}
