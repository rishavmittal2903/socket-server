import cors from "cors";
import http from "http";
import Express from "express";
import { Server } from "socket.io";
import { MongoClient, ServerApiVersion } from "mongodb";
import socketConnectionHandler from "./Provider/FlagHandler";
import { UserFlagController } from "./Controller/UserFlagController";
import { ProjectController } from "./Controller/ProjectController";
import { OrganizationController } from "./Controller/OrganizationController";
import { RbacOrganizationController } from "./Controller/RbacOrganizationController";
import { RbacProjectController } from "./Controller/RbacProjectController";
import { UserController } from "./Controller/UserController";

process.on("uncaughtException", (error, origin) => {
  console.log("----- Uncaught exception -----");
  console.log(error);
  console.log("----- Exception origin -----");
  console.log(origin);
});

process.on("unhandledRejection", (reason, promise) => {
  console.log("----- Unhandled Rejection at -----");
  console.log(promise);
  console.log("----- Reason -----");
  console.log(reason);
});

const app = Express();
const uri =
  "mongodb+srv://rishavmittal2903:Bangalore_94@cluster0.vozyvlu.mongodb.net/?retryWrites=true&w=majority";
const dbName = "flagManagement";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
export const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
client.connect();
export const dbClient = client.db(dbName);
const server = http.createServer(app);
const dbIo = new Server(server, {
  cors: {
    origin: "*",
  },
});

socketConnectionHandler(dbIo);
const port = 4000;
app.use(cors());
app.use(Express.static(__dirname));
app.use(Express.json());
app.use("/api/v1", UserFlagController);
app.use("/api/v1", ProjectController);
app.use("/api/v1", OrganizationController);
app.use("/api/v1", RbacOrganizationController);
app.use("/api/v1", RbacProjectController);
app.use("/api/v1", UserController);

server.listen(port, () => console.log("Http server started on port " + port));
