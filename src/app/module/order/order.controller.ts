import { RequestHandler } from "express-serve-static-core";
import catchAsync from "../../../utils/catchAsync";
import { OrderService } from "./order.services";
import { IOrder } from "./order.interface";
import sendResponse from "../../../utils/sendResponse";
import httpStatus from "http-status";
import pick from "../../../utils/pick";
import { paginationFields } from "../../../constant/paginationFields";

const createOrder: RequestHandler = catchAsync(async (req, res, next) => {
  const orderData = req.body;
  const result = await OrderService.createOrder(orderData);

  sendResponse<IOrder>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order data created Successfully!",
    data: result,
  });
});

const getAllOrders: RequestHandler = catchAsync(async (req, res, next) => {
  const paginationOptions = pick(req.query, paginationFields);
  const user = req.user;
  const result = await OrderService.getAllOrders(paginationOptions, user);

  sendResponse<IOrder[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Orders data Retrived Successfully!",
    meta: result?.meta,
    data: result?.data,
  });
});

const getOrder: RequestHandler = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const user = req?.user
  const result = await OrderService.getOrder(id, user);

  sendResponse<IOrder>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order data Retrived Successfully!",
    data: result,
  });
});

export const OrderController = {
  createOrder,
  getAllOrders,
  getOrder,
};
