import { Document, Model, ObjectId } from "mongoose";

type Name = {
  firstName: string;
  lastName: string;
};

type Role = "seller" | "buyer";

export interface IUser extends Document {
  _id: string
  name: Name;
  role: Role;
  password: string;
  phoneNumber: string;
  address: string;
  budget?: number;
  income?: number;
}

export interface UserModel extends Model<IUser> {
  isUserExist(phoneNumber: string): Pick<IUser, "_id" | "password" | "role">;
  isPassMatched(givenPass: string, savedPass: string): boolean;
}

export type IUserSearchFilter = {
  searchTerm?: string;
  firstName?: string;
  lastName?: string;
  role?: Role;
  address?: string;
};
