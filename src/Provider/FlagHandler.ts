import { v4 } from "uuid";
import { IEnvironmentType, IProjectDetail } from "../Interfaces/IProjectDetail";
import {
  getProjectDataByProjectAndOrganizationId,
  insertProjectData,
} from "./ProjectDataProvider";

class FlagHandler {
  socket;
  io;
  constructor(io, socket) {
    this.socket = socket;
    this.io = io;

    socket.on("getFlagData", (key: string) => this.getFlagData(key));
    socket.on("setFlagData", (key: string, flagData: IProjectDetail) =>
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
    const organizationId: string = decodeData.split(":")[0],
      projectId: string = decodeData.split(":")[1],
      envType: string = decodeData.split(":")[2] || "";
    getProjectDataByProjectAndOrganizationId(projectId, organizationId).then(
      (response: Array<IProjectDetail>) => {
        let envTypeResponse: Array<IEnvironmentType> = [];
        if (response.length) {
          envTypeResponse = response[0].environments.filter(
            (flag: IEnvironmentType) => flag.envType == envType
          );
        }

        this.sendNotification(decodeData, envTypeResponse || []);
      }
    );
  }

  setFlagData(key: string, projectData: IProjectDetail) {
    const decodeData: string = this.decode(key);
    const envType: string = decodeData.split(":")[2] || "";

    insertProjectData(projectData, "testUser").then((response) => {
      let envTypeResponse: Array<IEnvironmentType> = [];
      if (projectData.environments.length) {
        envTypeResponse = projectData.environments.filter(
          (flag: IEnvironmentType) =>
            flag.envType == envType && flag.envId === key
        );
      }
      this.sendNotification(decodeData, envTypeResponse);
    });
  }
  sendNotification(clientId: string, data: Array<IEnvironmentType>) {
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
