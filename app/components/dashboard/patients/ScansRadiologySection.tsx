"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import Image from "next/image";
import { Patient, IScan } from "@/app/types/patient";
import { X } from "lucide-react";
import { usePatients } from "@/app/hooks/patients/usePatients";
import ScansRadiologySectionHeader from "./ScansRadiologySectionHeader";
import ScansGridSection from "./ScansGridSection";
import ScansEmptyStateSection from "./ScansEmptyStateSection";
import CustomDeleteConfirmationModal from "./CustomDeleteConfirmationModal";
import UploadScanModal from "./UploadScanModal";

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
      <ScansRadiologySectionHeader handleOpenUpload={handleOpenUpload} />

      {/* Scans Grid */}
      {patient.scan && patient.scan.length > 0 ? (
        <ScansGridSection
          patient={patient}
          setScanToDelete={setScanToDelete}
          setSelectedScanUrl={setSelectedScanUrl}
        />
      ) : (
        /* Empty State */
        <ScansEmptyStateSection />
      )}

      {/* 1. Custom Delete Confirmation Modal */}
      {scanToDelete && (
        <CustomDeleteConfirmationModal
          ConfirmDeleteScan={ConfirmDeleteScan}
          deleteIsLoading={deleteIsLoading}
          setScanToDelete={setScanToDelete}
        />
      )}

      {/* 2. Upload Modal */}
      {isUploadModalOpen && (
        <UploadScanModal
          handleCloseUpload={handleCloseUpload}
          uploadIsLoading={uploadIsLoading}
          uploadIsError={uploadIsError}
          uploadError={uploadError}
          register={register}
          errors={errors}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          filePreview={filePreview}
        />
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
