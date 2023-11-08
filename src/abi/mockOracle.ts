import * as ethers from 'ethers'
import { LogEvent, Func, ContractBase } from './abi.support'
import { ABI_JSON } from './mockOracle.abi'

export const abi = new ethers.Interface(ABI_JSON)

export const functions = {
    getAssetPrice: new Func<[_asset: string], { _asset: string }, bigint>(
        abi,
        '0xb3596f07'
    ),
    updateCurrentPrices: new Func<
        [_asset: string, _price: bigint],
        { _asset: string; _price: bigint },
        bigint
    >(abi, '0xf97a7796'),
}

export class Contract extends ContractBase {
    getAssetPrice(_asset: string): Promise<bigint> {
        return this.eth_call(functions.getAssetPrice, [_asset])
    }
}
