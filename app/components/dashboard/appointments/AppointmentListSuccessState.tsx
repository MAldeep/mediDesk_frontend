import { Appointments } from "@/app/types/appointments";
import { Clock, User } from "lucide-react";
interface AppointmentSuccessStateProps {
  apt: Appointments;
  doctorName: string | null;
  patientName: string;
  time: string;
  date: string;
  getStatusBadge: (status: string) => string;
}
export default function AppointmentListSuccessState({
  apt,
  date,
  doctorName,
  getStatusBadge,
  patientName,
  time,
}: AppointmentSuccessStateProps) {
  return (
    <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 hover:border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-all">
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
}
