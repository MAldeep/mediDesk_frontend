import { patientServices } from "@/app/services/patientServices";
import { useAuthStore } from "@/app/stores/useAuthStore";
import { CreatePatientData } from "@/app/validations/patientValidation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const usePatients = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const userRole = user?.role;
  const addPatientMutation = useMutation({
    mutationFn: (patientData: CreatePatientData) =>
      patientServices.create(patientData),
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
