import { Calendar } from "lucide-react";
import AddNewAppointmentBtn from "./AddNewAppointmentBtn";

export default function AppointmentHeader() {
  return (
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
  );
}
