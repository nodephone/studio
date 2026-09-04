"use client";

import { useState, useEffect } from "react";
import { ColumnDefinition } from "@/lib/api/database";
import { Modal, Button, Input, Textarea, useToast } from "@/components/ui";

interface AddRowModalProps {
  isOpen: boolean;
  onClose: () => void;
  columns: ColumnDefinition[];
  tableName: string;
  onInsertRow: (newRow: Record<string, unknown>) => Promise<Record<string, unknown>>;
}

export function AddRowModal({
  isOpen,
  onClose,
  columns,
  tableName,
  onInsertRow,
}: AddRowModalProps) {
  const { addToast } = useToast();
  const [formData, setFormData] = useState<Record<string, unknown>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const initial: Record<string, unknown> = {};
      columns.forEach((col) => {
        if (col.type === "uuid") {
          initial[col.name] = `${col.name.substring(0, 3)}_uuid_${Math.floor(Math.random() * 9000) + 1000}`;
        } else if (col.type === "timestamp") {
          initial[col.name] = new Date().toISOString();
        } else if (col.type === "boolean") {
          initial[col.name] = true;
        } else {
          initial[col.name] = "";
        }
      });
      setFormData(initial);
    }
  }, [isOpen, columns]);

  const handleChange = (colName: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [colName]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onInsertRow(formData);
      addToast({
        type: "success",
        title: "Row Inserted",
        description: `New record added to '${tableName}'.`,
      });
      onClose();
    } catch (err) {
      addToast({
        type: "error",
        title: "Insertion Failed",
        description: err instanceof Error ? err.message : "Failed to insert row.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Insert Row into '${tableName}'`}
      description="Enter values for each column field."
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
            Insert Record
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4 max-h-96 overflow-y-auto pr-1">
        {columns.map((col) => (
          <div key={col.name} className="space-y-1">
            <label className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 flex items-center justify-between">
              <span>{col.name}</span>
              <span className="text-[10px] font-mono text-neutral-400">{col.type}</span>
            </label>

            {col.type === "boolean" ? (
              <select
                value={String(formData[col.name])}
                onChange={(e) => handleChange(col.name, e.target.value === "true")}
                className="w-full text-xs h-9 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 px-3 font-mono"
              >
                <option value="true">true</option>
                <option value="false">false</option>
              </select>
            ) : col.type === "jsonb" ? (
              <Textarea
                value={String(formData[col.name] || "")}
                onChange={(e) => handleChange(col.name, e.target.value)}
                placeholder='{"key": "value"}'
                className="font-mono text-xs"
              />
            ) : (
              <Input
                value={String(formData[col.name] || "")}
                onChange={(e) => handleChange(col.name, e.target.value)}
                className="font-mono text-xs"
              />
            )}
          </div>
        ))}
      </form>
    </Modal>
  );
}
