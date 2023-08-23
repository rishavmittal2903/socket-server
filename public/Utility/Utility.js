"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnvironmentVariableValueByKey = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const config = dotenv_1.default.config();
const getEnvironmentVariableValueByKey = (keyName) => config.parsed[keyName];
exports.getEnvironmentVariableValueByKey = getEnvironmentVariableValueByKey;
//# sourceMappingURL=Utility.js.map