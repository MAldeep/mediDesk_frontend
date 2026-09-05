import { Patient } from "@/app/types/patient";
import { FileText, MapPin, Phone } from "lucide-react";
interface PersonalCardProps {
  patient: Patient;
}
export default function PersonalInfoCard({ patient }: PersonalCardProps) {
  return (
    <div className="lg:col-span-1 space-y-6">
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-6">
        {/* Header / Avatar */}
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

        {/* Info Items List */}
        <div className="space-y-4 text-sm">
          <div className="flex items-start gap-3 text-slate-600">
            <Phone className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-xs text-slate-400 font-medium">Phone Number</p>
              <p className="text-slate-800 font-medium">{patient.phone}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 text-slate-600">
            <MapPin className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-xs text-slate-400 font-medium">Address</p>
              <p className="text-slate-800 font-medium">
                {patient.address || "N/A"}
              </p>
            </div>
          </div>
        </div>

        {/* Medical History Section */}
        <div className="border-t border-slate-100 pt-5 space-y-2">
          <div className="flex items-center gap-2 text-slate-800 font-semibold text-sm">
            <FileText className="w-4 h-4 text-blue-600" />
            <span>Medical History</span>
          </div>
          <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed">
            {patient.history || "No prior medical history recorded."}
          </p>
        </div>
      </div>
    </div>
  );
}
