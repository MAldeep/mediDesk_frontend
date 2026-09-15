import { doctorServices } from "@/app/services/doctor.services";
import { useQuery } from "@tanstack/react-query";

export const useDoctor = () => {
  const {
    data: doctors = [],
    isLoading: doctorIsLoading,
    isError: doctorIsError,
    error: doctorError,
  } = useQuery({
    queryKey: ["doctors"],
    queryFn: doctorServices.getAll,
  });

  return {
    doctors,
    doctorIsLoading,
    doctorIsError,
    doctorError,
  };
};
