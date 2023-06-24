import httpStatus from "http-status";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { AuthService } from "./auth.servies";
import config from "../../../config";

const login = catchAsync(async (req, res) => {
  const userCredentials = req.body;
  const result = await AuthService.login(userCredentials);
  const { refreshToken, ...response } = result;

  // Set Token in Cookie
  const cookieOptions = {
    secure: config.NODE_ENV === "production",
    httpOnly: true,
  };

  res.cookie("refreshToken", refreshToken, cookieOptions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged in Successfully!",
    data: response,
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const token = req.cookies.refreshToken;
  const result = await AuthService.refreshToken(token);
  const { refreshToken, ...response } = result;

  // Set Token in Cookie
  const cookieOptions = {
    secure: config.NODE_ENV === "production",
    httpOnly: true,
  };

  res.cookie("refreshToken", refreshToken, cookieOptions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "New access token retrived Successfully!",
    data: response,
  });
});

export const AuthController = { login, refreshToken };
