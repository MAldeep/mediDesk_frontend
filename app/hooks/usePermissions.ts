import { useMemo } from "react";
import { useAuthStore } from "../stores/useAuthStore";
import { getUserPermissions, hasPermission } from "../utils/rbac";
import { AppointmentPermissions } from "../types/rbac";

export const usePermission = () => {
  const user = useAuthStore((state) => state.user);

  const permissions = useMemo(() => {
    return getUserPermissions(user);
  }, [user]);

  const can = (permission: AppointmentPermissions): boolean => {
    return hasPermission(permissions, permission);
  };

  return {
    permissions,
    can,
  };
};
