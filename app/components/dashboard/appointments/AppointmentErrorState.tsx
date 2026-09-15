import { AlertCircle, RefreshCw } from "lucide-react";
interface AppointmentErrorStateProps {
  message?: string;
  appointemntsRefetch: () => void;
}
export default function AppointmentErrorState({
  message,
  appointemntsRefetch,
}: AppointmentErrorStateProps) {
  return (
    <div className="h-48 flex flex-col items-center justify-center gap-2 text-red-500 bg-red-50/50 rounded-xl border border-red-100 p-4">
      <AlertCircle className="w-6 h-6" />
      <p className="text-xs font-semibold">
        {message || "Failed to load appointments"}
      </p>
      <button
        type="button"
        onClick={() => appointemntsRefetch()}
        className="inline-flex items-center gap-1 text-[11px] font-bold text-red-600 hover:underline mt-1 cursor-pointer"
      >
        <RefreshCw className="w-3 h-3" /> Retry
      </button>
    </div>
  );
}

//
