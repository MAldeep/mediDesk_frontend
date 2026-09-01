import { Patient } from "@/app/types/patient";

interface PatientCardProps {
  patient: Patient;
}

export default function PatientCard({ patient }: PatientCardProps) {
  const initials = patient.name
    ? patient.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "PT";

  const appointmentsCount = patient.appointments?.length || 0;

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between gap-3">
      {/* Top Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center font-semibold text-xs shrink-0">
            {initials}
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-slate-900 text-sm truncate">
              {patient.name}
            </h3>
            <p className="text-xs text-slate-500 truncate mt-0.5">
              {patient.phone || "No phone"}
            </p>
          </div>
        </div>

        {/* Gender Badge */}
        <span
          className={`text-[11px] font-medium px-2 py-0.5 rounded-full capitalize shrink-0 ${
            patient.gender?.toLowerCase() === "female"
              ? "bg-rose-50 text-rose-600 border border-rose-100"
              : "bg-blue-50 text-blue-600 border border-blue-100"
          }`}
        >
          {patient.gender}
        </span>
      </div>

      {/* Footer Info */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <div>
          <span className="font-semibold text-slate-700">{patient.age}</span>{" "}
          yrs old
        </div>

        <div className="flex items-center gap-1 font-medium bg-slate-50 border border-slate-200/80 px-2.5 py-1 rounded-md text-slate-700">
          <span className="text-blue-600 font-bold">{appointmentsCount}</span>
          <span>{appointmentsCount === 1 ? "Appt" : "Appts"}</span>
        </div>
      </div>
    </div>
  );
}
