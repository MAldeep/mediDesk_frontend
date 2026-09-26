import FormError from "@/app/(auth)/Auth_Components/FormError";
import { CreateAppointmentInput } from "@/app/validations/appointment.schemas";
import { UserCheck } from "lucide-react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
interface DoctorOption {
  _id: string;
  name: string;
  specialty?: string;
}
interface DoctorSelectionProps {
  register: UseFormRegister<CreateAppointmentInput>;
  doctorIsLoading?: boolean;
  doctors?: DoctorOption[];
  doctorIsError?: boolean;
  doctorError?: { message?: string } | null;
  errors: FieldErrors;
}
export default function NewAppointmentDoctorSelectionDropDown({
  register,
  doctors,
  doctorIsLoading,
  doctorIsError,
  doctorError,
  errors,
}: DoctorSelectionProps) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold text-slate-700">
        Assign Doctor <span className="text-red-500">*</span>
      </label>
      <div className="relative">
        <UserCheck className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 z-10" />
        <select
          {...register("doctor")}
          disabled={doctorIsLoading}
          className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all text-slate-800 appearance-none cursor-pointer disabled:opacity-50"
        >
          <option value="">
            {doctorIsLoading ? "Loading doctors..." : "-- Select Doctor --"}
          </option>
          {doctors?.map((doc: DoctorOption) => (
            <option key={doc._id} value={doc._id}>
              {doc.name} {doc.specialty ? `(${doc.specialty})` : ""}
            </option>
          ))}
        </select>
      </div>
      {doctorIsError && (
        <p className="text-[11px] text-red-500">{doctorError?.message}</p>
      )}
      {errors.doctor && (
        <FormError
          error={
            typeof errors.doctor.message === "string"
              ? errors.doctor.message
              : undefined
          }
        />
      )}
    </div>
  );
}
