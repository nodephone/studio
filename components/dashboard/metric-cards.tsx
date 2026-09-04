"use client";

import { SystemMetrics } from "@/lib/api/metrics";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/layout";
import { Skeleton, Badge } from "@/components/ui";
import { Cpu, HardDrive, Database, Users, Activity, Layers, ArrowUpRight, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardsProps {
  metrics?: SystemMetrics;
  isLoading?: boolean;
}

export function MetricCards({ metrics, isLoading }: MetricCardsProps) {
  if (isLoading || !metrics) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="border-neutral-200 dark:border-neutral-800">
            <CardHeader className="p-4 pb-2">
              <Skeleton className="h-4 w-24" />
            </CardHeader>
            <CardContent className="p-4 pt-0 space-y-2">
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-2 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const memoryPercent = Math.round((metrics.memoryUsageMB / metrics.totalMemoryMB) * 100);

  const cards = [
    {
      id: "cpu",
      title: "CPU Utilization",
      value: `${metrics.cpuUsage}%`,
      subtext: `${metrics.cpuUsage < 50 ? "Optimal load" : "Heavy load"}`,
      progress: metrics.cpuUsage,
      icon: Cpu,
      color: metrics.cpuUsage > 75 ? "text-rose-500" : "text-emerald-500",
      barColor: metrics.cpuUsage > 75 ? "bg-rose-500" : "bg-emerald-500",
    },
    {
      id: "memory",
      title: "RAM Memory",
      value: `${(metrics.memoryUsageMB / 1024).toFixed(2)} GB`,
      subtext: `${memoryPercent}% of ${(metrics.totalMemoryMB / 1024).toFixed(0)} GB`,
      progress: memoryPercent,
      icon: Layers,
      color: "text-emerald-500",
      barColor: "bg-emerald-500",
    },
    {
      id: "database",
      title: "Database Volume",
      value: `${metrics.databaseSizeMB.toFixed(1)} MB`,
      subtext: "PostgreSQL 16 Engine",
      progress: 42,
      icon: Database,
      color: "text-indigo-500",
      barColor: "bg-indigo-500",
    },
    {
      id: "storage",
      title: "Object Storage",
      value: `${metrics.storageUsageGB.toFixed(1)} GB`,
      subtext: "S3 Compatible Buckets",
      progress: 28,
      icon: HardDrive,
      color: "text-amber-500",
      barColor: "bg-amber-500",
    },
    {
      id: "users",
      title: "Active Authenticated Users",
      value: `${metrics.activeUsers}`,
      subtext: "+12% this week",
      progress: 68,
      icon: Users,
      color: "text-blue-500",
      barColor: "bg-blue-500",
    },
    {
      id: "realtime",
      title: "Realtime WebSockets",
      value: `${metrics.realtimeConnections}`,
      subtext: "Channels broadcasting",
      progress: 54,
      icon: Activity,
      color: "text-purple-500",
      barColor: "bg-purple-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Card
            key={card.id}
            className="border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all group"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 pb-2">
              <CardTitle className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                {card.title}
              </CardTitle>
              <div className={cn("p-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800", card.color)}>
                <Icon className="w-4 h-4" />
              </div>
            </CardHeader>

            <CardContent className="p-4 pt-1 space-y-3">
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-black tracking-tight text-neutral-900 dark:text-neutral-100">
                  {card.value}
                </span>
                <span className="text-[11px] font-mono text-neutral-400">
                  {card.subtext}
                </span>
              </div>

              {/* Progress indicator */}
              <div className="w-full bg-neutral-100 dark:bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className={cn("h-full rounded-full transition-all duration-500", card.barColor)}
                  style={{ width: `${card.progress}%` }}
                />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
