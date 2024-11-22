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
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const friend_1 = require("./concepts/friend");
const post_1 = require("./concepts/post");
const router_1 = require("./framework/router");
/**
 * This class does useful conversions for the frontend.
 * For example, it converts a {@link PostDoc} into a more readable format for the frontend.
 */
class Responses {
    /**
     * Convert PostDoc into more readable format for the frontend by converting the author id into a username.
     */
    static post(post) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!post) {
                return post;
            }
            const author = yield app_1.User.getUserById(post.author);
            return Object.assign(Object.assign({}, post), { author: author.username });
        });
    }
    /**
     * Same as {@link post} but for an array of PostDoc for improved performance.
     */
    static posts(posts) {
        return __awaiter(this, void 0, void 0, function* () {
            const authors = yield app_1.User.idsToUsernames(posts.map((post) => post.author));
            return posts.map((post, i) => (Object.assign(Object.assign({}, post), { author: authors[i] })));
        });
    }
    /**
     * Convert StockDoc into more readable format for the frontend by converting the org id into a name.
     */
    static stock(stock) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!stock) {
                return stock;
            }
            const owner = yield app_1.Team.get(stock.owner);
            return Object.assign(Object.assign({}, stock), { owner: owner.name });
        });
    }
    /**
     * Same as {@link stock} but for an array of StockDoc for improved performance.
     */
    static stocks(stocks) {
        return __awaiter(this, void 0, void 0, function* () {
            const owners = yield app_1.Team.idsToNames(stocks.map((s) => s.owner));
            return stocks.map((stock, i) => (Object.assign(Object.assign({}, stock), { owner: owners[i] })));
        });
    }
    /**
     * Convert ShiftDoc into more readable format for the frontend by converting the org id into a name
     * and volunteer IDs into usernames.
     */
    static shift(shift) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!shift) {
                return shift;
            }
            const owner = yield app_1.Team.get(shift.owner);
            const volunteers = yield app_1.User.idsToUsernames(shift.volunteers);
            return Object.assign(Object.assign({}, shift), { owner: owner.name, volunteers: volunteers });
        });
    }
    /**
     * Same as {@link shift} but for an array of ShiftDoc.
     */
    static shifts(shifts) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = [];
            for (const s of shifts) {
                const shiftResp = yield Responses.shift(s);
                result.push(shiftResp);
            }
            return result;
        });
    }
    /**
     * Convert FriendRequestDoc into more readable format for the frontend
     * by converting the ids into usernames.
     */
    static friendRequests(requests) {
        return __awaiter(this, void 0, void 0, function* () {
            const from = requests.map((request) => request.from);
            const to = requests.map((request) => request.to);
            const usernames = yield app_1.User.idsToUsernames(from.concat(to));
            return requests.map((request, i) => (Object.assign(Object.assign({}, request), { from: usernames[i], to: usernames[i + requests.length] })));
        });
    }
}
exports.default = Responses;
router_1.Router.registerError(post_1.PostAuthorNotMatchError, (e) => __awaiter(void 0, void 0, void 0, function* () {
    const username = (yield app_1.User.getUserById(e.author)).username;
    return e.formatWith(username, e._id);
}));
router_1.Router.registerError(friend_1.FriendRequestAlreadyExistsError, (e) => __awaiter(void 0, void 0, void 0, function* () {
    const [user1, user2] = yield Promise.all([app_1.User.getUserById(e.from), app_1.User.getUserById(e.to)]);
    return e.formatWith(user1.username, user2.username);
}));
router_1.Router.registerError(friend_1.FriendNotFoundError, (e) => __awaiter(void 0, void 0, void 0, function* () {
    const [user1, user2] = yield Promise.all([app_1.User.getUserById(e.user1), app_1.User.getUserById(e.user2)]);
    return e.formatWith(user1.username, user2.username);
}));
router_1.Router.registerError(friend_1.FriendRequestNotFoundError, (e) => __awaiter(void 0, void 0, void 0, function* () {
    const [user1, user2] = yield Promise.all([app_1.User.getUserById(e.from), app_1.User.getUserById(e.to)]);
    return e.formatWith(user1.username, user2.username);
}));
router_1.Router.registerError(friend_1.AlreadyFriendsError, (e) => __awaiter(void 0, void 0, void 0, function* () {
    const [user1, user2] = yield Promise.all([app_1.User.getUserById(e.user1), app_1.User.getUserById(e.user2)]);
    return e.formatWith(user1.username, user2.username);
}));
//# sourceMappingURL=responses.js.map