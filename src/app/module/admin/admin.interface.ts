import { Model } from "mongoose";

type Name = {
  firstName: string;
  lastName: string;
};

export type IAdmin = {
  _id: string;
  name: Name;
  phoneNumber: string;
  role: "admin";
  password: string;
  address: string;
};

export interface AdminModel extends Model<IAdmin> {
  isAdminExist(phoneNumber: string): Pick<IAdmin, "_id" | "password" | "role">;
  isPassMatched(givenPass: string, savedPass: string): boolean;
}

