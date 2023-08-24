import { IProjectDetail } from "../Interfaces/IProjectDetail";
import { dbClient } from "../server";

export const insertProjectData = async (
  flagData: IProjectDetail,
  userName: string
) => {
  const isDataExists = await getProjectDataByProjectId(flagData.projectId);
  if (isDataExists.length) {
    return await updateProjectDataByProjectId(
      flagData.projectId,
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
    .collection<IProjectDetail>("projectDetail")
    .insertOne(flagData);
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

export const deleteProjectByProjectIdAndOrgId = async (
    projectId: string,
    organizationId: string
  ) => {
    const data = await dbClient
      .collection<IProjectDetail>("projectDetail")
      .deleteMany({ organizationId, projectId })
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
