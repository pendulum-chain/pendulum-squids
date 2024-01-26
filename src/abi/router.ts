import { Abi, Bytes, encodeCall, decodeResult } from '@subsquid/ink-abi'

export const metadata = {
    contract: {
        authors: ['unknown'],
        name: 'Router',
        version: '0.0.1',
    },
    source: {
        compiler: 'solang 0.3.2',
        hash: '0xc3a4799cb3feb885864b7bda2b7340893d52fc4f096024e42c5c59319e9cf4ed',
        language: 'Solidity 0.3.2',
    },
    spec: {
        constructors: [
            {
                args: [],
                default: false,
                docs: [''],
                label: 'new',
                payable: false,
                returnType: null,
                selector: '0x861731d5',
            },
        ],
        docs: [''],
        environment: {
            accountId: {
                displayName: ['AccountId'],
                type: 2,
            },
            balance: {
                displayName: ['Balance'],
                type: 7,
            },
            blockNumber: {
                displayName: ['BlockNumber'],
                type: 8,
            },
            chainExtension: {
                displayName: [],
                type: 0,
            },
            hash: {
                displayName: ['Hash'],
                type: 9,
            },
            maxEventTopics: 4,
            timestamp: {
                displayName: ['Timestamp'],
                type: 8,
            },
        },
        events: [
            {
                args: [
                    {
                        docs: [],
                        indexed: false,
                        label: 'account',
                        type: {
                            displayName: [
                                'ink_primitives',
                                'types',
                                'AccountId',
                            ],
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
                            displayName: [
                                'ink_primitives',
                                'types',
                                'AccountId',
                            ],
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
                            displayName: [
                                'ink_primitives',
                                'types',
                                'AccountId',
                            ],
                            type: 2,
                        },
                    },
                    {
                        docs: [],
                        indexed: true,
                        label: 'newOwner',
                        type: {
                            displayName: [
                                'ink_primitives',
                                'types',
                                'AccountId',
                            ],
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
                        indexed: false,
                        label: 'pool',
                        type: {
                            displayName: [
                                'ink_primitives',
                                'types',
                                'AccountId',
                            ],
                            type: 2,
                        },
                    },
                    {
                        docs: [],
                        indexed: false,
                        label: 'asset',
                        type: {
                            displayName: [
                                'ink_primitives',
                                'types',
                                'AccountId',
                            ],
                            type: 2,
                        },
                    },
                ],
                docs: ['Emitted when a new pool is registered'],
                label: 'SwapPoolRegistered',
            },
            {
                args: [
                    {
                        docs: [],
                        indexed: true,
                        label: 'sender',
                        type: {
                            displayName: [
                                'ink_primitives',
                                'types',
                                'AccountId',
                            ],
                            type: 2,
                        },
                    },
                    {
                        docs: [],
                        indexed: false,
                        label: 'amountIn',
                        type: {
                            displayName: ['uint256'],
                            type: 3,
                        },
                    },
                    {
                        docs: [],
                        indexed: false,
                        label: 'amountOut',
                        type: {
                            displayName: ['uint256'],
                            type: 3,
                        },
                    },
                    {
                        docs: [],
                        indexed: false,
                        label: 'tokenIn',
                        type: {
                            displayName: [
                                'ink_primitives',
                                'types',
                                'AccountId',
                            ],
                            type: 2,
                        },
                    },
                    {
                        docs: [],
                        indexed: false,
                        label: 'tokenOut',
                        type: {
                            displayName: [
                                'ink_primitives',
                                'types',
                                'AccountId',
                            ],
                            type: 2,
                        },
                    },
                    {
                        docs: [],
                        indexed: true,
                        label: 'to',
                        type: {
                            displayName: [
                                'ink_primitives',
                                'types',
                                'AccountId',
                            ],
                            type: 2,
                        },
                    },
                ],
                docs: ['Emitted on each swap'],
                label: 'Swap',
            },
        ],
        lang_error: {
            displayName: ['SolidityError'],
            type: 13,
        },
        messages: [
            {
                args: [],
                default: false,
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
                default: false,
                docs: [''],
                label: 'owner',
                mutates: false,
                payable: false,
                returnType: {
                    displayName: ['ink_primitives', 'types', 'AccountId'],
                    type: 2,
                },
                selector: '0x8da5cb5b',
            },
            {
                args: [],
                default: false,
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
                            displayName: [
                                'ink_primitives',
                                'types',
                                'AccountId',
                            ],
                            type: 2,
                        },
                    },
                ],
                default: false,
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
                        label: 'assetId',
                        type: {
                            displayName: [
                                'ink_primitives',
                                'types',
                                'AccountId',
                            ],
                            type: 2,
                        },
                    },
                ],
                default: false,
                docs: [''],
                label: 'poolByAsset',
                mutates: false,
                payable: false,
                returnType: {
                    displayName: ['ink_primitives', 'types', 'AccountId'],
                    type: 2,
                },
                selector: '0x06de94d8',
            },
            {
                args: [
                    {
                        label: 'assetId',
                        type: {
                            displayName: [
                                'ink_primitives',
                                'types',
                                'AccountId',
                            ],
                            type: 2,
                        },
                    },
                ],
                default: false,
                docs: [''],
                label: 'oracleByAsset',
                mutates: false,
                payable: false,
                returnType: {
                    displayName: ['ink_primitives', 'types', 'AccountId'],
                    type: 2,
                },
                selector: '0x38163032',
            },
            {
                args: [
                    {
                        label: '_asset',
                        type: {
                            displayName: [
                                'ink_primitives',
                                'types',
                                'AccountId',
                            ],
                            type: 2,
                        },
                    },
                    {
                        label: '_priceOracle',
                        type: {
                            displayName: [
                                'ink_primitives',
                                'types',
                                'AccountId',
                            ],
                            type: 2,
                        },
                    },
                ],
                default: false,
                docs: [
                    'Changes the pools priceOracle. Can only be set by the contract owner.',
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
                            displayName: [
                                'ink_primitives',
                                'types',
                                'AccountId',
                            ],
                            type: 2,
                        },
                    },
                    {
                        label: '_swapPool',
                        type: {
                            displayName: [
                                'ink_primitives',
                                'types',
                                'AccountId',
                            ],
                            type: 2,
                        },
                    },
                ],
                default: false,
                docs: ['Registers a newly created swap pool.'],
                label: 'registerPool',
                mutates: true,
                payable: false,
                returnType: null,
                selector: '0x7286e5e5',
            },
            {
                args: [],
                default: false,
                docs: ['Disable all swaps'],
                label: 'pause',
                mutates: true,
                payable: false,
                returnType: null,
                selector: '0x8456cb59',
            },
            {
                args: [],
                default: false,
                docs: ['Resume all swaps'],
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
                            displayName: ['uint256'],
                            type: 3,
                        },
                    },
                    {
                        label: '_amountOutMin',
                        type: {
                            displayName: ['uint256'],
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
                            displayName: [
                                'ink_primitives',
                                'types',
                                'AccountId',
                            ],
                            type: 2,
                        },
                    },
                    {
                        label: '_deadline',
                        type: {
                            displayName: ['uint256'],
                            type: 3,
                        },
                    },
                ],
                default: false,
                docs: [
                    'Swap some `_fromToken` tokens for `_toToken` tokens,\nensures `_amountOutMin` and `_deadline`, sends funds to `_to` address `msg.sender` needs to grant the chef contract a sufficient allowance beforehand',
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
                            displayName: ['uint256'],
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
                default: false,
                docs: [
                    'Get a quote for how many `_toToken` tokens `_amountIn` many `tokenIn`\ntokens can currently be swapped for.',
                ],
                label: 'getAmountOut',
                mutates: false,
                payable: false,
                returnType: {
                    displayName: ['uint256'],
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
                path: ['uint8'],
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
                path: ['ink_primitives', 'types', 'AccountId'],
            },
        },
        {
            id: 3,
            type: {
                def: {
                    primitive: 'u256',
                },
                path: ['uint256'],
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
        {
            id: 7,
            type: {
                def: {
                    primitive: 'u128',
                },
                path: ['uint128'],
            },
        },
        {
            id: 8,
            type: {
                def: {
                    primitive: 'u64',
                },
                path: ['uint64'],
            },
        },
        {
            id: 9,
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
                path: ['ink_primitives', 'types', 'Hash'],
            },
        },
        {
            id: 10,
            type: {
                def: {
                    primitive: 'str',
                },
                path: ['string'],
            },
        },
        {
            id: 11,
            type: {
                def: {
                    composite: {
                        fields: [
                            {
                                type: 10,
                            },
                        ],
                    },
                },
                path: ['0x08c379a0'],
            },
        },
        {
            id: 12,
            type: {
                def: {
                    composite: {
                        fields: [
                            {
                                type: 3,
                            },
                        ],
                    },
                },
                path: ['0x4e487b71'],
            },
        },
        {
            id: 13,
            type: {
                def: {
                    variant: {
                        variants: [
                            {
                                fields: [
                                    {
                                        type: 11,
                                    },
                                ],
                                index: 0,
                                name: 'Error',
                            },
                            {
                                fields: [
                                    {
                                        type: 12,
                                    },
                                ],
                                index: 1,
                                name: 'Panic',
                            },
                        ],
                    },
                },
                path: ['SolidityError'],
            },
        },
    ],
    version: '4',
}

