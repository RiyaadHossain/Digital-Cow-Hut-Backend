import { Model } from "mongoose";

type Name = {
  firstName: string;
  lastName: string;
};

type Role = "seller" | "buyer";

export type IUser = {
  name: Name;
  role: Role;
  password: string;
  phoneNumber: string;
  address: string;
  budget?: number;
  income?: number;
};

export type UserModel = Model<IUser, Record<string, unknown>>;
