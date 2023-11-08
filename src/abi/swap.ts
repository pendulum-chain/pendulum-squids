import * as ethers from 'ethers'
import { LogEvent, Func, ContractBase } from './abi.support'
import { ABI_JSON } from './swap.abi'

export const abi = new ethers.Interface(ABI_JSON)

export const events = {
    Approval: new LogEvent<
        [owner: string, spender: string, value: bigint] & {
            owner: string
            spender: string
            value: bigint
        }
    >(
        abi,
        '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925'
    ),
    BackstopDrain: new LogEvent<
        [recipient: string, amountSwapTokens: bigint] & {
            recipient: string
            amountSwapTokens: bigint
        }
    >(
        abi,
        '0x439c15c5ffd384d65af60124e574f5642b7e5d6750b762ddeef70abac573ab27'
    ),
    Burn: new LogEvent<
        [
            sender: string,
            poolSharesBurned: bigint,
            amountPrincipleWithdrawn: bigint
        ] & {
            sender: string
            poolSharesBurned: bigint
            amountPrincipleWithdrawn: bigint
        }
    >(
        abi,
        '0x49995e5dd6158cf69ad3e9777c46755a1a826a446c6416992167462dad033b2a'
    ),
    ChargedSwapFees: new LogEvent<
        [lpFees: bigint, backstopFees: bigint, protocolFees: bigint] & {
            lpFees: bigint
            backstopFees: bigint
            protocolFees: bigint
        }
    >(
        abi,
        '0x3eb07265dc949e6776beb7b2e85d9e292a8a411eabd500cbe06b6bec16d87721'
    ),
    Mint: new LogEvent<
        [
            sender: string,
            poolSharesMinted: bigint,
            amountPrincipleDeposited: bigint
        ] & {
            sender: string
            poolSharesMinted: bigint
            amountPrincipleDeposited: bigint
        }
    >(
        abi,
        '0x4c209b5fc8ad50758f13e2e1088ba56a560dff690a1c6fef26394f4c03821c4f'
    ),
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
    Transfer: new LogEvent<
        [from: string, to: string, value: bigint] & {
            from: string
            to: string
            value: bigint
        }
    >(
        abi,
        '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'
    ),
    Unpaused: new LogEvent<[account: string] & { account: string }>(
        abi,
        '0x5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa'
    ),
}

export const functions = {
    accumulatedSlippage: new Func<[], {}, bigint>(abi, '0xe4182b09'),
    allowance: new Func<
        [owner: string, spender: string],
        { owner: string; spender: string },
        bigint
    >(abi, '0xdd62ed3e'),
    approve: new Func<
        [spender: string, amount: bigint],
        { spender: string; amount: bigint },
        boolean
    >(abi, '0x095ea7b3'),
    asset: new Func<[], {}, string>(abi, '0x38d52e0f'),
    backstop: new Func<[], {}, string>(abi, '0x7dea1817'),
    backstopBurn: new Func<
        [_owner: string, _shares: bigint],
        { _owner: string; _shares: bigint },
        bigint
    >(abi, '0xe45f37bd'),
    backstopDrain: new Func<
        [_amount: bigint, _recipient: string],
        { _amount: bigint; _recipient: string },
        []
    >(abi, '0xc2cb15de'),
    balanceOf: new Func<[account: string], { account: string }, bigint>(
        abi,
        '0x70a08231'
    ),
    coverage: new Func<
        [],
        {},
        [_reserves: bigint, _liabilities: bigint] & {
            _reserves: bigint
            _liabilities: bigint
        }
    >(abi, '0xee8f6a0e'),
    decimals: new Func<[], {}, number>(abi, '0x313ce567'),
    decreaseAllowance: new Func<
        [spender: string, subtractedValue: bigint],
        { spender: string; subtractedValue: bigint },
        boolean
    >(abi, '0xa457c2d7'),
    deposit: new Func<
        [_amount: bigint],
        { _amount: bigint },
        [_poolShares: bigint, _fee: bigint] & {
            _poolShares: bigint
            _fee: bigint
        }
    >(abi, '0xb6b55f25'),
    increaseAllowance: new Func<
        [spender: string, addedValue: bigint],
        { spender: string; addedValue: bigint },
        boolean
    >(abi, '0x39509351'),
    insuranceWithdrawalTimelock: new Func<[], {}, bigint>(abi, '0x0d3a7fd4'),
    insuranceWithdrawalUnlock: new Func<
        [_liquidityProvider: string],
        { _liquidityProvider: string },
        bigint
    >(abi, '0x5c6f4279'),
    name: new Func<[], {}, string>(abi, '0x06fdde03'),
    owner: new Func<[], {}, string>(abi, '0x8da5cb5b'),
    pause: new Func<[], {}, []>(abi, '0x8456cb59'),
    paused: new Func<[], {}, boolean>(abi, '0x5c975abb'),
    poolCap: new Func<[], {}, bigint>(abi, '0xb954dc57'),
    protocolTreasury: new Func<[], {}, string>(abi, '0x803db96d'),
    quoteSwapInto: new Func<[_amount: bigint], { _amount: bigint }, bigint>(
        abi,
        '0x3c945248'
    ),
    quoteSwapOut: new Func<[_amount: bigint], { _amount: bigint }, bigint>(
        abi,
        '0x8735c246'
    ),
    renounceOwnership: new Func<[], {}, []>(abi, '0x715018a6'),
    router: new Func<[], {}, string>(abi, '0xf887ea40'),
    setInsuranceWithdrawalTimelock: new Func<
        [_durationInBlocks: bigint],
        { _durationInBlocks: bigint },
        []
    >(abi, '0xcfcc238d'),
    setPoolCap: new Func<[_maxTokens: bigint], { _maxTokens: bigint }, []>(
        abi,
        '0xd835f535'
    ),
    setSwapFees: new Func<
        [_lpFeeBps: bigint, _backstopFeeBps: bigint, _protocolFeeBps: bigint],
        { _lpFeeBps: bigint; _backstopFeeBps: bigint; _protocolFeeBps: bigint },
        []
    >(abi, '0xeb43434e'),
    sharesTargetWorth: new Func<[_shares: bigint], { _shares: bigint }, bigint>(
        abi,
        '0xcc045745'
    ),
    slippageCurve: new Func<[], {}, string>(abi, '0xebe26b9e'),
    swapFees: new Func<
        [],
        {},
        [
            _lpFeeBps: bigint,
            _backstopFeeBps: bigint,
            _protocolFeeBps: bigint
        ] & {
            _lpFeeBps: bigint
            _backstopFeeBps: bigint
            _protocolFeeBps: bigint
        }
    >(abi, '0xb9ccf21d'),
    swapIntoFromRouter: new Func<
        [_amount: bigint],
        { _amount: bigint },
        bigint
    >(abi, '0x4d8ea83f'),
    swapOutFromRouter: new Func<[_amount: bigint], { _amount: bigint }, bigint>(
        abi,
        '0x5f79d44f'
    ),
    symbol: new Func<[], {}, string>(abi, '0x95d89b41'),
    totalSupply: new Func<[], {}, bigint>(abi, '0x18160ddd'),
    transfer: new Func<
        [to: string, amount: bigint],
        { to: string; amount: bigint },
        boolean
    >(abi, '0xa9059cbb'),
    transferFrom: new Func<
        [from: string, to: string, amount: bigint],
        { from: string; to: string; amount: bigint },
        boolean
    >(abi, '0x23b872dd'),
    transferOwnership: new Func<[newOwner: string], { newOwner: string }, []>(
        abi,
        '0xf2fde38b'
    ),
    unpause: new Func<[], {}, []>(abi, '0x3f4ba83a'),
    withdraw: new Func<
        [_shares: bigint, _minimumAmount: bigint],
        { _shares: bigint; _minimumAmount: bigint },
        [_finalAmount: bigint, _fee: bigint] & {
            _finalAmount: bigint
            _fee: bigint
        }
    >(abi, '0x441a3e70'),
}

