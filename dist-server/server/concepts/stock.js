"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const doc_1 = __importDefault(require("../framework/doc"));
const errors_1 = require("./errors");
class StockConcept {
    constructor() {
        this.stocks = new doc_1.default("stocks");
    }
    createStock(owner, item, count, diet, link, img, maxPP = 3) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.isItemUnique(owner, item); // can't duplicate item name within same owner
            const _id = yield this.stocks.createOne({ owner, item, count, diet, supplyLink: link, image: img, maxPerPerson: maxPP, maxPerDay: 0 });
            if (count < 0) {
                throw new errors_1.NotAllowedError("Initial stock count cannot be negative");
            }
            if (item.length === 0) {
                throw new errors_1.BadValuesError("Item must have a name!");
            }
            return { msg: "Stock successfully created!", stock: yield this.stocks.readOne({ _id }) };
        });
    }
    getStocksByOwner(owner) {
        return __awaiter(this, void 0, void 0, function* () {
            const stocks = yield this.stocks.readMany({ owner }, { sort: { item: 1 } });
            return stocks;
        });
    }
    getStockByItem(owner, item) {
        return __awaiter(this, void 0, void 0, function* () {
            const stock = yield this.stocks.readOne({ owner, item });
            if (!stock) {
                throw new errors_1.NotFoundError("Stock not found");
            }
            return stock;
        });
    }
    getStockById(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const stock = yield this.stocks.readOne({ _id });
            if (!stock) {
                throw new errors_1.NotFoundError("Stock not found");
            }
            return stock;
        });
    }
    updateStockDetails(_id, update) {
        return __awaiter(this, void 0, void 0, function* () {
            this.sanitizeUpdate(update);
            if (update.item !== undefined && !update.item) {
                throw new errors_1.BadValuesError("Item must have a name!");
            }
            yield this.stocks.updateOne({ _id }, update);
            return { msg: "Stock successfully updated!" };
        });
    }
    updateStockQuantity(_id, newCount) {
        return __awaiter(this, void 0, void 0, function* () {
            const stock = yield this.stocks.readOne({ _id });
            if (!stock) {
                throw new errors_1.NotFoundError("Stock not found");
            }
            if (newCount < 0) {
                throw new errors_1.NotAllowedError("Stock count cannot be negative");
            }
            yield this.stocks.updateOne({ _id }, { count: newCount });
            return { msg: "Stock successfully updated!" };
        });
    }
    decrementStockQuantity(_id, change) {
        return __awaiter(this, void 0, void 0, function* () {
            const stock = yield this.stocks.readOne({ _id });
            if (!stock) {
                throw new errors_1.NotFoundError("Stock not found");
            }
            if (change < 0) {
                throw new errors_1.NotAllowedError("Cannot allocate negative units");
            }
            if (stock.count - change < 0) {
                throw new errors_1.NotAllowedError("Stock count cannot be negative");
            }
            yield this.stocks.updateOne({ _id }, { count: stock.count - change });
            return { msg: "Stock successfully updated!" };
        });
    }
    deleteStock(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.stocks.deleteOne({ _id });
            return { msg: "Stock successfully deleted!" };
        });
    }
    setTodaysAllocation(_id, count) {
        return __awaiter(this, void 0, void 0, function* () {
            const stock = yield this.stocks.readOne({ _id });
            if (!stock)
                return;
            yield this.stocks.updateOne({ _id }, { maxPerDay: count });
        });
    }
    sanitizeUpdate(update) {
        // update cannot change the stock owner or count
        const unallowedUpdates = ["owner"];
        for (const key in update) {
            if (unallowedUpdates.includes(key)) {
                throw new errors_1.NotAllowedError(`Cannot update '${key}' field!`);
            }
        }
    }
    isItemUnique(owner, item) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.stocks.readOne({ owner, item })) {
                throw new errors_1.NotAllowedError(`Item with name ${item} already exists!`);
            }
        });
    }
}
exports.default = StockConcept;
//# sourceMappingURL=stock.js.map