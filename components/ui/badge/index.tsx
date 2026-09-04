"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "emerald" | "amber" | "rose" | "indigo";
  dot?: boolean;
}

export function Badge({
  className,
  variant = "default",
  dot = false,
  children,
  ...props
}: BadgeProps) {
  const variants = {
    default:
      "bg-neutral-900 text-neutral-100 dark:bg-neutral-100 dark:text-neutral-900 border-transparent",
    secondary:
      "bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200 border-transparent",
    outline:
      "text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-800",
    emerald:
      "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    amber:
      "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    rose:
      "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
    indigo:
      "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
  };

  const dotColors = {
    default: "bg-neutral-100 dark:bg-neutral-900",
    secondary: "bg-neutral-500",
    outline: "bg-neutral-400",
    emerald: "bg-emerald-500",
    amber: "bg-amber-500",
    rose: "bg-rose-500",
    indigo: "bg-indigo-500",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center space-x-1.5 rounded-md border px-2 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/40 select-none",
        variants[variant],
        className
      )}
      {...props}
    >
      {dot && (
        <span className={cn("w-1.5 h-1.5 rounded-full", dotColors[variant])} />
      )}
      <span>{children}</span>
    </div>
  );
}
