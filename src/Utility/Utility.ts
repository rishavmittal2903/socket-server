import dotenv from 'dotenv'
const config = dotenv.config();
export const getEnvironmentVariableValueByKey=(keyName:string):string=>config.parsed[keyName];
export const encode=(orgId:string, projId:string, envType):string=>{
    return Buffer.from(`${orgId}:${projId}:${envType}`).toString('base64')
  }