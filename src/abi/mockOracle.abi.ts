export const ABI_JSON = [
    {
        type: 'constructor',
        stateMutability: 'undefined',
        payable: false,
        inputs: [
            {
                type: 'address',
                name: '_asset',
            },
            {
                type: 'uint256',
                name: '_price',
            },
        ],
    },
    {
        type: 'function',
        name: 'getAssetPrice',
        constant: true,
        stateMutability: 'view',
        payable: false,
        inputs: [
            {
                type: 'address',
                name: '_asset',
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
        name: 'updateCurrentPrices',
        constant: false,
        payable: false,
        inputs: [
            {
                type: 'address',
                name: '_asset',
            },
            {
                type: 'uint256',
                name: '_price',
            },
        ],
        outputs: [
            {
                type: 'uint256',
                name: '',
            },
        ],
    },
]
