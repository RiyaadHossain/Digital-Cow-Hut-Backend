"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleCastError = (error) => {
    const errorMessage = [
        { path: error.path, message: error.message },
    ];
    const status = 400;
    const message = "Invalid ID";
    return { status, message, errorMessage };
};
exports.default = handleCastError;
