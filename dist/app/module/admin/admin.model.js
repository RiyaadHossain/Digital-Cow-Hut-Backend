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
const admin_constant_1 = require("./admin.constant");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../../config"));
const adminSchema = new mongoose_1.Schema({
    name: {
        firstName: { type: String, required: true, trim: true },
        lastName: { type: String, required: true, trim: true },
    },
    password: { type: String, required: true, /* select: 0 */ },
    role: { type: String, enum: admin_constant_1.adminRole, default: "admin" },
    phoneNumber: { type: String, unique: true, required: true, trim: true },
    address: { type: String, required: true, trim: true },
});
// Hash Password
adminSchema.pre("save", function () {
    return __awaiter(this, void 0, void 0, function* () {
        const admin = this;
        admin.password = yield bcrypt_1.default.hash(admin.password, Number(config_1.default.BCRYPT_SALT_ROUNDS));
    });
});
// Method: Check Admin Existence
adminSchema.statics.isAdminExist = function (phoneNumber) {
    return __awaiter(this, void 0, void 0, function* () {
        const adminExist = yield Admin.findOne({ phoneNumber });
        return adminExist;
    });
};
// Method: Check Admin Password
adminSchema.statics.isPassMatched = function (givenPass, savedPass) {
    return __awaiter(this, void 0, void 0, function* () {
        const passMatched = yield bcrypt_1.default.compare(givenPass, savedPass);
        return passMatched;
    });
};
const Admin = (0, mongoose_1.model)("Admin", adminSchema);
exports.default = Admin;
