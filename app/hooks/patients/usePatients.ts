import { patientServices } from "@/app/services/patientServices";
import { useAuthStore } from "@/app/stores/useAuthStore";
import { CreatePatientData } from "@/app/validations/patientValidation";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const usePatients = () => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const userRole = user?.role;
  const addPatientMutation = useMutation({
    mutationFn: (patientData: CreatePatientData) =>
      patientServices.create(patientData),
    onSuccess: () => {
      router.replace(`/dashboard/${userRole}/`);
    },
  });
  return {
    // add
    add: addPatientMutation.mutate,
    addIsLoading: addPatientMutation.isPending,
    addIsError: addPatientMutation.isError,
    addError: addPatientMutation.error,
  };
};
