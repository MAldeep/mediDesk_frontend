import { appointmentServices } from "@/app/services/appointment.service";
import { CreateAppointmentInput } from "@/app/validations/appointment.schemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAppointment = () => {
  const queryClient = useQueryClient();
  const createAppointmentMutation = useMutation({
    mutationFn: (data: CreateAppointmentInput) =>
      appointmentServices.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
  });
  return {
    // create
    create: createAppointmentMutation.mutate,
    createIsLoading: createAppointmentMutation.isPending,
    createError: createAppointmentMutation.error,
    createIsError: createAppointmentMutation.isError,
  };
};
