"use client";
import PatientPreview from "./PatientPreview";
import AddNewPatientBtn from "./AddNewPatientBtn";

export default function Patients() {
  return (
    <div className="w-full flex flex-col gap-6 p-4 sm:p-6">
      {/* Top Header & Main Action */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200/80">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Patients
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage your clinic&apos;s patient records and view recent activity.
          </p>
        </div>

        <AddNewPatientBtn />
      </div>

      {/* Main Content Area */}
      <div className="w-full">
        <PatientPreview />
      </div>
    </div>
  );
}
