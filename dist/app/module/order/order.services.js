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
        throw new APIError_1.APIError(http_status_1.default.BAD_REQUEST, `Buyer don't have enough budget to buy ${cow.name}!`);
    let orderData;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        // 1. Decrease Buyer Budget
        buyerBudget = buyerBudget - cowPrice;
        yield user_model_1.default.findOneAndUpdate({ _id: buyer, role: common_1.USER_ENUM.BUYER }, { budget: buyerBudget }, { session });
        // 2. Increase Seller Incode
        const sellerId = (_a = cow === null || cow === void 0 ? void 0 : cow.seller) === null || _a === void 0 ? void 0 : _a._id;
        yield user_model_1.default.findByIdAndUpdate({ _id: sellerId, role: common_1.USER_ENUM.SELLER }, { $inc: { income: cowPrice } }, { session });
        // 3. Create the Order
        const data = yield order_model_1.default.create([payload], { session });
        orderData = data[0];
        yield session.commitTransaction();
    }
    catch (error) {
        yield session.abortTransaction();
        throw new APIError_1.APIError(http_status_1.default.BAD_REQUEST, "Failed to make Order!");
    }
    finally {
        yield session.endSession();
    }
    if (orderData) {
        orderData = yield order_model_1.default.findById(orderData._id).populate("cow buyer");
    }
    return orderData;
});
const getAllOrders = (paginationOptions, user) => __awaiter(void 0, void 0, void 0, function* () {
    // Pagination
    const { page, limit, skip, sortBy, sortOrder } = (0, paginationHelper_1.default)(paginationOptions);
    // Sort Condition
    const sortCondition = { [sortBy]: sortOrder };
    let data;
    const userId = new mongoose_1.default.Types.ObjectId(user === null || user === void 0 ? void 0 : user._id);
    if ((user === null || user === void 0 ? void 0 : user.role) === "seller") {
        data = yield order_model_1.default.aggregate([
            {
                $lookup: {
                    from: "cows",
                    localField: "cow",
                    foreignField: "_id",
                    as: "cow",
                },
            },
            {
                $unwind: "$cow",
            },
            {
                $match: { "cow.seller": userId },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "cow.seller",
                    foreignField: "_id",
                    as: "cow.seller",
                },
            },
            {
                $unwind: "$cow.seller",
            },
            {
                $lookup: {
                    from: "users",
                    localField: "buyer",
                    foreignField: "_id",
                    as: "buyer",
                },
            },
            {
                $unwind: "$buyer",
            },
            {
                $skip: skip,
            },
            {
                $limit: limit,
            },
        ]);
    }
    else if ((user === null || user === void 0 ? void 0 : user.role) === "buyer") {
        data = yield order_model_1.default.find({ buyer: user._id })
            .populate("buyer")
            .populate({ path: "cow", populate: { path: "seller" } })
            .sort(sortCondition)
            .skip(skip)
            .limit(limit);
    }
    else {
        data = yield order_model_1.default.find()
            .populate("buyer")
            .populate({ path: "cow", populate: { path: "seller" } })
            .sort(sortCondition)
            .skip(skip)
            .limit(limit);
    }
    const total = yield order_model_1.default.countDocuments();
    const meta = { page, limit, total };
    return { meta, data };
});
const getOrder = (_id, user) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield order_model_1.default.findById(_id).populate("cow");
    if (!order) {
        throw new APIError_1.APIError(400, "Order not Found!");
    }
    // Customize Autorization
    /*   if (user?.role === USER_ENUM.BUYER && user?._id !== order.buyer) {
      throw new APIError(httpStatus.BAD_REQUEST, "Unauthorization Access!");
    }
  
    if (user?.role === USER_ENUM.SELLER && user?._id !== order.cow.seller) {
      throw new APIError(httpStatus.BAD_REQUEST, "Unauthorization Access!");
    } */
    const orderId = new mongoose_1.default.Types.ObjectId(_id);
    const userId = new mongoose_1.default.Types.ObjectId(user === null || user === void 0 ? void 0 : user._id);
    let data;
    if ((user === null || user === void 0 ? void 0 : user.role) === common_1.USER_ENUM.SELLER) {
        const result = yield order_model_1.default.aggregate([
            {
                $match: { _id: orderId },
            },
            {
                $lookup: {
                    from: "cows",
                    localField: "cow",
                    foreignField: "_id",
                    as: "cow",
                },
            },
            {
                $unwind: "$cow",
            },
            {
                $match: { "cow.seller": userId },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "cow.seller",
                    foreignField: "_id",
                    as: "cow.seller",
                },
            },
            {
                $unwind: "$cow.seller",
            },
            {
                $lookup: {
                    from: "users",
                    localField: "buyer",
                    foreignField: "_id",
                    as: "buyer",
                },
            },
            {
                $unwind: "$buyer",
            },
        ]);
        data = result[0];
    }
    else if ((user === null || user === void 0 ? void 0 : user.role) === common_1.USER_ENUM.BUYER) {
        data = yield order_model_1.default.findOne({ _id, buyer: user._id })
            .populate("buyer")
            .populate({ path: "cow", populate: { path: "seller" } });
    }
    else {
        data = yield order_model_1.default.findById(_id)
            .populate("buyer")
            .populate({ path: "cow", populate: { path: "seller" } });
    }
    if (!data)
        throw new APIError_1.APIError(http_status_1.default.BAD_REQUEST, "Unauthorization Access!");
    return data;
});
exports.OrderService = {
    createOrder,
    getAllOrders,
    getOrder,
};
/*
########## Can be optimized ##############

let query = Order.find();

  if (user) {
    if (user.role === "admin") {
      // Admin can get all orders
      query = query.populate("cow buyer");
    } else if (user.role === "buyer") {
      // Buyer can get orders associated with their ID
      query = query.find({ buyer: user._id }).populate("cow buyer");
    } else if (user.role === "seller") {
      // Seller can get orders associated with their ID
      query = query
        .populate({
          path: "cow",
          match: { "cow.seller": user._id },
        });
    }
  }
  
const data = await query.sort(sortCondition).skip(skip).limit(limit);
*/
