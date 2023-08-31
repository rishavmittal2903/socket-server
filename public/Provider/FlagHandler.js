"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const ProjectDataProvider_1 = require("./ProjectDataProvider");
class FlagHandler {
    constructor(io, socket) {
        this.socket = socket;
        this.io = io;
        socket.on("getFlagData", (key) => this.getFlagData(key));
        socket.on("setFlagData", (key, flagData) => {
            this.setFlagData(key, flagData);
        });
        socket.on("connect_error", (err) => {
            console.log(`connect_error due to ${err.message}`);
        });
    }
    decode(key) {
        const bufferObj = Buffer.from(key, "base64");
        return bufferObj.toString("utf8");
    }
    getFlagData(key) {
        const decodeData = this.decode(key);
        const organizationId = decodeData.split(":")[0], projectId = decodeData.split(":")[1], envType = decodeData.split(":")[2] || "";
        (0, ProjectDataProvider_1.getProjectDataByProjectAndOrganizationId)(projectId, organizationId).then((response) => {
            let envTypeResponse;
            if (response === null || response === void 0 ? void 0 : response.length) {
                envTypeResponse = response[0].environments.find((flag) => flag.envType == envType);
            }
            this.sendNotification(key, (envTypeResponse === null || envTypeResponse === void 0 ? void 0 : envTypeResponse.flagData) || []);
        });
    }
    setFlagData(key, envTypeResponse) {
        this.sendNotification(key, envTypeResponse);
    }
    sendNotification(clientId, data) {
        const notification = {
            id: (0, uuid_1.v4)(),
            data,
        };
        this.io.sockets.emit(clientId, notification);
    }
}
function socketConnectionHandler(io) {
    io.on("connection", (socket) => {
        new FlagHandler(io, socket);
    });
}
exports.default = socketConnectionHandler;
//# sourceMappingURL=FlagHandler.js.map