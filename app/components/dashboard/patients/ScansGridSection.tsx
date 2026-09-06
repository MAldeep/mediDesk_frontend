import { IScan, Patient } from "@/app/types/patient";
import { Eye, Trash2 } from "lucide-react";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
interface ScansGridSectionProps {
  patient: Patient;
  setSelectedScanUrl: Dispatch<SetStateAction<string | null>>;
  setScanToDelete: Dispatch<SetStateAction<IScan | null>>;
}
export default function ScansGridSection({
  patient,
  setScanToDelete,
  setSelectedScanUrl,
}: ScansGridSectionProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pt-1">
      {patient.scan?.map((scanItem: IScan, index: number) => (
        <div
          key={scanItem.publicId || index}
          className="group relative aspect-square rounded-xl overflow-hidden border border-slate-200 bg-slate-50 cursor-pointer shadow-xs hover:shadow-md transition-all"
          onClick={() => setSelectedScanUrl(scanItem.url)}
        >
          <Image
            src={scanItem.url}
            alt={`Scan ${index + 1}`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Overlay Actions */}
          <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button
              type="button"
              title="View Image"
              className="p-2 rounded-full bg-white/90 text-slate-800 hover:bg-white shadow-sm transition-transform hover:scale-110 cursor-pointer"
            >
              <Eye className="w-4 h-4" />
            </button>

            <button
              type="button"
              title="Delete Scan"
              onClick={(e) => {
                e.stopPropagation();
                setScanToDelete(scanItem);
              }}
              className="p-2 rounded-full bg-red-600/90 text-white hover:bg-red-600 shadow-sm transition-transform hover:scale-110 cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
