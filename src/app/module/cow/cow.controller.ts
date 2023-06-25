import { RequestHandler } from "express-serve-static-core";
import catchAsync from "../../../utils/catchAsync";
import { CowService } from "./cow.services";
import { ICow } from "./cow.interface";
import sendResponse from "../../../utils/sendResponse";
import httpStatus from "http-status";
import pick from "../../../utils/pick";
import { paginationFields } from "../../../constant/paginationFields";
import { cowSearchFilterOptions } from "./cow.constant";

const createCow: RequestHandler = catchAsync(async (req, res, next) => {
  const cowData = req.body;
  const seller = req.user
  const result = await CowService.createCow(cowData, seller);

  sendResponse<ICow>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cow data created Successfully!",
    data: result,
  });
});

const getAllCows: RequestHandler = catchAsync(async (req, res, next) => {
  const paginationOptions = pick(req.query, paginationFields);
  const searchFilterFields = pick(req.query, cowSearchFilterOptions);
  const result = await CowService.getAllCows(
    paginationOptions,
    searchFilterFields
  );

  sendResponse<ICow[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cows data Retrived Successfully!",
    meta: result?.meta,
    data: result?.data,
  });
});

const getCow: RequestHandler = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const result = await CowService.getCow(id);

  sendResponse<ICow>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cow data Retrived Successfully!",
    data: result,
  });
});

const updateCow: RequestHandler = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const cowData = req.body;
  const seller = req.user;
  const result = await CowService.updateCow(id, cowData, seller);

  sendResponse<ICow>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cow data Updated Successfully!",
    data: result,
  });
});

const deleteCow: RequestHandler = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const seller = req.user;
  const result = await CowService.deleteCow(id, seller);

  sendResponse<ICow>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cow data Deleted Successfully!",
    data: result,
  });
});

export const CowController = {
  createCow,
  getAllCows,
  getCow,
  updateCow,
  deleteCow,
};
