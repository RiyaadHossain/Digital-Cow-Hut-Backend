import express from "express";
import { OrderValidation } from "./order.validation";
import { OrderController } from "./order.controller";
import validateRequest from "../../middleware/validateRequest";
import auth from "../../middleware/auth";
import { USER_ENUM } from "../../../enum/common";
const router = express.Router();

router.post(
  "/",
  validateRequest(OrderValidation.createOrderZodSchema),
  auth(USER_ENUM.BUYER),
  OrderController.createOrder
);

router.get(
  "/",
  auth(USER_ENUM.BUYER, USER_ENUM.SELLER, USER_ENUM.ADMIN),
  OrderController.getAllOrders
);

router.get(
  "/:id",
  auth(USER_ENUM.BUYER, USER_ENUM.SELLER, USER_ENUM.ADMIN),
  OrderController.getOrder
);

export const OrderRoute = router;
