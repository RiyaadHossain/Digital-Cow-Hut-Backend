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
exports.isBuyer = exports.isCowFound = exports.isOrderFound = void 0;
const common_1 = require("../../../enum/common");
const user_model_1 = __importDefault(require("../user/user.model"));
const order_model_1 = __importDefault(require("./order.model"));
const cow_model_1 = __importDefault(require("../cow/cow.model"));
const isOrderFound = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield order_model_1.default.findById(id);
    return !!order;
});
exports.isOrderFound = isOrderFound;
const isCowFound = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const cow = yield cow_model_1.default.findById(id);
    return !!cow;
});
exports.isCowFound = isCowFound;
const isBuyer = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const buyer = yield user_model_1.default.findOne({ _id, role: common_1.USER_ENUM.BUYER });
    return !!buyer;
});
exports.isBuyer = isBuyer;
