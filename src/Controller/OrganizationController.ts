import { Router, Request, Response, NextFunction } from "express";
import { IOrganization } from "../Interfaces/IOrganization";
import {
    deleteOrganizationByOrgId,
  getOrganizationDataByOrgId,
  insertOrganizationData,
} from "../Provider/OrganizationProvider";

export const OrganizationController = Router();

OrganizationController.get(
  "/organization/:organizationId",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const organizationId: string = request.params?.organizationId || "";
      const data: Array<IOrganization> = await getOrganizationDataByOrgId(
        organizationId
      );
      response.send(data);
    } catch (err) {
      response.send(err).sendStatus(500);
    }
  }
);
OrganizationController.post(
  "/organization",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const organizationData: IOrganization = request.body;
      const data = await insertOrganizationData(organizationData, "testUser");
      response.send(data);
    } catch (err) {
      response.send(err).sendStatus(500);
    }
  }
);
OrganizationController.delete(
    "/organization/:orgId",
    async (request: Request, response: Response, next: NextFunction) => {
      try {
        const organizationId: string = request.params?.orgId || "";
        const data = await deleteOrganizationByOrgId(organizationId);
        response.send(data);
      } catch (err) {
        response.send(err).sendStatus(500);
      }
    }
  );
