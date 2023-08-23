export interface IUserDefinedFlags {
    organizationId: string;
    projectId: string;
    clientId: string;
    envType: string;
    flagData: Array<IFlagData>;
    createdBy: string;
    createdOn: string;
    updatedBy: string;
    updatedOn: string;
  }
  
  export interface IFlagData {
    envType: string;
    flagName: string;
    isFlagEnabled: string;
    clientId: string;
  }
  