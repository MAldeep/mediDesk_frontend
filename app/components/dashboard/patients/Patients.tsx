"use client";

import { useAuthStore } from "@/app/stores/useAuthStore";
import Link from "next/link";
import PatientPreview from "./PatientPreview";

export default function Patients() {
  const user = useAuthStore((state) => state.user);
  const userRole = user?.role;

  return (
    <div className="w-full flex flex-col gap-6 p-4 sm:p-6">
      {/* Top Header & Main Action */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200/80">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Patients
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage your clinic&apos;s patient records and view recent activity.
          </p>
        </div>

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
      </div>

      {/* Main Content Area */}
      <div className="w-full">
        <PatientPreview />
      </div>
    </div>
  );
}
