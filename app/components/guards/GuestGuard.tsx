"use client";

import { useIsMounted } from "@/app/hooks/useIsMounted";
import { useIsAuthenticated } from "@/app/stores/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function GuestGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthenticated = useIsAuthenticated();
  const router = useRouter();
  const isMounted = useIsMounted();
  useEffect(() => {
    if (isMounted && isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [isAuthenticated, isMounted, router]);
  if (!isMounted || isAuthenticated) {
    return null;
  }
  return <>{children}</>;
}
