"use client";
import { authServices } from "@/app/services/authServices";
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
  return {
    // register
    registerUser: registerMutation.mutate,
    registerIsLoading: registerMutation.isPending,
    registerIsError: registerMutation.isError,
    registerError: registerMutation.error,
  };
};
