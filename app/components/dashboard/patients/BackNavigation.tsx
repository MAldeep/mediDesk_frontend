import { ArrowLeft, Plus } from "lucide-react";
import Link from "next/link";
interface BackNavProps {
  userRole: string | undefined;
}
export default function BackNavigation({ userRole }: BackNavProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <Link
        href={`/dashboard/${userRole}/patients`}
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors w-fit"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Patients Directory</span>
      </Link>

      <div className="flex items-center gap-3">
        <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all shadow-sm">
          <Plus className="w-4 h-4" />
          <span>New Appointment</span>
        </button>
      </div>
    </div>
  );
}
