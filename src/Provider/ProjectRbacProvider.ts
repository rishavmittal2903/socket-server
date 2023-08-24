import { IProjectDetail } from "../Interfaces/IProjectDetail";
import { dbClient } from "../server";

export const deleteProjectAccessByProjectId = async (
  projectId: string
) => {
  const orgData = await dbClient
    .collection<IProjectDetail>("projectDetail")
    .updateOne(
      { projectId },
      { $set: { contributors: [], owners: [] } },
      { upsert: true }
    );
  return { orgData };
};

export const updateProjectAccessDataByProjectId = async (
  projectId: string,
  projData: IProjectDetail,
  userName: string
) => {
    projData = {
    ...projData,
    updatedBy: userName,
    updatedOn: new Date().toLocaleString(),
  };
  const data = await dbClient
    .collection<IProjectDetail>("projectDetail")
    .updateOne({ projectId }, { $set: projData });
  return data;
};

export const getProjectAccessPolicyByProjectId = async (
  projectId: string
) => {
  const data = await dbClient
    .collection<IProjectDetail>("projectDetail")
    .find({ projectId })
    .toArray();
  return data.map((org: IProjectDetail) => ({
    owners: org.owners,
    contributors: org.contributors,
  }));
};
