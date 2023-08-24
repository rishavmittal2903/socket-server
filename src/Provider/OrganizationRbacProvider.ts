import { IOrganization } from "../Interfaces/IOrganization";
import { dbClient } from "../server";

export const deleteOrganizationAccessByOrgId = async (
  organizationId: string
) => {
  const orgData = await dbClient
    .collection<IOrganization>("organizationData")
    .updateOne(
      { organizationId },
      { $set: { contributors: [], owners: [] } },
      { upsert: true }
    );
  return { orgData };
};

export const updateOrganizationAccessDataByOrgId = async (
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
    .updateOne({ organizationId }, { $set: orgData });
  return data;
};

export const getOrganizationAccessPolicyByOrgId = async (
  organizationId: string
) => {
  const data = await dbClient
    .collection<IOrganization>("organizationData")
    .find({ organizationId })
    .toArray();
  return data.map((org: IOrganization) => ({
    owners: org.owners,
    contributors: org.contributors,
  }));
};
