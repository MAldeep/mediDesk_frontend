"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import Link from "next/link";
import { loginSchema, LoginType } from "@/app/validations/loginValidation";
import { useAuth } from "../hooks/useAuth";
import FormError from "./FormError";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    setValue,
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
      onError: () => setValue("password", ""),
    });
  };

  const backendErrorMessage = isAxiosError(loginError)
    ? loginError.response?.data?.message || loginError.message
    : loginError?.message || "An unexpected error occurred.";

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
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
          <span>{backendErrorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email Input */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-slate-700">
            Email Address
          </label>
          <input
            type="email"
            {...register("email")}
            disabled={loginIsLoading}
            placeholder="doctor@clinic.com"
            className={`w-full px-3.5 py-2.5 rounded-lg border text-sm transition duration-150 outline-none focus:ring-2 ${
              errors.email
                ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                : "border-slate-300 focus:border-blue-600 focus:ring-blue-100"
            }`}
          />
          {errors.email && <FormError error={errors.email.message} />}
        </div>

        {/* Password Input */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-slate-700">
              Password
            </label>
            <Link
              href="/forgot-password"
              className="text-xs font-medium text-blue-600 hover:text-blue-700 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              disabled={loginIsLoading}
              placeholder="••••••••"
              className={`w-full px-3.5 py-2.5 rounded-lg border text-sm transition duration-150 outline-none focus:ring-2 ${
                errors.password
                  ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                  : "border-slate-300 focus:border-blue-600 focus:ring-blue-100"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 text-xs font-medium"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {errors.password && <FormError error={errors.password.message} />}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loginIsLoading}
          className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition duration-200 shadow-sm disabled:opacity-60 flex items-center justify-center gap-2"
        >
          {loginIsLoading ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Logging in...
            </>
          ) : (
            "Log In"
          )}
        </button>
      </form>

      {/* Register Navigation Link */}
      <div className="text-center pt-2 border-t border-slate-100">
        <p className="text-sm text-slate-600">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-blue-600 hover:text-blue-700 hover:underline"
          >
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}
