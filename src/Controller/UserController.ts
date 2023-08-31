import { Router, Request, Response, NextFunction } from "express";
import { IUserDetail } from "../Interfaces/IUserDetail";
import {
  deleteUserByUserId,
  getUserDataByEmailAndPassword,
  getUsers,
  getUsersByOrgId,
  getUsersByUserId,
  insertUserData,
  updateUserDataByEmailId,
} from "../Provider/UserProvider";
export const UserController = Router();

UserController.get(
  "/users",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const data: Array<IUserDetail> = await getUsers();
      response.send(data);
    } catch (err) {
      response.send(err).sendStatus(500);
    }
  }
);

UserController.get(
  "/users/:orgId",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const orgId: string = request.params?.orgId || "";
      const data: Array<IUserDetail> = await getUsersByOrgId(orgId);
      response.send(data);
    } catch (err) {
      response.send(err).sendStatus(500);
    }
  }
);

UserController.post(
  "/users",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const userData: IUserDetail = request.body;
      const data: any = await insertUserData(userData);
      response.sendStatus(data===409?409:201);
    } catch (err) {
      response.send(err).sendStatus(500);
    }
  }
);
UserController.put(
  "/user/:userId",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const userData: IUserDetail = request.body;
      const userId: any = request.params?.userId;
      const data = await updateUserDataByEmailId(userId, userData);
      response.send(data);
    } catch (err) {
      response.send(err).sendStatus(500);
    }
  }
);
UserController.delete(
  "/user/:userId",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const userId: string = request.params?.userId || "";
      const data = await deleteUserByUserId(userId);
      response.send(data);
    } catch (err) {
      response.send(err).sendStatus(500);
    }
  }
);

UserController.get(
  "/userData/:userId",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const emailId: string = request.params?.userId || "";
      const data: Array<IUserDetail> = await getUsersByUserId(emailId);
      response.send(data);
    } catch (err) {
      response.send(err).sendStatus(500);
    }
  }
);

UserController.post(
  "/userData",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const userData = request.body
      const data: Array<IUserDetail> = await getUserDataByEmailAndPassword(userData?.email, userData?.password);
      if(data.length)
      {
        delete data[0].password;
        response.send(data);
      }
      else
      {
        response.sendStatus(500);
      }
    } catch (err) {
      response.send(err).sendStatus(500);
    }
  }
);
