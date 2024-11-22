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
const mongodb_1 = require("mongodb");
const doc_1 = __importDefault(require("../framework/doc"));
const errors_1 = require("./errors");
class TeamConcept {
    constructor() {
        this.teams = new doc_1.default("teams");
    }
    create(name, founder) {
        return __awaiter(this, void 0, void 0, function* () {
            const admins = [founder];
            const members = [];
            const openDays = [1, 2, 3, 4, 5];
            if (!name) {
                throw new errors_1.BadValuesError("Missing Organization Name");
            }
            const restockDay = 0;
            yield this.isTeamNameUnique(name);
            const _id = yield this.teams.createOne({ name, admins, members, openDays, restockDay });
            return { msg: "Team successfully created!", team: yield this.teams.readOne({ _id }) };
        });
    }
    get(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const team = yield this.teams.readOne({ _id });
            if (!team) {
                throw new errors_1.NotFoundError("Team Not Found");
            }
            return team;
        });
    }
    isTeamNameUnique(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const exists = yield this.teams.readOne({ name });
            if (exists) {
                throw new errors_1.NotAllowedError(`Team with team name ${name} already exists!`);
            }
        });
    }
    isAdmin(_id, editor) {
        return __awaiter(this, void 0, void 0, function* () {
            const team = yield this.get(_id);
            if (!team) {
                throw new errors_1.NotFoundError("Team Not Found");
            }
            if (!team.admins.some((member) => member.toString() === editor.toString())) {
                throw new errors_1.NotAllowedError("Non Admins Cannot Edit Team");
            }
            return team;
        });
    }
    isTeamMember(_id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const team = yield this.get(_id);
            if (!team) {
                throw new errors_1.NotFoundError("Team Not Found");
            }
            if (!(team.admins.some((member) => member.toString() === user.toString()) || team.members.some((member) => member.toString() === user.toString()))) {
                throw new errors_1.NotAllowedError(`${user} is not a member of organization ${_id}!`);
            }
        });
    }
    updateName(_id, name, editor) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.isAdmin(_id, editor);
            yield this.teams.updateOne({ _id }, { name });
            return { msg: "Successfully Updated Team Name" };
        });
    }
    updateOpenDays(_id, days, editor) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.isAdmin(_id, editor);
            yield this.teams.updateOne({ _id }, { openDays: days });
            return { msg: "Successfully Updated Team OpenDays" };
        });
    }
    updateRestockDay(_id, day, editor) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.isAdmin(_id, editor);
            yield this.teams.updateOne({ _id }, { restockDay: day });
            return { msg: "Successfully Updated Team RestockDay" };
        });
    }
    removeUsersFromTeam(_id, exMembers, editor) {
        return __awaiter(this, void 0, void 0, function* () {
            let oldTeam;
            const memberIds = new Set(exMembers.map((member) => member.toString()));
            if (exMembers.length === 1 && memberIds.has(editor.toString())) {
                oldTeam = yield this.get(_id);
            }
            else {
                oldTeam = yield this.isAdmin(_id, editor);
            }
            const members = oldTeam.members.filter((member) => !memberIds.has(member.toString()));
            const admins = oldTeam.admins.filter((member) => !memberIds.has(member.toString()));
            if (admins.length === 0) {
                throw new errors_1.NotAllowedError("Organization must have at least one admin");
            }
            yield this.teams.updateOne({ _id }, { members, admins });
            return { msg: "Successfully Removed User From Team" };
        });
    }
    addUsersAsMembers(_id, newMembers, editor) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.removeUsersFromTeam(_id, newMembers, editor);
            const oldTeam = yield this.isAdmin(_id, editor);
            const uniqueMembers = new Set([...oldTeam.members.map((user) => user.toString()), ...newMembers.map((user) => user.toString())]);
            const members = [...uniqueMembers].map((member) => new mongodb_1.ObjectId(member));
            yield this.teams.updateOne({ _id }, { members });
            return { msg: "Successfully Added New Member to Team!" };
        });
    }
    addUsersAsAdmins(_id, newMembers, editor) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.removeUsersFromTeam(_id, newMembers, editor);
            const oldTeam = yield this.isAdmin(_id, editor);
            const uniqueMembers = new Set([...oldTeam.admins.map((user) => user.toString()), ...newMembers.map((user) => user.toString())]);
            const admins = [...uniqueMembers].map((member) => new mongodb_1.ObjectId(member));
            yield this.teams.updateOne({ _id }, { admins });
            return { msg: "Successfully Added New Member to Team!" };
        });
    }
    delete(_id, editor) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.isAdmin(_id, editor);
            yield this.teams.deleteOne({ _id });
            return { msg: "Team is Successfully Deleted!" };
        });
    }
    idsToNames(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            const teams = yield this.teams.readMany({ _id: { $in: ids } });
            // Store strings in Map because ObjectId comparison by reference is wrong
            const idToTeam = new Map(teams.map((t) => [t._id.toString(), t]));
            return ids.map((id) => { var _a, _b; return (_b = (_a = idToTeam.get(id.toString())) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : "DELETED_USER"; });
        });
    }
}
exports.default = TeamConcept;
//# sourceMappingURL=team.js.map