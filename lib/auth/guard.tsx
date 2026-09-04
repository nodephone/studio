"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/stores/auth-store";
import { Loader2 } from "lucide-react";

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isLoading, validateSession } = useAuthStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    validateSession();
  }, [validateSession]);

  useEffect(() => {
    if (!isMounted || isLoading) return;

    const isAuthRoute = pathname.startsWith("/auth");

    if (!isAuthenticated && !isAuthRoute) {
      router.replace("/auth/login");
    } else if (isAuthenticated && isAuthRoute) {
      router.replace("/dashboard");
    }
  }, [isAuthenticated, isLoading, isMounted, pathname, router]);

  if (!isMounted || isLoading) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-neutral-950 text-neutral-200">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center shadow-lg shadow-black/50 animate-pulse">
            <span className="font-bold text-lg text-emerald-400">N</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-neutral-400">
            <Loader2 className="w-4 h-4 animate-spin text-emerald-500" />
            <span>Validating NodePhone Studio session...</span>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
