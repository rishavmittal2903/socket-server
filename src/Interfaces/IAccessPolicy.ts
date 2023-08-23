export interface IAccessPolicy {
    organizationId: string;
    projectId: string;
    owners: Array<IRole>;
    contributors: Array<IRole>;
  }
  
  export interface IRole {
    email: string;
    name: string;
  }
  