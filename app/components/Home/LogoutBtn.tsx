"use client";
import { useAuth } from "@/app/(auth)/hooks/useAuth";
import { LogOut } from "lucide-react";

export default function LogoutBtn() {
  const { logout, logoutIsLoading } = useAuth();
  return (
    <button
      onClick={() => logout()}
      disabled={logoutIsLoading}
      className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 cursor-pointer rounded-xl shadow-sm shadow-blue-500/20 transition duration-200"
    >
      <LogOut className="w-4 h-4" />
      <span className="hidden lg:block">Logout</span>
    </button>
  );
}
