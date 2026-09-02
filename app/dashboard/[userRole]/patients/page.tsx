"use client";

import { useState } from "react";
import PatientCard from "@/app/components/dashboard/patients/PatientCard";
import { usePatients } from "@/app/hooks/patients/usePatients";
import { Search, UserPlus, Loader2, AlertCircle, Users } from "lucide-react";

export default function Patients() {
  const { patients, getIsLoading, getIsError, getError } = usePatients();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPatients = patients?.filter(
    (patient) =>
      patient.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.phone?.includes(searchQuery),
  );

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 md:p-8 space-y-6">
      {/* Top Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Patients Directory
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage patient records and search medical histories.
          </p>
        </div>

        {/* Action Button */}
        <button className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 shadow-sm hover:shadow active:scale-[0.98]">
          <UserPlus className="w-4 h-4" />
          <span>Add New Patient</span>
        </button>
      </div>

      {/* Control Bar: Search Input */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name or phone number..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 shadow-sm"
          />
        </div>
      </div>

      {/* Content States */}
      {getIsLoading && (
        <div className="flex flex-col items-center justify-center py-20 text-slate-500 space-y-3">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          <p className="text-sm font-medium">Loading patient records...</p>
        </div>
      )}

      {getIsError && (
        <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p>Failed to load data: {getError?.message}</p>
        </div>
      )}

      {!getIsLoading && !getIsError && (
        <>
          {filteredPatients && filteredPatients.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPatients.map((patient) => (
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
                {searchQuery
                  ? "No results match your search query."
                  : "There are no patient records available yet."}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
