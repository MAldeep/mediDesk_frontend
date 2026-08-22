import z from "zod";

export const loginSchema = z.object({
  email: z.string().min(6).email("Invalid E-mail"),
  password: z.string().min(6, "At least 6 characters"),
});

export type LoginType = z.infer<typeof loginSchema>;
