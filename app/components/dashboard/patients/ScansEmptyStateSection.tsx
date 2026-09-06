import { FileSpreadsheet } from "lucide-react";
import React from "react";

export default function ScansEmptyStateSection() {
  return (
    <div className="py-10 border border-dashed border-slate-200 rounded-xl bg-slate-50/50 flex flex-col items-center justify-center text-center p-4">
      <FileSpreadsheet className="w-8 h-8 text-slate-300 mb-2" />
      <p className="text-xs font-medium text-slate-600">
        No scans uploaded yet
      </p>
      <p className="text-[11px] text-slate-400 mt-0.5">
        Uploaded medical scans and files will appear here.
      </p>
    </div>
  );
}
