import cors from 'cors';
import http from 'http';
import Express from 'express'
import {Server} from 'socket.io'
import {MongoClient, ServerApiVersion} from "mongodb"
import { getEnvironmentVariableValueByKey } from './Utility/Utility';
import socketConnectionHandler from './Provider/FlagHandler';
import { UserFlagController } from './Controller/UserFlagController';

const app = Express();
const uri = getEnvironmentVariableValueByKey('MONGODBURI');
const dbName= getEnvironmentVariableValueByKey('MONGODB');
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
 export const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
client.connect();
export const dbClient = client.db(dbName);
const server = http.createServer(app);
const io = new Server(server,{
  cors: {
    origin: "*"
  }
});

socketConnectionHandler(io);
const port = getEnvironmentVariableValueByKey('PORT')|| 8081;
app.use(cors());
app.use(Express.static(__dirname));
app.use(Express.json())
app.use('/api/v1',UserFlagController);
server.listen(port,()=>console.log('Http server started on port '+port))



