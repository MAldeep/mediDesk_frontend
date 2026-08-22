"use clinet";

import { useAuthStore } from "../stores/useAuthStore";
import { Permission, Role, ROLE_PERMISSIONS } from "../types/rbac";

export function usePermission() {
  const { user } = useAuthStore();
  const userRole = (user?.role as Role) || null;
  const userPermissions = userRole ? ROLE_PERMISSIONS[userRole] || [] : [];

  const hasRole = (role: Role): boolean => {
    if (!userRole) return false;
    return userRole === role;
  };
  const hasPermission = (permission: Permission): boolean => {
    if (!userRole) return false;
    return userPermissions.includes(permission);
  };
  const hasAllPermissions = (permissions: Permission[]): boolean => {
    if (!userRole) return false;
    return permissions.every((perm) => userPermissions.includes(perm));
  };
  const hasAnyPermission = (permissions: Permission[]): boolean => {
    if (!userRole) return false;
    return permissions.some((perm) => userPermissions.includes(perm));
  };
  return {
    userRole,
    userPermissions,
    hasRole,
    hasPermission,
    hasAllPermissions,
    hasAnyPermission,
  };
}
