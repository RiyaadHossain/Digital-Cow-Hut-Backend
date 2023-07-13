import { z } from "zod";
import { adminRole } from "./admin.constant";

const createAdminZodSchema = z.object({
  body: z.object({
    name: z.object({
      firstName: z.string({ required_error: "First name is required!" }),
      lastName: z.string({ required_error: "Last name is required!" }),
    }),
    phoneNumber: z.string({ required_error: "Phone number is required!" }),
    role: z.enum([...adminRole] as [string, ...string[]]).optional(),
    password: z.string({ required_error: "Password is required!" }),
    address: z.string({ required_error: "Address is required!" }),
  }),
});

const loginZodSchema = z.object({
  body: z.object({
    phoneNumber: z.string({ required_error: "Phone is required!" }),
    password: z.string({ required_error: "Password is required!" }),
  }),
});


export const AdminValidation = {
  createAdminZodSchema,
  loginZodSchema
};
