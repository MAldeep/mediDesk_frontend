export type Role = "Admin" | "Doctor" | "Staff";

export type Permission =
  // Appointments
  | "read:appointment"
  | "create:appointment"
  | "delete:appointment"
  | "update:appointment"
  // Patients
  | "read:patient"
  | "create:patient"
  | "update:patient"
  | "delete:patient";

export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  Admin: [
    "read:appointment",
    "create:appointment",
    "delete:appointment",
    "update:appointment",
    "read:patient",
    "create:patient",
    "update:patient",
    "delete:patient",
  ],
  Doctor: ["read:appointment", "read:patient", "update:patient"],
  Staff: [
    "read:appointment",
    "create:appointment",
    "update:appointment",
    "create:patient",
  ],
};
