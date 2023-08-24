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
exports.RbacProjectController = void 0;
const express_1 = require("express");
const ProjectRbacProvider_1 = require("../Provider/ProjectRbacProvider");
exports.RbacProjectController = (0, express_1.Router)();
exports.RbacProjectController.get("/projRoles/:projectId", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const projectId = ((_a = request.params) === null || _a === void 0 ? void 0 : _a.projectId) || "";
        const data = yield (0, ProjectRbacProvider_1.getProjectAccessPolicyByProjectId)(projectId);
        response.send(data);
    }
    catch (err) {
        response.send(err).sendStatus(500);
    }
}));
exports.RbacProjectController.put("/projRoles/:projectId", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projData = request.body;
        const projectId = request.params.projectId;
        const data = yield (0, ProjectRbacProvider_1.updateProjectAccessDataByProjectId)(projectId, projData, "testUser");
        response.send(data);
    }
    catch (err) {
        response.send(err).sendStatus(500);
    }
}));
exports.RbacProjectController.post("/projRoles", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projectData = request.body;
        const data = yield (0, ProjectRbacProvider_1.updateProjectAccessDataByProjectId)(projectData.projectId, projectData, "testUser");
        response.send(data);
    }
    catch (err) {
        response.send(err).sendStatus(500);
    }
}));
exports.RbacProjectController.delete("/projRoles/:projId", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const projId = ((_b = request.params) === null || _b === void 0 ? void 0 : _b.projId) || "";
        const data = yield (0, ProjectRbacProvider_1.deleteProjectAccessByProjectId)(projId);
        response.send(data);
    }
    catch (err) {
        response.send(err).sendStatus(500);
    }
}));
//# sourceMappingURL=RbacProjectController.js.map