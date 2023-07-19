"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
const user_constant_1 = require("../user/user.constant");
const signupZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.object({
            firstName: zod_1.z.string(),
            lastName: zod_1.z.string(),
        }),
        role: zod_1.z.enum([...user_constant_1.userRole], {
            required_error: "Role is required",
        }),
        password: zod_1.z.string({ required_error: "Password is required!" }),
        phoneNumber: zod_1.z.string({ required_error: "Phone number is required!" }),
        address: zod_1.z.string({ required_error: "Address is required!" }),
        budget: zod_1.z.number().optional(),
        income: zod_1.z.number().optional(),
    }),
});
const loginZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        phoneNumber: zod_1.z.string({ required_error: "Phone is required!" }),
        password: zod_1.z.string({ required_error: "Password is required!" }),
    }),
});
const refreshTokenZodSchema = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({ required_error: "Refresh Token is required!" }),
    }),
});
exports.AuthValidation = { signupZodSchema, loginZodSchema, refreshTokenZodSchema };
