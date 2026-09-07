"use client";

import { Calendar, Clock, Plus, User, Search, Filter } from "lucide-react";

export default function Appointments() {
  const dummyAppointments = [
    {
      id: "1",
      patientName: "Ahmed Hassan",
      type: "Dental Checkup",
      time: "10:30 AM",
      date: "Today",
      status: "Confirmed",
    },
    {
      id: "2",
      patientName: "Sara Mohamed",
      type: "Root Canal",
      time: "02:00 PM",
      date: "Today",
      status: "Pending",
    },
    {
      id: "3",
      patientName: "Omar Mahmoud",
      type: "Teeth Whitening",
      time: "04:15 PM",
      date: "Tomorrow",
      status: "Confirmed",
    },
  ];

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
        <button
          type="button"
          onClick={() => {
            /* Your Add Appointment Logic */
          }}
          className="inline-flex items-center justify-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-xl transition-all shadow-xs cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Appointment</span>
        </button>
      </div>

      {/* Controls / Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex-1 min-w-50">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search appointments..."
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors"
        >
          <Filter className="w-3.5 h-3.5" />
          <span>Filter</span>
        </button>
      </div>

      {/* Appointments List */}
      <div className="flex-1 overflow-y-auto space-y-3 min-h-55">
        {dummyAppointments.map((apt) => (
          <div
            key={apt.id}
            className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 hover:border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs shrink-0">
                <User className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800">
                  {apt.patientName}
                </h4>
                <p className="text-[11px] text-slate-500">{apt.type}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  {apt.time}
                </p>
                <p className="text-[10px] text-slate-400">{apt.date}</p>
              </div>

              <span
                className={`px-2.5 py-1 rounded-full text-[10px] font-semibold ${
                  apt.status === "Confirmed"
                    ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                    : "bg-amber-50 text-amber-600 border border-amber-100"
                }`}
              >
                {apt.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
