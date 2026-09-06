import { Patient } from "@/app/types/patient";
import { MapPin, Phone } from "lucide-react";
interface PatientCardInforListProps {
  patient: Patient;
}
export default function PatientCardInfoList({
  patient,
}: PatientCardInforListProps) {
  return (
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
  );
}
