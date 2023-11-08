export const ABI_JSON = [
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
        name: 'Swap',
        inputs: [
            {
                type: 'address',
                name: 'sender',
                indexed: true,
            },
            {
                type: 'uint256',
                name: 'amountIn',
                indexed: false,
            },
            {
                type: 'uint256',
                name: 'amountOut',
                indexed: false,
            },
            {
                type: 'address',
                name: 'tokenIn',
                indexed: false,
            },
            {
                type: 'address',
                name: 'tokenOut',
                indexed: false,
            },
            {
                type: 'address',
                name: 'to',
                indexed: true,
            },
        ],
    },
    {
        type: 'event',
        anonymous: false,
        name: 'SwapPoolRegistered',
        inputs: [
            {
                type: 'address',
                name: 'pool',
                indexed: false,
            },
            {
                type: 'address',
                name: 'asset',
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
        type: 'function',
        name: 'getAmountOut',
        constant: true,
        stateMutability: 'view',
        payable: false,
        inputs: [
            {
                type: 'uint256',
                name: '_amountIn',
            },
            {
                type: 'address[]',
                name: '_tokenInOut',
            },
        ],
        outputs: [
            {
                type: 'uint256',
                name: '_amountOut',
            },
        ],
    },
    {
        type: 'function',
        name: 'oracleByAsset',
        constant: true,
        stateMutability: 'view',
        payable: false,
        inputs: [
            {
                type: 'address',
                name: '',
            },
        ],
        outputs: [
            {
                type: 'address',
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
        name: 'pause',
        constant: false,
        payable: false,
        inputs: [],
        outputs: [],
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
        name: 'poolByAsset',
        constant: true,
        stateMutability: 'view',
        payable: false,
        inputs: [
            {
                type: 'address',
                name: '',
            },
        ],
        outputs: [
            {
                type: 'address',
                name: '',
            },
        ],
    },
    {
        type: 'function',
        name: 'registerPool',
        constant: false,
        payable: false,
        inputs: [
            {
                type: 'address',
                name: '_asset',
            },
            {
                type: 'address',
                name: '_swapPool',
            },
        ],
        outputs: [],
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
        name: 'setPriceOracle',
        constant: false,
        payable: false,
        inputs: [
            {
                type: 'address',
                name: '_asset',
            },
            {
                type: 'address',
                name: '_priceOracle',
            },
        ],
        outputs: [],
    },
    {
        type: 'function',
        name: 'swapExactTokensForTokens',
        constant: false,
        payable: false,
        inputs: [
            {
                type: 'uint256',
                name: '_amountIn',
            },
            {
                type: 'uint256',
                name: '_amountOutMin',
            },
            {
                type: 'address[]',
                name: '_tokenInOut',
            },
            {
                type: 'address',
                name: '_to',
            },
            {
                type: 'uint256',
                name: '_deadline',
            },
        ],
        outputs: [
            {
                type: 'uint256[]',
                name: '_amounts',
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
        name: 'unpause',
        constant: false,
        payable: false,
        inputs: [],
        outputs: [],
    },
]
