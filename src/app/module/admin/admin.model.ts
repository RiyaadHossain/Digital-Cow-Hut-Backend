import { Schema, model } from "mongoose";
import { AdminModel, IAdmin } from "./admin.interface";
import { adminRole } from "./admin.constant";
import bcrypt from "bcrypt";
import config from "../../../config";

const adminSchema = new Schema<IAdmin>({
  name: {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
  },
  password: { type: String, required: true, /* select: 0 */ },
  role: { type: String, enum: adminRole, default: "admin" },
  phoneNumber: { type: String, unique: true, required: true, trim: true },
  address: { type: String, required: true, trim: true },
});

// Hash Password
adminSchema.pre("save", async function () {
  const admin = this;
  admin.password = await bcrypt.hash(
    admin.password,
    Number(config.BCRYPT_SALT_ROUNDS)
  );
});

// Method: Check Admin Existence
adminSchema.statics.isAdminExist = async function (phoneNumber) {
  const adminExist = await Admin.findOne({ phoneNumber });
  return adminExist;
};

// Method: Check Admin Password
adminSchema.statics.isPassMatched = async function (givenPass, savedPass) {
  const passMatched = await bcrypt.compare(givenPass, savedPass);
  return passMatched;
};

const Admin = model<IAdmin, AdminModel>("Admin", adminSchema);
export default Admin;
