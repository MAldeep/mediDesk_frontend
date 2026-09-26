import { CreateAppointmentInput } from "@/app/validations/appointment.schemas";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface NotesFieldProps {
  register: UseFormRegister<CreateAppointmentInput>;
  errors: FieldErrors<CreateAppointmentInput>;
}
export default function NewAppointmentNotesField({
  errors,
  register,
}: NotesFieldProps) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-slate-700">
        Notes <span className="text-slate-400 font-normal">(Optional)</span>
      </label>
      <textarea
        {...register("notes")}
        rows={3}
        placeholder="Add any medical notes or special instructions..."
        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 bg-white shadow-sm resize-none"
      />
      {errors.notes && (
        <p className="text-sm text-red-600 mt-1">{errors.notes.message}</p>
      )}
    </div>
  );
}
