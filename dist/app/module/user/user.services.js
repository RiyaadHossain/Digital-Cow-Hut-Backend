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
exports.UserService = void 0;
const paginationHelper_1 = __importDefault(require("../../../helpers/paginationHelper"));
const APIError_1 = require("../../../interface/APIError");
const user_constant_1 = require("./user.constant");
const user_model_1 = __importDefault(require("./user.model"));
const user_utils_1 = __importDefault(require("./user.utils"));
const getAllUsers = (paginationOptions, searchFilterFields) => __awaiter(void 0, void 0, void 0, function* () {
    // Pagination
    const { page, limit, skip, sortBy, sortOrder } = (0, paginationHelper_1.default)(paginationOptions);
    // Sort Condition
    const sortCondition = { [sortBy]: sortOrder };
    const { searchTerm } = searchFilterFields, filterdata = __rest(searchFilterFields, ["searchTerm"]);
    const andCondition = [];
    // Search Condition
    if (searchTerm) {
        andCondition.push({
            $or: user_constant_1.userSearchFields.map((field) => ({
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
    const data = yield user_model_1.default.find(whereCondition)
        .sort(sortCondition)
        .skip(skip)
        .limit(limit);
    const total = yield user_model_1.default.countDocuments();
    const meta = { page, limit, total };
    return { meta, data };
});
const getAllUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield user_model_1.default.findById(id);
    return data;
});
const myProfile = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield (0, user_utils_1.default)(id))) {
        throw new APIError_1.APIError(400, "User not Found!");
    }
    const data = yield user_model_1.default.findById(id);
    return data;
});
const updateProfile = (_id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield (0, user_utils_1.default)(_id))) {
        throw new APIError_1.APIError(400, "User not Found!");
    }
    let { name } = payload, userData = __rest(payload, ["name"]);
    if (name && Object.keys(name).length) {
        Object.keys(name).map((field) => {
            const nameKey = `name.${field}`;
            userData[nameKey] = name[field];
        });
    }
    const data = yield user_model_1.default.findOneAndUpdate({ _id }, userData, {
        new: true,
        runValidators: true,
    });
    return data;
});
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield (0, user_utils_1.default)(id))) {
        throw new APIError_1.APIError(400, "User not Found!");
    }
    const data = yield user_model_1.default.findByIdAndDelete(id);
    return data;
});
exports.UserService = {
    getAllUsers,
    getAllUser,
    myProfile,
    updateProfile,
    deleteUser,
};
