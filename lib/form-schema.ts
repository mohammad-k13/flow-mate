import { z } from "zod";

export const registerForm = z.object({
  name: z.string().min(3, { message: "Name must be at lease 3 characters" }),
  email: z
    .string()
    .min(5, {
      message: "Email must be at least 5 characters.",
    })
    .email({ message: "Email is not valid" }),
  password: z.string().min(7, {
    message: "Password must be at least 7 characters.",
  }),
});

export const loginForm = z.object({
  email: z
    .string()
    .min(5, {
      message: "Email must be at least 5 characters.",
    })
    .email({ message: "Email is not valid" }),
  password: z.string().min(7, {
    message: "Password must be at least 7 characters.",
  }),
});
