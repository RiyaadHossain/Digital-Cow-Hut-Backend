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
exports.CowController = void 0;
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const cow_services_1 = require("./cow.services");
const sendResponse_1 = __importDefault(require("../../../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const pick_1 = __importDefault(require("../../../utils/pick"));
const paginationFields_1 = require("../../../constant/paginationFields");
const cow_constant_1 = require("./cow.constant");
const createCow = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const cowData = req.body;
    const seller = req.user;
    const result = yield cow_services_1.CowService.createCow(cowData, seller);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Cow data created Successfully!",
        data: result,
    });
}));
const getAllCows = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const paginationOptions = (0, pick_1.default)(req.query, paginationFields_1.paginationFields);
    const searchFilterFields = (0, pick_1.default)(req.query, cow_constant_1.cowSearchFilterOptions);
    const result = yield cow_services_1.CowService.getAllCows(paginationOptions, searchFilterFields);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Cows data Retrived Successfully!",
        meta: result === null || result === void 0 ? void 0 : result.meta,
        data: result === null || result === void 0 ? void 0 : result.data,
    });
}));
const getCow = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield cow_services_1.CowService.getCow(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Cow data Retrived Successfully!",
        data: result,
    });
}));
const updateCow = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const cowData = req.body;
    const seller = req.user;
    const result = yield cow_services_1.CowService.updateCow(id, cowData, seller);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Cow data Updated Successfully!",
        data: result,
    });
}));
const deleteCow = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const seller = req.user;
    const result = yield cow_services_1.CowService.deleteCow(id, seller);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Cow data Deleted Successfully!",
        data: result,
    });
}));
exports.CowController = {
    createCow,
    getAllCows,
    getCow,
    updateCow,
    deleteCow,
};
