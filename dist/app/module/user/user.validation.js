"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const user_constant_1 = require("./user.constant");
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
const updateUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .object({
            firstName: zod_1.z.string().optional(),
            lastName: zod_1.z.string().optional(),
        })
            .optional(),
        role: zod_1.z.enum([...user_constant_1.userRole], {}).optional(),
        password: zod_1.z.string().optional(),
        phoneNumber: zod_1.z.string().optional(),
        address: zod_1.z.string().optional(),
        budget: zod_1.z.number().optional(),
        income: zod_1.z.number().optional(),
    }),
});
exports.UserValidation = { signupZodSchema, updateUserZodSchema };
