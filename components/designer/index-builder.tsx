"use client";

import { IndexDefinition, DesignerColumn } from "@/lib/api/designer";
import { Button, Input, Badge, Checkbox } from "@/components/ui";
import { Layers, Plus, Trash2 } from "lucide-react";

interface IndexBuilderProps {
  indexes: IndexDefinition[];
  columns: DesignerColumn[];
  tableName: string;
  onAddIndex: (idx: IndexDefinition) => void;
  onDeleteIndex: (id: string) => void;
}

export function IndexBuilder({
  indexes,
  columns,
  tableName,
  onAddIndex,
  onDeleteIndex,
}: IndexBuilderProps) {
  const handleAddNewIndex = () => {
    const col = columns[0]?.name || "column";
    onAddIndex({
      id: `idx_${Date.now()}`,
      indexName: `idx_${tableName}_${col}`,
      columns: [col],
      isUnique: false,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 flex items-center space-x-2">
            <Layers className="w-4 h-4 text-emerald-500" />
            <span>Database Indexes ({indexes.length})</span>
          </h4>
          <p className="text-xs text-neutral-500">
            Speed up query lookups with single or composite multi-column index definitions.
          </p>
        </div>
        <Button
          onClick={handleAddNewIndex}
          variant="outline"
          size="sm"
          className="h-8 text-xs cursor-pointer"
          leftIcon={<Plus className="w-3.5 h-3.5" />}
        >
          Add Index
        </Button>
      </div>

      {indexes.length === 0 ? (
        <div className="p-8 text-center rounded-xl border border-dashed border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30 text-xs text-neutral-400">
          No indexes created. Click &quot;Add Index&quot; to build a lookup index.
        </div>
      ) : (
        <div className="space-y-2.5">
          {indexes.map((idx) => (
            <div
              key={idx.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-2xs font-mono text-xs"
            >
              <div className="flex items-center space-x-3">
                <span className="font-bold text-neutral-900 dark:text-neutral-100">
                  {idx.indexName}
                </span>
                <Badge variant={idx.isUnique ? "amber" : "secondary"}>
                  {idx.isUnique ? "UNIQUE INDEX" : "INDEX"}
                </Badge>
              </div>

              <div className="flex items-center space-x-3">
                <span className="text-neutral-400 font-mono text-[11px]">
                  ON ({idx.columns.join(", ")})
                </span>
                <button
                  onClick={() => onDeleteIndex(idx.id)}
                  className="p-1 rounded text-neutral-400 hover:text-rose-500 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
