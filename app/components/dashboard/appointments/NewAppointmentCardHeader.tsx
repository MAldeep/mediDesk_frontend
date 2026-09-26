import { Calendar } from "lucide-react";

export default function NewAppointmentCardHeader() {
  return (
    <div className="p-6 bg-slate-900 text-white flex items-center gap-4">
      <div className="w-12 h-12 rounded-xl bg-indigo-600/30 border border-indigo-400/30 flex items-center justify-center text-indigo-400 shrink-0">
        <Calendar className="w-6 h-6" />
      </div>
      <div>
        <h1 className="text-lg font-bold">Schedule New Appointment</h1>
        <p className="text-xs text-slate-400">
          Select doctor, search for patient and set appointment slot
        </p>
      </div>
    </div>
  );
}
