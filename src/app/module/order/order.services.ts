import httpStatus from "http-status";
import paginationHelper from "../../../helpers/paginationHelper";
import { APIError } from "../../../interface/APIError";
import { IPagination } from "../../../interface/Pagination";
import { IAllDataReturnType } from "../../../interface/common";
import { IOrder } from "./order.interface";
import Order from "./order.model";
import { isOrderFound } from "./order.utils";
import mongoose, { ObjectId } from "mongoose";
import Cow from "../cow/cow.model";
import User from "../user/user.model";
import { USER_ENUM } from "../../../enum/common";
import { IUser } from "../user/user.interface";

const createOrder = async (payload: IOrder): Promise<IOrder | null> => {
  const cowId = payload.cow;
  const buyerId = payload.buyer;

  const cow = await Cow.findById(cowId).populate("seller");

  const buyer = await User.findOne({
    _id: buyerId,
    role: USER_ENUM.BUYER,
  });

  if (!cow) throw new APIError(httpStatus.BAD_REQUEST, "Cow not Found!");
  if (!buyer) {
    throw new APIError(httpStatus.BAD_REQUEST, "Buyer account is incorrect!");
  }

  const cowPrice = cow.price;
  let buyerBudget = buyer.budget || 0;

  if (cowPrice > buyerBudget)
    throw new APIError(
      httpStatus.BAD_REQUEST,
      "Buyer don't have enough budget to buy this cow!"
    );

  let orderData;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // 1. Create the Order
    const data = await Order.create([payload], { session });
    orderData = data[0];

    // 2. Decrease Buyer Budget
    buyerBudget = buyerBudget - cowPrice;
    console.log(buyerBudget);
    await User.findOneAndUpdate(
      { _id: buyer, role: USER_ENUM.BUYER },
      { budget: buyerBudget }
    );

    // 3. Increase Seller Incode
    const sellerId = cow?.seller?._id;
    await User.findByIdAndUpdate(
      { _id: sellerId, role: USER_ENUM.SELLER },
      { $inc: { income: cowPrice } }
    );

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    console.log(error);
    await session.abortTransaction();
    await session.endSession();
    throw new Error("Failed to make Order!");
  }

  if (orderData) {
    orderData = await Order.findById(orderData._id).populate("cow buyer");
  }

  return orderData;
};

const getAllOrders = async (
  paginationOptions: IPagination
): Promise<IAllDataReturnType<IOrder[]> | null> => {
  // Pagination
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper(paginationOptions);

  // Sort Condition
  const sortCondition = { [sortBy]: sortOrder };

  const data = await Order.find()
    .populate("cow buyer")
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await Order.countDocuments();
  const meta = { page, limit, total };
  return { meta, data };
};

const getOrder = async (id: string): Promise<IOrder | null> => {
  if (!(await isOrderFound(id))) {
    throw new APIError(400, "Order not Found!");
  }

  const data = await Order.findById(id).populate("cow buyer");
  return data;
};

export const OrderService = {
  createOrder,
  getAllOrders,
  getOrder,
};
