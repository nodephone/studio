"use client";

import { useState, useEffect } from "react";
import { ColumnDefinition } from "@/lib/api/database";
import { Button, Input, Textarea, useToast, Badge } from "@/components/ui";
import {
  X,
  Copy,
  Trash2,
  Save,
  Check,
  Code2,
  Edit3,
  Calendar,
  Layers,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface RowInspectorProps {
  row: Record<string, unknown> | null;
  columns: ColumnDefinition[];
  onClose: () => void;
  onSaveRow: (updatedFields: Record<string, unknown>) => Promise<void>;
  onDeleteRow: (primaryKeyVal: unknown) => Promise<void>;
  isSaving?: boolean;
  isDeleting?: boolean;
}

export function RowInspector({
  row,
  columns,
  onClose,
  onSaveRow,
  onDeleteRow,
  isSaving = false,
  isDeleting = false,
}: RowInspectorProps) {
  const { addToast } = useToast();
  const [editedFields, setEditedFields] = useState<Record<string, unknown>>({});
  const [activeTab, setActiveTab] = useState<"edit" | "json">("edit");
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (row) {
      setEditedFields({ ...row });
    }
  }, [row]);

  if (!row) return null;

  const handleFieldChange = (colName: string, value: unknown) => {
    setEditedFields((prev) => ({ ...prev, [colName]: value }));
  };

  const handleSave = async () => {
    try {
      await onSaveRow(editedFields);
      addToast({
        type: "success",
        title: "Row Updated",
        description: "Optimistic changes saved to NodePhone Server.",
      });
    } catch (err) {
      addToast({
        type: "error",
        title: "Update Failed",
        description: err instanceof Error ? err.message : "Failed to update row.",
      });
    }
  };

  const handleDelete = async () => {
    try {
      await onDeleteRow(row.id);
      addToast({
        type: "info",
        title: "Row Deleted",
        description: `Row with id '${row.id}' removed.`,
      });
    } catch (err) {
      addToast({
        type: "error",
        title: "Deletion Failed",
        description: err instanceof Error ? err.message : "Failed to delete row.",
      });
    }
  };

  const handleCopyJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(row, null, 2));
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
    addToast({
      type: "info",
      title: "JSON Copied",
      description: "Row payload copied to clipboard.",
    });
  };

  return (
    <aside className="w-full md:w-96 border-l border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 flex flex-col h-full shrink-0 z-20 shadow-xl animate-in slide-in-from-right duration-200 select-none">
      {/* Drawer Header */}
      <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
        <div className="space-y-0.5 min-w-0">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100">
              Row Inspector
            </span>
            <Badge variant="emerald" className="font-mono text-[10px]">
              id: {String(row.id || "N/A").substring(0, 10)}
            </Badge>
          </div>
          <p className="text-[11px] text-neutral-500 truncate">
            Inspect column values, edit fields, or copy JSON.
          </p>
        </div>

        <button
          onClick={onClose}
          className="p-1 rounded-lg text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Tabs header */}
      <div className="flex items-center space-x-2 px-4 py-2 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50">
        <button
          onClick={() => setActiveTab("edit")}
          className={cn(
            "px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer",
            activeTab === "edit"
              ? "bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 shadow-2xs"
              : "text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200"
          )}
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>Fields & Values</span>
        </button>

        <button
          onClick={() => setActiveTab("json")}
          className={cn(
            "px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer",
            activeTab === "json"
              ? "bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 shadow-2xs"
              : "text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200"
          )}
        >
          <Code2 className="w-3.5 h-3.5" />
          <span>JSON Payload</span>
        </button>
      </div>

      {/* Drawer Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {activeTab === "edit" ? (
          <div className="space-y-4">
            {columns.map((col) => {
              const currentVal = editedFields[col.name];
              return (
                <div key={col.name} className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 flex items-center space-x-1.5">
                      <span>{col.name}</span>
                      {col.isPrimary && (
                        <span className="text-[9px] px-1 py-0.2 rounded bg-amber-500/10 text-amber-600 font-mono">
                          PK
                        </span>
                      )}
                    </label>
                    <span className="text-[10px] font-mono text-neutral-400 uppercase">
                      {col.type}
                    </span>
                  </div>

                  {col.type === "boolean" ? (
                    <select
                      value={String(currentVal)}
                      onChange={(e) => handleFieldChange(col.name, e.target.value === "true")}
                      className="w-full text-xs h-8 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 px-2 font-mono"
                    >
                      <option value="true">true</option>
                      <option value="false">false</option>
                    </select>
                  ) : col.type === "jsonb" ? (
                    <Textarea
                      value={
                        typeof currentVal === "object"
                          ? JSON.stringify(currentVal, null, 2)
                          : String(currentVal ?? "")
                      }
                      onChange={(e) => handleFieldChange(col.name, e.target.value)}
                      className="font-mono text-xs"
                    />
                  ) : (
                    <Input
                      value={String(currentVal ?? "")}
                      disabled={col.isPrimary}
                      onChange={(e) => handleFieldChange(col.name, e.target.value)}
                      className="h-8 text-xs font-mono"
                    />
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-neutral-500">
                Raw Record JSON
              </span>
              <Button
                onClick={handleCopyJSON}
                variant="outline"
                size="sm"
                className="h-7 px-2 text-[11px] cursor-pointer"
                leftIcon={
                  isCopied ? (
                    <Check className="w-3 h-3 text-emerald-500" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )
                }
              >
                {isCopied ? "Copied" : "Copy"}
              </Button>
            </div>
            <pre className="p-3 rounded-xl bg-neutral-950 text-emerald-400 text-xs font-mono overflow-x-auto border border-neutral-800">
              {JSON.stringify(row, null, 2)}
            </pre>
          </div>
        )}
      </div>

      {/* Drawer Footer Actions */}
      <div className="p-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between gap-2 bg-neutral-50 dark:bg-neutral-900/80">
        <Button
          onClick={handleDelete}
          variant="danger"
          size="sm"
          isLoading={isDeleting}
          className="text-xs cursor-pointer"
          leftIcon={<Trash2 className="w-3.5 h-3.5" />}
        >
          Delete
        </Button>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            variant="primary"
            size="sm"
            isLoading={isSaving}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold cursor-pointer border-emerald-500"
            leftIcon={<Save className="w-3.5 h-3.5" />}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </aside>
  );
}
