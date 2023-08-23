"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbClient = exports.client = void 0;
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const mongodb_1 = require("mongodb");
const Utility_1 = require("./Utility/Utility");
const FlagHandler_1 = __importDefault(require("./Provider/FlagHandler"));
const UserFlagController_1 = require("./Controller/UserFlagController");
const app = (0, express_1.default)();
const uri = (0, Utility_1.getEnvironmentVariableValueByKey)('MONGODBURI');
const dbName = (0, Utility_1.getEnvironmentVariableValueByKey)('MONGODB');
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
exports.client = new mongodb_1.MongoClient(uri, {
    serverApi: {
        version: mongodb_1.ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
exports.client.connect();
exports.dbClient = exports.client.db(dbName);
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*"
    }
});
(0, FlagHandler_1.default)(io);
const port = (0, Utility_1.getEnvironmentVariableValueByKey)('PORT') || 8081;
app.use((0, cors_1.default)());
app.use(express_1.default.static(__dirname));
app.use(express_1.default.json());
app.use('/api/v1', UserFlagController_1.UserFlagController);
server.listen(port, () => console.log('Http server started on port ' + port));
//# sourceMappingURL=server.js.map