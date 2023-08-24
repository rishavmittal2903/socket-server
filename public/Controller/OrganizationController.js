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
exports.OrganizationController = void 0;
const express_1 = require("express");
const socket_io_client_1 = require("socket.io-client");
const OrganizationProvider_1 = require("../Provider/OrganizationProvider");
exports.OrganizationController = (0, express_1.Router)();
const socket = (0, socket_io_client_1.io)(`http://localhost:4000`);
exports.OrganizationController.get("/organization/:organizationId", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const organizationId = ((_a = request.params) === null || _a === void 0 ? void 0 : _a.organizationId) || "";
        const data = yield (0, OrganizationProvider_1.getOrganizationDataByOrgId)(organizationId);
        response.send(data);
    }
    catch (err) {
        response.send(err).sendStatus(500);
    }
}));
exports.OrganizationController.get("/organizations/:emailId", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const emailId = ((_b = request.params) === null || _b === void 0 ? void 0 : _b.emailId) || "";
        const data = yield (0, OrganizationProvider_1.getOrganizationByEmailId)(emailId);
        response.send(data);
    }
    catch (err) {
        response.send(err).sendStatus(500);
    }
}));
exports.OrganizationController.post("/organization", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const organizationData = request.body;
        const data = yield (0, OrganizationProvider_1.insertOrganizationData)(organizationData, "testUser");
        response.send(data);
    }
    catch (err) {
        response.send(err).sendStatus(500);
    }
}));
exports.OrganizationController.delete("/organization/:orgId", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const organizationId = ((_c = request.params) === null || _c === void 0 ? void 0 : _c.orgId) || "";
        const data = yield (0, OrganizationProvider_1.deleteOrganizationByOrgId)(organizationId, socket);
        response.send(data);
    }
    catch (err) {
        response.send(err).sendStatus(500);
    }
}));
//# sourceMappingURL=OrganizationController.js.map