import {z} from 'zod';
export const productSchema=z.object({
    name: z
    .string()
    .min(2, "Product name is too short")
    .max(100),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters"),

  price: z
    .number()
    .positive("Price must be greater than 0"),

  stock: z
    .number()
    .int()
    .nonnegative("Stock cannot be negative"),

  category: z
    .string()
    .min(1, "Category is required"),

  images: z
    .array(z.string().url())
    .min(2, "At least two image is required")

});