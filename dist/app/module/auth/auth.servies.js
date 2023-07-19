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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const APIError_1 = require("../../../interface/APIError");
const user_model_1 = __importDefault(require("../user/user.model"));
const jwtHelper_1 = require("../../../helpers/jwtHelper");
const config_1 = __importDefault(require("../../../config"));
const common_1 = require("../../../enum/common");
const signup = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { role, budget } = payload;
    // Business Logic: Buyer -> budgaet < 20k
    if (role == common_1.USER_ENUM.BUYER) {
        if (!budget)
            throw new APIError_1.APIError(400, "Budget is Required!");
        if (budget < 20000) {
            throw new APIError_1.APIError(400, "Budget should be at least more than 20000!");
        }
    }
    // Business Logic: Seller -> income
    if (role == common_1.USER_ENUM.SELLER)
        payload.income = 0;
    const data = yield user_model_1.default.create(payload);
    return data;
});
const login = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { phoneNumber, password } = payload;
    // Check User Existence
    const userExist = yield user_model_1.default.isUserExist(phoneNumber);
    if (!userExist) {
        throw new APIError_1.APIError(http_status_1.default.BAD_REQUEST, "User account doesn't exist!");
    }
    const { _id, role } = userExist;
    // Check User Password
    const isPassMatched = yield user_model_1.default.isPassMatched(password, userExist.password);
    if (!isPassMatched) {
        throw new APIError_1.APIError(http_status_1.default.BAD_REQUEST, "Password is incorrect!");
    }
    // Access Token
    const accessToken = jwtHelper_1.jwtHelper.generateToken({ _id, role }, config_1.default.JWT_SECRET, config_1.default.JWT_SECRET_EXPIRE);
    // Refresh Token
    const refreshToken = jwtHelper_1.jwtHelper.generateToken({ _id, role }, config_1.default.JWT_REFRESH, config_1.default.JWT_REFRESH_EXPIRE);
    return { accessToken, refreshToken };
});
const refreshToken = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    // Refresh Token Verification
    const decoded = jwtHelper_1.jwtHelper.verifyToken(refreshToken, config_1.default.JWT_REFRESH);
    const { _id, role } = decoded;
    // Check User Existence
    const userExist = yield user_model_1.default.findById(_id);
    if (!userExist) {
        throw new APIError_1.APIError(http_status_1.default.BAD_REQUEST, "User account doesn't exist!");
    }
    // Access Token
    const accessToken = jwtHelper_1.jwtHelper.generateToken({ _id, role }, config_1.default.JWT_SECRET, config_1.default.JWT_SECRET_EXPIRE);
    return { accessToken, refreshToken };
});
exports.AuthService = { signup, login, refreshToken };
