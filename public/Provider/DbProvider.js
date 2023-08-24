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
exports.deleteAccessPolicylagsByOrgId = exports.deleteUserDefinedFlagsByOrgId = exports.deleteAccessPolicylagsByProjectIdAndOrgId = exports.deleteUserDefinedFlagsByProjectIdAndOrgId = exports.getAccessPolicyByProjectId = exports.getAccessPolicyByOrganizationId = exports.getFlagDataByProjectId = exports.getFlagDataByProjectAndOrganizationId = exports.getFlagDataByOrganizationId = exports.updateFlagDataByClientId = exports.getFlagDataByClientId = exports.insertFlagData = void 0;
const server_1 = require("../server");
const insertFlagData = (flagData, userName) => __awaiter(void 0, void 0, void 0, function* () {
    const isDataExists = yield (0, exports.getFlagDataByClientId)(flagData.clientId);
    if (isDataExists.length) {
        return yield (0, exports.updateFlagDataByClientId)(flagData.clientId, flagData, userName);
    }
    flagData = Object.assign(Object.assign({}, flagData), { createdBy: userName, createdOn: new Date().toLocaleString() });
    const data = yield server_1.dbClient
        .collection("userDefinedFlags")
        .insertOne(flagData);
    return data;
});
exports.insertFlagData = insertFlagData;
const getFlagDataByClientId = (clientId) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield server_1.dbClient
        .collection("userDefinedFlags")
        .find({ clientId })
        .toArray();
    return data;
});
exports.getFlagDataByClientId = getFlagDataByClientId;
const updateFlagDataByClientId = (clientId, flagData, userName) => __awaiter(void 0, void 0, void 0, function* () {
    flagData = Object.assign(Object.assign({}, flagData), { updatedBy: userName, updatedOn: new Date().toLocaleString() });
    const data = yield server_1.dbClient
        .collection("userDefinedFlags")
        .updateOne({ clientId }, { $set: flagData });
    return data;
});
exports.updateFlagDataByClientId = updateFlagDataByClientId;
const getFlagDataByOrganizationId = (organizationId) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield server_1.dbClient
        .collection("userDefinedFlags")
        .find({ organizationId })
        .toArray();
    return data;
});
exports.getFlagDataByOrganizationId = getFlagDataByOrganizationId;
const getFlagDataByProjectAndOrganizationId = (projectId, organizationId) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield server_1.dbClient
        .collection("userDefinedFlags")
        .find({ organizationId, projectId })
        .toArray();
    return data;
});
exports.getFlagDataByProjectAndOrganizationId = getFlagDataByProjectAndOrganizationId;
const getFlagDataByProjectId = (projectId) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield server_1.dbClient
        .collection("userDefinedFlags")
        .find({ projectId })
        .toArray();
    return data;
});
exports.getFlagDataByProjectId = getFlagDataByProjectId;
const getAccessPolicyByOrganizationId = (organizationId) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield server_1.dbClient
        .collection("accessPolicy")
        .find({ organizationId })
        .toArray();
    return data;
});
exports.getAccessPolicyByOrganizationId = getAccessPolicyByOrganizationId;
const getAccessPolicyByProjectId = (projectId) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield server_1.dbClient
        .collection("accessPolicy")
        .find({ projectId })
        .toArray();
    return data;
});
exports.getAccessPolicyByProjectId = getAccessPolicyByProjectId;
const deleteUserDefinedFlagsByProjectIdAndOrgId = (projectId, organizationId) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield server_1.dbClient
        .collection("userDefinedFlags")
        .deleteMany({ projectId, organizationId });
    return data;
});
exports.deleteUserDefinedFlagsByProjectIdAndOrgId = deleteUserDefinedFlagsByProjectIdAndOrgId;
const deleteAccessPolicylagsByProjectIdAndOrgId = (projectId, organizationId) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield server_1.dbClient
        .collection("accessPolicy")
        .deleteMany({ projectId, organizationId });
    return data;
});
exports.deleteAccessPolicylagsByProjectIdAndOrgId = deleteAccessPolicylagsByProjectIdAndOrgId;
const deleteUserDefinedFlagsByOrgId = (organizationId) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield server_1.dbClient
        .collection("userDefinedFlags")
        .deleteMany({ organizationId });
    return data;
});
exports.deleteUserDefinedFlagsByOrgId = deleteUserDefinedFlagsByOrgId;
const deleteAccessPolicylagsByOrgId = (organizationId) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield server_1.dbClient
        .collection("accessPolicy")
        .deleteMany({ organizationId });
    return data;
});
exports.deleteAccessPolicylagsByOrgId = deleteAccessPolicylagsByOrgId;
//# sourceMappingURL=DbProvider.js.map