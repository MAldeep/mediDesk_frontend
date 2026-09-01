export type Role = "admin" | "doctor" | "staff";

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
  admin: [
    "read:appointment",
    "create:appointment",
    "delete:appointment",
    "update:appointment",
    "read:patient",
    "create:patient",
    "update:patient",
    "delete:patient",
  ],
  doctor: ["read:appointment", "read:patient", "update:patient"],
  staff: [
    "read:appointment",
    "create:appointment",
    "update:appointment",
    "create:patient",
  ],
};
