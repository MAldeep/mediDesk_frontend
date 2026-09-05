"use client";

import AppointmentsHistorySection from "@/app/components/dashboard/patients/AppointmentsHistorySection";
import BackNavigation from "@/app/components/dashboard/patients/BackNavigation";
import PersonalInfoCard from "@/app/components/dashboard/patients/PersonalInfoCard";
import ScansRadiologySection from "@/app/components/dashboard/patients/ScansRadiologySection";
import { usePatients } from "@/app/hooks/patients/usePatients";
import { useAuthStore } from "@/app/stores/useAuthStore";
import { Loader2, AlertCircle } from "lucide-react";
import { useParams } from "next/navigation";

export default function PatientPage() {
  const params = useParams();
  const id = params?.id as string;
  const { getOneError, getOneIsError, getOneIsLoading, patient } = usePatients(
    undefined,
    id,
  );
  const userRole = useAuthStore((state) => state.user)?.role;
  if (getOneIsLoading) {
    return (
      <div className="min-h-screen bg-slate-50/50 flex flex-col items-center justify-center p-6 space-y-3">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        <p className="text-sm font-medium text-slate-500">
          Loading patient profile...
        </p>
      </div>
    );
  }
  if (getOneIsError || !patient) {
    return (
      <div className="min-h-screen bg-slate-50/50 p-6 md:p-8 space-y-4">
        <BackNavigation userRole={userRole} />
        <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p>
            Failed to load patient record:{" "}
            {getOneError?.message || "Patient not found"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 md:p-8 space-y-6">
      {/* Back Navigation & Actions */}
      <BackNavigation userRole={userRole} />

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Personal Info Card */}
        <PersonalInfoCard patient={patient} />

        {/* Right Column: Scans & Medical Records + Appointments */}
        <div className="lg:col-span-2 space-y-6">
          {/* Scans & Radiology Section Placeholder */}
          <ScansRadiologySection patient={patient} />

          {/* Appointments History Section */}
          <AppointmentsHistorySection patient={patient} />
        </div>
      </div>
    </div>
  );
}
