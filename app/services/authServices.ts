import { publicApi } from "../lib/axiosClient";
import { AuthResponse } from "../types/auth";
import { LoginType } from "../validations/loginValidation";
import { RegisterData } from "../validations/registerValidation";

export const authServices = {
  register: async (registerData: RegisterData) => {
    const response = await publicApi.post("/auth/register", registerData);
    return response;
  },
  login: async (loginData: LoginType): Promise<AuthResponse> => {
    const response = await publicApi.post("/auth/login", loginData);
    return response.data;
  },
};
