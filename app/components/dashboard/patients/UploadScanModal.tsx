"use client";

import {
  UseFormRegister,
  FieldErrors,
  UseFormHandleSubmit,
} from "react-hook-form";
import Image from "next/image";
import { X, UploadCloud, Loader2, ImageIcon } from "lucide-react";

export interface UploadFormInputs {
  scanFile: FileList;
}

interface UploadScanModalProps {
  handleCloseUpload: () => void;
  uploadIsLoading: boolean;
  uploadIsError: boolean;
  uploadError?: { message?: string } | null;
  register: UseFormRegister<UploadFormInputs>;
  errors: FieldErrors<UploadFormInputs>;
  handleSubmit: UseFormHandleSubmit<UploadFormInputs>;
  onSubmit: (data: UploadFormInputs) => void;
  filePreview: string | null;
}

export default function UploadScanModal({
  handleCloseUpload,
  uploadIsLoading,
  uploadIsError,
  uploadError,
  register,
  errors,
  handleSubmit,
  onSubmit,
  filePreview,
}: UploadScanModalProps) {
  return (
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
  );
}
