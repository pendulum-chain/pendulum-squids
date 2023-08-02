import { Abi, encodeCall, decodeResult } from '@subsquid/ink-abi'

export const metadata = {
    contract: {
        authors: ['unknown'],
        name: 'Router',
        version: '0.0.1',
    },
    source: {
        compiler: 'solang 0.2.2',
        hash: '0xfd8e170ed515f435015416d1d85ab4c87b6ae7bb4727f79ca0b6e79577f286f3',
        language: 'Solidity 0.2.2',
    },
    spec: {
        constructors: [
            {
                args: [],
                docs: [''],
                label: 'new',
                payable: false,
                returnType: null,
                selector: '0x861731d5',
            },
        ],
        docs: [''],
        events: [
            {
                args: [
                    {
                        docs: [],
                        indexed: false,
                        label: 'account',
                        type: {
                            displayName: ['ink_env', 'types', 'AccountId'],
                            type: 2,
                        },
                    },
                ],
                docs: [''],
                label: 'Paused',
            },
            {
                args: [
                    {
                        docs: [],
                        indexed: false,
                        label: 'account',
                        type: {
                            displayName: ['ink_env', 'types', 'AccountId'],
                            type: 2,
                        },
                    },
                ],
                docs: [''],
                label: 'Unpaused',
            },
            {
                args: [
                    {
                        docs: [],
                        indexed: true,
                        label: 'previousOwner',
                        type: {
                            displayName: ['ink_env', 'types', 'AccountId'],
                            type: 2,
                        },
                    },
                    {
                        docs: [],
                        indexed: true,
                        label: 'newOwner',
                        type: {
                            displayName: ['ink_env', 'types', 'AccountId'],
                            type: 2,
                        },
                    },
                ],
                docs: [''],
                label: 'OwnershipTransferred',
            },
            {
                args: [
                    {
                        docs: [],
                        indexed: true,
                        label: 'sender',
                        type: {
                            displayName: ['ink_env', 'types', 'AccountId'],
                            type: 2,
                        },
                    },
                    {
                        docs: [],
                        indexed: false,
                        label: 'amountIn',
                        type: {
                            displayName: ['u256'],
                            type: 3,
                        },
                    },
                    {
                        docs: [],
                        indexed: false,
                        label: 'amountOut',
                        type: {
                            displayName: ['u256'],
                            type: 3,
                        },
                    },
                    {
                        docs: [],
                        indexed: false,
                        label: 'tokenIn',
                        type: {
                            displayName: ['ink_env', 'types', 'AccountId'],
                            type: 2,
                        },
                    },
                    {
                        docs: [],
                        indexed: false,
                        label: 'tokenOut',
                        type: {
                            displayName: ['ink_env', 'types', 'AccountId'],
                            type: 2,
                        },
                    },
                    {
                        docs: [],
                        indexed: true,
                        label: 'to',
                        type: {
                            displayName: ['ink_env', 'types', 'AccountId'],
                            type: 2,
                        },
                    },
                ],
                docs: ['Emitted on each swap\n\n'],
                label: 'Swap',
            },
        ],
        lang_error: {
            displayName: [],
            type: 0,
        },
        messages: [
            {
                args: [],
                docs: [''],
                label: 'paused',
                mutates: false,
                payable: false,
                returnType: {
                    displayName: ['bool'],
                    type: 4,
                },
                selector: '0x5c975abb',
            },
            {
                args: [],
                docs: [''],
                label: 'owner',
                mutates: false,
                payable: false,
                returnType: {
                    displayName: ['ink_env', 'types', 'AccountId'],
                    type: 2,
                },
                selector: '0x8da5cb5b',
            },
            {
                args: [],
                docs: [''],
                label: 'renounceOwnership',
                mutates: true,
                payable: false,
                returnType: null,
                selector: '0x715018a6',
            },
            {
                args: [
                    {
                        label: 'newOwner',
                        type: {
                            displayName: ['ink_env', 'types', 'AccountId'],
                            type: 2,
                        },
                    },
                ],
                docs: [''],
                label: 'transferOwnership',
                mutates: true,
                payable: false,
                returnType: null,
                selector: '0xf2fde38b',
            },
            {
                args: [
                    {
                        label: '',
                        type: {
                            displayName: ['ink_env', 'types', 'AccountId'],
                            type: 2,
                        },
                    },
                ],
                docs: [''],
                label: 'poolByAsset',
                mutates: false,
                payable: false,
                returnType: {
                    displayName: ['ink_env', 'types', 'AccountId'],
                    type: 2,
                },
                selector: '0x06de94d8',
            },
            {
                args: [
                    {
                        label: '',
                        type: {
                            displayName: ['ink_env', 'types', 'AccountId'],
                            type: 2,
                        },
                    },
                ],
                docs: [''],
                label: 'oracleByAsset',
                mutates: false,
                payable: false,
                returnType: {
                    displayName: ['ink_env', 'types', 'AccountId'],
                    type: 2,
                },
                selector: '0x38163032',
            },
            {
                args: [
                    {
                        label: '_asset',
                        type: {
                            displayName: ['ink_env', 'types', 'AccountId'],
                            type: 2,
                        },
                    },
                    {
                        label: '_priceOracle',
                        type: {
                            displayName: ['ink_env', 'types', 'AccountId'],
                            type: 2,
                        },
                    },
                ],
                docs: [
                    'Changes the pools priceOracle. Can only be set by the contract owner.\n\n',
                ],
                label: 'setPriceOracle',
                mutates: true,
                payable: false,
                returnType: null,
                selector: '0x67a74ddc',
            },
            {
                args: [
                    {
                        label: '_asset',
                        type: {
                            displayName: ['ink_env', 'types', 'AccountId'],
                            type: 2,
                        },
                    },
                    {
                        label: '_swapPool',
                        type: {
                            displayName: ['ink_env', 'types', 'AccountId'],
                            type: 2,
                        },
                    },
                ],
                docs: ['Registers a newly created swap pool.\n\n'],
                label: 'registerPool',
                mutates: true,
                payable: false,
                returnType: null,
                selector: '0x7286e5e5',
            },
            {
                args: [],
                docs: ['Disable all swaps\n\n'],
                label: 'pause',
                mutates: true,
                payable: false,
                returnType: null,
                selector: '0x8456cb59',
            },
            {
                args: [],
                docs: ['Resume all swaps\n\n'],
                label: 'unpause',
                mutates: true,
                payable: false,
                returnType: null,
                selector: '0x3f4ba83a',
            },
            {
                args: [
                    {
                        label: '_amountIn',
                        type: {
                            displayName: ['u256'],
                            type: 3,
                        },
                    },
                    {
                        label: '_amountOutMin',
                        type: {
                            displayName: ['u256'],
                            type: 3,
                        },
                    },
                    {
                        label: '_tokenInOut',
                        type: {
                            displayName: [],
                            type: 6,
                        },
                    },
                    {
                        label: '_to',
                        type: {
                            displayName: ['ink_env', 'types', 'AccountId'],
                            type: 2,
                        },
                    },
                    {
                        label: '_deadline',
                        type: {
                            displayName: ['u256'],
                            type: 3,
                        },
                    },
                ],
                docs: [
                    'Swap some `_fromToken` tokens for `_toToken` tokens,\nensures `_amountOutMin` and `_deadline`, sends funds to `_to` address `msg.sender` needs to grant the chef contract a sufficient allowance beforehand\n\n',
                ],
                label: 'swapExactTokensForTokens',
                mutates: true,
                payable: false,
                returnType: {
                    displayName: [],
                    type: 5,
                },
                selector: '0x38ed1739',
            },
            {
                args: [
                    {
                        label: '_amountIn',
                        type: {
                            displayName: ['u256'],
                            type: 3,
                        },
                    },
                    {
                        label: '_tokenInOut',
                        type: {
                            displayName: [],
                            type: 6,
                        },
                    },
                ],
                docs: [
                    'Get a quote for how many `_toToken` tokens `_amountIn` many `tokenIn`\ntokens can currently be swapped for.\n\n',
                ],
                label: 'getAmountOut',
                mutates: false,
                payable: false,
                returnType: {
                    displayName: ['u256'],
                    type: 3,
                },
                selector: '0xb8239ebb',
            },
        ],
    },
    storage: {
        struct: {
            fields: [
                {
                    layout: {
                        root: {
                            layout: {
                                struct: {
                                    fields: [
                                        {
                                            layout: {
                                                leaf: {
                                                    key: '0x00000000',
                                                    ty: 1,
                                                },
                                            },
                                            name: '',
                                        },
                                    ],
                                    name: 'AccountId',
                                },
                            },
                            root_key: '0x00000000',
                        },
                    },
                    name: '_owner',
                },
                {
                    layout: {
                        root: {
                            layout: {
                                leaf: {
                                    key: '0x00000001',
                                    ty: 3,
                                },
                            },
                            root_key: '0x00000001',
                        },
                    },
                    name: '_status',
                },
                {
                    layout: {
                        root: {
                            layout: {
                                leaf: {
                                    key: '0x00000002',
                                    ty: 4,
                                },
                            },
                            root_key: '0x00000002',
                        },
                    },
                    name: '_paused',
                },
                {
                    layout: {
                        root: {
                            layout: {
                                struct: {
                                    fields: [
                                        {
                                            layout: {
                                                leaf: {
                                                    key: '0x00000003',
                                                    ty: 1,
                                                },
                                            },
                                            name: '',
                                        },
                                    ],
                                    name: 'AccountId',
                                },
                            },
                            root_key: '0x00000003',
                        },
                    },
                    name: 'poolByAsset',
                },
                {
                    layout: {
                        root: {
                            layout: {
                                struct: {
                                    fields: [
                                        {
                                            layout: {
                                                leaf: {
                                                    key: '0x00000004',
                                                    ty: 1,
                                                },
                                            },
                                            name: '',
                                        },
                                    ],
                                    name: 'AccountId',
                                },
                            },
                            root_key: '0x00000004',
                        },
                    },
                    name: 'oracleByAsset',
                },
            ],
            name: 'Router',
        },
    },
    types: [
        {
            id: 0,
            type: {
                def: {
                    primitive: 'u8',
                },
                path: ['u8'],
            },
        },
        {
            id: 1,
            type: {
                def: {
                    array: {
                        len: 32,
                        type: 0,
                    },
                },
            },
        },
        {
            id: 2,
            type: {
                def: {
                    composite: {
                        fields: [
                            {
                                type: 1,
                            },
                        ],
                    },
                },
                path: ['ink_env', 'types', 'AccountId'],
            },
        },
        {
            id: 3,
            type: {
                def: {
                    primitive: 'u256',
                },
                path: ['u256'],
            },
        },
        {
            id: 4,
            type: {
                def: {
                    primitive: 'bool',
                },
                path: ['bool'],
            },
        },
        {
            id: 5,
            type: {
                def: {
                    sequence: {
                        type: 3,
                    },
                },
            },
        },
        {
            id: 6,
            type: {
                def: {
                    sequence: {
                        type: 2,
                    },
                },
            },
        },
    ],
    version: '4',
}

