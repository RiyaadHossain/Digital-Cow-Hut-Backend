import express from "express";
import { Validation } from "./user.validation";
import { UserController } from "./user.controller";
const router = express.Router();

router.post("/signup", /* Validation.signupZodSchema, */ UserController.signup);
router.get("/", UserController.getAllUsers);
router.get("/:id", UserController.getUser);
router.patch(
  "/:id",
  /* Validation.updateUserZodSchema, */ UserController.updateUser
);
router.delete("/:id", UserController.deleteUser);

export const UserRoute = router;
