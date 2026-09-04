"use client";

import { ColumnDefinition, QueryResult } from "@/lib/api/database";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Button,
  Badge,
  Skeleton,
  EmptyState,
} from "@/components/ui";
import {
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Key,
  Database,
  Hash,
  Type,
  Calendar,
  ToggleLeft,
  Braces,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DataGridProps {
  columns: ColumnDefinition[];
  queryResult?: QueryResult;
  isLoading?: boolean;
  selectedRow: Record<string, unknown> | null;
  onSelectRow: (row: Record<string, unknown>) => void;
  page: number;
  onPageChange: (p: number) => void;
  pageSize: number;
  onPageSizeChange: (s: number) => void;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  onSortToggle: (colName: string) => void;
  onAddRowClick: () => void;
}

export function DataGrid({
  columns,
  queryResult,
  isLoading,
  selectedRow,
  onSelectRow,
  page,
  onPageChange,
  pageSize,
  onPageSizeChange,
  sortBy,
  sortOrder = "asc",
  onSortToggle,
  onAddRowClick,
}: DataGridProps) {
  const getColumnIcon = (type: ColumnDefinition["type"]) => {
    switch (type) {
      case "uuid":
        return <Key className="w-3 h-3 text-amber-500 shrink-0" />;
      case "integer":
        return <Hash className="w-3 h-3 text-blue-500 shrink-0" />;
      case "varchar":
        return <Type className="w-3 h-3 text-emerald-500 shrink-0" />;
      case "timestamp":
        return <Calendar className="w-3 h-3 text-indigo-500 shrink-0" />;
      case "boolean":
        return <ToggleLeft className="w-3 h-3 text-purple-500 shrink-0" />;
      case "jsonb":
        return <Braces className="w-3 h-3 text-rose-500 shrink-0" />;
    }
  };

  const rows = queryResult?.rows || [];
  const totalCount = queryResult?.totalCount || 0;
  const totalPages = queryResult?.totalPages || 1;

  const startRowIndex = totalCount === 0 ? 0 : (page - 1) * pageSize + 1;
  const endRowIndex = Math.min(page * pageSize, totalCount);

  return (
    <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden bg-white dark:bg-neutral-950">
      {/* Scrollable Data Table Container */}
      <div className="flex-1 overflow-auto border-b border-neutral-200 dark:border-neutral-800">
        <Table className="min-w-full border-none rounded-none">
          <TableHeader className="sticky top-0 z-10 shadow-2xs">
            <TableRow className="border-b border-neutral-200 dark:border-neutral-800">
              <TableHead className="w-12 text-center">#</TableHead>
              {columns.map((col) => {
                const isSorted = sortBy === col.name;
                return (
                  <TableHead
                    key={col.name}
                    onClick={() => onSortToggle(col.name)}
                    className="cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                  >
                    <div className="flex items-center justify-between space-x-2">
                      <div className="flex items-center space-x-1.5 min-w-0">
                        {getColumnIcon(col.type)}
                        <span className="font-bold text-neutral-900 dark:text-neutral-100 truncate">
                          {col.name}
                        </span>
                        {col.isPrimary && (
                          <span className="text-[9px] px-1 py-0.2 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 font-mono">
                            PK
                          </span>
                        )}
                      </div>
                      <div className="shrink-0 text-neutral-400">
                        {isSorted ? (
                          sortOrder === "asc" ? (
                            <ArrowUp className="w-3.5 h-3.5 text-emerald-500" />
                          ) : (
                            <ArrowDown className="w-3.5 h-3.5 text-emerald-500" />
                          )
                        ) : (
                          <ArrowUpDown className="w-3.5 h-3.5 opacity-40 hover:opacity-100" />
                        )}
                      </div>
                    </div>
                  </TableHead>
                );
              })}
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading ? (
              [...Array(6)].map((_, rIdx) => (
                <TableRow key={rIdx}>
                  <TableCell className="w-12">
                    <Skeleton className="h-4 w-4 mx-auto" />
                  </TableCell>
                  {columns.map((c, cIdx) => (
                    <TableCell key={cIdx}>
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length + 1} className="py-12 text-center">
                  <EmptyState
                    title="No Records Found"
                    description="This table has no rows matching your filter or search query."
                    action={
                      <Button onClick={onAddRowClick} variant="primary" size="sm">
                        Insert First Row
                      </Button>
                    }
                  />
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row, idx) => {
                const isSelected = selectedRow && selectedRow.id === row.id;
                return (
                  <TableRow
                    key={String(row.id || idx)}
                    onClick={() => onSelectRow(row)}
                    className={cn(
                      "cursor-pointer font-mono text-xs select-none transition-colors",
                      isSelected
                        ? "bg-emerald-500/10 dark:bg-emerald-500/20 font-semibold"
                        : "hover:bg-neutral-50 dark:hover:bg-neutral-900"
                    )}
                  >
                    <TableCell className="text-neutral-400 text-center text-[10px] w-12 font-mono">
                      {startRowIndex + idx}
                    </TableCell>
                    {columns.map((col) => {
                      const val = row[col.name];
                      const isNull = val === null || val === undefined;
                      return (
                        <TableCell key={col.name} className="truncate max-w-xs">
                          {isNull ? (
                            <span className="italic text-neutral-400 font-sans text-[11px]">
                              NULL
                            </span>
                          ) : typeof val === "boolean" ? (
                            <Badge variant={val ? "emerald" : "secondary"}>
                              {String(val)}
                            </Badge>
                          ) : typeof val === "object" ? (
                            <span className="text-rose-500 truncate block">
                              {JSON.stringify(val)}
                            </span>
                          ) : (
                            <span className="truncate block text-neutral-900 dark:text-neutral-100">
                              {String(val)}
                            </span>
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Footer Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-neutral-50 dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 text-xs text-neutral-500 select-none">
        <div className="flex items-center space-x-3">
          <span>
            Showing <strong className="text-neutral-900 dark:text-neutral-100 font-mono">{startRowIndex}</strong>–
            <strong className="text-neutral-900 dark:text-neutral-100 font-mono">{endRowIndex}</strong> of{" "}
            <strong className="text-neutral-900 dark:text-neutral-100 font-mono">{totalCount}</strong> rows
          </span>

          <div className="flex items-center space-x-1.5 pl-3 border-l border-neutral-200 dark:border-neutral-800">
            <span>Per page:</span>
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className="h-7 text-xs rounded border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 px-1.5 font-semibold text-neutral-900 dark:text-neutral-100 cursor-pointer"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="font-mono text-neutral-400">
            Page {page} of {totalPages}
          </span>
          <div className="flex items-center space-x-1">
            <Button
              onClick={() => onPageChange(page - 1)}
              disabled={page <= 1}
              variant="outline"
              size="icon"
              className="h-7 w-7 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              onClick={() => onPageChange(page + 1)}
              disabled={page >= totalPages}
              variant="outline"
              size="icon"
              className="h-7 w-7 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
