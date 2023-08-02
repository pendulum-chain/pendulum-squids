import { Abi, encodeCall, decodeResult } from '@subsquid/ink-abi'

export const metadata = {
    contract: {
        authors: ['unknown'],
        name: 'MockERC20',
        version: '0.0.1',
    },
    source: {
        compiler: 'solang 0.2.2',
        hash: '0xee5d2cbb7d6a773e4a8e2ec80fd40d76a87d5c24202dab57404f6a1cd2b148dd',
        language: 'Solidity 0.2.2',
    },
    spec: {
        constructors: [
            {
                args: [
                    {
                        label: '_name',
                        type: {
                            displayName: ['string'],
                            type: 4,
                        },
                    },
                    {
                        label: '_symbol',
                        type: {
                            displayName: ['string'],
                            type: 4,
                        },
                    },
                ],
                docs: [''],
                label: 'new',
                payable: false,
                returnType: null,
                selector: '0x52472b27',
            },
        ],
        docs: [''],
        events: [
            {
                args: [
                    {
                        docs: [],
                        indexed: true,
                        label: 'from',
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
                    {
                        docs: [],
                        indexed: false,
                        label: 'value',
                        type: {
                            displayName: ['u256'],
                            type: 3,
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
                            displayName: ['ink_env', 'types', 'AccountId'],
                            type: 2,
                        },
                    },
                    {
                        docs: [],
                        indexed: true,
                        label: 'spender',
                        type: {
                            displayName: ['ink_env', 'types', 'AccountId'],
                            type: 2,
                        },
                    },
                    {
                        docs: [],
                        indexed: false,
                        label: 'value',
                        type: {
                            displayName: ['u256'],
                            type: 3,
                        },
                    },
                ],
                docs: [''],
                label: 'Approval',
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
                label: 'name',
                mutates: false,
                payable: false,
                returnType: {
                    displayName: ['string'],
                    type: 4,
                },
                selector: '0x06fdde03',
            },
            {
                args: [],
                docs: [''],
                label: 'symbol',
                mutates: false,
                payable: false,
                returnType: {
                    displayName: ['string'],
                    type: 4,
                },
                selector: '0x95d89b41',
            },
            {
                args: [],
                docs: [''],
                label: 'decimals',
                mutates: false,
                payable: false,
                returnType: {
                    displayName: ['u8'],
                    type: 0,
                },
                selector: '0x313ce567',
            },
            {
                args: [],
                docs: [''],
                label: 'totalSupply',
                mutates: false,
                payable: false,
                returnType: {
                    displayName: ['u256'],
                    type: 3,
                },
                selector: '0x18160ddd',
            },
            {
                args: [
                    {
                        label: 'account',
                        type: {
                            displayName: ['ink_env', 'types', 'AccountId'],
                            type: 2,
                        },
                    },
                ],
                docs: [''],
                label: 'balanceOf',
                mutates: false,
                payable: false,
                returnType: {
                    displayName: ['u256'],
                    type: 3,
                },
                selector: '0x70a08231',
            },
            {
                args: [
                    {
                        label: 'to',
                        type: {
                            displayName: ['ink_env', 'types', 'AccountId'],
                            type: 2,
                        },
                    },
                    {
                        label: 'amount',
                        type: {
                            displayName: ['u256'],
                            type: 3,
                        },
                    },
                ],
                docs: [''],
                label: 'transfer',
                mutates: true,
                payable: false,
                returnType: {
                    displayName: ['bool'],
                    type: 5,
                },
                selector: '0xa9059cbb',
            },
            {
                args: [
                    {
                        label: 'owner',
                        type: {
                            displayName: ['ink_env', 'types', 'AccountId'],
                            type: 2,
                        },
                    },
                    {
                        label: 'spender',
                        type: {
                            displayName: ['ink_env', 'types', 'AccountId'],
                            type: 2,
                        },
                    },
                ],
                docs: [''],
                label: 'allowance',
                mutates: false,
                payable: false,
                returnType: {
                    displayName: ['u256'],
                    type: 3,
                },
                selector: '0xdd62ed3e',
            },
            {
                args: [
                    {
                        label: 'spender',
                        type: {
                            displayName: ['ink_env', 'types', 'AccountId'],
                            type: 2,
                        },
                    },
                    {
                        label: 'amount',
                        type: {
                            displayName: ['u256'],
                            type: 3,
                        },
                    },
                ],
                docs: [''],
                label: 'approve',
                mutates: true,
                payable: false,
                returnType: {
                    displayName: ['bool'],
                    type: 5,
                },
                selector: '0x095ea7b3',
            },
            {
                args: [
                    {
                        label: 'from',
                        type: {
                            displayName: ['ink_env', 'types', 'AccountId'],
                            type: 2,
                        },
                    },
                    {
                        label: 'to',
                        type: {
                            displayName: ['ink_env', 'types', 'AccountId'],
                            type: 2,
                        },
                    },
                    {
                        label: 'amount',
                        type: {
                            displayName: ['u256'],
                            type: 3,
                        },
                    },
                ],
                docs: [''],
                label: 'transferFrom',
                mutates: true,
                payable: false,
                returnType: {
                    displayName: ['bool'],
                    type: 5,
                },
                selector: '0x23b872dd',
            },
            {
                args: [
                    {
                        label: 'spender',
                        type: {
                            displayName: ['ink_env', 'types', 'AccountId'],
                            type: 2,
                        },
                    },
                    {
                        label: 'addedValue',
                        type: {
                            displayName: ['u256'],
                            type: 3,
                        },
                    },
                ],
                docs: [''],
                label: 'increaseAllowance',
                mutates: true,
                payable: false,
                returnType: {
                    displayName: ['bool'],
                    type: 5,
                },
                selector: '0x39509351',
            },
            {
                args: [
                    {
                        label: 'spender',
                        type: {
                            displayName: ['ink_env', 'types', 'AccountId'],
                            type: 2,
                        },
                    },
                    {
                        label: 'subtractedValue',
                        type: {
                            displayName: ['u256'],
                            type: 3,
                        },
                    },
                ],
                docs: [''],
                label: 'decreaseAllowance',
                mutates: true,
                payable: false,
                returnType: {
                    displayName: ['bool'],
                    type: 5,
                },
                selector: '0xa457c2d7',
            },
            {
                args: [
                    {
                        label: '_to',
                        type: {
                            displayName: ['ink_env', 'types', 'AccountId'],
                            type: 2,
                        },
                    },
                    {
                        label: '_amount',
                        type: {
                            displayName: ['u256'],
                            type: 3,
                        },
                    },
                ],
                docs: [''],
                label: 'mint',
                mutates: true,
                payable: false,
                returnType: null,
                selector: '0x40c10f19',
            },
            {
                args: [
                    {
                        label: 'from',
                        type: {
                            displayName: ['ink_env', 'types', 'AccountId'],
                            type: 2,
                        },
                    },
                    {
                        label: '_amount',
                        type: {
                            displayName: ['u256'],
                            type: 3,
                        },
                    },
                ],
                docs: [''],
                label: 'burn',
                mutates: true,
                payable: false,
                returnType: null,
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
                                    ty: 3,
                                },
                            },
                            root_key: '0x00000000',
                        },
                    },
                    name: '_balances',
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
                    name: '_allowances',
                },
                {
                    layout: {
                        root: {
                            layout: {
                                leaf: {
                                    key: '0x00000002',
                                    ty: 3,
                                },
                            },
                            root_key: '0x00000002',
                        },
                    },
                    name: '_totalSupply',
                },
                {
                    layout: {
                        root: {
                            layout: {
                                leaf: {
                                    key: '0x00000003',
                                    ty: 4,
                                },
                            },
                            root_key: '0x00000003',
                        },
                    },
                    name: '_name',
                },
                {
                    layout: {
                        root: {
                            layout: {
                                leaf: {
                                    key: '0x00000004',
                                    ty: 4,
                                },
                            },
                            root_key: '0x00000004',
                        },
                    },
                    name: '_symbol',
                },
            ],
            name: 'MockERC20',
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
                    primitive: 'str',
                },
                path: ['string'],
            },
        },
        {
            id: 5,
            type: {
                def: {
                    primitive: 'bool',
                },
                path: ['bool'],
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

    name(): Promise<string> {
        return this.stateCall('0x06fdde03', [])
    }

    symbol(): Promise<string> {
        return this.stateCall('0x95d89b41', [])
    }

    decimals(): Promise<number> {
        return this.stateCall('0x313ce567', [])
    }

    totalSupply(): Promise<u256> {
        return this.stateCall('0x18160ddd', [])
    }

    balanceOf(account: AccountId): Promise<u256> {
        return this.stateCall('0x70a08231', [account])
    }

    allowance(owner: AccountId, spender: AccountId): Promise<u256> {
        return this.stateCall('0xdd62ed3e', [owner, spender])
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

export type Event = Event_Transfer | Event_Approval

export interface Event_Transfer {
    __kind: 'Transfer'
    from: AccountId
    to: AccountId
    value: u256
}

export interface Event_Approval {
    __kind: 'Approval'
    owner: AccountId
    spender: AccountId
    value: u256
}

export type Message =
    | Message_name
    | Message_symbol
    | Message_decimals
    | Message_totalSupply
    | Message_balanceOf
    | Message_transfer
    | Message_allowance
    | Message_approve
    | Message_transferFrom
    | Message_increaseAllowance
    | Message_decreaseAllowance
    | Message_mint
    | Message_burn

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
export interface Message_decimals {
    __kind: 'decimals'
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
export interface Message_balanceOf {
    __kind: 'balanceOf'
    account: AccountId
}

/**
 *
 */
export interface Message_transfer {
    __kind: 'transfer'
    to: AccountId
    amount: u256
}

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
    amount: u256
}

/**
 *
 */
export interface Message_transferFrom {
    __kind: 'transferFrom'
    from: AccountId
    to: AccountId
    amount: u256
}

/**
 *
 */
export interface Message_increaseAllowance {
    __kind: 'increaseAllowance'
    spender: AccountId
    addedValue: u256
}

/**
 *
 */
export interface Message_decreaseAllowance {
    __kind: 'decreaseAllowance'
    spender: AccountId
    subtractedValue: u256
}

/**
 *
 */
export interface Message_mint {
    __kind: 'mint'
    to: AccountId
    amount: u256
}

/**
 *
 */
export interface Message_burn {
    __kind: 'burn'
    from: AccountId
    amount: u256
}

export type Constructor = Constructor_new

/**
 *
 */
export interface Constructor_new {
    __kind: 'new'
    name: string
    symbol: string
}

export type string = string

export type u256 = bigint

export type AccountId = Uint8Array

export type Result<T, E> =
    | { __kind: 'Ok'; value: T }
    | { __kind: 'Err'; value: E }
