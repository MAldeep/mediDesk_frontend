"use client";

import { useIsMounted } from "@/app/hooks/useIsMounted";
import { useAuthStore } from "@/app/stores/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function GuestGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthenticated = useAuthStore((state) =>
    Boolean(state.user && state.accessToken),
  );
  const router = useRouter();
  const isMounted = useIsMounted();
  useEffect(() => {
    if (isMounted && isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [isAuthenticated, isMounted, router]);
  if (!isMounted || !isAuthenticated) {
    return null;
  }
  return <>{children}</>;
}
