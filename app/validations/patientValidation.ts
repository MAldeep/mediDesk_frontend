import z from "zod";

export const createNewPatientSchema = z.object({
  name: z.string().min(2, "Patient's name is required"),
  phone: z
    .string()
    .regex(/^01[0125][0-9]{8}$/, "must be valid egyptian phone number"),
  address: z.string().optional(),
  age: z.number().min(1, "At least one"),
  gender: z.enum(["male", "female"]),
  history: z.string().optional(),
});

export type CreatePatientData = z.infer<typeof createNewPatientSchema>;
export const updatePatientSchema = createNewPatientSchema
  .partial()
  .refine(
    (data) => Object.keys(data).length > 0,
    "Must provide at least one field to update",
  );

export type UpdatePatientData = z.infer<typeof updatePatientSchema>;
