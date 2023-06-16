import express from "express";
import { UserValidation } from "./user.validation";
import { UserController } from "./user.controller";
import validateRequest from "../../middleware/validateRequest";
const router = express.Router();

router.post(
  "/signup",
  validateRequest(UserValidation.signupZodSchema),
  UserController.signup
);

router.get("/", UserController.getAllUsers);

router.get("/:id", UserController.getUser);

router.patch(
  "/:id",
  validateRequest(UserValidation.updateUserZodSchema),
  UserController.updateUser
);

router.delete("/:id", UserController.deleteUser);

export const UserRoute = router;
