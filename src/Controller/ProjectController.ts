import { Router, Request, Response, NextFunction } from "express";
import { IProjectDetail } from "../Interfaces/IProjectDetail";
import { deleteProjectByProjectIdAndOrgId, getProjectDataByProjectId, getProjectsByOrganizationId, insertProjectData } from "../Provider/ProjectDataProvider";

export const ProjectController = Router();

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
      const data = await insertProjectData(projectData, "testUser");
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
        const data = await deleteProjectByProjectIdAndOrgId(projId,orgId);
        response.send(data);
      } catch (err) {
        response.send(err).sendStatus(500);
      }
    }
  );
