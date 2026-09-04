"use client";

import { ForeignKeyRelation, DesignerColumn } from "@/lib/api/designer";
import { Button, Input, Select, Badge } from "@/components/ui";
import { Link2, Plus, Trash2, ArrowRight } from "lucide-react";

interface ForeignKeyEditorProps {
  foreignKeys: ForeignKeyRelation[];
  columns: DesignerColumn[];
  onAddForeignKey: (fk: ForeignKeyRelation) => void;
  onDeleteForeignKey: (id: string) => void;
}

export function ForeignKeyEditor({
  foreignKeys,
  columns,
  onAddForeignKey,
  onDeleteForeignKey,
}: ForeignKeyEditorProps) {
  const handleAddNewFK = () => {
    onAddForeignKey({
      id: `fk_${Date.now()}`,
      columnName: columns[0]?.name || "user_id",
      parentTable: "users",
      parentColumn: "id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 flex items-center space-x-2">
            <Link2 className="w-4 h-4 text-emerald-500" />
            <span>Foreign Key Relationships ({foreignKeys.length})</span>
          </h4>
          <p className="text-xs text-neutral-500">
            Link table columns to parent primary key references with ON DELETE behaviors.
          </p>
        </div>
        <Button
          onClick={handleAddNewFK}
          variant="outline"
          size="sm"
          className="h-8 text-xs cursor-pointer"
          leftIcon={<Plus className="w-3.5 h-3.5" />}
        >
          Add Relationship
        </Button>
      </div>

      {foreignKeys.length === 0 ? (
        <div className="p-8 text-center rounded-xl border border-dashed border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30 text-xs text-neutral-400">
          No foreign key constraints defined. Click &quot;Add Relationship&quot; to link tables.
        </div>
      ) : (
        <div className="space-y-2.5">
          {foreignKeys.map((fk) => (
            <div
              key={fk.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-2xs"
            >
              <div className="flex items-center space-x-2 font-mono text-xs flex-1">
                <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                  {fk.columnName}
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                <Badge variant="emerald" className="font-mono text-[10px]">
                  {fk.parentTable}.{fk.parentColumn}
                </Badge>
              </div>

              <div className="flex items-center space-x-3 text-xs">
                <span className="text-neutral-400 text-[11px] font-mono">
                  ON DELETE {fk.onDelete}
                </span>
                <button
                  onClick={() => onDeleteForeignKey(fk.id)}
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
