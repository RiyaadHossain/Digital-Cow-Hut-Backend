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
exports.AdminService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const APIError_1 = require("../../../interface/APIError");
const admin_model_1 = __importDefault(require("./admin.model"));
const jwtHelper_1 = require("../../../helpers/jwtHelper");
const config_1 = __importDefault(require("../../../config"));
const createAdmin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield admin_model_1.default.create(payload);
    return data;
});
const login = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { phoneNumber, password } = payload;
    // Check Admin Existence
    const adminExist = yield admin_model_1.default.isAdminExist(phoneNumber);
    if (!adminExist) {
        throw new APIError_1.APIError(http_status_1.default.BAD_REQUEST, "Admin account doesn't exist!");
    }
    const { _id, role } = adminExist;
    // Check Admin Password
    const isPassMatched = yield admin_model_1.default.isPassMatched(password, adminExist.password);
    if (!isPassMatched) {
        throw new APIError_1.APIError(http_status_1.default.BAD_REQUEST, "Password is incorrect!");
    }
    // Access Token
    const accessToken = jwtHelper_1.jwtHelper.generateToken({ _id, role }, config_1.default.JWT_SECRET, config_1.default.JWT_SECRET_EXPIRE);
    // Refresh Token
    const refreshToken = jwtHelper_1.jwtHelper.generateToken({ _id, role }, config_1.default.JWT_REFRESH, config_1.default.JWT_REFRESH_EXPIRE);
    return { accessToken, refreshToken };
});
exports.AdminService = { createAdmin, login };
