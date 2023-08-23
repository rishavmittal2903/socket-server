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
const FlagHandler_1 = __importDefault(require("./Provider/FlagHandler"));
const UserFlagController_1 = require("./Controller/UserFlagController");
process.on('uncaughtException', (error, origin) => {
    console.log('----- Uncaught exception -----');
    console.log(error);
    console.log('----- Exception origin -----');
    console.log(origin);
});
process.on('unhandledRejection', (reason, promise) => {
    console.log('----- Unhandled Rejection at -----');
    console.log(promise);
    console.log('----- Reason -----');
    console.log(reason);
});
const app = (0, express_1.default)();
const uri = 'mongodb+srv://rishavmittal2903:Bangalore_94@cluster0.vozyvlu.mongodb.net/?retryWrites=true&w=majority';
const dbName = 'flagManagement';
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
const port = 4000;
app.use((0, cors_1.default)());
app.use(express_1.default.static(__dirname));
app.use(express_1.default.json());
app.use('/api/v1', UserFlagController_1.UserFlagController);
server.listen(port, () => console.log('Http server started on port ' + port));
//# sourceMappingURL=server.js.map