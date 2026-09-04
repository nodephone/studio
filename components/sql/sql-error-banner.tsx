"use client";

import { AlertCircle } from "lucide-react";

interface SQLErrorBannerProps {
  error: string;
}

export function SQLErrorBanner({ error }: SQLErrorBannerProps) {
  return (
    <div className="p-3.5 bg-rose-500/10 border-b border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs flex items-start space-x-3 shrink-0">
      <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
      <div className="space-y-0.5 font-mono">
        <span className="font-bold">SQL Execution Error:</span>
        <p className="text-[11px] leading-relaxed">{error}</p>
      </div>
    </div>
  );
}
