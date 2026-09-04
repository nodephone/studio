"use client";

import { useQuery } from "@tanstack/react-query";
import {
  fetchServerStatus,
  fetchSystemMetrics,
  fetchActivityFeed,
  SystemMetrics,
  ServerStatusData,
  ActivityEvent,
} from "@/lib/api/metrics";
import { useState } from "react";

export function useMetrics() {
  const [isSimulatedOffline, setIsSimulatedOffline] = useState(false);

  const serverStatusQuery = useQuery<ServerStatusData>({
    queryKey: ["serverStatus", isSimulatedOffline],
    queryFn: async () => {
      if (isSimulatedOffline) {
        throw new Error("NodePhone Server is offline or unreachable.");
      }
      return fetchServerStatus();
    },
    refetchInterval: 5000,
    retry: 1,
  });

  const metricsQuery = useQuery<SystemMetrics>({
    queryKey: ["systemMetrics", isSimulatedOffline],
    queryFn: async () => {
      if (isSimulatedOffline) {
        throw new Error("Failed to fetch system metrics.");
      }
      return fetchSystemMetrics();
    },
    refetchInterval: 4000,
    retry: 1,
  });

  const activityQuery = useQuery<ActivityEvent[]>({
    queryKey: ["activityFeed", isSimulatedOffline],
    queryFn: async () => {
      if (isSimulatedOffline) {
        return [];
      }
      return fetchActivityFeed();
    },
    refetchInterval: 10000,
  });

  const toggleSimulatedOffline = () => {
    setIsSimulatedOffline((prev) => !prev);
  };

  return {
    serverStatus: serverStatusQuery.data,
    metrics: metricsQuery.data,
    activities: activityQuery.data,
    isLoading: serverStatusQuery.isLoading || metricsQuery.isLoading,
    isError: serverStatusQuery.isError || metricsQuery.isError,
    error: serverStatusQuery.error || metricsQuery.error,
    refetch: () => {
      serverStatusQuery.refetch();
      metricsQuery.refetch();
      activityQuery.refetch();
    },
    isSimulatedOffline,
    toggleSimulatedOffline,
  };
}
