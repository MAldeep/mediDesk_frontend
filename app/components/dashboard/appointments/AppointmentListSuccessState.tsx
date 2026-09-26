"use client";

import { useState } from "react";
import { Clock, User, Loader2, Trash2 } from "lucide-react";
import type { Appointments, AppointmentStatus } from "@/app/types/appointments";
import DeleteConfirmModal from "./DeleteConfirmModal";
import PermissionGuard from "../../guards/PermissionGuard";
import Link from "next/link";
import { usePermission } from "@/app/hooks/usePermissions";

interface Props {
  apt: Appointments;
  patientName: string;
  doctorName: string | null;
  date: string;
  time: string;
  getStatusBadge: (status: string) => string;
  onUpdateStatus: (id: string, newStatus: AppointmentStatus) => void;
  isUpdating: boolean;
  onDelete: (id: string) => Promise<void>;
}

export default function AppointmentListSuccessState({
  apt,
  patientName,
  doctorName,
  date,
  time,
  getStatusBadge,
  onUpdateStatus,
  isUpdating,
  onDelete,
}: Props) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { userRole } = usePermission();
  const handleConfirmDelete = async () => {
    try {
      setIsDeleting(true);
      await onDelete(apt._id);
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Failed to delete appointment:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 hover:border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-all">
        {/* Patient, Doctor, Procedure & Notes Info */}
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
            <User className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-xs font-bold text-slate-800">
                {patientName}
              </h4>

              {doctorName && (
                <span className="text-[11px] text-slate-500">
                  • Dr. {doctorName}
                </span>
              )}
            </div>

            {apt.procedure && (
              <div className="mt-1">
                <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-medium bg-blue-50 text-blue-700 border border-blue-100">
                  {apt.procedure}
                </span>
              </div>
            )}

            {apt.notes && (
              <p className="text-[11px] text-slate-400 mt-1 italic line-clamp-1">
                Note: {apt.notes}
              </p>
            )}

            <Link
              href={`/dashboard/${userRole}/patients/${apt.patient._id}`}
              className="group inline-flex items-center gap-1 mt-1.5 text-[10px] font-semibold text-indigo-500 hover:text-indigo-700 transition-colors"
            >
              View Patient
              <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                →
              </span>
            </Link>
          </div>
        </div>
        {/* Timing, Status & Actions */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-semibold text-slate-700 flex items-center gap-1 justify-end">
              <Clock className="w-3 h-3 text-slate-400" />
              {time} ({apt.durationMinutes || 30} min)
            </p>
            <p className="text-[10px] text-slate-400">{date}</p>
          </div>

          {/* Status Dropdown */}
          <div className="relative flex items-center">
            {isUpdating ? (
              <div className="px-2.5 py-1 rounded-full text-[10px] font-semibold border bg-slate-100 text-slate-500 border-slate-200 flex items-center gap-1">
                <Loader2 className="w-3 h-3 animate-spin" />
                <span>Updating...</span>
              </div>
            ) : (
              <select
                value={apt.status}
                onChange={(e) =>
                  onUpdateStatus(apt._id, e.target.value as AppointmentStatus)
                }
                className={`px-2.5 py-1 rounded-full text-[10px] font-semibold border capitalize cursor-pointer focus:outline-none transition-colors ${getStatusBadge(
                  apt.status,
                )}`}
              >
                <option value="scheduled" className="bg-white text-slate-700">
                  Scheduled
                </option>
                <option value="completed" className="bg-white text-slate-700">
                  Completed
                </option>
                <option value="cancelled" className="bg-white text-slate-700">
                  Cancelled
                </option>
              </select>
            )}
          </div>

          {/* Delete Button */}
          <PermissionGuard allowedRoles={["admin", "staff"]}>
            <button
              type="button"
              onClick={() => setIsDeleteModalOpen(true)}
              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
              title="Delete Appointment"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </PermissionGuard>
        </div>
      </div>

      {/* Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
        patientName={patientName}
      />
    </>
  );
}
