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

export const clientSchema = z.object({
  name: z.string().min(1, { message: "Namn är obligatoriskt." }),
  email: z.string().email({ message: "Ogiltig e-postadress." }),
  address: z.string().min(1, { message: "Adress är obligatorisk." }),
});

export const propertySchema = z.object({
  address: z.string().min(1, { message: "Adress är obligatoriskt." }),
  price: z.string().email({ message: "Pris är obligatoriskt." }),
  status: z.string().min(1, { message: "Status är obligatorisk." }),
})

export type RegisterFormData = z.infer<typeof registerSchema>;
