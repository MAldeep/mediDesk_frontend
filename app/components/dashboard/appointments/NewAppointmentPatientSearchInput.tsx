import { Loader2, Search } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
interface PatientSearchInputProps {
  patientSearchQuery: string;
  setPatientSearchQuery: Dispatch<SetStateAction<string>>;
  setIsPatientDropdownOpen: Dispatch<SetStateAction<boolean>>;
  getIsLoading: boolean;
}

export default function NewAppointmentPatientSearchInput({
  getIsLoading,
  patientSearchQuery,
  setIsPatientDropdownOpen,
  setPatientSearchQuery,
}: PatientSearchInputProps) {
  return (
    <div className="relative">
      <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
      <input
        type="text"
        placeholder="Search patient by name or phone..."
        value={patientSearchQuery}
        onChange={(e) => {
          setPatientSearchQuery(e.target.value);
          setIsPatientDropdownOpen(true);
        }}
        onFocus={() => setIsPatientDropdownOpen(true)}
        className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all text-slate-800"
      />
      {getIsLoading && (
        <Loader2 className="w-4 h-4 text-slate-400 animate-spin absolute right-3.5 top-1/2 -translate-y-1/2" />
      )}
    </div>
  );
}
