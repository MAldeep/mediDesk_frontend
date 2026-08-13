import { publicApi } from "../lib/axiosClient";
import { RegisterData } from "../validations/registerValidation";

export const authServices = {
  register: async (registerData: RegisterData) => {
    const response = await publicApi.post("/auth/register", registerData);
    return response;
  },
};
