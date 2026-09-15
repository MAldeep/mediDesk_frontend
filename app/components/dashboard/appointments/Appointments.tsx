"use client";

import {
  Calendar,
  Clock,
  User,
  Search,
  Loader2,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import AddNewAppointmentBtn from "./AddNewAppointmentBtn";
import { useAppointment } from "@/app/hooks/appointments/useAppointment";
import type { Appointments } from "@/app/types/appointments";

export default function Appointments() {
  const {
    appointemntsRefetch,
    appointments,
    appointmentsError,
    appointmentsIsError,
    appointmentsIsLoading,
    search,
    setSearch,
    sort,
    setSort,
  } = useAppointment();

  // Helper formatting function for status styling
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-emerald-50 text-emerald-600 border-emerald-200/60";
      case "cancelled":
        return "bg-rose-50 text-rose-600 border-rose-200/60";
      case "scheduled":
      default:
        return "bg-amber-50 text-amber-600 border-amber-200/60";
    }
  };

  // Safe formatting for dates & times
  const formatDateTime = (isoString: string | Date) => {
    if (!isoString) return { date: "N/A", time: "N/A" };
    const d = new Date(isoString);
    return {
      date: d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      time: d.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    };
  };

  return (
    <div className="w-full flex-1 bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex flex-col gap-4">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-indigo-600" />
            Appointments
          </h2>
          <p className="text-xs text-slate-500">
            Manage and track clinic schedules
          </p>
        </div>

        {/* Action Button */}
        <AddNewAppointmentBtn />
      </div>

      {/* Controls / Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Live Search */}
        <div className="relative flex-1 min-w-50">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search || ""}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by patient name or doctor..."
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>

        {/* Sort Select */}
        <select
          value={sort || "-date"}
          onChange={(e) => setSort(e.target.value)}
          className="px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 cursor-pointer"
        >
          <option value="-date">Newest First</option>
          <option value="date">Oldest First</option>
          <option value="status">Status</option>
        </select>
      </div>

      {/* Appointments List State Rendering */}
      <div className="flex-1 overflow-y-auto space-y-3 min-h-55">
        {/* 1. Loading State */}
        {appointmentsIsLoading && (
          <div className="h-48 flex flex-col items-center justify-center gap-2 text-slate-400">
            <Loader2 className="w-6 h-6 animate-spin text-indigo-600" />
            <p className="text-xs">Loading appointments...</p>
          </div>
        )}

        {/* 2. Error State */}
        {appointmentsIsError && !appointmentsIsLoading && (
          <div className="h-48 flex flex-col items-center justify-center gap-2 text-red-500 bg-red-50/50 rounded-xl border border-red-100 p-4">
            <AlertCircle className="w-6 h-6" />
            <p className="text-xs font-semibold">
              {appointmentsError?.message || "Failed to load appointments"}
            </p>
            <button
              type="button"
              onClick={() => appointemntsRefetch()}
              className="inline-flex items-center gap-1 text-[11px] font-bold text-red-600 hover:underline mt-1 cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" /> Retry
            </button>
          </div>
        )}

        {/* 3. Empty State */}
        {!appointmentsIsLoading &&
          !appointmentsIsError &&
          (!appointments || appointments.length === 0) && (
            <div className="h-48 flex flex-col items-center justify-center gap-1.5 text-slate-400 border border-dashed border-slate-200 rounded-xl">
              <Calendar className="w-8 h-8 text-slate-300" />
              <p className="text-xs font-semibold text-slate-600">
                No appointments found
              </p>
              <p className="text-[11px]">
                Try adjusting your search or add a new schedule.
              </p>
            </div>
          )}

        {/* 4. Success State (Data List) */}
        {!appointmentsIsLoading &&
          !appointmentsIsError &&
          appointments &&
          appointments.map((apt: Appointments) => {
            // Safe extraction whether populated or raw string IDs
            const patientName =
              typeof apt.patient === "object" && apt.patient !== null
                ? apt.patient.name
                : "Unknown Patient";

            const doctorName =
              typeof apt.doctor === "object" && apt.doctor !== null
                ? apt.doctor.name
                : null;

            const { date, time } = formatDateTime(apt.date);

            return (
              <div
                key={apt._id}
                className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 hover:border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">
                      {patientName}
                    </h4>
                    {doctorName && (
                      <p className="text-[11px] text-slate-500">
                        Dr. {doctorName}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right hidden sm:block">
                    <p className="text-xs font-semibold text-slate-700 flex items-center gap-1 justify-end">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {time} ({apt.durationMinutes || 30} min)
                    </p>
                    <p className="text-[10px] text-slate-400">{date}</p>
                  </div>

                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-semibold border capitalize ${getStatusBadge(
                      apt.status,
                    )}`}
                  >
                    {apt.status}
                  </span>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
