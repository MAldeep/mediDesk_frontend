"use client";

import { usePatients } from "@/app/hooks/patients/usePatients";
import { useAuthStore } from "@/app/stores/useAuthStore";
import Link from "next/link";
import PatientCard from "./PatientCard";
import { Patient } from "@/app/types/patient";

export default function PatientPreview() {
  const { user } = useAuthStore();
  const userRole = user?.role;
  const { patients, getIsError, getError, getIsLoading } = usePatients();

  // Type-safe slice without using 'any'
  const previewPatients: Patient[] = Array.isArray(patients)
    ? patients.slice(0, 5)
    : [];

  return (
    <div className="bg-slate-50/60 border border-slate-200 rounded-2xl p-5 sm:p-6">
      {/* Header Bar */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Recent Patients</h2>
          <p className="text-xs text-slate-500">
            Quick overview of your latest registered patients
          </p>
        </div>

        {userRole && (
          <Link
            href={`/dashboard/${userRole}/patients`}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-1 transition-all"
          >
            See All Patients
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        )}
      </div>

      {/* Loading Skeleton */}
      {getIsLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="bg-white border border-slate-200 rounded-xl p-4 animate-pulse space-y-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-200 shrink-0" />
                <div className="space-y-1.5 flex-1">
                  <div className="h-3.5 bg-slate-200 rounded w-3/4" />
                  <div className="h-2.5 bg-slate-200 rounded w-1/2" />
                </div>
              </div>
              <div className="pt-3 border-t border-slate-100 flex justify-between">
                <div className="h-3 bg-slate-200 rounded w-1/3" />
                <div className="h-3 bg-slate-200 rounded w-1/4" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error Alert */}
      {getIsError && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
          Failed to load patients:{" "}
          {getError?.message || "Something went wrong."}
        </div>
      )}

      {/* Patient Cards Grid */}
      {!getIsLoading && !getIsError && (
        <>
          {previewPatients.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {previewPatients.map((patient: Patient) => (
                <PatientCard key={patient._id} patient={patient} />
              ))}
            </div>
          ) : (
            <div className="bg-white border border-dashed border-slate-200 rounded-xl p-8 text-center">
              <p className="text-slate-500 text-sm font-medium">
                No patients found.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
