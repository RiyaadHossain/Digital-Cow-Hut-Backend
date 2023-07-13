import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { AuthValidation } from "./auth.validation";
import { AuthController } from "./auth.controller";
const router = express.Router();

router.post(
  "/signup",
  validateRequest(AuthValidation.signupZodSchema),
  AuthController.signup
);

router.post(
  "/login",
  validateRequest(AuthValidation.loginZodSchema),
  AuthController.login
);

router.post(
  "/refresh-token",
  validateRequest(AuthValidation.refreshTokenZodSchema),
  AuthController.refreshToken
);

export const AuthRoute = router;
