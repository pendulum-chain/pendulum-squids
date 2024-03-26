import { Abi, Bytes, encodeCall, decodeResult } from '@subsquid/ink-abi'

export const metadata = {
    contract: {
        authors: ['unknown'],
        description:
            'The backstop pool takes most of the risk of a set of swap pools\nbacked by it. Whenever a swap pool is low on reserves and a LPer\nwants to withdraw some liquidity, they can conduct an insurance\nwithdrawal (burn swap pool shares, reimbursed in backstop liquidity)\nto avoid paying a high slippage.\nThe backstop pool owns all excess liquidity in its swap pools,\nbut is also liable for potential liquidity gaps.\nIn return, the backstop pool receives a cut of the swap fees.',
        name: 'BackstopPool',
        version: '0.0.1',
    },
    source: {
        compiler: 'solang 0.2.2',
        hash: '0xf10ab2e77c3a3e3927250ee6ba61e01338a509150723f4329e6dda3d9481eb2a',
        language: 'Solidity 0.2.2',
    },
    spec: {
        constructors: [
            {
                args: [
                    {
                        label: '_router',
                        type: {
                            displayName: ['ink_env', 'types', 'AccountId'],
                            type: 2,
                        },
                    },
                    {
                        label: '_asset',
                        type: {
                            displayName: ['ink_env', 'types', 'AccountId'],
                            type: 2,
                        },
                    },
                    {
                        label: '_curve',
                        type: {
                            displayName: ['ink_env', 'types', 'AccountId'],
                            type: 2,
                        },
                    },
                    {
                        label: '_name',
                        type: {
                            displayName: ['string'],
                            type: 5,
                        },
                    },
                    {
                        label: '_symbol',
                        type: {
                            displayName: ['string'],
                            type: 5,
                        },
                    },
                ],
                docs: [''],
                label: 'new',
                payable: false,
                returnType: null,
                selector: '0x3e6bb716',
            },
        ],
        docs: [
            'The backstop pool takes most of the risk of a set of swap pools\nbacked by it. Whenever a swap pool is low on reserves and a LPer\nwants to withdraw some liquidity, they can conduct an insurance\nwithdrawal (burn swap pool shares, reimbursed in backstop liquidity)\nto avoid paying a high slippage.\nThe backstop pool owns all excess liquidity in its swap pools,\nbut is also liable for potential liquidity gaps.\nIn return, the backstop pool receives a cut of the swap fees.\n\n',
        ],
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
                        label: 'poolSharesMinted',
                        type: {
                            displayName: ['u256'],
                            type: 3,
                        },
                    },
                    {
                        docs: [],
                        indexed: false,
                        label: 'amountPrincipleDeposited',
                        type: {
                            displayName: ['u256'],
                            type: 3,
                        },
                    },
                ],
                docs: ['emitted on every deposit\n\n'],
                label: 'Mint',
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
                        label: 'poolSharesBurned',
                        type: {
                            displayName: ['u256'],
                            type: 3,
                        },
                    },
                    {
                        docs: [],
                        indexed: false,
                        label: 'amountPrincipleWithdrawn',
                        type: {
                            displayName: ['u256'],
                            type: 3,
                        },
                    },
                ],
                docs: [
                    'emitted on every withdrawal special case withdrawal using swap liquidiity: amountPrincipleWithdrawn = 0\n\n',
                ],
                label: 'Burn',
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
                        indexed: false,
                        label: 'swapPool',
                        type: {
                            displayName: ['ink_env', 'types', 'AccountId'],
                            type: 2,
                        },
                    },
                    {
                        docs: [],
                        indexed: false,
                        label: 'amountSwapShares',
                        type: {
                            displayName: ['u256'],
                            type: 3,
                        },
                    },
                    {
                        docs: [],
                        indexed: false,
                        label: 'amountSwapTokens',
                        type: {
                            displayName: ['u256'],
                            type: 3,
                        },
                    },
                    {
                        docs: [],
                        indexed: false,
                        label: 'amountBackstopTokens',
                        type: {
                            displayName: ['u256'],
                            type: 3,
                        },
                    },
                ],
                docs: [
                    'emitted when a swap pool LP withdraws from backstop pool\n\n',
                ],
                label: 'CoverSwapWithdrawal',
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
                        indexed: false,
                        label: 'swapPool',
                        type: {
                            displayName: ['ink_env', 'types', 'AccountId'],
                            type: 2,
                        },
                    },
                    {
                        docs: [],
                        indexed: false,
                        label: 'amountSwapTokens',
                        type: {
                            displayName: ['u256'],
                            type: 3,
                        },
                    },
                    {
                        docs: [],
                        indexed: false,
                        label: 'amountBackstopTokens',
                        type: {
                            displayName: ['u256'],
                            type: 3,
                        },
                    },
                ],
                docs: [
                    'emitted when a backstop pool LP withdraws liquidity from swap pool\n\n',
                ],
                label: 'WithdrawSwapLiquidity',
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
                    type: 5,
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
                    type: 5,
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
                    type: 4,
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
                    type: 4,
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
                    type: 4,
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
                    type: 4,
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
                    type: 4,
                },
                selector: '0xa457c2d7',
            },
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
                args: [],
                docs: [''],
                label: 'poolCap',
                mutates: false,
                payable: false,
                returnType: {
                    displayName: ['u256'],
                    type: 3,
                },
                selector: '0xb954dc57',
            },
            {
                args: [],
                docs: ["Returns the pooled token's address\n\n"],
                label: 'asset',
                mutates: false,
                payable: false,
                returnType: {
                    displayName: ['ink_env', 'types', 'AccountId'],
                    type: 2,
                },
                selector: '0x38d52e0f',
            },
            {
                args: [
                    {
                        label: '_shares',
                        type: {
                            displayName: ['u256'],
                            type: 3,
                        },
                    },
                ],
                docs: [
                    'Returns the worth of an amount of pool shares (LP tokens) in underlying principle\n\n',
                ],
                label: 'sharesTargetWorth',
                mutates: false,
                payable: false,
                returnType: {
                    displayName: ['u256'],
                    type: 3,
                },
                selector: '0xcc045745',
            },
            {
                args: [],
                docs: [''],
                label: 'router',
                mutates: false,
                payable: false,
                returnType: {
                    displayName: ['ink_env', 'types', 'AccountId'],
                    type: 2,
                },
                selector: '0xf887ea40',
            },
            {
                args: [],
                docs: [''],
                label: 'slippageCurve',
                mutates: false,
                payable: false,
                returnType: {
                    displayName: ['ink_env', 'types', 'AccountId'],
                    type: 2,
                },
                selector: '0xebe26b9e',
            },
            {
                args: [],
                docs: [''],
                label: 'accumulatedSlippage',
                mutates: false,
                payable: false,
                returnType: {
                    displayName: ['u256'],
                    type: 3,
                },
                selector: '0xe4182b09',
            },
            {
                args: [
                    {
                        label: '_amount',
                        type: {
                            displayName: ['u256'],
                            type: 3,
                        },
                    },
                ],
                docs: [
                    'Deposits amount of tokens into pool Will change cov ratio of pool, will increase delta to 0\n\n',
                ],
                label: 'deposit',
                mutates: true,
                payable: false,
                returnType: {
                    displayName: ['BackstopPool', 'deposit', 'return_type'],
                    type: 8,
                },
                selector: '0xb6b55f25',
            },
            {
                args: [
                    {
                        label: '_maxTokens',
                        type: {
                            displayName: ['u256'],
                            type: 3,
                        },
                    },
                ],
                docs: [
                    'Set new upper limit of pool reserves. Will disable deposits when reached. Can always set to an amount < current reserves to temporarily restrict deposits.\n\n',
                ],
                label: 'setPoolCap',
                mutates: true,
                payable: false,
                returnType: null,
                selector: '0xd835f535',
            },
            {
                args: [
                    {
                        label: '_shares',
                        type: {
                            displayName: ['u256'],
                            type: 3,
                        },
                    },
                    {
                        label: '_minimumAmount',
                        type: {
                            displayName: ['u256'],
                            type: 3,
                        },
                    },
                ],
                docs: [
                    'Withdraws liquidity amount of asset ensuring minimum amount required Slippage is applied (withdrawal fee)\n\n',
                ],
                label: 'withdraw',
                mutates: true,
                payable: false,
                returnType: {
                    displayName: ['BackstopPool', 'withdraw', 'return_type'],
                    type: 9,
                },
                selector: '0x441a3e70',
            },
            {
                args: [
                    {
                        label: '_swapPool',
                        type: {
                            displayName: ['ink_env', 'types', 'AccountId'],
                            type: 2,
                        },
                    },
                    {
                        label: '_insuranceFeeBps',
                        type: {
                            displayName: ['u256'],
                            type: 3,
                        },
                    },
                ],
                docs: [
                    'Make this backstop pool cover another swap pool Beware: Adding a swap pool holding the same token as the backstop pool\ncan easily cause undesirable conditions and must be secured (i.e. long time lock)!\n\n',
                ],
                label: 'addSwapPool',
                mutates: true,
                payable: false,
                returnType: null,
                selector: '0xabb26587',
            },
            {
                args: [
                    {
                        label: '_swapPool',
                        type: {
                            displayName: ['ink_env', 'types', 'AccountId'],
                            type: 2,
                        },
                    },
                    {
                        label: '_insuranceFeeBps',
                        type: {
                            displayName: ['u256'],
                            type: 3,
                        },
                    },
                ],
                docs: ["Change a swap pool's insurance withdrawal fee\n\n"],
                label: 'setInsuranceFee',
                mutates: true,
                payable: false,
                returnType: null,
                selector: '0xc6a78196',
            },
            {
                args: [
                    {
                        label: '_swapPool',
                        type: {
                            displayName: ['ink_env', 'types', 'AccountId'],
                            type: 2,
                        },
                    },
                    {
                        label: '_shares',
                        type: {
                            displayName: ['u256'],
                            type: 3,
                        },
                    },
                    {
                        label: '_minAmount',
                        type: {
                            displayName: ['u256'],
                            type: 3,
                        },
                    },
                ],
                docs: [
                    "withdraw from a swap pool using backstop liquidity without slippage only possible if swap pool's coverage ratio < 100%\n\n",
                ],
                label: 'redeemSwapPoolShares',
                mutates: true,
                payable: false,
                returnType: {
                    displayName: ['u256'],
                    type: 3,
                },
                selector: '0x6e7e91fd',
            },
            {
                args: [
                    {
                        label: '_swapPool',
                        type: {
                            displayName: ['ink_env', 'types', 'AccountId'],
                            type: 2,
                        },
                    },
                    {
                        label: '_shares',
                        type: {
                            displayName: ['u256'],
                            type: 3,
                        },
                    },
                    {
                        label: '_minAmount',
                        type: {
                            displayName: ['u256'],
                            type: 3,
                        },
                    },
                ],
                docs: [
                    'withdraw from backstop pool, but receive excess liquidity\nof a swap pool without slippage, instead of backstop liquidity\n\n',
                ],
                label: 'withdrawExcessSwapLiquidity',
                mutates: true,
                payable: false,
                returnType: {
                    displayName: ['u256'],
                    type: 3,
                },
                selector: '0xcaf8c105',
            },
            {
                args: [],
                docs: ['returns pool coverage ratio\n\n'],
                label: 'coverage',
                mutates: false,
                payable: false,
                returnType: {
                    displayName: ['BackstopPool', 'coverage', 'return_type'],
                    type: 10,
                },
                selector: '0xee8f6a0e',
            },
            {
                args: [
                    {
                        label: '_index',
                        type: {
                            displayName: ['u256'],
                            type: 3,
                        },
                    },
                ],
                docs: ['enumerate swap pools backed by this backstop pool\n\n'],
                label: 'getBackedPool',
                mutates: false,
                payable: false,
                returnType: {
                    displayName: ['ink_env', 'types', 'AccountId'],
                    type: 2,
                },
                selector: '0xa04345f2',
            },
            {
                args: [],
                docs: ['get swap pool count backed by this backstop pool\n\n'],
                label: 'getBackedPoolCount',
                mutates: false,
                payable: false,
                returnType: {
                    displayName: ['u256'],
                    type: 3,
                },
                selector: '0x5fda8689',
            },
            {
                args: [
                    {
                        label: '_swapPool',
                        type: {
                            displayName: ['ink_env', 'types', 'AccountId'],
                            type: 2,
                        },
                    },
                ],
                docs: [
                    'get insurance withdrawal fee for a given swap pool\n\n',
                ],
                label: 'getInsuranceFee',
                mutates: false,
                payable: false,
                returnType: {
                    displayName: ['u256'],
                    type: 3,
                },
                selector: '0x504e0153',
            },
            {
                args: [],
                docs: [
                    "return worth of the whole backstop pool in `asset()`, incl. all\nswap pools' excess liquidity and the backstop pool's liabilities\n\n",
                ],
                label: 'getTotalPoolWorth',
                mutates: false,
                payable: false,
                returnType: {
                    displayName: ['u256'],
                    type: 3,
                },
                selector: '0x18ba24c4',
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
                                leaf: {
                                    key: '0x00000003',
                                    ty: 3,
                                },
                            },
                            root_key: '0x00000003',
                        },
                    },
                    name: '_balances',
                },
                {
                    layout: {
                        root: {
                            layout: {
                                leaf: {
                                    key: '0x00000004',
                                    ty: 3,
                                },
                            },
                            root_key: '0x00000004',
                        },
                    },
                    name: '_allowances',
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
                    name: '_totalSupply',
                },
                {
                    layout: {
                        root: {
                            layout: {
                                leaf: {
                                    key: '0x00000006',
                                    ty: 5,
                                },
                            },
                            root_key: '0x00000006',
                        },
                    },
                    name: '_name',
                },
                {
                    layout: {
                        root: {
                            layout: {
                                leaf: {
                                    key: '0x00000007',
                                    ty: 5,
                                },
                            },
                            root_key: '0x00000007',
                        },
                    },
                    name: '_symbol',
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
                                                    key: '0x00000008',
                                                    ty: 1,
                                                },
                                            },
                                            name: '',
                                        },
                                    ],
                                    name: 'AccountId',
                                },
                            },
                            root_key: '0x00000008',
                        },
                    },
                    name: 'poolAsset',
                },
                {
                    layout: {
                        root: {
                            layout: {
                                leaf: {
                                    key: '0x00000009',
                                    ty: 3,
                                },
                            },
                            root_key: '0x00000009',
                        },
                    },
                    name: 'poolCap',
                },
                {
                    layout: {
                        root: {
                            layout: {
                                leaf: {
                                    key: '0x0000000a',
                                    ty: 3,
                                },
                            },
                            root_key: '0x0000000a',
                        },
                    },
                    name: 'totalLiabilities',
                },
                {
                    layout: {
                        root: {
                            layout: {
                                leaf: {
                                    key: '0x0000000b',
                                    ty: 3,
                                },
                            },
                            root_key: '0x0000000b',
                        },
                    },
                    name: 'poolAssetMantissa',
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
                                                    key: '0x0000000c',
                                                    ty: 1,
                                                },
                                            },
                                            name: '',
                                        },
                                    ],
                                    name: 'AccountId',
                                },
                            },
                            root_key: '0x0000000c',
                        },
                    },
                    name: 'router',
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
                                                    key: '0x0000000d',
                                                    ty: 1,
                                                },
                                            },
                                            name: '',
                                        },
                                    ],
                                    name: 'AccountId',
                                },
                            },
                            root_key: '0x0000000d',
                        },
                    },
                    name: 'slippageCurve',
                },
                {
                    layout: {
                        root: {
                            layout: {
                                leaf: {
                                    key: '0x0000000e',
                                    ty: 3,
                                },
                            },
                            root_key: '0x0000000e',
                        },
                    },
                    name: 'accumulatedSlippage',
                },
                {
                    layout: {
                        root: {
                            layout: {
                                leaf: {
                                    key: '0x0000000f',
                                    ty: 6,
                                },
                            },
                            root_key: '0x0000000f',
                        },
                    },
                    name: 'swapPools',
                },
                {
                    layout: {
                        root: {
                            layout: {
                                leaf: {
                                    key: '0x00000010',
                                    ty: 3,
                                },
                            },
                            root_key: '0x00000010',
                        },
                    },
                    name: 'swapPoolInsuranceFeeBps',
                },
                {
                    layout: {
                        root: {
                            layout: {
                                leaf: {
                                    key: '0x00000011',
                                    ty: 4,
                                },
                            },
                            root_key: '0x00000011',
                        },
                    },
                    name: 'swapPoolCovered',
                },
            ],
            name: 'BackstopPool',
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
                    primitive: 'str',
                },
                path: ['string'],
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
                    primitive: 'i256',
                },
                path: ['i256'],
            },
        },
        {
            id: 8,
            type: {
                def: {
                    tuple: [3, 7],
                },
                path: ['BackstopPool', 'deposit', 'return_type'],
            },
        },
        {
            id: 9,
            type: {
                def: {
                    tuple: [3, 7],
                },
                path: ['BackstopPool', 'withdraw', 'return_type'],
            },
        },
        {
            id: 10,
            type: {
                def: {
                    tuple: [3, 3],
                },
                path: ['BackstopPool', 'coverage', 'return_type'],
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

    decimals(): Promise<u8> {
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

    paused(): Promise<bool> {
        return this.stateCall('0x5c975abb', [])
    }

    owner(): Promise<AccountId> {
        return this.stateCall('0x8da5cb5b', [])
    }

    poolCap(): Promise<u256> {
        return this.stateCall('0xb954dc57', [])
    }

    asset(): Promise<AccountId> {
        return this.stateCall('0x38d52e0f', [])
    }

    sharesTargetWorth(_shares: u256): Promise<u256> {
        return this.stateCall('0xcc045745', [_shares])
    }

    router(): Promise<AccountId> {
        return this.stateCall('0xf887ea40', [])
    }

    slippageCurve(): Promise<AccountId> {
        return this.stateCall('0xebe26b9e', [])
    }

    accumulatedSlippage(): Promise<u256> {
        return this.stateCall('0xe4182b09', [])
    }

    coverage(): Promise<[u256, u256]> {
        return this.stateCall('0xee8f6a0e', [])
    }

    getBackedPool(_index: u256): Promise<AccountId> {
        return this.stateCall('0xa04345f2', [_index])
    }

    getBackedPoolCount(): Promise<u256> {
        return this.stateCall('0x5fda8689', [])
    }

    getInsuranceFee(_swapPool: AccountId): Promise<u256> {
        return this.stateCall('0x504e0153', [_swapPool])
    }

    getTotalPoolWorth(): Promise<u256> {
        return this.stateCall('0x18ba24c4', [])
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

export type bool = boolean

export type AccountId = Bytes

export type u256 = bigint

export type u8 = number

export type Constructor = Constructor_new

/**
 *
 */
export interface Constructor_new {
    __kind: 'new'
    router: AccountId
    asset: AccountId
    curve: AccountId
    name: string
    symbol: string
}

export type Message =
    | Message_accumulatedSlippage
    | Message_addSwapPool
    | Message_allowance
    | Message_approve
    | Message_asset
    | Message_balanceOf
    | Message_coverage
    | Message_decimals
    | Message_decreaseAllowance
    | Message_deposit
    | Message_getBackedPool
    | Message_getBackedPoolCount
    | Message_getInsuranceFee
    | Message_getTotalPoolWorth
    | Message_increaseAllowance
    | Message_name
    | Message_owner
    | Message_paused
    | Message_poolCap
    | Message_redeemSwapPoolShares
    | Message_renounceOwnership
    | Message_router
    | Message_setInsuranceFee
    | Message_setPoolCap
    | Message_sharesTargetWorth
    | Message_slippageCurve
    | Message_symbol
    | Message_totalSupply
    | Message_transfer
    | Message_transferFrom
    | Message_transferOwnership
    | Message_withdraw
    | Message_withdrawExcessSwapLiquidity

/**
 *
 */
export interface Message_accumulatedSlippage {
    __kind: 'accumulatedSlippage'
}

/**
 * Make this backstop pool cover another swap pool Beware: Adding a swap pool holding the same token as the backstop pool
can easily cause undesirable conditions and must be secured (i.e. long time lock)!


 */
export interface Message_addSwapPool {
    __kind: 'addSwapPool'
    swapPool: AccountId
    insuranceFeeBps: u256
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
 * Returns the pooled token's address


 */
export interface Message_asset {
    __kind: 'asset'
}

/**
 *
 */
export interface Message_balanceOf {
    __kind: 'balanceOf'
    account: AccountId
}

/**
 * returns pool coverage ratio


 */
export interface Message_coverage {
    __kind: 'coverage'
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
export interface Message_decreaseAllowance {
    __kind: 'decreaseAllowance'
    spender: AccountId
    subtractedValue: u256
}

/**
 * Deposits amount of tokens into pool Will change cov ratio of pool, will increase delta to 0


 */
export interface Message_deposit {
    __kind: 'deposit'
    amount: u256
}

/**
 * enumerate swap pools backed by this backstop pool


 */
export interface Message_getBackedPool {
    __kind: 'getBackedPool'
    index: u256
}

/**
 * get swap pool count backed by this backstop pool


 */
export interface Message_getBackedPoolCount {
    __kind: 'getBackedPoolCount'
}

/**
 * get insurance withdrawal fee for a given swap pool


 */
export interface Message_getInsuranceFee {
    __kind: 'getInsuranceFee'
    swapPool: AccountId
}

/**
 * return worth of the whole backstop pool in `asset()`, incl. all
swap pools' excess liquidity and the backstop pool's liabilities


 */
export interface Message_getTotalPoolWorth {
    __kind: 'getTotalPoolWorth'
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
export interface Message_name {
    __kind: 'name'
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
export interface Message_paused {
    __kind: 'paused'
}

/**
 *
 */
export interface Message_poolCap {
    __kind: 'poolCap'
}

/**
 * withdraw from a swap pool using backstop liquidity without slippage only possible if swap pool's coverage ratio < 100%


 */
export interface Message_redeemSwapPoolShares {
    __kind: 'redeemSwapPoolShares'
    swapPool: AccountId
    shares: u256
    minAmount: u256
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
export interface Message_router {
    __kind: 'router'
}

/**
 * Change a swap pool's insurance withdrawal fee


 */
export interface Message_setInsuranceFee {
    __kind: 'setInsuranceFee'
    swapPool: AccountId
    insuranceFeeBps: u256
}

/**
 * Set new upper limit of pool reserves. Will disable deposits when reached. Can always set to an amount < current reserves to temporarily restrict deposits.


 */
export interface Message_setPoolCap {
    __kind: 'setPoolCap'
    maxTokens: u256
}

/**
 * Returns the worth of an amount of pool shares (LP tokens) in underlying principle


 */
export interface Message_sharesTargetWorth {
    __kind: 'sharesTargetWorth'
    shares: u256
}

/**
 *
 */
export interface Message_slippageCurve {
    __kind: 'slippageCurve'
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
export interface Message_transferOwnership {
    __kind: 'transferOwnership'
    newOwner: AccountId
}

/**
 * Withdraws liquidity amount of asset ensuring minimum amount required Slippage is applied (withdrawal fee)


 */
export interface Message_withdraw {
    __kind: 'withdraw'
    shares: u256
    minimumAmount: u256
}

/**
 * withdraw from backstop pool, but receive excess liquidity
of a swap pool without slippage, instead of backstop liquidity


 */
export interface Message_withdrawExcessSwapLiquidity {
    __kind: 'withdrawExcessSwapLiquidity'
    swapPool: AccountId
    shares: u256
    minAmount: u256
}

export type Event =
    | Event_Approval
    | Event_Burn
    | Event_CoverSwapWithdrawal
    | Event_Mint
    | Event_OwnershipTransferred
    | Event_Paused
    | Event_Transfer
    | Event_Unpaused
    | Event_WithdrawSwapLiquidity

export interface Event_Approval {
    __kind: 'Approval'
    owner: AccountId
    spender: AccountId
    value: u256
}

export interface Event_Burn {
    __kind: 'Burn'
    sender: AccountId
    poolSharesBurned: u256
    amountPrincipleWithdrawn: u256
}

export interface Event_CoverSwapWithdrawal {
    __kind: 'CoverSwapWithdrawal'
    owner: AccountId
    swapPool: AccountId
    amountSwapShares: u256
    amountSwapTokens: u256
    amountBackstopTokens: u256
}

export interface Event_Mint {
    __kind: 'Mint'
    sender: AccountId
    poolSharesMinted: u256
    amountPrincipleDeposited: u256
}

export interface Event_OwnershipTransferred {
    __kind: 'OwnershipTransferred'
    previousOwner: AccountId
    newOwner: AccountId
}

export interface Event_Paused {
    __kind: 'Paused'
    account: AccountId
}

export interface Event_Transfer {
    __kind: 'Transfer'
    from: AccountId
    to: AccountId
    value: u256
}

export interface Event_Unpaused {
    __kind: 'Unpaused'
    account: AccountId
}

export interface Event_WithdrawSwapLiquidity {
    __kind: 'WithdrawSwapLiquidity'
    owner: AccountId
    swapPool: AccountId
    amountSwapTokens: u256
    amountBackstopTokens: u256
}

export type Result<T, E> =
    | { __kind: 'Ok'; value: T }
    | { __kind: 'Err'; value: E }