const _abi = new Abi(metadata)

export function decodeEvent(bytes: Bytes): Event {
    return _abi.decodeEvent(bytes)
}

export function decodeMessage(bytes: Bytes): Message {
    return _abi.decodeMessage(bytes)
}

export function decodeConstructor(bytes: Bytes): Constructor {
    return _abi.decodeConstructor(bytes)
}

export interface Chain {
    rpc: {
        call<T = any>(method: string, params?: unknown[]): Promise<T>
    }
}

export interface ChainContext {
    _chain: Chain
}

export class Contract {
    constructor(
        private ctx: ChainContext,
        private address: Bytes,
        private blockHash?: Bytes
    ) {}

    paused(): Promise<bool> {
        return this.stateCall('0x5c975abb', [])
    }

    owner(): Promise<AccountId> {
        return this.stateCall('0x8da5cb5b', [])
    }

    poolByAsset(assetId: AccountId): Promise<AccountId> {
        return this.stateCall('0x06de94d8', [assetId])
    }

    oracleByAsset(assetId: AccountId): Promise<AccountId> {
        return this.stateCall('0x38163032', [assetId])
    }

    getAmountOut(
        _amountIn: uint256,
        _tokenInOut: AccountId[]
    ): Promise<uint256> {
        return this.stateCall('0xb8239ebb', [_amountIn, _tokenInOut])
    }

