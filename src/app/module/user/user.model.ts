import { Schema, model } from "mongoose";
import { IUser, UserModel } from "./user.interface";
import { userRole } from "./user.constant";

const userShcema = new Schema<IUser>(
  {
    name: {
      firstName: {
        type: String,
        required: true,
        trim: true,
      },
      lastName: {
        type: String,
        required: true,
        trim: true,
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      enum: userRole,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    budget: Number,
    income: Number,
  },
  { timestamps: true }
);

const User = model<IUser, UserModel>("User", userShcema);
export default User;
