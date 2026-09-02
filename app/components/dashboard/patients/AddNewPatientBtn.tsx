"use client";

import { useAuthStore } from "@/app/stores/useAuthStore";
import Link from "next/link";
import PermissionGuard from "../../guards/PermissionGuard";
import { Role } from "@/app/types/rbac";

export default function AddNewPatientBtn() {
  const user = useAuthStore((state) => state.user);
  const userRole = user?.role;
  const allowedRoles: Role[] = ["admin", "staff"];
  return (
    <PermissionGuard allowedRoles={allowedRoles}>
      {userRole && (
        <Link
          href={`/dashboard/${userRole}/addNewPatient`}
          className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-sm px-4 py-2.5 rounded-xl shadow-sm shadow-blue-500/10 transition-all duration-200 shrink-0"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add New Patient
        </Link>
      )}
    </PermissionGuard>
  );
}
