import httpStatus from "http-status";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { AuthService } from "./auth.servies";
import config from "../../../config";

const login = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await AuthService.login(payload);
  const { refreshToken, ...response } = result;

  // Set Token
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

export const AuthController = { login };
