"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const DbProvider_1 = require("./DbProvider");
class FlagHandler {
    constructor(io, socket) {
        this.socket = socket;
        this.io = io;
        socket.on("getFlagData", (key) => this.getFlagData(key));
        socket.on("setFlagData", (key, flagData) => this.setFlagData(key, flagData));
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
        const clientId = decodeData.split(":")[2];
        (0, DbProvider_1.getFlagDataByClientId)(clientId).then((response) => {
            var _a;
            this.sendNotification(clientId, ((_a = response[0]) === null || _a === void 0 ? void 0 : _a.flagData) || []);
        });
    }
    setFlagData(key, flagData) {
        console.log('key', key);
        const decodeData = this.decode(key);
        const clientId = decodeData.split(":")[2];
        // insertFlagData(flagData, "testUser").then((response) => {
        // this.sendNotification(clientId, flagData.flagData);
        // });
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