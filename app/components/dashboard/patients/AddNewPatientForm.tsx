"use client";

import FormError from "@/app/(auth)/Auth_Components/FormError";
import { usePatients } from "@/app/hooks/patients/usePatients";
import {
  createNewPatientSchema,
  CreatePatientData,
} from "@/app/validations/patientValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function AddNewPatientForm() {
  const { add, addError, addIsError, addIsLoading } = usePatients();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePatientData>({
    resolver: zodResolver(createNewPatientSchema),
    defaultValues: {
      name: "",
      address: "",
      age: 0,
      gender: "male",
      history: "",
      phone: "",
    },
  });

  const onSubmit = (data: CreatePatientData) => {
    add(data);
  };

  const inputStyle =
    "w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-sm focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none transition-all placeholder:text-slate-400";
  const labelStyle = "block text-sm font-medium text-slate-700 mb-1.5";

  return (
    <div className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-2xl shadow-sm p-6 sm:p-8">
      {/* Header */}
      <div className="mb-6 pb-4 border-b border-slate-100">
        <h1 className="text-xl font-bold text-slate-900">Add New Patient</h1>
        <p className="text-sm text-slate-500 mt-1">
          Enter patient personal and medical details to create a new record.
        </p>
      </div>

      {/* Backend Global Error Alert */}
      {addIsError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
          {addError?.message ||
            "An error occurred while adding the patient. Please try again."}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Full Name */}
          <div className="sm:col-span-2">
            <label className={labelStyle}>Full Name</label>
            <input
              type="text"
              placeholder="e.g., John Doe"
              className={inputStyle}
              {...register("name")}
            />
            {errors.name && <FormError error={errors.name.message} />}
          </div>

          {/* Phone */}
          <div>
            <label className={labelStyle}>Phone Number</label>
            <input
              type="text"
              placeholder="e.g., 01234567890"
              className={inputStyle}
              {...register("phone")}
            />
            {errors.phone && <FormError error={errors.phone.message} />}
          </div>

          {/* Age */}
          <div>
            <label className={labelStyle}>Age</label>
            <input
              type="number"
              placeholder="25"
              className={inputStyle}
              {...register("age", { valueAsNumber: true })}
            />
            {errors.age && <FormError error={errors.age.message} />}
          </div>

          {/* Gender */}
          <div>
            <label className={labelStyle}>Gender</label>
            <select className={inputStyle} {...register("gender")}>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.gender && <FormError error={errors.gender.message} />}
          </div>

          {/* Address */}
          <div>
            <label className={labelStyle}>Address</label>
            <input
              type="text"
              placeholder="City, Street address..."
              className={inputStyle}
              {...register("address")}
            />
            {errors.address && <FormError error={errors.address.message} />}
          </div>

          {/* Medical History */}
          <div className="sm:col-span-2">
            <label className={labelStyle}>Medical History / Notes</label>
            <textarea
              rows={3}
              placeholder="Chronic conditions, allergies, or past surgeries..."
              className={`${inputStyle} resize-none`}
              {...register("history")}
            />
            {errors.history && <FormError error={errors.history.message} />}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            disabled={addIsLoading}
            className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium text-sm rounded-lg shadow-sm transition-all flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {addIsLoading ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Adding Patient...
              </span>
            ) : (
              "Add Patient"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
