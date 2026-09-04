"use client";

import { useAuthStore } from "@/stores/auth-store";
import { useWorkspaceStore } from "@/stores/workspace-store";
import { Button, Badge } from "@/components/ui";
import { RefreshCw, Search, ShieldCheck, Sparkles, WifiOff } from "lucide-react";

interface WelcomeHeaderProps {
  onRefresh: () => void;
  isRefreshing?: boolean;
  isOffline?: boolean;
  onToggleOffline?: () => void;
}

export function WelcomeHeader({
  onRefresh,
  isRefreshing = false,
  isOffline = false,
  onToggleOffline,
}: WelcomeHeaderProps) {
  const { user } = useAuthStore();
  const { activeWorkspace } = useWorkspaceStore();

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-neutral-900 via-neutral-900 to-neutral-950 text-white border border-neutral-800 shadow-xl relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="space-y-2 relative z-10">
        <div className="flex items-center space-x-2">
          <Badge variant="emerald" dot className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
            {activeWorkspace.name}
          </Badge>
          <span className="text-xs text-neutral-400 font-mono">
            [{activeWorkspace.region}]
          </span>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
          Welcome back, {user?.name || "Developer"} 👋
        </h1>
        <p className="text-xs md:text-sm text-neutral-400 max-w-xl">
          NodePhone Server telemetry center. Monitor live CPU/Memory, database size, realtime event feeds, and manage backend services.
        </p>
      </div>

      <div className="flex items-center space-x-2 shrink-0 relative z-10">
        <Button
          onClick={onRefresh}
          variant="secondary"
          size="sm"
          isLoading={isRefreshing}
          className="bg-neutral-800 hover:bg-neutral-700 text-neutral-100 border-neutral-700 cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
          <span>Sync Telemetry</span>
        </Button>

        {onToggleOffline && (
          <Button
            onClick={onToggleOffline}
            variant="outline"
            size="sm"
            className="border-neutral-700 text-neutral-300 hover:bg-neutral-800 cursor-pointer"
          >
            {isOffline ? (
              <span className="text-emerald-400 flex items-center">
                <ShieldCheck className="w-3.5 h-3.5 mr-1" />
                Go Online
              </span>
            ) : (
              <span className="text-amber-400 flex items-center">
                <WifiOff className="w-3.5 h-3.5 mr-1" />
                Simulate Offline
              </span>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
