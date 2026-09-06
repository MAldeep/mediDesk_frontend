"use client";

import { useState } from "react";
import { Patient } from "@/app/types/patient";
import { Loader2, Save } from "lucide-react";
import { usePatients } from "@/app/hooks/patients/usePatients";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  UpdatePatientData,
  updatePatientSchema,
} from "@/app/validations/patientValidation";
import FormError from "@/app/(auth)/Auth_Components/FormError";
import PatientCardHeader from "./PatientCardHeader";
import PatientCardInfoList from "./PatientCardInfoList";
import PatientCardMedicalHistorySection from "./PatientCardMedicalHistorySection";
import HistoryModalHeader from "./HistoryModalHeader";

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
        <PatientCardHeader patient={patient} />

        {/* Info Items List */}
        <PatientCardInfoList patient={patient} />

        {/* Medical History Section */}
        <PatientCardMedicalHistorySection
          handleOpenModal={handleOpenModal}
          patient={patient}
        />
      </div>

      {/* Edit Medical History Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div
            className="bg-white border border-slate-200 rounded-2xl w-full max-w-lg shadow-xl overflow-hidden animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <HistoryModalHeader
              handleCloseModal={handleCloseModal}
              patient={patient}
              updateIsLoading={updateIsLoading}
            />

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
