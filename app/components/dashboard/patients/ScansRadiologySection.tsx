import { Patient } from "@/app/types/patient";
import { FileSpreadsheet, Plus } from "lucide-react";
interface ScansRadiologyProps {
  patient: Patient;
}
export default function ScansRadiologySection({
  patient,
}: ScansRadiologyProps) {
  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <FileSpreadsheet className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Scans & Radiology
            </h2>
            <p className="text-xs text-slate-500">
              X-Rays, Lab Reports, and Medical Imaging
            </p>
          </div>
        </div>

        <button className="inline-flex items-center gap-1.5 text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg transition-colors">
          <Plus className="w-3.5 h-3.5" />
          <span>Upload Scan</span>
        </button>
      </div>

      {/* Scans List / Empty State Placeholder */}
      {patient.scan && patient.scan.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {/* Scan Items will map here when IScan is implemented */}
        </div>
      ) : (
        <div className="py-10 border border-dashed border-slate-200 rounded-xl bg-slate-50/50 flex flex-col items-center justify-center text-center p-4">
          <FileSpreadsheet className="w-8 h-8 text-slate-300 mb-2" />
          <p className="text-xs font-medium text-slate-600">
            No scans uploaded yet
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Uploaded medical scans and files will appear here.
          </p>
        </div>
      )}
    </div>
  );
}
