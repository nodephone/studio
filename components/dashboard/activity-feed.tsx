"use client";

import { ActivityEvent } from "@/lib/api/metrics";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/layout";
import { Badge, Skeleton, EmptyState } from "@/components/ui";
import {
  Activity,
  Database,
  Code2,
  HardDrive,
  UserCheck,
  ShieldCheck,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ActivityFeedProps {
  activities?: ActivityEvent[];
  isLoading?: boolean;
}

export function ActivityFeed({ activities, isLoading }: ActivityFeedProps) {
  const getEventIcon = (type: ActivityEvent["type"]) => {
    switch (type) {
      case "migration":
        return <Database className="w-3.5 h-3.5 text-emerald-500" />;
      case "deployment":
        return <Code2 className="w-3.5 h-3.5 text-indigo-500" />;
      case "upload":
        return <HardDrive className="w-3.5 h-3.5 text-amber-500" />;
      case "signin":
        return <UserCheck className="w-3.5 h-3.5 text-blue-500" />;
      case "backup":
        return <ShieldCheck className="w-3.5 h-3.5 text-purple-500" />;
    }
  };

  return (
    <Card className="border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <div className="flex items-center space-x-2">
          <Activity className="w-4 h-4 text-emerald-500" />
          <CardTitle className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
            Realtime Activity Feed
          </CardTitle>
        </div>
        <Badge variant="outline" className="font-mono text-[10px]">
          Live Stream
        </Badge>
      </CardHeader>

      <CardContent className="p-4 pt-0">
        {isLoading ? (
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center space-x-3">
                <Skeleton className="w-7 h-7 rounded-full shrink-0" />
                <div className="space-y-1.5 flex-1">
                  <Skeleton className="h-3.5 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : !activities || activities.length === 0 ? (
          <EmptyState
            title="No Activity Logged"
            description="System telemetry is quiet. Events will stream here automatically."
          />
        ) : (
          <div className="space-y-3">
            {activities.map((evt) => (
              <div
                key={evt.id}
                className="flex items-start justify-between space-x-3 p-2.5 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
              >
                <div className="flex items-start space-x-3 min-w-0">
                  <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 shrink-0 mt-0.5">
                    {getEventIcon(evt.type)}
                  </div>

                  <div className="min-w-0 space-y-0.5">
                    <p className="text-xs font-semibold text-neutral-900 dark:text-neutral-100 leading-snug truncate">
                      {evt.title}
                    </p>
                    <div className="flex items-center space-x-2 text-[11px] text-neutral-500">
                      <span className="font-mono text-neutral-400 truncate">
                        {evt.actor}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-1 shrink-0 text-[10px] text-neutral-400 font-mono">
                  <Clock className="w-3 h-3 text-neutral-400" />
                  <span>{evt.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
