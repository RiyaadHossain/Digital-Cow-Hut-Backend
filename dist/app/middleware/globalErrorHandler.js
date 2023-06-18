"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const handleZodError_1 = __importDefault(require("../../errors/handleZodError"));
const handleCastError_1 = __importDefault(require("../../errors/handleCastError"));
const handleValidationError_1 = __importDefault(require("../../errors/handleValidationError"));
const config_1 = __importDefault(require("../../config"));
const APIError_1 = require("../../interface/APIError");
const globalErrorHandler = (error, req, res, next) => {
    let statusCode = 500;
    const success = false;
    let message = "Something went wrong!";
    let errorMessage = [];
    if (error.name == "ValidationError") {
        const simplifiedError = (0, handleValidationError_1.default)(error);
        statusCode = simplifiedError.status;
        message = simplifiedError.message;
        errorMessage = simplifiedError.errorMessage;
    }
    else if (error.name == "CastError") {
        const simplifiedError = (0, handleCastError_1.default)(error);
        statusCode = simplifiedError.status;
        message = simplifiedError.message;
        errorMessage = simplifiedError.errorMessage;
    }
    else if (error instanceof zod_1.ZodError) {
        const simplifiedError = (0, handleZodError_1.default)(error);
        statusCode = simplifiedError.status;
        message = simplifiedError.message;
        errorMessage = simplifiedError.errorMessage;
    }
    else if (error instanceof APIError_1.APIError) {
        statusCode = 400;
        message = error.message;
    }
    else if (error instanceof Error) {
        statusCode = 500;
        message = error.message;
    }
    res.status(statusCode).json({
        statusCode,
        success,
        message,
        errorMessage,
        stack: config_1.default.NODE_ENV == "development" ? error.stack : undefined,
    });
};
exports.default = globalErrorHandler;
