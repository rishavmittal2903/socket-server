import { Router, Request, Response, NextFunction } from "express";
import { io } from 'socket.io-client';
import { IUserDefinedFlags } from "../Interfaces/IUserDefinedFlags";

export const UserFlagController = Router();

UserFlagController.get(
  "/setFlagData",
  async (request: Request, response: Response, next: NextFunction) => {
      console.log("${request.hostname}",`${request.hostname}`);
    const socket = io(`http://localhost:4000`);
    const data:any = {};
    socket.emit("setFlagData","cnRhcnN0YWRmdXR1dzpzeXV0c3l0ZHlzdDp5ZHRzdGR5dHlkczpkZXY=",data)
    response.sendStatus(200);
  }
);
