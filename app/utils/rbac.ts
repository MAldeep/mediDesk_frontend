// import { User } from "../types/auth";

// export const getUserPermissions = (
//   user: User | null,
// ): AppointmentPermissions[] => {
//   if (!user) return [];
//   if (user.permissions && user.permissions.length > 0) {
//     return user.permissions;
//   }
//   const userRole: Role = user.role;
//   return Role_Permissions[userRole] ?? [];
// };

// export const hasPermission = (
//   userPermissions: AppointmentPermissions[],
//   requiredPermissions: AppointmentPermissions,
// ): boolean => {
//   return userPermissions.includes(requiredPermissions);
// };
