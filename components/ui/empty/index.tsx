"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Inbox } from "lucide-react";

export interface EmptyStateProps {
  icon?: React.ElementType;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-8 text-center rounded-2xl border border-dashed border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30 space-y-3",
        className
      )}
    >
      <div className="p-3 rounded-2xl bg-white dark:bg-neutral-800 text-neutral-400 border border-neutral-200 dark:border-neutral-700 shadow-2xs">
        <Icon className="w-6 h-6 text-emerald-500" />
      </div>

      <div className="space-y-1 max-w-sm">
        <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
          {title}
        </h4>
        {description && (
          <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {action && <div className="pt-2">{action}</div>}
    </div>
  );
}
