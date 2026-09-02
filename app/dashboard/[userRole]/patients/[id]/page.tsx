"use client";

import { usePatients } from "@/app/hooks/patients/usePatients";
import { useAuthStore } from "@/app/stores/useAuthStore";
import {
  Phone,
  MapPin,
  Calendar,
  FileText,
  FileSpreadsheet,
  Clock,
  ArrowLeft,
  Loader2,
  AlertCircle,
  Plus,
} from "lucide-react";
import Link from "next/link";
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
        <Link
          href={`/dashboard/${userRole}/patients`}
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Patients</span>
        </Link>
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <Link
          href="/dashboard/patients"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors w-fit"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Patients Directory</span>
        </Link>

        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all shadow-sm">
            <Plus className="w-4 h-4" />
            <span>New Appointment</span>
          </button>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Personal Info Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-6">
            {/* Header / Avatar */}
            <div className="flex items-center gap-4 border-b border-slate-100 pb-5">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center font-bold text-xl shrink-0">
                {patient.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900 leading-snug">
                  {patient.name}
                </h1>
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${
                      patient.gender === "male"
                        ? "bg-blue-50 text-blue-700 border border-blue-200"
                        : "bg-pink-50 text-pink-700 border border-pink-200"
                    }`}
                  >
                    {patient.gender}
                  </span>
                  <span className="text-xs text-slate-400">•</span>
                  <span className="text-xs text-slate-600 font-medium">
                    {patient.age} Yrs
                  </span>
                </div>
              </div>
            </div>

            {/* Info Items List */}
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3 text-slate-600">
                <Phone className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-slate-400 font-medium">
                    Phone Number
                  </p>
                  <p className="text-slate-800 font-medium">{patient.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-slate-600">
                <MapPin className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-slate-400 font-medium">Address</p>
                  <p className="text-slate-800 font-medium">
                    {patient.address || "N/A"}
                  </p>
                </div>
              </div>
            </div>

            {/* Medical History Section */}
            <div className="border-t border-slate-100 pt-5 space-y-2">
              <div className="flex items-center gap-2 text-slate-800 font-semibold text-sm">
                <FileText className="w-4 h-4 text-blue-600" />
                <span>Medical History</span>
              </div>
              <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed">
                {patient.history || "No prior medical history recorded."}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Scans & Medical Records + Appointments */}
        <div className="lg:col-span-2 space-y-6">
          {/* Scans & Radiology Section Placeholder */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <FileSpreadsheet className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    Scans & Radiology
                  </h2>
                  <p className="text-xs text-slate-500">
                    X-Rays, Lab Reports, and Medical Imaging
                  </p>
                </div>
              </div>

              <button className="inline-flex items-center gap-1.5 text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg transition-colors">
                <Plus className="w-3.5 h-3.5" />
                <span>Upload Scan</span>
              </button>
            </div>

            {/* Scans List / Empty State Placeholder */}
            {patient.scan && patient.scan.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {/* Scan Items will map here when IScan is implemented */}
              </div>
            ) : (
              <div className="py-10 border border-dashed border-slate-200 rounded-xl bg-slate-50/50 flex flex-col items-center justify-center text-center p-4">
                <FileSpreadsheet className="w-8 h-8 text-slate-300 mb-2" />
                <p className="text-xs font-medium text-slate-600">
                  No scans uploaded yet
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Uploaded medical scans and files will appear here.
                </p>
              </div>
            )}
          </div>

          {/* Appointments History Section */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Appointments History
                </h2>
                <p className="text-xs text-slate-500">
                  Past and upcoming clinic visits
                </p>
              </div>
            </div>

            {patient.appointments && patient.appointments.length > 0 ? (
              <div className="space-y-2 pt-1">
                {patient.appointments.map((apt, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/50 text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-slate-400" />
                      <span className="font-medium text-slate-700">
                        Visit #{index + 1}
                      </span>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-200 text-slate-700 capitalize">
                      {typeof apt === "string" ? apt : "Completed"}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 border border-dashed border-slate-200 rounded-xl bg-slate-50/50 flex flex-col items-center justify-center text-center p-4">
                <Calendar className="w-8 h-8 text-slate-300 mb-2" />
                <p className="text-xs font-medium text-slate-600">
                  No appointment history
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
