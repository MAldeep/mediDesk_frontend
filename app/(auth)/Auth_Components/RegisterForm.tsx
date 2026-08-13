"use client";

import {
  RegisterData,
  registerSchema,
} from "@/app/validations/registerValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";
import FormError from "./FormError";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const { registerUser, registerError, registerIsError, registerIsLoading } =
    useAuth();

  const onSubmit = (data: RegisterData) => {
    registerUser(data);
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
      {/* Global Error Banner */}
      {registerIsError && (
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
          <span>
            {registerError?.message || "An unexpected error occurred."}
          </span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name Input */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-slate-700">
            Full Name
          </label>
          <input
            type="text"
            {...register("name")}
            placeholder="Dr. Mohamed Ali"
            className={`w-full px-3.5 py-2.5 rounded-lg border text-sm transition duration-150 outline-none focus:ring-2 ${
              errors.name
                ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                : "border-slate-300 focus:border-blue-600 focus:ring-blue-100"
            }`}
          />
          {errors.name && <FormError error={errors.name.message} />}
        </div>

        {/* Email Input */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-slate-700">
            Email Address
          </label>
          <input
            type="email"
            {...register("email")}
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
          <label className="text-sm font-medium text-slate-700">Password</label>
          <input
            type="password"
            {...register("password")}
            placeholder="••••••••"
            className={`w-full px-3.5 py-2.5 rounded-lg border text-sm transition duration-150 outline-none focus:ring-2 ${
              errors.password
                ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                : "border-slate-300 focus:border-blue-600 focus:ring-blue-100"
            }`}
          />
          {errors.password && <FormError error={errors.password.message} />}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={registerIsLoading}
          className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition duration-200 shadow-sm disabled:opacity-60 flex items-center justify-center gap-2"
        >
          {registerIsLoading ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Creating account...
            </>
          ) : (
            "Create Account"
          )}
        </button>
      </form>

      {/* Login Navigation Link */}
      <div className="text-center pt-2 border-t border-slate-100">
        <p className="text-sm text-slate-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-blue-600 hover:text-blue-700 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
