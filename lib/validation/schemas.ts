import { z } from "zod";

export const registerSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: "E-postadress är obligatorisk" })
      .email({ message: "Ogiltig e-postadress" }),
    password: z
      .string()
      .min(6, { message: "Lösenordet måste vara minst 6 tecken" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Bekräfta lösenord är obligatoriskt" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Lösenorden matchar inte",
    path: ["confirmPassword"],
  });

export const clientSchema = z.object({
  name: z.string().min(1, { message: "Namn är obligatoriskt." }),
  email: z
    .string()
    .min(1, { message: "E-postadress är obligatorisk." })
    .email({ message: "Ogiltig e-postadress." }),
  address: z.string().min(1, { message: "Adress är obligatorisk." }),
});

export const propertySchema = z.object({
  address: z.string().min(1, { message: "Adress är obligatoriskt" }),
  price: z.coerce.number().min(1, { message: "Pris är obligatoriskt" }),
  status: z.string().min(1, { message: "Status är obligatoriskt" }),
});


export type RegisterFormData = z.infer<typeof registerSchema>;
