"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleValidationError = (error) => {
    const errorMessage = Object.values(error.errors).map((error) => ({ path: error.path, message: error.message }));
    const status = 400;
    const message = error.message;
    return { status, message, errorMessage };
};
exports.default = handleValidationError;
