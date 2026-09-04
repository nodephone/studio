"use client";

import { ValidationError } from "@/lib/api/designer";
import { AlertTriangle, AlertCircle, CheckCircle2 } from "lucide-react";

interface ValidationBannerProps {
  errors: ValidationError[];
}

export function ValidationBanner({ errors }: ValidationBannerProps) {
  if (errors.length === 0) {
    return (
      <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs flex items-center space-x-2">
        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
        <span className="font-semibold">Schema Validated:</span>
        <span>Zero validation errors or reserved keyword collisions detected.</span>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {errors.map((err, idx) => {
        const isWarning = err.type === "warning";
        return (
          <div
            key={idx}
            className={`p-3 rounded-xl border text-xs flex items-center space-x-2 ${
              isWarning
                ? "bg-amber-500/10 border-amber-500/20 text-amber-800 dark:text-amber-300"
                : "bg-rose-500/10 border-rose-500/20 text-rose-800 dark:text-rose-300"
            }`}
          >
            {isWarning ? (
              <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
            )}
            <span className="font-semibold capitalize">{err.field}:</span>
            <span>{err.message}</span>
          </div>
        );
      })}
    </div>
  );
}
