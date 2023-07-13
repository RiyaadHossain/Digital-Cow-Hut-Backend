import httpStatus from "http-status";
import { APIError } from "../../../interface/APIError";
import { IAdmin } from "./admin.interface";
import Admin from "./admin.model";
import { jwtHelper } from "../../../helpers/jwtHelper";
import config from "../../../config";
import { Secret } from "jsonwebtoken";
import { IUserCredential, LogInReturn } from "../../../interface/common";

const createAdmin = async (payload: IAdmin) => {
  const data = await Admin.create(payload);
  return data;
};

const login = async (payload: IUserCredential): Promise<LogInReturn> => {
  const { phoneNumber, password } = payload;

  // Check Admin Existence
  const adminExist = await Admin.isAdminExist(phoneNumber);
  if (!adminExist) {
    throw new APIError(httpStatus.BAD_REQUEST, "Admin account doesn't exist!");
  }

  const { _id, role } = adminExist;

  // Check Admin Password
  const isPassMatched = await Admin.isPassMatched(
    password,
    adminExist.password
  );
  if (!isPassMatched) {
    throw new APIError(httpStatus.BAD_REQUEST, "Password is incorrect!");
  }

  // Access Token
  const accessToken = jwtHelper.generateToken(
    { _id, role },
    config.JWT_SECRET as Secret,
    config.JWT_SECRET_EXPIRE as string
  );

  // Refresh Token
  const refreshToken = jwtHelper.generateToken(
    { _id, role },
    config.JWT_REFRESH as Secret,
    config.JWT_REFRESH_EXPIRE as string
  );

  return { accessToken, refreshToken };
};

export const AdminService = { createAdmin, login };
