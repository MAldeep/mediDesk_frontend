"use client";
import { authServices } from "@/app/services/authServices";
import { useAuthStore } from "@/app/stores/useAuthStore";
import { AuthResponse } from "@/app/types/auth";
import { LoginType } from "@/app/validations/loginValidation";
import { RegisterData } from "@/app/validations/registerValidation";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useAuth = () => {
  const router = useRouter();

  // Register
  const registerMutation = useMutation({
    mutationFn: (data: RegisterData) => authServices.register(data),
    onSuccess: () => {
      router.replace("/login");
    },
  });
  const loginMutation = useMutation({
    mutationFn: (data: LoginType) => authServices.login(data),
    onSuccess: async (data: AuthResponse) => {
      await useAuthStore.getState().setAuth(data.data.user, data.accessToken);
      router.replace("/dashboard");
    },
  });
  return {
    // register
    registerUser: registerMutation.mutate,
    registerIsLoading: registerMutation.isPending,
    registerIsError: registerMutation.isError,
    registerError: registerMutation.error,
    // Login
    loginUser: loginMutation.mutate,
    loginIsLoading: loginMutation.isPending,
    loginIsError: loginMutation.isError,
    loginError: loginMutation.error,
  };
};
