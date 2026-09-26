import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NewAppointmentHeader() {
  const router = useRouter();
  return (
    <div className="flex items-center justify-between">
      <button
        type="button"
        onClick={() => router.back()}
        className="inline-flex items-center gap-2 text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Appointments</span>
      </button>
    </div>
  );
}
