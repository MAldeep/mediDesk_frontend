import { Calendar } from "lucide-react";

export default function AppointmentListEmptyState() {
  return (
    <div className="h-48 flex flex-col items-center justify-center gap-1.5 text-slate-400 border border-dashed border-slate-200 rounded-xl">
      <Calendar className="w-8 h-8 text-slate-300" />
      <p className="text-xs font-semibold text-slate-600">
        No appointments found
      </p>
      <p className="text-[11px]">
        Try adjusting your search or add a new schedule.
      </p>
    </div>
  );
}
