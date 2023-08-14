import { Abi, encodeCall, decodeResult } from '@subsquid/ink-abi'

export const metadata = {
    contract: {
        authors: ['unknown'],
        name: 'MockOracle',
        version: '0.0.1',
    },
    source: {
        compiler: 'solang 0.2.2',
        hash: '0xc23059b5813334e0c17dfae3a524ae8b8dda5cdeedd8d2914decf62990e26b5b',
        language: 'Solidity 0.2.2',
    },
    spec: {
        constructors: [
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
                        label: '_price',
                        type: {
                            displayName: ['u256'],
                            type: 3,
                        },
                    },
                ],
                docs: [''],
                label: 'new',
                payable: false,
                returnType: null,
                selector: '0x7d669750',
            },
        ],
        docs: [''],
        events: [],
        lang_error: {
            displayName: [],
            type: 0,
        },
        messages: [
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
                        label: '_price',
                        type: {
                            displayName: ['u256'],
                            type: 3,
                        },
                    },
                ],
                docs: [''],
                label: 'updateCurrentPrices',
                mutates: true,
                payable: false,
                returnType: {
                    displayName: ['u256'],
                    type: 3,
                },
                selector: '0xf97a7796',
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
                ],
                docs: [''],
                label: 'getAssetPrice',
                mutates: false,
                payable: false,
                returnType: {
                    displayName: ['u256'],
                    type: 3,
                },
                selector: '0xb3596f07',
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
                ],
                docs: [''],
                label: 'getAssetPriceReciprocal',
                mutates: false,
                payable: false,
                returnType: {
                    displayName: ['u256'],
                    type: 3,
                },
                selector: '0x2d664ca2',
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

    getAssetPrice(_asset: AccountId): Promise<u256> {
        return this.stateCall('0xb3596f07', [_asset])
    }

    getAssetPriceReciprocal(_asset: AccountId): Promise<u256> {
        return this.stateCall('0x2d664ca2', [_asset])
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

export type Event = never

export type Message =
    | Message_updateCurrentPrices
    | Message_getAssetPrice
    | Message_getAssetPriceReciprocal

/**
 *
 */
export interface Message_updateCurrentPrices {
    __kind: 'updateCurrentPrices'
    asset: AccountId
    price: u256
}

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
export interface Message_getAssetPriceReciprocal {
    __kind: 'getAssetPriceReciprocal'
    asset: AccountId
}

export type Constructor = Constructor_new

/**
 *
 */
export interface Constructor_new {
    __kind: 'new'
    asset: AccountId
    price: u256
}

export type AccountId = Uint8Array

export type u256 = bigint

export type Result<T, E> =
    | { __kind: 'Ok'; value: T }
    | { __kind: 'Err'; value: E }
