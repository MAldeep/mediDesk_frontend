import { Patient } from "@/app/types/patient";

interface PatinetCardHeaderProps {
  patient: Patient;
}
export default function PatientCardHeader({ patient }: PatinetCardHeaderProps) {
  return (
    <div className="flex items-center gap-4 border-b border-slate-100 pb-5">
      <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center font-bold text-xl shrink-0">
        {patient.name?.charAt(0).toUpperCase()}
      </div>
      <div>
        <h1 className="text-xl font-bold text-slate-900 leading-snug">
          {patient.name}
        </h1>
        <div className="flex items-center gap-2 mt-1">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${
              patient.gender === "male"
                ? "bg-blue-50 text-blue-700 border border-blue-200"
                : "bg-pink-50 text-pink-700 border border-pink-200"
            }`}
          >
            {patient.gender}
          </span>
          <span className="text-xs text-slate-400">•</span>
          <span className="text-xs text-slate-600 font-medium">
            {patient.age} Yrs
          </span>
        </div>
      </div>
    </div>
  );
}
