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
const router = express_1.default.Router();
router.post("/", (0, validateRequest_1.default)(order_validation_1.OrderValidation.createOrderZodSchema), order_controller_1.OrderController.createOrder);
router.get("/", order_controller_1.OrderController.getAllOrders);
router.get("/:id", order_controller_1.OrderController.getOrder);
exports.OrderRoute = router;
