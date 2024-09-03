import { z } from "zod";

export const SignupValidation = z
  .object({
    username: z.string().min(2).max(50),
    email: z.string().email(),
    password: z.string().min(8, "Password must contain at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "Password must contain at least 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], 
  });
