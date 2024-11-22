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
class PatronConcept {
    constructor() {
        this.patrons = new doc_1.default("patrons");
    }
    create(name, birthday, image) {
        return __awaiter(this, void 0, void 0, function* () {
            const _id = yield this.patrons.createOne({ name, birthday, image });
            const patron = yield this.patrons.readOne({ _id });
            if (!name) {
                throw new errors_1.BadValuesError("Patron name cannot be empty");
            }
            if (patron == null) {
                throw new errors_1.NotFoundError(`Patron not found!`);
            }
            return { msg: "Patron successfully created!", patron: patron };
        });
    }
    getPatrons(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            const patrons = yield this.patrons.readMany({ _id: { $in: ids } });
            return patrons;
        });
    }
    getPatronById(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const patron = yield this.patrons.readOne({ _id });
            if (patron == null) {
                throw new errors_1.NotFoundError(`Patron not found!`);
            }
            return patron;
        });
    }
    updatePatron(_id, update) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (((_a = update.name) === null || _a === void 0 ? void 0 : _a.length) === 0) {
                throw new errors_1.BadValuesError("Patron name cannot be empty");
            }
            yield this.patrons.updateOne({ _id }, update);
            return { msg: "Patron updated successfully!" };
        });
    }
    deletePatron(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.patrons.deleteOne({ _id });
            return { msg: "Patron deleted!" };
        });
    }
}
exports.default = PatronConcept;
//# sourceMappingURL=patron.js.map