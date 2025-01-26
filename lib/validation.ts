import { z } from "zod";

export const formSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long" })
    .max(100, { message: "Title must be at most 100 characters long" }),
  description: z
    .string()
    .min(20, { message: "Description must be at least 20 characters long" })
    .max(500, { message: "Description must be at most 500 characters long" }),
  category: z
    .string()
    .min(3, { message: "Category must be at least 3 characters long" })
    .max(20, { message: "Category must be at most 20 characters long" }),
  link: z
    .string()
    .url({ message: "Link must be a valid URL" })
    .refine(
      async (url) => {
        try {
          const res = await fetch(url, { method: "HEAD" });
          const contentType = res.headers.get("content-type");
          return contentType?.startsWith("image/");
        } catch {
          return false;
        }
      },
      { message: "Link must point to an image" }
    ),
  pitch: z
    .string()
    .min(10, { message: "Pitch must be at least 10 characters long" }),
});

export const registerFormSchema = z
  .object({
    login: z
      .string()
      .min(3, { message: "Login must be at least 3 characters long" })
      .max(16, { message: "Login must be at most 20 characters long" }),
    email: z.string().email({ message: "Email must be a valid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
    confirmPassword: z.string().min(8, {
      message: "Confirm Password must be at least 8 characters long",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
