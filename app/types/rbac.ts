export type Role = "admin" | "doctor" | "staff";

export type AppointmentPermissions =
  | "appointment:read"
  | "appointment:add"
  | "appointment:update"
  | "appointment:delete";

export const Role_Permissions: Record<Role, AppointmentPermissions[]> = {
  admin: [
    "appointment:read",
    "appointment:add",
    "appointment:update",
    "appointment:delete",
  ],
  staff: ["appointment:read", "appointment:add", "appointment:update"],
  doctor: ["appointment:read"],
};
