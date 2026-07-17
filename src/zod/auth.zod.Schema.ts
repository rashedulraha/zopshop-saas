import z from "zod";
export const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, "Full name must be at least 2 characters long.")
      .min(3, "Full name must be at least 3 characters long.")
      .max(50, "Full name must not exceed 50 characters."),
    email: z
      .string()
      .email("Invalid email address.")
      .min(3, "Email must be at least 3 characters long.")
      .max(100, "Email must not exceed 100 characters."),
    phone: z
      .string()
      .min(11, "Phone number must be at least 11 digits.")
      .max(15, "Phone number must not exceed 15 digits.")
      .regex(/^\d+$/, "Phone number must contain only digits.")
      .optional()
      .or(z.literal("")),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long.")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
      .regex(/[0-9]/, "Password must contain at least one number.")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character.",
      ),
    confirmPassword: z
      .string()
      .min(8, "Confirm password must be at least 8 characters long."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z
    .string()
    .email("Invalid email address.")
    .min(3, "Email must be at least 3 characters long.")
    .max(100, "Email must not exceed 100 characters."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long.")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
    .regex(/[0-9]/, "Password must contain at least one number.")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character.",
    ),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;
