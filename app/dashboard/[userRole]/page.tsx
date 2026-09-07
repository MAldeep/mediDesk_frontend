"use client";

import Patients from "@/app/components/dashboard/patients/Patients";
import Appointments from "@/app/components/dashboard/appointments/Appointments";
import { UserPlus } from "lucide-react";

export default function UserDashboard() {
  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row bg-slate-50">
      <main className="flex-1 flex flex-col gap-6 p-4 md:p-6">
        <div className="w-full flex items-center justify-between bg-white border border-slate-200/80 p-4 rounded-2xl shadow-xs">
          <div>
            <h1 className="text-xl font-bold text-slate-900">Dashboard</h1>
            <p className="text-xs text-slate-500">
              Overview of your clinic operations
            </p>
          </div>

          {/* Admin Invite Button */}
          <button
            type="button"
            onClick={() => {
              /* Admin Invitation Logic Modal */
            }}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200/60 hover:bg-indigo-100 active:bg-indigo-200 rounded-xl transition-all shadow-2xs cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            <span>Invite Doctor / Staff</span>
          </button>
        </div>

        {/* Appointments Section */}
        <Appointments />

        {/* Patients Section */}
        <Patients />
      </main>
    </div>
  );
}
