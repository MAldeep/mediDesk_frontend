import { IScan } from "@/app/types/patient";
import { AlertTriangle, Loader2 } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
interface CustomDeleteConfirmationModalProps {
  deleteIsLoading: boolean;
  setScanToDelete: Dispatch<SetStateAction<IScan | null>>;
  ConfirmDeleteScan: () => void;
}
export default function CustomDeleteConfirmationModal({
  ConfirmDeleteScan,
  deleteIsLoading,
  setScanToDelete,
}: CustomDeleteConfirmationModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={() => !deleteIsLoading && setScanToDelete(null)}
    >
      <div
        className="bg-white border border-slate-200 rounded-2xl w-full max-w-sm p-6 shadow-xl space-y-4 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Delete Medical Scan?
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              This action cannot be undone. The image will be permanently
              removed.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 pt-2">
          <button
            type="button"
            disabled={deleteIsLoading}
            onClick={() => setScanToDelete(null)}
            className="px-3.5 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition-colors disabled:opacity-50 cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={deleteIsLoading}
            onClick={ConfirmDeleteScan}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-white bg-red-600 hover:bg-red-700 rounded-xl transition-all shadow-sm disabled:opacity-50 cursor-pointer"
          >
            {deleteIsLoading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Deleting...</span>
              </>
            ) : (
              <span>Delete</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
