import { FileSpreadsheet, Plus } from "lucide-react";
interface ScansRadiologyHeaderProps {
  handleOpenUpload: () => void;
}
export default function ScansRadiologySectionHeader({
  handleOpenUpload,
}: ScansRadiologyHeaderProps) {
  return (
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

      <button
        type="button"
        onClick={handleOpenUpload}
        className="inline-flex items-center gap-1.5 text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
      >
        <Plus className="w-3.5 h-3.5" />
        <span>Upload Scan</span>
      </button>
    </div>
  );
}
