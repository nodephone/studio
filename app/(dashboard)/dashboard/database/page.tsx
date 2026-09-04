"use client";

import { useState } from "react";
import { useDatabase } from "@/lib/hooks/use-database";
import { exportTableToCSV } from "@/lib/api/database";
import { TablesSidebar } from "@/components/database/tables-sidebar";
import { DataGridToolbar } from "@/components/database/data-grid-toolbar";
import { DataGrid } from "@/components/database/data-grid";
import { RowInspector } from "@/components/database/row-inspector";
import { CreateTableModal } from "@/components/database/create-table-modal";
import { AddRowModal } from "@/components/database/add-row-modal";
import { CSVImportModal } from "@/components/database/csv-import-modal";
import { useToast } from "@/components/ui";

export default function DatabaseExplorerPage() {
  const { addToast } = useToast();
  const {
    tables,
    activeTable,
    setActiveTable,
    activeTableMeta,
    rowsData,
    isLoadingTables,
    isLoadingRows,
    isRefetchingRows,
    page,
    setPage,
    pageSize,
    setPageSize,
    search,
    setSearch,
    sortBy,
    sortOrder,
    toggleSort,
    selectedRow,
    setSelectedRow,
    createTable,
    insertRow,
    updateRow,
    isUpdatingRow,
    deleteRow,
    isDeletingRow,
    refetchRows,
  } = useDatabase("users");

  const [isCreateTableOpen, setIsCreateTableOpen] = useState(false);
  const [isAddRowOpen, setIsAddRowOpen] = useState(false);
  const [isCSVImportOpen, setIsCSVImportOpen] = useState(false);

  const handleExportCSV = () => {
    if (!rowsData || rowsData.rows.length === 0) {
      addToast({
        type: "warning",
        title: "No Data to Export",
        description: "The current table query returned 0 rows.",
      });
      return;
    }

    const csvContent = exportTableToCSV(activeTable, rowsData.rows);
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${activeTable}_export.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addToast({
      type: "success",
      title: "CSV Exported",
      description: `Downloaded ${rowsData.rows.length} rows as CSV.`,
    });
  };

  const columns = activeTableMeta?.columns || [];

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-3.5rem)] w-full overflow-hidden bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xl">
      {/* Panel 1: Left Tables Sidebar */}
      <TablesSidebar
        tables={tables}
        activeTable={activeTable}
        onSelectTable={setActiveTable}
        onCreateTableClick={() => setIsCreateTableOpen(true)}
        isLoading={isLoadingTables}
      />

      {/* Panel 2: Center Data Grid & Toolbar */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <DataGridToolbar
          search={search}
          onSearchChange={setSearch}
          onRefresh={refetchRows}
          onAddRowClick={() => setIsAddRowOpen(true)}
          onExportCSV={handleExportCSV}
          onImportCSVClick={() => setIsCSVImportOpen(true)}
          onSortClick={() => toggleSort(columns[0]?.name || "id")}
          tableName={activeTable}
          isRefetching={isRefetchingRows}
        />

        <DataGrid
          columns={columns}
          queryResult={rowsData}
          isLoading={isLoadingRows}
          selectedRow={selectedRow}
          onSelectRow={setSelectedRow}
          page={page}
          onPageChange={setPage}
          pageSize={pageSize}
          onPageSizeChange={setPageSize}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSortToggle={toggleSort}
          onAddRowClick={() => setIsAddRowOpen(true)}
        />
      </div>

      {/* Panel 3: Right Drawer Row Inspector */}
      {selectedRow && (
        <RowInspector
          row={selectedRow}
          columns={columns}
          onClose={() => setSelectedRow(null)}
          onSaveRow={async (updatedFields) => {
            await updateRow({
              primaryKeyVal: selectedRow.id,
              updatedFields,
            });
          }}
          onDeleteRow={async (primaryKeyVal) => {
            await deleteRow(primaryKeyVal);
          }}
          isSaving={isUpdatingRow}
          isDeleting={isDeletingRow}
        />
      )}

      {/* Modals */}
      <CreateTableModal
        isOpen={isCreateTableOpen}
        onClose={() => setIsCreateTableOpen(false)}
        onCreateTable={createTable}
      />

      <AddRowModal
        isOpen={isAddRowOpen}
        onClose={() => setIsAddRowOpen(false)}
        columns={columns}
        tableName={activeTable}
        onInsertRow={insertRow}
      />

      <CSVImportModal
        isOpen={isCSVImportOpen}
        onClose={() => setIsCSVImportOpen(false)}
        tableName={activeTable}
        onImportComplete={refetchRows}
      />
    </div>
  );
}
