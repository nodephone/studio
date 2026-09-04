"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Check, Minus } from "lucide-react";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: React.ReactNode;
  indeterminate?: boolean;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, checked, indeterminate, id, onChange, ...props }, ref) => {
    const checkboxId = id || React.useId();
    const inputRef = React.useRef<HTMLInputElement | null>(null);

    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    React.useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = !!indeterminate;
      }
    }, [indeterminate]);

    return (
      <label
        htmlFor={checkboxId}
        className="inline-flex items-center space-x-2.5 cursor-pointer select-none group"
      >
        <div className="relative flex items-center justify-center">
          <input
            id={checkboxId}
            type="checkbox"
            ref={inputRef}
            checked={checked}
            onChange={onChange}
            className="peer sr-only"
            {...props}
          />
          <div
            className={cn(
              "w-4 h-4 rounded border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 transition-all flex items-center justify-center peer-focus-visible:ring-2 peer-focus-visible:ring-emerald-500/40 peer-checked:bg-emerald-600 peer-checked:border-emerald-600 peer-checked:text-white dark:peer-checked:bg-emerald-500 dark:peer-checked:border-emerald-500 group-hover:border-neutral-400 dark:group-hover:border-neutral-600",
              (checked || indeterminate) && "bg-emerald-600 border-emerald-600 text-white dark:bg-emerald-500 dark:border-emerald-500",
              className
            )}
          >
            {indeterminate ? (
              <Minus className="w-3 h-3 stroke-[3]" />
            ) : checked ? (
              <Check className="w-3 h-3 stroke-[3]" />
            ) : null}
          </div>
        </div>
        {label && (
          <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
            {label}
          </span>
        )}
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";
