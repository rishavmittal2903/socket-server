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
exports.UserController = void 0;
const express_1 = require("express");
const UserProvider_1 = require("../Provider/UserProvider");
exports.UserController = (0, express_1.Router)();
exports.UserController.get("/users", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, UserProvider_1.getUsers)();
        response.send(data);
    }
    catch (err) {
        response.send(err).sendStatus(500);
    }
}));
exports.UserController.get("/users/:orgId", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const orgId = ((_a = request.params) === null || _a === void 0 ? void 0 : _a.orgId) || "";
        const data = yield (0, UserProvider_1.getUsersByOrgId)(orgId);
        response.send(data);
    }
    catch (err) {
        response.send(err).sendStatus(500);
    }
}));
exports.UserController.post("/users", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = request.body;
        const data = yield (0, UserProvider_1.insertUserData)(userData);
        response.sendStatus(data === 409 ? 409 : 201);
    }
    catch (err) {
        response.send(err).sendStatus(500);
    }
}));
exports.UserController.put("/user/:userId", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const userData = request.body;
        const userId = (_b = request.params) === null || _b === void 0 ? void 0 : _b.userId;
        const data = yield (0, UserProvider_1.updateUserDataByEmailId)(userId, userData);
        response.send(data);
    }
    catch (err) {
        response.send(err).sendStatus(500);
    }
}));
exports.UserController.delete("/user/:userId", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const userId = ((_c = request.params) === null || _c === void 0 ? void 0 : _c.userId) || "";
        const data = yield (0, UserProvider_1.deleteUserByUserId)(userId);
        response.send(data);
    }
    catch (err) {
        response.send(err).sendStatus(500);
    }
}));
exports.UserController.get("/userData/:userId", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    try {
        const emailId = ((_d = request.params) === null || _d === void 0 ? void 0 : _d.userId) || "";
        const data = yield (0, UserProvider_1.getUsersByUserId)(emailId);
        response.send(data);
    }
    catch (err) {
        response.send(err).sendStatus(500);
    }
}));
exports.UserController.post("/userData", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = request.body;
        const data = yield (0, UserProvider_1.getUserDataByEmailAndPassword)(userData === null || userData === void 0 ? void 0 : userData.email, userData === null || userData === void 0 ? void 0 : userData.password);
        if (data.length) {
            delete data[0].password;
            response.send(data);
        }
        else {
            response.sendStatus(500);
        }
    }
    catch (err) {
        response.send(err).sendStatus(500);
    }
}));
//# sourceMappingURL=UserController.js.map