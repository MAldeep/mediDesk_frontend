import z from "zod";

export const inviteUserSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("E-mail is required"),
  role: z.enum(["doctor", "staff"]),
});
export type InviteUserType = z.infer<typeof inviteUserSchema>;
