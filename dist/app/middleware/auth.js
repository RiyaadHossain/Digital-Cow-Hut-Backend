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
const http_status_1 = __importDefault(require("http-status"));
const APIError_1 = require("../../interface/APIError");
const jwtHelper_1 = require("../../helpers/jwtHelper");
const config_1 = __importDefault(require("../../config"));
const auth = (...requiredRoles) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    try {
        if (!token) {
            throw new APIError_1.APIError(http_status_1.default.UNAUTHORIZED, "Authenticaiton Required!");
        }
        // Access Token Verificaiton
        const user = jwtHelper_1.jwtHelper.verifyToken(token, config_1.default.JWT_SECRET);
        // Role Authorization
        if (requiredRoles.length && !requiredRoles.includes(user.role)) {
            throw new APIError_1.APIError(http_status_1.default.BAD_REQUEST, "Unauthorization Access!");
        }
        req.user = user;
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.default = auth;
