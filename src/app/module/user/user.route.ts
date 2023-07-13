import express from "express";
import { UserValidation } from "./user.validation";
import { UserController } from "./user.controller";
import validateRequest from "../../middleware/validateRequest";
import auth from "../../middleware/auth";
import { USER_ENUM } from "../../../enum/common";
const router = express.Router();

router.get("/", auth(USER_ENUM.ADMIN), UserController.getAllUsers);

router.get(
  "/my-profile",
  auth(USER_ENUM.BUYER, USER_ENUM.SELLER, USER_ENUM.ADMIN),
  UserController.myProfile
);

router.get("/:id", auth(USER_ENUM.ADMIN), UserController.getUser);

router.patch(
  "/my-profile",
  validateRequest(UserValidation.updateUserZodSchema),
  auth(USER_ENUM.BUYER, USER_ENUM.SELLER, USER_ENUM.ADMIN),
  UserController.updateProfile
);

router.patch(
  "/:id",
  validateRequest(UserValidation.updateUserZodSchema),
  auth(USER_ENUM.ADMIN),
  UserController.updateProfile
);

router.delete("/:id", auth(USER_ENUM.ADMIN), UserController.deleteUser);

export const UserRoute = router;