    private async stateCall<T>(selector: string, args: any[]): Promise<T> {
        let input = _abi.encodeMessageInput(selector, args)
        let data = encodeCall(this.address, input)
        let result = await this.ctx._chain.rpc.call('state_call', [
            'ContractsApi_call',
            data,
            this.blockHash,
        ])
        let value = decodeResult(result)
        return _abi.decodeMessageOutput(selector, value)
    }
}

export type uint256 = bigint

export type AccountId = Bytes

export type bool = boolean

export type Constructor = Constructor_new

/**
 *
 */
export interface Constructor_new {
    __kind: 'new'
}

export type Message =
    | Message_getAmountOut
    | Message_oracleByAsset
    | Message_owner
    | Message_pause
    | Message_paused
    | Message_poolByAsset
    | Message_registerPool
    | Message_renounceOwnership
    | Message_setPriceOracle
    | Message_swapExactTokensForTokens
    | Message_transferOwnership
    | Message_unpause

/**
 * Get a quote for how many `_toToken` tokens `_amountIn` many `tokenIn`
tokens can currently be swapped for.
 */
export interface Message_getAmountOut {
    __kind: 'getAmountOut'
    amountIn: uint256
    tokenInOut: AccountId[]
}

/**
 *
 */
export interface Message_oracleByAsset {
    __kind: 'oracleByAsset'
    assetId: AccountId
}

/**
 *
 */
export interface Message_owner {
    __kind: 'owner'
}

/**
 * Disable all swaps
 */
export interface Message_pause {
    __kind: 'pause'
}

/**
 *
 */
export interface Message_paused {
    __kind: 'paused'
}

/**
 *
 */
export interface Message_poolByAsset {
    __kind: 'poolByAsset'
    assetId: AccountId
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
 *
 */
export interface Message_renounceOwnership {
    __kind: 'renounceOwnership'
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
 * Swap some `_fromToken` tokens for `_toToken` tokens,
ensures `_amountOutMin` and `_deadline`, sends funds to `_to` address `msg.sender` needs to grant the chef contract a sufficient allowance beforehand
 */
export interface Message_swapExactTokensForTokens {
    __kind: 'swapExactTokensForTokens'
    amountIn: uint256
    amountOutMin: uint256
    tokenInOut: AccountId[]
    to: AccountId
    deadline: uint256
}

/**
 *
 */
export interface Message_transferOwnership {
    __kind: 'transferOwnership'
    newOwner: AccountId
}

/**
 * Resume all swaps
 */
export interface Message_unpause {
    __kind: 'unpause'
}

export type Event =
    | Event_OwnershipTransferred
    | Event_Paused
    | Event_Swap
    | Event_SwapPoolRegistered
    | Event_Unpaused

export interface Event_OwnershipTransferred {
    __kind: 'OwnershipTransferred'
    previousOwner: AccountId
    newOwner: AccountId
}

export interface Event_Paused {
    __kind: 'Paused'
    account: AccountId
}

export interface Event_Swap {
    __kind: 'Swap'
    sender: AccountId
    amountIn: uint256
    amountOut: uint256
    tokenIn: AccountId
    tokenOut: AccountId
    to: AccountId
}

export interface Event_SwapPoolRegistered {
    __kind: 'SwapPoolRegistered'
    pool: AccountId
    asset: AccountId
}

export interface Event_Unpaused {
    __kind: 'Unpaused'
    account: AccountId
}

export type Result<T, E> =
    | { __kind: 'Ok'; value: T }
    | { __kind: 'Err'; value: E }
