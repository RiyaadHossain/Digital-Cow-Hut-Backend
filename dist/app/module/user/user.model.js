"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const user_constant_1 = require("./user.constant");
const config_1 = __importDefault(require("../../../config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userSchema = new mongoose_1.Schema({
    name: {
        firstName: {
            type: String,
            required: true,
            trim: true,
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
        },
    },
    password: {
        type: String,
        required: true,
        // select: 0
    },
    role: {
        type: String,
        required: true,
        enum: user_constant_1.userRole,
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    address: {
        type: String,
        required: true,
        trim: true,
    },
    budget: Number,
    income: Number,
}, { timestamps: true });
// Hash Password
userSchema.pre("save", function () {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        user.password = yield bcrypt_1.default.hash(user.password, Number(config_1.default.BCRYPT_SALT_ROUNDS));
    });
});
// Method: Check User Existence
userSchema.statics.isUserExist = function (phoneNumber) {
    return __awaiter(this, void 0, void 0, function* () {
        const userExist = yield User.findOne({ phoneNumber });
        return userExist;
    });
};
// Method: Check User Password
userSchema.statics.isPassMatched = function (givenPass, savedPass) {
    return __awaiter(this, void 0, void 0, function* () {
        const passMatched = yield bcrypt_1.default.compare(givenPass, savedPass);
        return passMatched;
    });
};
const User = (0, mongoose_1.model)("User", userSchema);
exports.default = User;