const _abi = new Abi(metadata)

export function decodeEvent(hex: string): Event {
    return _abi.decodeEvent(hex)
}

export function decodeMessage(hex: string): Message {
    return _abi.decodeMessage(hex)
}

export function decodeConstructor(hex: string): Constructor {
    return _abi.decodeConstructor(hex)
}

export interface Chain {
    client: {
        call: <T = any>(method: string, params?: unknown[]) => Promise<T>
    }
}

export interface ChainContext {
    _chain: Chain
}

export class Contract {
    constructor(
        private ctx: ChainContext,
        private address: string,
        private blockHash?: string
    ) {}

    paused(): Promise<boolean> {
        return this.stateCall('0x5c975abb', [])
    }

    owner(): Promise<AccountId> {
        return this.stateCall('0x8da5cb5b', [])
    }

    poolByAsset(pool: AccountId): Promise<AccountId> {
        return this.stateCall('0x06de94d8', [pool])
    }

    oracleByAsset(oracle: AccountId): Promise<AccountId> {
        return this.stateCall('0x38163032', [oracle])
    }

    getAmountOut(_amountIn: u256, _tokenInOut: AccountId[]): Promise<u256> {
        return this.stateCall('0xb8239ebb', [_amountIn, _tokenInOut])
    }

    private async stateCall<T>(selector: string, args: any[]): Promise<T> {
        let input = _abi.encodeMessageInput(selector, args)
        let data = encodeCall(this.address, input)
        let result = await this.ctx._chain.client.call('state_call', [
            'ContractsApi_call',
            data,
            this.blockHash,
        ])
        let value = decodeResult(result)
        return _abi.decodeMessageOutput(selector, value)
    }
}

