import { Router, Request, Response, NextFunction } from "express";
import { IProjectDetail } from "../Interfaces/IProjectDetail";

import { deleteProjectAccessByProjectId, getProjectAccessPolicyByProjectId, updateProjectAccessDataByProjectId } from "../Provider/ProjectRbacProvider";

export const RbacProjectController = Router();

RbacProjectController.get(
  "/projRoles/:projectId",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const projectId: string = request.params?.projectId || "";
      const data: Array<any> = await getProjectAccessPolicyByProjectId(
        projectId
      );
      response.send(data);
    } catch (err) {
      response.send(err).sendStatus(500);
    }
  }
);
RbacProjectController.put(
  "/projRoles/:projectId",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const projData: IProjectDetail = request.body;
      const projectId: string = request.params.projectId;
      const data = await updateProjectAccessDataByProjectId(
        projectId,
        projData,
        "testUser"
      );
      response.send(data);
    } catch (err) {
      response.send(err).sendStatus(500);
    }
  }
);
RbacProjectController.post(
  "/projRoles",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const projectData: IProjectDetail = request.body;
      const data = await updateProjectAccessDataByProjectId(
        projectData.projectId,
        projectData,
        "testUser"
      );
      response.send(data);
    } catch (err) {
      response.send(err).sendStatus(500);
    }
  }
);
RbacProjectController.delete(
  "/projRoles/:projId",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const projId: string = request.params?.projId || "";
      const data = await deleteProjectAccessByProjectId(projId);
      response.send(data);
    } catch (err) {
      response.send(err).sendStatus(500);
    }
  }
);
