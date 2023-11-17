import { Abi, Bytes, encodeCall, decodeResult } from '@subsquid/ink-abi'

export const metadata = {
    contract: {
        authors: ['unknown'],
        name: 'TestableERC20Wrapper',
        version: '0.0.1',
    },
    source: {
        compiler: 'solang 0.3.2',
        hash: '0xcb7e8effdd0165c396793be92cac69d3a78f35d496a4d9a9423e84aac20c5eb4',
        language: 'Solidity 0.3.2',
    },
    spec: {
        constructors: [
            {
                args: [
                    {
                        label: 'name_',
                        type: {
                            displayName: ['string'],
                            type: 0,
                        },
                    },
                    {
                        label: 'symbol_',
                        type: {
                            displayName: ['string'],
                            type: 0,
                        },
                    },
                    {
                        label: 'decimals_',
                        type: {
                            displayName: ['uint8'],
                            type: 1,
                        },
                    },
                    {
                        label: 'variant_',
                        type: {
                            displayName: [],
                            type: 2,
                        },
                    },
                    {
                        label: 'index_',
                        type: {
                            displayName: [],
                            type: 2,
                        },
                    },
                    {
                        label: 'code_',
                        type: {
                            displayName: [],
                            type: 3,
                        },
                    },
                    {
                        label: 'issuer_',
                        type: {
                            displayName: [],
                            type: 4,
                        },
                    },
                ],
                default: false,
                docs: [''],
                label: 'new',
                payable: false,
                returnType: null,
                selector: '0xd3b751bd',
            },
        ],
        docs: [''],
        environment: {
            accountId: {
                displayName: ['AccountId'],
                type: 6,
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
                type: 10,
            },
            maxEventTopics: 4,
            timestamp: {
                displayName: ['Timestamp'],
                type: 9,
            },
        },
        events: [
            {
                args: [
                    {
                        docs: [],
                        indexed: true,
                        label: 'from',
                        type: {
                            displayName: [
                                'ink_primitives',
                                'types',
                                'AccountId',
                            ],
                            type: 6,
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
                            type: 6,
                        },
                    },
                    {
                        docs: [],
                        indexed: false,
                        label: 'value',
                        type: {
                            displayName: ['uint256'],
                            type: 5,
                        },
                    },
                ],
                docs: [''],
                label: 'Transfer',
            },
            {
                args: [
                    {
                        docs: [],
                        indexed: true,
                        label: 'owner',
                        type: {
                            displayName: [
                                'ink_primitives',
                                'types',
                                'AccountId',
                            ],
                            type: 6,
                        },
                    },
                    {
                        docs: [],
                        indexed: true,
                        label: 'spender',
                        type: {
                            displayName: [
                                'ink_primitives',
                                'types',
                                'AccountId',
                            ],
                            type: 6,
                        },
                    },
                    {
                        docs: [],
                        indexed: false,
                        label: 'value',
                        type: {
                            displayName: ['uint256'],
                            type: 5,
                        },
                    },
                ],
                docs: [''],
                label: 'Approval',
            },
            {
                args: [
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
                            type: 6,
                        },
                    },
                    {
                        docs: [],
                        indexed: false,
                        label: 'value',
                        type: {
                            displayName: ['uint256'],
                            type: 5,
                        },
                    },
                ],
                docs: [''],
                label: 'Mint',
            },
            {
                args: [
                    {
                        docs: [],
                        indexed: true,
                        label: 'from',
                        type: {
                            displayName: [
                                'ink_primitives',
                                'types',
                                'AccountId',
                            ],
                            type: 6,
                        },
                    },
                    {
                        docs: [],
                        indexed: false,
                        label: 'value',
                        type: {
                            displayName: ['uint256'],
                            type: 5,
                        },
                    },
                ],
                docs: [''],
                label: 'Burn',
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
                label: 'name',
                mutates: false,
                payable: false,
                returnType: {
                    displayName: ['string'],
                    type: 0,
                },
                selector: '0x06fdde03',
            },
            {
                args: [],
                default: false,
                docs: [''],
                label: 'symbol',
                mutates: false,
                payable: false,
                returnType: {
                    displayName: ['string'],
                    type: 0,
                },
                selector: '0x95d89b41',
            },
            {
                args: [],
                default: false,
                docs: [''],
                label: 'decimals',
                mutates: false,
                payable: false,
                returnType: {
                    displayName: ['uint8'],
                    type: 1,
                },
                selector: '0x313ce567',
            },
            {
                args: [],
                default: false,
                docs: [''],
                label: 'totalSupply',
                mutates: true,
                payable: false,
                returnType: {
                    displayName: ['uint256'],
                    type: 5,
                },
                selector: '0x18160ddd',
            },
            {
                args: [
                    {
                        label: '_owner',
                        type: {
                            displayName: [
                                'ink_primitives',
                                'types',
                                'AccountId',
                            ],
                            type: 6,
                        },
                    },
                ],
                default: false,
                docs: [''],
                label: 'balanceOf',
                mutates: true,
                payable: false,
                returnType: {
                    displayName: ['uint256'],
                    type: 5,
                },
                selector: '0x70a08231',
            },
            {
                args: [
                    {
                        label: '_to',
                        type: {
                            displayName: [
                                'ink_primitives',
                                'types',
                                'AccountId',
                            ],
                            type: 6,
                        },
                    },
                    {
                        label: '_amount',
                        type: {
                            displayName: ['uint256'],
                            type: 5,
                        },
                    },
                ],
                default: false,
                docs: [''],
                label: 'transfer',
                mutates: true,
                payable: false,
                returnType: {
                    displayName: ['bool'],
                    type: 7,
                },
                selector: '0xa9059cbb',
            },
            {
                args: [
                    {
                        label: '_owner',
                        type: {
                            displayName: [
                                'ink_primitives',
                                'types',
                                'AccountId',
                            ],
                            type: 6,
                        },
                    },
                    {
                        label: '_spender',
                        type: {
                            displayName: [
                                'ink_primitives',
                                'types',
                                'AccountId',
                            ],
                            type: 6,
                        },
                    },
                ],
                default: false,
                docs: [''],
                label: 'allowance',
                mutates: true,
                payable: false,
                returnType: {
                    displayName: ['uint256'],
                    type: 5,
                },
                selector: '0xdd62ed3e',
            },
            {
                args: [
                    {
                        label: '_spender',
                        type: {
                            displayName: [
                                'ink_primitives',
                                'types',
                                'AccountId',
                            ],
                            type: 6,
                        },
                    },
                    {
                        label: '_amount',
                        type: {
                            displayName: ['uint256'],
                            type: 5,
                        },
                    },
                ],
                default: false,
                docs: [''],
                label: 'approve',
                mutates: true,
                payable: false,
                returnType: {
                    displayName: ['bool'],
                    type: 7,
                },
                selector: '0x095ea7b3',
            },
            {
                args: [
                    {
                        label: '_from',
                        type: {
                            displayName: [
                                'ink_primitives',
                                'types',
                                'AccountId',
                            ],
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
                            type: 6,
                        },
                    },
                    {
                        label: '_amount',
                        type: {
                            displayName: ['uint256'],
                            type: 5,
                        },
                    },
                ],
                default: false,
                docs: [''],
                label: 'transferFrom',
                mutates: true,
                payable: false,
                returnType: {
                    displayName: ['bool'],
                    type: 7,
                },
                selector: '0x23b872dd',
            },
            {
                args: [
                    {
                        label: '_to',
                        type: {
                            displayName: [
                                'ink_primitives',
                                'types',
                                'AccountId',
                            ],
                            type: 6,
                        },
                    },
                    {
                        label: '_amount',
                        type: {
                            displayName: ['uint256'],
                            type: 5,
                        },
                    },
                ],
                default: false,
                docs: [''],
                label: 'mint',
                mutates: true,
                payable: false,
                returnType: {
                    displayName: ['bool'],
                    type: 7,
                },
                selector: '0x40c10f19',
            },
            {
                args: [
                    {
                        label: '_from',
                        type: {
                            displayName: [
                                'ink_primitives',
                                'types',
                                'AccountId',
                            ],
                            type: 6,
                        },
                    },
                    {
                        label: '_amount',
                        type: {
                            displayName: ['uint256'],
                            type: 5,
                        },
                    },
                ],
                default: false,
                docs: [''],
                label: 'burn',
                mutates: true,
                payable: false,
                returnType: {
                    displayName: ['bool'],
                    type: 7,
                },
                selector: '0x9dc29fac',
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
                                    ty: 0,
                                },
                            },
                            root_key: '0x00000000',
                        },
                    },
                    name: '_name',
                },
                {
                    layout: {
                        root: {
                            layout: {
                                leaf: {
                                    key: '0x00000001',
                                    ty: 0,
                                },
                            },
                            root_key: '0x00000001',
                        },
                    },
                    name: '_symbol',
                },
                {
                    layout: {
                        root: {
                            layout: {
                                leaf: {
                                    key: '0x00000002',
                                    ty: 1,
                                },
                            },
                            root_key: '0x00000002',
                        },
                    },
                    name: '_decimals',
                },
                {
                    layout: {
                        root: {
                            layout: {
                                leaf: {
                                    key: '0x00000003',
                                    ty: 2,
                                },
                            },
                            root_key: '0x00000003',
                        },
                    },
                    name: '_variant',
                },
                {
                    layout: {
                        root: {
                            layout: {
                                leaf: {
                                    key: '0x00000004',
                                    ty: 2,
                                },
                            },
                            root_key: '0x00000004',
                        },
                    },
                    name: '_index',
                },
                {
                    layout: {
                        root: {
                            layout: {
                                leaf: {
                                    key: '0x00000005',
                                    ty: 3,
                                },
                            },
                            root_key: '0x00000005',
                        },
                    },
                    name: '_code',
                },
                {
                    layout: {
                        root: {
                            layout: {
                                leaf: {
                                    key: '0x00000006',
                                    ty: 4,
                                },
                            },
                            root_key: '0x00000006',
                        },
                    },
                    name: '_issuer',
                },
            ],
            name: 'TestableERC20Wrapper',
        },
    },
    types: [
        {
            id: 0,
            type: {
                def: {
                    primitive: 'str',
                },
                path: ['string'],
            },
        },
        {
            id: 1,
            type: {
                def: {
                    primitive: 'u8',
                },
                path: ['uint8'],
            },
        },
        {
            id: 2,
            type: {
                def: {
                    array: {
                        len: 1,
                        type: 1,
                    },
                },
            },
        },
        {
            id: 3,
            type: {
                def: {
                    array: {
                        len: 12,
                        type: 1,
                    },
                },
            },
        },
        {
            id: 4,
            type: {
                def: {
                    array: {
                        len: 32,
                        type: 1,
                    },
                },
            },
        },
        {
            id: 5,
            type: {
                def: {
                    primitive: 'u256',
                },
                path: ['uint256'],
            },
        },
        {
            id: 6,
            type: {
                def: {
                    composite: {
                        fields: [
                            {
                                type: 4,
                            },
                        ],
                    },
                },
                path: ['ink_primitives', 'types', 'AccountId'],
            },
        },
        {
            id: 7,
            type: {
                def: {
                    primitive: 'bool',
                },
                path: ['bool'],
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
                    composite: {
                        fields: [
                            {
                                type: 4,
                            },
                        ],
                    },
                },
                path: ['ink_primitives', 'types', 'Hash'],
            },
        },
        {
            id: 11,
            type: {
                def: {
                    composite: {
                        fields: [
                            {
                                type: 0,
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
                                type: 5,
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

    name(): Promise<string> {
        return this.stateCall('0x06fdde03', [])
    }

    symbol(): Promise<string> {
        return this.stateCall('0x95d89b41', [])
    }

    decimals(): Promise<uint8> {
        return this.stateCall('0x313ce567', [])
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

export type uint8 = number

export type Constructor = Constructor_new

/**
 *
 */
export interface Constructor_new {
    __kind: 'new'
    name: string
    symbol: string
    decimals: uint8
    variant: Bytes
    index: Bytes
    code: Bytes
    issuer: Bytes
}

export type Message =
    | Message_allowance
    | Message_approve
    | Message_balanceOf
    | Message_burn
    | Message_decimals
    | Message_mint
    | Message_name
    | Message_symbol
    | Message_totalSupply
    | Message_transfer
    | Message_transferFrom

/**
 *
 */
export interface Message_allowance {
    __kind: 'allowance'
    owner: AccountId
    spender: AccountId
}

/**
 *
 */
export interface Message_approve {
    __kind: 'approve'
    spender: AccountId
    amount: uint256
}

/**
 *
 */
export interface Message_balanceOf {
    __kind: 'balanceOf'
    owner: AccountId
}

/**
 *
 */
export interface Message_burn {
    __kind: 'burn'
    from: AccountId
    amount: uint256
}

/**
 *
 */
export interface Message_decimals {
    __kind: 'decimals'
}

/**
 *
 */
export interface Message_mint {
    __kind: 'mint'
    to: AccountId
    amount: uint256
}

/**
 *
 */
export interface Message_name {
    __kind: 'name'
}

/**
 *
 */
export interface Message_symbol {
    __kind: 'symbol'
}

/**
 *
 */
export interface Message_totalSupply {
    __kind: 'totalSupply'
}

/**
 *
 */
export interface Message_transfer {
    __kind: 'transfer'
    to: AccountId
    amount: uint256
}

/**
 *
 */
export interface Message_transferFrom {
    __kind: 'transferFrom'
    from: AccountId
    to: AccountId
    amount: uint256
}

export type uint256 = bigint

export type AccountId = Bytes

export type Event = Event_Approval | Event_Burn | Event_Mint | Event_Transfer

export interface Event_Approval {
    __kind: 'Approval'
    owner: AccountId
    spender: AccountId
    value: uint256
}

export interface Event_Burn {
    __kind: 'Burn'
    from: AccountId
    value: uint256
}

export interface Event_Mint {
    __kind: 'Mint'
    to: AccountId
    value: uint256
}

export interface Event_Transfer {
    __kind: 'Transfer'
    from: AccountId
    to: AccountId
    value: uint256
}

export type Result<T, E> =
    | { __kind: 'Ok'; value: T }
    | { __kind: 'Err'; value: E }
