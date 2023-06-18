import { Model, Types } from "mongoose";

export type IOrder = {
  cow: Types.ObjectId;
  buyer: Types.ObjectId;
};

export type OrderModel = Model<IOrder, Record<string, unknown>>;