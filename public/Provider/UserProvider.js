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
exports.insertUserData = exports.updateUserDataByEmailId = exports.deleteUserByUserId = exports.getUsersByOrgId = exports.getUsersByUserId = exports.getUsers = void 0;
const server_1 = require("../server");
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield server_1.dbClient
        .collection("userDetail")
        .find()
        .toArray();
    return data;
});
exports.getUsers = getUsers;
const getUsersByUserId = (emailId) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield server_1.dbClient
        .collection("userDetail")
        .find({ email: emailId })
        .toArray();
    return data;
});
exports.getUsersByUserId = getUsersByUserId;
const getUsersByOrgId = (orgId) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield server_1.dbClient
        .collection("userDetail")
        .find({ organizationId: orgId })
        .toArray();
    return data;
});
exports.getUsersByOrgId = getUsersByOrgId;
const deleteUserByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield server_1.dbClient
        .collection("userDetail")
        .deleteMany({ email: userId });
    return data;
});
exports.deleteUserByUserId = deleteUserByUserId;
const updateUserDataByEmailId = (emailId, userData) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield server_1.dbClient
        .collection("userDetail")
        .updateOne({ email: emailId }, { $set: userData });
    return data;
});
exports.updateUserDataByEmailId = updateUserDataByEmailId;
const insertUserData = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const isDataExists = yield (0, exports.getUsersByUserId)(userData.email);
    if (isDataExists.length) {
        return 409;
    }
    const data = yield server_1.dbClient
        .collection("userDetail")
        .insertOne(userData);
    return data;
});
exports.insertUserData = insertUserData;
//# sourceMappingURL=UserProvider.js.map