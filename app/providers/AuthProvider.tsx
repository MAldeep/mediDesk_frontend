"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/app/stores/useAuthStore";
import { api } from "@/app/lib/axiosClient";
import Cookies from "js-cookie";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const setAuth = useAuthStore((state) => state.setAuth);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const initAuth = async () => {
      try {
        const cookieToken = Cookies.get("accessToken");
        const response = await api.get("/auth/me");
        const user = response.data?.data?.user || response.data?.user;
        const token =
          response.data?.data?.accessToken ||
          response.data?.accessToken ||
          cookieToken;

        if (isMounted) {
          if (user && token) {
            setAuth(user, token);
            Cookies.set("accessToken", token, {
              expires: 1,
              secure: true,
              sameSite: "strict",
            });
          } else if (user) {
            useAuthStore.setState({ user });
          } else {
            clearAuth();
            Cookies.remove("accessToken");
          }
        }
      } catch (error) {
        if (isMounted) {
          clearAuth();
          Cookies.remove("accessToken");
        }
      } finally {
        if (isMounted) {
          setIsInitializing(false);
        }
      }
    };

    initAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  if (isInitializing) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return <>{children}</>;
}
