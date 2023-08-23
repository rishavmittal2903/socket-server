import { IAccessPolicy } from "../Interfaces/IAccessPolicy";
import { IUserDefinedFlags } from "../Interfaces/IUserDefinedFlags";
import { dbClient } from "../server";

export const insertFlagData = async (
  flagData: IUserDefinedFlags,
  userName: string
) => {
  const isDataExists = await getFlagDataByClientId(flagData.clientId);
  if (isDataExists.length) {
    return await updateFlagDataByClientId(
      flagData.clientId,
      flagData,
      userName
    );
  }
  flagData = {
    ...flagData,
    createdBy: userName,
    createdOn: new Date().toLocaleString(),
  };
  const data = await dbClient
    .collection<IUserDefinedFlags>("userDefinedFlags")
    .insertOne(flagData);
  return data;
};

export const getFlagDataByClientId = async (clientId: string) => {
  const data = await dbClient
    .collection<IUserDefinedFlags>("userDefinedFlags")
    .find({ clientId })
    .toArray();
  return data;
};

export const updateFlagDataByClientId = async (
  clientId: string,
  flagData: IUserDefinedFlags,
  userName: string
) => {
  flagData = {
    ...flagData,
    updatedBy: userName,
    updatedOn: new Date().toLocaleString(),
  };
  const data = await dbClient
    .collection<IUserDefinedFlags>("userDefinedFlags")
    .updateOne({ clientId }, { $set: flagData });
  return data;
};

export const getFlagDataByOrganizationId = async (organizationId: string) => {
  const data = await dbClient
    .collection<IUserDefinedFlags>("userDefinedFlags")
    .find({ organizationId })
    .toArray();
  return data;
};
export const getFlagDataByProjectAndOrganizationId = async (
  projectId: string,
  organizationId: string
) => {
  const data = await dbClient
    .collection<IUserDefinedFlags>("userDefinedFlags")
    .find({ organizationId, projectId })
    .toArray();
  return data;
};
export const getFlagDataByProjectId = async (projectId: string) => {
  const data = await dbClient
    .collection<IUserDefinedFlags>("userDefinedFlags")
    .find({ projectId })
    .toArray();
  return data;
};
export const getAccessPolicyByOrganizationId = async (
  organizationId: string
) => {
  const data = await dbClient
    .collection<IAccessPolicy>("accessPolicy")
    .find({ organizationId })
    .toArray();
  return data;
};
export const getAccessPolicyByProjectId = async (projectId: string) => {
  const data = await dbClient
    .collection<IAccessPolicy>("accessPolicy")
    .find({ projectId })
    .toArray();
  return data;
};
