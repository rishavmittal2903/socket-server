import { IOrganization } from "../Interfaces/IOrganization";
import { dbClient } from "../server";
import { deleteProjectByOrgId } from "./ProjectDataProvider";

export const insertOrganizationData = async (
  organizationData: IOrganization,
  userName: string
) => {
  const isDataExists = await getOrganizationDataByOrgId(
    organizationData.organizationId
  );
  if (isDataExists.length) {
    return await updateOrganizationDataByOrgId(
      organizationData.organizationId,
      organizationData,
      userName
    );
  }
  organizationData = {
    ...organizationData,
    createdBy: userName,
    createdOn: new Date().toLocaleString(),
  };
  const data = await dbClient
    .collection("organizationData")
    .insertOne(organizationData);
  return data;
};

export const getOrganizationDataByOrgId = async (organizationId: string) => {
  const data = await dbClient
    .collection<IOrganization>("organizationData")
    .find({ organizationId })
    .toArray();
  return data;
};

export const getOrganizationByEmailId = async (emailId: string) => {
  const data = await dbClient
    .collection<IOrganization>("organizationData")
    .find({ $or: [ { "owners.email": emailId }, { "contributors.email": emailId } ] })
    .toArray();
  return data;
};

export const deleteOrganizationByOrgId = async (
  organizationId: string,
  socket
) => {
  const orgData = await dbClient
    .collection<IOrganization>("organizationData")
    .deleteMany({ organizationId });
  const projectData = await deleteProjectByOrgId(organizationId);
  socket.emit("setFlagData", organizationId, []);
  return { orgData, projectData };
};

export const updateOrganizationDataByOrgId = async (
  organizationId: string,
  orgData: IOrganization,
  userName: string
) => {
  orgData = {
    ...orgData,
    updatedBy: userName,
    updatedOn: new Date().toLocaleString(),
  };
  const data = await dbClient
    .collection<IOrganization>("organizationData")
    .updateOne({ organizationId }, { $set: { ...orgData } });
  return data;
};

export const getProjectsByOrganizationId = async (organizationId: string) => {
  const data = await dbClient
    .collection<IOrganization>("organizationData")
    .find({ organizationId })
    .toArray();
  return data;
};
