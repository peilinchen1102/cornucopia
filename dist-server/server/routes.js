"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
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
const mongodb_1 = require("mongodb");
const router_1 = require("./framework/router");
const app_1 = require("./app");
const errors_1 = require("./concepts/errors");
const responses_1 = __importDefault(require("./responses"));
let Routes = (() => {
    var _a;
    let _instanceExtraInitializers = [];
    let _getSessionUser_decorators;
    let _getUsers_decorators;
    let _getUser_decorators;
    let _registerUser_decorators;
    let _updateUser_decorators;
    let _deleteUser_decorators;
    let _logIn_decorators;
    let _logOut_decorators;
    let _registerOrganization_decorators;
    let _getOrganizationById_decorators;
    let _getOrganizationsOfUser_decorators;
    let _updateOrganizationName_decorators;
    let _addMembersToOrganization_decorators;
    let _updateMemberStatus_decorators;
    let _leaveOrganization_decorators;
    let _removeUserFromOrganization_decorators;
    let _updateOpenDays_decorators;
    let _updateRestockDay_decorators;
    let _deleteOrganization_decorators;
    let _resetAllVisits_decorators;
    let _createHouseholdProfile_decorators;
    let _updateHouseholdDetails_decorators;
    let _addPatronToHousehold_decorators;
    let _removePatronFromHousehold_decorators;
    let _updatePatron_decorators;
    let _getPatronById_decorators;
    let _signInHousehold_decorators;
    let _getSingleHousehold_decorators;
    let _getHouseholdsByOrg_decorators;
    let _addVisit_decorators;
    let _removeHouseholdProfile_decorators;
    let _getHouseholdAllocation_decorators;
    let _getItem_decorators;
    let _getOrganizationInventory_decorators;
    let _setInventoryMaxPerDay_decorators;
    let _updateInventoryItem_decorators;
    let _decrementInventoryItem_decorators;
    let _allocateStocks_decorators;
    let _addNewInventoryItem_decorators;
    let _deleteInventoryItem_decorators;
    let _getOrganizationShifts_decorators;
    let _getUserShifts_decorators;
    let _getShift_decorators;
    let _createNewShift_decorators;
    let _updateShift_decorators;
    let _updateShiftCapacity_decorators;
    let _claimShift_decorators;
    let _unclaimShift_decorators;
    let _deleteShift_decorators;
    let _createLanguageAudio_decorators;
    let _getLanguageAudioByOwner_decorators;
    let _getLanguageAudioByOwnerAndLanguage_decorators;
    let _getLanguageAudioById_decorators;
    let _updateLanguageAudio_decorators;
    let _deleteLanguageAudio_decorators;
    return _a = class Routes {
            getSessionUser(session) {
                return __awaiter(this, void 0, void 0, function* () {
                    const user = app_1.WebSession.getUser(session);
                    return yield app_1.User.getUserById(user);
                });
            }
            getUsers() {
                return __awaiter(this, void 0, void 0, function* () {
                    return yield app_1.User.getUsers();
                });
            }
            getUser(username) {
                return __awaiter(this, void 0, void 0, function* () {
                    return yield app_1.User.getUserByUsername(username);
                });
            }
            registerUser(session, username, password) {
                return __awaiter(this, void 0, void 0, function* () {
                    app_1.WebSession.isLoggedOut(session);
                    const { msg, user } = yield app_1.User.create(username, password);
                    if (user) {
                        yield app_1.Membership.create(user._id);
                    }
                    return { msg, user };
                });
            }
            updateUser(session, update) {
                return __awaiter(this, void 0, void 0, function* () {
                    const user = app_1.WebSession.getUser(session);
                    return yield app_1.User.update(user, update);
                });
            }
            deleteUser(session) {
                return __awaiter(this, void 0, void 0, function* () {
                    const user = app_1.WebSession.getUser(session);
                    app_1.WebSession.end(session);
                    const msg = yield app_1.User.delete(user);
                    const { organizations } = yield app_1.Membership.get(user);
                    for (const orgId of organizations) {
                        const oldTeam = yield app_1.Team.get(orgId);
                        if (oldTeam.admins.length === 1 && oldTeam.admins[0].toString() === user.toString()) {
                            // delete everything associated with team if user is only admin
                            const team = yield app_1.Team.get(orgId);
                            // delete stocks
                            const stocks = yield app_1.Stock.getStocksByOwner(orgId);
                            yield Promise.all(stocks.map((stock) => app_1.Stock.deleteStock(stock._id)));
                            // delete households and patrons
                            const households = yield app_1.Household.getProfilesByOwner(orgId);
                            const patrons = new Array();
                            households.forEach((household) => patrons.push(...household.members));
                            yield Promise.all(households.map((household) => app_1.Household.delete(household._id)));
                            yield Promise.all(patrons.map((patron) => app_1.Patron.deletePatron(patron)));
                            // delete shifts
                            yield app_1.Shift.deleteShiftsByOwner(orgId);
                            // delete audio
                            const audios = yield app_1.LanguageAudio.getAllAudioByOwner(orgId);
                            yield Promise.all(audios.map((audio) => app_1.LanguageAudio.deleteAudio(audio._id, orgId)));
                            // delete memberships
                            const allMembers = team.members.concat(...team.admins);
                            yield Promise.all(allMembers.map((member) => app_1.Membership.removeMembership(member, orgId)));
                            // delete team
                            yield app_1.Team.delete(orgId, user);
                        }
                        else {
                            yield app_1.Team.removeUsersFromTeam(orgId, [user], user);
                        }
                    }
                    yield app_1.Membership.deleteUserMembership(user);
                    yield app_1.Shift.unclaimShiftsByUser(user);
                    return msg;
                });
            }
            logIn(session, username, password) {
                return __awaiter(this, void 0, void 0, function* () {
                    const u = yield app_1.User.authenticate(username, password);
                    app_1.WebSession.start(session, u._id);
                    return { msg: "Logged in!" };
                });
            }
            logOut(session) {
                return __awaiter(this, void 0, void 0, function* () {
                    app_1.WebSession.end(session);
                    return { msg: "Logged out!" };
                });
            }
            registerOrganization(session, name) {
                return __awaiter(this, void 0, void 0, function* () {
                    const user = app_1.WebSession.getUser(session);
                    const { msg, team } = yield app_1.Team.create(name, user);
                    if (team) {
                        yield app_1.Membership.addMembership(user, team._id);
                    }
                    return { msg: msg, team: team };
                });
            }
            getOrganizationById(session, orgId) {
                return __awaiter(this, void 0, void 0, function* () {
                    const orgI = new mongodb_1.ObjectId(orgId);
                    const org = yield app_1.Team.get(orgI);
                    const admins = yield app_1.User.idsToUsernames(org.admins);
                    const members = yield app_1.User.idsToUsernames(org.members);
                    return { id: orgI, name: org.name, admins: admins, members: members, openDays: org.openDays, restockDay: org.restockDay };
                });
            }
            getOrganizationsOfUser(session) {
                return __awaiter(this, void 0, void 0, function* () {
                    const user = app_1.WebSession.getUser(session);
                    const { organizations } = yield app_1.Membership.get(user);
                    const allOrgs = yield Promise.all(organizations.map((id) => app_1.Team.get(id)));
                    return allOrgs.map((org) => {
                        const isAdmin = org.admins.some((a) => a.toString() === user.toString());
                        return { id: org._id, name: org.name, isAdmin: isAdmin };
                    });
                });
            }
            updateOrganizationName(session, orgId, orgName) {
                return __awaiter(this, void 0, void 0, function* () {
                    const user = app_1.WebSession.getUser(session);
                    const org = new mongodb_1.ObjectId(orgId);
                    if (!orgName) {
                        throw new errors_1.BadValuesError("Missing Organization Name");
                    }
                    return yield app_1.Team.updateName(org, orgName, user);
                });
            }
            addMembersToOrganization(session, orgId, newMembers) {
                return __awaiter(this, void 0, void 0, function* () {
                    const user = app_1.WebSession.getUser(session);
                    const org = new mongodb_1.ObjectId(orgId);
                    const memberIds = newMembers.map((member) => new mongodb_1.ObjectId(member));
                    yield app_1.Team.addUsersAsMembers(org, memberIds, user);
                    yield Promise.all(memberIds.map((member) => app_1.Membership.addMembership(member, org)));
                    return { msg: "Successfully Added Members To Organization!" };
                });
            }
            updateMemberStatus(session, orgId, member, isPromoting) {
                return __awaiter(this, void 0, void 0, function* () {
                    const user = app_1.WebSession.getUser(session);
                    const org = new mongodb_1.ObjectId(orgId);
                    const memberId = new mongodb_1.ObjectId(member);
                    yield app_1.Team.isTeamMember(org, memberId);
                    if (isPromoting) {
                        yield app_1.Team.addUsersAsAdmins(org, [memberId], user);
                    }
                    else {
                        yield app_1.Team.addUsersAsMembers(org, [memberId], user);
                    }
                    return { msg: "Successfully Changed Member Status!" };
                });
            }
            leaveOrganization(session, orgId) {
                return __awaiter(this, void 0, void 0, function* () {
                    const user = app_1.WebSession.getUser(session);
                    const id = new mongodb_1.ObjectId(orgId);
                    const shiftsWithOrg = (yield app_1.Shift.getShiftsByUser(user)).filter((s) => s.owner.toString() === orgId.toString());
                    yield Promise.all(shiftsWithOrg.map((s) => app_1.Shift.unclaimShift(s._id, user)));
                    yield app_1.Team.removeUsersFromTeam(orgId, [user], user);
                    yield app_1.Membership.removeMembership(user, id);
                    return { msg: "Successfully left organization" };
                });
            }
            removeUserFromOrganization(session, orgId, member) {
                return __awaiter(this, void 0, void 0, function* () {
                    const user = app_1.WebSession.getUser(session);
                    const id = new mongodb_1.ObjectId(orgId);
                    const memberId = new mongodb_1.ObjectId(member);
                    const shiftsWithOrg = (yield app_1.Shift.getShiftsByUser(member)).filter((s) => s.owner.toString() === orgId.toString());
                    yield Promise.all(shiftsWithOrg.map((s) => app_1.Shift.unclaimShift(s._id, member)));
                    const msg = yield app_1.Team.removeUsersFromTeam(id, [memberId], user);
                    yield app_1.Membership.removeMembership(memberId, id);
                    return msg;
                });
            }
            updateOpenDays(session, id, days) {
                return __awaiter(this, void 0, void 0, function* () {
                    const user = app_1.WebSession.getUser(session);
                    const orgId = new mongodb_1.ObjectId(id);
                    const openDays = new Array();
                    for (const day of days)
                        openDays.push(day);
                    openDays.sort();
                    yield app_1.Team.updateOpenDays(orgId, openDays, user);
                    return { msg: "Successfully updated open days" };
                });
            }
            updateRestockDay(session, id, day) {
                return __awaiter(this, void 0, void 0, function* () {
                    const user = app_1.WebSession.getUser(session);
                    const orgId = new mongodb_1.ObjectId(id);
                    yield app_1.Team.updateRestockDay(orgId, day, user);
                    return { msg: "Successfully updated restock day" };
                });
            }
            deleteOrganization(session, org) {
                return __awaiter(this, void 0, void 0, function* () {
                    const user = app_1.WebSession.getUser(session);
                    const orgId = new mongodb_1.ObjectId(org);
                    yield app_1.Team.isAdmin(orgId, user);
                    const team = yield app_1.Team.get(orgId);
                    // delete stocks
                    const stocks = yield app_1.Stock.getStocksByOwner(orgId);
                    yield Promise.all(stocks.map((stock) => app_1.Stock.deleteStock(stock._id)));
                    // delete households and patrons
                    const households = yield app_1.Household.getProfilesByOwner(orgId);
                    const patrons = new Array();
                    households.forEach((household) => patrons.push(...household.members));
                    yield Promise.all(households.map((household) => app_1.Household.delete(household._id)));
                    yield Promise.all(patrons.map((patron) => app_1.Patron.deletePatron(patron)));
                    // delete shifts
                    yield app_1.Shift.deleteShiftsByOwner(orgId);
                    // delete audio
                    const audios = yield app_1.LanguageAudio.getAllAudioByOwner(orgId);
                    yield Promise.all(audios.map((audio) => app_1.LanguageAudio.deleteAudio(audio._id, orgId)));
                    // delete memberships
                    const allMembers = team.members.concat(...team.admins);
                    yield Promise.all(allMembers.map((member) => app_1.Membership.removeMembership(member, orgId)));
                    // delete team
                    yield app_1.Team.delete(orgId, user);
                    return { msg: "Successfully deleted organization!" };
                });
            }
            // reset all visits for all households in organization
            resetAllVisits(session, orgId) {
                return __awaiter(this, void 0, void 0, function* () {
                    const user = app_1.WebSession.getUser(session);
                    const org = new mongodb_1.ObjectId(orgId);
                    yield app_1.Team.isAdmin(org, user);
                    const households = yield app_1.Household.getProfilesByOwner(org);
                    for (const h of households) {
                        yield app_1.Household.resetVisits(h._id);
                    }
                    return { msg: "Successfully reset all visits!" };
                });
            }
            createHouseholdProfile(session, orgId, patrons, diet, lang, req) {
                return __awaiter(this, void 0, void 0, function* () {
                    const user = app_1.WebSession.getUser(session);
                    const org = new mongodb_1.ObjectId(orgId);
                    yield app_1.Team.isTeamMember(org, user);
                    const info = yield Promise.all(patrons.map((patron) => app_1.Patron.create(patron[0], patron[1], patron[2])));
                    return yield app_1.Household.create(org, info.map((patron) => patron.patron._id), diet, lang, req);
                });
            }
            // update household members, diet restrictions, language, special requests
            updateHouseholdDetails(session, id, update) {
                return __awaiter(this, void 0, void 0, function* () {
                    const household = yield app_1.Household.getProfileById(id);
                    const ID = new mongodb_1.ObjectId(id);
                    const user = app_1.WebSession.getUser(session);
                    yield app_1.Team.isTeamMember(household.organization, user);
                    return yield app_1.Household.update(ID, update);
                });
            }
            addPatronToHousehold(session, id, name, birthday, img) {
                return __awaiter(this, void 0, void 0, function* () {
                    const user = app_1.WebSession.getUser(session);
                    const ID = new mongodb_1.ObjectId(id);
                    const household = yield app_1.Household.getProfileById(ID);
                    yield app_1.Team.isTeamMember(household.organization, user);
                    const patron = (yield app_1.Patron.create(name, birthday, img)).patron;
                    return yield app_1.Household.addMember(ID, patron._id);
                });
            }
            removePatronFromHousehold(session, patrons, household) {
                return __awaiter(this, void 0, void 0, function* () {
                    const user = app_1.WebSession.getUser(session);
                    const householdId = new mongodb_1.ObjectId(household);
                    const householdInfo = yield app_1.Household.getProfileById(householdId);
                    const patronId = patrons.map((patron) => new mongodb_1.ObjectId(patron));
                    yield app_1.Team.isTeamMember(householdInfo.organization, user);
                    const removePatrons = new Set(patrons);
                    const updatedMembers = householdInfo.members.filter((member) => !removePatrons.has(member.toString()));
                    yield app_1.Household.updateMembers(householdId, updatedMembers);
                    yield Promise.all(patronId.map((patron) => app_1.Patron.deletePatron(patron)));
                    return { msg: "Successfully updated Household" };
                });
            }
            updatePatron(session, household, patron, update) {
                return __awaiter(this, void 0, void 0, function* () {
                    const householdId = new mongodb_1.ObjectId(household);
                    const patronId = new mongodb_1.ObjectId(patron);
                    const householdInfo = yield app_1.Household.getProfileById(householdId);
                    const user = app_1.WebSession.getUser(session);
                    yield app_1.Team.isTeamMember(householdInfo.organization, user);
                    return yield app_1.Patron.updatePatron(patronId, update);
                });
            }
            getPatronById(id) {
                return __awaiter(this, void 0, void 0, function* () {
                    const _id = new mongodb_1.ObjectId(id);
                    return yield app_1.Patron.getPatronById(_id);
                });
            }
            // return household
            signInHousehold(session, id) {
                return __awaiter(this, void 0, void 0, function* () {
                    const ID = new mongodb_1.ObjectId(id);
                    const household = yield app_1.Household.getProfileById(ID);
                    const user = app_1.WebSession.getUser(session);
                    yield app_1.Team.isTeamMember(household.organization, user);
                    return household;
                });
            }
            // return household
            getSingleHousehold(session, id) {
                return __awaiter(this, void 0, void 0, function* () {
                    const householdId = new mongodb_1.ObjectId(id);
                    const household = yield app_1.Household.getProfileById(householdId);
                    const user = app_1.WebSession.getUser(session);
                    yield app_1.Team.isTeamMember(household.organization, user);
                    return Object.assign(Object.assign({}, household), { members: yield app_1.Patron.getPatrons(household.members) });
                });
            }
            getHouseholdsByOrg(session, orgId) {
                return __awaiter(this, void 0, void 0, function* () {
                    const id = new mongodb_1.ObjectId(orgId);
                    const user = app_1.WebSession.getUser(session);
                    yield app_1.Team.isTeamMember(id, user);
                    const allHouseholds = yield app_1.Household.getProfilesByOwner(id);
                    const patrons = yield Promise.all(allHouseholds.map((household) => app_1.Patron.getPatrons(household.members)));
                    return allHouseholds.map((household, idx) => {
                        return Object.assign(Object.assign({}, household), { members: patrons[idx] });
                    });
                });
            }
            addVisit(session, id) {
                return __awaiter(this, void 0, void 0, function* () {
                    const orgId = new mongodb_1.ObjectId(id);
                    const household = yield app_1.Household.getProfileById(orgId);
                    const user = app_1.WebSession.getUser(session);
                    yield app_1.Team.isTeamMember(household.organization, user);
                    yield app_1.Household.addVisit(orgId);
                    return { msg: "Successfully added visit!" };
                });
            }
            removeHouseholdProfile(session, id) {
                return __awaiter(this, void 0, void 0, function* () {
                    const orgId = new mongodb_1.ObjectId(id);
                    const household = yield app_1.Household.getProfileById(orgId);
                    const user = app_1.WebSession.getUser(session);
                    yield app_1.Team.isTeamMember(household.organization, user);
                    for (const patron of household.members) {
                        yield app_1.Patron.deletePatron(patron);
                    }
                    return yield app_1.Household.delete(orgId);
                });
            }
            getHouseholdAllocation(session, id) {
                return __awaiter(this, void 0, void 0, function* () {
                    const ID = new mongodb_1.ObjectId(id);
                    const household = yield app_1.Household.getProfileById(ID);
                    const user = app_1.WebSession.getUser(session);
                    const team = household.organization;
                    yield app_1.Team.isTeamMember(team, user);
                    const inventory = yield app_1.Stock.getStocksByOwner(team);
                    const allocation = new Array();
                    const diet = household.dietaryRestrictions;
                    for (const stock of inventory) {
                        let canBeGiven = true;
                        for (const restriction of diet) {
                            let found = false;
                            for (const compare of stock.diet)
                                if (restriction.valueOf() === compare.valueOf()) {
                                    found = true;
                                    break;
                                }
                            if (found) {
                                canBeGiven = false;
                                break;
                            }
                        }
                        if (canBeGiven)
                            allocation.push(stock);
                    }
                    const maxPer = new Array();
                    allocation.forEach((stock) => {
                        maxPer.push(Math.min(stock.maxPerPerson, stock.maxPerDay));
                    });
                    const response = yield responses_1.default.stocks(allocation);
                    const ret = response.map((stock, i) => (Object.assign(Object.assign({}, stock), { allocation: maxPer[i] })));
                    return ret;
                });
            }
            getItem(session, stockId) {
                return __awaiter(this, void 0, void 0, function* () {
                    app_1.WebSession.getUser(session);
                    return yield app_1.Stock.getStockById(new mongodb_1.ObjectId(stockId));
                });
            }
            // return inventory of given organization, including the max per day allocation
            getOrganizationInventory(session, orgId, name) {
                return __awaiter(this, void 0, void 0, function* () {
                    const user = app_1.WebSession.getUser(session);
                    const org = new mongodb_1.ObjectId(orgId);
                    yield app_1.Team.isTeamMember(org, user);
                    let inventory;
                    if (name) {
                        inventory = yield app_1.Stock.getStockByItem(org, name);
                        return yield responses_1.default.stock(inventory);
                    }
                    else {
                        inventory = yield app_1.Stock.getStocksByOwner(org);
                        const response = yield responses_1.default.stocks(inventory);
                        return response;
                    }
                });
            }
            // generate max per day allocation
            setInventoryMaxPerDay(session, orgId) {
                return __awaiter(this, void 0, void 0, function* () {
                    const user = app_1.WebSession.getUser(session);
                    const org = new mongodb_1.ObjectId(orgId);
                    yield app_1.Team.isTeamMember(org, user);
                    const team = yield app_1.Team.get(org);
                    const inventory = yield app_1.Stock.getStocksByOwner(org);
                    const openDays = team.openDays;
                    const restockDay = team.restockDay;
                    const currentDate = new Date();
                    let days = currentDate.getDay() - restockDay;
                    if (days < 0)
                        days += 7;
                    let cnt = 0, day = restockDay, dayCount = 0;
                    while (cnt < days) {
                        if (openDays.includes(day))
                            dayCount++;
                        cnt++;
                        day = (day + 1) % 7;
                    }
                    yield Promise.all(inventory.map((stock) => app_1.Stock.setTodaysAllocation(stock._id, Math.floor(stock.count / (openDays.length - dayCount)))));
                    return { msg: "Inventory max per day successfully set!" };
                });
            }
            // update an inventory item's count or other details (link, image, etc)
            updateInventoryItem(session, id, update) {
                return __awaiter(this, void 0, void 0, function* () {
                    const user = app_1.WebSession.getUser(session);
                    const ID = new mongodb_1.ObjectId(id);
                    const stock = yield app_1.Stock.getStockById(ID);
                    yield app_1.Team.isTeamMember(stock.owner, user);
                    // eslint-disable-next-line
                    const { count } = update, rest = __rest(update, ["count"]); // remove count
                    yield app_1.Stock.updateStockDetails(ID, update);
                    return { msg: "Stock successfully updated!" };
                });
            }
            decrementInventoryItem(session, id, update) {
                return __awaiter(this, void 0, void 0, function* () {
                    const user = app_1.WebSession.getUser(session);
                    const ID = new mongodb_1.ObjectId(id);
                    const stock = yield app_1.Stock.getStockById(ID);
                    yield app_1.Team.isTeamMember(stock.owner, user);
                    if (update.count) {
                        yield app_1.Stock.updateStockQuantity(ID, update.count);
                    }
                    return { msg: "Stock successfully updated!" };
                });
            }
            allocateStocks(session, ids, changes) {
                return __awaiter(this, void 0, void 0, function* () {
                    const user = app_1.WebSession.getUser(session);
                    const IDs = ids.map((id) => new mongodb_1.ObjectId(id));
                    if (changes.some((c) => c < 0)) {
                        throw new errors_1.NotAllowedError("Cannot allocate negative amount");
                    }
                    const stocks = yield Promise.all(IDs.map((stock) => app_1.Stock.getStockById(stock)));
                    const moreThanInv = stocks.filter((s, idx) => s.count - changes[idx] < 0);
                    if (moreThanInv.length > 0) {
                        throw new errors_1.NotAllowedError(`Cannot allocate more units of ${moreThanInv[0].item} than in inventory`);
                    }
                    yield Promise.all(stocks.map((stock) => app_1.Team.isTeamMember(stock.owner, user)));
                    yield Promise.all(stocks.map((stock, idx) => app_1.Stock.decrementStockQuantity(stock._id, changes[idx])));
                    return { msg: "Stocks successfully allocated!" };
                });
            }
            addNewInventoryItem(session, owner, item, count, diet, link, img, maxp) {
                return __awaiter(this, void 0, void 0, function* () {
                    const user = app_1.WebSession.getUser(session);
                    const Owner = new mongodb_1.ObjectId(owner);
                    yield app_1.Team.isTeamMember(Owner, user);
                    return yield app_1.Stock.createStock(Owner, item, count, diet, link, img, maxp);
                });
            }
            deleteInventoryItem(session, id) {
                return __awaiter(this, void 0, void 0, function* () {
                    const user = app_1.WebSession.getUser(session);
                    const ID = new mongodb_1.ObjectId(id);
                    const stock = yield app_1.Stock.getStockById(ID);
                    yield app_1.Team.isTeamMember(stock.owner, user);
                    return yield app_1.Stock.deleteStock(ID);
                });
            }
            getOrganizationShifts(session, id, futureOnly) {
                return __awaiter(this, void 0, void 0, function* () {
                    const futureOnlyBool = futureOnly === "true";
                    const user = app_1.WebSession.getUser(session);
                    const orgId = new mongodb_1.ObjectId(id);
                    yield app_1.Team.isTeamMember(orgId, user);
                    let shifts;
                    if (futureOnlyBool) {
                        shifts = yield app_1.Shift.getFutureShiftsByOwner(orgId);
                    }
                    else {
                        shifts = yield app_1.Shift.getShiftsByOwner(orgId);
                    }
                    return responses_1.default.shifts(shifts);
                });
            }
            getUserShifts(session, futureOnly) {
                return __awaiter(this, void 0, void 0, function* () {
                    const futureOnlyBool = futureOnly === "true";
                    const user = app_1.WebSession.getUser(session);
                    let shifts;
                    if (futureOnlyBool) {
                        shifts = yield app_1.Shift.getFutureShiftsByUser(user);
                    }
                    else {
                        shifts = yield app_1.Shift.getShiftsByUser(user);
                    }
                    return responses_1.default.shifts(shifts);
                });
            }
            getShift(session, id) {
                return __awaiter(this, void 0, void 0, function* () {
                    const user = app_1.WebSession.getUser(session);
                    const shiftId = new mongodb_1.ObjectId(id);
                    const shift = yield app_1.Shift.getShiftById(shiftId);
                    yield app_1.Team.isTeamMember(shift.owner, user);
                    return responses_1.default.shift(shift);
                });
            }
            createNewShift(session, orgId, start, end, capacity) {
                return __awaiter(this, void 0, void 0, function* () {
                    const org = new mongodb_1.ObjectId(orgId);
                    const user = app_1.WebSession.getUser(session);
                    yield app_1.Team.isAdmin(org, user);
                    const created = yield app_1.Shift.createShift(org, new Date(start), new Date(end), capacity);
                    return { msg: created.msg, shift: responses_1.default.shift(created.shift) };
                });
            }
            updateShift(session, id, start, end) {
                return __awaiter(this, void 0, void 0, function* () {
                    const shiftId = new mongodb_1.ObjectId(id);
                    const user = app_1.WebSession.getUser(session);
                    const shift = yield app_1.Shift.getShiftById(shiftId);
                    yield app_1.Team.isAdmin(shift.owner, user);
                    return yield app_1.Shift.updateShiftTime(shiftId, new Date(start), new Date(end));
                });
            }
            updateShiftCapacity(session, id, capacity) {
                return __awaiter(this, void 0, void 0, function* () {
                    const shiftId = new mongodb_1.ObjectId(id);
                    const user = app_1.WebSession.getUser(session);
                    const shift = yield app_1.Shift.getShiftById(shiftId);
                    yield app_1.Team.isAdmin(shift.owner, user);
                    return yield app_1.Shift.updateShiftCapacity(shiftId, capacity);
                });
            }
            claimShift(session, id) {
                return __awaiter(this, void 0, void 0, function* () {
                    const shiftId = new mongodb_1.ObjectId(id);
                    const user = app_1.WebSession.getUser(session);
                    const shift = yield app_1.Shift.getShiftById(shiftId);
                    yield app_1.Team.isTeamMember(shift.owner, user);
                    return yield app_1.Shift.claimShift(shiftId, user);
                });
            }
            unclaimShift(session, id) {
                return __awaiter(this, void 0, void 0, function* () {
                    const shiftId = new mongodb_1.ObjectId(id);
                    const user = app_1.WebSession.getUser(session);
                    const shift = yield app_1.Shift.getShiftById(shiftId);
                    yield app_1.Team.isTeamMember(shift.owner, user);
                    return yield app_1.Shift.unclaimShift(shiftId, user);
                });
            }
            deleteShift(session, id) {
                return __awaiter(this, void 0, void 0, function* () {
                    const shiftId = new mongodb_1.ObjectId(id);
                    const user = app_1.WebSession.getUser(session);
                    const shift = yield app_1.Shift.getShiftById(shiftId);
                    yield app_1.Team.isAdmin(shift.owner, user);
                    return yield app_1.Shift.deleteShift(shiftId);
                });
            }
            createLanguageAudio(session, org, language, audio, translation) {
                return __awaiter(this, void 0, void 0, function* () {
                    const user = app_1.WebSession.getUser(session);
                    const orgId = new mongodb_1.ObjectId(org);
                    yield app_1.Team.isTeamMember(orgId, user);
                    return yield app_1.LanguageAudio.create(orgId, language, audio, translation);
                });
            }
            getLanguageAudioByOwner(session, org) {
                return __awaiter(this, void 0, void 0, function* () {
                    const user = app_1.WebSession.getUser(session);
                    const orgId = new mongodb_1.ObjectId(org);
                    yield app_1.Team.isTeamMember(orgId, user);
                    const allLanguage = yield app_1.LanguageAudio.getAllAudioLanguagesByOwner(orgId);
                    const allAudio = yield Promise.all(allLanguage.map((language) => app_1.LanguageAudio.getAudioLanguagesByOwner(orgId, language)));
                    return allAudio.map((audio, idx) => {
                        return { language: allLanguage[idx], audios: audio };
                    });
                });
            }
            getLanguageAudioByOwnerAndLanguage(session, org, language) {
                return __awaiter(this, void 0, void 0, function* () {
                    const user = app_1.WebSession.getUser(session);
                    const orgId = new mongodb_1.ObjectId(org);
                    yield app_1.Team.isTeamMember(orgId, user);
                    return { language: language, audios: yield app_1.LanguageAudio.getAudioLanguagesByOwner(orgId, language) };
                });
            }
            getLanguageAudioById(session, audio) {
                return __awaiter(this, void 0, void 0, function* () {
                    const user = app_1.WebSession.getUser(session);
                    const audioId = new mongodb_1.ObjectId(audio);
                    const languageAudio = yield app_1.LanguageAudio.getById(audioId);
                    yield app_1.Team.isTeamMember(languageAudio.owner, user);
                    return languageAudio;
                });
            }
            updateLanguageAudio(session, audio, update) {
                return __awaiter(this, void 0, void 0, function* () {
                    const user = app_1.WebSession.getUser(session);
                    const audioId = new mongodb_1.ObjectId(audio);
                    const audioFile = yield app_1.LanguageAudio.getById(audioId);
                    yield app_1.Team.isTeamMember(audioFile.owner, user);
                    return yield app_1.LanguageAudio.updateAudio(audioId, audioFile.owner, update);
                });
            }
            deleteLanguageAudio(session, audio) {
                return __awaiter(this, void 0, void 0, function* () {
                    const user = app_1.WebSession.getUser(session);
                    const audioId = new mongodb_1.ObjectId(audio);
                    const audioFile = yield app_1.LanguageAudio.getById(audioId);
                    yield app_1.Team.isTeamMember(audioFile.owner, user);
                    return yield app_1.LanguageAudio.deleteAudio(audioId, audioFile.owner);
                });
            }
            constructor() {
                __runInitializers(this, _instanceExtraInitializers);
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _getSessionUser_decorators = [router_1.Router.get("/session")];
            _getUsers_decorators = [router_1.Router.get("/users")];
            _getUser_decorators = [router_1.Router.get("/users/:username")];
            _registerUser_decorators = [router_1.Router.post("/users")];
            _updateUser_decorators = [router_1.Router.patch("/users")];
            _deleteUser_decorators = [router_1.Router.delete("/users")];
            _logIn_decorators = [router_1.Router.post("/login")];
            _logOut_decorators = [router_1.Router.post("/logout")];
            _registerOrganization_decorators = [router_1.Router.post("/organization")];
            _getOrganizationById_decorators = [router_1.Router.get("/organization/:orgId")];
            _getOrganizationsOfUser_decorators = [router_1.Router.get("/organization")];
            _updateOrganizationName_decorators = [router_1.Router.patch("/organization")];
            _addMembersToOrganization_decorators = [router_1.Router.patch("/organization/addMember")];
            _updateMemberStatus_decorators = [router_1.Router.patch("/organization/updateMember")];
            _leaveOrganization_decorators = [router_1.Router.patch("/organization/leaveOrganization")];
            _removeUserFromOrganization_decorators = [router_1.Router.patch("/organization/removeMember")];
            _updateOpenDays_decorators = [router_1.Router.patch("/organization/days/open/:id")];
            _updateRestockDay_decorators = [router_1.Router.patch("/organization/days/restock/:id")];
            _deleteOrganization_decorators = [router_1.Router.delete("/organization/:org")];
            _resetAllVisits_decorators = [router_1.Router.patch("/organization/reset/:orgId")];
            _createHouseholdProfile_decorators = [router_1.Router.post("/profile")];
            _updateHouseholdDetails_decorators = [router_1.Router.patch("/profile")];
            _addPatronToHousehold_decorators = [router_1.Router.patch("/profile/addPatron")];
            _removePatronFromHousehold_decorators = [router_1.Router.patch("/profile/removePatron")];
            _updatePatron_decorators = [router_1.Router.patch("/profile/updatePatron")];
            _getPatronById_decorators = [router_1.Router.get("/patron/:id")];
            _signInHousehold_decorators = [router_1.Router.get("/profile/:id")];
            _getSingleHousehold_decorators = [router_1.Router.get("/profile/one/:id")];
            _getHouseholdsByOrg_decorators = [router_1.Router.get("/profile/org/:orgId")];
            _addVisit_decorators = [router_1.Router.patch("/profile/visit/:id")];
            _removeHouseholdProfile_decorators = [router_1.Router.delete("/profile/:id")];
            _getHouseholdAllocation_decorators = [router_1.Router.get("/profile/allocate/:id")];
            _getItem_decorators = [router_1.Router.get("/inventory/stocks/:stockId")];
            _getOrganizationInventory_decorators = [router_1.Router.get("/inventory/:orgId")];
            _setInventoryMaxPerDay_decorators = [router_1.Router.get("/inventories/:orgId")];
            _updateInventoryItem_decorators = [router_1.Router.patch("/inventory/:id")];
            _decrementInventoryItem_decorators = [router_1.Router.patch("/inventories/allocate")];
            _allocateStocks_decorators = [router_1.Router.patch("/inventories/goodallocate")];
            _addNewInventoryItem_decorators = [router_1.Router.post("/inventory")];
            _deleteInventoryItem_decorators = [router_1.Router.delete("/inventory/:id")];
            _getOrganizationShifts_decorators = [router_1.Router.get("/shift/org/:id/:futureOnly")];
            _getUserShifts_decorators = [router_1.Router.get("/shift/user/:futureOnly")];
            _getShift_decorators = [router_1.Router.get("/shift/one/:id")];
            _createNewShift_decorators = [router_1.Router.post("/shift")];
            _updateShift_decorators = [router_1.Router.patch("/shift")];
            _updateShiftCapacity_decorators = [router_1.Router.patch("/shift/capacity")];
            _claimShift_decorators = [router_1.Router.patch("/shift/claim/:id")];
            _unclaimShift_decorators = [router_1.Router.patch("/shift/unclaim/:id")];
            _deleteShift_decorators = [router_1.Router.delete("/shift/:id")];
            _createLanguageAudio_decorators = [router_1.Router.post("/languageAudio")];
            _getLanguageAudioByOwner_decorators = [router_1.Router.get("/languageAudio/owner/:org/allLanguages")];
            _getLanguageAudioByOwnerAndLanguage_decorators = [router_1.Router.get("/languageAudio/owner/:org/:language")];
            _getLanguageAudioById_decorators = [router_1.Router.get("/languageAudio/:audio")];
            _updateLanguageAudio_decorators = [router_1.Router.patch("/languageAudio")];
            _deleteLanguageAudio_decorators = [router_1.Router.delete("/languageAudio/:audio")];
            __esDecorate(_a, null, _getSessionUser_decorators, { kind: "method", name: "getSessionUser", static: false, private: false, access: { has: obj => "getSessionUser" in obj, get: obj => obj.getSessionUser }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _getUsers_decorators, { kind: "method", name: "getUsers", static: false, private: false, access: { has: obj => "getUsers" in obj, get: obj => obj.getUsers }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _getUser_decorators, { kind: "method", name: "getUser", static: false, private: false, access: { has: obj => "getUser" in obj, get: obj => obj.getUser }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _registerUser_decorators, { kind: "method", name: "registerUser", static: false, private: false, access: { has: obj => "registerUser" in obj, get: obj => obj.registerUser }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _updateUser_decorators, { kind: "method", name: "updateUser", static: false, private: false, access: { has: obj => "updateUser" in obj, get: obj => obj.updateUser }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _deleteUser_decorators, { kind: "method", name: "deleteUser", static: false, private: false, access: { has: obj => "deleteUser" in obj, get: obj => obj.deleteUser }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _logIn_decorators, { kind: "method", name: "logIn", static: false, private: false, access: { has: obj => "logIn" in obj, get: obj => obj.logIn }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _logOut_decorators, { kind: "method", name: "logOut", static: false, private: false, access: { has: obj => "logOut" in obj, get: obj => obj.logOut }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _registerOrganization_decorators, { kind: "method", name: "registerOrganization", static: false, private: false, access: { has: obj => "registerOrganization" in obj, get: obj => obj.registerOrganization }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _getOrganizationById_decorators, { kind: "method", name: "getOrganizationById", static: false, private: false, access: { has: obj => "getOrganizationById" in obj, get: obj => obj.getOrganizationById }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _getOrganizationsOfUser_decorators, { kind: "method", name: "getOrganizationsOfUser", static: false, private: false, access: { has: obj => "getOrganizationsOfUser" in obj, get: obj => obj.getOrganizationsOfUser }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _updateOrganizationName_decorators, { kind: "method", name: "updateOrganizationName", static: false, private: false, access: { has: obj => "updateOrganizationName" in obj, get: obj => obj.updateOrganizationName }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _addMembersToOrganization_decorators, { kind: "method", name: "addMembersToOrganization", static: false, private: false, access: { has: obj => "addMembersToOrganization" in obj, get: obj => obj.addMembersToOrganization }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _updateMemberStatus_decorators, { kind: "method", name: "updateMemberStatus", static: false, private: false, access: { has: obj => "updateMemberStatus" in obj, get: obj => obj.updateMemberStatus }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _leaveOrganization_decorators, { kind: "method", name: "leaveOrganization", static: false, private: false, access: { has: obj => "leaveOrganization" in obj, get: obj => obj.leaveOrganization }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _removeUserFromOrganization_decorators, { kind: "method", name: "removeUserFromOrganization", static: false, private: false, access: { has: obj => "removeUserFromOrganization" in obj, get: obj => obj.removeUserFromOrganization }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _updateOpenDays_decorators, { kind: "method", name: "updateOpenDays", static: false, private: false, access: { has: obj => "updateOpenDays" in obj, get: obj => obj.updateOpenDays }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _updateRestockDay_decorators, { kind: "method", name: "updateRestockDay", static: false, private: false, access: { has: obj => "updateRestockDay" in obj, get: obj => obj.updateRestockDay }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _deleteOrganization_decorators, { kind: "method", name: "deleteOrganization", static: false, private: false, access: { has: obj => "deleteOrganization" in obj, get: obj => obj.deleteOrganization }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _resetAllVisits_decorators, { kind: "method", name: "resetAllVisits", static: false, private: false, access: { has: obj => "resetAllVisits" in obj, get: obj => obj.resetAllVisits }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _createHouseholdProfile_decorators, { kind: "method", name: "createHouseholdProfile", static: false, private: false, access: { has: obj => "createHouseholdProfile" in obj, get: obj => obj.createHouseholdProfile }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _updateHouseholdDetails_decorators, { kind: "method", name: "updateHouseholdDetails", static: false, private: false, access: { has: obj => "updateHouseholdDetails" in obj, get: obj => obj.updateHouseholdDetails }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _addPatronToHousehold_decorators, { kind: "method", name: "addPatronToHousehold", static: false, private: false, access: { has: obj => "addPatronToHousehold" in obj, get: obj => obj.addPatronToHousehold }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _removePatronFromHousehold_decorators, { kind: "method", name: "removePatronFromHousehold", static: false, private: false, access: { has: obj => "removePatronFromHousehold" in obj, get: obj => obj.removePatronFromHousehold }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _updatePatron_decorators, { kind: "method", name: "updatePatron", static: false, private: false, access: { has: obj => "updatePatron" in obj, get: obj => obj.updatePatron }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _getPatronById_decorators, { kind: "method", name: "getPatronById", static: false, private: false, access: { has: obj => "getPatronById" in obj, get: obj => obj.getPatronById }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _signInHousehold_decorators, { kind: "method", name: "signInHousehold", static: false, private: false, access: { has: obj => "signInHousehold" in obj, get: obj => obj.signInHousehold }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _getSingleHousehold_decorators, { kind: "method", name: "getSingleHousehold", static: false, private: false, access: { has: obj => "getSingleHousehold" in obj, get: obj => obj.getSingleHousehold }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _getHouseholdsByOrg_decorators, { kind: "method", name: "getHouseholdsByOrg", static: false, private: false, access: { has: obj => "getHouseholdsByOrg" in obj, get: obj => obj.getHouseholdsByOrg }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _addVisit_decorators, { kind: "method", name: "addVisit", static: false, private: false, access: { has: obj => "addVisit" in obj, get: obj => obj.addVisit }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _removeHouseholdProfile_decorators, { kind: "method", name: "removeHouseholdProfile", static: false, private: false, access: { has: obj => "removeHouseholdProfile" in obj, get: obj => obj.removeHouseholdProfile }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _getHouseholdAllocation_decorators, { kind: "method", name: "getHouseholdAllocation", static: false, private: false, access: { has: obj => "getHouseholdAllocation" in obj, get: obj => obj.getHouseholdAllocation }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _getItem_decorators, { kind: "method", name: "getItem", static: false, private: false, access: { has: obj => "getItem" in obj, get: obj => obj.getItem }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _getOrganizationInventory_decorators, { kind: "method", name: "getOrganizationInventory", static: false, private: false, access: { has: obj => "getOrganizationInventory" in obj, get: obj => obj.getOrganizationInventory }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _setInventoryMaxPerDay_decorators, { kind: "method", name: "setInventoryMaxPerDay", static: false, private: false, access: { has: obj => "setInventoryMaxPerDay" in obj, get: obj => obj.setInventoryMaxPerDay }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _updateInventoryItem_decorators, { kind: "method", name: "updateInventoryItem", static: false, private: false, access: { has: obj => "updateInventoryItem" in obj, get: obj => obj.updateInventoryItem }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _decrementInventoryItem_decorators, { kind: "method", name: "decrementInventoryItem", static: false, private: false, access: { has: obj => "decrementInventoryItem" in obj, get: obj => obj.decrementInventoryItem }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _allocateStocks_decorators, { kind: "method", name: "allocateStocks", static: false, private: false, access: { has: obj => "allocateStocks" in obj, get: obj => obj.allocateStocks }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _addNewInventoryItem_decorators, { kind: "method", name: "addNewInventoryItem", static: false, private: false, access: { has: obj => "addNewInventoryItem" in obj, get: obj => obj.addNewInventoryItem }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _deleteInventoryItem_decorators, { kind: "method", name: "deleteInventoryItem", static: false, private: false, access: { has: obj => "deleteInventoryItem" in obj, get: obj => obj.deleteInventoryItem }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _getOrganizationShifts_decorators, { kind: "method", name: "getOrganizationShifts", static: false, private: false, access: { has: obj => "getOrganizationShifts" in obj, get: obj => obj.getOrganizationShifts }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _getUserShifts_decorators, { kind: "method", name: "getUserShifts", static: false, private: false, access: { has: obj => "getUserShifts" in obj, get: obj => obj.getUserShifts }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _getShift_decorators, { kind: "method", name: "getShift", static: false, private: false, access: { has: obj => "getShift" in obj, get: obj => obj.getShift }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _createNewShift_decorators, { kind: "method", name: "createNewShift", static: false, private: false, access: { has: obj => "createNewShift" in obj, get: obj => obj.createNewShift }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _updateShift_decorators, { kind: "method", name: "updateShift", static: false, private: false, access: { has: obj => "updateShift" in obj, get: obj => obj.updateShift }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _updateShiftCapacity_decorators, { kind: "method", name: "updateShiftCapacity", static: false, private: false, access: { has: obj => "updateShiftCapacity" in obj, get: obj => obj.updateShiftCapacity }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _claimShift_decorators, { kind: "method", name: "claimShift", static: false, private: false, access: { has: obj => "claimShift" in obj, get: obj => obj.claimShift }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _unclaimShift_decorators, { kind: "method", name: "unclaimShift", static: false, private: false, access: { has: obj => "unclaimShift" in obj, get: obj => obj.unclaimShift }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _deleteShift_decorators, { kind: "method", name: "deleteShift", static: false, private: false, access: { has: obj => "deleteShift" in obj, get: obj => obj.deleteShift }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _createLanguageAudio_decorators, { kind: "method", name: "createLanguageAudio", static: false, private: false, access: { has: obj => "createLanguageAudio" in obj, get: obj => obj.createLanguageAudio }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _getLanguageAudioByOwner_decorators, { kind: "method", name: "getLanguageAudioByOwner", static: false, private: false, access: { has: obj => "getLanguageAudioByOwner" in obj, get: obj => obj.getLanguageAudioByOwner }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _getLanguageAudioByOwnerAndLanguage_decorators, { kind: "method", name: "getLanguageAudioByOwnerAndLanguage", static: false, private: false, access: { has: obj => "getLanguageAudioByOwnerAndLanguage" in obj, get: obj => obj.getLanguageAudioByOwnerAndLanguage }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _getLanguageAudioById_decorators, { kind: "method", name: "getLanguageAudioById", static: false, private: false, access: { has: obj => "getLanguageAudioById" in obj, get: obj => obj.getLanguageAudioById }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _updateLanguageAudio_decorators, { kind: "method", name: "updateLanguageAudio", static: false, private: false, access: { has: obj => "updateLanguageAudio" in obj, get: obj => obj.updateLanguageAudio }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _deleteLanguageAudio_decorators, { kind: "method", name: "deleteLanguageAudio", static: false, private: false, access: { has: obj => "deleteLanguageAudio" in obj, get: obj => obj.deleteLanguageAudio }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.default = (0, router_1.getExpressRouter)(new Routes());
//# sourceMappingURL=routes.js.map