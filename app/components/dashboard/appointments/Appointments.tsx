"use client";

import { Loader2 } from "lucide-react";
import { useAppointment } from "@/app/hooks/appointments/useAppointment";
import type { Appointments } from "@/app/types/appointments";
import AppointmentHeader from "./AppointmentHeader";
import AppointmentControlAndFilterBar from "./AppointmentControlAndFilterBar";
import AppointmentErrorState from "./AppointmentErrorState";
import AppointmentListEmptyState from "./AppointmentListEmptyState";
import AppointmentListSuccessState from "./AppointmentListSuccessState";

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
      <AppointmentHeader />

      {/* Controls / Filter Bar */}
      <AppointmentControlAndFilterBar
        search={search}
        setSearch={setSearch}
        sort={sort}
        setSort={setSort}
      />

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
          <AppointmentErrorState
            message={appointmentsError?.message}
            appointemntsRefetch={appointemntsRefetch}
          />
        )}

        {/* 3. Empty State */}
        {!appointmentsIsLoading &&
          !appointmentsIsError &&
          (!appointments || appointments.length === 0) && (
            <AppointmentListEmptyState />
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
              <AppointmentListSuccessState
                key={apt._id}
                apt={apt}
                date={date}
                doctorName={doctorName}
                getStatusBadge={getStatusBadge}
                patientName={patientName}
                time={time}
              />
            );
          })}
      </div>
    </div>
  );
}
