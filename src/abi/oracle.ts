import { Abi, Bytes, encodeCall, decodeResult } from '@subsquid/ink-abi'

export const metadata = {
    contract: {
        authors: ['unknown'],
        description:
            'PriceOracleWrapper\nPrice oracle that uses the native chain via chain extension. It stores _asset, _blockchain and _symbol for use by function getAssetPrice() which is called by Nabla.',
        name: 'PriceOracleWrapper',
        version: '0.0.1',
    },
    source: {
        compiler: 'solang 0.3.3',
        hash: '0x3a36fa4410e86146fe12a5cf152b7c1c0acfda3cf38ba0f4cb0c24b668f8e9c1',
        language: 'Solidity 0.3.3',
    },
    spec: {
        constructors: [
            {
                args: [
                    {
                        label: 'oracleKeys',
                        type: {
                            displayName: [],
                            type: 5,
                        },
                    },
                ],
                default: false,
                docs: [''],
                label: 'new',
                payable: false,
                returnType: null,
                selector: '0xd0656c89',
            },
        ],
        docs: [
            'PriceOracleWrapper\n\nPrice oracle that uses the native chain via chain extension. It stores _asset, _blockchain and _symbol for use by function getAssetPrice() which is called by Nabla.',
        ],
        environment: {
            accountId: {
                displayName: ['AccountId'],
                type: 2,
            },
            balance: {
                displayName: ['Balance'],
                type: 8,
            },
            blockNumber: {
                displayName: ['BlockNumber'],
                type: 9,
            },
            chainExtension: {
                displayName: [],
                type: 0,
            },
            hash: {
                displayName: ['Hash'],
                type: 12,
            },
            maxEventTopics: 4,
            timestamp: {
                displayName: ['Timestamp'],
                type: 9,
            },
        },
        events: [],
        lang_error: {
            displayName: ['SolidityError'],
            type: 15,
        },
        messages: [
            {
                args: [
                    {
                        label: '',
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
                    displayName: [
                        'PriceOracleWrapper',
                        'oracleByAsset',
                        'return_type',
                    ],
                    type: 6,
                },
                selector: '0x38163032',
            },
            {
                args: [
                    {
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
                default: false,
                docs: [''],
                label: 'getOracleKeyAsset',
                mutates: false,
                payable: false,
                returnType: {
                    displayName: ['ink_primitives', 'types', 'AccountId'],
                    type: 2,
                },
                selector: '0x1d6752d1',
            },
            {
                args: [
                    {
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
                default: false,
                docs: [''],
                label: 'getOracleKeyBlockchain',
                mutates: false,
                payable: false,
                returnType: {
                    displayName: ['string'],
                    type: 3,
                },
                selector: '0xf457eab5',
            },
            {
                args: [
                    {
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
                default: false,
                docs: [''],
                label: 'getOracleKeySymbol',
                mutates: false,
                payable: false,
                returnType: {
                    displayName: ['string'],
                    type: 3,
                },
                selector: '0x416c2844',
            },
            {
                args: [
                    {
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
                default: false,
                docs: [
                    'Returns the asset price in USD. This is called by Nabla and expected by their IPriceOracleGetter interface',
                ],
                label: 'getAssetPrice',
                mutates: true,
                payable: false,
                returnType: {
                    displayName: ['uint256'],
                    type: 7,
                },
                selector: '0xb3596f07',
            },
            {
                args: [
                    {
                        label: 'blockchain',
                        type: {
                            displayName: ['string'],
                            type: 3,
                        },
                    },
                    {
                        label: 'symbol',
                        type: {
                            displayName: ['string'],
                            type: 3,
                        },
                    },
                ],
                default: false,
                docs: [''],
                label: 'getAnyAssetSupply',
                mutates: true,
                payable: false,
                returnType: {
                    displayName: ['uint128'],
                    type: 8,
                },
                selector: '0xb27f53dd',
            },
            {
                args: [
                    {
                        label: 'blockchain',
                        type: {
                            displayName: ['string'],
                            type: 3,
                        },
                    },
                    {
                        label: 'symbol',
                        type: {
                            displayName: ['string'],
                            type: 3,
                        },
                    },
                ],
                default: false,
                docs: [''],
                label: 'getAnyAssetLastUpdateTimestamp',
                mutates: true,
                payable: false,
                returnType: {
                    displayName: ['uint64'],
                    type: 9,
                },
                selector: '0x30c8d868',
            },
            {
                args: [
                    {
                        label: 'blockchain',
                        type: {
                            displayName: ['string'],
                            type: 3,
                        },
                    },
                    {
                        label: 'symbol',
                        type: {
                            displayName: ['string'],
                            type: 3,
                        },
                    },
                ],
                default: false,
                docs: [''],
                label: 'getAnyAssetPrice',
                mutates: true,
                payable: false,
                returnType: {
                    displayName: ['uint128'],
                    type: 8,
                },
                selector: '0x96e182f6',
            },
            {
                args: [
                    {
                        label: 'blockchain',
                        type: {
                            displayName: ['string'],
                            type: 3,
                        },
                    },
                    {
                        label: 'symbol',
                        type: {
                            displayName: ['string'],
                            type: 3,
                        },
                    },
                ],
                default: false,
                docs: [
                    'performs the actual chain extension call to get the price feed. blockchain and symbol are the keys used to access a particular price feed from the chain.',
                ],
                label: 'getAnyAsset',
                mutates: true,
                payable: false,
                returnType: {
                    displayName: ['CoinInfo'],
                    type: 11,
                },
                selector: '0xb57ba499',
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
                                            name: 'asset',
                                        },
                                        {
                                            layout: {
                                                leaf: {
                                                    key: '0x00000000',
                                                    ty: 3,
                                                },
                                            },
                                            name: 'blockchain',
                                        },
                                        {
                                            layout: {
                                                leaf: {
                                                    key: '0x00000000',
                                                    ty: 3,
                                                },
                                            },
                                            name: 'symbol',
                                        },
                                    ],
                                    name: 'OracleKey',
                                },
                            },
                            root_key: '0x00000000',
                        },
                    },
                    name: 'oracleByAsset',
                },
            ],
            name: 'PriceOracleWrapper',
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
                    primitive: 'str',
                },
                path: ['string'],
            },
        },
        {
            id: 4,
            type: {
                def: {
                    composite: {
                        fields: [
                            {
                                name: 'asset',
                                type: 2,
                            },
                            {
                                name: 'blockchain',
                                type: 3,
                            },
                            {
                                name: 'symbol',
                                type: 3,
                            },
                        ],
                    },
                },
                path: ['OracleKey'],
            },
        },
        {
            id: 5,
            type: {
                def: {
                    sequence: {
                        type: 4,
                    },
                },
            },
        },
        {
            id: 6,
            type: {
                def: {
                    tuple: [2, 3, 3],
                },
                path: ['PriceOracleWrapper', 'oracleByAsset', 'return_type'],
            },
        },
        {
            id: 7,
            type: {
                def: {
                    primitive: 'u256',
                },
                path: ['uint256'],
            },
        },
        {
            id: 8,
            type: {
                def: {
                    primitive: 'u128',
                },
                path: ['uint128'],
            },
        },
        {
            id: 9,
            type: {
                def: {
                    primitive: 'u64',
                },
                path: ['uint64'],
            },
        },
        {
            id: 10,
            type: {
                def: {
                    sequence: {
                        type: 0,
                    },
                },
            },
        },
        {
            id: 11,
            type: {
                def: {
                    composite: {
                        fields: [
                            {
                                name: 'symbol',
                                type: 10,
                            },
                            {
                                name: 'name',
                                type: 10,
                            },
                            {
                                name: 'blockchain',
                                type: 10,
                            },
                            {
                                name: 'supply',
                                type: 8,
                            },
                            {
                                name: 'last_update_timestamp',
                                type: 9,
                            },
                            {
                                name: 'price',
                                type: 8,
                            },
                        ],
                    },
                },
                path: ['CoinInfo'],
            },
        },
        {
            id: 12,
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
            id: 13,
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
                path: ['0x08c379a0'],
            },
        },
        {
            id: 14,
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
                path: ['0x4e487b71'],
            },
        },
        {
            id: 15,
            type: {
                def: {
                    variant: {
                        variants: [
                            {
                                fields: [
                                    {
                                        type: 13,
                                    },
                                ],
                                index: 0,
                                name: 'Error',
                            },
                            {
                                fields: [
                                    {
                                        type: 14,
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

    oracleByAsset(): Promise<return_type> {
        return this.stateCall('0x38163032', [])
    }

    getOracleKeyAsset(asset: AccountId): Promise<AccountId> {
        return this.stateCall('0x1d6752d1', [asset])
    }

    getOracleKeyBlockchain(asset: AccountId): Promise<string> {
        return this.stateCall('0xf457eab5', [asset])
    }

    getOracleKeySymbol(asset: AccountId): Promise<string> {
        return this.stateCall('0x416c2844', [asset])
    }

    async stateCall<T>(selector: string, args: any[]): Promise<T> {
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

export type return_type = [AccountId, string, string]

export type AccountId = Bytes

export type Constructor = Constructor_new

/**
 *
 */
export interface Constructor_new {
    __kind: 'new'
    oracleKeys: OracleKey[]
}

export interface OracleKey {
    asset: AccountId
    blockchain: string
    symbol: string
}

export type Message =
    | Message_getAnyAsset
    | Message_getAnyAssetLastUpdateTimestamp
    | Message_getAnyAssetPrice
    | Message_getAnyAssetSupply
    | Message_getAssetPrice
    | Message_getOracleKeyAsset
    | Message_getOracleKeyBlockchain
    | Message_getOracleKeySymbol
    | Message_oracleByAsset

/**
 * performs the actual chain extension call to get the price feed. blockchain and symbol are the keys used to access a particular price feed from the chain.
 */
export interface Message_getAnyAsset {
    __kind: 'getAnyAsset'
    blockchain: string
    symbol: string
}

/**
 *
 */
export interface Message_getAnyAssetLastUpdateTimestamp {
    __kind: 'getAnyAssetLastUpdateTimestamp'
    blockchain: string
    symbol: string
}

/**
 *
 */
export interface Message_getAnyAssetPrice {
    __kind: 'getAnyAssetPrice'
    blockchain: string
    symbol: string
}

/**
 *
 */
export interface Message_getAnyAssetSupply {
    __kind: 'getAnyAssetSupply'
    blockchain: string
    symbol: string
}

/**
 * Returns the asset price in USD. This is called by Nabla and expected by their IPriceOracleGetter interface
 */
export interface Message_getAssetPrice {
    __kind: 'getAssetPrice'
    asset: AccountId
}

/**
 *
 */
export interface Message_getOracleKeyAsset {
    __kind: 'getOracleKeyAsset'
    asset: AccountId
}

/**
 *
 */
export interface Message_getOracleKeyBlockchain {
    __kind: 'getOracleKeyBlockchain'
    asset: AccountId
}

/**
 *
 */
export interface Message_getOracleKeySymbol {
    __kind: 'getOracleKeySymbol'
    asset: AccountId
}

/**
 *
 */
export interface Message_oracleByAsset {
    __kind: 'oracleByAsset'
}

export type Event = never

export type Result<T, E> =
    | { __kind: 'Ok'; value: T }
    | { __kind: 'Err'; value: E }