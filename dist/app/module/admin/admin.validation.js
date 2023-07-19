"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminValidation = void 0;
const zod_1 = require("zod");
const admin_constant_1 = require("./admin.constant");
const createAdminZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.object({
            firstName: zod_1.z.string({ required_error: "First name is required!" }),
            lastName: zod_1.z.string({ required_error: "Last name is required!" }),
        }),
        phoneNumber: zod_1.z.string({ required_error: "Phone number is required!" }),
        role: zod_1.z.enum([...admin_constant_1.adminRole]).optional(),
        password: zod_1.z.string({ required_error: "Password is required!" }),
        address: zod_1.z.string({ required_error: "Address is required!" }),
    }),
});
const loginZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        phoneNumber: zod_1.z.string({ required_error: "Phone is required!" }),
        password: zod_1.z.string({ required_error: "Password is required!" }),
    }),
});
exports.AdminValidation = {
    createAdminZodSchema,
    loginZodSchema
};
