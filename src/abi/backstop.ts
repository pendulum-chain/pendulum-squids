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
        compiler: 'solang 0.3.2',
        hash: '0xe07d252b0830943a932a082d3b7a46249af166287420ec4cfbc49b3384e48b6c',
        language: 'Solidity 0.3.2',
    },
    spec: {
        constructors: [
            {
                args: [
                    {
                        label: '_router',
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
                default: false,
                docs: [''],
                label: 'new',
                payable: false,
                returnType: null,
                selector: '0xf01fa595',
            },
        ],
        docs: [
            'The backstop pool takes most of the risk of a set of swap pools\nbacked by it. Whenever a swap pool is low on reserves and a LPer\nwants to withdraw some liquidity, they can conduct an insurance\nwithdrawal (burn swap pool shares, reimbursed in backstop liquidity)\nto avoid paying a high slippage.\nThe backstop pool owns all excess liquidity in its swap pools,\nbut is also liable for potential liquidity gaps.\nIn return, the backstop pool receives a cut of the swap fees.',
        ],
        environment: {
            accountId: {
                displayName: ['AccountId'],
                type: 2,
            },
            balance: {
                displayName: ['Balance'],
                type: 11,
            },
            blockNumber: {
                displayName: ['BlockNumber'],
                type: 12,
            },
            chainExtension: {
                displayName: [],
                type: 0,
            },
            hash: {
                displayName: ['Hash'],
                type: 13,
            },
            maxEventTopics: 4,
            timestamp: {
                displayName: ['Timestamp'],
                type: 12,
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
                    {
                        docs: [],
                        indexed: false,
                        label: 'value',
                        type: {
                            displayName: ['uint256'],
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
                        label: 'spender',
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
                        label: 'value',
                        type: {
                            displayName: ['uint256'],
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
                        label: 'swapPool',
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
                docs: [
                    'emitted when a new swap pool is added to the backstop pool for coverage',
                ],
                label: 'SwapPoolAdded',
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
                        indexed: true,
                        label: 'swapPool',
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
                        label: 'insuranceFeeBps',
                        type: {
                            displayName: ['uint256'],
                            type: 3,
                        },
                    },
                ],
                docs: ['emitted when the insurance fee is set for a swap pool'],
                label: 'InsuranceFeeSet',
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
                        label: 'poolSharesMinted',
                        type: {
                            displayName: ['uint256'],
                            type: 3,
                        },
                    },
                    {
                        docs: [],
                        indexed: false,
                        label: 'amountPrincipleDeposited',
                        type: {
                            displayName: ['uint256'],
                            type: 3,
                        },
                    },
                ],
                docs: ['emitted on every deposit'],
                label: 'Mint',
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
                        label: 'poolSharesBurned',
                        type: {
                            displayName: ['uint256'],
                            type: 3,
                        },
                    },
                    {
                        docs: [],
                        indexed: false,
                        label: 'amountPrincipleWithdrawn',
                        type: {
                            displayName: ['uint256'],
                            type: 3,
                        },
                    },
                ],
                docs: [
                    'emitted on every withdrawal special case withdrawal using swap liquidiity: amountPrincipleWithdrawn = 0',
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
                        label: 'swapPool',
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
                        label: 'amountSwapShares',
                        type: {
                            displayName: ['uint256'],
                            type: 3,
                        },
                    },
                    {
                        docs: [],
                        indexed: false,
                        label: 'amountSwapTokens',
                        type: {
                            displayName: ['uint256'],
                            type: 3,
                        },
                    },
                    {
                        docs: [],
                        indexed: false,
                        label: 'amountBackstopTokens',
                        type: {
                            displayName: ['uint256'],
                            type: 3,
                        },
                    },
                ],
                docs: [
                    'emitted when a swap pool LP withdraws from backstop pool',
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
                        label: 'swapPool',
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
                        label: 'amountSwapTokens',
                        type: {
                            displayName: ['uint256'],
                            type: 3,
                        },
                    },
                    {
                        docs: [],
                        indexed: false,
                        label: 'amountBackstopTokens',
                        type: {
                            displayName: ['uint256'],
                            type: 3,
                        },
                    },
                ],
                docs: [
                    'emitted when a backstop pool LP withdraws liquidity from swap pool',
                ],
                label: 'WithdrawSwapLiquidity',
            },
        ],
        lang_error: {
            displayName: ['SolidityError'],
            type: 16,
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
                    type: 5,
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
                    type: 5,
                },
                selector: '0x95d89b41',
            },
            {
                args: [],
                default: false,
                docs: [''],
                label: 'totalSupply',
                mutates: false,
                payable: false,
                returnType: {
                    displayName: ['uint256'],
                    type: 3,
                },
                selector: '0x18160ddd',
            },
            {
                args: [
                    {
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
                default: false,
                docs: [''],
                label: 'balanceOf',
                mutates: false,
                payable: false,
                returnType: {
                    displayName: ['uint256'],
                    type: 3,
                },
                selector: '0x70a08231',
            },
            {
                args: [
                    {
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
                    {
                        label: 'amount',
                        type: {
                            displayName: ['uint256'],
                            type: 3,
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
                    type: 4,
                },
                selector: '0xa9059cbb',
            },
            {
                args: [
                    {
                        label: 'owner',
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
                        label: 'spender',
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
                label: 'allowance',
                mutates: false,
                payable: false,
                returnType: {
                    displayName: ['uint256'],
                    type: 3,
                },
                selector: '0xdd62ed3e',
            },
            {
                args: [
                    {
                        label: 'spender',
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
                        label: 'amount',
                        type: {
                            displayName: ['uint256'],
                            type: 3,
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
                    type: 4,
                },
                selector: '0x095ea7b3',
            },
            {
                args: [
                    {
                        label: 'from',
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
                    {
                        label: 'amount',
                        type: {
                            displayName: ['uint256'],
                            type: 3,
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
                    type: 4,
                },
                selector: '0x23b872dd',
            },
            {
                args: [
                    {
                        label: 'spender',
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
                        label: 'addedValue',
                        type: {
                            displayName: ['uint256'],
                            type: 3,
                        },
                    },
                ],
                default: false,
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
                            displayName: [
                                'ink_primitives',
                                'types',
                                'AccountId',
                            ],
                            type: 2,
                        },
                    },
                    {
                        label: 'subtractedValue',
                        type: {
                            displayName: ['uint256'],
                            type: 3,
                        },
                    },
                ],
                default: false,
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
                args: [],
                default: false,
                docs: [''],
                label: 'poolCap',
                mutates: false,
                payable: false,
                returnType: {
                    displayName: ['uint256'],
                    type: 3,
                },
                selector: '0xb954dc57',
            },
            {
                args: [],
                default: false,
                docs: ["Returns the pooled token's address"],
                label: 'asset',
                mutates: false,
                payable: false,
                returnType: {
                    displayName: ['ink_primitives', 'types', 'AccountId'],
                    type: 2,
                },
                selector: '0x38d52e0f',
            },
            {
                args: [],
                default: false,
                docs: ['Returns the decimals of the pool asset'],
                label: 'assetDecimals',
                mutates: false,
                payable: false,
                returnType: {
                    displayName: ['uint8'],
                    type: 0,
                },
                selector: '0xc2d41601',
            },
            {
                args: [],
                default: false,
                docs: [
                    'Returns the decimals of the LP token of this pool\nThis is defined to have the same decimals as the pool token itself\nin order to greatly simplify calculations that involve pool token amounts\nand LP token amounts',
                ],
                label: 'decimals',
                mutates: false,
                payable: false,
                returnType: {
                    displayName: ['uint8'],
                    type: 0,
                },
                selector: '0x313ce567',
            },
            {
                args: [],
                default: false,
                docs: [''],
                label: 'router',
                mutates: false,
                payable: false,
                returnType: {
                    displayName: ['ink_primitives', 'types', 'AccountId'],
                    type: 2,
                },
                selector: '0xf887ea40',
            },
            {
                args: [
                    {
                        label: '_maxTokens',
                        type: {
                            displayName: ['uint256'],
                            type: 3,
                        },
                    },
                ],
                default: false,
                docs: [
                    'Set new upper limit of pool reserves. Will disable deposits when reached. Can always set to an amount < current reserves to temporarily restrict deposits.',
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
                    {
                        label: '_insuranceFeeBps',
                        type: {
                            displayName: ['uint256'],
                            type: 3,
                        },
                    },
                ],
                default: false,
                docs: [
                    'Make this backstop pool cover another swap pool Beware: Adding a swap pool holding the same token as the backstop pool\ncan easily cause undesirable conditions and must be secured (i.e. long time lock)!',
                ],
                label: 'addSwapPool',
                mutates: true,
                payable: false,
                returnType: {
                    displayName: ['bool'],
                    type: 4,
                },
                selector: '0xabb26587',
            },
            {
                args: [
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
                    {
                        label: '_insuranceFeeBps',
                        type: {
                            displayName: ['uint256'],
                            type: 3,
                        },
                    },
                ],
                default: false,
                docs: ["Change a swap pool's insurance withdrawal fee"],
                label: 'setInsuranceFee',
                mutates: true,
                payable: false,
                returnType: {
                    displayName: ['bool'],
                    type: 4,
                },
                selector: '0xc6a78196',
            },
            {
                args: [
                    {
                        label: '_index',
                        type: {
                            displayName: ['uint256'],
                            type: 3,
                        },
                    },
                ],
                default: false,
                docs: ['enumerate swap pools backed by this backstop pool'],
                label: 'getBackedPool',
                mutates: false,
                payable: false,
                returnType: {
                    displayName: ['ink_primitives', 'types', 'AccountId'],
                    type: 2,
                },
                selector: '0xa04345f2',
            },
            {
                args: [],
                default: false,
                docs: ['get swap pool count backed by this backstop pool'],
                label: 'getBackedPoolCount',
                mutates: false,
                payable: false,
                returnType: {
                    displayName: ['uint256'],
                    type: 3,
                },
                selector: '0x5fda8689',
            },
            {
                args: [
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
                docs: ['get insurance withdrawal fee for a given swap pool'],
                label: 'getInsuranceFee',
                mutates: false,
                payable: false,
                returnType: {
                    displayName: ['uint256'],
                    type: 3,
                },
                selector: '0x504e0153',
            },
            {
                args: [
                    {
                        label: '_depositAmount',
                        type: {
                            displayName: ['uint256'],
                            type: 3,
                        },
                    },
                ],
                default: false,
                docs: [
                    'Deposits amount of tokens into pool Will change cov ratio of pool, will increase delta to 0',
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
                        label: '_sharesToBurn',
                        type: {
                            displayName: ['uint256'],
                            type: 3,
                        },
                    },
                    {
                        label: '_minimumAmount',
                        type: {
                            displayName: ['uint256'],
                            type: 3,
                        },
                    },
                ],
                default: false,
                docs: [
                    'Withdraws liquidity amount of asset ensuring minimum amount required Slippage is applied (withdrawal fee)',
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
                            displayName: [
                                'ink_primitives',
                                'types',
                                'AccountId',
                            ],
                            type: 2,
                        },
                    },
                    {
                        label: '_shares',
                        type: {
                            displayName: ['uint256'],
                            type: 3,
                        },
                    },
                    {
                        label: '_minAmount',
                        type: {
                            displayName: ['uint256'],
                            type: 3,
                        },
                    },
                ],
                default: false,
                docs: [
                    "withdraw from a swap pool using backstop liquidity without slippage only possible if swap pool's coverage ratio < 100%",
                ],
                label: 'redeemSwapPoolShares',
                mutates: true,
                payable: false,
                returnType: {
                    displayName: ['uint256'],
                    type: 3,
                },
                selector: '0x6e7e91fd',
            },
            {
                args: [
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
                    {
                        label: '_shares',
                        type: {
                            displayName: ['uint256'],
                            type: 3,
                        },
                    },
                    {
                        label: '_minAmount',
                        type: {
                            displayName: ['uint256'],
                            type: 3,
                        },
                    },
                ],
                default: false,
                docs: [
                    'withdraw from backstop pool, but receive excess liquidity\nof a swap pool without slippage, instead of backstop liquidity',
                ],
                label: 'withdrawExcessSwapLiquidity',
                mutates: true,
                payable: false,
                returnType: {
                    displayName: ['uint256'],
                    type: 3,
                },
                selector: '0xcaf8c105',
            },
            {
                args: [],
                default: false,
                docs: [
                    "return worth of the whole backstop pool in `asset()`, incl. all\nswap pools' excess liquidity and the backstop pool's liabilities\nthis is a fixed point number, using the backstop pool decimals",
                ],
                label: 'getTotalPoolWorth',
                mutates: false,
                payable: false,
                returnType: {
                    displayName: ['int256'],
                    type: 7,
                },
                selector: '0x18ba24c4',
            },
            {
                args: [
                    {
                        label: '_sharesToBurn',
                        type: {
                            displayName: ['uint256'],
                            type: 3,
                        },
                    },
                ],
                default: false,
                docs: [
                    'Returns the worth of an amount of pool shares (LP tokens) in underlying principle',
                ],
                label: 'sharesTargetWorth',
                mutates: false,
                payable: false,
                returnType: {
                    displayName: ['uint256'],
                    type: 3,
                },
                selector: '0xcc045745',
            },
            {
                args: [],
                default: false,
                docs: ['returns the backstop pool state'],
                label: 'getPoolState',
                mutates: false,
                payable: false,
                returnType: {
                    displayName: [
                        'BackstopPool',
                        'getPoolState',
                        'return_type',
                    ],
                    type: 10,
                },
                selector: '0x217ac237',
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
                                    ty: 0,
                                },
                            },
                            root_key: '0x00000009',
                        },
                    },
                    name: 'poolAssetDecimals',
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
                    name: 'poolCap',
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
                                                    key: '0x0000000b',
                                                    ty: 1,
                                                },
                                            },
                                            name: '',
                                        },
                                    ],
                                    name: 'AccountId',
                                },
                            },
                            root_key: '0x0000000b',
                        },
                    },
                    name: 'router',
                },
                {
                    layout: {
                        root: {
                            layout: {
                                leaf: {
                                    key: '0x0000000c',
                                    ty: 6,
                                },
                            },
                            root_key: '0x0000000c',
                        },
                    },
                    name: 'swapPools',
                },
                {
                    layout: {
                        root: {
                            layout: {
                                leaf: {
                                    key: '0x0000000d',
                                    ty: 3,
                                },
                            },
                            root_key: '0x0000000d',
                        },
                    },
                    name: 'swapPoolInsuranceFeeBps',
                },
                {
                    layout: {
                        root: {
                            layout: {
                                leaf: {
                                    key: '0x0000000e',
                                    ty: 4,
                                },
                            },
                            root_key: '0x0000000e',
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
                path: ['int256'],
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
                    tuple: [3, 7, 3],
                },
                path: ['BackstopPool', 'getPoolState', 'return_type'],
            },
        },
        {
            id: 11,
            type: {
                def: {
                    primitive: 'u128',
                },
                path: ['uint128'],
            },
        },
        {
            id: 12,
            type: {
                def: {
                    primitive: 'u64',
                },
                path: ['uint64'],
            },
        },
        {
            id: 13,
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
            id: 14,
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
                path: ['0x08c379a0'],
            },
        },
        {
            id: 15,
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
            id: 16,
            type: {
                def: {
                    variant: {
                        variants: [
                            {
                                fields: [
                                    {
                                        type: 14,
                                    },
                                ],
                                index: 0,
                                name: 'Error',
                            },
                            {
                                fields: [
                                    {
                                        type: 15,
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

    totalSupply(): Promise<uint256> {
        return this.stateCall('0x18160ddd', [])
    }

    balanceOf(account: AccountId): Promise<uint256> {
        return this.stateCall('0x70a08231', [account])
    }

    allowance(owner: AccountId, spender: AccountId): Promise<uint256> {
        return this.stateCall('0xdd62ed3e', [owner, spender])
    }

    paused(): Promise<bool> {
        return this.stateCall('0x5c975abb', [])
    }

    owner(): Promise<AccountId> {
        return this.stateCall('0x8da5cb5b', [])
    }

    poolCap(): Promise<uint256> {
        return this.stateCall('0xb954dc57', [])
    }

    asset(): Promise<AccountId> {
        return this.stateCall('0x38d52e0f', [])
    }

    assetDecimals(): Promise<uint8> {
        return this.stateCall('0xc2d41601', [])
    }

    decimals(): Promise<uint8> {
        return this.stateCall('0x313ce567', [])
    }

    router(): Promise<AccountId> {
        return this.stateCall('0xf887ea40', [])
    }

    getBackedPool(_index: uint256): Promise<AccountId> {
        return this.stateCall('0xa04345f2', [_index])
    }

    getBackedPoolCount(): Promise<uint256> {
        return this.stateCall('0x5fda8689', [])
    }

    getInsuranceFee(_swapPool: AccountId): Promise<uint256> {
        return this.stateCall('0x504e0153', [_swapPool])
    }

    getTotalPoolWorth(): Promise<int256> {
        return this.stateCall('0x18ba24c4', [])
    }

    sharesTargetWorth(_sharesToBurn: uint256): Promise<uint256> {
        return this.stateCall('0xcc045745', [_sharesToBurn])
    }

    getPoolState(): Promise<[uint256, int256, uint256]> {
        return this.stateCall('0x217ac237', [])
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

export type int256 = bigint

export type uint8 = number

export type bool = boolean

export type AccountId = Bytes

export type uint256 = bigint

export type Constructor = Constructor_new

/**
 *
 */
export interface Constructor_new {
    __kind: 'new'
    router: AccountId
    asset: AccountId
    name: string
    symbol: string
}

export type Message =
    | Message_addSwapPool
    | Message_allowance
    | Message_approve
    | Message_asset
    | Message_assetDecimals
    | Message_balanceOf
    | Message_decimals
    | Message_decreaseAllowance
    | Message_deposit
    | Message_getBackedPool
    | Message_getBackedPoolCount
    | Message_getInsuranceFee
    | Message_getPoolState
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
    | Message_symbol
    | Message_totalSupply
    | Message_transfer
    | Message_transferFrom
    | Message_transferOwnership
    | Message_withdraw
    | Message_withdrawExcessSwapLiquidity

/**
 * Make this backstop pool cover another swap pool Beware: Adding a swap pool holding the same token as the backstop pool
can easily cause undesirable conditions and must be secured (i.e. long time lock)!
 */
export interface Message_addSwapPool {
    __kind: 'addSwapPool'
    swapPool: AccountId
    insuranceFeeBps: uint256
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
    amount: uint256
}

/**
 * Returns the pooled token's address
 */
export interface Message_asset {
    __kind: 'asset'
}

/**
 * Returns the decimals of the pool asset
 */
export interface Message_assetDecimals {
    __kind: 'assetDecimals'
}

/**
 *
 */
export interface Message_balanceOf {
    __kind: 'balanceOf'
    account: AccountId
}

/**
 * Returns the decimals of the LP token of this pool
This is defined to have the same decimals as the pool token itself
in order to greatly simplify calculations that involve pool token amounts
and LP token amounts
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
    subtractedValue: uint256
}

/**
 * Deposits amount of tokens into pool Will change cov ratio of pool, will increase delta to 0
 */
export interface Message_deposit {
    __kind: 'deposit'
    depositAmount: uint256
}

/**
 * enumerate swap pools backed by this backstop pool
 */
export interface Message_getBackedPool {
    __kind: 'getBackedPool'
    index: uint256
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
 * returns the backstop pool state
 */
export interface Message_getPoolState {
    __kind: 'getPoolState'
}

/**
 * return worth of the whole backstop pool in `asset()`, incl. all
swap pools' excess liquidity and the backstop pool's liabilities
this is a fixed point number, using the backstop pool decimals
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
    addedValue: uint256
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
    shares: uint256
    minAmount: uint256
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
    insuranceFeeBps: uint256
}

/**
 * Set new upper limit of pool reserves. Will disable deposits when reached. Can always set to an amount < current reserves to temporarily restrict deposits.
 */
export interface Message_setPoolCap {
    __kind: 'setPoolCap'
    maxTokens: uint256
}

/**
 * Returns the worth of an amount of pool shares (LP tokens) in underlying principle
 */
export interface Message_sharesTargetWorth {
    __kind: 'sharesTargetWorth'
    sharesToBurn: uint256
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
    sharesToBurn: uint256
    minimumAmount: uint256
}

/**
 * withdraw from backstop pool, but receive excess liquidity
of a swap pool without slippage, instead of backstop liquidity
 */
export interface Message_withdrawExcessSwapLiquidity {
    __kind: 'withdrawExcessSwapLiquidity'
    swapPool: AccountId
    shares: uint256
    minAmount: uint256
}

export type Event =
    | Event_Approval
    | Event_Burn
    | Event_CoverSwapWithdrawal
    | Event_InsuranceFeeSet
    | Event_Mint
    | Event_OwnershipTransferred
    | Event_Paused
    | Event_SwapPoolAdded
    | Event_Transfer
    | Event_Unpaused
    | Event_WithdrawSwapLiquidity

export interface Event_Approval {
    __kind: 'Approval'
    owner: AccountId
    spender: AccountId
    value: uint256
}

export interface Event_Burn {
    __kind: 'Burn'
    sender: AccountId
    poolSharesBurned: uint256
    amountPrincipleWithdrawn: uint256
}

export interface Event_CoverSwapWithdrawal {
    __kind: 'CoverSwapWithdrawal'
    owner: AccountId
    swapPool: AccountId
    amountSwapShares: uint256
    amountSwapTokens: uint256
    amountBackstopTokens: uint256
}

export interface Event_InsuranceFeeSet {
    __kind: 'InsuranceFeeSet'
    sender: AccountId
    swapPool: AccountId
    insuranceFeeBps: uint256
}

export interface Event_Mint {
    __kind: 'Mint'
    sender: AccountId
    poolSharesMinted: uint256
    amountPrincipleDeposited: uint256
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

export interface Event_SwapPoolAdded {
    __kind: 'SwapPoolAdded'
    sender: AccountId
    swapPool: AccountId
}

export interface Event_Transfer {
    __kind: 'Transfer'
    from: AccountId
    to: AccountId
    value: uint256
}

export interface Event_Unpaused {
    __kind: 'Unpaused'
    account: AccountId
}

export interface Event_WithdrawSwapLiquidity {
    __kind: 'WithdrawSwapLiquidity'
    owner: AccountId
    swapPool: AccountId
    amountSwapTokens: uint256
    amountBackstopTokens: uint256
}

export type Result<T, E> =
    | { __kind: 'Ok'; value: T }
    | { __kind: 'Err'; value: E }
