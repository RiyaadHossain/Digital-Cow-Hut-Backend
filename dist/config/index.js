"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), ".env") });
exports.default = {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    BCRYPT_SALT_ROUNDS: process.env.BCRYPT_SALT_ROUNDS,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_REFRESH: process.env.JWT_REFRESH,
    JWT_SECRET_EXPIRE: process.env.JWT_SECRET_EXPIRE,
    JWT_REFRESH_EXPIRE: process.env.JWT_REFRESH_EXPIRE,
    MONGODB_URI: process.env.MONGODB_URI,
};
