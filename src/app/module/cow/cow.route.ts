import express from "express";
import { CowValidation } from "./cow.validation";
import { CowController } from "./cow.controller";
import validateRequest from "../../middleware/validateRequest";
const router = express.Router();

router.post(
  "/create-cow",
  validateRequest(CowValidation.createCowZodSchema),
  CowController.createCow
);

router.get("/", CowController.getAllCows);

router.get("/:id", CowController.getCow);

router.patch(
  "/:id",
  validateRequest(CowValidation.updateCowZodSchema),
  CowController.updateCow
);

router.delete("/:id", CowController.deleteCow);

export const CowRoute = router;
