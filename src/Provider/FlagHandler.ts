import { v4 } from "uuid";
import { IEnvironmentType, IProjectDetail } from "../Interfaces/IProjectDetail";
import { IFlagData } from "../Interfaces/IUserDefinedFlags";
import {
  getProjectDataByProjectAndOrganizationId,
} from "./ProjectDataProvider";

class FlagHandler {
  socket;
  io;
  constructor(io, socket) {
    this.socket = socket;
    this.io = io;

    socket.on("getFlagData", (key: string) => this.getFlagData(key));
    socket.on("setFlagData", (key: string, flagData: Array<IFlagData>) =>
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
  getFlagData(key: string ) {
    const decodeData: string = this.decode(key);
    const organizationId: string = decodeData.split(":")[0],
      projectId: string = decodeData.split(":")[1],
      envType: string = decodeData.split(":")[2] || "";
    getProjectDataByProjectAndOrganizationId(projectId, organizationId).then(
      (response: Array<IProjectDetail>) => {
        let envTypeResponse: IEnvironmentType;
        if (response.length) {
          envTypeResponse = response[0].environments.find(
            (flag: IEnvironmentType) => flag.envType == envType
          );
        }
        this.sendNotification(key, envTypeResponse?.flagData || []);
      }
    );
  }

  setFlagData(key: string, envTypeResponse: Array<IFlagData>) {
    this.sendNotification(key, envTypeResponse);
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
