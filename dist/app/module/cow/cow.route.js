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
const auth_1 = __importDefault(require("../../middleware/auth"));
const common_1 = require("../../../enum/common");
const router = express_1.default.Router();
router.post("/create-cow", (0, validateRequest_1.default)(cow_validation_1.CowValidation.createCowZodSchema), (0, auth_1.default)(common_1.USER_ENUM.SELLER), cow_controller_1.CowController.createCow);
router.get("/", (0, auth_1.default)(common_1.USER_ENUM.BUYER, common_1.USER_ENUM.SELLER, common_1.USER_ENUM.ADMIN), cow_controller_1.CowController.getAllCows);
router.get("/:id", (0, auth_1.default)(common_1.USER_ENUM.BUYER, common_1.USER_ENUM.SELLER, common_1.USER_ENUM.ADMIN), cow_controller_1.CowController.getCow);
router.patch("/:id", (0, validateRequest_1.default)(cow_validation_1.CowValidation.updateCowZodSchema), (0, auth_1.default)(common_1.USER_ENUM.SELLER), cow_controller_1.CowController.updateCow);
router.delete("/:id", (0, auth_1.default)(common_1.USER_ENUM.SELLER), cow_controller_1.CowController.deleteCow);
exports.CowRoute = router;
