import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <div className="w-full space-y-1">
        <input
          type={type}
          className={cn(
            "flex h-9 w-full rounded-lg border border-neutral-200 bg-white px-3 py-1 text-sm text-neutral-900 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40 focus-visible:border-emerald-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 dark:placeholder:text-neutral-500",
            error && "border-rose-500 focus-visible:ring-rose-500/40",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="text-xs text-rose-500 mt-1 font-medium">{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";
