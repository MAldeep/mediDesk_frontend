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
import {
  Calendar,
  Clock,
  UserCheck,
  Search,
  User,
  Loader2,
  CheckCircle2,
  ArrowLeft,
  X,
  Phone,
} from "lucide-react";
import FormError from "@/app/(auth)/Auth_Components/FormError";
import { Patient } from "@/app/types/patient";
import { usePermission } from "@/app/hooks/usePermissions";

interface DoctorOption {
  _id: string;
  name: string;
  specialty?: string;
}

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
  const [selectedPatient, setSelectedPatient] = useState<{
    _id: string;
    name: string;
    phone?: string;
  } | null>(null);
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

  const handleSelectPatient = (patient: {
    _id: string;
    name: string;
    phone?: string;
  }) => {
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
    <div className="min-h-screen bg-slate-50/50 p-4 md:p-8">
      <Toaster position="top-right" />

      <div className="max-w-2xl mx-auto space-y-6">
        {/* Top Header & Back Navigation */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Appointments</span>
          </button>
        </div>

        {/* Card Form */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          {/* Card Header */}
          <div className="p-6 bg-slate-900 text-white flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-600/30 border border-indigo-400/30 flex items-center justify-center text-indigo-400 shrink-0">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg font-bold">Schedule New Appointment</h1>
              <p className="text-xs text-slate-400">
                Select doctor, search for patient and set appointment slot
              </p>
            </div>
          </div>

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
                    {doctorIsLoading
                      ? "Loading doctors..."
                      : "-- Select Doctor --"}
                  </option>
                  {doctors?.map((doc: DoctorOption) => (
                    <option key={doc._id} value={doc._id}>
                      {doc.name} {doc.specialty ? `(${doc.specialty})` : ""}
                    </option>
                  ))}
                </select>
              </div>
              {doctorIsError && (
                <p className="text-[11px] text-red-500">
                  {doctorError?.message}
                </p>
              )}
              {errors.doctor && <FormError error={errors.doctor.message} />}
            </div>

            {/* 2. Patient Search Component */}
            <div className="space-y-1.5 relative">
              <label className="block text-xs font-semibold text-slate-700">
                Patient <span className="text-red-500">*</span>
              </label>

              {/* Selected Patient Card Display */}
              {selectedPatient ? (
                <div className="flex items-center justify-between p-3 rounded-xl bg-indigo-50/60 border border-indigo-100 text-slate-800">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-indigo-600/10 text-indigo-600 flex items-center justify-center font-bold text-xs">
                      <User className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">
                        {selectedPatient.name}
                      </p>
                      {selectedPatient.phone && (
                        <p className="text-[11px] text-slate-500 flex items-center gap-1">
                          <Phone className="w-3 h-3" /> {selectedPatient.phone}
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleClearPatient}
                    className="p-1 rounded-lg text-slate-400 hover:text-red-500 hover:bg-white transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                /* Patient Search Input */
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search patient by name or phone..."
                    value={patientSearchQuery}
                    onChange={(e) => {
                      setPatientSearchQuery(e.target.value);
                      setIsPatientDropdownOpen(true);
                    }}
                    onFocus={() => setIsPatientDropdownOpen(true)}
                    className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all text-slate-800"
                  />
                  {getIsLoading && (
                    <Loader2 className="w-4 h-4 text-slate-400 animate-spin absolute right-3.5 top-1/2 -translate-y-1/2" />
                  )}
                </div>
              )}

              {/* Patient Search Results Dropdown */}
              {isPatientDropdownOpen && !selectedPatient && (
                <div className="absolute top-full left-0 right-0 mt-1 z-20 bg-white rounded-xl border border-slate-200 shadow-lg max-h-48 overflow-y-auto p-1 space-y-0.5">
                  {filteredPatients && filteredPatients.length > 0 ? (
                    filteredPatients.map((p: Patient) => (
                      <button
                        key={p._id}
                        type="button"
                        onClick={() => handleSelectPatient(p)}
                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors flex items-center justify-between text-xs cursor-pointer"
                      >
                        <div>
                          <p className="font-semibold text-slate-800">
                            {p.name}
                          </p>
                          {p.phone && (
                            <p className="text-[10px] text-slate-400">
                              {p.phone}
                            </p>
                          )}
                        </div>
                        <User className="w-3.5 h-3.5 text-slate-400" />
                      </button>
                    ))
                  ) : (
                    <div className="p-3 text-center text-xs text-slate-400">
                      {getIsLoading
                        ? "Loading patients..."
                        : "No patients found"}
                    </div>
                  )}
                </div>
              )}

              {getIsError && (
                <p className="text-[11px] text-red-500">{getError?.message}</p>
              )}
              {errors.patient && <FormError error={errors.patient.message} />}
            </div>

            {/* 3. Date & Duration Row */}
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
            {/* --- Procedure Field (Required) --- */}
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
                <p className="text-sm text-red-600 mt-1">
                  {errors.procedure.message}
                </p>
              )}
            </div>

            {/* --- Notes Field (Optional) --- */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-slate-700">
                Notes{" "}
                <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <textarea
                {...register("notes")}
                rows={3}
                placeholder="Add any medical notes or special instructions..."
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 bg-white shadow-sm resize-none"
              />
              {errors.notes && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.notes.message}
                </p>
              )}
            </div>
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
  );
}
