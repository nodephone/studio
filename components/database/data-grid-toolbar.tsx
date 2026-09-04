"use client";

import { Button, Input, Dropdown } from "@/components/ui";
import {
  Search,
  Plus,
  RefreshCw,
  Download,
  Upload,
  Filter,
  ArrowUpDown,
  FileSpreadsheet,
} from "lucide-react";

interface DataGridToolbarProps {
  search: string;
  onSearchChange: (q: string) => void;
  onRefresh: () => void;
  onAddRowClick: () => void;
  onExportCSV: () => void;
  onImportCSVClick: () => void;
  onSortClick: () => void;
  tableName: string;
  isRefetching?: boolean;
}

export function DataGridToolbar({
  search,
  onSearchChange,
  onRefresh,
  onAddRowClick,
  onExportCSV,
  onImportCSVClick,
  onSortClick,
  tableName,
  isRefetching = false,
}: DataGridToolbarProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
      {/* Left: Search & Filter */}
      <div className="flex items-center space-x-2 flex-1 max-w-md">
        <Input
          placeholder={`Search records in '${tableName}'...`}
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          leftIcon={<Search className="w-3.5 h-3.5 text-neutral-400" />}
          className="h-8 text-xs bg-neutral-50 dark:bg-neutral-950"
        />

        <Button
          onClick={onSortClick}
          variant="outline"
          size="sm"
          className="h-8 px-2.5 text-xs text-neutral-600 dark:text-neutral-300 border-neutral-200 dark:border-neutral-800 shrink-0 cursor-pointer"
          leftIcon={<ArrowUpDown className="w-3.5 h-3.5 text-emerald-500" />}
        >
          Sort
        </Button>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center space-x-2 shrink-0">
        <Button
          onClick={onRefresh}
          variant="ghost"
          size="sm"
          isLoading={isRefetching}
          className="h-8 px-2 text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 cursor-pointer"
          title="Refresh Data Grid"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </Button>

        <Dropdown
          align="right"
          trigger={
            <Button
              variant="outline"
              size="sm"
              className="h-8 px-2.5 text-xs text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-800 cursor-pointer"
              leftIcon={<FileSpreadsheet className="w-3.5 h-3.5 text-emerald-500" />}
            >
              CSV Data ▾
            </Button>
          }
          items={[
            {
              id: "export-csv",
              label: "Export to CSV File",
              icon: <Download className="w-4 h-4" />,
              onClick: onExportCSV,
            },
            {
              id: "import-csv",
              label: "Import CSV Data",
              icon: <Upload className="w-4 h-4" />,
              onClick: onImportCSVClick,
            },
          ]}
        />

        <Button
          onClick={onAddRowClick}
          variant="primary"
          size="sm"
          className="h-8 px-3 text-xs bg-emerald-600 hover:bg-emerald-500 text-white font-semibold cursor-pointer border-emerald-500"
          leftIcon={<Plus className="w-3.5 h-3.5" />}
        >
          Insert Row
        </Button>
      </div>
    </div>
  );
}
