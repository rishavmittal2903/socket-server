import { IEnvironmentType, IProjectDetail } from "../Interfaces/IProjectDetail";
import { dbClient } from "../server";
import { encode } from "../Utility/Utility";

export const insertProjectData = async (
  flagData: IProjectDetail,
  userName: string,
  socket,
  envType
) => {
  const isDataExists = await getProjectDataByProjectId(flagData.projectId);
  const flagResponse:IEnvironmentType= flagData.environments.find((flag:IEnvironmentType)=>flag.envType===envType);
  if (isDataExists.length) {

    const response = await updateProjectDataByProjectId(
      flagData.projectId,
      flagData,
      userName
    );
    socket.emit("setFlagData",flagResponse.envId,flagResponse.flagData)
    return response;
  }

  flagData = {
    ...flagData,
    createdBy: userName,
    createdOn: new Date().toLocaleString(),
  };
  const data = await dbClient
    .collection<IProjectDetail>("projectDetail")
    .insertOne(flagData);
  socket.emit("setFlagData",flagResponse.envId,flagResponse.flagData)
  return data;
};

export const getProjectDataByProjectId = async (projectId: string) => {
  const data = await dbClient
    .collection<IProjectDetail>("projectDetail")
    .find({ projectId })
    .toArray();
  return data;
};

export const updateProjectDataByProjectId = async (
  projectId: string,
  projectData: IProjectDetail,
  userName: string
) => {
    projectData = {
    ...projectData,
    updatedBy: userName,
    updatedOn: new Date().toLocaleString(),
  };
  const data = await dbClient
    .collection<IProjectDetail>("projectDetail")
    .updateOne({ projectId }, { $set: projectData });
  return data;
};

export const getProjectsByOrganizationId = async (organizationId: string) => {
  const data = await dbClient
    .collection<IProjectDetail>("projectDetail")
    .find({ organizationId })
    .toArray();
  return data;
};
export const getProjectDataByProjectAndOrganizationId = async (
  projectId: string,
  organizationId: string
) => {
  const data = await dbClient
    .collection<IProjectDetail>("projectDetail")
    .find({ organizationId, projectId })
    .toArray();
  return data;
};

export const getProjectsByEmailId = async (emailId: string, orgId:string) => {
  const data = await dbClient
    .collection<IProjectDetail>("projectDetail")
    .find({ $or: [ { "owners.email": emailId }, { "contributors.email": emailId } ], $and:[{organizationId:orgId}] })
    .toArray();
  return data;
};

export const deleteProjectByProjectIdAndOrgId = async (
    projectId: string,
    organizationId: string,
    socket,
    envType
  ) => {
    const data = await dbClient
      .collection<IProjectDetail>("projectDetail")
      .deleteMany({ organizationId, projectId });
      socket.emit('setFlagData',encode(organizationId,projectId,envType),[])
    return data;
  };

  export const deleteProjectByOrgId = async (
    organizationId: string
  ) => {
    const data = await dbClient
      .collection<IProjectDetail>("projectDetail")
      .deleteMany({ organizationId })
    return data;
  };
