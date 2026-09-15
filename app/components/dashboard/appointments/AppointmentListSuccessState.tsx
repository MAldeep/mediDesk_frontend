"use client";

import { Clock, User, Loader2 } from "lucide-react";
import type { Appointments, AppointmentStatus } from "@/app/types/appointments";

interface Props {
  apt: Appointments;
  patientName: string;
  doctorName: string | null;
  date: string;
  time: string;
  getStatusBadge: (status: string) => string;
  onUpdateStatus: (id: string, newStatus: AppointmentStatus) => void;
  isUpdating: boolean;
}

export default function AppointmentListSuccessState({
  apt,
  patientName,
  doctorName,
  date,
  time,
  getStatusBadge,
  onUpdateStatus,
  isUpdating,
}: Props) {
  return (
    <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 hover:border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-all">
      {/* Patient & Doctor Info */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs shrink-0">
          <User className="w-4 h-4" />
        </div>
        <div>
          <h4 className="text-xs font-bold text-slate-800">{patientName}</h4>
          {doctorName && (
            <p className="text-[11px] text-slate-500">Dr. {doctorName}</p>
          )}
        </div>
      </div>

      {/* Timing & Status Select Control */}
      <div className="flex items-center gap-4">
        <div className="text-right hidden sm:block">
          <p className="text-xs font-semibold text-slate-700 flex items-center gap-1 justify-end">
            <Clock className="w-3 h-3 text-slate-400" />
            {time} ({apt.durationMinutes || 30} min)
          </p>
          <p className="text-[10px] text-slate-400">{date}</p>
        </div>

        {/* Interactive Status Dropdown */}
        <div className="relative flex items-center">
          {isUpdating ? (
            <div className="px-2.5 py-1 rounded-full text-[10px] font-semibold border bg-slate-100 text-slate-500 border-slate-200 flex items-center gap-1">
              <Loader2 className="w-3 h-3 animate-spin" />
              <span>Updating...</span>
            </div>
          ) : (
            <select
              value={apt.status}
              onChange={(e) =>
                onUpdateStatus(apt._id, e.target.value as AppointmentStatus)
              }
              className={`px-2.5 py-1 rounded-full text-[10px] font-semibold border capitalize cursor-pointer focus:outline-none transition-colors ${getStatusBadge(
                apt.status,
              )}`}
            >
              <option value="scheduled" className="bg-white text-slate-700">
                Scheduled
              </option>
              <option value="completed" className="bg-white text-slate-700">
                Completed
              </option>
              <option value="cancelled" className="bg-white text-slate-700">
                Cancelled
              </option>
            </select>
          )}
        </div>
      </div>
    </div>
  );
}
