import { CreateAppointmentInput } from "@/app/validations/appointment.schemas";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface ProcedureFieldProps {
  register: UseFormRegister<CreateAppointmentInput>;
  errors: FieldErrors<CreateAppointmentInput>;
}
export default function NewAppointmentProcedureField({
  errors,
  register,
}: ProcedureFieldProps) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-slate-700">
        Appointment Procedure <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        {...register("procedure")}
        placeholder="e.g., Dental Cleaning, Root Canal, Checkup"
        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 bg-white shadow-sm"
      />
      {errors.procedure && (
        <p className="text-sm text-red-600 mt-1">{errors.procedure.message}</p>
      )}
    </div>
  );
}
