"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleZodError = (error) => {
    const errorMessage = error.issues.map((issue) => ({
        path: issue.path[issue.path.length - 1],
        message: issue.message,
    }));
    const status = 400;
    const message = "Validation Error";
    return { status, message, errorMessage };
};
exports.default = handleZodError;
