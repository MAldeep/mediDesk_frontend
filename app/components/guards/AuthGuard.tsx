"use client";

import { useIsMounted } from "@/app/hooks/useIsMounted";
import { useIsAuthenticated } from "@/app/stores/useAuthStore";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useIsAuthenticated();
  const router = useRouter();
  const isMounted = useIsMounted();
  useEffect(() => {
    if (isMounted && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, isMounted, router]);
  if (!isMounted || !isAuthenticated) {
    return null;
  }
  return <>{children}</>;
}
