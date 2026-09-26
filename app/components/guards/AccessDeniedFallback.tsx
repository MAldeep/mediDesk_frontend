"use client";

import { usePermission } from "@/app/hooks/usePermissions";
import Link from "next/link";
import { ShieldAlert, ArrowLeft } from "lucide-react";

export default function AccessDeniedFallback() {
  const { userRole } = usePermission();

  return (
    <div className="min-h-screen w-full bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200/80 shadow-xs p-8 text-center space-y-5">
        <div className="w-14 h-14 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto border border-red-100">
          <ShieldAlert className="w-7 h-7" />
        </div>

        <div className="space-y-1.5">
          <h1 className="text-base font-bold text-slate-800">Access Denied</h1>
          <h2 className="text-xs text-slate-500 leading-relaxed font-normal">
            You Are not allowed to do this action
          </h2>
        </div>

        <div className="pt-2">
          <Link
            href={`/dashboard/${userRole}`}
            className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-all shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back To Dashboard</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
