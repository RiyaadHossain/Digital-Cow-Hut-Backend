import { Document, Model, ObjectId } from "mongoose";

type Name = {
  firstName: string;
  lastName: string;
};

type Role = "seller" | "buyer";

export interface IUser extends Document {
  _id: ObjectId
  name: Name;
  role: Role;
  password: string;
  phoneNumber: string;
  address: string;
  budget?: number;
  income?: number;
}

export type UserModel = Model<IUser, Record<string, unknown>>;

export type IUserSearchFilter = {
  searchTerm?: string;
  firstName?: string;
  lastName?: string;
  role?: Role;
  address?: string;
};
