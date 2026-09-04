"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface SectionProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  divider?: boolean;
}

export function Section({
  title,
  description,
  action,
  divider = true,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section className={cn("space-y-4", className)} {...props}>
      {(title || description || action) && (
        <div className="flex items-center justify-between pb-2">
          <div className="space-y-0.5">
            {title && (
              <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                {title}
              </h3>
            )}
            {description && (
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                {description}
              </p>
            )}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      {children}
      {divider && <div className="border-b border-neutral-100 dark:border-neutral-800/80 pt-2" />}
    </section>
  );
}
