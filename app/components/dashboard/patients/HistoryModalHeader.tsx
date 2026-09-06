import { Patient } from "@/app/types/patient";
import { FileText, X } from "lucide-react";
interface HistoryModalProps {
  patient: Patient;
  handleCloseModal: () => void;
  updateIsLoading: boolean;
}
export default function HistoryModalHeader({
  handleCloseModal,
  patient,
  updateIsLoading,
}: HistoryModalProps) {
  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
          <FileText className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-900">
            Edit Medical History
          </h3>
          <p className="text-xs text-slate-500">Patient: {patient.name}</p>
        </div>
      </div>
      <button
        type="button"
        onClick={handleCloseModal}
        disabled={updateIsLoading}
        className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors disabled:opacity-50"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}
