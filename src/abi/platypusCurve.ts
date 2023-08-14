import { Abi, encodeCall, decodeResult } from '@subsquid/ink-abi'

export const metadata = {
    contract: {
        authors: ['unknown'],
        description: 'wrapper providing the platypus.finance slippage curve',
        name: 'PlatypusCurve',
        version: '0.0.1',
    },
    source: {
        compiler: 'solang 0.2.2',
        hash: '0x27785ff398eb181c372588719a96fed8a881c1f0535919633bdbf912c2b78413',
        language: 'Solidity 0.2.2',
    },
    spec: {
        constructors: [
            {
                args: [
                    {
                        label: '_params',
                        type: {
                            displayName: ['Params'],
                            type: 4,
                        },
                    },
                ],
                docs: [''],
                label: 'new',
                payable: false,
                returnType: null,
                selector: '0x37bcbfa1',
            },
        ],
        docs: ['wrapper providing the platypus.finance slippage curve\n\n'],
        events: [],
        lang_error: {
            displayName: [],
            type: 0,
        },
        messages: [
            {
                args: [],
                docs: [''],
                label: 'params',
                mutates: false,
                payable: false,
                returnType: {
                    displayName: ['Params'],
                    type: 4,
                },
                selector: '0xcff0ab96',
            },
            {
                args: [
                    {
                        label: '_reservesBefore',
                        type: {
                            displayName: ['u256'],
                            type: 3,
                        },
                    },
                    {
                        label: '_liabilitiesBefore',
                        type: {
                            displayName: ['u256'],
                            type: 3,
                        },
                    },
                    {
                        label: '_accumulatedPoolSlippage',
                        type: {
                            displayName: ['u256'],
                            type: 3,
                        },
                    },
                    {
                        label: '_depositAmount',
                        type: {
                            displayName: ['u256'],
                            type: 3,
                        },
                    },
                ],
                docs: [''],
                label: 'effectiveDeposit',
                mutates: false,
                payable: false,
                returnType: {
                    displayName: ['u256'],
                    type: 3,
                },
                selector: '0x7a84126b',
            },
            {
                args: [
                    {
                        label: '_reservesBefore',
                        type: {
                            displayName: ['u256'],
                            type: 3,
                        },
                    },
                    {
                        label: '_liabilitiesBefore',
                        type: {
                            displayName: ['u256'],
                            type: 3,
                        },
                    },
                    {
                        label: '_accumulatedPoolSlippage',
                        type: {
                            displayName: ['u256'],
                            type: 3,
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
                label: 'effectiveSwapIn',
                mutates: false,
                payable: false,
                returnType: {
                    displayName: ['u256'],
                    type: 3,
                },
                selector: '0x623cbcb8',
            },
            {
                args: [
                    {
                        label: '_reservesBefore',
                        type: {
                            displayName: ['u256'],
                            type: 3,
                        },
                    },
                    {
                        label: '_liabilitiesBefore',
                        type: {
                            displayName: ['u256'],
                            type: 3,
                        },
                    },
                    {
                        label: '_accumulatedPoolSlippage',
                        type: {
                            displayName: ['u256'],
                            type: 3,
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
                label: 'effectiveSwapOut',
                mutates: false,
                payable: false,
                returnType: {
                    displayName: ['u256'],
                    type: 3,
                },
                selector: '0x84ea820f',
            },
            {
                args: [
                    {
                        label: '_reservesBefore',
                        type: {
                            displayName: ['u256'],
                            type: 3,
                        },
                    },
                    {
                        label: '_liabilitiesBefore',
                        type: {
                            displayName: ['u256'],
                            type: 3,
                        },
                    },
                    {
                        label: '_accumulatedPoolSlippage',
                        type: {
                            displayName: ['u256'],
                            type: 3,
                        },
                    },
                    {
                        label: '_withdrawalAmount',
                        type: {
                            displayName: ['u256'],
                            type: 3,
                        },
                    },
                ],
                docs: [''],
                label: 'effectiveWithdrawal',
                mutates: false,
                payable: false,
                returnType: {
                    displayName: ['u256'],
                    type: 3,
                },
                selector: '0x986c43e5',
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
                                    ty: 2,
                                },
                            },
                            root_key: '0x00000000',
                        },
                    },
                    name: 'emptyArray',
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
                                                    key: '0x00000040',
                                                    ty: 3,
                                                },
                                            },
                                            name: 'c1',
                                        },
                                        {
                                            layout: {
                                                leaf: {
                                                    key: '0x00000040',
                                                    ty: 3,
                                                },
                                            },
                                            name: 'k',
                                        },
                                        {
                                            layout: {
                                                leaf: {
                                                    key: '0x00000040',
                                                    ty: 3,
                                                },
                                            },
                                            name: 'n',
                                        },
                                        {
                                            layout: {
                                                leaf: {
                                                    key: '0x00000040',
                                                    ty: 3,
                                                },
                                            },
                                            name: 'xThreshold',
                                        },
                                    ],
                                    name: 'Params',
                                },
                            },
                            root_key: '0x00000040',
                        },
                    },
                    name: 'params',
                },
            ],
            name: 'PlatypusCurve',
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
                    array: {
                        len: 64,
                        type: 1,
                    },
                },
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
                    composite: {
                        fields: [
                            {
                                name: 'c1',
                                type: 3,
                            },
                            {
                                name: 'k',
                                type: 3,
                            },
                            {
                                name: 'n',
                                type: 3,
                            },
                            {
                                name: 'xThreshold',
                                type: 3,
                            },
                        ],
                    },
                },
                path: ['Params'],
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

    params(): Promise<Params> {
        return this.stateCall('0xcff0ab96', [])
    }

    effectiveDeposit(
        _reservesBefore: u256,
        _liabilitiesBefore: u256,
        _accumulatedPoolSlippage: u256,
        _depositAmount: u256
    ): Promise<u256> {
        return this.stateCall('0x7a84126b', [
            _reservesBefore,
            _liabilitiesBefore,
            _accumulatedPoolSlippage,
            _depositAmount,
        ])
    }

    effectiveSwapIn(
        _reservesBefore: u256,
        _liabilitiesBefore: u256,
        _accumulatedPoolSlippage: u256,
        _amount: u256
    ): Promise<u256> {
        return this.stateCall('0x623cbcb8', [
            _reservesBefore,
            _liabilitiesBefore,
            _accumulatedPoolSlippage,
            _amount,
        ])
    }

    effectiveSwapOut(
        _reservesBefore: u256,
        _liabilitiesBefore: u256,
        _accumulatedPoolSlippage: u256,
        _amount: u256
    ): Promise<u256> {
        return this.stateCall('0x84ea820f', [
            _reservesBefore,
            _liabilitiesBefore,
            _accumulatedPoolSlippage,
            _amount,
        ])
    }

    effectiveWithdrawal(
        _reservesBefore: u256,
        _liabilitiesBefore: u256,
        _accumulatedPoolSlippage: u256,
        _withdrawalAmount: u256
    ): Promise<u256> {
        return this.stateCall('0x986c43e5', [
            _reservesBefore,
            _liabilitiesBefore,
            _accumulatedPoolSlippage,
            _withdrawalAmount,
        ])
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
    | Message_params
    | Message_effectiveDeposit
    | Message_effectiveSwapIn
    | Message_effectiveSwapOut
    | Message_effectiveWithdrawal

/**
 *
 */
export interface Message_params {
    __kind: 'params'
}

/**
 *
 */
export interface Message_effectiveDeposit {
    __kind: 'effectiveDeposit'
    reservesBefore: u256
    liabilitiesBefore: u256
    accumulatedPoolSlippage: u256
    depositAmount: u256
}

/**
 *
 */
export interface Message_effectiveSwapIn {
    __kind: 'effectiveSwapIn'
    reservesBefore: u256
    liabilitiesBefore: u256
    accumulatedPoolSlippage: u256
    amount: u256
}

/**
 *
 */
export interface Message_effectiveSwapOut {
    __kind: 'effectiveSwapOut'
    reservesBefore: u256
    liabilitiesBefore: u256
    accumulatedPoolSlippage: u256
    amount: u256
}

/**
 *
 */
export interface Message_effectiveWithdrawal {
    __kind: 'effectiveWithdrawal'
    reservesBefore: u256
    liabilitiesBefore: u256
    accumulatedPoolSlippage: u256
    withdrawalAmount: u256
}

export type Constructor = Constructor_new

/**
 *
 */
export interface Constructor_new {
    __kind: 'new'
    params: Params
}

export interface Params {
    c1: u256
    k: u256
    n: u256
    xThreshold: u256
}

export type u256 = bigint

export type Result<T, E> =
    | { __kind: 'Ok'; value: T }
    | { __kind: 'Err'; value: E }
