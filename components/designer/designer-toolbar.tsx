"use client";

import { Button, Input, Badge } from "@/components/ui";
import {
  Undo2,
  Redo2,
  RotateCcw,
  Sparkles,
  Database,
  Code2,
  CheckCircle2,
} from "lucide-react";

interface DesignerToolbarProps {
  tableName: string;
  onTableNameChange: (name: string) => void;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  onReset: () => void;
  onApply: () => void;
  isApplying?: boolean;
  hasErrors?: boolean;
}

export function DesignerToolbar({
  tableName,
  onTableNameChange,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onReset,
  onApply,
  isApplying = false,
  hasErrors = false,
}: DesignerToolbarProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 rounded-t-2xl">
      {/* Left: Table Name Input */}
      <div className="flex items-center space-x-3">
        <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 shrink-0">
          <Database className="w-4 h-4" />
        </div>
        <div className="flex items-center space-x-2">
          <Input
            value={tableName}
            onChange={(e) => onTableNameChange(e.target.value)}
            placeholder="table_name"
            className="h-8 text-xs font-mono font-bold w-48 bg-neutral-50 dark:bg-neutral-950"
          />
          <Badge variant="outline" className="font-mono text-[10px] hidden sm:inline-flex">
            schema: public
          </Badge>
        </div>
      </div>

      {/* Right: History Controls & Apply Migration */}
      <div className="flex items-center space-x-2 shrink-0">
        <div className="flex items-center space-x-1 border-r border-neutral-200 dark:border-neutral-800 pr-2">
          <Button
            onClick={onUndo}
            disabled={!canUndo}
            variant="ghost"
            size="sm"
            className="h-8 px-2 text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 disabled:opacity-30 cursor-pointer"
            title="Undo (⌘Z)"
          >
            <Undo2 className="w-4 h-4" />
          </Button>
          <Button
            onClick={onRedo}
            disabled={!canRedo}
            variant="ghost"
            size="sm"
            className="h-8 px-2 text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 disabled:opacity-30 cursor-pointer"
            title="Redo (⌘⇧Z)"
          >
            <Redo2 className="w-4 h-4" />
          </Button>
          <Button
            onClick={onReset}
            variant="ghost"
            size="sm"
            className="h-8 px-2 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300 cursor-pointer"
            title="Reset Schema"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </Button>
        </div>

        <Button
          onClick={onApply}
          disabled={hasErrors}
          isLoading={isApplying}
          variant="primary"
          size="sm"
          className="h-8 px-3 text-xs bg-emerald-600 hover:bg-emerald-500 text-white font-semibold cursor-pointer border-emerald-500"
          leftIcon={<Sparkles className="w-3.5 h-3.5" />}
        >
          Apply Migration
        </Button>
      </div>
    </div>
  );
}
