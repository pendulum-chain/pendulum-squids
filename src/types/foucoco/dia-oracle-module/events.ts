import {
    sts,
    Block,
    Bytes,
    Option,
    Result,
    EventType,
    RuntimeCtx,
} from '../support'
import * as v1 from '../v1'

export const updatedPrices = {
    name: 'DiaOracleModule.UpdatedPrices',
    /**
     * Event is triggered when prices are updated
     */
    v1: new EventType(
        'DiaOracleModule.UpdatedPrices',
        sts.array(() =>
            sts.tuple(() => [
                sts.tuple(() => [sts.bytes(), sts.bytes()]),
                v1.CoinInfo,
            ])
        )
    ),
}
