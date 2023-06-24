import httpStatus from "http-status";
import { APIError } from "../../../interface/APIError";
import User from "../user/user.model";
import { jwtHelper } from "../../../helpers/jwtHelper";
import { Secret } from "jsonwebtoken";
import config from "../../../config";
import { IUserCredential, LogInReturn } from "../../../interface/common";

const login = async (payload: IUserCredential): Promise<LogInReturn> => {
  const { phoneNumber, password } = payload;

  // Check User Existence
  const userExist = await User.isUserExist(phoneNumber);
  if (!userExist) {
    throw new APIError(httpStatus.BAD_REQUEST, "User account doesn't exist!");
  }

  const { _id, role } = userExist;

  // Check User Password
  const isPassMatched = await User.isPassMatched(password, userExist.password);
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

const refreshToken = async (refreshToken: string): Promise<LogInReturn> => {
  // Refresh Token Verification
  const decoded = jwtHelper.verifyToken(
    refreshToken,
    config.JWT_REFRESH as string
  );

  const { _id, role } = decoded;

  // Check User Existence
  const userExist = await User.findById(_id);
  if (!userExist) {
    throw new APIError(httpStatus.BAD_REQUEST, "User account doesn't exist!");
  }

  // Access Token
  const accessToken = jwtHelper.generateToken(
    { _id, role },
    config.JWT_SECRET as Secret,
    config.JWT_SECRET_EXPIRE as string
  );

  return { accessToken, refreshToken };
};

export const AuthService = { login, refreshToken };
