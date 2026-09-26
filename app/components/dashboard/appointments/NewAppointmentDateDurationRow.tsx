import FormError from "@/app/(auth)/Auth_Components/FormError";
import { CreateAppointmentInput } from "@/app/validations/appointment.schemas";
import { Calendar, Clock } from "lucide-react";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
interface DateDurationRowProps {
  setValue: UseFormSetValue<CreateAppointmentInput>;
  errors: FieldErrors<CreateAppointmentInput>;
  register: UseFormRegister<CreateAppointmentInput>;
}
export default function NewAppointmentDateDurationRow({
  errors,
  register,
  setValue,
}: DateDurationRowProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Date & Time Picker */}
      <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-slate-700">
          Date & Time <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="datetime-local"
            onChange={(e) => {
              const val = e.target.value;
              if (val) {
                setValue("date", new Date(val).toISOString(), {
                  shouldValidate: true,
                });
              }
            }}
            className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all text-slate-800"
          />
        </div>
        {errors.date && <FormError error={errors.date.message} />}
      </div>

      {/* Duration Minutes */}
      <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-slate-700">
          Duration (Minutes)
        </label>
        <div className="relative">
          <Clock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="number"
            placeholder="30"
            {...register("durationMinutes", { valueAsNumber: true })}
            className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all text-slate-800"
          />
        </div>
        {errors.durationMinutes && (
          <FormError error={errors.durationMinutes.message} />
        )}
      </div>
    </div>
  );
}