export type Event =
    | Event_Paused
    | Event_Unpaused
    | Event_OwnershipTransferred
    | Event_Swap

export interface Event_Paused {
    __kind: 'Paused'
    account: AccountId
}

export interface Event_Unpaused {
    __kind: 'Unpaused'
    account: AccountId
}

export interface Event_OwnershipTransferred {
    __kind: 'OwnershipTransferred'
    previousOwner: AccountId
    newOwner: AccountId
}

export interface Event_Swap {
    __kind: 'Swap'
    sender: AccountId
    amountIn: u256
    amountOut: u256
    tokenIn: AccountId
    tokenOut: AccountId
    to: AccountId
}

export type Message =
    | Message_paused
    | Message_owner
    | Message_renounceOwnership
    | Message_transferOwnership
    | Message_poolByAsset
    | Message_oracleByAsset
    | Message_setPriceOracle
    | Message_registerPool
    | Message_pause
    | Message_unpause
    | Message_swapExactTokensForTokens
    | Message_getAmountOut

/**
 *
 */
export interface Message_paused {
    __kind: 'paused'
}

/**
 *
 */
export interface Message_owner {
    __kind: 'owner'
}

/**
 *
 */
export interface Message_renounceOwnership {
    __kind: 'renounceOwnership'
}

/**
 *
 */
