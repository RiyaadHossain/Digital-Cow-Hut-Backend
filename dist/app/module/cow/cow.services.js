"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CowService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const paginationHelper_1 = __importDefault(require("../../../helpers/paginationHelper"));
const APIError_1 = require("../../../interface/APIError");
const cow_constant_1 = require("./cow.constant");
const cow_model_1 = __importDefault(require("./cow.model"));
const cow_utils_1 = require("./cow.utils");
const createCow = (payload, seller) => __awaiter(void 0, void 0, void 0, function* () {
    payload.seller = seller === null || seller === void 0 ? void 0 : seller._id;
    const data = (yield cow_model_1.default.create(payload)).populate("seller");
    return data;
});
const getAllCows = (paginationOptions, searchFilterFields) => __awaiter(void 0, void 0, void 0, function* () {
    // Pagination
    const { page, limit, skip, sortBy, sortOrder } = (0, paginationHelper_1.default)(paginationOptions);
    // Sort Condition
    const sortCondition = { [sortBy]: sortOrder };
    const { searchTerm, minPrice, maxPrice } = searchFilterFields, filterdata = __rest(searchFilterFields, ["searchTerm", "minPrice", "maxPrice"]);
    const andCondition = [];
    // Search Condition
    if (searchTerm) {
        andCondition.push({
            $or: cow_constant_1.cowSearchFields.map((field) => ({
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
    const data = yield cow_model_1.default.find(whereCondition)
        .populate("seller")
        .sort(sortCondition)
        .skip(skip)
        .limit(limit);
    const total = yield cow_model_1.default.countDocuments();
    const meta = { page, limit, total };
    return { meta, data };
});
const getCow = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield (0, cow_utils_1.isCowFound)(id))) {
        throw new APIError_1.APIError(400, "Cow not Found!");
    }
    const data = yield cow_model_1.default.findById(id).populate("seller");
    return data;
});
const updateCow = (_id, payload, seller) => __awaiter(void 0, void 0, void 0, function* () {
    // Check Cow Existence
    const cow = yield cow_model_1.default.findById(_id).lean();
    if (!cow) {
        throw new APIError_1.APIError(400, "Cow not Found!");
    }
    // Check Seller Account
    if (seller && cow.seller.toString() !== seller._id.toString()) {
        throw new APIError_1.APIError(http_status_1.default.BAD_REQUEST, "Seller account is incorrect!");
    }
    const data = yield cow_model_1.default.findOneAndUpdate({ _id }, payload, {
        new: true,
        runValidators: true,
    }).populate("seller");
    return data;
});
const deleteCow = (id, seller) => __awaiter(void 0, void 0, void 0, function* () {
    // Check Cow Existence
    const cow = yield cow_model_1.default.findById(id).lean();
    if (!cow) {
        throw new APIError_1.APIError(400, "Cow not Found!");
    }
    // Check Seller Account
    if (seller && cow.seller.toString() !== seller._id.toString()) {
        throw new APIError_1.APIError(http_status_1.default.BAD_REQUEST, "Seller account is incorrect!");
    }
    const data = yield cow_model_1.default.findByIdAndDelete(id).populate("seller");
    return data;
});
exports.CowService = {
    createCow,
    getAllCows,
    getCow,
    updateCow,
    deleteCow,
};
