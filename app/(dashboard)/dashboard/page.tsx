"use client";

import { useMetrics } from "@/lib/hooks/use-metrics";
import { WelcomeHeader } from "@/components/dashboard/welcome-header";
import { ServerStatus } from "@/components/dashboard/server-status";
import { MetricCards } from "@/components/dashboard/metric-cards";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { OfflineBanner } from "@/components/dashboard/offline-banner";
import { Container } from "@/components/layout";

export default function DashboardPage() {
  const {
    serverStatus,
    metrics,
    activities,
    isLoading,
    isError,
    error,
    refetch,
    isSimulatedOffline,
    toggleSimulatedOffline,
  } = useMetrics();

  return (
    <Container size="xl" className="space-y-6 py-4">
      {/* 1. Welcome Header */}
      <WelcomeHeader
        onRefresh={refetch}
        isRefreshing={isLoading}
        isOffline={isSimulatedOffline}
        onToggleOffline={toggleSimulatedOffline}
      />

      {/* 2. Offline / Error State Banner */}
      {(isError || isSimulatedOffline) && (
        <OfflineBanner onRetry={refetch} error={error} />
      )}

      {/* 3. Live Server Status & Metrics */}
      <div className="space-y-6">
        <ServerStatus
          data={serverStatus}
          isLoading={isLoading}
          isError={isError || isSimulatedOffline}
        />

        <MetricCards
          metrics={metrics}
          isLoading={isLoading && !metrics}
        />
      </div>

      {/* 4. Realtime Activity Feed & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <QuickActions />
        </div>
        <div className="lg:col-span-1">
          <ActivityFeed
            activities={activities}
            isLoading={isLoading && !activities}
          />
        </div>
      </div>
    </Container>
  );
}
