import { IFlagData } from "./IUserDefinedFlags";

export interface IProjectDetail {
  organizationId: string;
  projectId: string;
  projectName: string;
  environments: Array<IEnvironmentType>;
  owners: Array<IRole>;
  contributors: Array<IRole>;
  createdBy: string;
  createdOn: string;
  updatedBy: string;
  updatedOn: string;
}

export interface IEnvironmentType {
  envType: string;
  envId: string;
  flagData: Array<IFlagData>;
}
export interface IRole {
  email: string;
  name: string;
}
