import { appointmentServices } from "@/app/services/appointment.service";
import { AppointmentStatus } from "@/app/types/appointments";
import { GetParams } from "@/app/types/patient";
import { CreateAppointmentInput } from "@/app/validations/appointment.schemas";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const useAppointment = (initialParams?: GetParams) => {
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
  const queryParams: GetParams = {
    search: debouncedSearch || undefined,
    page,
    limit,
    sort,
  };
  const queryClient = useQueryClient();
  const createAppointmentMutation = useMutation({
    mutationFn: (data: CreateAppointmentInput) =>
      appointmentServices.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
  });
  const appointmentsQuery = useQuery({
    queryKey: ["appointments", queryParams],
    queryFn: () => appointmentServices.getAll(queryParams),
  });
  const updateMutation = useMutation({
    mutationFn: ({
      id,
      updateData,
    }: {
      id: string;
      updateData: AppointmentStatus;
    }) => appointmentServices.updateStatus(id, updateData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments", "patients"] });
    },
  });
  const deleteMutation = useMutation({
    mutationFn: ({ id }: { id: string }) => appointmentServices.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["appointments"],
      });
    },
  });
  return {
    // create
    create: createAppointmentMutation.mutate,
    createIsLoading: createAppointmentMutation.isPending,
    createError: createAppointmentMutation.error,
    createIsError: createAppointmentMutation.isError,
    // get all
    appointments: appointmentsQuery.data,
    appointmentsIsError: appointmentsQuery.isError,
    appointmentsError: appointmentsQuery.error,
    appointmentsIsLoading: appointmentsQuery.isPending,
    search,
    setSearch,
    page,
    setPage,
    limit,
    setLimit,
    sort,
    setSort,
    appointemntsRefetch: appointmentsQuery.refetch,
    // update status
    update: updateMutation.mutate,
    updateError: updateMutation.error,
    updateIsError: updateMutation.isError,
    updateIsLoading: updateMutation.isPending,
    // delete
    delete: deleteMutation.mutateAsync,
    deleteIsError: deleteMutation.isError,
    deleteError: deleteMutation.error,
    deleteIsLoading: deleteMutation.isPending,
  };
};
