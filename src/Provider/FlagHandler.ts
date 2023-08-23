import { v4 } from "uuid";
import { IFlagData, IUserDefinedFlags } from "../Interfaces/IUserDefinedFlags";
import { getFlagDataByClientId, insertFlagData } from "./DbProvider";

class FlagHandler {
  socket;
  io;
  constructor(io, socket) {
    this.socket = socket;
    this.io = io;

    socket.on("getFlagData", (key: string) => this.getFlagData(key));
    socket.on("setFlagData", (key: string, flagData: IUserDefinedFlags) =>
      this.setFlagData(key, flagData)
    );
    socket.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
    });
  }

  decode(key: string): string {
    const bufferObj = Buffer.from(key, "base64");
    return bufferObj.toString("utf8");
  }
  getFlagData(key: string) {
    const decodeData: string = this.decode(key);
    const clientId: string = decodeData.split(":")[2];
    getFlagDataByClientId(clientId).then(
      (response: Array<IUserDefinedFlags>) => {
        this.sendNotification(clientId, response[0]?.flagData || []);
      }
    );
  }

  setFlagData(key: string, flagData: IUserDefinedFlags) {
      console.log('key',key);
    const decodeData: string = this.decode(key);
    const clientId: string = decodeData.split(":")[2];
    // insertFlagData(flagData, "testUser").then((response) => {
    // this.sendNotification(clientId, flagData.flagData);
    // });
  }
  sendNotification(clientId: string, data: Array<IFlagData>) {
    const notification = {
      id: v4(),
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

export default socketConnectionHandler;
