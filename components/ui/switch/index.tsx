"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface SwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label?: React.ReactNode;
  disabled?: boolean;
  size?: "sm" | "md";
  className?: string;
}

export function Switch({
  checked,
  onCheckedChange,
  label,
  disabled = false,
  size = "md",
  className,
}: SwitchProps) {
  const switchId = React.useId();

  const handleToggle = () => {
    if (!disabled) {
      onCheckedChange(!checked);
    }
  };

  const dimensions = {
    sm: { track: "w-8 h-4.5 p-0.5", thumb: "w-3.5 h-3.5", translate: 14 },
    md: { track: "w-10 h-5.5 p-0.5", thumb: "w-4.5 h-4.5", translate: 18 },
  }[size];

  return (
    <label
      htmlFor={switchId}
      className={cn(
        "inline-flex items-center space-x-2.5 select-none cursor-pointer",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      <button
        id={switchId}
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={handleToggle}
        className={cn(
          "relative flex items-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40 cursor-pointer",
          dimensions.track,
          checked
            ? "bg-emerald-600 dark:bg-emerald-500"
            : "bg-neutral-200 dark:bg-neutral-800"
        )}
      >
        <motion.span
          className={cn(
            "rounded-full bg-white shadow-xs pointer-events-none block",
            dimensions.thumb
          )}
          animate={{ x: checked ? dimensions.translate : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </button>
      {label && (
        <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
          {label}
        </span>
      )}
    </label>
  );
}
