"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIError = void 0;
class APIError extends Error {
    constructor(statusCode, message, stack = "") {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
        if (stack)
            this.stack = stack;
        else
            Error.captureStackTrace(this, this.constructor);
    }
}
exports.APIError = APIError;
