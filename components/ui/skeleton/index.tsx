"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  shape?: "rectangle" | "circle" | "pill";
}

export function Skeleton({
  className,
  shape = "rectangle",
  ...props
}: SkeletonProps) {
  const shapes = {
    rectangle: "rounded-lg",
    circle: "rounded-full",
    pill: "rounded-full",
  };

  return (
    <div
      className={cn(
        "animate-pulse bg-neutral-200 dark:bg-neutral-800/80",
        shapes[shape],
        className
      )}
      {...props}
    />
  );
}
