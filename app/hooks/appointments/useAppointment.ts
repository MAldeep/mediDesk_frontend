import { appointmentServices } from "@/app/services/appointment.service";
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
  };
};
