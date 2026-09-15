import { api } from "../lib/axiosClient";
import { Appointments } from "../types/appointments";
import { GetParams } from "../types/patient";
import { CreateAppointmentInput } from "../validations/appointment.schemas";

export const appointmentServices = {
  create: async (data: CreateAppointmentInput) => {
    const response = await api.post("/appointments", data);
    return response.data;
  },
  getAll: async (params?: GetParams): Promise<Appointments[]> => {
    const cleanParams = Object.fromEntries(
      Object.entries(params || {}).filter(
        ([_, value]) => value !== undefined && value !== "",
      ),
    );
    const response = await api.get("/appointments", { params: cleanParams });
    return response.data.data.appointments;
  },
};
