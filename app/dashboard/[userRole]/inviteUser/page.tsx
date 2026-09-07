"use client";

import FormError from "@/app/(auth)/Auth_Components/FormError";
import { useAuth } from "@/app/(auth)/hooks/useAuth";
import { useAuthStore } from "@/app/stores/useAuthStore";
import {
  inviteUserSchema,
  InviteUserType,
} from "@/app/validations/inviteUser.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { UserPlus, Mail, User, ShieldCheck, Loader2, Send } from "lucide-react";

export default function InviteUserPage() {
  const { invite, inviteError, inviteIsLoading, inviteUserIsError } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<InviteUserType>({
    resolver: zodResolver(inviteUserSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "staff",
    },
  });

  const admin = useAuthStore((state) => state.user);
  const adminName = admin?.name;

  const onSubmit = (formData: InviteUserType) => {
    const data = {
      name: formData.name,
      email: formData.email,
      role: formData.role,
      adminName: adminName,
    };
    invite(data, {
      onSuccess: () => {
        toast.success(`Invitation successfully sent to ${data.email}!`, {
          duration: 4000,
          style: {
            borderRadius: "12px",
            background: "#0f172a",
            color: "#fff",
            fontSize: "13px",
          },
        });
        reset();
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError: (err: any) => {
        toast.error(
          err?.message || "Failed to send invitation. Please try again.",
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
    });
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 flex items-center justify-center p-4">
      {/* Toast Container */}
      <Toaster position="top-right" reverseOrder={false} />

      <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        {/* Card Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-600/30 border border-indigo-400/30 flex items-center justify-center text-indigo-400 shrink-0">
            <UserPlus className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-bold">Invite Team Member</h1>
            <p className="text-xs text-slate-400">
              Send an email invitation to join your clinic network
            </p>
          </div>
        </div>

        {/* Global Error Banner */}
        {inviteUserIsError && (
          <div className="mx-6 mt-6 p-3 rounded-xl bg-red-50 border border-red-100 text-xs text-red-600">
            {inviteError?.message || "An unexpected error occurred."}
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          {/* Full Name Field */}
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-700">
              Full Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="e.g. Dr. Sarah Ahmed"
                {...register("name")}
                className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all text-slate-800"
              />
            </div>
            {errors.name && <FormError error={errors.name.message} />}
          </div>

          {/* Email Address Field */}
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-700">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                placeholder="doctor@example.com"
                {...register("email")}
                className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all text-slate-800"
              />
            </div>
            {errors.email && <FormError error={errors.email.message} />}
          </div>

          {/* Role Selection Field */}
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-700">
              Role
            </label>
            <div className="relative">
              <ShieldCheck className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <select
                {...register("role")}
                className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all text-slate-800 appearance-none cursor-pointer"
              >
                <option value="doctor">Doctor</option>
                <option value="staff">Staff Member</option>
              </select>
            </div>
            {errors.role && <FormError error={errors.role.message} />}
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={inviteIsLoading}
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-xl transition-all shadow-sm disabled:opacity-50 cursor-pointer"
            >
              {inviteIsLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Sending Invitation...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Invitation</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
