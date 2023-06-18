"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CowRoute = void 0;
const express_1 = __importDefault(require("express"));
const cow_validation_1 = require("./cow.validation");
const cow_controller_1 = require("./cow.controller");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const router = express_1.default.Router();
router.post("/create-cow", (0, validateRequest_1.default)(cow_validation_1.CowValidation.createCowZodSchema), cow_controller_1.CowController.createCow);
router.get("/", cow_controller_1.CowController.getAllCows);
router.get("/:id", cow_controller_1.CowController.getCow);
router.patch("/:id", (0, validateRequest_1.default)(cow_validation_1.CowValidation.updateCowZodSchema), cow_controller_1.CowController.updateCow);
router.delete("/:id", cow_controller_1.CowController.deleteCow);
exports.CowRoute = router;
