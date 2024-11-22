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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const doc_1 = __importDefault(require("../framework/doc"));
const errors_1 = require("./errors");
class LanguageAudioConcept {
    constructor() {
        this.languageAudio = new doc_1.default("languageAudio");
    }
    create(owner, language, audio, translation) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!language || !audio || !translation) {
                throw new errors_1.BadValuesError("Missing Parts of Language Audio");
            }
            const _id = yield this.languageAudio.createOne({ owner, language, audio, translation });
            return { msg: "Language Audio successfully created!", languageAudio: yield this.languageAudio.readOne({ _id }) };
        });
    }
    sanitize(update) {
        // eslint-disable-next-line
        const { owner } = update, rest = __rest(update, ["owner"]);
        return rest;
    }
    getById(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const languageAudio = yield this.languageAudio.readOne({ _id });
            if (!languageAudio) {
                throw new errors_1.NotFoundError("Language Audio Not Found");
            }
            return languageAudio;
        });
    }
    getAllAudioLanguagesByOwner(owner) {
        return __awaiter(this, void 0, void 0, function* () {
            const languageAudio = yield this.languageAudio.readMany({ owner });
            if (!languageAudio) {
                throw new errors_1.NotFoundError("Language Audio Not Found");
            }
            return [...new Set(languageAudio.map((audio) => audio.language))];
        });
    }
    getAudioLanguagesByOwner(owner, language) {
        return __awaiter(this, void 0, void 0, function* () {
            const languageAudio = yield this.languageAudio.readMany({ owner, language });
            if (!languageAudio) {
                throw new errors_1.NotFoundError("Language Audio Not Found");
            }
            return languageAudio;
        });
    }
    getAllAudioByOwner(owner) {
        return __awaiter(this, void 0, void 0, function* () {
            const languageAudios = yield this.languageAudio.readMany({ owner });
            return languageAudios;
        });
    }
    updateAudio(_id, editor, update) {
        return __awaiter(this, void 0, void 0, function* () {
            this.sanitize(update);
            const languageAudio = yield this.getById(_id);
            if (languageAudio.owner.toString() !== editor.toString()) {
                throw new errors_1.NotAllowedError("Only the owner can edit the Language Audio");
            }
            yield this.languageAudio.updateOne({ _id }, update);
            return { msg: "Successfully Updated Language Audio" };
        });
    }
    deleteAudio(_id, editor) {
        return __awaiter(this, void 0, void 0, function* () {
            const languageAudio = yield this.getById(_id);
            if (languageAudio.owner.toString() !== editor.toString()) {
                throw new errors_1.NotAllowedError("Only the owner can delete the Language Audio");
            }
            yield this.languageAudio.deleteOne({ _id });
            return { msg: "Language Audio is Successfully Deleted!" };
        });
    }
}
exports.default = LanguageAudioConcept;
//# sourceMappingURL=languageaudio.js.map