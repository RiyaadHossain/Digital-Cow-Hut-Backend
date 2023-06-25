import express from "express";
import { CowValidation } from "./cow.validation";
import { CowController } from "./cow.controller";
import validateRequest from "../../middleware/validateRequest";
import auth from "../../middleware/auth";
import { USER_ENUM } from "../../../enum/common";
const router = express.Router();

router.post(
  "/create-cow",
  validateRequest(CowValidation.createCowZodSchema),
  auth(USER_ENUM.SELLER),
  CowController.createCow
);

router.get(
  "/",
  auth(USER_ENUM.BUYER, USER_ENUM.SELLER, USER_ENUM.ADMIN),
  CowController.getAllCows
);

router.get(
  "/:id",
  auth(USER_ENUM.BUYER, USER_ENUM.SELLER, USER_ENUM.ADMIN),
  CowController.getCow
);

router.patch(
  "/:id",
  validateRequest(CowValidation.updateCowZodSchema),
  auth(USER_ENUM.SELLER),
  CowController.updateCow
);

router.delete("/:id", auth(USER_ENUM.SELLER), CowController.deleteCow);

export const CowRoute = router;
