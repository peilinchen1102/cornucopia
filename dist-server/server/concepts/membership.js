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
class MembershipConcept {
    constructor() {
        this.memberships = new doc_1.default("memberships");
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const organizations = [];
            const _id = yield this.memberships.createOne({ user, organizations });
            return { msg: "Membership successfully created!", membership: yield this.memberships.readOne({ _id }) };
        });
    }
    get(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const membership = yield this.memberships.readOne({ user });
            if (!membership) {
                throw new errors_1.NotFoundError("User's Membership Not Found");
            }
            return membership;
        });
    }
    addMembership(user, organization) {
        return __awaiter(this, void 0, void 0, function* () {
            const oldOrganizations = yield this.get(user);
            const organizations = oldOrganizations.organizations.filter((org) => org.toString() !== organization.toString());
            organizations.push(organization);
            yield this.memberships.updateOne({ user }, { organizations });
            return { msg: "Successfully Added Membership!" };
        });
    }
    hasMembership(user, organization) {
        return __awaiter(this, void 0, void 0, function* () {
            const membership = yield this.get(user);
            return membership.organizations.some((org) => org.toString() === organization.toString());
        });
    }
    removeMembership(user, orgId) {
        return __awaiter(this, void 0, void 0, function* () {
            const memberships = yield this.get(user);
            const organizations = memberships.organizations.filter((org) => org.toString() !== orgId.toString());
            yield this.memberships.updateOne({ user }, { organizations });
            return { msg: "Successfully Removed Membership!" };
        });
    }
    deleteUserMembership(user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.memberships.deleteOne({ user });
            return { msg: "Memberships of User are Successfully Deleted!" };
        });
    }
}
exports.default = MembershipConcept;
//# sourceMappingURL=membership.js.map