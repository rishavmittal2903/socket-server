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
exports.RbacOrganizationController = void 0;
const express_1 = require("express");
const DbProvider_1 = require("../Provider/DbProvider");
const OrganizationRbacProvider_1 = require("../Provider/OrganizationRbacProvider");
exports.RbacOrganizationController = (0, express_1.Router)();
exports.RbacOrganizationController.get("/organizationRoles/:organizationId", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const organizationId = ((_a = request.params) === null || _a === void 0 ? void 0 : _a.organizationId) || "";
        const data = yield (0, OrganizationRbacProvider_1.getOrganizationAccessPolicyByOrgId)(organizationId);
        response.send(data);
    }
    catch (err) {
        response.send(err).sendStatus(500);
    }
}));
exports.RbacOrganizationController.put("/organizationRoles/:orgId", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const organizationData = request.body;
        const orgId = request.params.orgId;
        const data = yield (0, OrganizationRbacProvider_1.updateOrganizationAccessDataByOrgId)(orgId, organizationData, "testUser");
        response.send(data);
    }
    catch (err) {
        response.send(err).sendStatus(500);
    }
}));
exports.RbacOrganizationController.post("/organizationRoles", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const organizationData = request.body;
        const data = yield (0, OrganizationRbacProvider_1.updateOrganizationAccessDataByOrgId)(organizationData.organizationId, organizationData, "testUser");
        response.send(data);
    }
    catch (err) {
        response.send(err).sendStatus(500);
    }
}));
exports.RbacOrganizationController.delete("/organizationRoles/:orgId", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const organizationId = ((_b = request.params) === null || _b === void 0 ? void 0 : _b.organizationId) || "";
        const data = yield (0, DbProvider_1.deleteAccessPolicylagsByOrgId)(organizationId);
        response.send(data);
    }
    catch (err) {
        response.send(err).sendStatus(500);
    }
}));
//# sourceMappingURL=RbacOrganizationController.js.map