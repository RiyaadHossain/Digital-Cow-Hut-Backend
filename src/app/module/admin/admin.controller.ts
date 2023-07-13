import { RequestHandler } from "express";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import httpStatus from "http-status";
import { AdminService } from "./admin.services";
import config from "../../../config";

const createAdmin: RequestHandler = catchAsync(async (req, res) => {
  const adminData = req.body;
  const result = await AdminService.createAdmin(adminData);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Admin account created Successfully!",
    data: result,
  });
});

const login: RequestHandler = catchAsync(async (req, res) => {
  const adminCredential = req.body;
  const result = await AdminService.login(adminCredential);
  const { refreshToken, ...response } = result;

  // Set Cookie
  const cookieOptions = {
    secure: config.NODE_ENV === "production",
    httpOnly: true,
  };
  res.cookie("refreshToken", refreshToken, cookieOptions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin logged in Successfully!",
    data: response,
  });
});


export const AdminController = { createAdmin, login };
