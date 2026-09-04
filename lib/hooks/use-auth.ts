"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/stores/auth-store";

export function useAuth() {
  const {
    user,
    session,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    validateSession,
  } = useAuthStore();

  useEffect(() => {
    validateSession();
  }, [validateSession]);

  return {
    user,
    session,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    validateSession,
  };
}
