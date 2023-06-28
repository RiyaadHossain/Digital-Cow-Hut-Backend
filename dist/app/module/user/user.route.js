"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoute = void 0;
const express_1 = __importDefault(require("express"));
const user_validation_1 = require("./user.validation");
const user_controller_1 = require("./user.controller");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const common_1 = require("../../../enum/common");
const router = express_1.default.Router();
router.post("/signup", (0, validateRequest_1.default)(user_validation_1.UserValidation.signupZodSchema), user_controller_1.UserController.signup);
router.get("/", (0, auth_1.default)(common_1.USER_ENUM.ADMIN), user_controller_1.UserController.getAllUsers);
router.get("/my-profile", (0, auth_1.default)(common_1.USER_ENUM.BUYER, common_1.USER_ENUM.SELLER, common_1.USER_ENUM.ADMIN), user_controller_1.UserController.myProfile);
router.patch("/my-profile", (0, validateRequest_1.default)(user_validation_1.UserValidation.updateUserZodSchema), (0, auth_1.default)(common_1.USER_ENUM.BUYER, common_1.USER_ENUM.SELLER, common_1.USER_ENUM.ADMIN), user_controller_1.UserController.updateProfile);
router.delete("/:id", (0, auth_1.default)(common_1.USER_ENUM.ADMIN), user_controller_1.UserController.deleteUser);
exports.UserRoute = router;
