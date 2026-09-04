"use client";

import { ServerStatusData } from "@/lib/api/metrics";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/layout";
import { Badge, Skeleton } from "@/components/ui";
import { Server, Activity, Globe, ShieldCheck, Zap } from "lucide-react";

interface ServerStatusProps {
  data?: ServerStatusData;
  isLoading?: boolean;
  isError?: boolean;
}

export function ServerStatus({ data, isLoading, isError }: ServerStatusProps) {
  if (isLoading) {
    return (
      <Card className="border-neutral-200 dark:border-neutral-800">
        <CardHeader>
          <Skeleton className="h-4 w-32" />
        </CardHeader>
        <CardContent className="space-y-3">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-full" />
        </CardContent>
      </Card>
    );
  }

  const isOnline = !isError && data?.status === "online";

  return (
    <Card className="border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <div className="flex items-center space-x-2">
          <Server className="w-4 h-4 text-emerald-500" />
          <CardTitle className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
            Live Server Health
          </CardTitle>
        </div>
        <Badge
          variant={isOnline ? "emerald" : "rose"}
          dot
          className="font-mono text-[11px]"
        >
          {isOnline ? "Kernel Connected" : "Server Offline"}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-4 pt-1">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200/60 dark:border-neutral-800">
          <div className="space-y-0.5">
            <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
              Connected Target URL
            </span>
            <div className="flex items-center space-x-2 font-mono text-xs font-bold text-neutral-900 dark:text-neutral-100">
              <Globe className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span className="truncate">{data?.connectedUrl || "https://kernel.nodephone.io:8443"}</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold">
              Latency: {data?.lastPingMs || 14}ms
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-2.5 rounded-lg border border-neutral-100 dark:border-neutral-800/80 bg-neutral-50/50 dark:bg-neutral-900/30">
            <span className="text-[10px] text-neutral-400 font-semibold uppercase">Kernel Version</span>
            <p className="font-mono font-bold text-neutral-900 dark:text-neutral-100 mt-0.5">
              {data?.version || "v1.0.4"}
            </p>
          </div>

          <div className="p-2.5 rounded-lg border border-neutral-100 dark:border-neutral-800/80 bg-neutral-50/50 dark:bg-neutral-900/30">
            <span className="text-[10px] text-neutral-400 font-semibold uppercase">Environment</span>
            <p className="font-semibold text-neutral-900 dark:text-neutral-100 mt-0.5">
              {data?.environment || "Production"}
            </p>
          </div>

          <div className="p-2.5 rounded-lg border border-neutral-100 dark:border-neutral-800/80 bg-neutral-50/50 dark:bg-neutral-900/30 col-span-2 sm:col-span-1">
            <span className="text-[10px] text-neutral-400 font-semibold uppercase">Uptime Ratio</span>
            <p className="font-mono font-bold text-emerald-600 dark:text-emerald-400 mt-0.5 truncate">
              {data?.uptimeFormatted || "99.98%"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
