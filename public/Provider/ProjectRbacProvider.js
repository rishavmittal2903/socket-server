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
exports.getProjectAccessPolicyByProjectId = exports.updateProjectAccessDataByProjectId = exports.deleteProjectAccessByProjectId = void 0;
const server_1 = require("../server");
const deleteProjectAccessByProjectId = (projectId) => __awaiter(void 0, void 0, void 0, function* () {
    const orgData = yield server_1.dbClient
        .collection("projectDetail")
        .updateOne({ projectId }, { $set: { contributors: [], owners: [] } }, { upsert: true });
    return { orgData };
});
exports.deleteProjectAccessByProjectId = deleteProjectAccessByProjectId;
const updateProjectAccessDataByProjectId = (projectId, projData, userName) => __awaiter(void 0, void 0, void 0, function* () {
    projData = Object.assign(Object.assign({}, projData), { updatedBy: userName, updatedOn: new Date().toLocaleString() });
    const data = yield server_1.dbClient
        .collection("projectDetail")
        .updateOne({ projectId }, { $set: projData });
    return data;
});
exports.updateProjectAccessDataByProjectId = updateProjectAccessDataByProjectId;
const getProjectAccessPolicyByProjectId = (projectId) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield server_1.dbClient
        .collection("projectDetail")
        .find({ projectId })
        .toArray();
    return data.map((org) => ({
        owners: org.owners,
        contributors: org.contributors,
    }));
});
exports.getProjectAccessPolicyByProjectId = getProjectAccessPolicyByProjectId;
//# sourceMappingURL=ProjectRbacProvider.js.map