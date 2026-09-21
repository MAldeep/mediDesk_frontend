"use client";

import { Patient } from "@/app/types/patient";
import { AppointmentStatus } from "@/app/types/appointments";
import { Calendar, Clock, FileText, Loader2, Stethoscope } from "lucide-react";

interface AppointmentHistoryProps {
  patient: Patient;
  onUpdateStatus?: (id: string, newStatus: AppointmentStatus) => void;
  updatingId?: string | null;
}

export default function AppointmentsHistorySection({
  patient,
  onUpdateStatus,
  updatingId,
}: AppointmentHistoryProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "scheduled":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "cancelled":
        return "bg-rose-50 text-rose-700 border-rose-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
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
        <div className="space-y-3 pt-1">
          {patient.appointments.map((apt, index) => {
            const isThisUpdating = updatingId === apt._id;

            return (
              <div
                key={apt._id || index}
                className="p-4 rounded-xl border border-slate-100 hover:border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-all space-y-2.5"
              >
                {/* Row 1: Visit Counter & Status Dropdown */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                    Visit #{index + 1}
                  </span>

                  {/* Status Selector / Dropdown */}
                  <div className="relative flex items-center">
                    {isThisUpdating ? (
                      <div className="px-2.5 py-1 rounded-full text-[10px] font-semibold border bg-slate-100 text-slate-500 border-slate-200 flex items-center gap-1">
                        <Loader2 className="w-3 h-3 animate-spin" />
                        <span>Updating...</span>
                      </div>
                    ) : onUpdateStatus ? (
                      <select
                        value={apt.status}
                        onChange={(e) =>
                          onUpdateStatus(
                            apt._id,
                            e.target.value as AppointmentStatus,
                          )
                        }
                        className={`px-2.5 py-1 rounded-full text-[10px] font-semibold border capitalize cursor-pointer focus:outline-none transition-colors ${getStatusBadge(
                          apt.status,
                        )}`}
                      >
                        <option
                          value="scheduled"
                          className="bg-white text-slate-700"
                        >
                          Scheduled
                        </option>
                        <option
                          value="completed"
                          className="bg-white text-slate-700"
                        >
                          Completed
                        </option>
                        <option
                          value="cancelled"
                          className="bg-white text-slate-700"
                        >
                          Cancelled
                        </option>
                      </select>
                    ) : (
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border capitalize ${getStatusBadge(
                          apt.status,
                        )}`}
                      >
                        {apt.status}
                      </span>
                    )}
                  </div>
                </div>

                {/* Row 2: Date & Time Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 pt-1 border-t border-slate-200/50">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>
                      {apt.date
                        ? new Date(apt.date).toLocaleDateString()
                        : "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>
                      {apt.date.toString() || "N/A"}{" "}
                      {apt.durationMinutes
                        ? `(${apt.durationMinutes} min)`
                        : ""}
                    </span>
                  </div>
                </div>

                {/* Row 3: Procedure Badge */}
                {apt.procedure && (
                  <div className="flex items-center gap-1.5 text-xs pt-1">
                    <Stethoscope className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                    <span className="font-medium text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-100 text-[11px]">
                      {apt.procedure}
                    </span>
                  </div>
                )}

                {/* Row 4: Notes (if available) */}
                {apt.notes && (
                  <div className="flex items-start gap-1.5 text-xs pt-1 text-slate-500 bg-white/80 p-2.5 rounded-lg border border-slate-100">
                    <FileText className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <p className="italic text-[11px] leading-relaxed">
                      {apt.notes}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
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
  );
}
