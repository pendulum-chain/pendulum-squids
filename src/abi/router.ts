import * as ethers from 'ethers'
import { LogEvent, Func, ContractBase } from './abi.support'
import { ABI_JSON } from './router.abi'

export const abi = new ethers.Interface(ABI_JSON)

export const events = {
    OwnershipTransferred: new LogEvent<
        [previousOwner: string, newOwner: string] & {
            previousOwner: string
            newOwner: string
        }
    >(
        abi,
        '0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0'
    ),
    Paused: new LogEvent<[account: string] & { account: string }>(
        abi,
        '0x62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258'
    ),
    Swap: new LogEvent<
        [
            sender: string,
            amountIn: bigint,
            amountOut: bigint,
            tokenIn: string,
            tokenOut: string,
            to: string
        ] & {
            sender: string
            amountIn: bigint
            amountOut: bigint
            tokenIn: string
            tokenOut: string
            to: string
        }
    >(
        abi,
        '0x1621cb2414b25cfb014ed2e1e8051310c0f691ac8d2ed92928e804595df0553b'
    ),
    SwapPoolRegistered: new LogEvent<
        [pool: string, asset: string] & { pool: string; asset: string }
    >(
        abi,
        '0xdf63b2e8e2b678f4c66aa3868d61480518bea09396dcf7f68d5d9a32f9525986'
    ),
    Unpaused: new LogEvent<[account: string] & { account: string }>(
        abi,
        '0x5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa'
    ),
}

export const functions = {
    getAmountOut: new Func<
        [_amountIn: bigint, _tokenInOut: Array<string>],
        { _amountIn: bigint; _tokenInOut: Array<string> },
        bigint
    >(abi, '0xb8239ebb'),
    oracleByAsset: new Func<[_: string], {}, string>(abi, '0x38163032'),
    owner: new Func<[], {}, string>(abi, '0x8da5cb5b'),
    pause: new Func<[], {}, []>(abi, '0x8456cb59'),
    paused: new Func<[], {}, boolean>(abi, '0x5c975abb'),
    poolByAsset: new Func<[_: string], {}, string>(abi, '0x06de94d8'),
    registerPool: new Func<
        [_asset: string, _swapPool: string],
        { _asset: string; _swapPool: string },
        []
    >(abi, '0x7286e5e5'),
    renounceOwnership: new Func<[], {}, []>(abi, '0x715018a6'),
    setPriceOracle: new Func<
        [_asset: string, _priceOracle: string],
        { _asset: string; _priceOracle: string },
        []
    >(abi, '0x67a74ddc'),
    swapExactTokensForTokens: new Func<
        [
            _amountIn: bigint,
            _amountOutMin: bigint,
            _tokenInOut: Array<string>,
            _to: string,
            _deadline: bigint
        ],
        {
            _amountIn: bigint
            _amountOutMin: bigint
            _tokenInOut: Array<string>
            _to: string
            _deadline: bigint
        },
        Array<bigint>
    >(abi, '0x38ed1739'),
    transferOwnership: new Func<[newOwner: string], { newOwner: string }, []>(
        abi,
        '0xf2fde38b'
    ),
    unpause: new Func<[], {}, []>(abi, '0x3f4ba83a'),
}

export class Contract extends ContractBase {
    getAmountOut(
        _amountIn: bigint,
        _tokenInOut: Array<string>
    ): Promise<bigint> {
        return this.eth_call(functions.getAmountOut, [_amountIn, _tokenInOut])
    }

    oracleByAsset(arg0: string): Promise<string> {
        return this.eth_call(functions.oracleByAsset, [arg0])
    }

    owner(): Promise<string> {
        return this.eth_call(functions.owner, [])
    }

    paused(): Promise<boolean> {
        return this.eth_call(functions.paused, [])
    }

    poolByAsset(arg0: string): Promise<string> {
        return this.eth_call(functions.poolByAsset, [arg0])
    }
}
