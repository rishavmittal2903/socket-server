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
exports.getProjectsByOrganizationId = exports.updateOrganizationDataByOrgId = exports.deleteOrganizationByOrgId = exports.getOrganizationByEmailId = exports.getOrganizationDataByOrgId = exports.insertOrganizationData = void 0;
const server_1 = require("../server");
const ProjectDataProvider_1 = require("./ProjectDataProvider");
const insertOrganizationData = (organizationData, userName) => __awaiter(void 0, void 0, void 0, function* () {
    const isDataExists = yield (0, exports.getOrganizationDataByOrgId)(organizationData.organizationId);
    if (isDataExists.length) {
        return yield (0, exports.updateOrganizationDataByOrgId)(organizationData.organizationId, organizationData, userName);
    }
    organizationData = Object.assign(Object.assign({}, organizationData), { createdBy: userName, createdOn: new Date().toLocaleString() });
    const data = yield server_1.dbClient
        .collection("organizationData")
        .insertOne(organizationData);
    return data;
});
exports.insertOrganizationData = insertOrganizationData;
const getOrganizationDataByOrgId = (organizationId) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield server_1.dbClient
        .collection("organizationData")
        .find({ organizationId })
        .toArray();
    return data;
});
exports.getOrganizationDataByOrgId = getOrganizationDataByOrgId;
const getOrganizationByEmailId = (emailId) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield server_1.dbClient
        .collection("organizationData")
        .find({ $or: [{ "owners.email": emailId }, { "contributors.email": emailId }] })
        .toArray();
    return data;
});
exports.getOrganizationByEmailId = getOrganizationByEmailId;
const deleteOrganizationByOrgId = (organizationId, socket) => __awaiter(void 0, void 0, void 0, function* () {
    const orgData = yield server_1.dbClient
        .collection("organizationData")
        .deleteMany({ organizationId });
    const projectData = yield (0, ProjectDataProvider_1.deleteProjectByOrgId)(organizationId);
    socket.emit("setFlagData", organizationId, []);
    return { orgData, projectData };
});
exports.deleteOrganizationByOrgId = deleteOrganizationByOrgId;
const updateOrganizationDataByOrgId = (organizationId, orgData, userName) => __awaiter(void 0, void 0, void 0, function* () {
    orgData = Object.assign(Object.assign({}, orgData), { updatedBy: userName, updatedOn: new Date().toLocaleString() });
    const data = yield server_1.dbClient
        .collection("organizationData")
        .updateOne({ organizationId }, { $set: Object.assign({}, orgData) });
    return data;
});
exports.updateOrganizationDataByOrgId = updateOrganizationDataByOrgId;
const getProjectsByOrganizationId = (organizationId) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield server_1.dbClient
        .collection("organizationData")
        .find({ organizationId })
        .toArray();
    return data;
});
exports.getProjectsByOrganizationId = getProjectsByOrganizationId;
//# sourceMappingURL=OrganizationProvider.js.map