import { Schema, model } from "mongoose";
import { IUser, UserModel } from "./user.interface";
import { userRole } from "./user.constant";
import config from "../../../config";
import bcrypt from "bcrypt";

const userSchema = new Schema<IUser>(
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
      // select: 0
    },
    role: {
      type: String,
      required: true,
      enum: userRole,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
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

// Hash Password
userSchema.pre("save", async function () {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.BCRYPT_SALT_ROUNDS)
  );
});

// Method: Check User Existence
userSchema.statics.isUserExist = async function (phoneNumber) {
  const userExist = await User.findOne({ phoneNumber });
  return userExist;
};

// Method: Check User Password
userSchema.statics.isPassMatched = async function (givenPass, savedPass) {
  const passMatched = await bcrypt.compare(givenPass, savedPass);
  return passMatched;
};

const User = model<IUser, UserModel>("User", userSchema);
export default User;
