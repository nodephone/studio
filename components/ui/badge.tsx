import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "emerald" | "amber" | "rose";
}

export function Badge({
  className,
  variant = "default",
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
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
