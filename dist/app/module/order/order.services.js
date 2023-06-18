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
exports.OrderService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const paginationHelper_1 = __importDefault(require("../../../helpers/paginationHelper"));
const APIError_1 = require("../../../interface/APIError");
const order_model_1 = __importDefault(require("./order.model"));
const order_utils_1 = require("./order.utils");
const mongoose_1 = __importDefault(require("mongoose"));
const cow_model_1 = __importDefault(require("../cow/cow.model"));
const user_model_1 = __importDefault(require("../user/user.model"));
const common_1 = require("../../../enum/common");
const createOrder = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const cowId = payload.cow;
    const buyerId = payload.buyer;
    const cow = yield cow_model_1.default.findById(cowId).populate("seller");
    const buyer = yield user_model_1.default.findOne({
        _id: buyerId,
        role: common_1.USER_ENUM.BUYER,
    });
    if (!cow)
        throw new APIError_1.APIError(http_status_1.default.BAD_REQUEST, "Cow not Found!");
    if (!buyer) {
        throw new APIError_1.APIError(http_status_1.default.BAD_REQUEST, "Buyer account is incorrect!");
    }
    const cowPrice = cow.price;
    let buyerBudget = buyer.budget || 0;
    if (cowPrice > buyerBudget)
        throw new APIError_1.APIError(http_status_1.default.BAD_REQUEST, "Buyer don't have enough budget to buy this cow!");
    let orderData;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        // 1. Create the Order
        const data = yield order_model_1.default.create([payload], { session });
        orderData = data[0];
        // 2. Decrease Buyer Budget
        buyerBudget = buyerBudget - cowPrice;
        console.log(buyerBudget);
        yield user_model_1.default.findOneAndUpdate({ _id: buyer, role: common_1.USER_ENUM.BUYER }, { budget: buyerBudget });
        // 3. Increase Seller Incode
        const sellerId = (_a = cow === null || cow === void 0 ? void 0 : cow.seller) === null || _a === void 0 ? void 0 : _a._id;
        yield user_model_1.default.findByIdAndUpdate({ _id: sellerId, role: common_1.USER_ENUM.SELLER }, { $inc: { income: cowPrice } });
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        console.log(error);
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error("Failed to make Order!");
    }
    if (orderData) {
        orderData = yield order_model_1.default.findById(orderData._id).populate("cow buyer");
    }
    return orderData;
});
const getAllOrders = (paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    // Pagination
    const { page, limit, skip, sortBy, sortOrder } = (0, paginationHelper_1.default)(paginationOptions);
    // Sort Condition
    const sortCondition = { [sortBy]: sortOrder };
    const data = yield order_model_1.default.find()
        .populate("cow buyer")
        .sort(sortCondition)
        .skip(skip)
        .limit(limit);
    const total = yield order_model_1.default.countDocuments();
    const meta = { page, limit, total };
    return { meta, data };
});
const getOrder = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield (0, order_utils_1.isOrderFound)(id))) {
        throw new APIError_1.APIError(400, "Order not Found!");
    }
    const data = yield order_model_1.default.findById(id).populate("cow buyer");
    return data;
});
exports.OrderService = {
    createOrder,
    getAllOrders,
    getOrder,
};
