"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse = (res, responseData) => {
    const response = {
        statusCode: responseData.statusCode,
        success: responseData.success,
        message: responseData.message,
        meta: responseData.meta,
        data: responseData.data,
    };
    res.status(responseData.statusCode).json(response);
};
exports.default = sendResponse;