export interface Message_transferOwnership {
    __kind: 'transferOwnership'
    newOwner: AccountId
}

/**
 *
 */
export interface Message_poolByAsset {
    __kind: 'poolByAsset'
    pool: AccountId
}

/**
 *
 */
export interface Message_oracleByAsset {
    __kind: 'oracleByAsset'
    oracle: AccountId
}

/**
 * Changes the pools priceOracle. Can only be set by the contract owner.


 */
export interface Message_setPriceOracle {
    __kind: 'setPriceOracle'
    asset: AccountId
    priceOracle: AccountId
}

/**
 * Registers a newly created swap pool.


 */
export interface Message_registerPool {
    __kind: 'registerPool'
    asset: AccountId
    swapPool: AccountId
}

/**
 * Disable all swaps


 */
export interface Message_pause {
    __kind: 'pause'
}

/**
 * Resume all swaps


 */
export interface Message_unpause {
    __kind: 'unpause'
}

/**
 * Swap some `_fromToken` tokens for `_toToken` tokens,
ensures `_amountOutMin` and `_deadline`, sends funds to `_to` address `msg.sender` needs to grant the chef contract a sufficient allowance beforehand


 */
export interface Message_swapExactTokensForTokens {
    __kind: 'swapExactTokensForTokens'
    amountIn: u256
    amountOutMin: u256
    tokenInOut: AccountId[]
    to: AccountId
    deadline: u256
}

/**
 * Get a quote for how many `_toToken` tokens `_amountIn` many `tokenIn`
tokens can currently be swapped for.


 */
export interface Message_getAmountOut {
    __kind: 'getAmountOut'
    amountIn: u256
    tokenInOut: AccountId[]
}

export type Constructor = Constructor_new

/**
 *
 */
export interface Constructor_new {
    __kind: 'new'
}

export type AccountId = Uint8Array

export type u256 = bigint

export type Result<T, E> =
    | { __kind: 'Ok'; value: T }
    | { __kind: 'Err'; value: E }
