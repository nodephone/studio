"use client";

import { DesignerColumn, DesignerColumnType } from "@/lib/api/designer";
import { Button, Input, Checkbox } from "@/components/ui";
import { Plus, Trash2, Key, Hash, Type, Calendar, ToggleLeft, Braces, Binary } from "lucide-react";
import { cn } from "@/lib/utils";

interface ColumnEditorProps {
  columns: DesignerColumn[];
  onAddColumn: (col: DesignerColumn) => void;
  onUpdateColumn: (id: string, updated: Partial<DesignerColumn>) => void;
  onDeleteColumn: (id: string) => void;
}

export function ColumnEditor({
  columns,
  onAddColumn,
  onUpdateColumn,
  onDeleteColumn,
}: ColumnEditorProps) {
  const COLUMN_TYPES: DesignerColumnType[] = [
    "TEXT",
    "INTEGER",
    "REAL",
    "BOOLEAN",
    "DATETIME",
    "BLOB",
    "JSON",
  ];

  const handleAddNew = () => {
    onAddColumn({
      id: `col_${Date.now()}`,
      name: `col_${columns.length + 1}`,
      type: "TEXT",
      isPrimaryKey: false,
      isNullable: true,
      isUnique: false,
      isAutoIncrement: false,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
            Table Columns ({columns.length})
          </h4>
          <p className="text-xs text-neutral-500">
            Configure column names, data types, primary keys, and constraints.
          </p>
        </div>
        <Button
          onClick={handleAddNew}
          variant="outline"
          size="sm"
          className="h-8 text-xs cursor-pointer"
          leftIcon={<Plus className="w-3.5 h-3.5" />}
        >
          Add Column
        </Button>
      </div>

      <div className="border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden divide-y divide-neutral-100 dark:divide-neutral-800">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-2 p-2.5 bg-neutral-50 dark:bg-neutral-900 text-[11px] font-semibold text-neutral-500 uppercase tracking-wider select-none">
          <div className="col-span-3">Column Name</div>
          <div className="col-span-2">Type</div>
          <div className="col-span-1 text-center">PK</div>
          <div className="col-span-1 text-center">Nullable</div>
          <div className="col-span-1 text-center">Unique</div>
          <div className="col-span-3">Default Value</div>
          <div className="col-span-1 text-right">Actions</div>
        </div>

        {/* Column Rows */}
        {columns.map((col) => (
          <div
            key={col.id}
            className="grid grid-cols-12 gap-2 p-2.5 items-center hover:bg-neutral-50 dark:hover:bg-neutral-800/40 transition-colors"
          >
            <div className="col-span-3">
              <Input
                value={col.name}
                onChange={(e) => onUpdateColumn(col.id, { name: e.target.value })}
                placeholder="column_name"
                className="h-8 text-xs font-mono"
              />
            </div>

            <div className="col-span-2">
              <select
                value={col.type}
                onChange={(e) =>
                  onUpdateColumn(col.id, { type: e.target.value as DesignerColumnType })
                }
                className="w-full h-8 text-xs font-mono rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 px-2 cursor-pointer"
              >
                {COLUMN_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-span-1 flex justify-center">
              <input
                type="checkbox"
                checked={col.isPrimaryKey}
                onChange={(e) => onUpdateColumn(col.id, { isPrimaryKey: e.target.checked })}
                className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
              />
            </div>

            <div className="col-span-1 flex justify-center">
              <input
                type="checkbox"
                checked={col.isNullable}
                onChange={(e) => onUpdateColumn(col.id, { isNullable: e.target.checked })}
                className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
              />
            </div>

            <div className="col-span-1 flex justify-center">
              <input
                type="checkbox"
                checked={col.isUnique}
                onChange={(e) => onUpdateColumn(col.id, { isUnique: e.target.checked })}
                className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
              />
            </div>

            <div className="col-span-3">
              <Input
                value={col.defaultValue || ""}
                onChange={(e) => onUpdateColumn(col.id, { defaultValue: e.target.value })}
                placeholder="NULL / CURRENT_TIMESTAMP"
                className="h-8 text-xs font-mono"
              />
            </div>

            <div className="col-span-1 flex justify-end">
              <button
                onClick={() => onDeleteColumn(col.id)}
                disabled={columns.length <= 1}
                className="p-1 rounded-md text-neutral-400 hover:text-rose-500 disabled:opacity-30 cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
