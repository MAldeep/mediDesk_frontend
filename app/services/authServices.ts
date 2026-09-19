import { api, publicApi } from "../lib/axiosClient";
import {
  AuthResponse,
  InviteResponse,
  InviteUser,
  LogoutResponse,
} from "../types/auth";
import { LoginType } from "../validations/loginValidation";
import { RegisterData } from "../validations/registerValidation";
import Cookies from "js-cookie";

export const authServices = {
  register: async (registerData: RegisterData) => {
    const response = await publicApi.post("/auth/register", registerData);
    return response;
  },

  login: async (loginData: LoginType): Promise<AuthResponse> => {
    const response = await publicApi.post("/auth/login", loginData);
    const data = response.data;

    const accessToken = data.accessToken || data.data?.accessToken;
    if (accessToken) {
      Cookies.set("accessToken", accessToken, {
        expires: 1,
        secure: true,
        sameSite: "strict",
      });
    }
    return data;
  },

  logout: async (): Promise<LogoutResponse> => {
    try {
      const response = await api.post("/auth/logout");
      return response.data;
    } finally {
      Cookies.remove("accessToken");
    }
  },

  inviteUser: async (inviteData: InviteUser): Promise<InviteResponse> => {
    const response = await api.post("/auth/invite-user", inviteData);
    return response.data;
  },

  setPassword: async (
    password: string,
    token: string,
  ): Promise<AuthResponse> => {
    const response = await publicApi.post(`/auth/set-password/${token}`, {
      password,
    });
    return response.data;
  },
};
