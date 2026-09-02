"use client";

import AddNewPatientBtn from "@/app/components/dashboard/patients/AddNewPatientBtn";
import PatientCard from "@/app/components/dashboard/patients/PatientCard";
import { usePatients } from "@/app/hooks/patients/usePatients";
import { Search, Loader2, AlertCircle, Users } from "lucide-react";

export default function Patients() {
  const { patients, getIsLoading, getIsError, getError, search, setSearch } =
    usePatients();

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 md:p-8 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Patients Directory
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage patient records and search medical histories.
          </p>
        </div>

        <AddNewPatientBtn />
      </div>

      {/* Control Bar: Server-side Search */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or phone (Server-side)..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 shadow-sm"
          />
        </div>
      </div>

      {/* Loading State */}
      {getIsLoading && (
        <div className="flex flex-col items-center justify-center py-20 text-slate-500 space-y-3">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          <p className="text-sm font-medium">Loading patient records...</p>
        </div>
      )}

      {/* Error State */}
      {getIsError && (
        <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p>Failed to load data: {getError?.message}</p>
        </div>
      )}

      {/* Success State */}
      {!getIsLoading && !getIsError && (
        <>
          {patients && patients.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {patients.map((patient) => (
                <PatientCard key={patient._id} patient={patient} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 bg-white border border-dashed border-slate-200 rounded-2xl text-center p-6">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-slate-800 font-semibold text-base mb-1">
                No patients found
              </h3>
              <p className="text-slate-500 text-sm max-w-xs">
                {search
                  ? "No results match your query."
                  : "There are no patient records available yet."}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
