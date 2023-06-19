import { Schema } from "mongoose";
import { USER_ENUM } from "../../../enum/common";
import User from "../user/user.model";
import Order from "./order.model";
import Cow from "../cow/cow.model";

export const isOrderFound = async (id: string): Promise<boolean> => {
  const order = await Order.findById(id);
  return !!order;
};

export const isCowFound = async (
  id: Schema.Types.ObjectId
): Promise<boolean> => {
  const cow = await Cow.findById(id);
  return !!cow;
};

export const isBuyer = async (_id: Schema.Types.ObjectId) => {
  const buyer = await User.findOne({ _id, role: USER_ENUM.BUYER });
  return !!buyer;
};
