import Patients from "@/app/components/dashboard/patients/Patients";

export default function UserDashboard() {
  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row">
      <main className="flex-1 bg-slate-200-950 flex flex-col gap-6 p-2">
        {/* Appointments */}
        <div className="w-full flex-1 bg-amber-400 rounded-2xl">
          Appointments
        </div>
        {/* Patients */}
        <Patients />
      </main>
    </div>
  );
}
