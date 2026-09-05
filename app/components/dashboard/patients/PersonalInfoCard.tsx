"use client";

import { useState } from "react";
import { Patient } from "@/app/types/patient";
import {
  FileText,
  MapPin,
  Phone,
  Edit2,
  Plus,
  X,
  Loader2,
  Save,
} from "lucide-react";
import { usePatients } from "@/app/hooks/patients/usePatients";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  UpdatePatientData,
  updatePatientSchema,
} from "@/app/validations/patientValidation";
import FormError from "@/app/(auth)/Auth_Components/FormError";

interface PersonalCardProps {
  patient: Patient;
}

export default function PersonalInfoCard({ patient }: PersonalCardProps) {
  const params = useParams();
  const id = params?.id as string;
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updatePatientSchema),
    defaultValues: {
      history: patient.history,
    },
  });
  const { update, updateIsLoading } = usePatients(undefined, id);
  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    if (updateIsLoading) return;
    setIsOpen(false);
  };
  const onSubmit = (updateData: UpdatePatientData) => {
    update(updateData, {
      onSuccess: () => setIsOpen(false),
    });
  };
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
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-800 font-semibold text-sm">
              <FileText className="w-4 h-4 text-blue-600" />
              <span>Medical History</span>
            </div>

            <button
              type="button"
              onClick={handleOpenModal}
              className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-2 py-1 rounded-lg transition-colors cursor-pointer"
            >
              {patient.history ? (
                <>
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add History</span>
                </>
              )}
            </button>
          </div>

          <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed min-h-15 whitespace-pre-wrap">
            {patient.history || "No prior medical history recorded."}
          </p>
        </div>
      </div>

      {/* Edit Medical History Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div
            className="bg-white border border-slate-200 rounded-2xl w-full max-w-lg shadow-xl overflow-hidden animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Edit Medical History
                  </h3>
                  <p className="text-xs text-slate-500">
                    Patient: {patient.name}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleCloseModal}
                disabled={updateIsLoading}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors disabled:opacity-50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="p-6 space-y-3">
                <label
                  htmlFor="medicalHistory"
                  className="block text-xs font-semibold text-slate-700"
                >
                  Medical Conditions, Allergies & Notes
                </label>
                <textarea
                  {...register("history")}
                  placeholder="e.g., Hypertension, Penicillin Allergy, Previous Dental Surgery..."
                  className="w-full text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all resize-none placeholder:text-slate-400"
                />
                {errors.history && <FormError error={errors.history.message} />}
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-3 px-6 py-4 bg-slate-50 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  disabled={updateIsLoading}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-200/60 rounded-xl transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={updateIsLoading}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-sm disabled:opacity-50"
                >
                  {updateIsLoading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
