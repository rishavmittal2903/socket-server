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
exports.ProjectController = void 0;
const express_1 = require("express");
const socket_io_client_1 = require("socket.io-client");
const ProjectDataProvider_1 = require("../Provider/ProjectDataProvider");
exports.ProjectController = (0, express_1.Router)();
const socket = (0, socket_io_client_1.io)(`http://localhost:4000`);
exports.ProjectController.get("/project/:projectId", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const projectId = ((_a = request.params) === null || _a === void 0 ? void 0 : _a.projectId) || "";
        const data = yield (0, ProjectDataProvider_1.getProjectDataByProjectId)(projectId);
        response.send(data);
    }
    catch (err) {
        response.send(err).sendStatus(500);
    }
}));
exports.ProjectController.get("/allProjects/:emailId/:orgId", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c;
    try {
        const emailId = ((_b = request.params) === null || _b === void 0 ? void 0 : _b.emailId) || "";
        const orgId = ((_c = request.params) === null || _c === void 0 ? void 0 : _c.orgId) || "";
        const data = yield (0, ProjectDataProvider_1.getProjectsByEmailId)(emailId, orgId);
        response.send(data);
    }
    catch (err) {
        response.send(err).sendStatus(500);
    }
}));
exports.ProjectController.get("/projects/:orgId", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    try {
        const orgId = ((_d = request.params) === null || _d === void 0 ? void 0 : _d.orgId) || "";
        const data = yield (0, ProjectDataProvider_1.getProjectsByOrganizationId)(orgId);
        response.send(data);
    }
    catch (err) {
        response.send(err).sendStatus(500);
    }
}));
exports.ProjectController.post("/project", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    try {
        const projectData = request.body;
        const envType = (_e = request.headers) === null || _e === void 0 ? void 0 : _e.envtype;
        const data = yield (0, ProjectDataProvider_1.insertProjectData)(projectData, "testUser", socket, envType);
        response.send(data);
    }
    catch (err) {
        response.send(err);
    }
}));
exports.ProjectController.delete("/project/:projId/:orgId", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _f, _g;
    try {
        const projId = ((_f = request.params) === null || _f === void 0 ? void 0 : _f.projId) || "";
        const orgId = ((_g = request.params) === null || _g === void 0 ? void 0 : _g.orgId) || "";
        const data = yield (0, ProjectDataProvider_1.deleteProjectByProjectIdAndOrgId)(projId, orgId, socket);
        response.send(data);
    }
    catch (err) {
        response.send(err);
    }
}));
//# sourceMappingURL=ProjectController.js.map