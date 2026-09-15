import { api } from "../lib/axiosClient";

export const doctorServices = {
  getAll: async () => {
    const response = await api.get("/users/doctor");
    return response.data.data.doctors;
  },
};
