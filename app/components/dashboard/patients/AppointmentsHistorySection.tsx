import { Patient } from "@/app/types/patient";
import { Calendar, Clock } from "lucide-react";
interface AppointmentHistoryProps {
  patient: Patient;
}
export default function AppointmentsHistorySection({
  patient,
}: AppointmentHistoryProps) {
  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-4">
      <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
        <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
          <Calendar className="w-4 h-4" />
        </div>
        <div>
          <h2 className="text-base font-bold text-slate-900">
            Appointments History
          </h2>
          <p className="text-xs text-slate-500">
            Past and upcoming clinic visits
          </p>
        </div>
      </div>

      {patient.appointments && patient.appointments.length > 0 ? (
        <div className="space-y-2 pt-1">
          {patient.appointments.map((apt, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/50 text-xs"
            >
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-slate-400" />
                <span className="font-medium text-slate-700">
                  Visit #{index + 1}
                </span>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-200 text-slate-700 capitalize">
                {typeof apt === "string" ? apt : "Completed"}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-8 border border-dashed border-slate-200 rounded-xl bg-slate-50/50 flex flex-col items-center justify-center text-center p-4">
          <Calendar className="w-8 h-8 text-slate-300 mb-2" />
          <p className="text-xs font-medium text-slate-600">
            No appointment history
          </p>
        </div>
      )}
    </div>
  );
}
