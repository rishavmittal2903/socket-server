import { Router, Request, Response, NextFunction } from "express";
import { io } from 'socket.io-client';
import { IUserDefinedFlags } from "../Interfaces/IUserDefinedFlags";

export const UserFlagController = Router();

UserFlagController.post(
  "/setFlagData",
  async (request: Request, response: Response, next: NextFunction) => {
    const socket = io(`http://localhost:4000`);
    const data:IUserDefinedFlags = request.body;
    socket.emit("setFlagData",data.clientId,data)
    response.sendStatus(200);
  }
);