export class Contract extends ContractBase {
    accumulatedSlippage(): Promise<bigint> {
        return this.eth_call(functions.accumulatedSlippage, [])
    }

    allowance(owner: string, spender: string): Promise<bigint> {
        return this.eth_call(functions.allowance, [owner, spender])
    }

    asset(): Promise<string> {
        return this.eth_call(functions.asset, [])
    }

    backstop(): Promise<string> {
        return this.eth_call(functions.backstop, [])
    }

    balanceOf(account: string): Promise<bigint> {
        return this.eth_call(functions.balanceOf, [account])
    }

    coverage(): Promise<
        [_reserves: bigint, _liabilities: bigint] & {
            _reserves: bigint
            _liabilities: bigint
        }
    > {
        return this.eth_call(functions.coverage, [])
    }

    decimals(): Promise<number> {
        return this.eth_call(functions.decimals, [])
    }

    insuranceWithdrawalTimelock(): Promise<bigint> {
        return this.eth_call(functions.insuranceWithdrawalTimelock, [])
    }

    insuranceWithdrawalUnlock(_liquidityProvider: string): Promise<bigint> {
        return this.eth_call(functions.insuranceWithdrawalUnlock, [
            _liquidityProvider,
        ])
    }

    name(): Promise<string> {
        return this.eth_call(functions.name, [])
    }

    owner(): Promise<string> {
        return this.eth_call(functions.owner, [])
    }

    paused(): Promise<boolean> {
        return this.eth_call(functions.paused, [])
    }

    poolCap(): Promise<bigint> {
        return this.eth_call(functions.poolCap, [])
    }

    protocolTreasury(): Promise<string> {
        return this.eth_call(functions.protocolTreasury, [])
    }

    quoteSwapInto(_amount: bigint): Promise<bigint> {
        return this.eth_call(functions.quoteSwapInto, [_amount])
    }

    quoteSwapOut(_amount: bigint): Promise<bigint> {
        return this.eth_call(functions.quoteSwapOut, [_amount])
    }

    router(): Promise<string> {
        return this.eth_call(functions.router, [])
    }

    sharesTargetWorth(_shares: bigint): Promise<bigint> {
        return this.eth_call(functions.sharesTargetWorth, [_shares])
    }

    slippageCurve(): Promise<string> {
        return this.eth_call(functions.slippageCurve, [])
    }

    swapFees(): Promise<
        [
            _lpFeeBps: bigint,
            _backstopFeeBps: bigint,
            _protocolFeeBps: bigint
        ] & {
            _lpFeeBps: bigint
            _backstopFeeBps: bigint
            _protocolFeeBps: bigint
        }
    > {
        return this.eth_call(functions.swapFees, [])
    }

    symbol(): Promise<string> {
        return this.eth_call(functions.symbol, [])
    }

    totalSupply(): Promise<bigint> {
        return this.eth_call(functions.totalSupply, [])
    }
}
