"use client";

import { loginSchema, LoginType } from "@/app/validations/loginValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";
import FormError from "./FormError";

export default function LoginForm() {
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { loginUser, loginIsError, loginError, loginIsLoading } = useAuth();
  const onSubmit = (data: LoginType) => {
    loginUser(data, {
      onError: () => reset(),
    });
  };
  return (
    <div>
      {/* Global Error Banner */}
      {loginIsError && (
        <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm flex items-center gap-2">
          <svg
            className="w-5 h-5 shrink-0 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{loginError?.message || "An unexpected error occurred."}</span>
        </div>
      )}
      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Login Form</h1>
        <input type="text" {...register("email")} />
        {errors.email && <FormError error={errors.email.message} />}
        <input type="text" {...register("password")} />
        {errors.password && <FormError error={errors.password.message} />}
        <button type="submit" disabled={loginIsLoading}>
          Login
        </button>
      </form>
    </div>
  );
}
