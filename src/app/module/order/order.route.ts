import express from "express";
import { OrderValidation } from "./order.validation";
import { OrderController } from "./order.controller";
import validateRequest from "../../middleware/validateRequest";
const router = express.Router();

router.post(
  "/",
  validateRequest(OrderValidation.createOrderZodSchema),
  OrderController.createOrder
);

router.get("/", OrderController.getAllOrders);

router.get("/:id", OrderController.getOrder);

export const OrderRoute = router;
