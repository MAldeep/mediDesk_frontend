import { api, publicApi } from "../lib/axiosClient";
import { AuthResponse, LogoutResponse } from "../types/auth";
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
  logout: async (): Promise<LogoutResponse> => {
    const response = await api.post("/auth/logout");
    return response.data;
  },
};
