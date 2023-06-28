"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoute = void 0;
const express_1 = __importDefault(require("express"));
const order_validation_1 = require("./order.validation");
const order_controller_1 = require("./order.controller");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const common_1 = require("../../../enum/common");
const router = express_1.default.Router();
router.post("/", (0, validateRequest_1.default)(order_validation_1.OrderValidation.createOrderZodSchema), (0, auth_1.default)(common_1.USER_ENUM.BUYER), order_controller_1.OrderController.createOrder);
router.get("/", (0, auth_1.default)(common_1.USER_ENUM.BUYER, common_1.USER_ENUM.SELLER, common_1.USER_ENUM.ADMIN), order_controller_1.OrderController.getAllOrders);
router.get("/:id", (0, auth_1.default)(common_1.USER_ENUM.BUYER, common_1.USER_ENUM.SELLER, common_1.USER_ENUM.ADMIN), order_controller_1.OrderController.getOrder);
exports.OrderRoute = router;
