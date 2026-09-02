import { patientServices } from "@/app/services/patientServices";
import { CreatePatientData } from "@/app/validations/patientValidation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { usePermission } from "../usePermissions";
import { Role } from "@/app/types/rbac";
import { useEffect, useState } from "react";
import { GetPatientsParams } from "@/app/types/patient";

export const usePatients = (initialParams?: GetPatientsParams) => {
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
  };
};
