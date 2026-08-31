"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/app/stores/useAuthStore";
import { api } from "@/app/lib/axiosClient";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const setAuth = useAuthStore((state) => state.setAuth);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const response = await api.get("/auth/me");
        const user = response.data?.data?.user || response.data?.user;
        const accessToken =
          response.data?.data?.accessToken || response.data?.accessToken;
        if (user) {
          setAuth(user, accessToken);
        } else {
          clearAuth();
        }
      } catch (error) {
        clearAuth();
      } finally {
        setIsInitializing(false);
      }
    };

    initAuth();
  }, [setAuth, clearAuth]);

  if (isInitializing) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return <>{children}</>;
}
