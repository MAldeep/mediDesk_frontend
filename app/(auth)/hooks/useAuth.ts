"use client";
import { authServices } from "@/app/services/authServices";
import { useAuthStore } from "@/app/stores/useAuthStore";
import { AuthResponse, InviteUser } from "@/app/types/auth";
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
  // login
  const loginMutation = useMutation({
    mutationFn: (data: LoginType) => authServices.login(data),
    onSuccess: async (data: AuthResponse) => {
      await useAuthStore.getState().setAuth(data.data.user, data.accessToken);
      router.replace(`/dashboard/${data.data.user.role}`);
    },
  });
  // logout
  const logoutMutation = useMutation({
    mutationFn: () => authServices.logout(),
    onSuccess: async () => {
      await useAuthStore.getState().clearAuth();
      router.replace("/login");
    },
  });
  const inviteUserMutation = useMutation({
    mutationFn: (data: InviteUser) => authServices.inviteUser(data),
  });
  const setPasswordMutation = useMutation({
    mutationFn: ({
      newPassword,
      token,
    }: {
      newPassword: string;
      token: string;
    }) => authServices.setPassword(newPassword, token),
  });
  const forgotPasswordMutation = useMutation({
    mutationFn: (email: string) => authServices.forgotPassword(email),
  });
  const resetPasswordMutation = useMutation({
    mutationFn: ({ password, token }: { password: string; token: string }) =>
      authServices.resetPassword(token, password),
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
    // Logout
    logout: logoutMutation.mutate,
    logoutIsLoading: logoutMutation.isPending,
    logoutError: logoutMutation.error,
    logoutIsError: logoutMutation.isError,
    // invite user
    invite: inviteUserMutation.mutate,
    inviteIsLoading: inviteUserMutation.isPending,
    inviteError: inviteUserMutation.error,
    inviteUserIsError: inviteUserMutation.isError,
    // set password
    setPassword: setPasswordMutation.mutate,
    setPassIsLoading: setPasswordMutation.isPending,
    setPassIsError: setPasswordMutation.isError,
    setPassError: setPasswordMutation.error,
    // forgot password
    forgotPassword: forgotPasswordMutation.mutate,
    forgotPasswordIsLoading: forgotPasswordMutation.isPending,
    forgotPasswordIsError: forgotPasswordMutation.isError,
    forgotPasswordError: forgotPasswordMutation.error,
    // reset password
    resetPassword: resetPasswordMutation.mutate,
    resetIsLoading: resetPasswordMutation.isPending,
    resetIsError: resetPasswordMutation.isError,
    resetError: resetPasswordMutation.error,
  };
};
