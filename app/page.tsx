"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth-store";
import { Loader2 } from "lucide-react";

export default function RootPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading, validateSession } = useAuthStore();

  useEffect(() => {
    validateSession();
  }, [validateSession]);

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        router.replace("/dashboard");
      } else {
        router.replace("/auth/login");
      }
    }
  }, [isAuthenticated, isLoading, router]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-neutral-950 text-neutral-200">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center shadow-2xl animate-pulse">
          <span className="font-bold text-xl text-emerald-400">N</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-neutral-400">
          <Loader2 className="w-4 h-4 animate-spin text-emerald-500" />
          <span>Redirecting to NodePhone Studio...</span>
        </div>
      </div>
    </div>
  );
}
