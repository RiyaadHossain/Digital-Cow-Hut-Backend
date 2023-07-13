import { z } from "zod";
import { userRole } from "../user/user.constant";


const signupZodSchema = z.object({
  body: z.object({
    name: z.object({
      firstName: z.string(),
      lastName: z.string(),
    }),
    role: z.enum([...userRole] as [string, ...string[]], {
      required_error: "Role is required",
    }),
    password: z.string({ required_error: "Password is required!" }),
    phoneNumber: z.string({ required_error: "Phone number is required!" }),
    address: z.string({ required_error: "Address is required!" }),
    budget: z.number().optional(),
    income: z.number().optional(),
  }),
});

const loginZodSchema = z.object({
  body: z.object({
    phoneNumber: z.string({ required_error: "Phone is required!" }),
    password: z.string({ required_error: "Password is required!" }),
  }),
});

const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({ required_error: "Refresh Token is required!" }),
  }),
});

export const AuthValidation = { signupZodSchema, loginZodSchema, refreshTokenZodSchema };
