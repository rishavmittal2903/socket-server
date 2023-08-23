import { Router, Request, Response, NextFunction } from "express";
import { io } from 'socket.io-client';
import { IUserDefinedFlags } from "../Interfaces/IUserDefinedFlags";
import { getEnvironmentVariableValueByKey } from "../Utility/Utility";

export const UserFlagController = Router();

UserFlagController.get(
  "/setFlagData",
  async (request: Request, response: Response, next: NextFunction) => {
    const socket = io(`http://${request.hostname}:${getEnvironmentVariableValueByKey('PORT')}`);
    const data:IUserDefinedFlags = request.body;
    socket.emit("setFlagData","cnRhcnN0YWRmdXR1dzpzeXV0c3l0ZHlzdDp5ZHRzdGR5dHlkczpkZXY=",data)
    response.sendStatus(200);
  }
);
