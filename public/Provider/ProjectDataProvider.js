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
exports.deleteProjectByOrgId = exports.deleteProjectByProjectIdAndOrgId = exports.getProjectsByEmailId = exports.getProjectDataByProjectAndOrganizationId = exports.getProjectsByOrganizationId = exports.updateProjectDataByProjectId = exports.getProjectDataByProjectId = exports.insertProjectData = void 0;
const server_1 = require("../server");
const Utility_1 = require("../Utility/Utility");
const insertProjectData = (flagData, userName, socket, envType) => __awaiter(void 0, void 0, void 0, function* () {
    const isDataExists = yield (0, exports.getProjectDataByProjectId)(flagData.projectId);
    const flagResponse = flagData.environments.find((flag) => flag.envType === envType);
    if (isDataExists.length) {
        const response = yield (0, exports.updateProjectDataByProjectId)(flagData.projectId, flagData, userName);
        socket.emit("setFlagData", flagResponse.envId, flagResponse.flagData);
        return response;
    }
    flagData = Object.assign(Object.assign({}, flagData), { createdBy: userName, createdOn: new Date().toLocaleString() });
    const data = yield server_1.dbClient
        .collection("projectDetail")
        .insertOne(flagData);
    socket.emit("setFlagData", flagResponse.envId, flagResponse.flagData);
    return data;
});
exports.insertProjectData = insertProjectData;
const getProjectDataByProjectId = (projectId) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield server_1.dbClient
        .collection("projectDetail")
        .find({ projectId })
        .toArray();
    return data;
});
exports.getProjectDataByProjectId = getProjectDataByProjectId;
const updateProjectDataByProjectId = (projectId, projectData, userName) => __awaiter(void 0, void 0, void 0, function* () {
    projectData = Object.assign(Object.assign({}, projectData), { updatedBy: userName, updatedOn: new Date().toLocaleString() });
    const data = yield server_1.dbClient
        .collection("projectDetail")
        .updateOne({ projectId }, { $set: projectData });
    return data;
});
exports.updateProjectDataByProjectId = updateProjectDataByProjectId;
const getProjectsByOrganizationId = (organizationId) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield server_1.dbClient
        .collection("projectDetail")
        .find({ organizationId })
        .toArray();
    return data;
});
exports.getProjectsByOrganizationId = getProjectsByOrganizationId;
const getProjectDataByProjectAndOrganizationId = (projectId, organizationId) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield server_1.dbClient
        .collection("projectDetail")
        .find({ organizationId, projectId })
        .toArray();
    return data;
});
exports.getProjectDataByProjectAndOrganizationId = getProjectDataByProjectAndOrganizationId;
const getProjectsByEmailId = (emailId, orgId) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield server_1.dbClient
        .collection("projectDetail")
        .find({ $or: [{ "owners.email": emailId }, { "contributors.email": emailId }], $and: [{ organizationId: orgId }] })
        .toArray();
    return data;
});
exports.getProjectsByEmailId = getProjectsByEmailId;
const deleteProjectByProjectIdAndOrgId = (projectId, organizationId, socket, envType) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield server_1.dbClient
        .collection("projectDetail")
        .deleteMany({ organizationId, projectId });
    socket.emit('setFlagData', (0, Utility_1.encode)(organizationId, projectId, envType), []);
    return data;
});
exports.deleteProjectByProjectIdAndOrgId = deleteProjectByProjectIdAndOrgId;
const deleteProjectByOrgId = (organizationId) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield server_1.dbClient
        .collection("projectDetail")
        .deleteMany({ organizationId });
    return data;
});
exports.deleteProjectByOrgId = deleteProjectByOrgId;
//# sourceMappingURL=ProjectDataProvider.js.map