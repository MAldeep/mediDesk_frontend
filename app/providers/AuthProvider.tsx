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
    let isMounted = true;

    const initAuth = async () => {
      try {
        const response = await api.get("/auth/me");
        const user = response.data?.data?.user || response.data?.user;

        const currentToken = useAuthStore.getState().accessToken;

        if (isMounted) {
          if (user && currentToken) {
            setAuth(user, currentToken);
          } else if (user) {
            useAuthStore.setState({ user });
          } else {
            clearAuth();
          }
        }
      } catch (error) {
        if (isMounted) {
          clearAuth();
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
