"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "../(auth)/hooks/useAuth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast, { Toaster } from "react-hot-toast";
import {
  Lock,
  KeyRound,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import FormError from "../(auth)/Auth_Components/FormError";
import {
  SetPasswordInputs,
  setPasswordSchema,
} from "../validations/setPassword.schema";

export default function SetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token");
  const { setPassword, setPassError, setPassIsError, setPassIsLoading } =
    useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SetPasswordInputs>({
    resolver: zodResolver(setPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: SetPasswordInputs) => {
    if (!token) {
      toast.error("Invalid or missing invitation token!");
      return;
    }

    setPassword(
      { newPassword: data.password, token },
      {
        onSuccess: () => {
          toast.success(
            "Account activated successfully! Redirecting to login...",
            {
              duration: 3000,
              style: {
                borderRadius: "12px",
                background: "#0f172a",
                color: "#fff",
                fontSize: "13px",
              },
            },
          );

          setTimeout(() => {
            router.push("/login");
          }, 2000);
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (err: any) => {
          toast.error(
            err?.message || "Failed to set password. Please try again.",
            {
              duration: 4000,
              style: {
                borderRadius: "12px",
                background: "#0f172a",
                color: "#fff",
                fontSize: "13px",
              },
            },
          );
        },
      },
    );
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white p-6 rounded-2xl border border-red-100 text-center max-w-sm shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-xl bg-red-50 text-red-500 flex items-center justify-center mx-auto">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h2 className="text-base font-bold text-slate-800">Invalid Link</h2>
          <p className="text-xs text-slate-500">
            The invitation link is missing or invalid. Please check your email
            or contact the admin.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-slate-50 flex items-center justify-center p-4">
      {/* Toaster Component */}
      <Toaster position="top-right" reverseOrder={false} />

      <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-600/30 border border-indigo-400/30 flex items-center justify-center text-indigo-400 shrink-0">
            <KeyRound className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-bold">Set Your Password</h1>
            <p className="text-xs text-slate-400">
              Create a new password to complete your account setup
            </p>
          </div>
        </div>

        {/* Global Error Message from Backend Hook */}
        {setPassIsError && (
          <div className="mx-6 mt-6 p-3 rounded-xl bg-red-50 border border-red-100 text-xs text-red-600">
            {setPassError?.message ||
              "An error occurred while setting the password."}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          {/* New Password */}
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-700">
              New Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                placeholder="••••••••"
                {...register("password")}
                className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all text-slate-800"
              />
            </div>
            {errors.password && <FormError error={errors.password.message} />}
          </div>

          {/* Confirm Password */}
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-700">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                placeholder="••••••••"
                {...register("confirmPassword")}
                className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all text-slate-800"
              />
            </div>
            {errors.confirmPassword && (
              <FormError error={errors.confirmPassword.message} />
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={setPassIsLoading}
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-xl transition-all shadow-sm disabled:opacity-50 cursor-pointer"
            >
              {setPassIsLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Activating Account...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Set Password & Activate</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
