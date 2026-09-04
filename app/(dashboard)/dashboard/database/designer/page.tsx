"use client";

import { useState } from "react";
import { useDesigner } from "@/lib/hooks/use-designer";
import { DesignerToolbar } from "@/components/designer/designer-toolbar";
import { ColumnEditor } from "@/components/designer/column-editor";
import { ForeignKeyEditor } from "@/components/designer/foreign-key-editor";
import { IndexBuilder } from "@/components/designer/index-builder";
import { SQLPreview } from "@/components/designer/sql-preview";
import { ValidationBanner } from "@/components/designer/validation-banner";
import { Container, Card, CardContent } from "@/components/layout";
import { Tabs, useToast } from "@/components/ui";
import { Sliders, Link2, Layers, Code2, Sparkles } from "lucide-react";

export default function TableDesignerPage() {
  const { addToast } = useToast();
  const {
    schema,
    setTableName,
    addColumn,
    updateColumn,
    deleteColumn,
    addForeignKey,
    deleteForeignKey,
    addIndex,
    deleteIndex,
    undo,
    redo,
    canUndo,
    canRedo,
    validationErrors,
    generatedSQL,
    applyMigration,
    isApplying,
    resetSchema,
  } = useDesigner();

  const [activeTab, setActiveTab] = useState("columns");

  const hasCriticalErrors = validationErrors.some((e) => e.type === "error");

  const handleApply = async () => {
    try {
      await applyMigration();
      addToast({
        type: "success",
        title: "Migration Applied!",
        description: `Table '${schema.tableName}' updated in NodePhone migration engine.`,
      });
    } catch (err) {
      addToast({
        type: "error",
        title: "Migration Failed",
        description: err instanceof Error ? err.message : "Failed to apply migration.",
      });
    }
  };

  const designerTabs = [
    { id: "columns", label: "Columns & Types", icon: <Sliders className="w-4 h-4" /> },
    { id: "foreign-keys", label: "Foreign Keys", icon: <Link2 className="w-4 h-4" />, badge: schema.foreignKeys.length ? String(schema.foreignKeys.length) : undefined },
    { id: "indexes", label: "Indexes", icon: <Layers className="w-4 h-4" />, badge: schema.indexes.length ? String(schema.indexes.length) : undefined },
    { id: "sql-preview", label: "Live SQL Preview", icon: <Code2 className="w-4 h-4" /> },
  ];

  return (
    <Container size="xl" className="space-y-6 py-4">
      {/* Visual Table Designer Container */}
      <Card className="border-neutral-200 dark:border-neutral-800 shadow-xl overflow-hidden">
        {/* Header Toolbar */}
        <DesignerToolbar
          tableName={schema.tableName}
          onTableNameChange={setTableName}
          canUndo={canUndo}
          canRedo={canRedo}
          onUndo={undo}
          onRedo={redo}
          onReset={resetSchema}
          onApply={handleApply}
          isApplying={isApplying}
          hasErrors={hasCriticalErrors}
        />

        <CardContent className="p-6 space-y-6">
          {/* Real-time Validation Banner */}
          <ValidationBanner errors={validationErrors} />

          {/* Navigation Tabs */}
          <Tabs
            tabs={designerTabs}
            activeTab={activeTab}
            onChange={setActiveTab}
            variant="pill"
          />

          {/* Tab Views */}
          {activeTab === "columns" && (
            <ColumnEditor
              columns={schema.columns}
              onAddColumn={addColumn}
              onUpdateColumn={updateColumn}
              onDeleteColumn={deleteColumn}
            />
          )}

          {activeTab === "foreign-keys" && (
            <ForeignKeyEditor
              foreignKeys={schema.foreignKeys}
              columns={schema.columns}
              onAddForeignKey={addForeignKey}
              onDeleteForeignKey={deleteForeignKey}
            />
          )}

          {activeTab === "indexes" && (
            <IndexBuilder
              indexes={schema.indexes}
              columns={schema.columns}
              tableName={schema.tableName}
              onAddIndex={addIndex}
              onDeleteIndex={deleteIndex}
            />
          )}

          {activeTab === "sql-preview" && (
            <SQLPreview sql={generatedSQL} />
          )}
        </CardContent>
      </Card>
    </Container>
  );
}
