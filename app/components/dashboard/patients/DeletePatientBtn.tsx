"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { usePatients } from "@/app/hooks/patients/usePatients";
import { usePermission } from "@/app/hooks/usePermissions";
import { Trash2, AlertTriangle, Loader2 } from "lucide-react";
import PermissionGuard from "../../guards/PermissionGuard";
import { Role } from "@/app/types/rbac";

export default function DeletePatientBtn() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { userRole } = usePermission();
  const allowedRole: Role[] = ["admin"];
  const {
    deletePatient,
    deletePatientError,
    deletePatientIsError,
    deletePatientIsLoading,
  } = usePatients(undefined, id);

  const handleDelete = () => {
    deletePatient(undefined, {
      onSuccess: () => {
        setIsModalOpen(false);
        router.replace(`/dashboard/${userRole}/patients`);
      },
    });
  };

  return (
    <>
      <PermissionGuard allowedRoles={allowedRole}>
        {/* Trigger Button */}
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex w-full justify-center items-center gap-2 px-3.5 py-2 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100/80 border border-red-200/60 rounded-xl transition-colors cursor-pointer"
        >
          <Trash2 className="w-4 h-4" />
          <span>Delete Patient</span>
        </button>

        {/* Confirmation Modal */}
        {isModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200"
            onClick={() => !deletePatientIsLoading && setIsModalOpen(false)}
          >
            <div
              className="bg-white border border-slate-200 rounded-2xl w-full max-w-md p-6 shadow-xl space-y-4 animate-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Icon & Text */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0 border border-red-100">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-slate-900">
                    Delete Patient Record?
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Are you sure you want to delete this patient? All associated
                    files, scans, and clinical history will be permanently
                    deleted.
                  </p>
                </div>
              </div>

              {/* Error Message Display */}
              {deletePatientIsError && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-100 text-xs text-red-600 font-medium">
                  {deletePatientError?.message ||
                    "Failed to delete patient. Please try again."}
                </div>
              )}

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  disabled={deletePatientIsLoading}
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition-colors disabled:opacity-50 cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  disabled={deletePatientIsLoading}
                  onClick={handleDelete}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-red-600 hover:bg-red-700 rounded-xl transition-all shadow-sm disabled:opacity-50 cursor-pointer"
                >
                  {deletePatientIsLoading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Deleting...</span>
                    </>
                  ) : (
                    <span>Yes, Delete</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </PermissionGuard>
    </>
  );
}
