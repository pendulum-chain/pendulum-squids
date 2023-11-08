export const ABI_JSON = [
    {
        type: 'constructor',
        stateMutability: 'undefined',
        payable: false,
        inputs: [
            {
                type: 'address',
                name: '_router',
            },
            {
                type: 'address',
                name: '_asset',
            },
            {
                type: 'address',
                name: '_curve',
            },
            {
                type: 'string',
                name: '_name',
            },
            {
                type: 'string',
                name: '_symbol',
            },
        ],
    },
    {
        type: 'event',
        anonymous: false,
        name: 'Approval',
        inputs: [
            {
                type: 'address',
                name: 'owner',
                indexed: true,
            },
            {
                type: 'address',
                name: 'spender',
                indexed: true,
            },
            {
                type: 'uint256',
                name: 'value',
                indexed: false,
            },
        ],
    },
    {
        type: 'event',
        anonymous: false,
        name: 'Burn',
        inputs: [
            {
                type: 'address',
                name: 'sender',
                indexed: true,
            },
            {
                type: 'uint256',
                name: 'poolSharesBurned',
                indexed: false,
            },
            {
                type: 'uint256',
                name: 'amountPrincipleWithdrawn',
                indexed: false,
            },
        ],
    },
    {
        type: 'event',
        anonymous: false,
        name: 'CoverSwapWithdrawal',
        inputs: [
            {
                type: 'address',
                name: 'owner',
                indexed: true,
            },
            {
                type: 'address',
                name: 'swapPool',
                indexed: false,
            },
            {
                type: 'uint256',
                name: 'amountSwapShares',
                indexed: false,
            },
            {
                type: 'uint256',
                name: 'amountSwapTokens',
                indexed: false,
            },
            {
                type: 'uint256',
                name: 'amountBackstopTokens',
                indexed: false,
            },
        ],
    },
    {
        type: 'event',
        anonymous: false,
        name: 'Mint',
        inputs: [
            {
                type: 'address',
                name: 'sender',
                indexed: true,
            },
            {
                type: 'uint256',
                name: 'poolSharesMinted',
                indexed: false,
            },
            {
                type: 'uint256',
                name: 'amountPrincipleDeposited',
                indexed: false,
            },
        ],
    },
    {
        type: 'event',
        anonymous: false,
        name: 'OwnershipTransferred',
        inputs: [
            {
                type: 'address',
                name: 'previousOwner',
                indexed: true,
            },
            {
                type: 'address',
                name: 'newOwner',
                indexed: true,
            },
        ],
    },
    {
        type: 'event',
        anonymous: false,
        name: 'Paused',
        inputs: [
            {
                type: 'address',
                name: 'account',
                indexed: false,
            },
        ],
    },
    {
        type: 'event',
        anonymous: false,
        name: 'Transfer',
        inputs: [
            {
                type: 'address',
                name: 'from',
                indexed: true,
            },
            {
                type: 'address',
                name: 'to',
                indexed: true,
            },
            {
                type: 'uint256',
                name: 'value',
                indexed: false,
            },
        ],
    },
    {
        type: 'event',
        anonymous: false,
        name: 'Unpaused',
        inputs: [
            {
                type: 'address',
                name: 'account',
                indexed: false,
            },
        ],
    },
    {
        type: 'event',
        anonymous: false,
        name: 'WithdrawSwapLiquidity',
        inputs: [
            {
                type: 'address',
                name: 'owner',
                indexed: true,
            },
            {
                type: 'address',
                name: 'swapPool',
                indexed: false,
            },
            {
                type: 'uint256',
                name: 'amountSwapTokens',
                indexed: false,
            },
            {
                type: 'uint256',
                name: 'amountBackstopTokens',
                indexed: false,
            },
        ],
    },
    {
        type: 'function',
        name: 'addSwapPool',
        constant: false,
        payable: false,
        inputs: [
            {
                type: 'address',
                name: '_swapPool',
            },
            {
                type: 'uint256',
                name: '_insuranceFeeBps',
            },
        ],
        outputs: [],
    },
    {
        type: 'function',
        name: 'allowance',
        constant: true,
        stateMutability: 'view',
        payable: false,
        inputs: [
            {
                type: 'address',
                name: 'owner',
            },
            {
                type: 'address',
                name: 'spender',
            },
        ],
        outputs: [
            {
                type: 'uint256',
                name: '',
            },
        ],
    },
    {
        type: 'function',
        name: 'approve',
        constant: false,
        payable: false,
        inputs: [
            {
                type: 'address',
                name: 'spender',
            },
            {
                type: 'uint256',
                name: 'amount',
            },
        ],
        outputs: [
            {
                type: 'bool',
                name: '',
            },
        ],
    },
    {
        type: 'function',
        name: 'asset',
        constant: true,
        stateMutability: 'view',
        payable: false,
        inputs: [],
        outputs: [
            {
                type: 'address',
                name: '_token',
            },
        ],
    },
    {
        type: 'function',
        name: 'balanceOf',
        constant: true,
        stateMutability: 'view',
        payable: false,
        inputs: [
            {
                type: 'address',
                name: 'account',
            },
        ],
        outputs: [
            {
                type: 'uint256',
                name: '',
            },
        ],
    },
    {
        type: 'function',
        name: 'coverage',
        constant: true,
        stateMutability: 'view',
        payable: false,
        inputs: [],
        outputs: [
            {
                type: 'uint256',
                name: '_reserves',
            },
            {
                type: 'uint256',
                name: '_liabilities',
            },
        ],
    },
    {
        type: 'function',
        name: 'decimals',
        constant: true,
        stateMutability: 'view',
        payable: false,
        inputs: [],
        outputs: [
            {
                type: 'uint8',
                name: '',
            },
        ],
    },
    {
        type: 'function',
        name: 'decreaseAllowance',
        constant: false,
        payable: false,
        inputs: [
            {
                type: 'address',
                name: 'spender',
            },
            {
                type: 'uint256',
                name: 'subtractedValue',
            },
        ],
        outputs: [
            {
                type: 'bool',
                name: '',
            },
        ],
    },
    {
        type: 'function',
        name: 'deposit',
        constant: false,
        payable: false,
        inputs: [
            {
                type: 'uint256',
                name: '_amount',
            },
        ],
        outputs: [
            {
                type: 'uint256',
                name: '_poolShares',
            },
            {
                type: 'int256',
                name: '_fee',
            },
        ],
    },
    {
        type: 'function',
        name: 'getBackedPool',
        constant: true,
        stateMutability: 'view',
        payable: false,
        inputs: [
            {
                type: 'uint256',
                name: '_index',
            },
        ],
        outputs: [
            {
                type: 'address',
                name: '_swapPool',
            },
        ],
    },
    {
        type: 'function',
        name: 'getBackedPoolCount',
        constant: true,
        stateMutability: 'view',
        payable: false,
        inputs: [],
        outputs: [
            {
                type: 'uint256',
                name: '_count',
            },
        ],
    },
    {
        type: 'function',
        name: 'getInsuranceFee',
        constant: true,
        stateMutability: 'view',
        payable: false,
        inputs: [
            {
                type: 'address',
                name: '_swapPool',
            },
        ],
        outputs: [
            {
                type: 'uint256',
                name: '_feeBps',
            },
        ],
    },
    {
        type: 'function',
        name: 'getTotalPoolWorth',
        constant: true,
        stateMutability: 'view',
        payable: false,
        inputs: [],
        outputs: [
            {
                type: 'uint256',
                name: '_value',
            },
        ],
    },
    {
        type: 'function',
        name: 'increaseAllowance',
        constant: false,
        payable: false,
        inputs: [
            {
                type: 'address',
                name: 'spender',
            },
            {
                type: 'uint256',
                name: 'addedValue',
            },
        ],
        outputs: [
            {
                type: 'bool',
                name: '',
            },
        ],
    },
    {
        type: 'function',
        name: 'name',
        constant: true,
        stateMutability: 'view',
        payable: false,
        inputs: [],
        outputs: [
            {
                type: 'string',
                name: '',
            },
        ],
    },
    {
        type: 'function',
        name: 'owner',
        constant: true,
        stateMutability: 'view',
        payable: false,
        inputs: [],
        outputs: [
            {
                type: 'address',
                name: '',
            },
        ],
    },
    {
        type: 'function',
        name: 'paused',
        constant: true,
        stateMutability: 'view',
        payable: false,
        inputs: [],
        outputs: [
            {
                type: 'bool',
                name: '',
            },
        ],
    },
    {
        type: 'function',
        name: 'poolCap',
        constant: true,
        stateMutability: 'view',
        payable: false,
        inputs: [],
        outputs: [
            {
                type: 'uint256',
                name: '',
            },
        ],
    },
    {
        type: 'function',
        name: 'redeemSwapPoolShares',
        constant: false,
        payable: false,
        inputs: [
            {
                type: 'address',
                name: '_swapPool',
            },
            {
                type: 'uint256',
                name: '_shares',
            },
            {
                type: 'uint256',
                name: '_minAmount',
            },
        ],
        outputs: [
            {
                type: 'uint256',
                name: '_netAmount',
            },
        ],
    },
    {
        type: 'function',
        name: 'renounceOwnership',
        constant: false,
        payable: false,
        inputs: [],
        outputs: [],
    },
    {
        type: 'function',
        name: 'router',
        constant: true,
        stateMutability: 'view',
        payable: false,
        inputs: [],
        outputs: [
            {
                type: 'address',
                name: '',
            },
        ],
    },
    {
        type: 'function',
        name: 'setInsuranceFee',
        constant: false,
        payable: false,
        inputs: [
            {
                type: 'address',
                name: '_swapPool',
            },
            {
                type: 'uint256',
                name: '_insuranceFeeBps',
            },
        ],
        outputs: [],
    },
    {
        type: 'function',
        name: 'setPoolCap',
        constant: false,
        payable: false,
        inputs: [
            {
                type: 'uint256',
                name: '_maxTokens',
            },
        ],
        outputs: [],
    },
    {
        type: 'function',
        name: 'sharesTargetWorth',
        constant: true,
        stateMutability: 'view',
        payable: false,
        inputs: [
            {
                type: 'uint256',
                name: '_shares',
            },
        ],
        outputs: [
            {
                type: 'uint256',
                name: '_amount',
            },
        ],
    },
    {
        type: 'function',
        name: 'slippageCurve',
        constant: true,
        stateMutability: 'view',
        payable: false,
        inputs: [],
        outputs: [
            {
                type: 'address',
                name: '',
            },
        ],
    },
    {
        type: 'function',
        name: 'symbol',
        constant: true,
        stateMutability: 'view',
        payable: false,
        inputs: [],
        outputs: [
            {
                type: 'string',
                name: '',
            },
        ],
    },
    {
        type: 'function',
        name: 'totalSupply',
        constant: true,
        stateMutability: 'view',
        payable: false,
        inputs: [],
        outputs: [
            {
                type: 'uint256',
                name: '',
            },
        ],
    },
    {
        type: 'function',
        name: 'transfer',
        constant: false,
        payable: false,
        inputs: [
            {
                type: 'address',
                name: 'to',
            },
            {
                type: 'uint256',
                name: 'amount',
            },
        ],
        outputs: [
            {
                type: 'bool',
                name: '',
            },
        ],
    },
    {
        type: 'function',
        name: 'transferFrom',
        constant: false,
        payable: false,
        inputs: [
            {
                type: 'address',
                name: 'from',
            },
            {
                type: 'address',
                name: 'to',
            },
            {
                type: 'uint256',
                name: 'amount',
            },
        ],
        outputs: [
            {
                type: 'bool',
                name: '',
            },
        ],
    },
    {
        type: 'function',
        name: 'transferOwnership',
        constant: false,
        payable: false,
        inputs: [
            {
                type: 'address',
                name: 'newOwner',
            },
        ],
        outputs: [],
    },
    {
        type: 'function',
        name: 'withdraw',
        constant: false,
        payable: false,
        inputs: [
            {
                type: 'uint256',
                name: '_shares',
            },
            {
                type: 'uint256',
                name: '_minimumAmount',
            },
        ],
        outputs: [
            {
                type: 'uint256',
                name: '_finalAmount',
            },
            {
                type: 'int256',
                name: '_fee',
            },
        ],
    },
    {
        type: 'function',
        name: 'withdrawExcessSwapLiquidity',
        constant: false,
        payable: false,
        inputs: [
            {
                type: 'address',
                name: '_swapPool',
            },
            {
                type: 'uint256',
                name: '_shares',
            },
            {
                type: 'uint256',
                name: '_minAmount',
            },
        ],
        outputs: [
            {
                type: 'uint256',
                name: '_swapAmount',
            },
        ],
    },
]
