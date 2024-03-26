import { Abi, Bytes, encodeCall, decodeResult } from '@subsquid/ink-abi'

export const metadata = {
    contract: {
        authors: ['unknown'],
        name: 'MockOracle',
        version: '0.0.1',
    },
    source: {
        compiler: 'solang 0.3.2',
        hash: '0x8d16a4bd1f3071e0fb0965b6e6ca421975da6269e77340d5f080f81f2cb54023',
        language: 'Solidity 0.3.2',
    },
    spec: {
        constructors: [
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
                        label: '_price',
                        type: {
                            displayName: ['uint256'],
                            type: 3,
                        },
                    },
                ],
                default: false,
                docs: [''],
                label: 'new',
                payable: false,
                returnType: null,
                selector: '0x7d669750',
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
                type: 4,
            },
            blockNumber: {
                displayName: ['BlockNumber'],
                type: 5,
            },
            chainExtension: {
                displayName: [],
                type: 0,
            },
            hash: {
                displayName: ['Hash'],
                type: 6,
            },
            maxEventTopics: 4,
            timestamp: {
                displayName: ['Timestamp'],
                type: 5,
            },
        },
        events: [],
        lang_error: {
            displayName: ['SolidityError'],
            type: 10,
        },
        messages: [
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
                        label: '_price',
                        type: {
                            displayName: ['uint256'],
                            type: 3,
                        },
                    },
                ],
                default: false,
                docs: [''],
                label: 'updateCurrentPrices',
                mutates: true,
                payable: false,
                returnType: {
                    displayName: ['uint256'],
                    type: 3,
                },
                selector: '0xf97a7796',
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
                ],
                default: false,
                docs: [''],
                label: 'getAssetPrice',
                mutates: false,
                payable: false,
                returnType: {
                    displayName: ['uint256'],
                    type: 3,
                },
                selector: '0xb3596f07',
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
                                leaf: {
                                    key: '0x00000000',
                                    ty: 3,
                                },
                            },
                            root_key: '0x00000000',
                        },
                    },
                    name: 'currentPrices',
                },
            ],
            name: 'MockOracle',
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
                    primitive: 'u128',
                },
                path: ['uint128'],
            },
        },
        {
            id: 5,
            type: {
                def: {
                    primitive: 'u64',
                },
                path: ['uint64'],
            },
        },
        {
            id: 6,
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
            id: 7,
            type: {
                def: {
                    primitive: 'str',
                },
                path: ['string'],
            },
        },
        {
            id: 8,
            type: {
                def: {
                    composite: {
                        fields: [
                            {
                                type: 7,
                            },
                        ],
                    },
                },
                path: ['0x08c379a0'],
            },
        },
        {
            id: 9,
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
            id: 10,
            type: {
                def: {
                    variant: {
                        variants: [
                            {
                                fields: [
                                    {
                                        type: 8,
                                    },
                                ],
                                index: 0,
                                name: 'Error',
                            },
                            {
                                fields: [
                                    {
                                        type: 9,
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

    getAssetPrice(_asset: AccountId): Promise<uint256> {
        return this.stateCall('0xb3596f07', [_asset])
    }

    private async stateCall<T>(selector: string, args: any[]): Promise<T> {
        const input = _abi.encodeMessageInput(selector, args)
        const data = encodeCall(this.address, input)
        const result = await this.ctx._chain.rpc.call('state_call', [
            'ContractsApi_call',
            data,
            this.blockHash,
        ])
        const value = decodeResult(result)
        return _abi.decodeMessageOutput(selector, value)
    }
}

export type uint256 = bigint

export type AccountId = Bytes

export type Constructor = Constructor_new

/**
 *
 */
export interface Constructor_new {
    __kind: 'new'
    asset: AccountId
    price: uint256
}

export type Message = Message_getAssetPrice | Message_updateCurrentPrices

/**
 *
 */
export interface Message_getAssetPrice {
    __kind: 'getAssetPrice'
    asset: AccountId
}

/**
 *
 */
export interface Message_updateCurrentPrices {
    __kind: 'updateCurrentPrices'
    asset: AccountId
    price: uint256
}

export type Event = never

export type Result<T, E> =
    | { __kind: 'Ok'; value: T }
    | { __kind: 'Err'; value: E }
