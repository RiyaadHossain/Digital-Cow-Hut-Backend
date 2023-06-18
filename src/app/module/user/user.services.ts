import { USER_ENUM } from "../../../enum/common";
import paginationHelper from "../../../helpers/paginationHelper";
import { APIError } from "../../../interface/APIError";
import { IPagination } from "../../../interface/Pagination";
import { IAllDataReturnType } from "../../../interface/common";
import { userSearchFields } from "./user.constant";
import { IUser, IUserSearchFilter } from "./user.interface";
import User from "./user.model";
import isUserFound from "./user.utils";

const signup = async (payload: IUser): Promise<IUser | null> => {
  // Business Logic: Buyer -> budgaet < 20k
  if (payload.role == USER_ENUM.BUYER) {
    if (!payload.budget) throw new APIError(400, "Budget is Required!");
    if (payload.budget < 20000) {
      throw new APIError(400, "Budget should be at least more than 20000!");
    }
  }

  // Business Logic: Seller -> income
  if (payload.role == USER_ENUM.SELLER) payload.income = 0;

  const data = await User.create(payload);
  return data;
};

const getAllUsers = async (
  paginationOptions: IPagination,
  searchFilterFields: IUserSearchFilter
): Promise<IAllDataReturnType<IUser[]> | null> => {
  // Pagination
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper(paginationOptions);

  // Sort Condition
  const sortCondition = { [sortBy]: sortOrder };

  const { searchTerm, ...filterdata } = searchFilterFields;
  const andCondition = [];

  // Search Condition
  if (searchTerm) {
    andCondition.push({
      $or: userSearchFields.map((field) => ({
        [field]: { $regex: searchTerm, $options: "i" },
      })),
    });
  }

  // Filter Fields
  if (Object.keys(filterdata).length) {
    andCondition.push({
      $and: Object.entries(filterdata).map(([field, value]) => ({
        [field]: [value],
      })),
    });
  }

  const whereCondition = andCondition.length ? { $and: andCondition } : {};

  const data = await User.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await User.countDocuments();
  const meta = { page, limit, total };
  return { meta, data };
};

const getUser = async (id: string): Promise<IUser | null> => {
  if (!(await isUserFound(id))) {
    throw new APIError(400, "User not Found!");
  }

  const data = await User.findById(id);
  return data;
};

const updateUser = async (
  _id: string,
  payload: IUser
): Promise<IUser | null> => {
  if (!(await isUserFound(_id))) {
    throw new APIError(400, "User not Found!");
  }

  let { name, ...userData } = payload;

  if (name && Object.keys(name).length) {
    Object.keys(name).map((field) => {
      const nameKey = `name.${field}`;
      (userData as any)[nameKey] = name[field as keyof typeof name];
    });
  }

  const data = await User.findOneAndUpdate({ _id }, userData, {
    new: true,
    runValidators: true,
  });

  return data;
};

const deleteUser = async (id: string): Promise<IUser | null> => {
  if (!(await isUserFound(id))) {
    throw new APIError(400, "User not Found!");
  }

  const data = await User.findByIdAndDelete(id);
  return data;
};

export const UserService = {
  signup,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
};
