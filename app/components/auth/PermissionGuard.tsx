import { usePermission } from "@/app/hooks/usePermissions";
import { AppointmentPermissions } from "@/app/types/rbac";
import { ReactNode } from "react";

interface PermissionGuardProps {
  permission: AppointmentPermissions;
  fallBack?: ReactNode;
  children: ReactNode;
}

export const PermissionGuard = ({
  permission,
  fallBack = null,
  children,
}: PermissionGuardProps) => {
  const { can } = usePermission();
  if (can(permission)) {
    return <>{children}</>;
  }
  return <>{fallBack}</>;
};
