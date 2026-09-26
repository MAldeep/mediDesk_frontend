import { Patient } from "@/app/types/patient";
import { Phone, User, X } from "lucide-react";
interface SelectedPatientCardProps {
  selectedPatient: Patient;
  handleClearPatient: () => void;
}
export default function NewAppointmentSelectedPatientCard({
  handleClearPatient,
  selectedPatient,
}: SelectedPatientCardProps) {
  return (
    <div className="flex items-center justify-between p-3 rounded-xl bg-indigo-50/60 border border-indigo-100 text-slate-800">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-indigo-600/10 text-indigo-600 flex items-center justify-center font-bold text-xs">
          <User className="w-4 h-4" />
        </div>
        <div>
          <p className="text-xs font-bold text-slate-900">
            {selectedPatient.name}
          </p>
          {selectedPatient.phone && (
            <p className="text-[11px] text-slate-500 flex items-center gap-1">
              <Phone className="w-3 h-3" /> {selectedPatient.phone}
            </p>
          )}
        </div>
      </div>
      <button
        type="button"
        onClick={handleClearPatient}
        className="p-1 rounded-lg text-slate-400 hover:text-red-500 hover:bg-white transition-colors cursor-pointer"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
