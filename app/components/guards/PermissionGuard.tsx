"use client";

import { useAuthStore } from "@/app/stores/useAuthStore";
import { Permission, Role, ROLE_PERMISSIONS } from "@/app/types/rbac";
import React from "react";

interface PermissionGuardProps {
  children: React.ReactNode;
  allowedRoles?: Role[];
  requiredPermission?: Permission[];
  fallback?: React.ReactNode;
}
export default function PermissionGuard({
  children,
  allowedRoles,
  requiredPermission,
  fallback = null,
}: PermissionGuardProps) {
  const { user } = useAuthStore();
  if (!user) return <>{fallback}</>;
  const userRole = user.role as Role;
  const UserPermissions = ROLE_PERMISSIONS[userRole] || [];
  const hasRoleMatch = allowedRoles ? allowedRoles.includes(userRole) : true;
  const hasPermissionMatch = requiredPermission
    ? requiredPermission.every((prem) => UserPermissions.includes(prem))
    : true;
  if (hasRoleMatch && hasPermissionMatch) {
    return <>{children}</>;
  }
  return <>{fallback}</>;
}
