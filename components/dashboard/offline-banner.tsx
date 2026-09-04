"use client";

import { Button } from "@/components/ui";
import { AlertCircle, RefreshCw, WifiOff } from "lucide-react";

interface OfflineBannerProps {
  onRetry: () => void;
  error?: Error | null;
}

export function OfflineBanner({ onRetry, error }: OfflineBannerProps) {
  return (
    <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-900 dark:text-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-in fade-in duration-150">
      <div className="flex items-center space-x-3">
        <div className="p-2 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 shrink-0">
          <WifiOff className="w-5 h-5" />
        </div>
        <div className="space-y-0.5">
          <h4 className="text-xs font-bold uppercase tracking-wider">
            Server Telemetry Offline
          </h4>
          <p className="text-xs text-amber-700 dark:text-amber-300">
            {error?.message || "Unable to reach NodePhone Server API. Showing cached snapshot."}
          </p>
        </div>
      </div>

      <Button
        onClick={onRetry}
        variant="outline"
        size="sm"
        className="border-amber-500/30 text-amber-800 dark:text-amber-200 hover:bg-amber-500/10 shrink-0 cursor-pointer"
      >
        <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
        <span>Reconnect Now</span>
      </Button>
    </div>
  );
}
