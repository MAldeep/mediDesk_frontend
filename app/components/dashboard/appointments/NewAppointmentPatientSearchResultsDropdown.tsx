import { Patient } from "@/app/types/patient";
import { User } from "lucide-react";
interface PatientSearchResultsDropdownProps {
  filteredPatients: Patient[] | undefined;
  handleSelectPatient: (patient: Patient) => void;
  getIsLoading: boolean;
}
export default function NewAppointmentPatientSearchResultsDropdown({
  filteredPatients,
  getIsLoading,
  handleSelectPatient,
}: PatientSearchResultsDropdownProps) {
  return (
    <div className="absolute top-full left-0 right-0 mt-1 z-20 bg-white rounded-xl border border-slate-200 shadow-lg max-h-48 overflow-y-auto p-1 space-y-0.5">
      {filteredPatients && filteredPatients.length > 0 ? (
        filteredPatients.map((p: Patient) => (
          <button
            key={p._id}
            type="button"
            onClick={() => handleSelectPatient(p)}
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors flex items-center justify-between text-xs cursor-pointer"
          >
            <div>
              <p className="font-semibold text-slate-800">{p.name}</p>
              {p.phone && (
                <p className="text-[10px] text-slate-400">{p.phone}</p>
              )}
            </div>
            <User className="w-3.5 h-3.5 text-slate-400" />
          </button>
        ))
      ) : (
        <div className="p-3 text-center text-xs text-slate-400">
          {getIsLoading ? "Loading patients..." : "No patients found"}
        </div>
      )}
    </div>
  );
}
