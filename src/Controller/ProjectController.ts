import { Router, Request, Response, NextFunction } from "express";
import { io } from "socket.io-client";
import { IProjectDetail } from "../Interfaces/IProjectDetail";
import { deleteProjectByProjectIdAndOrgId, getProjectDataByProjectId, getProjectsByEmailId, getProjectsByOrganizationId, insertProjectData } from "../Provider/ProjectDataProvider";
export const ProjectController = Router();
const socket = io(`http://localhost:4000`);

ProjectController.get(
  "/project/:projectId",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const projectId: string = request.params?.projectId || "";
      const data: Array<IProjectDetail> = await getProjectDataByProjectId(
        projectId
      );
      response.send(data);
    } catch (err) {
      response.send(err).sendStatus(500);
    }
  }
);

ProjectController.get(
  "/allProjects/:emailId/:orgId",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const emailId: string = request.params?.emailId || "";
      const orgId: string = request.params?.orgId || "";
      const data: Array<IProjectDetail> = await getProjectsByEmailId(
        emailId, orgId
      );
      response.send(data);
    } catch (err) {
      response.send(err).sendStatus(500);
    }
  }
);

ProjectController.get(
    "/projects/:orgId",
    async (request: Request, response: Response, next: NextFunction) => {
      try {
        const orgId: string = request.params?.orgId || "";
        const data: Array<IProjectDetail> = await getProjectsByOrganizationId(
            orgId
        );
        response.send(data);
      } catch (err) {
        response.send(err).sendStatus(500);
      }
    }
  );
ProjectController.post(
  "/project",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const projectData: IProjectDetail = request.body;
      const envType:any = request.headers?.envtype;
      const data = await insertProjectData(projectData, "testUser", socket, envType);
      response.send(data);
    } catch (err) {
      response.send(err).sendStatus(500);
    }
  }
);
ProjectController.delete(
    "/project/:projId/:orgId",
    async (request: Request, response: Response, next: NextFunction) => {
      try {
        const projId: string = request.params?.projId || "";
        const orgId:string = request.params?.orgId || "";
        const envType:any = request.headers?.envtype;
        const data = await deleteProjectByProjectIdAndOrgId(projId,orgId, socket,envType);
        response.send(data);
      } catch (err) {
        response.send(err).sendStatus(500);
      }
    }
  );
