"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import Image from "next/image";
import { Patient, IScan } from "@/app/types/patient";
import {
  FileSpreadsheet,
  Plus,
  X,
  UploadCloud,
  Loader2,
  Eye,
  Trash2,
  AlertTriangle,
  Image as ImageIcon,
} from "lucide-react";
import { usePatients } from "@/app/hooks/patients/usePatients";

interface ScansRadiologyProps {
  patient: Patient;
}

interface UploadFormInputs {
  scanFile: FileList;
}

export default function ScansRadiologySection({
  patient,
}: ScansRadiologyProps) {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedScanUrl, setSelectedScanUrl] = useState<string | null>(null);

  const [scanToDelete, setScanToDelete] = useState<IScan | null>(null);

  // Hook
  const {
    upload,
    uploadIsLoading,
    uploadIsError,
    uploadError,
    deleteScan,
    deleteIsLoading,
  } = usePatients(undefined, patient._id);

  // React Hook Form
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<UploadFormInputs>();

  const selectedFiles = useWatch({ control, name: "scanFile" });
  const filePreview =
    selectedFiles && selectedFiles.length > 0
      ? URL.createObjectURL(selectedFiles[0])
      : null;

  const handleOpenUpload = () => {
    reset();
    setIsUploadModalOpen(true);
  };

  const handleCloseUpload = () => {
    if (uploadIsLoading) return;
    reset();
    setIsUploadModalOpen(false);
  };

  const onSubmit = (data: UploadFormInputs) => {
    if (!data.scanFile || data.scanFile.length === 0) return;

    upload(data.scanFile[0], {
      onSuccess: () => {
        handleCloseUpload();
      },
    });
  };

  const ConfirmDeleteScan = () => {
    if (!scanToDelete) return;

    deleteScan(scanToDelete.publicId, {
      onSuccess: () => {
        setScanToDelete(null);
      },
    });
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <FileSpreadsheet className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Scans & Radiology
            </h2>
            <p className="text-xs text-slate-500">
              X-Rays, Lab Reports, and Medical Imaging
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleOpenUpload}
          className="inline-flex items-center gap-1.5 text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Upload Scan</span>
        </button>
      </div>

      {/* Scans Grid */}
      {patient.scan && patient.scan.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pt-1">
          {patient.scan.map((scanItem: IScan, index: number) => (
            <div
              key={scanItem.publicId || index}
              className="group relative aspect-square rounded-xl overflow-hidden border border-slate-200 bg-slate-50 cursor-pointer shadow-xs hover:shadow-md transition-all"
              onClick={() => setSelectedScanUrl(scanItem.url)}
            >
              <Image
                src={scanItem.url}
                alt={`Scan ${index + 1}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />

              {/* Overlay Actions */}
              <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  type="button"
                  title="View Image"
                  className="p-2 rounded-full bg-white/90 text-slate-800 hover:bg-white shadow-sm transition-transform hover:scale-110 cursor-pointer"
                >
                  <Eye className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  title="Delete Scan"
                  onClick={(e) => {
                    e.stopPropagation();
                    setScanToDelete(scanItem);
                  }}
                  className="p-2 rounded-full bg-red-600/90 text-white hover:bg-red-600 shadow-sm transition-transform hover:scale-110 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="py-10 border border-dashed border-slate-200 rounded-xl bg-slate-50/50 flex flex-col items-center justify-center text-center p-4">
          <FileSpreadsheet className="w-8 h-8 text-slate-300 mb-2" />
          <p className="text-xs font-medium text-slate-600">
            No scans uploaded yet
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Uploaded medical scans and files will appear here.
          </p>
        </div>
      )}

      {/* 1. Custom Delete Confirmation Modal */}
      {scanToDelete && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => !deleteIsLoading && setScanToDelete(null)}
        >
          <div
            className="bg-white border border-slate-200 rounded-2xl w-full max-w-sm p-6 shadow-xl space-y-4 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Delete Medical Scan?
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  This action cannot be undone. The image will be permanently
                  removed.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                disabled={deleteIsLoading}
                onClick={() => setScanToDelete(null)}
                className="px-3.5 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition-colors disabled:opacity-50 cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={deleteIsLoading}
                onClick={ConfirmDeleteScan}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-white bg-red-600 hover:bg-red-700 rounded-xl transition-all shadow-sm disabled:opacity-50 cursor-pointer"
              >
                {deleteIsLoading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <span>Delete</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Upload Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div
            className="bg-white border border-slate-200 rounded-2xl w-full max-w-md shadow-xl overflow-hidden animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <UploadCloud className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Upload Patient Scan
                  </h3>
                  <p className="text-xs text-slate-500">
                    Select an X-Ray or Lab Test image
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleCloseUpload}
                disabled={uploadIsLoading}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors disabled:opacity-50 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="p-6 space-y-4">
                {uploadIsError && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-100 text-xs text-red-600">
                    {uploadError?.message || "Failed to upload scan image."}
                  </div>
                )}

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-700">
                    Scan File (JPEG, PNG)
                  </label>

                  <div className="relative border-2 border-dashed border-slate-200 hover:border-indigo-400 transition-colors rounded-2xl p-4 bg-slate-50/50 text-center flex flex-col items-center justify-center cursor-pointer min-h-35">
                    <input
                      type="file"
                      accept="image/*"
                      {...register("scanFile", {
                        required: "Please select an image file",
                      })}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />

                    {filePreview ? (
                      <div className="relative w-full h-32 rounded-xl overflow-hidden border border-slate-200">
                        <Image
                          src={filePreview}
                          alt="Preview"
                          fill
                          sizes="100vw"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-slate-500">
                        <ImageIcon className="w-8 h-8 text-slate-400" />
                        <span className="text-xs font-medium text-slate-700">
                          Click or drag image here
                        </span>
                        <span className="text-[10px] text-slate-400">
                          Supports PNG, JPG, JPEG
                        </span>
                      </div>
                    )}
                  </div>

                  {errors.scanFile && (
                    <p className="text-[11px] text-red-500 mt-1 font-medium">
                      {errors.scanFile.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 px-6 py-4 bg-slate-50 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleCloseUpload}
                  disabled={uploadIsLoading}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-200/60 rounded-xl transition-colors disabled:opacity-50 cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={uploadIsLoading}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all shadow-sm disabled:opacity-50 cursor-pointer"
                >
                  {uploadIsLoading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Uploading...</span>
                    </>
                  ) : (
                    <>
                      <UploadCloud className="w-3.5 h-3.5" />
                      <span>Upload</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. Lightbox Preview Modal */}
      {selectedScanUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setSelectedScanUrl(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl bg-black shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedScanUrl(null)}
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-slate-900/60 text-white hover:bg-slate-900 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <Image
              src={selectedScanUrl}
              alt="Scan Full View"
              width={1200}
              height={800}
              className="max-w-full max-h-[85vh] object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
