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
exports.getOrganizationAccessPolicyByOrgId = exports.updateOrganizationAccessDataByOrgId = exports.deleteOrganizationAccessByOrgId = void 0;
const server_1 = require("../server");
const deleteOrganizationAccessByOrgId = (organizationId) => __awaiter(void 0, void 0, void 0, function* () {
    const orgData = yield server_1.dbClient
        .collection("organizationData")
        .updateOne({ organizationId }, { $set: { contributors: [], owners: [] } }, { upsert: true });
    return { orgData };
});
exports.deleteOrganizationAccessByOrgId = deleteOrganizationAccessByOrgId;
const updateOrganizationAccessDataByOrgId = (organizationId, orgData, userName) => __awaiter(void 0, void 0, void 0, function* () {
    orgData = Object.assign(Object.assign({}, orgData), { updatedBy: userName, updatedOn: new Date().toLocaleString() });
    const data = yield server_1.dbClient
        .collection("organizationData")
        .updateOne({ organizationId }, { $set: orgData });
    return data;
});
exports.updateOrganizationAccessDataByOrgId = updateOrganizationAccessDataByOrgId;
const getOrganizationAccessPolicyByOrgId = (organizationId) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield server_1.dbClient
        .collection("organizationData")
        .find({ organizationId })
        .toArray();
    return data.map((org) => ({
        owners: org.owners,
        contributors: org.contributors,
    }));
});
exports.getOrganizationAccessPolicyByOrgId = getOrganizationAccessPolicyByOrgId;
//# sourceMappingURL=OrganizationRbacProvider.js.map