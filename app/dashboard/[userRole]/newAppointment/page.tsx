"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppointment } from "@/app/hooks/appointments/useAppointment";
import { useDoctor } from "@/app/hooks/doctors/useDoctor";
import { usePatients } from "@/app/hooks/patients/usePatients";
import {
  CreateAppointmentInput,
  createAppointmentSchema,
} from "@/app/validations/appointment.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { Loader2, CheckCircle2 } from "lucide-react";
import FormError from "@/app/(auth)/Auth_Components/FormError";
import { Patient } from "@/app/types/patient";
import { usePermission } from "@/app/hooks/usePermissions";
import NewAppointmentHeader from "@/app/components/dashboard/appointments/NewAppointmentHeader";
import NewAppointmentCardHeader from "@/app/components/dashboard/appointments/NewAppointmentCardHeader";
import NewAppointmentDoctorSelectionDropDown from "@/app/components/dashboard/appointments/NewAppointmentDoctorSelectionDropDown";
import NewAppointmentSelectedPatientCard from "@/app/components/dashboard/appointments/NewAppointmentSelectedPatientCard";
import NewAppointmentPatientSearchInput from "@/app/components/dashboard/appointments/NewAppointmentPatientSearchInput";
import NewAppointmentPatientSearchResultsDropdown from "@/app/components/dashboard/appointments/NewAppointmentPatientSearchResultsDropdown";
import NewAppointmentDateDurationRow from "@/app/components/dashboard/appointments/NewAppointmentDateDurationRow";
import NewAppointmentProcedureField from "@/app/components/dashboard/appointments/NewAppointmentProcedureField";
import NewAppointmentNotesField from "@/app/components/dashboard/appointments/NewAppointmentNotesField";
import PermissionGuard from "@/app/components/guards/PermissionGuard";
import AccessDeniedFallback from "@/app/components/guards/AccessDeniedFallback";

export default function NewAppointment() {
  const router = useRouter();

  // Hooks
  const { doctorError, doctorIsError, doctorIsLoading, doctors } = useDoctor();
  const { patients, getError, getIsError, getIsLoading } = usePatients();
  const { create, createError, createIsError, createIsLoading } =
    useAppointment();
  const { userRole } = usePermission();
  // Local State for Patient Search
  const [patientSearchQuery, setPatientSearchQuery] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isPatientDropdownOpen, setIsPatientDropdownOpen] = useState(false);

  // RHF
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CreateAppointmentInput>({
    resolver: zodResolver(createAppointmentSchema),
    defaultValues: {
      status: "scheduled",
      durationMinutes: 30,
      procedure: "",
      notes: "",
    },
  });

  // Filter Patients based on Search Input
  const filteredPatients = patients?.filter(
    (p: Patient) =>
      p.name.toLowerCase().includes(patientSearchQuery.toLowerCase()) ||
      (p.phone && p.phone.includes(patientSearchQuery)),
  );

  const handleSelectPatient = (patient: Patient) => {
    setSelectedPatient(patient);
    setValue("patient", patient._id, { shouldValidate: true });
    setIsPatientDropdownOpen(false);
    setPatientSearchQuery("");
  };

  const handleClearPatient = () => {
    setSelectedPatient(null);
    setValue("patient", "", { shouldValidate: true });
  };

  const onSubmit = (data: CreateAppointmentInput) => {
    create(data, {
      onSuccess: () => {
        toast.success("Appointment created successfully!", {
          duration: 3000,
          style: {
            borderRadius: "12px",
            background: "#0f172a",
            color: "#fff",
            fontSize: "13px",
          },
        });
        reset();
        setSelectedPatient(null);
        setTimeout(() => {
          router.push(`/dashboard/${userRole}`);
        }, 1500);
      },
      onError: (err: unknown) => {
        const message =
          err instanceof Error
            ? err.message
            : "Failed to schedule appointment. Please try again.";

        toast.error(message, {
          duration: 4000,
          style: {
            borderRadius: "12px",
            background: "#0f172a",
            color: "#fff",
            fontSize: "13px",
          },
        });
      },
    });
  };

  return (
    <PermissionGuard
      allowedRoles={["admin", "staff"]}
      fallback={<AccessDeniedFallback />}
    >
      <div className="min-h-screen bg-slate-50/50 p-4 md:p-8">
        <Toaster position="top-right" />

        <div className="max-w-2xl mx-auto space-y-6">
          {/* Top Header & Back Navigation */}
          <NewAppointmentHeader />

          {/* Card Form */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
            {/* Card Header */}
            <NewAppointmentCardHeader />

            {/* Global Error Banner */}
            {createIsError && (
              <div className="mx-6 mt-6 p-3 rounded-xl bg-red-50 border border-red-100 text-xs text-red-600">
                {createError?.message ||
                  "An error occurred while booking appointment."}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
              {/* 1. Doctor Selection Dropdown */}
              <NewAppointmentDoctorSelectionDropDown
                errors={errors}
                register={register}
                doctorError={doctorError}
                doctorIsError={doctorIsError}
                doctorIsLoading={doctorIsLoading}
                doctors={doctors}
              />

              {/* 2. Patient Search Component */}
              <div className="space-y-1.5 relative">
                <label className="block text-xs font-semibold text-slate-700">
                  Patient <span className="text-red-500">*</span>
                </label>

                {/* Selected Patient Card Display */}
                {selectedPatient ? (
                  <NewAppointmentSelectedPatientCard
                    selectedPatient={selectedPatient}
                    handleClearPatient={handleClearPatient}
                  />
                ) : (
                  /* Patient Search Input */
                  <NewAppointmentPatientSearchInput
                    getIsLoading={getIsLoading}
                    patientSearchQuery={patientSearchQuery}
                    setIsPatientDropdownOpen={setIsPatientDropdownOpen}
                    setPatientSearchQuery={setPatientSearchQuery}
                  />
                )}

                {/* Patient Search Results Dropdown */}
                {isPatientDropdownOpen && !selectedPatient && (
                  <NewAppointmentPatientSearchResultsDropdown
                    filteredPatients={filteredPatients}
                    getIsLoading={getIsLoading}
                    handleSelectPatient={handleSelectPatient}
                  />
                )}

                {getIsError && (
                  <p className="text-[11px] text-red-500">
                    {getError?.message}
                  </p>
                )}
                {errors.patient && <FormError error={errors.patient.message} />}
              </div>

              {/* 3. Date & Duration Row */}
              <NewAppointmentDateDurationRow
                errors={errors}
                register={register}
                setValue={setValue}
              />
              {/* --- Procedure Field (Required) --- */}
              <NewAppointmentProcedureField
                errors={errors}
                register={register}
              />

              {/* --- Notes Field (Optional) --- */}
              <NewAppointmentNotesField errors={errors} register={register} />
              {/* Action Buttons */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="px-4 py-2.5 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={createIsLoading}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-xl transition-all shadow-sm disabled:opacity-50 cursor-pointer"
                >
                  {createIsLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Booking...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Confirm Appointment</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </PermissionGuard>
  );
}
