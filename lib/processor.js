"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const archive_registry_1 = require("@subsquid/archive-registry");
const ss58 = __importStar(require("@subsquid/ss58"));
const substrate_processor_1 = require("@subsquid/substrate-processor");
const typeorm_store_1 = require("@subsquid/typeorm-store");
const typeorm_1 = require("typeorm");
const model_1 = require("./model");
const events_1 = require("./types/events");
const DataSelection = { data: { event: true } };
const processor = new substrate_processor_1.SubstrateBatchProcessor()
    .setDataSource({
    // Lookup archive by the network name in the Subsquid registry
    //archive: lookupArchive("kusama", {release: "FireSquid"})
    // Use archive created by archive/docker-compose.yml
    archive: (0, archive_registry_1.lookupArchive)('kusama', { release: 'FireSquid' })
})
    .addEvent('ZenlinkProtocol.LiquidityAdded', DataSelection)
    .addEvent('ZenlinkProtocol.LiquidityRemoved', DataSelection)
    .addEvent('ZenlinkProtocol.AssetSwap', DataSelection)
    .addEvent('Balances.Transfer', {
    data: {
        event: {
            args: true,
            extrinsic: {
                hash: true,
                fee: true
            }
        }
    }
});
// TODO implement handleXXX as Bifrost
processor.run(new typeorm_store_1.TypeormDatabase(), async (ctx) => {
    let transfersData = getTransfers(ctx);
    let accountIds = new Set();
    for (let t of transfersData) {
        accountIds.add(t.from);
        accountIds.add(t.to);
    }
    let accounts = await ctx.store.findBy(model_1.Account, { id: (0, typeorm_1.In)([...accountIds]) }).then(accounts => {
        return new Map(accounts.map(a => [a.id, a]));
    });
    let transfers = [];
    for (let t of transfersData) {
        let { id, blockNumber, timestamp, extrinsicHash, amount, fee } = t;
        let from = getAccount(accounts, t.from);
        let to = getAccount(accounts, t.to);
        transfers.push(new model_1.Transfer({
            id,
            blockNumber,
            timestamp,
            extrinsicHash,
            from,
            to,
            amount,
            fee
        }));
    }
    await ctx.store.save(Array.from(accounts.values()));
    await ctx.store.insert(transfers);
});
function getTransfers(ctx) {
    let transfers = [];
    for (let block of ctx.blocks) {
        for (let item of block.items) {
            if (item.name == "Balances.Transfer") {
                let e = new events_1.BalancesTransferEvent(ctx, item.event);
                let rec;
                if (e.isV1020) {
                    let [from, to, amount] = e.asV1020;
                    rec = { from, to, amount };
                }
                else if (e.isV1050) {
                    let [from, to, amount] = e.asV1050;
                    rec = { from, to, amount };
                }
                else if (e.isV9130) {
                    rec = e.asV9130;
                }
                else {
                    throw new Error('Unsupported spec');
                }
                transfers.push({
                    id: item.event.id,
                    blockNumber: block.header.height,
                    timestamp: new Date(block.header.timestamp),
                    extrinsicHash: item.event.extrinsic?.hash,
                    from: ss58.codec('kusama').encode(rec.from),
                    to: ss58.codec('kusama').encode(rec.to),
                    amount: rec.amount,
                    fee: item.event.extrinsic?.fee || 0n
                });
            }
        }
    }
    return transfers;
}
function getAccount(m, id) {
    let acc = m.get(id);
    if (acc == null) {
        acc = new model_1.Account();
        acc.id = id;
        m.set(id, acc);
    }
    return acc;
}
//# sourceMappingURL=processor.js.map