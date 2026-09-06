import { Patient } from "@/app/types/patient";
import { Edit2, FileText, Plus } from "lucide-react";
interface PatientCardMedicalHistoryProps {
  patient: Patient;
  handleOpenModal: () => void;
}
export default function PatientCardMedicalHistorySection({
  handleOpenModal,
  patient,
}: PatientCardMedicalHistoryProps) {
  return (
    <div className="border-t border-slate-100 pt-5 space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-slate-800 font-semibold text-sm">
          <FileText className="w-4 h-4 text-blue-600" />
          <span>Medical History</span>
        </div>

        <button
          type="button"
          onClick={handleOpenModal}
          className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-2 py-1 rounded-lg transition-colors cursor-pointer"
        >
          {patient.history ? (
            <>
              <Edit2 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </>
          ) : (
            <>
              <Plus className="w-3.5 h-3.5" />
              <span>Add History</span>
            </>
          )}
        </button>
      </div>

      <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed min-h-15 whitespace-pre-wrap">
        {patient.history || "No prior medical history recorded."}
      </p>
    </div>
  );
}
