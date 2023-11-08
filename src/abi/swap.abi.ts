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
                type: 'address',
                name: '_slippageCurve',
            },
            {
                type: 'address',
                name: '_router',
            },
            {
                type: 'address',
                name: '_backstop',
            },
            {
                type: 'address',
                name: '_protocolTreasury',
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
        name: 'BackstopDrain',
        inputs: [
            {
                type: 'address',
                name: 'recipient',
                indexed: false,
            },
            {
                type: 'uint256',
                name: 'amountSwapTokens',
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
        name: 'ChargedSwapFees',
        inputs: [
            {
                type: 'uint256',
                name: 'lpFees',
                indexed: false,
            },
            {
                type: 'uint256',
                name: 'backstopFees',
                indexed: false,
            },
            {
                type: 'uint256',
                name: 'protocolFees',
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
        type: 'function',
        name: 'accumulatedSlippage',
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
        name: 'backstop',
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
        name: 'backstopBurn',
        constant: false,
        payable: false,
        inputs: [
            {
                type: 'address',
                name: '_owner',
            },
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
        name: 'backstopDrain',
        constant: false,
        payable: false,
        inputs: [
            {
                type: 'uint256',
                name: '_amount',
            },
            {
                type: 'address',
                name: '_recipient',
            },
        ],
        outputs: [],
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
        name: 'insuranceWithdrawalTimelock',
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
        name: 'insuranceWithdrawalUnlock',
        constant: true,
        stateMutability: 'view',
        payable: false,
        inputs: [
            {
                type: 'address',
                name: '_liquidityProvider',
            },
        ],
        outputs: [
            {
                type: 'uint256',
                name: '_unlockedOnBlockNo',
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
        name: 'protocolTreasury',
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
        name: 'quoteSwapInto',
        constant: true,
        stateMutability: 'view',
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
                name: '_effectiveAmount',
            },
        ],
    },
    {
        type: 'function',
        name: 'quoteSwapOut',
        constant: true,
        stateMutability: 'view',
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
                name: '_effectiveAmount',
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
        name: 'setInsuranceWithdrawalTimelock',
        constant: false,
        payable: false,
        inputs: [
            {
                type: 'uint256',
                name: '_durationInBlocks',
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
        name: 'setSwapFees',
        constant: false,
        payable: false,
        inputs: [
            {
                type: 'uint256',
                name: '_lpFeeBps',
            },
            {
                type: 'uint256',
                name: '_backstopFeeBps',
            },
            {
                type: 'uint256',
                name: '_protocolFeeBps',
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
        name: 'swapFees',
        constant: true,
        stateMutability: 'view',
        payable: false,
        inputs: [],
        outputs: [
            {
                type: 'uint256',
                name: '_lpFeeBps',
            },
            {
                type: 'uint256',
                name: '_backstopFeeBps',
            },
            {
                type: 'uint256',
                name: '_protocolFeeBps',
            },
        ],
    },
    {
        type: 'function',
        name: 'swapIntoFromRouter',
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
                name: '_effectiveAmount',
            },
        ],
    },
    {
        type: 'function',
        name: 'swapOutFromRouter',
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
                name: '_effectiveAmount',
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
        name: 'unpause',
        constant: false,
        payable: false,
        inputs: [],
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
]
