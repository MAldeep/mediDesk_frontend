"use client";

import { usePermission } from "@/app/hooks/usePermissions";
import { Plus } from "lucide-react";
import Link from "next/link";
import PermissionGuard from "../../guards/PermissionGuard";

export default function AddNewAppointmentBtn() {
  const { userRole } = usePermission();
  return (
    <PermissionGuard allowedRoles={["admin", "staff"]}>
      <Link
        href={`/dashboard/${userRole}/newAppointment`}
        className="inline-flex items-center justify-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-xl transition-all shadow-xs cursor-pointer"
      >
        <Plus className="w-4 h-4" />
      </Link>
    </PermissionGuard>
  );
}
