import { z } from "zod";

export const registerSchema = z
  .object({
    email: z.string().email({ message: "Ogiltig e-postadress" }),
    password: z.string().min(6, "Lösenordet måste vara minst 6 tecken"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Lösenorden matchar inte",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
