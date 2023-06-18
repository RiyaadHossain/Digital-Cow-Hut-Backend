import httpStatus from "http-status";
import paginationHelper from "../../../helpers/paginationHelper";
import { APIError } from "../../../interface/APIError";
import { IPagination } from "../../../interface/Pagination";
import { IAllDataReturnType } from "../../../interface/common";
import { cowSearchFields } from "./cow.constant";
import { ICow, ICowSearchFilter } from "./cow.interface";
import Cow from "./cow.model";
import { isCowFound, isSeller } from "./cow.utils";

const createCow = async (payload: ICow): Promise<ICow | null> => {
  if (!(await isSeller(payload.seller))) {
    throw new APIError(httpStatus.BAD_REQUEST, "Seller account is incorrect!");
  }
  const data = (await Cow.create(payload)).populate("seller");
  return data;
};

const getAllCows = async (
  paginationOptions: IPagination,
  searchFilterFields: ICowSearchFilter
): Promise<IAllDataReturnType<ICow[]> | null> => {
  // Pagination
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper(paginationOptions);

  // Sort Condition
  const sortCondition = { [sortBy]: sortOrder };

  const { searchTerm, minPrice, maxPrice, ...filterdata } = searchFilterFields;
  const andCondition = [];

  // Search Condition
  if (searchTerm) {
    andCondition.push({
      $or: cowSearchFields.map((field) => ({
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

  if (minPrice) {
    andCondition.push({ price: { $gte: minPrice } });
  }

  if (maxPrice) {
    andCondition.push({ price: { $lte: maxPrice } });
  }

  const whereCondition = andCondition.length ? { $and: andCondition } : {};

  const data = await Cow.find(whereCondition)
    .populate("seller")
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await Cow.countDocuments();
  const meta = { page, limit, total };
  return { meta, data };
};

const getCow = async (id: string): Promise<ICow | null> => {
  if (!(await isCowFound(id))) {
    throw new APIError(400, "Cow not Found!");
  }

  const data = await Cow.findById(id).populate("seller");
  return data;
};

const updateCow = async (_id: string, payload: ICow): Promise<ICow | null> => {
  if (!(await isCowFound(_id))) {
    throw new APIError(400, "Cow not Found!");
  }

  if (payload.seller && !(await isSeller(payload.seller))) {
    throw new APIError(httpStatus.BAD_REQUEST, "Seller account is incorrect!");
  }

  const data = await Cow.findOneAndUpdate({ _id }, payload, {
    new: true,
    runValidators: true,
  }).populate("seller");

  return data;
};

const deleteCow = async (id: string): Promise<ICow | null> => {
  if (!(await isCowFound(id))) {
    throw new APIError(400, "Cow not Found!");
  }

  const data = await Cow.findByIdAndDelete(id).populate("seller");
  return data;
};

export const CowService = {
  createCow,
  getAllCows,
  getCow,
  updateCow,
  deleteCow,
};
