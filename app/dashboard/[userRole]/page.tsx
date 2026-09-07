import Patients from "@/app/components/dashboard/patients/Patients";
import Appointments from "@/app/components/dashboard/appointments/Appointments";
import InviteUserBtn from "@/app/components/dashboard/inviteUser/InviteUserBtn";

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
          <InviteUserBtn />
        </div>

        {/* Appointments Section */}
        <Appointments />

        {/* Patients Section */}
        <Patients />
      </main>
    </div>
  );
}
