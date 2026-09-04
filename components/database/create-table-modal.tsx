"use client";

import { useState } from "react";
import { TableMeta, ColumnDefinition } from "@/lib/api/database";
import { Modal, Button, Input, Select, Checkbox, useToast } from "@/components/ui";
import { Plus, Trash2, Key, Layers } from "lucide-react";

interface CreateTableModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateTable: (newTable: TableMeta) => Promise<TableMeta>;
}

export function CreateTableModal({
  isOpen,
  onClose,
  onCreateTable,
}: CreateTableModalProps) {
  const { addToast } = useToast();
  const [tableName, setTableName] = useState("");
  const [schemaName, setSchemaName] = useState("public");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [columns, setColumns] = useState<ColumnDefinition[]>([
    { name: "id", type: "uuid", isPrimary: true, isNullable: false },
    { name: "created_at", type: "timestamp", isNullable: false, defaultValue: "NOW()" },
  ]);

  const handleAddColumn = () => {
    setColumns((prev) => [
      ...prev,
      { name: `col_${prev.length + 1}`, type: "varchar", isNullable: true },
    ]);
  };

  const handleRemoveColumn = (index: number) => {
    setColumns((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleColumnChange = (
    index: number,
    field: keyof ColumnDefinition,
    value: unknown
  ) => {
    setColumns((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tableName.trim()) return;

    setIsSubmitting(true);
    try {
      await onCreateTable({
        name: tableName.toLowerCase().replace(/\s+/g, "_"),
        schema: schemaName,
        rowCount: 0,
        columns,
        isFavorite: false,
        updatedAt: "Just now",
      });
      addToast({
        type: "success",
        title: "Table Created",
        description: `PostgreSQL table '${tableName}' generated successfully.`,
      });
      onClose();
    } catch (err) {
      addToast({
        type: "error",
        title: "Creation Failed",
        description: err instanceof Error ? err.message : "Failed to create table.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Database Table"
      description="Define columns and data types for PostgreSQL 16 schema."
      size="lg"
      footer={
        <>
          <Button variant="outline" size="sm" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="primary"
            size="sm"
            isLoading={isSubmitting}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold cursor-pointer border-emerald-500"
          >
            Create Table
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Table Name"
            placeholder="e.g. orders, subscriptions"
            value={tableName}
            onChange={(e) => setTableName(e.target.value)}
            required
          />
          <Input
            label="Schema"
            value={schemaName}
            onChange={(e) => setSchemaName(e.target.value)}
            required
          />
        </div>

        {/* Columns builder */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">
              Columns Definition ({columns.length})
            </label>
            <Button
              type="button"
              onClick={handleAddColumn}
              variant="outline"
              size="sm"
              className="h-7 text-xs cursor-pointer"
              leftIcon={<Plus className="w-3.5 h-3.5" />}
            >
              Add Column
            </Button>
          </div>

          <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
            {columns.map((col, idx) => (
              <div
                key={idx}
                className="flex items-center space-x-2.5 p-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50"
              >
                <Input
                  placeholder="column_name"
                  value={col.name}
                  onChange={(e) => handleColumnChange(idx, "name", e.target.value)}
                  className="h-8 text-xs font-mono flex-1"
                />

                <select
                  value={col.type}
                  onChange={(e) => handleColumnChange(idx, "type", e.target.value)}
                  className="h-8 text-xs font-mono rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 px-2 cursor-pointer"
                >
                  <option value="uuid">uuid</option>
                  <option value="varchar">varchar</option>
                  <option value="integer">integer</option>
                  <option value="boolean">boolean</option>
                  <option value="timestamp">timestamp</option>
                  <option value="jsonb">jsonb</option>
                </select>

                <Checkbox
                  label="Nullable"
                  checked={col.isNullable}
                  onChange={(e) => handleColumnChange(idx, "isNullable", e.target.checked)}
                />

                <button
                  type="button"
                  onClick={() => handleRemoveColumn(idx)}
                  disabled={columns.length <= 1}
                  className="p-1 rounded-md text-neutral-400 hover:text-rose-500 disabled:opacity-30 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </form>
    </Modal>
  );
}
