import { Abi, Bytes, encodeCall, decodeResult } from '@subsquid/ink-abi'

export const metadata = {
    contract: {
        authors: ['unknown'],
        description:
            'Swap pool contract. May or may not be covered by a backstop pool. Conceptionally, there are two ways to temporarily disable a pool: The owner can either pause the pool, disabling deposits, swaps & backstop, or the owner can set the pool cap to zero which only prevents deposits. The former is for security incidents, the latter for phasing out a pool.',
        name: 'SwapPool',
        version: '0.0.1',
    },
    source: {
        compiler: 'solang 0.3.2',
        hash: '0x42108ada7515f8f4ab3ed8cea31e4c3456c433ce52fecb9d3a2afb33c727ab94',
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
                        label: '_slippageCurve',
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
                        label: '_backstop',
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
                        label: '_protocolTreasury',
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
                selector: '0x15c2c342',
            },
        ],
        docs: [
            'Swap pool contract. May or may not be covered by a backstop pool. Conceptionally, there are two ways to temporarily disable a pool: The owner can either pause the pool, disabling deposits, swaps & backstop, or the owner can set the pool cap to zero which only prevents deposits. The former is for security incidents, the latter for phasing out a pool.',
        ],
        environment: {
            accountId: {
                displayName: ['AccountId'],
                type: 2,
            },
            balance: {
                displayName: ['Balance'],
                type: 14,
            },
            blockNumber: {
                displayName: ['BlockNumber'],
                type: 15,
            },
            chainExtension: {
                displayName: [],
                type: 0,
            },
            hash: {
                displayName: ['Hash'],
                type: 16,
            },
            maxEventTopics: 4,
            timestamp: {
                displayName: ['Timestamp'],
                type: 15,
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
                        label: 'newProtocolTreasury',
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
                docs: ['emitted when the protocol treasury address is changed'],
                label: 'ProtocolTreasuryChanged',
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
                    'emitted on every withdrawal special case withdrawal using backstop liquidiity: amountPrincipleWithdrawn = 0',
                ],
                label: 'Burn',
            },
            {
                args: [
                    {
                        docs: [],
                        indexed: false,
                        label: 'recipient',
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
                ],
                docs: [
                    'emitted when a backstop pool LP withdraws liquidity from swap pool only possible if swap pool coverage ratio remains >= 100%',
                ],
                label: 'BackstopDrain',
            },
            {
                args: [
                    {
                        docs: [],
                        indexed: false,
                        label: 'lpFees',
                        type: {
                            displayName: ['uint256'],
                            type: 3,
                        },
                    },
                    {
                        docs: [],
                        indexed: false,
                        label: 'backstopFees',
                        type: {
                            displayName: ['uint256'],
                            type: 3,
                        },
                    },
                    {
                        docs: [],
                        indexed: false,
                        label: 'protocolFees',
                        type: {
                            displayName: ['uint256'],
                            type: 3,
                        },
                    },
                ],
                docs: [
                    'Tracks the exact amounts of individual fees paid during a swap',
                ],
                label: 'ChargedSwapFees',
            },
        ],
        lang_error: {
            displayName: ['SolidityError'],
            type: 19,
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
                label: 'totalLiabilities',
                mutates: false,
                payable: false,
                returnType: {
                    displayName: ['uint256'],
                    type: 3,
                },
                selector: '0xf73579a9',
            },
            {
                args: [],
                default: false,
                docs: [''],
                label: 'reserve',
                mutates: false,
                payable: false,
                returnType: {
                    displayName: ['uint256'],
                    type: 3,
                },
                selector: '0xcd3293de',
            },
            {
                args: [],
                default: false,
                docs: [''],
                label: 'reserveWithSlippage',
                mutates: false,
                payable: false,
                returnType: {
                    displayName: ['uint256'],
                    type: 3,
                },
                selector: '0x0b09d91e',
            },
            {
                args: [],
                default: false,
                docs: [''],
                label: 'insuranceWithdrawalTimelock',
                mutates: false,
                payable: false,
                returnType: {
                    displayName: ['uint256'],
                    type: 3,
                },
                selector: '0x0d3a7fd4',
            },
            {
                args: [],
                default: false,
                docs: [''],
                label: 'maxCoverageRatioForSwapIn',
                mutates: false,
                payable: false,
                returnType: {
                    displayName: ['uint256'],
                    type: 3,
                },
                selector: '0xb2f3447a',
            },
            {
                args: [],
                default: false,
                docs: [''],
                label: 'protocolTreasury',
                mutates: false,
                payable: false,
                returnType: {
                    displayName: ['ink_primitives', 'types', 'AccountId'],
                    type: 2,
                },
                selector: '0x803db96d',
            },
            {
                args: [],
                default: false,
                docs: [''],
                label: 'backstop',
                mutates: false,
                payable: false,
                returnType: {
                    displayName: ['ink_primitives', 'types', 'AccountId'],
                    type: 2,
                },
                selector: '0x7dea1817',
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
                args: [],
                default: false,
                docs: [''],
                label: 'slippageCurve',
                mutates: false,
                payable: false,
                returnType: {
                    displayName: ['ink_primitives', 'types', 'AccountId'],
                    type: 2,
                },
                selector: '0xebe26b9e',
            },
            {
                args: [
                    {
                        label: '_durationInBlocks',
                        type: {
                            displayName: ['uint256'],
                            type: 3,
                        },
                    },
                ],
                default: false,
                docs: [
                    'Set new insurance withdrawal time lock. Can only be called by the owner',
                ],
                label: 'setInsuranceWithdrawalTimelock',
                mutates: true,
                payable: false,
                returnType: null,
                selector: '0xcfcc238d',
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
                        label: '_maxCoverageRatio',
                        type: {
                            displayName: ['uint256'],
                            type: 3,
                        },
                    },
                ],
                default: false,
                docs: [
                    'Set new upper limit of pool coverage ratio (reserves / liabilities) for swap-in',
                ],
                label: 'setMaxCoverageRatioForSwapIn',
                mutates: true,
                payable: false,
                returnType: null,
                selector: '0x0668d07c',
            },
            {
                args: [
                    {
                        label: '_lpFee',
                        type: {
                            displayName: ['uint256'],
                            type: 3,
                        },
                    },
                    {
                        label: '_backstopFee',
                        type: {
                            displayName: ['uint256'],
                            type: 3,
                        },
                    },
                    {
                        label: '_protocolFee',
                        type: {
                            displayName: ['uint256'],
                            type: 3,
                        },
                    },
                ],
                default: false,
                docs: [
                    'Set swap fees (applied when swapping funds out of the pool)',
                ],
                label: 'setSwapFees',
                mutates: true,
                payable: false,
                returnType: null,
                selector: '0xeb43434e',
            },
            {
                args: [],
                default: false,
                docs: ['Return the configured swap fees for this pool'],
                label: 'swapFees',
                mutates: false,
                payable: false,
                returnType: {
                    displayName: ['SwapPool', 'swapFees', 'return_type'],
                    type: 8,
                },
                selector: '0xb9ccf21d',
            },
            {
                args: [
                    {
                        label: '_newProtocolTreasury',
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
                docs: ['Set new treasury address'],
                label: 'setProtocolTreasury',
                mutates: true,
                payable: false,
                returnType: {
                    displayName: ['bool'],
                    type: 4,
                },
                selector: '0x0c5a61f8',
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
                    displayName: ['SwapPool', 'deposit', 'return_type'],
                    type: 10,
                },
                selector: '0xb6b55f25',
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
                    'Get a quote for the effective amount of tokens for a deposit',
                ],
                label: 'quoteDeposit',
                mutates: false,
                payable: false,
                returnType: {
                    displayName: ['uint256'],
                    type: 3,
                },
                selector: '0xdb431f06',
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
                    'Withdraws liquidity amount of asset ensuring minimum amount required',
                ],
                label: 'withdraw',
                mutates: true,
                payable: false,
                returnType: {
                    displayName: ['SwapPool', 'withdraw', 'return_type'],
                    type: 11,
                },
                selector: '0x441a3e70',
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
                    'Get a quote for the effective amount of tokens for a withdrawal',
                ],
                label: 'quoteWithdraw',
                mutates: false,
                payable: false,
                returnType: {
                    displayName: ['uint256'],
                    type: 3,
                },
                selector: '0xec211840',
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
                            type: 2,
                        },
                    },
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
                    'Burns LP tokens of owner, will get compensated using backstop liquidity Can only be invoked by backstop pool, disabled when pool is paused',
                ],
                label: 'backstopBurn',
                mutates: true,
                payable: false,
                returnType: {
                    displayName: ['uint256'],
                    type: 3,
                },
                selector: '0xe45f37bd',
            },
            {
                args: [
                    {
                        label: '_amount',
                        type: {
                            displayName: ['uint256'],
                            type: 3,
                        },
                    },
                    {
                        label: '_recipient',
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
                    "For backstop pool to withdraw liquidity if swap pool's coverage ratio > 100% Can only be invoked by backstop pool",
                ],
                label: 'backstopDrain',
                mutates: true,
                payable: false,
                returnType: {
                    displayName: ['uint256'],
                    type: 3,
                },
                selector: '0xc2cb15de',
            },
            {
                args: [
                    {
                        label: '_amount',
                        type: {
                            displayName: ['uint256'],
                            type: 3,
                        },
                    },
                ],
                default: false,
                docs: [
                    'Get a quote for the effective amount of tokens for a backstop drain',
                ],
                label: 'quoteBackstopDrain',
                mutates: false,
                payable: false,
                returnType: {
                    displayName: ['uint256'],
                    type: 3,
                },
                selector: '0xe237fb3d',
            },
            {
                args: [
                    {
                        label: '_amount',
                        type: {
                            displayName: ['uint256'],
                            type: 3,
                        },
                    },
                ],
                default: false,
                docs: [
                    'Get called by Router to deposit an amount of pool asset Can only be called by Router',
                ],
                label: 'swapIntoFromRouter',
                mutates: true,
                payable: false,
                returnType: {
                    displayName: ['uint256'],
                    type: 3,
                },
                selector: '0x4d8ea83f',
            },
            {
                args: [
                    {
                        label: '_amount',
                        type: {
                            displayName: ['uint256'],
                            type: 3,
                        },
                    },
                ],
                default: false,
                docs: [
                    'Get a quote for the effective amount of tokens for a swap into',
                ],
                label: 'quoteSwapInto',
                mutates: false,
                payable: false,
                returnType: {
                    displayName: ['uint256'],
                    type: 3,
                },
                selector: '0x3c945248',
            },
            {
                args: [
                    {
                        label: '_amount',
                        type: {
                            displayName: ['uint256'],
                            type: 3,
                        },
                    },
                ],
                default: false,
                docs: [
                    'get called by Router to withdraw amount of pool asset Can only be called by Router',
                ],
                label: 'swapOutFromRouter',
                mutates: true,
                payable: false,
                returnType: {
                    displayName: ['uint256'],
                    type: 3,
                },
                selector: '0x5f79d44f',
            },
            {
                args: [
                    {
                        label: '_amount',
                        type: {
                            displayName: ['uint256'],
                            type: 3,
                        },
                    },
                ],
                default: false,
                docs: [
                    'Get a quote for the effective amount of tokens, incl. slippage and fees',
                ],
                label: 'quoteSwapOut',
                mutates: false,
                payable: false,
                returnType: {
                    displayName: ['SwapPool', 'quoteSwapOut', 'return_type'],
                    type: 12,
                },
                selector: '0x8735c246',
            },
            {
                args: [],
                default: false,
                docs: ['Pause deposits and swaps'],
                label: 'pause',
                mutates: true,
                payable: false,
                returnType: null,
                selector: '0x8456cb59',
            },
            {
                args: [],
                default: false,
                docs: ['Resume deposits and swaps'],
                label: 'unpause',
                mutates: true,
                payable: false,
                returnType: null,
                selector: '0x3f4ba83a',
            },
            {
                args: [],
                default: false,
                docs: ['returns pool coverage ratio'],
                label: 'coverage',
                mutates: false,
                payable: false,
                returnType: {
                    displayName: ['SwapPool', 'coverage', 'return_type'],
                    type: 13,
                },
                selector: '0xee8f6a0e',
            },
            {
                args: [],
                default: false,
                docs: [
                    'Computes the excess liquidity that forms that valuation of the backstop pool is defined as b + C - B - L where - b is reserve - C is the amount of `asset()` tokens in the pool - B is reserveWithSlippage - L is totalLiabilities The excess liquidity is a fixed point number using the decimals of this pool',
                ],
                label: 'getExcessLiquidity',
                mutates: false,
                payable: false,
                returnType: {
                    displayName: ['int256'],
                    type: 9,
                },
                selector: '0xace0f0d5',
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
                                leaf: {
                                    key: '0x0000000b',
                                    ty: 3,
                                },
                            },
                            root_key: '0x0000000b',
                        },
                    },
                    name: 'totalLiabilities',
                },
                {
                    layout: {
                        root: {
                            layout: {
                                leaf: {
                                    key: '0x0000000c',
                                    ty: 3,
                                },
                            },
                            root_key: '0x0000000c',
                        },
                    },
                    name: 'reserve',
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
                    name: 'reserveWithSlippage',
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
                    name: 'insuranceWithdrawalTimelock',
                },
                {
                    layout: {
                        root: {
                            layout: {
                                leaf: {
                                    key: '0x0000000f',
                                    ty: 3,
                                },
                            },
                            root_key: '0x0000000f',
                        },
                    },
                    name: 'maxCoverageRatioForSwapIn',
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
                                                    key: '0x00000010',
                                                    ty: 1,
                                                },
                                            },
                                            name: '',
                                        },
                                    ],
                                    name: 'AccountId',
                                },
                            },
                            root_key: '0x00000010',
                        },
                    },
                    name: 'protocolTreasury',
                },
                {
                    layout: {
                        root: {
                            layout: {
                                leaf: {
                                    key: '0x00000011',
                                    ty: 3,
                                },
                            },
                            root_key: '0x00000011',
                        },
                    },
                    name: 'latestDepositAtBlockNo',
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
                                                    key: '0x00000012',
                                                    ty: 6,
                                                },
                                            },
                                            name: 'lpFee',
                                        },
                                        {
                                            layout: {
                                                leaf: {
                                                    key: '0x00000012',
                                                    ty: 6,
                                                },
                                            },
                                            name: 'backstopFee',
                                        },
                                        {
                                            layout: {
                                                leaf: {
                                                    key: '0x00000012',
                                                    ty: 6,
                                                },
                                            },
                                            name: 'protocolFee',
                                        },
                                    ],
                                    name: 'SwapFees',
                                },
                            },
                            root_key: '0x00000012',
                        },
                    },
                    name: 'swapFeeConfig',
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
                                                    key: '0x00000015',
                                                    ty: 1,
                                                },
                                            },
                                            name: '',
                                        },
                                    ],
                                    name: 'AccountId',
                                },
                            },
                            root_key: '0x00000015',
                        },
                    },
                    name: 'backstop',
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
                                                    key: '0x00000016',
                                                    ty: 1,
                                                },
                                            },
                                            name: '',
                                        },
                                    ],
                                    name: 'AccountId',
                                },
                            },
                            root_key: '0x00000016',
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
                                                    key: '0x00000017',
                                                    ty: 1,
                                                },
                                            },
                                            name: '',
                                        },
                                    ],
                                    name: 'AccountId',
                                },
                            },
                            root_key: '0x00000017',
                        },
                    },
                    name: 'slippageCurve',
                },
            ],
            name: 'SwapPool',
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
                    primitive: 'u32',
                },
                path: ['uint32'],
            },
        },
        {
            id: 7,
            type: {
                def: {
                    composite: {
                        fields: [
                            {
                                name: 'lpFee',
                                type: 6,
                            },
                            {
                                name: 'backstopFee',
                                type: 6,
                            },
                            {
                                name: 'protocolFee',
                                type: 6,
                            },
                        ],
                    },
                },
                path: ['SwapFees'],
            },
        },
        {
            id: 8,
            type: {
                def: {
                    tuple: [3, 3, 3],
                },
                path: ['SwapPool', 'swapFees', 'return_type'],
            },
        },
        {
            id: 9,
            type: {
                def: {
                    primitive: 'i256',
                },
                path: ['int256'],
            },
        },
        {
            id: 10,
            type: {
                def: {
                    tuple: [3, 9],
                },
                path: ['SwapPool', 'deposit', 'return_type'],
            },
        },
        {
            id: 11,
            type: {
                def: {
                    tuple: [3, 9],
                },
                path: ['SwapPool', 'withdraw', 'return_type'],
            },
        },
        {
            id: 12,
            type: {
                def: {
                    tuple: [3, 3, 3, 3],
                },
                path: ['SwapPool', 'quoteSwapOut', 'return_type'],
            },
        },
        {
            id: 13,
            type: {
                def: {
                    tuple: [3, 3],
                },
                path: ['SwapPool', 'coverage', 'return_type'],
            },
        },
        {
            id: 14,
            type: {
                def: {
                    primitive: 'u128',
                },
                path: ['uint128'],
            },
        },
        {
            id: 15,
            type: {
                def: {
                    primitive: 'u64',
                },
                path: ['uint64'],
            },
        },
        {
            id: 16,
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
            id: 17,
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
            id: 18,
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
            id: 19,
            type: {
                def: {
                    variant: {
                        variants: [
                            {
                                fields: [
                                    {
                                        type: 17,
                                    },
                                ],
                                index: 0,
                                name: 'Error',
                            },
                            {
                                fields: [
                                    {
                                        type: 18,
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

    totalLiabilities(): Promise<uint256> {
        return this.stateCall('0xf73579a9', [])
    }

    reserve(): Promise<uint256> {
        return this.stateCall('0xcd3293de', [])
    }

    reserveWithSlippage(): Promise<uint256> {
        return this.stateCall('0x0b09d91e', [])
    }

    insuranceWithdrawalTimelock(): Promise<uint256> {
        return this.stateCall('0x0d3a7fd4', [])
    }

    maxCoverageRatioForSwapIn(): Promise<uint256> {
        return this.stateCall('0xb2f3447a', [])
    }

    protocolTreasury(): Promise<AccountId> {
        return this.stateCall('0x803db96d', [])
    }

    backstop(): Promise<AccountId> {
        return this.stateCall('0x7dea1817', [])
    }

    router(): Promise<AccountId> {
        return this.stateCall('0xf887ea40', [])
    }

    slippageCurve(): Promise<AccountId> {
        return this.stateCall('0xebe26b9e', [])
    }

    swapFees(): Promise<return_type> {
        return this.stateCall('0xb9ccf21d', [])
    }

    quoteDeposit(_depositAmount: uint256): Promise<uint256> {
        return this.stateCall('0xdb431f06', [_depositAmount])
    }

    quoteWithdraw(_sharesToBurn: uint256): Promise<uint256> {
        return this.stateCall('0xec211840', [_sharesToBurn])
    }

    quoteBackstopDrain(_amount: uint256): Promise<uint256> {
        return this.stateCall('0xe237fb3d', [_amount])
    }

    quoteSwapInto(_amount: uint256): Promise<uint256> {
        return this.stateCall('0x3c945248', [_amount])
    }

    quoteSwapOut(
        _amount: uint256
    ): Promise<[uint256, uint256, uint256, uint256]> {
        return this.stateCall('0x8735c246', [_amount])
    }

    coverage(): Promise<[uint256, uint256]> {
        return this.stateCall('0xee8f6a0e', [])
    }

    getExcessLiquidity(): Promise<int256> {
        return this.stateCall('0xace0f0d5', [])
    }

    sharesTargetWorth(_sharesToBurn: uint256): Promise<uint256> {
        return this.stateCall('0xcc045745', [_sharesToBurn])
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

export type int256 = bigint

export type return_type = [uint256, uint256, uint256]

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
    asset: AccountId
    slippageCurve: AccountId
    router: AccountId
    backstop: AccountId
    protocolTreasury: AccountId
    name: string
    symbol: string
}

export type Message =
    | Message_allowance
    | Message_approve
    | Message_asset
    | Message_assetDecimals
    | Message_backstop
    | Message_backstopBurn
    | Message_backstopDrain
    | Message_balanceOf
    | Message_coverage
    | Message_decimals
    | Message_decreaseAllowance
    | Message_deposit
    | Message_getExcessLiquidity
    | Message_increaseAllowance
    | Message_insuranceWithdrawalTimelock
    | Message_maxCoverageRatioForSwapIn
    | Message_name
    | Message_owner
    | Message_pause
    | Message_paused
    | Message_poolCap
    | Message_protocolTreasury
    | Message_quoteBackstopDrain
    | Message_quoteDeposit
    | Message_quoteSwapInto
    | Message_quoteSwapOut
    | Message_quoteWithdraw
    | Message_renounceOwnership
    | Message_reserve
    | Message_reserveWithSlippage
    | Message_router
    | Message_setInsuranceWithdrawalTimelock
    | Message_setMaxCoverageRatioForSwapIn
    | Message_setPoolCap
    | Message_setProtocolTreasury
    | Message_setSwapFees
    | Message_sharesTargetWorth
    | Message_slippageCurve
    | Message_swapFees
    | Message_swapIntoFromRouter
    | Message_swapOutFromRouter
    | Message_symbol
    | Message_totalLiabilities
    | Message_totalSupply
    | Message_transfer
    | Message_transferFrom
    | Message_transferOwnership
    | Message_unpause
    | Message_withdraw

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
export interface Message_backstop {
    __kind: 'backstop'
}

/**
 * Burns LP tokens of owner, will get compensated using backstop liquidity Can only be invoked by backstop pool, disabled when pool is paused
 */
export interface Message_backstopBurn {
    __kind: 'backstopBurn'
    owner: AccountId
    sharesToBurn: uint256
}

/**
 * For backstop pool to withdraw liquidity if swap pool's coverage ratio > 100% Can only be invoked by backstop pool
 */
export interface Message_backstopDrain {
    __kind: 'backstopDrain'
    amount: uint256
    recipient: AccountId
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
 * Computes the excess liquidity that forms that valuation of the backstop pool is defined as b + C - B - L where - b is reserve - C is the amount of `asset()` tokens in the pool - B is reserveWithSlippage - L is totalLiabilities The excess liquidity is a fixed point number using the decimals of this pool
 */
export interface Message_getExcessLiquidity {
    __kind: 'getExcessLiquidity'
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
export interface Message_insuranceWithdrawalTimelock {
    __kind: 'insuranceWithdrawalTimelock'
}

/**
 *
 */
export interface Message_maxCoverageRatioForSwapIn {
    __kind: 'maxCoverageRatioForSwapIn'
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
 * Pause deposits and swaps
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
export interface Message_poolCap {
    __kind: 'poolCap'
}

/**
 *
 */
export interface Message_protocolTreasury {
    __kind: 'protocolTreasury'
}

/**
 * Get a quote for the effective amount of tokens for a backstop drain
 */
export interface Message_quoteBackstopDrain {
    __kind: 'quoteBackstopDrain'
    amount: uint256
}

/**
 * Get a quote for the effective amount of tokens for a deposit
 */
export interface Message_quoteDeposit {
    __kind: 'quoteDeposit'
    depositAmount: uint256
}

/**
 * Get a quote for the effective amount of tokens for a swap into
 */
export interface Message_quoteSwapInto {
    __kind: 'quoteSwapInto'
    amount: uint256
}

/**
 * Get a quote for the effective amount of tokens, incl. slippage and fees
 */
export interface Message_quoteSwapOut {
    __kind: 'quoteSwapOut'
    amount: uint256
}

/**
 * Get a quote for the effective amount of tokens for a withdrawal
 */
export interface Message_quoteWithdraw {
    __kind: 'quoteWithdraw'
    sharesToBurn: uint256
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
export interface Message_reserve {
    __kind: 'reserve'
}

/**
 *
 */
export interface Message_reserveWithSlippage {
    __kind: 'reserveWithSlippage'
}

/**
 *
 */
export interface Message_router {
    __kind: 'router'
}

/**
 * Set new insurance withdrawal time lock. Can only be called by the owner
 */
export interface Message_setInsuranceWithdrawalTimelock {
    __kind: 'setInsuranceWithdrawalTimelock'
    durationInBlocks: uint256
}

/**
 * Set new upper limit of pool coverage ratio (reserves / liabilities) for swap-in
 */
export interface Message_setMaxCoverageRatioForSwapIn {
    __kind: 'setMaxCoverageRatioForSwapIn'
    maxCoverageRatio: uint256
}

/**
 * Set new upper limit of pool reserves. Will disable deposits when reached. Can always set to an amount < current reserves to temporarily restrict deposits.
 */
export interface Message_setPoolCap {
    __kind: 'setPoolCap'
    maxTokens: uint256
}

/**
 * Set new treasury address
 */
export interface Message_setProtocolTreasury {
    __kind: 'setProtocolTreasury'
    newProtocolTreasury: AccountId
}

/**
 * Set swap fees (applied when swapping funds out of the pool)
 */
export interface Message_setSwapFees {
    __kind: 'setSwapFees'
    lpFee: uint256
    backstopFee: uint256
    protocolFee: uint256
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
export interface Message_slippageCurve {
    __kind: 'slippageCurve'
}

/**
 * Return the configured swap fees for this pool
 */
export interface Message_swapFees {
    __kind: 'swapFees'
}

/**
 * Get called by Router to deposit an amount of pool asset Can only be called by Router
 */
export interface Message_swapIntoFromRouter {
    __kind: 'swapIntoFromRouter'
    amount: uint256
}

/**
 * get called by Router to withdraw amount of pool asset Can only be called by Router
 */
export interface Message_swapOutFromRouter {
    __kind: 'swapOutFromRouter'
    amount: uint256
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
export interface Message_totalLiabilities {
    __kind: 'totalLiabilities'
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
 * Resume deposits and swaps
 */
export interface Message_unpause {
    __kind: 'unpause'
}

/**
 * Withdraws liquidity amount of asset ensuring minimum amount required
 */
export interface Message_withdraw {
    __kind: 'withdraw'
    sharesToBurn: uint256
    minimumAmount: uint256
}

export type Event =
    | Event_Approval
    | Event_BackstopDrain
    | Event_Burn
    | Event_ChargedSwapFees
    | Event_Mint
    | Event_OwnershipTransferred
    | Event_Paused
    | Event_ProtocolTreasuryChanged
    | Event_Transfer
    | Event_Unpaused

export interface Event_Approval {
    __kind: 'Approval'
    owner: AccountId
    spender: AccountId
    value: uint256
}

export interface Event_BackstopDrain {
    __kind: 'BackstopDrain'
    recipient: AccountId
    amountSwapTokens: uint256
}

export interface Event_Burn {
    __kind: 'Burn'
    sender: AccountId
    poolSharesBurned: uint256
    amountPrincipleWithdrawn: uint256
}

export interface Event_ChargedSwapFees {
    __kind: 'ChargedSwapFees'
    lpFees: uint256
    backstopFees: uint256
    protocolFees: uint256
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

export interface Event_ProtocolTreasuryChanged {
    __kind: 'ProtocolTreasuryChanged'
    sender: AccountId
    newProtocolTreasury: AccountId
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

export type Result<T, E> =
    | { __kind: 'Ok'; value: T }
    | { __kind: 'Err'; value: E }
