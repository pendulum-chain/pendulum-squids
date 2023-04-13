"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZenlinkProtocolPairStatusesStorage = exports.ZenlinkProtocolLiquidityPairsStorage = exports.TokensTotalIssuanceStorage = exports.TokensAccountsStorage = exports.SystemAccountStorage = exports.BalancesTotalIssuanceStorage = exports.AssetRegistryCurrencyMetadatasStorage = void 0;
const assert_1 = __importDefault(require("assert"));
const support_1 = require("./support");
class AssetRegistryCurrencyMetadatasStorage extends support_1.StorageBase {
    getPrefix() {
        return 'AssetRegistry';
    }
    getName() {
        return 'CurrencyMetadatas';
    }
    /**
     *  The storages for AssetMetadata.
     *
     *  CurrencyMetadatas: map CurrencyId => Option<AssetMetadata>
     */
    get isV956() {
        return this.getTypeHash() === 'e08bc4f3aa66be2b3c650bc88441394e425e6447384c7f6022be4cc6f0185f8c';
    }
    /**
     *  The storages for AssetMetadata.
     *
     *  CurrencyMetadatas: map CurrencyId => Option<AssetMetadata>
     */
    get asV956() {
        (0, assert_1.default)(this.isV956);
        return this;
    }
    /**
     *  The storages for AssetMetadata.
     *
     *  CurrencyMetadatas: map CurrencyId => Option<AssetMetadata>
     */
    get isV962() {
        return this.getTypeHash() === '9119afad27c100216eed976bb02714bc032591d19a759cdbc209d5dc868aa7b2';
    }
    /**
     *  The storages for AssetMetadata.
     *
     *  CurrencyMetadatas: map CurrencyId => Option<AssetMetadata>
     */
    get asV962() {
        (0, assert_1.default)(this.isV962);
        return this;
    }
}
exports.AssetRegistryCurrencyMetadatasStorage = AssetRegistryCurrencyMetadatasStorage;
class BalancesTotalIssuanceStorage extends support_1.StorageBase {
    getPrefix() {
        return 'Balances';
    }
    getName() {
        return 'TotalIssuance';
    }
    /**
     *  The total units issued in the system.
     */
    get isV1() {
        return this.getTypeHash() === 'f8ebe28eb30158172c0ccf672f7747c46a244f892d08ef2ebcbaadde34a26bc0';
    }
    /**
     *  The total units issued in the system.
     */
    get asV1() {
        (0, assert_1.default)(this.isV1);
        return this;
    }
}
exports.BalancesTotalIssuanceStorage = BalancesTotalIssuanceStorage;
class SystemAccountStorage extends support_1.StorageBase {
    getPrefix() {
        return 'System';
    }
    getName() {
        return 'Account';
    }
    /**
     *  The full account information for a particular account ID.
     */
    get isV1() {
        return this.getTypeHash() === '1ddc7ade926221442c388ee4405a71c9428e548fab037445aaf4b3a78f4735c1';
    }
    /**
     *  The full account information for a particular account ID.
     */
    get asV1() {
        (0, assert_1.default)(this.isV1);
        return this;
    }
}
exports.SystemAccountStorage = SystemAccountStorage;
class TokensAccountsStorage extends support_1.StorageBase {
    getPrefix() {
        return 'Tokens';
    }
    getName() {
        return 'Accounts';
    }
    /**
     *  The balance of a token type under an account.
     *
     *  NOTE: If the total is ever zero, decrease account ref account.
     *
     *  NOTE: This is only used in the case that this module is used to store
     *  balances.
     */
    get isV906() {
        return this.getTypeHash() === '8ea314d04aa7f347c62c956b85a71b71b4c155a0546ef6c7fc901ae08951705f';
    }
    /**
     *  The balance of a token type under an account.
     *
     *  NOTE: If the total is ever zero, decrease account ref account.
     *
     *  NOTE: This is only used in the case that this module is used to store
     *  balances.
     */
    get asV906() {
        (0, assert_1.default)(this.isV906);
        return this;
    }
    /**
     *  The balance of a token type under an account.
     *
     *  NOTE: If the total is ever zero, decrease account ref account.
     *
     *  NOTE: This is only used in the case that this module is used to store
     *  balances.
     */
    get isV956() {
        return this.getTypeHash() === 'b6a53be77df83383c0a1b8395b54ecfacf478653d11f6ac618bc625a62cf9435';
    }
    /**
     *  The balance of a token type under an account.
     *
     *  NOTE: If the total is ever zero, decrease account ref account.
     *
     *  NOTE: This is only used in the case that this module is used to store
     *  balances.
     */
    get asV956() {
        (0, assert_1.default)(this.isV956);
        return this;
    }
    /**
     *  The balance of a token type under an account.
     *
     *  NOTE: If the total is ever zero, decrease account ref account.
     *
     *  NOTE: This is only used in the case that this module is used to store
     *  balances.
     */
    get isV962() {
        return this.getTypeHash() === '320cf65e8586698cf6c17de6d0fd1a55530700be0e4ec598786cf5644a87f656';
    }
    /**
     *  The balance of a token type under an account.
     *
     *  NOTE: If the total is ever zero, decrease account ref account.
     *
     *  NOTE: This is only used in the case that this module is used to store
     *  balances.
     */
    get asV962() {
        (0, assert_1.default)(this.isV962);
        return this;
    }
}
exports.TokensAccountsStorage = TokensAccountsStorage;
class TokensTotalIssuanceStorage extends support_1.StorageBase {
    getPrefix() {
        return 'Tokens';
    }
    getName() {
        return 'TotalIssuance';
    }
    /**
     *  The total issuance of a token type.
     */
    get isV906() {
        return this.getTypeHash() === 'bc7ace11b9acb0503943c179b0df6b087fe54378a529b00bc4d74e91a92b8d20';
    }
    /**
     *  The total issuance of a token type.
     */
    get asV906() {
        (0, assert_1.default)(this.isV906);
        return this;
    }
    /**
     *  The total issuance of a token type.
     */
    get isV956() {
        return this.getTypeHash() === '4c39b9bae716dbe5a3072da27c59dffcdf999bdf64e2e4128f5e6038396d4a03';
    }
    /**
     *  The total issuance of a token type.
     */
    get asV956() {
        (0, assert_1.default)(this.isV956);
        return this;
    }
    /**
     *  The total issuance of a token type.
     */
    get isV962() {
        return this.getTypeHash() === '90285da57e7305354cef41c507a8403919ee1ccfad0a423e082e82bb7abe002a';
    }
    /**
     *  The total issuance of a token type.
     */
    get asV962() {
        (0, assert_1.default)(this.isV962);
        return this;
    }
}
exports.TokensTotalIssuanceStorage = TokensTotalIssuanceStorage;
class ZenlinkProtocolLiquidityPairsStorage extends support_1.StorageBase {
    getPrefix() {
        return 'ZenlinkProtocol';
    }
    getName() {
        return 'LiquidityPairs';
    }
    get isV902() {
        return this.getTypeHash() === 'e95fb5126bd8e5d9a624a5075b31639743d7dfb5262de60578b320acf59ce453';
    }
    get asV902() {
        (0, assert_1.default)(this.isV902);
        return this;
    }
    get isV906() {
        return this.getTypeHash() === '789cf3f60e0a697e380821675a1d5385e419abba09e35755b95a3eb7b5a28f1f';
    }
    get asV906() {
        (0, assert_1.default)(this.isV906);
        return this;
    }
}
exports.ZenlinkProtocolLiquidityPairsStorage = ZenlinkProtocolLiquidityPairsStorage;
class ZenlinkProtocolPairStatusesStorage extends support_1.StorageBase {
    getPrefix() {
        return 'ZenlinkProtocol';
    }
    getName() {
        return 'PairStatuses';
    }
    /**
     *  (AssetId, AssetId) -> PairStatus
     */
    get isV902() {
        return this.getTypeHash() === '2faae79f4ae95d419833b1d0471ee60a503e09075a12d9ccba4e2fec7b728d75';
    }
    /**
     *  (AssetId, AssetId) -> PairStatus
     */
    get asV902() {
        (0, assert_1.default)(this.isV902);
        return this;
    }
    /**
     *  (AssetId, AssetId) -> PairStatus
     */
    get isV906() {
        return this.getTypeHash() === 'bad89eddde62d5d40bc938d63d2495e173228abf7011695d72c252612979bde7';
    }
    /**
     *  (AssetId, AssetId) -> PairStatus
     */
    get asV906() {
        (0, assert_1.default)(this.isV906);
        return this;
    }
}
exports.ZenlinkProtocolPairStatusesStorage = ZenlinkProtocolPairStatusesStorage;
//# sourceMappingURL=storage.js.map