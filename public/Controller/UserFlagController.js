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
exports.UserFlagController = void 0;
const express_1 = require("express");
const socket_io_client_1 = require("socket.io-client");
exports.UserFlagController = (0, express_1.Router)();
exports.UserFlagController.post("/setFlagData", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const socket = (0, socket_io_client_1.io)(`http://localhost:4000`);
    const data = request.body;
    socket.emit("setFlagData", data.clientId, data);
    response.sendStatus(200);
}));
//# sourceMappingURL=UserFlagController.js.map