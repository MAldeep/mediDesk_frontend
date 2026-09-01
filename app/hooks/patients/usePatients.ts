import { patientServices } from "@/app/services/patientServices";
import { CreatePatientData } from "@/app/validations/patientValidation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { usePermission } from "../usePermissions";
import { Role } from "@/app/types/rbac";

export const usePatients = () => {
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
    queryKey: ["patients"],
    queryFn: () => patientServices.getAll(),
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
  };
};
