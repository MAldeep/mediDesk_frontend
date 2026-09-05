import { patientServices } from "@/app/services/patientServices";
import {
  CreatePatientData,
  UpdatePatientData,
} from "@/app/validations/patientValidation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { usePermission } from "../usePermissions";
import { Role } from "@/app/types/rbac";
import { useEffect, useState } from "react";
import { GetPatientsParams } from "@/app/types/patient";

export const usePatients = (
  initialParams?: GetPatientsParams,
  patientId?: string,
) => {
  const [search, setSearch] = useState(initialParams?.search || "");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [page, setPage] = useState(initialParams?.page || 1);
  const [limit, setLimit] = useState(initialParams?.limit || 10);
  const [sort, setSort] = useState(initialParams?.sort || "-createdAt");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 400);

    return () => clearTimeout(handler);
  }, [search]);
  const queryParams: GetPatientsParams = {
    search: debouncedSearch || undefined,
    page,
    limit,
    sort,
  };
  const queryClient = useQueryClient();
  const router = useRouter();
  const { userRole, hasRole } = usePermission();
  const canAddPatient = hasRole("admin" as Role) || hasRole("staff" as Role);
  const canDeletePatient = hasRole("admin" as Role);
  const addPatientMutation = useMutation({
    mutationFn: (patientData: CreatePatientData) => {
      if (!canAddPatient) {
        throw new Error("Unauthorized: Only Admin or Staff can add patients.");
      }
      return patientServices.create(patientData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patients"] });
      router.replace(`/dashboard/${userRole}/`);
    },
  });
  const getAllPatients = useQuery({
    queryKey: ["patients", queryParams],
    queryFn: () => patientServices.getAll(queryParams),
  });
  const getOneById = useQuery({
    queryKey: ["patients", patientId],
    queryFn: () => patientServices.getById(patientId!),
    enabled: Boolean(patientId && patientId !== "undefined"),
  });
  const updatePatientMutation = useMutation({
    mutationFn: (updateData: UpdatePatientData) =>
      patientServices.update(patientId!, updateData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patients", patientId] });
    },
  });
  const uploadPatientScan = useMutation({
    mutationFn: (file: File) => patientServices.uploadScan(patientId!, file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patients", patientId] });
    },
  });
  const deletePatientScan = useMutation({
    mutationFn: (publicId: string) =>
      patientServices.deleteScan(patientId!, publicId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patients", patientId] });
    },
  });
  const deletePatientMutation = useMutation({
    mutationFn: () => {
      if (!canDeletePatient) {
        throw new Error("Unauthorized: Only Admin can delete patients.");
      }
      return patientServices.deletePatient(patientId!);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patients"] });
    },
  });
  return {
    // add
    add: addPatientMutation.mutate,
    addIsLoading: addPatientMutation.isPending,
    addIsError: addPatientMutation.isError,
    addError: addPatientMutation.error,
    // getAll
    patients: getAllPatients.data,
    getIsLoading: getAllPatients.isLoading,
    getIsError: getAllPatients.isError,
    getError: getAllPatients.error,
    search,
    setSearch,
    page,
    setPage,
    limit,
    setLimit,
    sort,
    setSort,
    getRefetch: getAllPatients.refetch,
    // get By Id
    patient: getOneById.data,
    getOneIsLoading: getOneById.isLoading,
    getOneError: getOneById.error,
    getOneIsError: getOneById.isError,
    // update
    update: updatePatientMutation.mutate,
    updateIsLoading: updatePatientMutation.isPending,
    updateIsError: updatePatientMutation.isError,
    updateError: updatePatientMutation.error,
    // upload patient sacn
    upload: uploadPatientScan.mutate,
    uploadIsLoading: uploadPatientScan.isPending,
    uploadIsError: uploadPatientScan.isError,
    uploadError: uploadPatientScan.error,
    // delete patient
    deletePatient: deletePatientMutation.mutate,
    deletePatientIsLoading: deletePatientMutation.isPending,
    deletePatientIsError: deletePatientMutation.isError,
    deletePatientError: deletePatientMutation.error,
    // delete patient scan
    deleteScan: deletePatientScan.mutate,
    deleteIsLoading: deletePatientScan.isPending,
    deleteIsError: deletePatientScan.isError,
    deleteError: deletePatientScan.error,
  };
};
