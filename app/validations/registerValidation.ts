import z from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().min(6).email("Provide valid Email"),
  password: z.string().min(6, "At least 6 characters"),
});

export type RegisterData = z.infer<typeof registerSchema>;
