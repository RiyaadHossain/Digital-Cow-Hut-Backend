import { RequestHandler } from "express-serve-static-core";
import catchAsync from "../../../utils/catchAsync";
import { UserService } from "./user.services";
import { IUser } from "./user.interface";
import sendResponse from "../../../utils/sendResponse";
import httpStatus from "http-status";
import pick from "../../../utils/pick";
import { paginationFields } from "../../../constant/paginationFields";
import { userSearchFilterOptions } from "./user.constant";

const getAllUsers: RequestHandler = catchAsync(async (req, res) => {
  const paginationOptions = pick(req.query, paginationFields);
  const searchFilterFields = pick(req.query, userSearchFilterOptions);
  const result = await UserService.getAllUsers(
    paginationOptions,
    searchFilterFields
  );

  sendResponse<IUser[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users data Retrived Successfully!",
    meta: result?.meta,
    data: result?.data,
  });
});

const getUser: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await UserService.getAllUser(id);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User data Retrived Successfully!",
    data: result,
  });
});

const myProfile: RequestHandler = catchAsync(async (req, res) => {
  const id = req?.user?._id;
  const result = await UserService.myProfile(id);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User's information retrieved successfully!",
    data: result,
  });
});

const updateProfile: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const userData = req.body;
  const result = await UserService.updateProfile(id, userData);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User profile data Updated Successfully!",
    data: result,
  });
});

const updateUser: RequestHandler = catchAsync(async (req, res) => {
  const id = req?.user?._id;
  const userData = req.body;
  const result = await UserService.updateProfile(id, userData);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User data Updated Successfully!",
    data: result,
  });
});

const deleteUser: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await UserService.deleteUser(id);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User data Deleted Successfully!",
    data: result,
  });
});

export const UserController = {
  getAllUsers,
  getUser,
  myProfile,
  updateProfile,
  updateUser,
  deleteUser,
};
