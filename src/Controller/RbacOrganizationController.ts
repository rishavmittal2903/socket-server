import { Router, Request, Response, NextFunction } from "express";
import { IOrganization } from "../Interfaces/IOrganization";
import { deleteAccessPolicylagsByOrgId } from "../Provider/DbProvider";
import {
  getOrganizationAccessPolicyByOrgId,
  updateOrganizationAccessDataByOrgId,
} from "../Provider/OrganizationRbacProvider";

export const RbacOrganizationController = Router();

RbacOrganizationController.get(
  "/organizationRoles/:organizationId",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const organizationId: string = request.params?.organizationId || "";
      const data: Array<any> = await getOrganizationAccessPolicyByOrgId(
        organizationId
      );
      response.send(data);
    } catch (err) {
      response.send(err).sendStatus(500);
    }
  }
);
RbacOrganizationController.put(
  "/organizationRoles/:orgId",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const organizationData: IOrganization = request.body;
      const orgId: string = request.params.orgId;
      const data = await updateOrganizationAccessDataByOrgId(
        orgId,
        organizationData,
        "testUser"
      );
      response.send(data);
    } catch (err) {
      response.send(err).sendStatus(500);
    }
  }
);
RbacOrganizationController.post(
  "/organizationRoles",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const organizationData: IOrganization = request.body;
      const data = await updateOrganizationAccessDataByOrgId(
        organizationData.organizationId,
        organizationData,
        "testUser"
      );
      response.send(data);
    } catch (err) {
      response.send(err).sendStatus(500);
    }
  }
);
RbacOrganizationController.delete(
  "/organizationRoles/:orgId",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const organizationId: string = request.params?.organizationId || "";
      const data = await deleteAccessPolicylagsByOrgId(organizationId);
      response.send(data);
    } catch (err) {
      response.send(err).sendStatus(500);
    }
  }
);
