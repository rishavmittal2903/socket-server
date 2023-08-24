import { IUserDetail } from "../Interfaces/IUserDetail";
import { dbClient } from "../server";

export const getUsers = async () => {
  const data = await dbClient
    .collection<IUserDetail>("userDetail")
    .find()
    .toArray();
  return data;
};

export const getUsersByUserId = async (emailId: string) => {
  const data = await dbClient
    .collection<IUserDetail>("userDetail")
    .find({ email: emailId })
    .toArray();
  return data;
};
export const getUsersByOrgId = async (orgId: string) => {
  const data = await dbClient
    .collection<IUserDetail>("userDetail")
    .find({ organizationId: orgId })
    .toArray();
  return data;
};

export const deleteUserByUserId = async (userId: string) => {
  const data = await dbClient
    .collection<IUserDetail>("userDetail")
    .deleteMany({ email: userId });
  return data;
};

export const updateUserDataByEmailId = async (
  emailId: string,
  userData: IUserDetail
) => {
  const data = await dbClient
    .collection<IUserDetail>("userDetail")
    .updateOne({ email: emailId }, { $set: userData });
  return data;
};
export const insertUserData = async (userData: IUserDetail) => {
  const isDataExists = await getUsersByUserId(userData.email);
  if (isDataExists.length) {
    return 409;
  }

  const data = await dbClient
    .collection<IUserDetail>("userDetail")
    .insertOne(userData);
  return data;
};
