import { api } from "../lib/axiosClient";
import { CreateAppointmentInput } from "../validations/appointment.schemas";

export const appointmentServices = {
  create: async (data: CreateAppointmentInput) => {
    const response = await api.post("/appointments", data);
    return response.data;
  },
};
