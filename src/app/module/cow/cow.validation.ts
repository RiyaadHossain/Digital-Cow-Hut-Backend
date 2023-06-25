import { z } from "zod";
import { cowBreed, cowCategory, cowLabel, cowLocation } from "./cow.constant";

const createCowZodSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required!" }),
    age: z.number({ required_error: "Age is required!" }),
    price: z.number({ required_error: "Price is required!" }),
    weight: z.number({ required_error: "Weight is required!" }),
    location: z.enum([...cowLocation] as [string, ...string[]], {
      required_error: "Location is required",
    }),
    breed: z.enum([...cowBreed] as [string, ...string[]], {
      required_error: "Breed is required",
    }),
    label: z.enum([...cowLabel] as [string, ...string[]], {
      required_error: "Label is required",
    }),
    category: z.enum([...cowCategory] as [string, ...string[]], {
      required_error: "Category is required",
    }),
  }),
});

const updateCowZodSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required!" }).optional(),
    age: z.number({ required_error: "Age is required!" }).optional(),
    price: z.number({ required_error: "Price is required!" }).optional(),
    weight: z.number({ required_error: "Weight is required!" }).optional(),
    location: z
      .enum([...cowLocation] as [string, ...string[]], {
        required_error: "Location is required",
      })
      .optional(),
    breed: z
      .enum([...cowBreed] as [string, ...string[]], {
        required_error: "Breed is required",
      })
      .optional(),
    label: z
      .enum([...cowLabel] as [string, ...string[]], {
        required_error: "Label is required",
      })
      .optional(),
    category: z
      .enum([...cowCategory] as [string, ...string[]], {
        required_error: "Category is required",
      })
      .optional(),
    seller: z.string({ required_error: "Seller is required!" }).optional(),
  }),
});

export const CowValidation = { createCowZodSchema, updateCowZodSchema };
