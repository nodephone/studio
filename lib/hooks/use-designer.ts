"use client";

import { useState, useEffect, useCallback } from "react";
import {
  TableSchema,
  DesignerColumn,
  ForeignKeyRelation,
  IndexDefinition,
  validateSchema,
  generateSQLMigration,
  applyMigration,
} from "@/lib/api/designer";

const INITIAL_SCHEMA: TableSchema = {
  tableName: "posts",
  schema: "public",
  columns: [
    {
      id: "col_1",
      name: "id",
      type: "TEXT",
      isPrimaryKey: true,
      isNullable: false,
      isUnique: true,
      isAutoIncrement: false,
    },
    {
      id: "col_2",
      name: "title",
      type: "TEXT",
      isPrimaryKey: false,
      isNullable: false,
      isUnique: false,
      isAutoIncrement: false,
    },
    {
      id: "col_3",
      name: "published",
      type: "BOOLEAN",
      isPrimaryKey: false,
      isNullable: false,
      isUnique: false,
      isAutoIncrement: false,
      defaultValue: "FALSE",
    },
    {
      id: "col_4",
      name: "created_at",
      type: "DATETIME",
      isPrimaryKey: false,
      isNullable: false,
      isUnique: false,
      isAutoIncrement: false,
      defaultValue: "CURRENT_TIMESTAMP",
    },
  ],
  foreignKeys: [],
  indexes: [
    {
      id: "idx_1",
      indexName: "idx_posts_published",
      columns: ["published"],
      isUnique: false,
    },
  ],
};

export function useDesigner() {
  const [schema, setSchema] = useState<TableSchema>(INITIAL_SCHEMA);
  const [undoStack, setUndoStack] = useState<TableSchema[]>([]);
  const [redoStack, setRedoStack] = useState<TableSchema[]>([]);
  const [isApplying, setIsApplying] = useState(false);

  // Push to history before mutating schema
  const updateSchemaState = useCallback(
    (updater: (prev: TableSchema) => TableSchema) => {
      setSchema((prev) => {
        const next = updater(prev);
        setUndoStack((u) => [...u, prev]);
        setRedoStack([]);
        return next;
      });
    },
    []
  );

  const undo = useCallback(() => {
    setUndoStack((u) => {
      if (u.length === 0) return u;
      const previous = u[u.length - 1];
      const newUndo = u.slice(0, u.length - 1);
      setSchema((current) => {
        setRedoStack((r) => [current, ...r]);
        return previous;
      });
      return newUndo;
    });
  }, []);

  const redo = useCallback(() => {
    setRedoStack((r) => {
      if (r.length === 0) return r;
      const next = r[0];
      const newRedo = r.slice(1);
      setSchema((current) => {
        setUndoStack((u) => [...u, current]);
        return next;
      });
      return newRedo;
    });
  }, []);

  // Keyboard shortcut listener for Cmd+Z & Cmd+Shift+Z
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "z") {
        if (e.shiftKey) {
          e.preventDefault();
          redo();
        } else {
          e.preventDefault();
          undo();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [undo, redo]);

  const validationErrors = validateSchema(schema);
  const generatedSQL = generateSQLMigration(schema);

  const handleApplyMigration = async () => {
    setIsApplying(true);
    try {
      await applyMigration(schema, generatedSQL);
      return true;
    } finally {
      setIsApplying(false);
    }
  };

  return {
    schema,
    setTableName: (name: string) =>
      updateSchemaState((prev) => ({ ...prev, tableName: name })),
    addColumn: (col: DesignerColumn) =>
      updateSchemaState((prev) => ({ ...prev, columns: [...prev.columns, col] })),
    updateColumn: (id: string, updated: Partial<DesignerColumn>) =>
      updateSchemaState((prev) => ({
        ...prev,
        columns: prev.columns.map((c) => (c.id === id ? { ...c, ...updated } : c)),
      })),
    deleteColumn: (id: string) =>
      updateSchemaState((prev) => ({
        ...prev,
        columns: prev.columns.filter((c) => c.id !== id),
      })),
    addForeignKey: (fk: ForeignKeyRelation) =>
      updateSchemaState((prev) => ({ ...prev, foreignKeys: [...prev.foreignKeys, fk] })),
    deleteForeignKey: (id: string) =>
      updateSchemaState((prev) => ({
        ...prev,
        foreignKeys: prev.foreignKeys.filter((f) => f.id !== id),
      })),
    addIndex: (idx: IndexDefinition) =>
      updateSchemaState((prev) => ({ ...prev, indexes: [...prev.indexes, idx] })),
    deleteIndex: (id: string) =>
      updateSchemaState((prev) => ({
        ...prev,
        indexes: prev.indexes.filter((i) => i.id !== id),
      })),
    undo,
    redo,
    canUndo: undoStack.length > 0,
    canRedo: redoStack.length > 0,
    validationErrors,
    generatedSQL,
    applyMigration: handleApplyMigration,
    isApplying,
    resetSchema: () => updateSchemaState(() => INITIAL_SCHEMA),
  };
}
